<?php
// Hostinger MySQL Database Config
// Update these with your Hostinger database details from hPanel -> Databases
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_dhanprem');  // Replace with your database name
define('DB_USER', 'u123456789_admin');      // Replace with your database user
define('DB_PASS', 'YourPassword123');        // Replace with your database password

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

try {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

function getInput() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    return $data ? $data : $_POST;
}
