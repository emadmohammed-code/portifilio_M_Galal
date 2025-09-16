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
  for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('in'); observer.unobserve(e.target); } }
},{threshold:.25});
document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));

// Form validation + simulated submit
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
function setErr(id,msg){ const el = document.getElementById(id); if(el){ el.textContent = msg||''; } }
function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let ok = true;
    setErr('err-name',''); setErr('err-email',''); setErr('err-message','');
    if(!name){ setErr('err-name','Please enter your name'); ok = false; }
    if(!email || !validEmail(email)){ setErr('err-email','Please enter a valid email'); ok = false; }
    if(!message || message.length < 10){ setErr('err-message','Message must be at least 10 characters'); ok = false; }
    if(!ok) return;

    statusEl.textContent = 'Sending…'; submitBtn.disabled = true;
    await new Promise(r=>setTimeout(r,900));
    statusEl.textContent = 'Message sent! I will get back to you soon.';
    submitBtn.disabled = false; form.reset();
  });
}
