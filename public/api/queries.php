<?php
//echo "Hello!";
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
//echo "Connected successfully";


// Create database
$sql = "CREATE DATABASE IF NOT EXISTS {$database}";
if(doQuery($conn, $sql)){
    echo "Database created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

// SELECT database
$sql = "USE $database";
if(doQuery($conn, $sql)){
    echo "Database selected successfully<br>";
} else {
    echo "Error selecting database: " . $conn->error . "<br>";
}

// Create table in database
$sql = "CREATE TABLE IF NOT EXISTS {$table} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName varchar(100),
    lastName varchar(300)
    );";
if(doQuery($conn, $sql)){
    echo "Table created successfully<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Insert record in database
$sql = "INSERT INTO {$table} (firstName, lastName) VALUES ( 'Joe', 'Mama' );";
if(doQuery($conn, $sql)){
    echo "Record inserted successfully<br>";
} else {
    echo "Error inserting record: " . $conn->error . "<br>";
}

// display records from table
$sql = "SELECT * FROM {$table};";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstName"]. " " . $row["lastName"]. "<br>";
    }
} else {
    echo "0 results";
}

function doQuery($conn, $sql) {
    $result = ($conn->query($sql) === TRUE);

    return $result;
}

mysqli_close($conn);

?>
