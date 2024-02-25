<?php
$conn = new mysqli("localhost", "root", "", "real_estate_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle signup
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["signup"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $phone = $_POST["phone"];

    $sql = "INSERT INTO users (username, email, password, phone) VALUES ('$username', '$email', '$password', '$phone')";
    $result = $conn->query($sql);

    if ($result === TRUE) {
        echo "Signup successful";
    } else {
        echo "Error during signup: " . $conn->error;
    }
}

// Handle adding estate card
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["addCard"])) {
    $name = $_POST["name"];
    $location = $_POST["location"];
    $price = $_POST["price"];
    $image = $_POST["image"];

    $sql = "INSERT INTO estate_cards (name, location, price, image) VALUES ('$name', '$location', '$price', '$image')";
    $result = $conn->query($sql);

    if ($result === TRUE) {
        echo "Card added successfully";
    } else {
        echo "Error adding card: " . $conn->error;
    }
}

$conn->close();
?>
