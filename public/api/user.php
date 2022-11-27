<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once ("connect.php");

$conn = connect();

$func = $_GET['func'];

switch($func) {
    case 'standard': {
        getUserPersonalInformation($conn);
        break;
    }
    default: {
        echo "Error: No function matching request.";
        break;
    }
}

function getUserPersonalInformation($conn) {

    if(!(isset($_GET['uid']))) {
        echo "Incomplete request";
    }

    $uid = $_GET['uid'];

    $stmt = $conn->prepare("CALL getUserPersonalInformation(?)");
    $stmt->bind_param("s", $uid);
    $stmt->execute();

    $out_uid = '';
    $out_ssn = '';
    $out_fname = '';
    $out_lname = '';
    $out_phoneNum = '';
    $out_gender = '';
    $out_honorific = '';
    $out_birthdate = '';
    $out_addrNumber = '';
    $out_addrStreet = '';
    $out_addrCity = '';
    $out_addrState = '';
    $out_addrCountry = '';
    $out_addrZip = '';
    $out_email = '';
    $stmt->bind_result(
        $out_uid, $out_ssn, $out_fname, $out_lname, $out_phoneNum, $out_gender, $out_honorific, $out_birthdate,
        $out_addrNumber, $out_addrStreet, $out_addrCity, $out_addrState, $out_addrCountry, $out_addrZip, $out_email
    );

    $arr['UID'] = '';
    $arr['SSN'] = '';
    $arr['FirstN'] = '';
    $arr['LastN'] = '';
    $arr['PhoneN'] = '';
    $arr['Gender'] = '';
    $arr['Honorific'] = '';
    $arr['BDate'] = '';
    $arr['AddrHN'] = '';
    $arr['AddrStr'] = '';
    $arr['AddrCi'] = '';
    $arr['AddrSta']  = '';
    $arr['AddrCo'] = '';
    $arr['AddrZip'] = '';
    $arr['Email'] = '';

    while ($stmt->fetch()) {
        $arr['UID'] = $out_uid;
        $arr['SSN'] = substr($out_ssn, 0, 3) . "-**-****";
        $arr['FirstN'] = $out_fname;
        $arr['LastN'] = $out_lname;
        $arr['PhoneN'] = $out_phoneNum;
        $arr['Gender'] = $out_gender;
        $arr['Honorific'] = $out_honorific;
        $arr['BDate'] = $out_birthdate;
        $arr['AddrHN'] = $out_addrNumber;
        $arr['AddrStr'] = $out_addrStreet;
        $arr['AddrCi'] = $out_addrCity;
        $arr['AddrSta'] = $out_addrState;
        $arr['AddrCo'] = $out_addrCountry;
        $arr['AddrZip'] = $out_addrZip;
        $arr['Email'] = $out_email;
    }

    echo(json_encode($arr));

    mysqli_close($conn);

}

