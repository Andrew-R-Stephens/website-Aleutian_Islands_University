<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once ("connect.php");

$conn = connect();

$func = $_GET['func'];

switch($func) {
    case 'auth': {
        authorization($conn);
        break;
    }default: {
        echo "Error: No function matching request.";
        break;
    }
}

function authorization($conn) {
    $email = $_GET['email'];
    $pass = $_GET['pass'];

    $sql = "SELECT id FROM Users WHERE (email='$email' AND pin='$pass');";

    $result = mysqli_query($conn, $sql);

    $count = mysqli_num_rows($result);
    if($count <= 0) {
        echo $count;
    }

    if($count > 0) {
        $row = mysqli_fetch_assoc($result);
        echo $row['id'];
    }

    mysqli_close($conn);
}

