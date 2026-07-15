<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace('/api', '', $uri);
$uri = rtrim($uri, '/');
$segments = array_values(array_filter(explode('/', $uri)));
$resource = $segments[0] ?? '';
$id = $segments[1] ?? null;
$sub = $segments[2] ?? null;

try {
    // ---- SERVICES ----
    if ($resource === 'services') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT * FROM services ORDER BY id')->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            $stmt = $pdo->prepare('INSERT INTO services (icon, title, description, features) VALUES (?, ?, ?, ?)');
            $stmt->execute([$d['icon'] ?? '📊', $d['title'] ?? '', $d['desc'] ?? '', $d['features'] ?? '']);
            echo json_encode(['id' => $pdo->lastInsertId()] + $d);
        } elseif ($method === 'PUT' && $id) {
            $d = getInput();
            $stmt = $pdo->prepare('UPDATE services SET icon=?, title=?, description=?, features=? WHERE id=?');
            $stmt->execute([$d['icon'] ?? '', $d['title'] ?? '', $d['desc'] ?? '', $d['features'] ?? '', $id]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $id) {
            $pdo->prepare('DELETE FROM services WHERE id=?')->execute([$id]);
            echo json_encode(['success' => true]);
        }
    }

    // ---- PORTFOLIO ----
    elseif ($resource === 'portfolio') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT * FROM portfolio ORDER BY id')->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            $stmt = $pdo->prepare('INSERT INTO portfolio (icon, title, category, background, result) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$d['icon'] ?? '🚀', $d['title'] ?? '', $d['category'] ?? '', $d['bg'] ?? 'bg-1', $d['result'] ?? '']);
            echo json_encode(['id' => $pdo->lastInsertId()] + $d);
        } elseif ($method === 'PUT' && $id) {
            $d = getInput();
            $stmt = $pdo->prepare('UPDATE portfolio SET icon=?, title=?, category=?, background=?, result=? WHERE id=?');
            $stmt->execute([$d['icon'] ?? '', $d['title'] ?? '', $d['category'] ?? '', $d['bg'] ?? '', $d['result'] ?? '', $id]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $id) {
            $pdo->prepare('DELETE FROM portfolio WHERE id=?')->execute([$id]);
            echo json_encode(['success' => true]);
        }
    }

    // ---- TESTIMONIALS ----
    elseif ($resource === 'testimonials') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT * FROM testimonials ORDER BY id')->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            $stmt = $pdo->prepare('INSERT INTO testimonials (name, initials, role, rating, text) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$d['name'] ?? '', $d['initials'] ?? '', $d['role'] ?? '', $d['rating'] ?? 5, $d['text'] ?? '']);
            echo json_encode(['id' => $pdo->lastInsertId()] + $d);
        } elseif ($method === 'PUT' && $id) {
            $d = getInput();
            $stmt = $pdo->prepare('UPDATE testimonials SET name=?, initials=?, role=?, rating=?, text=? WHERE id=?');
            $stmt->execute([$d['name'] ?? '', $d['initials'] ?? '', $d['role'] ?? '', $d['rating'] ?? 5, $d['text'] ?? '', $id]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $id) {
            $pdo->prepare('DELETE FROM testimonials WHERE id=?')->execute([$id]);
            echo json_encode(['success' => true]);
        }
    }

    // ---- PRICING ----
    elseif ($resource === 'pricing') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT * FROM pricing ORDER BY id')->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            $stmt = $pdo->prepare('INSERT INTO pricing (name, price, featured, description, features) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$d['name'] ?? '', $d['price'] ?? 0, isset($d['featured']) ? ($d['featured'] ? 1 : 0) : 0, $d['desc'] ?? '', $d['features'] ?? '']);
            echo json_encode(['id' => $pdo->lastInsertId()] + $d);
        } elseif ($method === 'PUT' && $id) {
            $d = getInput();
            $stmt = $pdo->prepare('UPDATE pricing SET name=?, price=?, featured=?, description=?, features=? WHERE id=?');
            $stmt->execute([$d['name'] ?? '', $d['price'] ?? 0, isset($d['featured']) ? ($d['featured'] ? 1 : 0) : 0, $d['desc'] ?? '', $d['features'] ?? '', $id]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $id) {
            $pdo->prepare('DELETE FROM pricing WHERE id=?')->execute([$id]);
            echo json_encode(['success' => true]);
        }
    }

    // ---- TEAM ----
    elseif ($resource === 'team') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT * FROM team ORDER BY id')->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            $stmt = $pdo->prepare('INSERT INTO team (name, initials, role) VALUES (?, ?, ?)');
            $stmt->execute([$d['name'] ?? '', $d['initials'] ?? '', $d['role'] ?? '']);
            echo json_encode(['id' => $pdo->lastInsertId()] + $d);
        } elseif ($method === 'PUT' && $id) {
            $d = getInput();
            $stmt = $pdo->prepare('UPDATE team SET name=?, initials=?, role=? WHERE id=?');
            $stmt->execute([$d['name'] ?? '', $d['initials'] ?? '', $d['role'] ?? '', $id]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $id) {
            $pdo->prepare('DELETE FROM team WHERE id=?')->execute([$id]);
            echo json_encode(['success' => true]);
        }
    }

    // ---- MESSAGES ----
    elseif ($resource === 'messages') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT * FROM messages ORDER BY id DESC')->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            $stmt = $pdo->prepare('INSERT INTO messages (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$d['name'] ?? '', $d['email'] ?? '', $d['phone'] ?? '', $d['service'] ?? '', $d['message'] ?? '']);
            echo json_encode(['id' => $pdo->lastInsertId()] + $d);
        } elseif ($method === 'PUT' && $id && $sub === 'read') {
            $pdo->prepare('UPDATE messages SET is_read=1 WHERE id=?')->execute([$id]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE') {
            $pdo->exec('DELETE FROM messages');
            echo json_encode(['success' => true]);
        }
    }

    // ---- ACTIN JOINS ----
    elseif ($resource === 'actin' && ($id === 'joins' || $id === 'brands')) {
        $table = $id === 'joins' ? 'actin_joins' : 'actin_brands';
        if ($method === 'GET') {
            $rows = $pdo->query("SELECT * FROM $table ORDER BY id DESC")->fetchAll();
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $d = getInput();
            if ($id === 'joins') {
                $stmt = $pdo->prepare('INSERT INTO actin_joins (full_name, mobile, email, city, instagram, followers, category, languages, portfolio_url, collaborations, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                $stmt->execute([$d['fullName']??'', $d['mobile']??'', $d['email']??'', $d['city']??'', $d['instagram']??'', $d['followers']??'', $d['category']??'', $d['languages']??'', $d['portfolio']??'', $d['collaborations']??'', $d['message']??'']);
            } else {
                $stmt = $pdo->prepare('INSERT INTO actin_brands (company, contact_person, mobile, email, website, industry, budget, influencer_category, location, objective, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                $stmt->execute([$d['company']??'', $d['contactPerson']??'', $d['mobile']??'', $d['email']??'', $d['website']??'', $d['industry']??'', $d['budget']??'', $d['influencerCategory']??'', $d['location']??'', $d['objective']??'', $d['requirements']??'']);
            }
            echo json_encode(['id' => $pdo->lastInsertId()]);
        } elseif ($method === 'DELETE') {
            $pdo->exec("DELETE FROM $table");
            echo json_encode(['success' => true]);
        }
    }

    // ---- SETTINGS ----
    elseif ($resource === 'settings') {
        if ($method === 'GET') {
            $rows = $pdo->query('SELECT setting_key, setting_value FROM settings')->fetchAll();
            $settings = [];
            foreach ($rows as $r) $settings[$r['setting_key']] = $r['setting_value'];
            echo json_encode($settings);
        } elseif ($method === 'PUT') {
            $d = getInput();
            foreach ($d as $key => $value) {
                $stmt = $pdo->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=?');
                $stmt->execute([$key, $value, $value]);
            }
            echo json_encode(['success' => true]);
        }
    }

    // ---- LOGO ----
    elseif ($resource === 'logo') {
        if ($method === 'GET') {
            $row = $pdo->query('SELECT logo_data FROM site_logo ORDER BY id DESC LIMIT 1')->fetch();
            echo json_encode(['logo' => $row ? $row['logo_data'] : null]);
        } elseif ($method === 'PUT') {
            $d = getInput();
            $row = $pdo->query('SELECT id FROM site_logo LIMIT 1')->fetch();
            if ($row) {
                $pdo->prepare('UPDATE site_logo SET logo_data=? WHERE id=?')->execute([$d['logo'] ?? '', $row['id']]);
            } else {
                $pdo->prepare('INSERT INTO site_logo (logo_data) VALUES (?)')->execute([$d['logo'] ?? '']);
            }
            echo json_encode(['success' => true]);
        }
    }

    // ---- STATS ----
    elseif ($resource === 'stats') {
        $stats = [];
        foreach (['services', 'portfolio', 'testimonials', 'messages', 'actin_joins', 'actin_brands'] as $t) {
            $col = $t === 'actin_joins' ? 'joins' : ($t === 'actin_brands' ? 'brands' : $t);
            $stats[$col] = (int)$pdo->query("SELECT COUNT(*) FROM $t")->fetchColumn();
        }
        echo json_encode($stats);
    }

    else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
