<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once("connect.php");

$conn = connect();

if(!isset($_GET['func'])) {
    $out = ['error' => 'Function not set.'];
    echo json_encode($out);
    return;
}
$func = $_GET['func'];

switch($func) {
    case 'isCourseGradeSatisfied': {
        isCourseGradeSatisfied($conn);
        return;
    }
    case 'isCourseInStudentHistory': {
        isCourseInStudentHistory($conn);
        return;
    }
    case 'getGradesList': {
        getGradesList($conn);
        return;
    }
    case 'getStudentHistory': {
        getStudentHistory($conn);
        return;
    }
    default: {
        $out = ['error' => 'Function "'. $func .'" does not exist.'];
        echo json_encode($out);
        return;
    }
}

function isCourseGradeSatisfied($conn) {
    if(!(isset($_GET['studentID'], $_GET['courseID'], $_GET['courseGrade']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }

    $studentID = $_GET['studentID'];
    $courseID = $_GET['courseID'];
    $courseGrade = $_GET['courseGrade'];

    $stmt = $conn->prepare("CALL isCourseGradeSatisfied(?, ?, ?)");
    $stmt->bind_param("sss", $studentID, $courseID, $courseGrade);
    $stmt->execute();

    $out_isSatisfied = 'NA';
    $stmt->bind_result($out_isSatisfied);

    $arr = [];
    while ($stmt->fetch()) {
        $arr['isSatisfied'] = $out_isSatisfied;
    }

    echo(json_encode($arr));

    mysqli_close($conn);
}

function isCourseInStudentHistory($conn) {
    if(!(isset($_GET['studentID'], $_GET['courseID']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }

    $studentID = $_GET['studentID'];
    $courseID = $_GET['courseID'];

    $stmt = $conn->prepare("CALL isCourseInStudentHistory(?, ?)");
    $stmt->bind_param("ss", $studentID, $courseID);
    $stmt->execute();

    $out_exists = 'NA';
    $stmt->bind_result($out_exists);

    $arr = [];
    while ($stmt->fetch()) {
        $arr['$doesExist'] = $out_exists;
    }

    echo(json_encode($arr));

    mysqli_close($conn);
}

function getStudentHistory($conn) {
    if(!(isset($_GET['studentID']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }

    $studentID = $_GET['studentID'];

    $stmt = $conn->prepare("CALL getStudentHistory(?)");
    $stmt->bind_param("s", $studentID);
    $stmt->execute();

    $out_history = [];
    $stmt->bind_result(
        $out_history['id'],
        $out_history['firstName'],
        $out_history['lastName'],
        $out_history['course_id'],
        $out_history['course_grade']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_history as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['studentHistory'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getGradesList($conn) {

    $stmt = $conn->prepare("CALL getGradesList()");
    $stmt->execute();

    $out_grade = [];
    $stmt->bind_result(
        $out_grade['id'],
        $out_grade['description']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_grade as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['gradesList'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}