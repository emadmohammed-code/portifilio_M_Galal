// Year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Theme toggle with localStorage
const LS_KEY = "mg-theme";
const themeBtn = document.getElementById("theme-toggle");
function applyTheme(t){ document.body.classList.toggle("dark", t === "dark"); }
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
let stored = localStorage.getItem(LS_KEY);
if(!stored) stored = prefersDark ? "dark" : "light";
applyTheme(stored);
function updateIcon(){ if(themeBtn) themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙"; }
updateIcon();
if(themeBtn){ themeBtn.addEventListener("click", ()=>{ const dark = !document.body.classList.contains("dark"); applyTheme(dark?"dark":"light"); localStorage.setItem(LS_KEY, dark?"dark":"light"); updateIcon(); }); }

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('in'); observer.unobserve(e.target); } }
}, { threshold: .25 });

document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));

// Animate skill bars when visible
const barObserver = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(!e.isIntersecting) return;
    const skill = e.target; const pct = parseInt(skill.getAttribute('data-bar')||'0',10); const fill = skill.querySelector('.bar i');
    if(fill){ fill.style.width = pct + '%'; }
    barObserver.unobserve(skill);
  });
}, { threshold: .6 });

document.querySelectorAll('.skill').forEach(s=>barObserver.observe(s));
