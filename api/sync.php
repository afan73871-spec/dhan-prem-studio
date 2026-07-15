<?php
// Auto-sync: updates static HTML files from database
// Called automatically after admin panel changes
require_once __DIR__ . '/config.php';

$baseDir = dirname(__DIR__);

try {
    $services = $pdo->query('SELECT * FROM services ORDER BY id')->fetchAll();
    $portfolio = $pdo->query('SELECT * FROM portfolio ORDER BY id')->fetchAll();
    $testimonials = $pdo->query('SELECT * FROM testimonials ORDER BY id')->fetchAll();
    $pricing = $pdo->query('SELECT * FROM pricing ORDER BY id')->fetchAll();

    // -- Sync index.html --
    $html = file_get_contents($baseDir . '/index.html');

    $servicesHtml = '';
    foreach ($services as $s) {
        $icon = $s['icon'] ?: '📊';
        $servicesHtml .= '        <div class="service-card"><div class="service-icon">' . $icon . '</div><h3>' . htmlspecialchars($s['title']) . '</h3><p>' . htmlspecialchars($s['description'] ?? '') . '</p><a href="services/index.html" class="service-link">Learn More &#10132;</a></div>' . "\n";
    }
    $html = preg_replace(
        '/(<div class="services-grid[^"]*" id="servicesGrid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>\s*<!-- =+ PORTFOLIO)/',
        "$1\n$servicesHtml$3",
        $html
    );

    $portfolioHtml = '';
    foreach ($portfolio as $p) {
        $bg = $p['background'] ?: 'bg-1';
        $icon = $p['icon'] ?: '🚀';
        $portfolioHtml .= '        <div class="portfolio-card" data-category="' . htmlspecialchars($p['category']) . '"><div class="portfolio-image"><div class="portfolio-image-bg ' . $bg . '">' . $icon . '</div><div class="portfolio-overlay"><h4>' . htmlspecialchars($p['title']) . '</h4><p>' . htmlspecialchars($p['result'] ?? '') . '</p></div></div><div class="portfolio-info"><span class="portfolio-tag">' . htmlspecialchars($p['category']) . '</span><h4>' . htmlspecialchars($p['title']) . '</h4></div></div>' . "\n";
    }
    $html = preg_replace(
        '/(<div class="portfolio-grid[^"]*" id="portfolioGrid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>\s*<!-- =+ TESTIMONIALS)/',
        "$1\n$portfolioHtml$3",
        $html
    );

    $testiHtml = '';
    $dotsHtml = '';
    foreach ($testimonials as $i => $t) {
        $stars = str_repeat('&#9733;', $t['rating'] ?? 5);
        $testiHtml .= '          <div class="testimonial-card"><div class="testimonial-stars">' . $stars . '</div><p class="testimonial-text">"' . htmlspecialchars($t['text']) . '"</p><div class="testimonial-author"><div class="testimonial-avatar">' . htmlspecialchars($t['initials']) . '</div><div class="testimonial-info"><strong>' . htmlspecialchars($t['name']) . '</strong><span>' . htmlspecialchars($t['role'] ?? '') . '</span></div></div></div>' . "\n";
        $active = $i === 0 ? ' active' : '';
        $dotsHtml .= '          <button class="testimonial-dot' . $active . '"></button>' . "\n";
    }
    $html = preg_replace(
        '/(<div class="testimonials-track[^"]*" id="testimonialsTrack">)([\s\S]*?)(<\/div>\s*<div class="testimonial-nav[^"]*" id="testimonialNav">)([\s\S]*?)(<\/div>)/',
        "$1\n$testiHtml        $3\n$dotsHtml        $5",
        $html
    );

    $pricingHtml = '';
    foreach ($pricing as $p) {
        $features = array_filter(array_map('trim', explode(',', $p['features'] ?? '')));
        $featList = '';
        foreach ($features as $f) $featList .= '<li><span class="check">&#10003;</span> ' . htmlspecialchars($f) . '</li>';
        $featured = $p['featured'] ? ' featured' : '';
        $pricingHtml .= '        <div class="pricing-card' . $featured . '"><h3>' . htmlspecialchars($p['name']) . '</h3><div class="pricing-price">&#8377;' . $p['price'] . '<span>/month</span></div><p class="pricing-desc">' . htmlspecialchars($p['description'] ?? '') . '</p><ul class="pricing-features">' . $featList . '</ul><a href="contact/index.html" class="btn btn-primary">Get Started</a></div>' . "\n";
    }
    $html = preg_replace(
        '/(<div class="pricing-grid[^"]*" id="pricingGrid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>\s*<!-- =+ CTA)/',
        "$1\n$pricingHtml$3",
        $html
    );

    file_put_contents($baseDir . '/index.html', $html);

    // -- Sync services/index.html --
    $svcHtml = file_get_contents($baseDir . '/services/index.html');
    $svcDetailHtml = '';
    foreach ($services as $s) {
        $icon = $s['icon'] ?: '📊';
        $features = array_filter(array_map('trim', explode(',', $s['features'] ?? '')));
        $featList = '';
        foreach ($features as $f) $featList .= '<li>' . htmlspecialchars($f) . '</li>';
        $svcDetailHtml .= '        <div class="service-detail-card"><div class="service-detail-icon">' . $icon . '</div><div><h3>' . htmlspecialchars($s['title']) . '</h3><p>' . htmlspecialchars($s['description'] ?? '') . '</p><ul>' . $featList . '</ul></div></div>' . "\n";
    }
    $svcHtml = preg_replace(
        '/(<div class="services-detail-grid[^"]*" id="servicesDetailGrid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/',
        "$1\n$svcDetailHtml$3",
        $svcHtml
    );
    file_put_contents($baseDir . '/services/index.html', $svcHtml);

    // -- Sync portfolio/index.html --
    $portHtml = file_get_contents($baseDir . '/portfolio/index.html');
    $portCardsHtml = '';
    foreach ($portfolio as $p) {
        $bg = $p['background'] ?: 'bg-1';
        $icon = $p['icon'] ?: '🚀';
        $portCardsHtml .= '        <div class="portfolio-card" data-category="' . htmlspecialchars($p['category']) . '"><div class="portfolio-image"><div class="portfolio-image-bg ' . $bg . '">' . $icon . '</div><div class="portfolio-overlay"><h4>' . htmlspecialchars($p['title']) . '</h4><p>' . htmlspecialchars($p['result'] ?? '') . '</p></div></div><div class="portfolio-info"><span class="portfolio-tag">' . htmlspecialchars($p['category']) . '</span><h4>' . htmlspecialchars($p['title']) . '</h4></div></div>' . "\n";
    }
    $portHtml = preg_replace(
        '/(<div class="portfolio-grid[^"]*" id="portfolioGrid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/',
        "$1\n$portCardsHtml$3",
        $portHtml
    );
    file_put_contents($baseDir . '/portfolio/index.html', $portHtml);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
