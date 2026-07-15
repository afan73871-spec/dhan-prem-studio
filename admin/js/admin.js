/* ============================================
   ADMIN PANEL - Dhan Prem Studio
   MySQL Backend Version
   ============================================ */

const API = 'http://localhost:3001/api';

// ---- Data Fetch ----
async function apiFetch(url, options = {}) {
  const res = await fetch(API + url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  return res.json();
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

if (localStorage.getItem('dpAdminLoggedIn') === 'true') {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminLayout').classList.add('active');
  loadDashboard();
}

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

document.getElementById('mobileToggle').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('active');
});

// ---- Load Dashboard ----
async function loadDashboard() {
  try {
    const stats = await apiFetch('/stats');
    const messages = await apiFetch('/messages');
    document.getElementById('dashboardStats').innerHTML = `
      <div class="stat-card"><div class="stat-card-icon yellow">📈</div><div><h3>${stats.services}</h3><p>Services</p></div></div>
      <div class="stat-card"><div class="stat-card-icon green">🖼️</div><div><h3>${stats.portfolio}</h3><p>Portfolio</p></div></div>
      <div class="stat-card"><div class="stat-card-icon blue">💬</div><div><h3>${stats.testimonials}</h3><p>Testimonials</p></div></div>
      <div class="stat-card"><div class="stat-card-icon red">✉️</div><div><h3>${stats.messages}</h3><p>Messages</p></div></div>
      <div class="stat-card"><div class="stat-card-icon yellow">⭐</div><div><h3>${stats.joins}</h3><p>ACTIN Joins</p></div></div>
      <div class="stat-card"><div class="stat-card-icon green">💼</div><div><h3>${stats.brands}</h3><p>Brand Enquiries</p></div></div>
    `;
    const recent = messages.slice(0, 5);
    document.getElementById('recentMessages').innerHTML = recent.length > 0
      ? recent.map(m => `<div class="message-item ${m.is_read ? '' : 'unread'}"><div class="message-header"><h4>${m.name} — ${m.email}</h4><span>${new Date(m.created_at).toLocaleDateString()}</span></div><div class="message-preview">${m.message || ''}</div></div>`).join('')
      : '<div class="empty-state"><span>📭</span><p>No messages yet</p></div>';
  } catch (e) { console.error('Dashboard error:', e); }
}

// ---- Load Pages ----
async function loadPage(page) {
  try {
    switch(page) {
      case 'dashboard': loadDashboard(); break;
      case 'services': { const d = await apiFetch('/services'); renderServices(d); break; }
      case 'portfolio': { const d = await apiFetch('/portfolio'); renderPortfolio(d); break; }
      case 'testimonials': { const d = await apiFetch('/testimonials'); renderTestimonials(d); break; }
      case 'pricing': { const d = await apiFetch('/pricing'); renderPricing(d); break; }
      case 'team': { const d = await apiFetch('/team'); renderTeam(d); break; }
      case 'messages': { const d = await apiFetch('/messages'); renderMessages(d); break; }
      case 'actin-messages': loadActinMessages(); break;
      case 'settings': { const d = await apiFetch('/settings'); loadSettings(d); loadLogoPreview(); break; }
    }
  } catch (e) { console.error('Load page error:', e); }
}

// ---- Render Functions ----
function renderServices(items) {
  document.getElementById('servicesTable').innerHTML = items.map(s => `
    <tr><td style="font-size:1.5rem">${s.icon}</td><td><strong>${s.title}</strong></td><td>${(s.description||'').substring(0, 60)}...</td><td><div class="action-btns"><button class="action-btn edit" onclick="editItem('service', ${s.id})">✎</button><button class="action-btn delete" onclick="deleteItem('services', ${s.id})">🗑</button></div></td></tr>
  `).join('');
}

function renderPortfolio(items) {
  document.getElementById('portfolioTable').innerHTML = items.map(p => `
    <tr><td>${p.icon || '🚀'} <strong>${p.title}</strong></td><td><span class="badge badge-info">${p.category}</span></td><td>${p.result || ''}</td><td><div class="action-btns"><button class="action-btn edit" onclick="editItem('portfolio', ${p.id})">✎</button><button class="action-btn delete" onclick="deleteItem('portfolio', ${p.id})">🗑</button></div></td></tr>
  `).join('');
}

function renderTestimonials(items) {
  document.getElementById('testimonialsTable').innerHTML = items.map(t => `
    <tr><td><strong>${t.name}</strong><br><small style="color:var(--text-dim)">${(t.text||'').substring(0, 40)}...</small></td><td>${t.role || ''}</td><td>${'⭐'.repeat(t.rating || 0)}</td><td><div class="action-btns"><button class="action-btn edit" onclick="editItem('testimonial', ${t.id})">✎</button><button class="action-btn delete" onclick="deleteItem('testimonials', ${t.id})">🗑</button></div></td></tr>
  `).join('');
}

function renderPricing(items) {
  document.getElementById('pricingTable').innerHTML = items.map(p => `
    <tr><td><strong>${p.name}</strong></td><td>₹${p.price}/mo</td><td>${p.featured ? '<span class="badge badge-warning">Featured</span>' : '<span class="badge badge-info">Regular</span>'}</td><td><div class="action-btns"><button class="action-btn edit" onclick="editItem('pricing', ${p.id})">✎</button><button class="action-btn delete" onclick="deleteItem('pricing', ${p.id})">🗑</button></div></td></tr>
  `).join('');
}

function renderTeam(items) {
  document.getElementById('teamTable').innerHTML = items.map(t => `
    <tr><td><strong>${t.name}</strong></td><td><span style="background:linear-gradient(135deg,#FACC15,#F59E0B);color:#18181B;padding:4px 12px;border-radius:8px;font-weight:700">${t.initials}</span></td><td>${t.role || ''}</td><td><div class="action-btns"><button class="action-btn edit" onclick="editItem('team', ${t.id})">✎</button><button class="action-btn delete" onclick="deleteItem('team', ${t.id})">🗑</button></div></td></tr>
  `).join('');
}

function renderMessages(items) {
  document.getElementById('messagesList').innerHTML = items.length > 0
    ? items.map(m => `
      <div class="message-item ${m.is_read ? '' : 'unread'}" onclick="markRead(${m.id})">
        <div class="message-header"><h4>${m.name} — ${m.email} ${m.phone ? '| ' + m.phone : ''}</h4><span>${new Date(m.created_at).toLocaleDateString()}</span></div>
        <div class="message-preview">${m.service ? '<span class="badge badge-info">' + m.service + '</span> ' : ''}${m.message || ''}</div>
      </div>
    `).join('')
    : '<div class="empty-state"><span>📭</span><p>No messages yet.</p></div>';
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
  let html = '';

  if (type === 'service') {
    document.getElementById('modalTitle').textContent = id ? 'Edit Service' : 'Add Service';
    html = `<div class="form-group"><label>Icon (emoji)</label><input type="text" id="mIcon" placeholder="📈"></div><div class="form-group"><label>Title</label><input type="text" id="mTitle" placeholder="Service name"></div><div class="form-group"><label>Description</label><textarea id="mDesc" placeholder="Description"></textarea></div><div class="form-group"><label>Features (comma separated)</label><input type="text" id="mFeatures" placeholder="Feature 1, Feature 2"></div>`;
  }
  if (type === 'portfolio') {
    document.getElementById('modalTitle').textContent = id ? 'Edit Project' : 'Add Project';
    html = `<div class="form-group"><label>Icon</label><input type="text" id="mIcon" placeholder="🚀"></div><div class="form-group"><label>Title</label><input type="text" id="mTitle" placeholder="Project name"></div><div class="form-row"><div class="form-group"><label>Category</label><select id="mCategory"><option value="marketing">Marketing</option><option value="content">Content</option><option value="branding">Branding</option><option value="web">Web</option></select></div><div class="form-group"><label>Background</label><select id="mBg"><option value="bg-1">Purple</option><option value="bg-2">Pink</option><option value="bg-3">Orange</option><option value="bg-4">Green</option><option value="bg-5">Blue</option><option value="bg-6">Red</option></select></div></div><div class="form-group"><label>Result</label><input type="text" id="mResult" placeholder="e.g. 300% ROI"></div>`;
  }
  if (type === 'testimonial') {
    document.getElementById('modalTitle').textContent = id ? 'Edit Testimonial' : 'Add Testimonial';
    html = `<div class="form-row"><div class="form-group"><label>Name</label><input type="text" id="mName" placeholder="John Doe"></div><div class="form-group"><label>Initials</label><input type="text" id="mInitials" placeholder="JD" maxlength="2"></div></div><div class="form-group"><label>Role</label><input type="text" id="mRole" placeholder="CEO, Company"></div><div class="form-group"><label>Rating (1-5)</label><input type="number" id="mRating" value="5" min="1" max="5"></div><div class="form-group"><label>Text</label><textarea id="mText" placeholder="What they said..."></textarea></div>`;
  }
  if (type === 'pricing') {
    document.getElementById('modalTitle').textContent = id ? 'Edit Plan' : 'Add Plan';
    html = `<div class="form-group"><label>Plan Name</label><input type="text" id="mName" placeholder="Starter Pack"></div><div class="form-row"><div class="form-group"><label>Price (₹)</label><input type="text" id="mPrice" placeholder="4,999"></div><div class="form-group"><label>Featured?</label><select id="mFeatured"><option value="false">No</option><option value="true">Yes</option></select></div></div><div class="form-group"><label>Description</label><input type="text" id="mDesc" placeholder="Plan description"></div><div class="form-group"><label>Features</label><textarea id="mFeatures" placeholder="Feature 1, Feature 2"></textarea></div>`;
  }
  if (type === 'team') {
    document.getElementById('modalTitle').textContent = id ? 'Edit Member' : 'Add Member';
    html = `<div class="form-group"><label>Full Name</label><input type="text" id="mName" placeholder="John Doe"></div><div class="form-row"><div class="form-group"><label>Initials</label><input type="text" id="mInitials" placeholder="JD" maxlength="2"></div><div class="form-group"><label>Role</label><input type="text" id="mRole" placeholder="Founder & CEO"></div></div>`;
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
document.getElementById('modalSave').addEventListener('click', async function() {
  const type = currentType;
  let url = '', body = {};

  if (type === 'service') {
    body = { icon: document.getElementById('mIcon').value || '📊', title: document.getElementById('mTitle').value, desc: document.getElementById('mDesc').value, features: document.getElementById('mFeatures').value };
    url = currentEdit ? `/services/${currentEdit}` : '/services';
  }
  if (type === 'portfolio') {
    body = { icon: document.getElementById('mIcon').value || '🚀', title: document.getElementById('mTitle').value, category: document.getElementById('mCategory').value, bg: document.getElementById('mBg').value, result: document.getElementById('mResult').value };
    url = currentEdit ? `/portfolio/${currentEdit}` : '/portfolio';
  }
  if (type === 'testimonial') {
    body = { name: document.getElementById('mName').value, initials: document.getElementById('mInitials').value, role: document.getElementById('mRole').value, rating: parseInt(document.getElementById('mRating').value), text: document.getElementById('mText').value };
    url = currentEdit ? `/testimonials/${currentEdit}` : '/testimonials';
  }
  if (type === 'pricing') {
    body = { name: document.getElementById('mName').value, price: document.getElementById('mPrice').value, featured: document.getElementById('mFeatured').value === 'true', desc: document.getElementById('mDesc').value || '', features: document.getElementById('mFeatures').value };
    url = currentEdit ? `/pricing/${currentEdit}` : '/pricing';
  }
  if (type === 'team') {
    body = { name: document.getElementById('mName').value, initials: document.getElementById('mInitials').value, role: document.getElementById('mRole').value };
    url = currentEdit ? `/team/${currentEdit}` : '/team';
  }

  try {
    await apiFetch(url, { method: currentEdit ? 'PUT' : 'POST', body });
    closeModal();
    loadPage(type === 'service' ? 'services' : type === 'testimonial' ? 'testimonials' : type);
    autoSync();
  } catch (e) { alert('Error saving: ' + e.message); }
});

function editItem(type, id) { openModal(type, id); }

async function deleteItem(collection, id) {
  if (!confirm('Delete this item?')) return;
  const endpoint = collection === 'testimonials' ? 'testimonials' : collection;
  try {
    await apiFetch(`/${endpoint}/${id}`, { method: 'DELETE' });
    loadPage(collection === 'services' ? 'services' : collection === 'portfolio' ? 'portfolio' : collection === 'testimonials' ? 'testimonials' : collection === 'pricing' ? 'pricing' : 'team');
    autoSync();
  } catch (e) { alert('Error deleting: ' + e.message); }
}

// ---- Messages ----
async function markRead(id) {
  try {
    await apiFetch(`/messages/${id}/read`, { method: 'PUT' });
    const d = await apiFetch('/messages');
    renderMessages(d);
  } catch (e) { console.error(e); }
}

async function clearMessages() {
  if (!confirm('Clear all messages?')) return;
  try { await apiFetch('/messages', { method: 'DELETE' }); renderMessages([]); } catch (e) { console.error(e); }
}

// ---- ACTIN Messages ----
async function loadActinMessages() {
  try {
    const joins = await apiFetch('/actin/joins');
    const brands = await apiFetch('/actin/brands');

    document.getElementById('actinStats').innerHTML = `
      <div class="stat-card"><div class="stat-card-icon yellow">⭐</div><div><h3>${joins.length}</h3><p>Join Enquiries</p></div></div>
      <div class="stat-card"><div class="stat-card-icon green">💼</div><div><h3>${brands.length}</h3><p>Brand Enquiries</p></div></div>
      <div class="stat-card"><div class="stat-card-icon blue">📊</div><div><h3>${joins.length + brands.length}</h3><p>Total</p></div></div>
    `;

    document.getElementById('actinJoinList').innerHTML = joins.length > 0
      ? joins.map(s => `<div class="message-item unread"><div class="message-header"><h4>${s.full_name} — ${s.email}</h4><span>${new Date(s.created_at).toLocaleString()}</span></div><div class="message-preview" style="margin-top:8px;"><span class="badge badge-info">${s.category || 'N/A'}</span><span class="badge badge-warning">${s.followers || 'N/A'} followers</span>${s.city ? '<span class="badge badge-info">' + s.city + '</span>' : ''}</div><div style="margin-top:8px;color:var(--text-dim);font-size:0.9rem;"><p><strong>Mobile:</strong> ${s.mobile || 'N/A'} | <strong>Instagram:</strong> ${s.instagram || 'N/A'}</p><p><strong>Languages:</strong> ${s.languages || 'N/A'}</p>${s.collaborations ? '<p><strong>Collaborations:</strong> ' + s.collaborations + '</p>' : ''}${s.message ? '<p><strong>Message:</strong> ' + s.message + '</p>' : ''}</div></div>`).join('')
      : '<div class="empty-state"><span>📭</span><p>No join enquiries yet.</p></div>';

    document.getElementById('actinBrandList').innerHTML = brands.length > 0
      ? brands.map(s => `<div class="message-item unread"><div class="message-header"><h4>${s.company} — ${s.contact_person}</h4><span>${new Date(s.created_at).toLocaleString()}</span></div><div class="message-preview" style="margin-top:8px;"><span class="badge badge-info">${s.industry || 'N/A'}</span><span class="badge badge-warning">${s.influencer_category || 'N/A'}</span>${s.budget ? '<span class="badge badge-info">' + s.budget + '</span>' : ''}</div><div style="margin-top:8px;color:var(--text-dim);font-size:0.9rem;"><p><strong>Mobile:</strong> ${s.mobile || 'N/A'} | <strong>Email:</strong> ${s.email || 'N/A'}</p><p><strong>Location:</strong> ${s.location || 'N/A'} | <strong>Objective:</strong> ${s.objective || 'N/A'}</p>${s.requirements ? '<p><strong>Requirements:</strong> ' + s.requirements + '</p>' : ''}</div></div>`).join('')
      : '<div class="empty-state"><span>📭</span><p>No brand enquiries yet.</p></div>';
  } catch (e) { console.error('ACTIN load error:', e); }
}

async function clearActinMessages(type) {
  if (!confirm('Clear all ' + type + ' enquiries?')) return;
  try { await apiFetch(`/actin/${type}`, { method: 'DELETE' }); loadActinMessages(); } catch (e) { console.error(e); }
}

// ---- Settings ----
async function saveSettings() {
  try {
    await apiFetch('/settings', { method: 'PUT', body: {
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
    }});
    alert('Settings saved!');
  } catch (e) { alert('Error: ' + e.message); }
}

// ---- Logo Upload ----
let logoDataUrl = null;

async function loadLogoPreview() {
  try {
    const data = await apiFetch('/logo');
    const img = document.getElementById('logoPreviewImg');
    const noPreview = document.getElementById('logoNoPreview');
    if (data.logo) {
      img.src = data.logo;
      img.style.display = 'block';
      noPreview.style.display = 'none';
      logoDataUrl = data.logo;
    } else {
      img.style.display = 'none';
      noPreview.style.display = 'block';
    }
  } catch (e) { console.error(e); }
}

document.getElementById('logoUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert('Max 2MB'); return; }
  const reader = new FileReader();
  reader.onload = function(ev) {
    logoDataUrl = ev.target.result;
    document.getElementById('logoPreviewImg').src = logoDataUrl;
    document.getElementById('logoPreviewImg').style.display = 'block';
    document.getElementById('logoNoPreview').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

async function saveLogo() {
  if (!logoDataUrl) { alert('Select a logo first'); return; }
  try {
    await apiFetch('/logo', { method: 'PUT', body: { logo: logoDataUrl } });
    alert('Logo saved! Refresh site to see changes.');
  } catch (e) { alert('Error: ' + e.message); }
}

async function removeLogo() {
  if (!confirm('Remove logo?')) return;
  try {
    await apiFetch('/logo', { method: 'PUT', body: { logo: null } });
    logoDataUrl = null;
    document.getElementById('logoPreviewImg').style.display = 'none';
    document.getElementById('logoNoPreview').style.display = 'block';
    document.getElementById('logoUpload').value = '';
  } catch (e) { alert('Error: ' + e.message); }
}

// ---- Close modal ----
document.getElementById('modalOverlay').addEventListener('click', function(e) { if (e.target === this) closeModal(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

// ---- Auto-sync to static HTML after every change ----
async function autoSync() {
  try { await apiFetch('/sync-static', { method: 'POST' }); } catch (e) {}
}

// ---- Sync to Static HTML (GitHub Pages) ----
async function syncToStatic() {
  const result = document.getElementById('syncResult');
  result.innerHTML = 'Syncing...';
  result.style.color = '#FACC15';
  try {
    const data = await apiFetch('/sync-static', { method: 'POST' });
    if (data.success) {
      result.innerHTML = '&#10003; Done! Now run: <br><code style="background:#333;padding:3px 8px;border-radius:4px;display:inline-block;margin-top:5px">git add . && git commit -m "update" && git push</code>';
      result.style.color = '#10B981';
    } else {
      result.innerHTML = 'Error: ' + (data.error || 'Unknown error');
      result.style.color = '#EF4444';
    }
  } catch (e) {
    result.innerHTML = 'Error: ' + e.message;
    result.style.color = '#EF4444';
  }
}
