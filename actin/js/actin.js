// MOBILE NAV
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// COUNTER
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 25);
  });
}
const heroObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); heroObs.unobserve(e.target); } });
}, { threshold: 0.3 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) heroObs.observe(statsEl);

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
});

// ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// NOTIFICATION
function showNotification(msg) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 4000);
}

// FORM HANDLING
function saveSubmission(data, type) {
  const key = 'actin_submissions';
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ ...data, type, timestamp: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(existing));
}

document.getElementById('joinForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  const data = Object.fromEntries(fd);
  saveSubmission(data, 'join');
  showNotification('Thanks for joining! We will contact you soon.');
  this.reset();
});

document.getElementById('brandForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  const data = Object.fromEntries(fd);
  saveSubmission(data, 'brand');
  showNotification('Enquiry submitted! We will get back to you shortly.');
  this.reset();
});
