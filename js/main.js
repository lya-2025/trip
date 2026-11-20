/* ===== Spot Data (inline fallback for file:// protocol) ===== */
const FALLBACK_SPOTS = [
  {"id":"great-wall","name":"八达岭长城","city":"北京","category":"历史人文","tagline":"不到长城非好汉","summary":"万里长城最具代表性的一段，雄伟壮观，是中华民族的象征。","gradient":"linear-gradient(135deg,#4a3728,#8b6914)","duration":"1 天","price":"40 元起","bestSeason":"4-10 月","elevation":"1015 米","audience":"家庭 / 摄影 / 历史","budget":"200-500 元/人","tags":["历史","徒步","摄影"]},
  {"id":"forbidden-city","name":"故宫博物院","city":"北京","category":"历史人文","tagline":"紫禁城六百年","summary":"世界上现存规模最大、保存最完整的木质结构古建筑群。","gradient":"linear-gradient(135deg,#7a1f1f,#c0392b)","duration":"1 天","price":"60 元","bestSeason":"全年","elevation":"44 米","audience":"家庭 / 历史 / 文化","budget":"200-400 元/人","tags":["皇家","文物","建筑"]},
  {"id":"terracotta-army","name":"秦始皇兵马俑","city":"陕西西安","category":"历史人文","tagline":"世界第八大奇迹","summary":"秦始皇陵的陪葬坑，数千件陶俑列阵，震撼人心。","gradient":"linear-gradient(135deg,#5d4037,#8d6e63)","duration":"半天","price":"120 元","bestSeason":"3-11 月","elevation":"400 米","audience":"历史 / 考古 / 家庭","budget":"300-600 元/人","tags":["历史","考古","奇迹"]},
  {"id":"zhangjiajie","name":"张家界国家森林公园","city":"湖南张家界","category":"自然风光","tagline":"阿凡达悬浮山原型","summary":"石英砂岩峰林地貌，三千奇峰拔地而起，八百秀水蜿蜒其中。","gradient":"linear-gradient(135deg,#1b5e20,#43a047)","duration":"2 天","price":"228 元","bestSeason":"4-11 月","elevation":"1262 米","audience":"摄影 / 徒步 / 冒险","budget":"500-1000 元/人","tags":["自然","奇峰","玻璃栈道"]},
  {"id":"jiuzhaigou","name":"九寨沟","city":"四川阿坝","category":"自然风光","tagline":"人间仙境童话世界","summary":"以翠海、叠瀑、彩林、雪峰著称，水色变幻万千如童话世界。","gradient":"linear-gradient(135deg,#006064,#00bcd4)","duration":"1-2 天","price":"169 元","bestSeason":"9-11 月","elevation":"3100 米","audience":"摄影 / 自然 / 家庭","budget":"500-1200 元/人","tags":["自然","湖泊","彩林"]},
  {"id":"huangshan","name":"黄山","city":"安徽黄山","category":"自然风光","tagline":"五岳归来不看山","summary":"以奇松、怪石、云海、温泉四绝闻名天下，中国画里的山水。","gradient":"linear-gradient(135deg,#37474f,#78909c)","duration":"2 天","price":"190 元","bestSeason":"3-11 月","elevation":"1864 米","audience":"摄影 / 徒步 / 自然","budget":"500-1200 元/人","tags":["自然","云海","奇松"]},
  {"id":"west-lake","name":"西湖","city":"浙江杭州","category":"历史人文","tagline":"欲把西湖比西子","summary":"中国十大风景名胜之一，湖光山色与人文古迹交相辉映。","gradient":"linear-gradient(135deg,#1a237e,#3949ab)","duration":"1 天","price":"免费","bestSeason":"3-5 月 / 9-11 月","elevation":"7 米","audience":"家庭 / 文化 / 休闲","budget":"100-300 元/人","tags":["人文","湖泊","诗画"]},
  {"id":"guilin","name":"桂林山水","city":"广西桂林","category":"自然风光","tagline":"桂林山水甲天下","summary":"喀斯特地貌峰林与清澈漓江构成绝美山水画卷。","gradient":"linear-gradient(135deg,#1b5e20,#66bb6a)","duration":"2 天","price":"215 元","bestSeason":"4-10 月","elevation":"150 米","audience":"摄影 / 自然 / 家庭","budget":"400-900 元/人","tags":["自然","漓江","喀斯特"]},
  {"id":"potala-palace","name":"布达拉宫","city":"西藏拉萨","category":"历史人文","tagline":"雪域高原的圣殿","summary":"世界上海拔最高的宫殿，藏传佛教圣地，建筑与信仰的巅峰之作。","gradient":"linear-gradient(135deg,#4a148c,#7b1fa2)","duration":"半天","price":"200 元","bestSeason":"5-10 月","elevation":"3700 米","audience":"文化 / 摄影 / 朝圣","budget":"800-2000 元/人","tags":["文化","宗教","高原"]},
  {"id":"lijiang","name":"丽江古城","city":"云南丽江","category":"历史人文","tagline":"高原上的纳西古镇","summary":"八百年历史的纳西族古镇，小桥流水与雪山相映，浪漫悠闲。","gradient":"linear-gradient(135deg,#3e2723,#795548)","duration":"2 天","price":"50 元","bestSeason":"全年","elevation":"2400 米","audience":"休闲 / 文化 / 摄影","budget":"300-800 元/人","tags":["人文","古镇","纳西文化"]}
];

let allSpots = [];

/* ===== Load Data ===== */
async function loadSpots() {
  try {
    const res = await fetch('data/spots.json');
    if (!res.ok) throw new Error('fetch failed');
    return await res.json();
  } catch {
    return FALLBACK_SPOTS;
  }
}

/* ===== SVG Icons ===== */
const ICONS = {
  clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  ticket: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  pin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  plane: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  mountain: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  wallet: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 1 0-4h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  map: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0Z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>',
  utensils: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
  bed: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
  alert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  chevronUp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  compass: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>'
};

/* ===== Home Page: Render Cards ===== */
function renderCards(spots) {
  const grid = document.getElementById('grid');
  if (!grid) return;
  if (spots.length === 0) {
    grid.innerHTML = '<p class="no-results">没有找到匹配的景点，试试其他关键词？</p>';
    return;
  }
  grid.innerHTML = spots.map((s, i) => `
    <a class="card" href="spots/${s.id}.html" tabindex="0" style="animation-delay:${i * 0.05}s">
      <div class="card-img" style="background-image:url('assets/images/${s.id}-1.jpg'),${s.gradient}"></div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <div class="city">${s.city}</div>
        <p class="summary">${s.summary}</p>
        <div class="card-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="card-meta">
          <span>${ICONS.clock}${s.duration}</span>
          <span>${ICONS.ticket}${s.price}</span>
        </div>
      </div>
    </a>
  `).join('');
}

/* ===== Home Page: Search & Filter ===== */
let currentFilter = 'all';
let currentSearch = '';

function filterSpots() {
  let filtered = allSpots;
  if (currentFilter !== 'all') {
    filtered = filtered.filter(s => s.category === currentFilter);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  renderCards(filtered);
}

function initSearch() {
  const input = document.getElementById('search');
  if (!input) return;
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentSearch = input.value.trim();
      filterSpots();
    }, 200);
  });
}

function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      filterSpots();
    });
  });
}

/* ===== Navigation ===== */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
  const dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
      });
    }
  }
}

/* ===== Back to Top ===== */
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Carousel ===== */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dots button');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  let index = 0;
  const total = slides.length;

  function go(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === index));
  }
  if (prevBtn) prevBtn.addEventListener('click', () => go(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(index + 1));
  dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
}

/* ===== Section Nav (detail pages) ===== */
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;
  const links = nav.querySelectorAll('a');
  const sections = document.querySelectorAll('.detail-section');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', async () => {
  initNav();
  initBackTop();
  initCarousel();
  initSectionNav();

  const grid = document.getElementById('grid');
  if (grid) {
    allSpots = await loadSpots();
    initSearch();
    initFilter();
    renderCards(allSpots);

    const dropdownMenu = document.querySelector('.nav-dropdown-menu');
    if (dropdownMenu) {
      dropdownMenu.innerHTML = allSpots.map(s =>
        `<a href="spots/${s.id}.html">${s.name}</a>`
      ).join('');
    }
  }
});
