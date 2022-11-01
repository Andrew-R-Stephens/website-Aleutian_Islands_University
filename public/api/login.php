<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
//header('Content-Type: application/json');

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
    if(!(isset($_GET['email'], $_GET['pass']))) {
        echo "Incomplete request";
        return;
    }

    $email = $_GET['email'];
    $pass = $_GET['pass'];

    $stmt = $conn->prepare("CALL attemptAuth(?, ?)");
    $stmt->bind_param("ss", $email, $pass);
    $stmt->execute();


    $out_uid = '-1';
    $out_role = '0';
    $out_priority = '0';
    $stmt->bind_result($out_uid, $out_role, $out_priority);


    $arr['uid'] = $out_uid;
    $arr['role'] = $out_role;
    $arr['priority'] = $out_priority;

    while ($stmt->fetch()) {
        $arr['uid'] = $out_uid;
        $arr['role'] = $out_role;
        $arr['priority'] = $out_priority;
    }

    echo(json_encode($arr));

    mysqli_close($conn);
}

