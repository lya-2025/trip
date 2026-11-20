import json, os, re, time, urllib.request, urllib.parse, io
from PIL import Image
try:
    RESAMPLE = Image.Resampling.LANCZOS
except AttributeError:
    RESAMPLE = Image.LANCZOS

UA = "TripTravelGuide/1.0 (https://github.com/lya-2025/trip; educational travel guide)"
HEADERS = {"User-Agent": UA}
BASE = r"D:\codex\trip"
IMG_DIR = os.path.join(BASE, "assets", "images")
os.makedirs(IMG_DIR, exist_ok=True)

SPOTS = [
    ("great-wall", ["Badaling Great Wall", "Great Wall Badaling autumn"]),
    ("forbidden-city", ["Forbidden City Beijing", "Forbidden City Hall of Supreme Harmony"]),
    ("terracotta-army", ["Terracotta Army", "Terracotta warriors pit"]),
    ("zhangjiajie", ["Zhangjiajie national forest park", "Zhangjiajie stone pillars"]),
    ("jiuzhaigou", ["Jiuzhaigou valley", "Jiuzhaigou lake water"]),
    ("huangshan", ["Huangshan mountains", "Mount Huangshan sea of clouds"]),
    ("west-lake", ["West Lake Hangzhou", "Hangzhou West Lake Leifeng"]),
    ("guilin", ["Li River Guilin", "Guilin karst landscape"]),
    ("potala-palace", ["Potala Palace Lhasa", "Potala Palace Tibet"]),
    ("lijiang", ["Lijiang old town", "Lijiang Yunnan"]),
]

PER_SPOT = 3
MAX_BYTES = 200 * 1024
BAD = re.compile(r"(?i)(map|logo|diagram|chart|svg|icon|flag|coat.of.arms|locator|route|plan\b|collage|panorama)")

def http_get(url, timeout=25):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()

def clean_html(s):
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", "", s)
    return s.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").strip()

def search(query):
    params = {
        "action": "query", "generator": "search", "gsrsearch": query,
        "gsrnamespace": "6", "gsrlimit": "10", "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata", "iiurlwidth": "960", "format": "json",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    data = json.loads(http_get(url).decode("utf-8"))
    pages = list(data.get("query", {}).get("pages", {}).values())
    pages.sort(key=lambda p: p.get("index", 999))
    out = []
    for p in pages:
        ii = p.get("imageinfo") or []
        if not ii:
            continue
        info = ii[0]
        if info.get("mime", "") not in ("image/jpeg", "image/png"):
            continue
        title = p.get("title", "")
        if BAD.search(title):
            continue
        w, h = info.get("width", 0), info.get("height", 0)
        if w < 600 or h < 400 or w <= h or w / h > 3.2:
            continue
        thumb = info.get("thumburl")
        if not thumb:
            continue
        meta = info.get("extmetadata", {})
        out.append({"title": title, "thumburl": thumb, "width": w, "height": h,
                    "license": clean_html(meta.get("LicenseShortName", {}).get("value", "")),
                    "artist": clean_html(meta.get("Artist", {}).get("value", "")),
                    "desc": clean_html(meta.get("ImageDescription", {}).get("value", ""))[:140]})
    return out

def compress(raw):
    img = Image.open(io.BytesIO(raw)).convert("RGB")
    best = None
    for q in [78, 72, 66, 60, 54]:
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=q, optimize=True)
        b = buf.getvalue()
        if len(b) <= MAX_BYTES:
            return b, q, img.size
        best = b
    w, h = img.size
    if w > 760:
        nw, nh = 760, int(h * 760 / w)
        img2 = img.resize((nw, nh), RESAMPLE)
        for q in [72, 66, 60]:
            buf = io.BytesIO()
            img2.save(buf, "JPEG", quality=q, optimize=True)
            b = buf.getvalue()
            if len(b) <= MAX_BYTES:
                return b, q, (nw, nh)
            best = b
    return best, 54, img.size

def main():
    manifest = {}
    for spot_id, queries in SPOTS:
        got, seen = [], set()
        for q in queries:
            if len(got) >= PER_SPOT:
                break
            try:
                results = search(q)
            except Exception as e:
                print("[" + spot_id + "] search '" + q + "' FAILED: " + str(e))
                time.sleep(1)
                continue
            for r in results:
                if len(got) >= PER_SPOT:
                    break
                if r["title"] in seen:
                    continue
                seen.add(r["title"])
                n = len(got) + 1
                fname = spot_id + "-" + str(n) + ".jpg"
                dest = os.path.join(IMG_DIR, fname)
                try:
                    raw = http_get(r["thumburl"], timeout=25)
                except Exception as e:
                    print("[" + spot_id + "] download FAILED: " + str(e))
                    continue
                try:
                    comp, q, dims = compress(raw)
                except Exception as e:
                    print("[" + spot_id + "] compress FAILED: " + str(e))
                    continue
                with open(dest, "wb") as f:
                    f.write(comp)
                got.append({"file": "assets/images/" + fname, "title": r["title"],
                            "license": r["license"], "artist": r["artist"], "desc": r["desc"],
                            "bytes": len(comp), "quality": q, "dims": list(dims)})
                print("[" + spot_id + "] OK " + fname + " (" + str(len(comp)) + "B q" + str(q) + " " + str(dims[0]) + "x" + str(dims[1]) + ") " + r["title"][:50])
            time.sleep(0.4)
        manifest[spot_id] = got
        print("[" + spot_id + "] " + str(len(got)) + "/" + str(PER_SPOT))
    with open(os.path.join(IMG_DIR, "_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print("\nSummary:")
    total = sum(len(v) for v in manifest.values())
    for sid, imgs in manifest.items():
        print("  " + sid + ": " + str(len(imgs)))
    print("TOTAL: " + str(total))

if __name__ == "__main__":
    main()
