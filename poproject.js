// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (shared LS key)
const themeBtn = document.getElementById("theme-toggle");
const LS_KEY = "mg-theme";
function applyTheme(t){ document.body.classList.toggle("dark", t === "dark"); }
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
let stored = localStorage.getItem(LS_KEY);
if(!stored) stored = prefersDark ? "dark" : "light";
applyTheme(stored);
function updateIcon(){ if(themeBtn) themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙"; }
updateIcon();
if(themeBtn){ themeBtn.addEventListener("click", () => { const dark = !document.body.classList.contains("dark"); applyTheme(dark?"dark":"light"); localStorage.setItem(LS_KEY, dark?"dark":"light"); updateIcon(); }); }

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  for(const e of entries){ if(e.isIntersecting){ e.target.classList.add("in"); observer.unobserve(e.target); } }
},{threshold:.25});
document.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));

// Accordions
for(const t of document.querySelectorAll('.toggle')){
  t.addEventListener('click', ()=>{
    const id = t.getAttribute('aria-controls');
    const more = id && document.getElementById(id);
    const open = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', (!open).toString());
    const article = t.closest('.project');
    if(article){ article.setAttribute('aria-open', (!open).toString()); }
    if(more){ more.style.maxHeight = open ? '0px' : '300px'; }
  });
}

// Chips filter (visual demo)
const chips = document.querySelectorAll('[data-chip]');
chips.forEach((c)=> c.addEventListener('click', ()=>{
  chips.forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
  const term = c.textContent?.trim();
  document.querySelectorAll('.project').forEach((p)=>{
    if(term==='All'){ p.style.display='block'; return; }
    const tags = (p.getAttribute('data-tags')||'').split(',').map(s=>s.trim());
    p.style.display = tags.includes(term||'') ? 'block' : 'none';
  });
}));
