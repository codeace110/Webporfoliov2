<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create a connection to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the star count from the database
$sql = "SELECT count FROM star_count";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $count = $row["count"];
} else {
    $count = 0;
}

$conn->close();

// Return the star count as JSON response
header('Content-Type: application/json');
echo json_encode(['count' => $count]);
?>
