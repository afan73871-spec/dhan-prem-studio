require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dhan_prem_studio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ---- SERVICES ----
app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY id');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/services', async (req, res) => {
  try {
    const { icon, title, desc, features } = req.body;
    const [result] = await pool.query('INSERT INTO services (icon, title, description, features) VALUES (?, ?, ?, ?)', [icon, title, desc, features]);
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const { icon, title, desc, features } = req.body;
    await pool.query('UPDATE services SET icon=?, title=?, description=?, features=? WHERE id=?', [icon, title, desc, features, req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM services WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- PORTFOLIO ----
app.get('/api/portfolio', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio ORDER BY id');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const { icon, title, category, bg, result } = req.body;
    const [result2] = await pool.query('INSERT INTO portfolio (icon, title, category, background, result) VALUES (?, ?, ?, ?, ?)', [icon, title, category, bg, result]);
    res.json({ id: result2.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/portfolio/:id', async (req, res) => {
  try {
    const { icon, title, category, bg, result } = req.body;
    await pool.query('UPDATE portfolio SET icon=?, title=?, category=?, background=?, result=? WHERE id=?', [icon, title, category, bg, result, req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- TESTIMONIALS ----
app.get('/api/testimonials', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY id');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, initials, role, rating, text } = req.body;
    const [result] = await pool.query('INSERT INTO testimonials (name, initials, role, rating, text) VALUES (?, ?, ?, ?, ?)', [name, initials, role, rating, text]);
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const { name, initials, role, rating, text } = req.body;
    await pool.query('UPDATE testimonials SET name=?, initials=?, role=?, rating=?, text=? WHERE id=?', [name, initials, role, rating, text, req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- PRICING ----
app.get('/api/pricing', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pricing ORDER BY id');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/pricing', async (req, res) => {
  try {
    const { name, price, featured, desc, features } = req.body;
    const [result] = await pool.query('INSERT INTO pricing (name, price, featured, description, features) VALUES (?, ?, ?, ?, ?)', [name, price, featured ? 1 : 0, desc, features]);
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/pricing/:id', async (req, res) => {
  try {
    const { name, price, featured, desc, features } = req.body;
    await pool.query('UPDATE pricing SET name=?, price=?, featured=?, description=?, features=? WHERE id=?', [name, price, featured ? 1 : 0, desc, features, req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/pricing/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pricing WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- TEAM ----
app.get('/api/team', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team ORDER BY id');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/team', async (req, res) => {
  try {
    const { name, initials, role } = req.body;
    const [result] = await pool.query('INSERT INTO team (name, initials, role) VALUES (?, ?, ?)', [name, initials, role]);
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/team/:id', async (req, res) => {
  try {
    const { name, initials, role } = req.body;
    await pool.query('UPDATE team SET name=?, initials=?, role=? WHERE id=?', [name, initials, role, req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM team WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- MESSAGES ----
app.get('/api/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY id DESC');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const [result] = await pool.query('INSERT INTO messages (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)', [name, email, phone, service, message]);
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/messages/:id/read', async (req, res) => {
  try {
    await pool.query('UPDATE messages SET is_read=1 WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/messages', async (req, res) => {
  try {
    await pool.query('DELETE FROM messages');
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- ACTIN JOINS ----
app.get('/api/actin/joins', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM actin_joins ORDER BY id DESC');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/actin/joins', async (req, res) => {
  try {
    const { fullName, mobile, email, city, instagram, followers, category, languages, portfolio, collaborations, message } = req.body;
    const [result] = await pool.query('INSERT INTO actin_joins (full_name, mobile, email, city, instagram, followers, category, languages, portfolio_url, collaborations, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, mobile, email, city, instagram, followers, category, languages, portfolio, collaborations, message]);
    res.json({ id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/actin/joins', async (req, res) => {
  try {
    await pool.query('DELETE FROM actin_joins');
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- ACTIN BRANDS ----
app.get('/api/actin/brands', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM actin_brands ORDER BY id DESC');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/actin/brands', async (req, res) => {
  try {
    const { company, contactPerson, mobile, email, website, industry, budget, influencerCategory, location, objective, requirements } = req.body;
    const [result] = await pool.query('INSERT INTO actin_brands (company, contact_person, mobile, email, website, industry, budget, influencer_category, location, objective, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [company, contactPerson, mobile, email, website, industry, budget, influencerCategory, location, objective, requirements]);
    res.json({ id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/actin/brands', async (req, res) => {
  try {
    await pool.query('DELETE FROM actin_brands');
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- SETTINGS ----
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings');
    const settings = {};
    rows.forEach(r => settings[r.setting_key] = r.setting_value);
    res.json(settings);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/settings', async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    for (const [key, value] of entries) {
      await pool.query('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=?', [key, value, value]);
    }
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- LOGO ----
app.get('/api/logo', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT logo_data FROM site_logo ORDER BY id DESC LIMIT 1');
    res.json({ logo: rows.length > 0 ? rows[0].logo_data : null });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/logo', async (req, res) => {
  try {
    const { logo } = req.body;
    const [rows] = await pool.query('SELECT id FROM site_logo LIMIT 1');
    if (rows.length > 0) {
      await pool.query('UPDATE site_logo SET logo_data=? WHERE id=?', [logo, rows[0].id]);
    } else {
      await pool.query('INSERT INTO site_logo (logo_data) VALUES (?)', [logo]);
    }
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ---- DASHBOARD STATS ----
app.get('/api/stats', async (req, res) => {
  try {
    const [[s]] = await pool.query('SELECT COUNT(*) as count FROM services');
    const [[p]] = await pool.query('SELECT COUNT(*) as count FROM portfolio');
    const [[t]] = await pool.query('SELECT COUNT(*) as count FROM testimonials');
    const [[m]] = await pool.query('SELECT COUNT(*) as count FROM messages');
    const [[j]] = await pool.query('SELECT COUNT(*) as count FROM actin_joins');
    const [[b]] = await pool.query('SELECT COUNT(*) as count FROM actin_brands');
    res.json({ services: s.count, portfolio: p.count, testimonials: t.count, messages: m.count, joins: j.count, brands: b.count });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
