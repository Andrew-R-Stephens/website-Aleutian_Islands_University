<?php header("Access-Control-Allow-Origin: *");
/*
 * This php script is used to connect with the server.
 *
 * Precede query scripts with the requirement of this file.
 */

function connect() {
    $db = "systemsdb";
    $db_test = "test_systemsdb";

    $hostname = "localhost";
    $username = "admin";
    $password = "systemsdb";
    $database = $db_test;
    $port = "3306";

    $conn = new mysqli($hostname, $username, $password, $database, $port);

// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

// Create database
    $sql = "CREATE DATABASE IF NOT EXISTS {$database}";
    if(testDatabaseConnection($conn, $sql) === false){
        echo "Error creating database: " . $conn->error . "<br>";
        exit();
    }

// SELECT database
    $sql = "USE $database";
    if(testDatabaseConnection($conn, $sql) === false){
        echo "Error selecting database: " . $conn->error . "<br>";
        exit();
    }

    return $conn;
}

function testDatabaseConnection($conn, $sql) {
    $result = ($conn->query($sql) === TRUE);

    return $result;
}
