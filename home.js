// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with localStorage
const themeBtn = document.getElementById("theme-toggle");
const LS_KEY = "mg-theme";
function applyTheme(t) {
  document.body.classList.toggle("dark", t === "dark");
}
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
let stored = localStorage.getItem(LS_KEY);
if (!stored) stored = prefersDark ? "dark" : "light";
applyTheme(stored);

function updateIcon() {
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}
updateIcon();

themeBtn.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark ? "dark" : "light");
  localStorage.setItem(LS_KEY, dark ? "dark" : "light");
  updateIcon();
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      observer.unobserve(e.target);
    }
  }
}, { threshold: 0.25 });

document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

// Animate skill bars when visible
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const skill = e.target;
    const pct = parseInt(skill.getAttribute("data-bar") || "0", 10);
    const fill = skill.querySelector(".bar i");
    fill.style.width = pct + "%";
    barObserver.unobserve(skill);
  });
}, { threshold: 0.6 });

document.querySelectorAll(".skill").forEach((s) => barObserver.observe(s));

// Duplicate marquee text to ensure seamless loop
(function marqueeDup() {
  const inner = document.getElementById("marquee");
  if (!inner) return;
  inner.innerHTML = inner.innerHTML + inner.innerHTML;
})();
