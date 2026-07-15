/* ============================================
   DATA LOADER - MySQL API Version
   ============================================ */

const API_URL = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
  ? window.location.origin + '/api'
  : 'http://localhost:3001/api';

async function apiGet(url) {
  try {
    const sep = url.includes('?') ? '&' : '?';
    const res = await fetch(API_URL + url + sep + '_t=' + Date.now());
    return await res.json();
  } catch (e) {
    console.error('API error:', e);
    console.warn('Make sure server is running: node server.js');
    return [];
  }
}

function refreshAnimations(container) {
  if (!container) return;
  container.classList.remove('visible');
  void container.offsetWidth;
  container.classList.add('visible');
}

// ---- Services ----
async function loadServices() {
  const services = await apiGet('/services');
  const container = document.getElementById('servicesGrid');
  if (!container || services.length === 0) return;
  container.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <a href="services/index.html" class="service-link">Learn More &#10132;</a>
    </div>
  `).join('');
  refreshAnimations(container);
  if (window.setupCardTilt) window.setupCardTilt();
}

// ---- Services Detail ----
async function loadServicesDetail() {
  const services = await apiGet('/services');
  const container = document.getElementById('servicesDetailGrid');
  if (!container || services.length === 0) return;
  container.innerHTML = services.map(s => {
    const features = (s.features || '').split(',').map(f => f.trim());
    return `
      <div class="service-detail-card">
        <div class="service-detail-icon">${s.icon}</div>
        <div>
          <h3>${s.title}</h3>
          <p>${s.description}</p>
          <ul>${features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }).join('');
}

// ---- Portfolio ----
async function loadPortfolio() {
  const portfolio = await apiGet('/portfolio');
  const container = document.getElementById('portfolioGrid');
  if (!container || portfolio.length === 0) return;
  container.innerHTML = portfolio.map(p => `
    <div class="portfolio-card" data-category="${p.category}">
      <div class="portfolio-image">
        <div class="portfolio-image-bg ${p.background || 'bg-1'}">${p.icon || '🚀'}</div>
        <div class="portfolio-overlay"><h4>${p.title}</h4><p>${p.result || ''}</p></div>
      </div>
      <div class="portfolio-info"><span class="portfolio-tag">${p.category}</span><h4>${p.title}</h4></div>
    </div>
  `).join('');
  refreshAnimations(container);
  initPortfolioFilter();
}

// ---- Testimonials ----
async function loadTestimonials() {
  const testimonials = await apiGet('/testimonials');
  const track = document.getElementById('testimonialsTrack');
  const nav = document.getElementById('testimonialNav');
  if (!track || testimonials.length === 0) return;
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'&#9733;'.repeat(t.rating || 0)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div class="testimonial-info"><strong>${t.name}</strong><span>${t.role || ''}</span></div>
      </div>
    </div>
  `).join('');
  if (nav) {
    nav.innerHTML = testimonials.map((_, i) => `<button class="testimonial-dot ${i === 0 ? 'active' : ''}"></button>`).join('');
    initTestimonialSlider();
  }
}

// ---- Pricing ----
async function loadPricing() {
  const pricing = await apiGet('/pricing');
  const container = document.getElementById('pricingGrid');
  if (!container || pricing.length === 0) return;
  container.innerHTML = pricing.map(p => {
    const features = (p.features || '').split(',').map(f => f.trim());
    return `
      <div class="pricing-card ${p.featured ? 'featured' : ''}">
        <h3>${p.name}</h3>
        <div class="pricing-price">&#8377;${p.price}<span>/month</span></div>
        <p class="pricing-desc">${p.description || ''}</p>
        <ul class="pricing-features">${features.map(f => `<li><span class="check">&#10003;</span> ${f}</li>`).join('')}</ul>
        <a href="contact/index.html" class="btn btn-primary">Get Started</a>
      </div>
    `;
  }).join('');
  refreshAnimations(container);
}

// ---- Team ----
async function loadTeam() {
  const team = await apiGet('/team');
  const container = document.getElementById('teamGrid');
  if (!container || team.length === 0) return;
  container.innerHTML = team.map(t => `
    <div class="team-card"><div class="team-avatar">${t.initials}</div><h4>${t.name}</h4><span>${t.role || ''}</span></div>
  `).join('');
  refreshAnimations(container);
}

// ---- Settings ----
async function loadSettings() {
  const s = await apiGet('/settings');
  if (!s || !s.phone) return;
  const phoneEl = document.getElementById('sitePhone');
  const emailEl = document.getElementById('siteEmail');
  const addressEl = document.getElementById('siteAddress');
  if (phoneEl) phoneEl.textContent = s.phone;
  if (emailEl) emailEl.textContent = s.email;
  if (addressEl) addressEl.textContent = s.address;

  const whatsappLinks = document.querySelectorAll('.whatsapp-btn');
  whatsappLinks.forEach(el => { el.href = `https://wa.me/${s.whatsapp || '917985757365'}`; });

  const socialMap = { facebook: s.facebook, instagram: s.instagram, linkedin: s.linkedin, youtube: s.youtube };
  document.querySelectorAll('[data-social]').forEach(el => {
    const platform = el.getAttribute('data-social');
    if (socialMap[platform]) { el.href = socialMap[platform]; el.target = '_blank'; el.rel = 'noopener'; }
  });
}

// ---- Logo ----
async function loadLogo() {
  try {
    const data = await fetch(API_URL + '/logo?_t=' + Date.now()).then(r => r.json());
    if (data.logo) {
      document.querySelectorAll('.logo-img, .logo-img-small').forEach(img => { img.src = data.logo; });
    }
  } catch (e) {}
}

// ---- Portfolio Filter ----
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.opacity = '0'; card.style.transform = 'scale(0.8)';
          setTimeout(() => { card.style.display = 'block'; setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50); }, 300);
        } else {
          card.style.opacity = '0'; card.style.transform = 'scale(0.8)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// ---- Testimonial Slider ----
function initTestimonialSlider() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testimonial-dot');
  let current = 0;
  if (!track || dots.length === 0) return;
  const update = (i) => { track.style.transform = `translateX(-${i * 100}%)`; dots.forEach((d, j) => d.classList.toggle('active', j === i)); current = i; };
  dots.forEach((dot, i) => dot.addEventListener('click', () => update(i)));
  setInterval(() => update((current + 1) % dots.length), 5000);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  loadServicesDetail();
  loadPortfolio();
  loadTestimonials();
  loadPricing();
  loadTeam();
  loadSettings();
  loadLogo();
});

// ---- Real-time sync with admin panel ----
function refreshAll() {
  loadServices();
  loadServicesDetail();
  loadPortfolio();
  loadTestimonials();
  loadPricing();
  loadTeam();
  loadSettings();
  loadLogo();
}

// BroadcastChannel - instant update when admin saves (cross-tab)
try {
  const channel = new BroadcastChannel('site-updates');
  channel.onmessage = () => { refreshAll(); };
} catch (e) {}

// Tab focus fallback
window.addEventListener('focus', refreshAll);

// Polling fallback - check every 10 seconds
setInterval(refreshAll, 10000);
