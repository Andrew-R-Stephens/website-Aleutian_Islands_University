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
    case 'getCourseDetails': {
        getCourseDetails($conn);
        return;
    }
    case 'getCoursePrerequisites': {
        getCoursePrerequisites($conn);
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
    case 'getDepartmentDetails': {
        getDepartmentDetails($conn);
        return;
    }
    case 'getAllDepartment_Schools': {
        getAllDepartment_Schools($conn);
        return;
    }
    case 'getAllSchools': {
        getAllSchools($conn);
        return;
    }
    case 'getAllStudents_Identifiable': {
        getAllStudents_Identifiable($conn);
        return;
    }
    case 'getMasterScheduleBySemesterID': {
        getMasterScheduleBySemesterID($conn);
        return;
    }
    case 'getSemesterIDsInRange': {
        getSemesterIDsInRange($conn);
        return;
    }
    case 'getAllAdvisors': {
        getAllAdvisors($conn);
        return;
    }
    case 'getAdvisorByAdvisorID': {
        getAdvisorByAdvisorID($conn);
        return;
    }
    case 'getAdvisorByStudentID': {
        getAdvisorByStudentID($conn);
        return;
    }
    case 'getAdviseesByAdvisorID': {
        getAdviseesByAdvisorID($conn);
        return;
    }
    case 'getAllAdvisees': {
        getAllAdvisees($conn);
        return;
    }
    case 'getScheduleByUIDAndSemesterID': {
        getScheduleByUIDAndSemesterID($conn);
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

function getCourseDetails($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getCourseByID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CourseID'],
        $out_courses['Name'],
        $out_courses['Credits'],
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

    $final_arr['courseDetails'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCoursePrerequisites($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getCoursePrerequisitesByCourseID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['Course'],
        $out_courses['MasterID'],
        $out_courses['MasterLogic'],
        $out_courses['Master_GroupID'],
        $out_courses['GroupID'],
        $out_courses['GroupLogic'],
        $out_courses['PrereqCourse'],
        $out_courses['MinGrade']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['coursePrereqs'] = $completeArray;

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
        $out_courses['Description'],
        $out_courses['RoomID'],
        $out_courses['UID'],
        $out_courses['PhoneNum'],
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

function getAllDepartment_Schools($conn) {

    $stmt = $conn->prepare("CALL getAllDepartment_Schools()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
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

    $final_arr['department_schools'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getMasterScheduleBySemesterID($conn) {
    if(!(isset($_GET['semesterID']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $semesterID = $_GET['semesterID'];

    $stmt = $conn->prepare("CALL getMasterScheduleBySemesterID(?)");
    $stmt->bind_param("s", $semesterID);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['Term'],
        $out_courses['Year'],
        $out_courses['CRN'],
        $out_courses['CourseID'],
        $out_courses['DepartmentID'],
        $out_courses['SectionID'],
        $out_courses['CourseName'],
        $out_courses['FacultyID'],
        $out_courses['FirstName'],
        $out_courses['LastName'],
        $out_courses['BuildingID'],
        $out_courses['RoomID'],
        $out_courses['BuildingName'],
        $out_courses['RoomNum'],
        $out_courses['TimeSlotID1'],
        $out_courses['TimeSlotID2'],
        $out_courses['DayName1'],
        $out_courses['DayName2'],
        $out_courses['StartTime1'],
        $out_courses['StartTime2'],
        $out_courses['EndTime1'],
        $out_courses['EndTime2']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['Sections'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllStudents_Identifiable($conn) {
    if(!(isset($_GET['pageNum'], $_GET['maxResults']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }

    $pageNum = $_GET['pageNum'];
    $maxResults = $_GET['maxResults'];

    $stmt = $conn->prepare("CALL getAllStudents_Identifiable()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['UID'],
        $out_courses['firstName'],
        $out_courses['lastName'],
        $out_courses['UserType']
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


    $final_arr['Students'] = $completeArray;
    $final_arr['TotalResults'] = $stmt->num_rows;

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function getSemesterIDsInRange($conn) {

    $stmt = $conn->prepare("CALL getSemesterIDsInRange()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['SemesterID'],
        $out_courses['Term'],
        $out_courses['Year']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['SemesterIDs'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getDepartmentDetails($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getDepartmentByID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['DepartmentID'],
        $out_courses['DepartmentDescription'],
        $out_courses['PhoneNum'],
        $out_courses['SchoolID'],
        $out_courses['SchoolDescription'],
        $out_courses['Department_BuildingName'],
        $out_courses['Department_RoomNum'],
        $out_courses['Chair_FirstName'],
        $out_courses['Chair_LastName'],
        $out_courses['Chair_PhoneNum'],
        $out_courses['Chair_Email'],
        $out_courses['Chair_RoomID']
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

function getAllAdvisors($conn) {
    if(!(isset($_GET['pageNum'], $_GET['maxResults']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $pageNum = $_GET['pageNum'];
    $maxResults = $_GET['maxResults'];

    $stmt = $conn->prepare("CALL getAllAdvisors()");
    $stmt->execute();

    $out_advisees = [];
    $stmt->bind_result(
        $out_advisees['UID'],
        $out_advisees['FirstName'],
        $out_advisees['LastName'],
        $out_advisees['PhoneNum'],
        $out_advisees['Email'],
        $out_advisees['DeoartmentID']
    );

    $startIndex = $pageNum * $maxResults;

    $currentIndex = 0;
    $completeArray = [];
    while ($stmt->fetch()) {
        if($currentIndex >= $startIndex && $currentIndex < ($startIndex+$maxResults)) {
            $row = [];
            foreach ($out_advisees as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
        $currentIndex ++;
    }

    $final_arr['advisors'] = $completeArray;
    $final_arr['count'] = $stmt->num_rows;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAdvisorByAdvisorID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getAdvisorByAdvisorID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_advisor = [];
    $stmt->bind_result(
        $out_advisor['UID'],
        $out_advisor['FirstName'],
        $out_advisor['LastName'],
        $out_advisor['PhoneNum'],
        $out_advisor['Email'],
        $out_advisor['RoomNum'],
        $out_advisor['BuildingName'],
        $out_advisor['StartTime'],
        $out_advisor['EndTime'],
        $out_advisor['Name']
    );

    $final_arr = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_advisor as $key => $val) {
            $row[$key] = $val;
        }
        $final_arr['advisor'] = $row;
    }

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAdvisorByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getAdvisorByStudentID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_advisor = [];
    $stmt->bind_result(
        $out_advisor['UID'],
        $out_advisor['FirstName'],
        $out_advisor['LastName'],
        $out_advisor['PhoneNum'],
        $out_advisor['Email'],
        $out_advisor['RoomNum'],
        $out_advisor['BuildingName'],
        $out_advisor['StartTime'],
        $out_advisor['EndTime'],
        $out_advisor['Name']
    );

    $final_arr = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_advisor as $key => $val) {
            $row[$key] = $val;
        }
        $final_arr['advisor'] = $row;
    }

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAdviseesByAdvisorID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getAdviseesByAdvisorID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_advisees = [];
    $stmt->bind_result(
        $out_advisees['UID'],
        $out_advisees['FirstName'],
        $out_advisees['LastName'],
        $out_advisees['PhoneNum'],
        $out_advisees['Email']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_advisees as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['advisees'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllAdvisees($conn) {
    if(!(isset($_GET['pageNum'], $_GET['maxResults']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $pageNum = $_GET['pageNum'];
    $maxResults = $_GET['maxResults'];

    $stmt = $conn->prepare("CALL getAllAdvisees()");
    $stmt->execute();

    $out_advisees = [];
    $stmt->bind_result(
        $out_advisees['UID'],
        $out_advisees['FirstName'],
        $out_advisees['LastName'],
        $out_advisees['PhoneNum'],
        $out_advisees['Email'],
        $out_advisees['F_UID'],
        $out_advisees['F_FirstName'],
        $out_advisees['F_LastName']
    );

    $startIndex = $pageNum * $maxResults;

    $currentIndex = 0;
    $completeArray = [];
    while ($stmt->fetch()) {
        if($currentIndex >= $startIndex && $currentIndex < ($startIndex+$maxResults)) {
            $row = [];
            foreach ($out_advisees as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
        $currentIndex ++;
    }

    $final_arr['advisees'] = $completeArray;
    $final_arr['count'] = $stmt->num_rows;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getScheduleByUIDAndSemesterID($conn) {
    if(!(isset($_GET['id'], $_GET['semesterID']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];
    $semesterID = $_GET['semesterID'];

    $stmt = $conn->prepare("CALL getScheduleByUIDAndSemesterID(?, ?)");
    $stmt->bind_param("ss", $id, $semesterID);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['CRN'],
        $out_schedule['CourseID'],
        $out_schedule['SectionID'],
        $out_schedule['FacultyID'],
        $out_schedule['BuildingName'],
        $out_schedule['RoomID'],
        $out_schedule['Day1'],
        $out_schedule['StartTime1'],
        $out_schedule['EndTime1'],
        $out_schedule['Day2'],
        $out_schedule['StartTime2'],
        $out_schedule['EndTime2']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['schedule'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}