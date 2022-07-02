<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once ("connect.php");

$conn = connect();

$func = $_GET['func'];

switch($func) {
    case 'standard': {
        getUserData_standard($conn);
        break;
    }
    default: {
        echo "Error: No function matching request.";
        break;
    }
}

function getUserData_standard($conn) {
    if(!(isset($_GET['id']))) {
        echo "Incomplete request";
    }

    $id = $_GET['id'];

    $stmt = $conn->prepare("SELECT * FROM Users WHERE (id='$id');");
    $stmt->execute();

    $out_id = -1;
    $out_fname = '';
    $out_lname = '';
    $out_email = '';
    $out_pin = '';
    $stmt->bind_result($out_id, $out_fname, $out_lname, $out_email, $out_pin);

    $arr = [];
    while ($stmt->fetch()) {
        $arr['id'] = $out_id;
        $arr['firstName'] = $out_fname;
        $arr['lastName'] = $out_lname;
        $arr['email'] = $out_email;
        $arr['pin'] = $out_pin;
    }
    echo(json_encode($arr));

    mysqli_close($conn);
}

