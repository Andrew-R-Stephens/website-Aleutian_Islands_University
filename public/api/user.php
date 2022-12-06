<?php
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once ("connect.php");

$conn = connect();

$func = isset($_GET['func']) ? $_GET['func'] : "";
switch ($func) {
    case 'getPersonalInformation':
    {
        getUserPersonalInformation($conn);
        return;
    }
    default:
    {
        $arr ['status'] = "Error: No get function matching request.";
        break;
    }
}

$rp = json_decode(file_get_contents('php://input'), true);
$params = $rp['params'];
//echo "\nparams = \n".print_r($params);
$post = $params['post'];
//echo "\npost = \n". $post;

switch ($post) {
    case 'updateUserPersonalInformation':
    {
        updateUserPersonalInformation($conn, $params);
        return;
    }
    default:
    {
        $arr ['status'] = "Error: No post function matching request.";
        return;
    }
}


function getUserPersonalInformation($conn) {

    if(!(isset($_GET['uid']))) {
        $arr ['status'] = "Incomplete request";
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
    $out_userType = '';
    $out_userRank = '';
    $out_userTime = '';
    $stmt->bind_result(
        $out_uid, $out_ssn, $out_fname, $out_lname, $out_phoneNum, $out_gender, $out_honorific, $out_birthdate,
        $out_addrNumber, $out_addrStreet, $out_addrCity, $out_addrState, $out_addrCountry, $out_addrZip, $out_email,
        $out_userType, $out_userRank, $out_userTime
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
    $arr['UserType'] = '';
    $arr['Rank'] = '';
    $arr['Time'] = '';

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
        $arr['UserType'] = $out_userType;
        $arr['Rank'] = $out_userRank;
        $arr['Time'] = $out_userTime;
    }

    echo(json_encode($arr));

    mysqli_close($conn);

}

function updateUserPersonalInformation($conn, $params) {

    // echo "Entered function -> UID = ". ($params['uid']);

    $arr ['status'] = "Failed!";
    if(!(isset($params['uid']))) {
        $arr ['status'] = "Incomplete request";
    }

    $uid = $params['uid'];

    $fName = strcmp($params['fName'], "") !== 0 ? $params['fName'] : null;
    $lName = strcmp($params['lName'], "") !== 0 ? $params['lName'] : null;
    $phone = strcmp($params['phone'], "") !== 0 ? $params['phone'] : null;
    $gender = strcmp($params['gender'], "") !== 0 ? $params['gender'] : null;
    $honorific = strcmp($params['honorific'], "") !== 0 ? $params['honorific'] : null;
    $birthdate = strcmp($params['birthdate'], "") !== 0 ? $params['birthdate'] : null;
    $houseNum = strcmp($params['houseNum'], "") !== 0 ? $params['houseNum'] : null;
    $street =strcmp($params['street'], "") !== 0 ? $params['street'] : null;
    $city = strcmp($params['city'], "") !== 0 ? $params['city'] : null;
    $state = strcmp($params['state'], "") !== 0 ? $params['state'] : null;
    $country = strcmp($params['country'], "") !== 0 ? $params['country'] : null;
    $zip = strcmp($params['zip'], "") !== 0 ? $params['zip'] : null;

    $stmt = $conn->prepare("CALL updatePersonalInformation(?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssssssssss", $uid, $fName, $lName, $phone, $gender, $honorific, $birthdate, $houseNum, $street, $city, $state, $country, $zip);
    $status = $stmt->execute();

    if($status === false)
        trigger_error($stmt->error, E_USER_ERROR);
    else
        $arr ['status'] = "$uid $fName $lName $phone $gender $honorific $birthdate $houseNum $street $city $state $country $zip";

    echo(json_encode($arr));

    mysqli_close($conn);

}
