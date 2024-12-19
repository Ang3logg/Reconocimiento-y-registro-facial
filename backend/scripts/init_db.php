<?php
include_once '../config/database.php';

// Create default admin user
$admin_username = 'admin';
$admin_password = password_hash('admin123', PASSWORD_DEFAULT);
$admin_role = 'admin';

$stmt = $conn->prepare("INSERT IGNORE INTO users (username, password, role) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $admin_username, $admin_password, $admin_role);
$stmt->execute();

// Create default regular user
$user_username = 'user';
$user_password = password_hash('user123', PASSWORD_DEFAULT);
$user_role = 'user';

$stmt = $conn->prepare("INSERT IGNORE INTO users (username, password, role) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $user_username, $user_password, $user_role);
$stmt->execute();

$stmt->close();
$conn->close();

echo "Database initialized with default users successfully!\n";
?>