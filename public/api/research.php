<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once("connect.php");

$conn = connect();
$func = isset($_GET['func']) ? $_GET['func'] : "";
switch($func) {
    case 'searchAllCourses': {
        searchAllCourses($conn);
        return;
    }
    case 'countCoursesInDepartment': {
        countCoursesInDepartment($conn);
        return;
    }
    case 'countDepartmentsInSchool': {
        countDepartmentsInSchool($conn);
        return;
    }
    case 'countStudentsInProgram': {
        countStudentsInProgram($conn);
        return;
    }
    default: {
        $arr ['status'] = "Error: No get function matching request.";
        break;
    }
}

function countCoursesInDepartment($conn) {

    $stmt = $conn->prepare("CALL countCoursesInDepartment()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['Courses'],
        $out_courses['DepartmentID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['data'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function countDepartmentsInSchool($conn) {

    $stmt = $conn->prepare("CALL countDepartmentsInSchool()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['Departments'],
        $out_courses['SchoolID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['data'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function countStudentsInProgram($conn) {

    $stmt = $conn->prepare("CALL countStudentsInProgram()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['Students'],
        $out_courses['ProgramID']
    );
    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['data'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}
