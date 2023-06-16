<?php header("Access-Control-Allow-Origin: *");
/*
 * This php script is used to connect with the database.
 *
 * Precede query scripts with the requirement of this file.
 */

function connect() {
    $db_test = "test_systemsdb";
    $db_original = "systemsdb";
    $db_final = "systemsdb_final";
    $db_aiu_db = "aiu_db";

    $hostname = "localhost";
    $username = "admin";
    //$username = "TRITIUMNITR0X";
    $password = "systemsdb";
    //$password = "aiu_db";
    $database = $db_aiu_db;
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