/* ============================================
   ADMIN PANEL - Dhan Prem Studio
   Full CRUD Management System
   ============================================ */

// ---- Default Data ----
const defaultData = {
  services: [
    { id: 1, icon: '📈', title: 'Digital Marketing', desc: 'Result-oriented digital marketing strategies including SEO, PPC, and email marketing.', features: 'Google Ads, Email Marketing, CRO, Analytics' },
    { id: 2, icon: '🎬', title: 'Content Creation', desc: 'Engaging video content, reels, shorts, and YouTube content that captivates your audience.', features: 'Video Production, Reels, YouTube, Podcast' },
    { id: 3, icon: '📱', title: 'Social Media Marketing', desc: 'Strategic social media management across Instagram, Facebook, Twitter, and LinkedIn.', features: 'Instagram, Facebook, LinkedIn, Twitter' },
    { id: 4, icon: '🌐', title: 'SEO Optimization', desc: 'Dominate search rankings with our proven SEO techniques.', features: 'Technical SEO, On-page, Off-page, Local SEO' },
    { id: 5, icon: '🎨', title: 'Brand Identity', desc: 'Complete brand identity solutions including logo design and brand guidelines.', features: 'Logo Design, Brand Guide, Visual Identity, Collateral' },
    { id: 6, icon: '💻', title: 'Web Development', desc: 'Modern, responsive websites and landing pages designed to convert.', features: 'Custom Website, E-commerce, Landing Pages, Maintenance' }
  ],
  portfolio: [
    { id: 1, title: 'TechStart Growth Campaign', category: 'marketing', result: '300% ROI increase in 3 months through targeted Google Ads and social media campaigns', bg: 'bg-1', icon: '🚀' },
    { id: 2, title: 'FreshBites Brand Video', category: 'content', result: '2M+ views across YouTube, Instagram, and Facebook', bg: 'bg-2', icon: '🎬' },
    { id: 3, title: 'LuxeLife Brand Redesign', category: 'branding', result: 'Complete brand identity transformation with new logo, colors, and guidelines', bg: 'bg-3', icon: '🎨' },
    { id: 4, title: 'StyleHub E-commerce', category: 'web', result: 'Custom e-commerce platform with 5x conversion rate improvement', bg: 'bg-4', icon: '💻' },
    { id: 5, title: 'Foodies Social Campaign', category: 'marketing', result: '50K Instagram followers gained in just 2 months', bg: 'bg-5', icon: '📱' },
    { id: 6, title: 'EduLearn YouTube Series', category: 'content', result: '500K subscribers gained through educational content series', bg: 'bg-6', icon: '🎧' },
    { id: 7, title: 'FinGrow SEO Campaign', category: 'marketing', result: 'Page 1 ranking for 50+ competitive keywords in 6 months', bg: 'bg-1', icon: '💰' },
    { id: 8, title: 'StarBite Rebranding', category: 'branding', result: 'Complete brand refresh for a leading food chain in Lucknow', bg: 'bg-2', icon: '⭐' },
    { id: 9, title: 'ShopEasy Marketplace', category: 'web', result: 'Full-stack marketplace with payment integration and admin panel', bg: 'bg-3', icon: '🛒' },
    { id: 10, title: 'TravelTales Documentary', category: 'content', result: 'Award-winning travel documentary series for Tourism India', bg: 'bg-4', icon: '🎬' },
    { id: 11, title: 'MediCare Email Campaign', category: 'marketing', result: '45% open rate with personalized email automation', bg: 'bg-5', icon: '📧' },
    { id: 12, title: 'AnalyticsPro Dashboard', category: 'web', result: 'Real-time analytics dashboard for a SaaS company', bg: 'bg-6', icon: '📊' }
  ],
  testimonials: [
    { id: 1, name: 'Rahul Kumar', initials: 'RK', role: 'CEO, TechStart Solutions', rating: 5, text: 'Dhan Prem Studio transformed our online presence completely. Their digital marketing strategies increased our leads by 300% in just 3 months.' },
    { id: 2, name: 'Priya Sharma', initials: 'PS', role: 'Founder, FreshBites', rating: 5, text: 'The content creation team is phenomenal. They created a brand video for us that went viral with 2M+ views.' },
    { id: 3, name: 'James Mitchell', initials: 'JM', role: 'Marketing Director, GlobalTech UK', rating: 5, text: 'Working with Dhan Prem Studio was a game-changer. They delivered our international campaign on time and within budget.' },
    { id: 4, name: 'Ananya Gupta', initials: 'AG', role: 'Owner, LuxeLife Boutique', rating: 5, text: 'From brand identity to social media management, they handle everything professionally. Our engagement increased by 500%.' }
  ],
  pricing: [
    { id: 1, name: 'Starter Pack', price: '4,999', featured: false, features: 'Social Media (2 Platforms), 8 Posts/Month, Basic SEO, Monthly Reports, Email Support', desc: 'Perfect for small businesses starting their digital journey' },
    { id: 2, name: 'Professional', price: '14,999', featured: true, features: 'Social Media (4 Platforms), 20 Posts + 4 Reels, Advanced SEO & PPC, Content Strategy, Video (2/mo), Priority Support', desc: 'Complete solution for growing businesses' },
    { id: 3, name: 'Enterprise', price: '29,999', featured: false, features: 'All Social Platforms, Unlimited Posts, Full Marketing Suite, Video (8/mo), Brand Strategy, 24/7 Manager', desc: '360° digital marketing for established brands' }
  ],
  team: [
    { id: 1, name: 'Dhan Prem', initials: 'DP', role: 'Founder & CEO' },
    { id: 2, name: 'Arjun Kapoor', initials: 'AK', role: 'Head of Marketing' },
    { id: 3, name: 'Neha Singh', initials: 'NS', role: 'Creative Director' },
    { id: 4, name: 'Rahul Verma', initials: 'RV', role: 'Lead Developer' }
  ],
  messages: [],
  settings: {
    siteName: 'Dhan Prem Studio',
    tagline: 'Digital Marketing & Content Creation Studio',
    phone: '+91 79857 57365',
    email: 'dhanpremstudios@zohomail.in',
    address: 'Lucknow Aliganj',
    whatsapp: '917985757365',
    facebook: 'https://www.facebook.com/share/1BZaRRR38f/',
    instagram: 'https://www.instagram.com/dhanpremstudios?igsh=dWdxOGM2amI4YTkx',
    youtube: '',
    linkedin: 'https://www.linkedin.com/company/dhanprem-studios/'
  }
};

// ---- Data Store ----
function getData() {
  const stored = localStorage.getItem('dpAdminData');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('dpAdminData', JSON.stringify(defaultData));
  return defaultData;
}

function saveData(data) {
  localStorage.setItem('dpAdminData', JSON.stringify(data));
}

let currentEdit = null;
let currentType = null;

// ---- Login ----
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;

  if (user === 'admin' && pass === 'admin123') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminLayout').classList.add('active');
    localStorage.setItem('dpAdminLoggedIn', 'true');
    loadDashboard();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

// Check if already logged in
if (localStorage.getItem('dpAdminLoggedIn') === 'true') {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminLayout').classList.add('active');
  loadDashboard();
}

// ---- Logout ----
document.getElementById('logoutBtn').addEventListener('click', function() {
  localStorage.removeItem('dpAdminLoggedIn');
  document.getElementById('adminLayout').classList.remove('active');
  document.getElementById('loginPage').style.display = 'flex';
});

// ---- Navigation ----
document.querySelectorAll('.sidebar-nav-item').forEach(item => {
  item.addEventListener('click', function() {
    const page = this.getAttribute('data-page');
    document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.getElementById('pageTitle').textContent = this.textContent.trim();
    loadPage(page);
  });
});

// Mobile toggle
document.getElementById('mobileToggle').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('active');
});

// ---- Load Dashboard ----
function loadDashboard() {
  const data = getData();
  const statsHtml = `
    <div class="stat-card">
      <div class="stat-card-icon yellow">📈</div>
      <div><h3>${data.services.length}</h3><p>Services</p></div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon green">🖼️</div>
      <div><h3>${data.portfolio.length}</h3><p>Portfolio Projects</p></div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon blue">💬</div>
      <div><h3>${data.testimonials.length}</h3><p>Testimonials</p></div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon red">✉️</div>
      <div><h3>${data.messages.length}</h3><p>Messages</p></div>
    </div>
  `;
  document.getElementById('dashboardStats').innerHTML = statsHtml;

  const msgHtml = data.messages.length > 0
    ? data.messages.slice(-5).reverse().map(m => `
      <div class="message-item ${m.read ? '' : 'unread'}">
        <div class="message-header"><h4>${m.name} — ${m.email}</h4><span>${m.date}</span></div>
        <div class="message-preview">${m.message}</div>
      </div>
    `).join('')
    : '<div class="empty-state"><span>📭</span><p>No messages yet</p></div>';
  document.getElementById('recentMessages').innerHTML = msgHtml;
}

// ---- Load Pages ----
function loadPage(page) {
  const data = getData();
  switch(page) {
    case 'dashboard': loadDashboard(); break;
    case 'services': renderServices(data.services); break;
    case 'portfolio': renderPortfolio(data.portfolio); break;
    case 'testimonials': renderTestimonials(data.testimonials); break;
    case 'pricing': renderPricing(data.pricing); break;
    case 'team': renderTeam(data.team); break;
    case 'messages': renderMessages(data.messages); break;
    case 'settings': loadSettings(data.settings); break;
  }
}

// ---- Render Functions ----
function renderServices(items) {
  document.getElementById('servicesTable').innerHTML = items.map(s => `
    <tr>
      <td style="font-size:1.5rem">${s.icon}</td>
      <td><strong>${s.title}</strong></td>
      <td>${s.desc.substring(0, 60)}...</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editItem('service', ${s.id})">✎</button>
          <button class="action-btn delete" onclick="deleteItem('services', ${s.id})">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderPortfolio(items) {
  document.getElementById('portfolioTable').innerHTML = items.map(p => `
    <tr>
      <td>${p.icon || '🚀'} <strong>${p.title}</strong></td>
      <td><span class="badge badge-info">${p.category}</span></td>
      <td>${p.result}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editItem('portfolio', ${p.id})">✎</button>
          <button class="action-btn delete" onclick="deleteItem('portfolio', ${p.id})">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderTestimonials(items) {
  document.getElementById('testimonialsTable').innerHTML = items.map(t => `
    <tr>
      <td><strong>${t.name}</strong><br><small style="color:var(--text-dim)">${t.text.substring(0, 40)}...</small></td>
      <td>${t.role}</td>
      <td>${'⭐'.repeat(t.rating)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editItem('testimonial', ${t.id})">✎</button>
          <button class="action-btn delete" onclick="deleteItem('testimonials', ${t.id})">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderPricing(items) {
  document.getElementById('pricingTable').innerHTML = items.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>₹${p.price}/mo</td>
      <td>${p.featured ? '<span class="badge badge-warning">Featured</span>' : '<span class="badge badge-info">Regular</span>'}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editItem('pricing', ${p.id})">✎</button>
          <button class="action-btn delete" onclick="deleteItem('pricing', ${p.id})">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderTeam(items) {
  document.getElementById('teamTable').innerHTML = items.map(t => `
    <tr>
      <td><strong>${t.name}</strong></td>
      <td><span style="background:linear-gradient(135deg,#FACC15,#F59E0B);color:#18181B;padding:4px 12px;border-radius:8px;font-weight:700">${t.initials}</span></td>
      <td>${t.role}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editItem('team', ${t.id})">✎</button>
          <button class="action-btn delete" onclick="deleteItem('team', ${t.id})">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderMessages(items) {
  document.getElementById('messagesList').innerHTML = items.length > 0
    ? items.reverse().map(m => `
      <div class="message-item ${m.read ? '' : 'unread'}" onclick="markRead(${m.id})">
        <div class="message-header">
          <h4>${m.name} — ${m.email} ${m.phone ? '| ' + m.phone : ''}</h4>
          <span>${m.date}</span>
        </div>
        <div class="message-preview">${m.service ? '<span class="badge badge-info">' + m.service + '</span> ' : ''}${m.message}</div>
      </div>
    `).join('')
    : '<div class="empty-state"><span>📭</span><p>No messages yet. Messages from the contact form will appear here.</p></div>';
}

function loadSettings(s) {
  document.getElementById('settingSiteName').value = s.siteName || '';
  document.getElementById('settingTagline').value = s.tagline || '';
  document.getElementById('settingPhone').value = s.phone || '';
  document.getElementById('settingEmail').value = s.email || '';
  document.getElementById('settingAddress').value = s.address || '';
  document.getElementById('settingWhatsapp').value = s.whatsapp || '';
  document.getElementById('settingFacebook').value = s.facebook || '';
  document.getElementById('settingInstagram').value = s.instagram || '';
  document.getElementById('settingYoutube').value = s.youtube || '';
  document.getElementById('settingLinkedin').value = s.linkedin || '';
}

// ---- Modal System ----
function openModal(type, id) {
  currentType = type;
  currentEdit = id || null;
  const data = getData();
  let html = '';

  if (type === 'service') {
    const item = id ? data.services.find(s => s.id === id) : null;
    document.getElementById('modalTitle').textContent = item ? 'Edit Service' : 'Add Service';
    html = `
      <div class="form-group"><label>Icon (emoji)</label><input type="text" id="mIcon" value="${item ? item.icon : ''}" placeholder="📈"></div>
      <div class="form-group"><label>Title</label><input type="text" id="mTitle" value="${item ? item.title : ''}" placeholder="Service name"></div>
      <div class="form-group"><label>Description</label><textarea id="mDesc" placeholder="Service description">${item ? item.desc : ''}</textarea></div>
      <div class="form-group"><label>Features (comma separated)</label><input type="text" id="mFeatures" value="${item ? item.features : ''}" placeholder="Feature 1, Feature 2"></div>
    `;
  }

  if (type === 'portfolio') {
    const item = id ? data.portfolio.find(p => p.id === id) : null;
    document.getElementById('modalTitle').textContent = item ? 'Edit Project' : 'Add Project';
    html = `
      <div class="form-group"><label>Icon (emoji)</label><input type="text" id="mIcon" value="${item ? item.icon || '' : ''}" placeholder="🚀"></div>
      <div class="form-group"><label>Title</label><input type="text" id="mTitle" value="${item ? item.title : ''}" placeholder="Project name"></div>
      <div class="form-row">
        <div class="form-group"><label>Category</label><select id="mCategory"><option value="marketing" ${item?.category === 'marketing' ? 'selected' : ''}>Marketing</option><option value="content" ${item?.category === 'content' ? 'selected' : ''}>Content</option><option value="branding" ${item?.category === 'branding' ? 'selected' : ''}>Branding</option><option value="web" ${item?.category === 'web' ? 'selected' : ''}>Web</option></select></div>
        <div class="form-group"><label>Background</label><select id="mBg"><option value="bg-1" ${item?.bg === 'bg-1' ? 'selected' : ''}>Purple</option><option value="bg-2" ${item?.bg === 'bg-2' ? 'selected' : ''}>Pink</option><option value="bg-3" ${item?.bg === 'bg-3' ? 'selected' : ''}>Orange</option><option value="bg-4" ${item?.bg === 'bg-4' ? 'selected' : ''}>Green</option><option value="bg-5" ${item?.bg === 'bg-5' ? 'selected' : ''}>Blue</option><option value="bg-6" ${item?.bg === 'bg-6' ? 'selected' : ''}>Red</option></select></div>
      </div>
      <div class="form-group"><label>Result</label><input type="text" id="mResult" value="${item ? item.result : ''}" placeholder="e.g. 300% ROI increase"></div>
    `;
  }

  if (type === 'testimonial') {
    const item = id ? data.testimonials.find(t => t.id === id) : null;
    document.getElementById('modalTitle').textContent = item ? 'Edit Testimonial' : 'Add Testimonial';
    html = `
      <div class="form-row">
        <div class="form-group"><label>Author Name</label><input type="text" id="mName" value="${item ? item.name : ''}" placeholder="John Doe"></div>
        <div class="form-group"><label>Initials</label><input type="text" id="mInitials" value="${item ? item.initials : ''}" placeholder="JD" maxlength="2"></div>
      </div>
      <div class="form-group"><label>Role / Company</label><input type="text" id="mRole" value="${item ? item.role : ''}" placeholder="CEO, Company"></div>
      <div class="form-group"><label>Rating (1-5)</label><input type="number" id="mRating" value="${item ? item.rating : 5}" min="1" max="5"></div>
      <div class="form-group"><label>Testimonial Text</label><textarea id="mText" placeholder="What they said...">${item ? item.text : ''}</textarea></div>
    `;
  }

  if (type === 'pricing') {
    const item = id ? data.pricing.find(p => p.id === id) : null;
    document.getElementById('modalTitle').textContent = item ? 'Edit Plan' : 'Add Plan';
    html = `
      <div class="form-group"><label>Plan Name</label><input type="text" id="mName" value="${item ? item.name : ''}" placeholder="Starter Pack"></div>
      <div class="form-row">
        <div class="form-group"><label>Price (₹)</label><input type="text" id="mPrice" value="${item ? item.price : ''}" placeholder="4,999"></div>
        <div class="form-group"><label>Featured?</label><select id="mFeatured"><option value="false" ${!item?.featured ? 'selected' : ''}>No</option><option value="true" ${item?.featured ? 'selected' : ''}>Yes</option></select></div>
      </div>
      <div class="form-group"><label>Description</label><input type="text" id="mDesc" value="${item ? item.desc || '' : ''}" placeholder="Plan description"></div>
      <div class="form-group"><label>Features (comma separated)</label><textarea id="mFeatures" placeholder="Feature 1, Feature 2, Feature 3">${item ? item.features : ''}</textarea></div>
    `;
  }

  if (type === 'team') {
    const item = id ? data.team.find(t => t.id === id) : null;
    document.getElementById('modalTitle').textContent = item ? 'Edit Member' : 'Add Member';
    html = `
      <div class="form-group"><label>Full Name</label><input type="text" id="mName" value="${item ? item.name : ''}" placeholder="John Doe"></div>
      <div class="form-row">
        <div class="form-group"><label>Initials</label><input type="text" id="mInitials" value="${item ? item.initials : ''}" placeholder="JD" maxlength="2"></div>
        <div class="form-group"><label>Role</label><input type="text" id="mRole" value="${item ? item.role : ''}" placeholder="Founder & CEO"></div>
      </div>
    `;
  }

  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  currentEdit = null;
  currentType = null;
}

// ---- Save from Modal ----
document.getElementById('modalSave').addEventListener('click', function() {
  const data = getData();
  const type = currentType;

  if (type === 'service') {
    const obj = {
      id: currentEdit || Date.now(),
      icon: document.getElementById('mIcon').value || '📊',
      title: document.getElementById('mTitle').value,
      desc: document.getElementById('mDesc').value,
      features: document.getElementById('mFeatures').value
    };
    if (currentEdit) { data.services = data.services.map(s => s.id === currentEdit ? obj : s); }
    else { data.services.push(obj); }
  }

  if (type === 'portfolio') {
    const obj = {
      id: currentEdit || Date.now(),
      icon: document.getElementById('mIcon').value || '🚀',
      title: document.getElementById('mTitle').value,
      category: document.getElementById('mCategory').value,
      bg: document.getElementById('mBg').value,
      result: document.getElementById('mResult').value
    };
    if (currentEdit) { data.portfolio = data.portfolio.map(p => p.id === currentEdit ? obj : p); }
    else { data.portfolio.push(obj); }
  }

  if (type === 'testimonial') {
    const obj = {
      id: currentEdit || Date.now(),
      name: document.getElementById('mName').value,
      initials: document.getElementById('mInitials').value,
      role: document.getElementById('mRole').value,
      rating: parseInt(document.getElementById('mRating').value),
      text: document.getElementById('mText').value
    };
    if (currentEdit) { data.testimonials = data.testimonials.map(t => t.id === currentEdit ? obj : t); }
    else { data.testimonials.push(obj); }
  }

  if (type === 'pricing') {
    const obj = {
      id: currentEdit || Date.now(),
      name: document.getElementById('mName').value,
      price: document.getElementById('mPrice').value,
      featured: document.getElementById('mFeatured').value === 'true',
      desc: document.getElementById('mDesc').value || '',
      features: document.getElementById('mFeatures').value
    };
    if (currentEdit) { data.pricing = data.pricing.map(p => p.id === currentEdit ? obj : p); }
    else { data.pricing.push(obj); }
  }

  if (type === 'team') {
    const obj = {
      id: currentEdit || Date.now(),
      name: document.getElementById('mName').value,
      initials: document.getElementById('mInitials').value,
      role: document.getElementById('mRole').value
    };
    if (currentEdit) { data.team = data.team.map(t => t.id === currentEdit ? obj : t); }
    else { data.team.push(obj); }
  }

  saveData(data);
  closeModal();
  loadPage(type === 'service' ? 'services' : type === 'testimonial' ? 'testimonials' : type);
});

// ---- Edit ----
function editItem(type, id) {
  openModal(type, id);
}

// ---- Delete ----
function deleteItem(collection, id) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  const data = getData();
  data[collection] = data[collection].filter(item => item.id !== id);
  saveData(data);
  loadPage(collection === 'services' ? 'services' : collection === 'portfolio' ? 'portfolio' : collection === 'testimonials' ? 'testimonials' : collection === 'pricing' ? 'pricing' : 'team');
}

// ---- Messages ----
function markRead(id) {
  const data = getData();
  data.messages = data.messages.map(m => m.id === id ? { ...m, read: true } : m);
  saveData(data);
  renderMessages(data.messages);
}

function clearMessages() {
  if (!confirm('Clear all messages?')) return;
  const data = getData();
  data.messages = [];
  saveData(data);
  renderMessages([]);
}

// ---- Settings ----
function saveSettings() {
  const data = getData();
  data.settings = {
    siteName: document.getElementById('settingSiteName').value,
    tagline: document.getElementById('settingTagline').value,
    phone: document.getElementById('settingPhone').value,
    email: document.getElementById('settingEmail').value,
    address: document.getElementById('settingAddress').value,
    whatsapp: document.getElementById('settingWhatsapp').value,
    facebook: document.getElementById('settingFacebook').value,
    instagram: document.getElementById('settingInstagram').value,
    youtube: document.getElementById('settingYoutube').value,
    linkedin: document.getElementById('settingLinkedin').value
  };
  saveData(data);
  alert('Settings saved successfully!');
}

// ---- Close modal on overlay click ----
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ---- Close modal on Escape ----
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
