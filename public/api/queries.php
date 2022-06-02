<?php
header("Access-Control-Allow-Origin: *");

$hostname = "localhost";
$username = "admin";
$password = "systemsdb";
$database = "systemsdb";
$port = "3306";

$table = "Users";

//echo $hostname, $username, $password, $database, $port;

$conn = new mysqli($hostname, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS {$database}";
if(doQuery($conn, $sql) === false){
    echo "Error creating database: " . $conn->error . "<br>";
}

// SELECT database
$sql = "USE $database";
if(doQuery($conn, $sql) === false){
    echo "Error selecting database: " . $conn->error . "<br>";
}

// Create table in database
$sql = "CREATE TABLE IF NOT EXISTS {$table} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName varchar(100),
    lastName varchar(300)
    );";

if(doQuery($conn, $sql) === false){
    echo "Error creating table: " . $conn->error . "<br>";
}
/*
// Insert record in database
$sql = "INSERT INTO {$table} (firstName, lastName) VALUES ( 'Joe', 'Mama' );";
if(doQuery($conn, $sql) === false){
    echo "Error inserting record: " . $conn->error . "<br>";
}*/

// display records from table
$sql = "SELECT * FROM {$table};";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    echo "<table border='1'><th>ID</th><th>First Name</th><th>Last Name</th>";
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td>". $row["id"]."</td><td>" . $row["firstName"]."</td><td>". $row["lastName"]. "</td></tr>";
    }
    echo "</th></table>";
} else {
    echo "0 results";
}

function doQuery($conn, $sql) {
    $result = ($conn->query($sql) === TRUE);

    return $result;
}

mysqli_close($conn);
