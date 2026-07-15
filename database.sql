-- Dhan Prem Studio - MySQL Database Schema
-- Run this in phpMyAdmin or MySQL CLI after creating the database

CREATE DATABASE IF NOT EXISTS dhan_prem_studio;
USE dhan_prem_studio;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(10) DEFAULT '📊',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  features TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(10) DEFAULT '🚀',
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  background VARCHAR(20) DEFAULT 'bg-1',
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  initials VARCHAR(5),
  role VARCHAR(255),
  rating INT DEFAULT 5,
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50),
  featured TINYINT(1) DEFAULT 0,
  description TEXT,
  features TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team table
CREATE TABLE IF NOT EXISTS team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  initials VARCHAR(5),
  role VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  service VARCHAR(255),
  message TEXT,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACTIN Join enquiries
CREATE TABLE IF NOT EXISTS actin_joins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  mobile VARCHAR(50),
  email VARCHAR(255),
  city VARCHAR(100),
  instagram VARCHAR(500),
  followers VARCHAR(50),
  category VARCHAR(100),
  languages VARCHAR(255),
  portfolio_url VARCHAR(500),
  collaborations TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACTIN Brand enquiries
CREATE TABLE IF NOT EXISTS actin_brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255),
  contact_person VARCHAR(255),
  mobile VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  industry VARCHAR(100),
  budget VARCHAR(100),
  influencer_category VARCHAR(100),
  location VARCHAR(255),
  objective VARCHAR(100),
  requirements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE,
  setting_value TEXT
);

-- Site logo (stored as longtext for base64)
CREATE TABLE IF NOT EXISTS site_logo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  logo_data LONGTEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
('siteName', 'Dhan Prem Studio'),
('tagline', 'Digital Marketing & Content Creation Studio'),
('phone', '7985757365'),
('email', 'dhanpremstudios@zohomail.in'),
('address', 'Lucknow Aliganj UP'),
('whatsapp', '917985757365'),
('facebook', 'https://www.facebook.com/share/1BZaRRR38f/'),
('instagram', 'https://www.instagram.com/dhanpremstudios?igsh=dWdxOGM2amI4YTkx'),
('youtube', ''),
('linkedin', 'https://www.linkedin.com/company/dhanprem-studios/')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Insert default services
INSERT INTO services (icon, title, description, features) VALUES
('📈', 'Digital Marketing', 'Result-oriented digital marketing strategies including SEO, PPC, and email marketing to boost your online presence.', 'Google Ads, Email Marketing, CRO, Analytics'),
('🎬', 'Content Creation', 'Engaging video content, reels, shorts, and YouTube content that captivates your audience and drives engagement.', 'Video Production, Reels, YouTube, Podcast'),
('📱', 'Social Media Marketing', 'Strategic social media management across Instagram, Facebook, Twitter, and LinkedIn to grow your following.', 'Instagram, Facebook, LinkedIn, Twitter'),
('🌐', 'SEO Optimization', 'Dominate search rankings with our proven SEO techniques. Get found by your target audience organically.', 'Technical SEO, On-page, Off-page, Local SEO'),
('🎨', 'Brand Identity', 'Complete brand identity solutions including logo design, brand guidelines, and visual storytelling.', 'Logo Design, Brand Guide, Visual Identity, Collateral'),
('💻', 'Web Development', 'Modern, responsive websites and landing pages designed to convert visitors into loyal customers.', 'Custom Website, E-commerce, Landing Pages, Maintenance')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert default portfolio
INSERT INTO portfolio (icon, title, category, background, result) VALUES
('🚀', 'TechStart Growth Campaign', 'marketing', 'bg-1', '300% ROI increase'),
('🎬', 'FreshBites Brand Video', 'content', 'bg-2', '2M+ views'),
('🎨', 'LuxeLife Brand Redesign', 'branding', 'bg-3', 'Complete transformation'),
('💻', 'StyleHub E-commerce', 'web', 'bg-4', '5x conversion rate'),
('📱', 'Foodies Social Campaign', 'marketing', 'bg-5', '50K followers'),
('🎧', 'EduLearn YouTube Series', 'content', 'bg-6', '500K subscribers')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert default testimonials
INSERT INTO testimonials (name, initials, role, rating, text) VALUES
('Rahul Kumar', 'RK', 'CEO, TechStart Solutions', 5, 'Dhan Prem Studio transformed our online presence completely. Their digital marketing strategies increased our leads by 300% in just 3 months.'),
('Priya Sharma', 'PS', 'Founder, FreshBites', 5, 'The content creation team is phenomenal. They created a brand video for us that went viral with 2M+ views.'),
('James Mitchell', 'JM', 'Marketing Director, GlobalTech UK', 5, 'Working with Dhan Prem Studio was a game-changer. They delivered our international campaign on time and within budget.'),
('Ananya Gupta', 'AG', 'Owner, LuxeLife Boutique', 5, 'From brand identity to social media management, they handle everything professionally. Our engagement increased by 500%.')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert default pricing
INSERT INTO pricing (name, price, featured, description, features) VALUES
('Starter Pack', '4,999', 0, 'Perfect for small businesses starting their digital journey', 'Social Media (2 Platforms), 8 Posts/Month, Basic SEO, Monthly Reports, Email Support'),
('Professional', '14,999', 1, 'Complete solution for growing businesses', 'Social Media (4 Platforms), 20 Posts + 4 Reels, Advanced SEO & PPC, Content Strategy, Video (2/mo), Priority Support'),
('Enterprise', '29,999', 0, '360° digital marketing for established brands', 'All Social Platforms, Unlimited Posts, Full Marketing Suite, Video (8/mo), Brand Strategy, 24/7 Manager')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert default team
INSERT INTO team (name, initials, role) VALUES
('Dhan Prem', 'DP', 'Founder & CEO'),
('Arjun Kapoor', 'AK', 'Head of Marketing'),
('Neha Singh', 'NS', 'Creative Director'),
('Rahul Verma', 'RV', 'Lead Developer')
ON DUPLICATE KEY UPDATE name = VALUES(name);
