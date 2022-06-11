<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once ("connect.php");

$func = $_GET['func'];
$email = $_GET['email'];
$pass = $_GET['pass'];

$sql = "SELECT id FROM Users WHERE (email='$email' AND pin='$pass');";

$result = mysqli_query($conn, $sql);
$count = mysqli_num_rows($result);
echo "count: " . $count;

if($count > 0) {
    $row = mysqli_fetch_assoc($result);
    echo " id: " . $row['id'];
}


mysqli_close($conn);
