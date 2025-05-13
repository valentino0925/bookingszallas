<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'travel_agency');

// Connect to database
try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Get popular destinations
function getPopularDestinations($pdo) {
    $stmt = $pdo->prepare("SELECT * FROM destinations WHERE is_popular = 1 ORDER BY price ASC LIMIT 4");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Get quick search options
function getQuickSearchOptions($pdo) {
    $stmt = $pdo->prepare("SELECT * FROM quick_search_options ORDER BY title");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Get user stats
function getUserStats($pdo, $userId) {
    $stmt = $pdo->prepare("SELECT * FROM user_stats WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $userId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Example usage (would be integrated with the HTML)
$popularDestinations = getPopularDestinations($pdo);
$quickSearchOptions = getQuickSearchOptions($pdo);
$userStats = getUserStats($pdo, 1); // Assuming user ID 1 for Gergő
?>