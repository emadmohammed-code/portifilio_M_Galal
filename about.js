// Year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Theme toggle with localStorage (shared key)
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
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
  }
}, { threshold: 0.25 });

document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
