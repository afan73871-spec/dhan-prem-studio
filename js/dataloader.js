/* ============================================
   DATA LOADER - Reads admin data for main site
   ============================================ */

function getAdminData() {
  const stored = localStorage.getItem('dpAdminData');
  if (stored) return JSON.parse(stored);
  return null;
}

function loadServices() {
  const data = getAdminData();
  const services = data?.services || [
    { icon: '📈', title: 'Digital Marketing', desc: 'Result-oriented digital marketing strategies including SEO, PPC, and email marketing to boost your online presence.' },
    { icon: '🎬', title: 'Content Creation', desc: 'Engaging video content, reels, shorts, and YouTube content that captivates your audience and drives engagement.' },
    { icon: '📱', title: 'Social Media Marketing', desc: 'Strategic social media management across Instagram, Facebook, Twitter, and LinkedIn to grow your following.' },
    { icon: '🌐', title: 'SEO Optimization', desc: 'Dominate search rankings with our proven SEO techniques. Get found by your target audience organically.' },
    { icon: '🎨', title: 'Brand Identity', desc: 'Complete brand identity solutions including logo design, brand guidelines, and visual storytelling.' },
    { icon: '💻', title: 'Web Development', desc: 'Modern, responsive websites and landing pages designed to convert visitors into loyal customers.' }
  ];

  const container = document.getElementById('servicesGrid');
  if (!container) return;

  container.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <a href="services/index.html" class="service-link">Learn More &#10132;</a>
    </div>
  `).join('');
}

function loadPortfolio() {
  const data = getAdminData();
  const portfolio = data?.portfolio || [
    { title: 'TechStart Growth Campaign', category: 'marketing', result: '300% ROI increase', bg: 'bg-1', icon: '🚀' },
    { title: 'FreshBites Brand Video', category: 'content', result: '2M+ views', bg: 'bg-2', icon: '🎬' },
    { title: 'LuxeLife Brand Redesign', category: 'branding', result: 'Complete transformation', bg: 'bg-3', icon: '🎨' },
    { title: 'StyleHub E-commerce', category: 'web', result: '5x conversion rate', bg: 'bg-4', icon: '💻' },
    { title: 'Foodies Social Campaign', category: 'marketing', result: '50K followers', bg: 'bg-5', icon: '📱' },
    { title: 'EduLearn YouTube Series', category: 'content', result: '500K subscribers', bg: 'bg-6', icon: '🎧' }
  ];

  const container = document.getElementById('portfolioGrid');
  if (!container) return;

  container.innerHTML = portfolio.map(p => `
    <div class="portfolio-card" data-category="${p.category}">
      <div class="portfolio-image">
        <div class="portfolio-image-bg ${p.bg || 'bg-1'}">${p.icon || '🚀'}</div>
        <div class="portfolio-overlay">
          <h4>${p.title}</h4>
          <p>${p.result}</p>
        </div>
      </div>
      <div class="portfolio-info">
        <span class="portfolio-tag">${p.category}</span>
        <h4>${p.title}</h4>
      </div>
    </div>
  `).join('');

  initPortfolioFilter();
}

function loadTestimonials() {
  const data = getAdminData();
  const testimonials = data?.testimonials || [
    { name: 'Rahul Kumar', initials: 'RK', role: 'CEO, TechStart Solutions', rating: 5, text: 'Dhan Prem Studio transformed our online presence completely. Their digital marketing strategies increased our leads by 300% in just 3 months.' },
    { name: 'Priya Sharma', initials: 'PS', role: 'Founder, FreshBites', rating: 5, text: 'The content creation team is phenomenal. They created a brand video for us that went viral with 2M+ views.' },
    { name: 'James Mitchell', initials: 'JM', role: 'Marketing Director, GlobalTech UK', rating: 5, text: 'Working with Dhan Prem Studio was a game-changer. They delivered our international campaign on time and within budget.' },
    { name: 'Ananya Gupta', initials: 'AG', role: 'Owner, LuxeLife Boutique', rating: 5, text: 'From brand identity to social media management, they handle everything professionally. Our engagement increased by 500%.' }
  ];

  const track = document.getElementById('testimonialsTrack');
  const nav = document.getElementById('testimonialNav');
  if (!track) return;

  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'&#9733;'.repeat(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div class="testimonial-info">
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (nav) {
    nav.innerHTML = testimonials.map((_, i) => `
      <button class="testimonial-dot ${i === 0 ? 'active' : ''}"></button>
    `).join('');

    // Re-init slider
    initTestimonialSlider();
  }
}

function loadPricing() {
  const data = getAdminData();
  const pricing = data?.pricing || [
    { name: 'Starter Pack', price: '4,999', featured: false, features: 'Social Media Management (2 Platforms), 8 Posts per Month, Basic SEO Setup, Monthly Reports, Email Support', desc: 'Perfect for small businesses starting their digital journey' },
    { name: 'Professional', price: '14,999', featured: true, features: 'Social Media Management (4 Platforms), 20 Posts + 4 Reels per Month, Advanced SEO & PPC, Content Strategy, Video Content (2/month), Priority Support', desc: 'Complete solution for growing businesses' },
    { name: 'Enterprise', price: '29,999', featured: false, features: 'All Social Media Platforms, Unlimited Posts & Content, Full SEO + PPC + Email Marketing, Video Production (8/month), Brand Strategy & Consulting, 24/7 Dedicated Manager', desc: '360° digital marketing for established brands' }
  ];

  const container = document.getElementById('pricingGrid');
  if (!container) return;

  container.innerHTML = pricing.map(p => {
    const features = p.features.split(',').map(f => f.trim());
    return `
      <div class="pricing-card ${p.featured ? 'featured' : ''}">
        <h3>${p.name}</h3>
        <div class="pricing-price">&#8377;${p.price}<span>/month</span></div>
        <p class="pricing-desc">${p.desc || 'Best value for your business'}</p>
        <ul class="pricing-features">
          ${features.map(f => `<li><span class="check">&#10003;</span> ${f}</li>`).join('')}
        </ul>
        <a href="contact/index.html" class="btn btn-primary">Get Started</a>
      </div>
    `;
  }).join('');
}

function loadTeam() {
  const data = getAdminData();
  const team = data?.team || [
    { name: 'Dhan Prem', initials: 'DP', role: 'Founder & CEO' },
    { name: 'Arjun Kapoor', initials: 'AK', role: 'Head of Marketing' },
    { name: 'Neha Singh', initials: 'NS', role: 'Creative Director' },
    { name: 'Rahul Verma', initials: 'RV', role: 'Lead Developer' }
  ];

  const container = document.getElementById('teamGrid');
  if (!container) return;

  container.innerHTML = team.map(t => `
    <div class="team-card">
      <div class="team-avatar">${t.initials}</div>
      <h4>${t.name}</h4>
      <span>${t.role}</span>
    </div>
  `).join('');
}

function loadSettings() {
  const data = getAdminData();
  const defaults = {
    phone: '7985757365',
    email: 'dhanpremstudios@zohomail.in',
    address: 'Lucknow Aliganj UP',
    whatsapp: '917985757365',
    facebook: 'https://www.facebook.com/share/1BZaRRR38f/',
    instagram: 'https://www.instagram.com/dhanpremstudios?igsh=dWdxOGM2amI4YTkx',
    youtube: '',
    linkedin: 'https://www.linkedin.com/company/dhanprem-studios/'
  };
  const s = data?.settings || defaults;

  const phoneEl = document.getElementById('sitePhone');
  const emailEl = document.getElementById('siteEmail');
  const addressEl = document.getElementById('siteAddress');
  const whatsappLinks = document.querySelectorAll('.whatsapp-btn');

  if (phoneEl) phoneEl.textContent = s.phone;
  if (emailEl) emailEl.textContent = s.email;
  if (addressEl) addressEl.textContent = s.address;
  whatsappLinks.forEach(el => {
    const msg = el.href.includes('text=') ? '?' + el.href.split('?')[1] : '';
    el.href = `https://wa.me/${s.whatsapp}${msg}`;
  });

  const socialMap = { facebook: s.facebook, instagram: s.instagram, linkedin: s.linkedin, youtube: s.youtube };
  document.querySelectorAll('[data-social]').forEach(el => {
    const platform = el.getAttribute('data-social');
    if (socialMap[platform]) {
      el.href = socialMap[platform];
      el.target = '_blank';
      el.rel = 'noopener';
    }
  });
}

function loadServicesDetail() {
  const data = getAdminData();
  const services = data?.services || [
    { icon: '📈', title: 'Digital Marketing', desc: 'Data-driven marketing strategies that deliver measurable results and maximum ROI for your business.', features: 'Google Ads, Email Marketing, CRO, Analytics' },
    { icon: '🎬', title: 'Content Creation', desc: 'Stunning visual content that tells your brand story and captivates your target audience.', features: 'Video Production, Reels, YouTube, Podcast' },
    { icon: '📱', title: 'Social Media Marketing', desc: 'Strategic social media management that builds communities and drives engagement across all platforms.', features: 'Instagram, Facebook, LinkedIn, Twitter' },
    { icon: '🌐', title: 'SEO Optimization', desc: 'Get found by your customers on Google with our proven SEO strategies that drive organic traffic.', features: 'Technical SEO, On-page, Off-page, Local SEO' },
    { icon: '🎨', title: 'Brand Identity', desc: 'Create a memorable brand identity that stands out in the market and resonates with your audience.', features: 'Logo Design, Brand Guide, Visual Identity, Collateral' },
    { icon: '💻', title: 'Web Development', desc: 'Modern, responsive websites designed to convert visitors into customers and grow your business.', features: 'Custom Website, E-commerce, Landing Pages, Maintenance' }
  ];

  const container = document.getElementById('servicesDetailGrid');
  if (!container) return;

  container.innerHTML = services.map(s => {
    const features = s.features.split(',').map(f => f.trim());
    return `
      <div class="service-detail-card">
        <div class="service-detail-icon">${s.icon}</div>
        <div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <ul>${features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }).join('');
}

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          }, 300);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initTestimonialSlider() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testimonial-dot');
  let current = 0;

  if (!track || dots.length === 0) return;

  const update = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => update(i));
  });

  setInterval(() => {
    update((current + 1) % dots.length);
  }, 5000);
}

// ---- Init on DOM Ready ----
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

function loadLogo() {
  const logo = localStorage.getItem('dpAdminLogo');
  if (!logo) return;
  document.querySelectorAll('.logo-img, .logo-img-small').forEach(img => {
    img.src = logo;
  });
}
