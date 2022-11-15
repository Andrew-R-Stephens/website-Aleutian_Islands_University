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
    case 'searchAllCourses': {
        searchAllCourses($conn);
        return;
    }
    case 'getAllCourses': {
        getAllCourses($conn);
        return;
    }
    case 'getCourseCount': {
        getCourseCount($conn);
        return;
    }
    case 'getProgramDetails': {
        getProgramDetails($conn);
        return;
    }
    case 'getProgramRequirements': {
        getProgramRequirements($conn);
        return;
    }
    case 'getAllProgramTypes': {
        getAllProgramTypes($conn);
        return;
    }
    case 'getAllPrograms': {
        getAllPrograms($conn);
        return;
    }
    case 'getAllProgramsExtended': {
        getAllProgramsExtended($conn);
        return;
    }
    case 'getAllDepartments': {
        getAllDepartments($conn);
        return;
    }
    case 'getAllSchools': {
        getAllSchools($conn);
        return;
    }
    default: {
        $out = ['error' => 'Function "'. $func .'" does not exist.'];
        echo json_encode($out);
        return;
    }
}

function getCourseCount($conn) {
    $stmt = $conn->prepare("CALL getNumCourses()");
    $stmt->execute();

    $out_count = [];
    $stmt->bind_result(
        $out_count['count']
    );

    $arr = [];
    while ($stmt->fetch()) {
        $arr['count'] = $out_count;
    }

    echo(json_encode($arr));

    mysqli_close($conn);
}

/**
 */
function searchAllCourses($conn) {
    if(!(isset($_GET['pageNum'], $_GET['maxResults'], $_GET['searchInput']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $pageNum = $_GET['pageNum'];
    $maxResults = $_GET['maxResults'];
    $search = $_GET['searchInput'];

    $stmt = $conn->prepare("CALL searchAllCourses(?)");
    $stmt->bind_param("s", $search);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['id'],
        $out_courses['name'],
        $out_courses['credits'],
        $out_courses['department'],
        $out_courses['description']
    );

    $startIndex = $pageNum * $maxResults;

    $currentIndex = 0;
    $completeArray = [];
    while ($stmt->fetch()) {
        if($currentIndex >= $startIndex && $currentIndex < ($startIndex+$maxResults)) {
            $row = [];
            foreach ($out_courses as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
        $currentIndex ++;
    }

    $final_arr['courses'] = $completeArray;
    $final_arr['count'] = $stmt->num_rows;

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

/**
 */
function getAllCourses($conn) {

    $pageNum = $_GET['pageNum'];
    $maxResults = $_GET['maxResults'];

    $stmt = $conn->prepare("CALL getAllCourses()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['id'],
        $out_courses['name'],
        $out_courses['credits'],
        $out_courses['department'],
        $out_courses['description']
    );

    $startIndex = $pageNum * $maxResults;

    $currentIndex = 0;
    $completeArray = [];
    while ($stmt->fetch()) {
        if($currentIndex >= $startIndex && $currentIndex < ($startIndex+$maxResults)) {
            $row = [];
            foreach ($out_courses as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
        $currentIndex ++;
    }

    $final_arr['courses'] = $completeArray;
    $final_arr['count'] = $stmt->num_rows;

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function getProgramDetails($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getProgramByID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['ProgramID'],
        $out_courses['ProgramName'],
        $out_courses['ProgramTypeID'],
        $out_courses['Description'],
        $out_courses['ClassType'],
        $out_courses['ClassLevel'],
        $out_courses['MinCredits'],
        $out_courses['DepartmentID'],
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

    $final_arr['details'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getProgramRequirements($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getProgramRequirements(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['PID'],
        $out_courses['GName'],
        $out_courses['GroupID'],
        $out_courses['Priority'],
        $out_courses['MinCredits'],
        $out_courses['MinCourses'],
        $out_courses['MinGrade'],
        $out_courses['CourseID'],
        $out_courses['Credits'],
        $out_courses['Name']
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

function getAllProgramTypes($conn) {

    $stmt = $conn->prepare("CALL getAllProgramTypes()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['ProgramTypeID'],
        $out_courses['Name'],
        $out_courses['ProgramLevel'],
        $out_courses['ClassType'],
        $out_courses['ClassLevel']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['programTypes'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}


function getAllPrograms($conn) {

    $stmt = $conn->prepare("CALL getAllPrograms()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['ProgramID'],
        $out_courses['ProgramName'],
        $out_courses['ProgramTypeID'],
        $out_courses['Description']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['programs'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllProgramsExtended($conn) {

    $stmt = $conn->prepare("CALL getAllProgram_ProgramType_Department_School()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['ProgramID'],
        $out_courses['ProgramName'],
        $out_courses['Description'],
        $out_courses['ProgramTypeID'],
        $out_courses['DepartmentID'],
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

    $final_arr['programs'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllDepartments($conn) {

    $stmt = $conn->prepare("CALL getAllDepartments()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['DepartmentID'],
        $out_courses['Description']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['departments'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllSchools($conn) {

    $stmt = $conn->prepare("CALL getAllSchools()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['SchoolID'],
        $out_courses['Description']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['schools'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}