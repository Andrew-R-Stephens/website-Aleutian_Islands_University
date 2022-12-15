<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once("connect.php");

$conn = connect();
/*
if(!isset($_GET['func'])) {
    $out = ['error' => 'Function not set.'];
    echo json_encode($out);
    return;
}
$func = $_GET['func'];*/
$func = isset($_GET['func']) ? $_GET['func'] : "";
switch($func) {
    case 'searchAllCourses': {
        searchAllCourses($conn);
        return;
    }
    case 'getAllCourses': {
        getAllCourses($conn);
        return;
    }
    case 'getAllCourseIDs': {
        getAllCourseIDs($conn);
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
    case 'getAllDepartments_distinct': {
        getAllDepartments_unique($conn);
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
    case 'getAllUsers_Identifiable': {
        getAllUsers_Identifiable($conn);
        return;
    }
    case 'getUserRoleByUID': {
        getUserRoleByUID($conn);
        return;
    }
    case 'getAllPeriods': {
        getAllPeriods($conn);
        return;
    }
    case 'getAllDays': {
        getAllDays($conn);
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
    case 'getSemesterWithRegistrationAvailable': {
        getSemesterWithRegistrationAvailable($conn);
        return;
    }
    case 'getCurrentSemesterID': {
        getCurrentSemesterID($conn);
        return;
    }
    case 'getSemesterIDsInHistoryByStudentID': {
        getSemesterIDsInHistoryByStudentID($conn);
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
    case 'getHoldsByStudentID': {
        getHoldsByStudentID($conn);
        return;
    }
    case 'getProgramEnrollmentByStudentID': {
        getProgramEnrollmentByStudentID($conn);
        return;
    }
    case 'getUnofficialTranscript': {
        getUnofficialTranscript($conn);
        return;
    }
    case 'getHistoryByStudentIDAndSemesterID': {
        getHistoryByStudentIDAndSemesterID($conn);
        return;
    }
    case 'getCourseSectionDataByCRN': {
        getCourseSectionDataByCRN($conn);
        return;
    }
    case 'getCourseSectionRosterByCRN': {
        getCourseSectionRosterByCRN($conn);
        return;
    }
    case 'getCourseSectionAttendanceByCRN': {
        getCourseSectionAttendanceByCRN($conn);
        return;
    }
    case 'getCourseSectionGradesByCRN': {
        getCourseSectionGradesByCRN($conn);
        return;
    }
    case 'getCourseSectionMeetingDatesByCRN': {
        getCourseSectionMeetingDatesByCRN($conn);
        return;
    }
    case 'deleteCourseSectionFromSchedule': {
        deleteCourseSectionFromSchedule($conn);
        return;
    }
    case 'getStudentGradTypeByStudentID': {
        getStudentGradTypeByStudentID($conn);
        return;
    }
    case 'getPrimaryProgramsForEnrollmentByStudentID': {
        getPrimaryProgramsForEnrollmentByStudentID($conn);
        return;
    }
    case 'getSecondaryProgramsForEnrollmentByStudentID': {
        getSecondaryProgramsForEnrollmentByStudentID($conn);
        return;
    }
    case 'getAvailableAdvisorsUsingProgramID': {
        getAvailableAdvisorsUsingProgramID($conn);
        return;
    }
    case 'setStudentToMajorMinor': {
        setStudentToMajorMinor($conn);
        return;
    }
    case 'createNewCourse': {
        createNewCourse($conn);
        return;
    }
    case 'createNewCourseSection': {
        createNewCourseSection($conn);
        return;
    }
    case 'getAvailableOffices': {
        getAvailableOffices($conn);
        return;
    }
    case 'getAllClassrooms': {
        getAllClassrooms($conn);
        return;
    }
    case 'getAllTimeslots': {
        getAllTimeslots($conn);
        return;
    }
    case 'getAvailableFacultyByTimeslotIDAndSemesterID': {
        getAvailableFacultyByTimeslotIDAndSemesterID($conn);
        return;
    }
    case 'getAvailableRoomTimeslotsBySemesterIDAndRoomID': {
        getAvailableRoomTimeslotsBySemesterIDAndRoomID($conn);
        return;
    }
    case 'getAvailableFacultyForDepartmentHeadBySchoolID': {
        getAvailableFacultyForDepartmentHeadBySchoolID($conn);
        return;
    }
    case 'isLastMeetingEditable': {
        isLastMeetingEditable($conn);
        return;
    }
    case 'createNewDepartment': {
        createNewDepartment($conn);
        return;
    }
    case 'getStudentHistory': {
        getStudentHistory_past($conn);
        return;
    }
    case 'getStudentHistory_past': {
        getStudentHistory_past($conn);
        return;
    }
    case 'getStudentHistory_Fulfilled': {
        getStudentHistory_Fulfilled($conn);
        return;
    }
    case 'checkIfCanSetMidtermGrades': {
        checkIfCanSetMidtermGrades($conn);
        return;
    }
    case 'checkIfCanSetFinalGrades': {
        checkIfCanSetFinalGrades($conn);
        return;
    }
    case 'getAvailableGrades': {
        getAvailableGrades($conn);
        return;
    }
    case 'getAllGrades_Passing': {
        getAllGrades_Passing($conn);
        return;
    }
    case 'checkMeetingNumber_Outer': {
        checkMeetingNumber_Outer($conn);
        return;
    }
    case 'assignGrades': {
        assignGrades($conn);
        return;
    }
    case 'assignAttendance': {
        assignAttendance($conn);
        return;
    }
    case 'setNewPrerequisite': {
        setNewPrerequisite($conn);
        return;
    }
    case 'setNewRequirement': {
        setNewRequirement($conn);
        return;
    }
    default: {
        $arr ['status'] = "Error: No post function matching request.";
        break;
    }
}

$rp = json_decode(file_get_contents('php://input'), true);
$params = $rp['params'];
//echo "\nparams = \n".print_r($params);
$post = $params['post'];
//echo "\npost = \n". $post;

switch ($post) {
    case 'dropCourseSection':
    {
        dropStudentFromCourseSection($conn, $params);
        return;
    }
    case 'addCourseSection':
    {
        addStudentToCourseSection($conn, $params);
        return;
    }
    case 'createNewProgram':
    {
        createNewProgram($conn, $params);
        return;
    }
    default:
    {
        $arr ['status'] = "Error: No post function matching request.";
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

function getAllCourseIDs($conn) {

    $stmt = $conn->prepare("CALL getAllCourseIDs()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CourseID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['courses'] = $completeArray;

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
        $out_courses['MinGrade'],
        $out_courses['MinGradeWeight']
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

function getAllDepartments_unique($conn) {

    $stmt = $conn->prepare("CALL getAllDepartments_Unique()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['DepartmentID'],
        $out_courses['Description'],
        $out_courses['RoomID'],
        $out_courses['UID'],
        $out_courses['PhoneNum']
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
        $out_courses['SectionID'],
        $out_courses['CourseID'],
        $out_courses['Name'],
        $out_courses['Credits'],
        $out_courses['DepartmentID'],
        $out_courses['FacultyID'],
        $out_courses['FirstName'],
        $out_courses['LastName'],
        $out_courses['BuildingID'],
        $out_courses['RoomID'],
        $out_courses['BuildingName'],
        $out_courses['RoomNum'],
        $out_courses['PeriodID1'],
        $out_courses['PeriodID2'],
        $out_courses['DayID1'],
        $out_courses['DayName1'],
        $out_courses['DayName1Abbr'],
        $out_courses['DayID2'],
        $out_courses['DayName2'],
        $out_courses['DayName2Abbr'],
        $out_courses['StartTime1'],
        $out_courses['StartTime2'],
        $out_courses['EndTime1'],
        $out_courses['EndTime2'],
        $out_courses['SeatsMinimum'],
        $out_courses['SeatsCapacity'],
        $out_courses['SeatsActual']
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

function getAllUsers_Identifiable($conn) {
    $stmt = $conn->prepare("CALL getAllUsers_Identifiable()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['UID'],
        $out_courses['firstName'],
        $out_courses['lastName'],
        $out_courses['UserType']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['Users'] = $completeArray;

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

function getSemesterWithRegistrationAvailable($conn) {

    $stmt = $conn->prepare("CALL getSemesterWithRegistrationAvailable()");
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

    $final_arr['SemesterID'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getSemesterIDsInHistoryByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }

    $id = $_GET['id'];
    $stmt = $conn->prepare("CALL getSemesterIDsInHistoryByStudentID(?)");
    $stmt->bind_param("s", $id);
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

    $arr = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_advisor as $key => $val) {
            $row[$key] = $val;
        }
        $arr[] = $row;
    }

    $final_arr['advisors'] = $arr;
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

function getHoldsByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getHoldsByStudentID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['UID'],
        $out_schedule['HoldID'],
        $out_schedule['Name'],
        $out_schedule['Description'],
        $out_schedule['Date']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['holds'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getProgramEnrollmentByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getProgramEnrollmentByStudentID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['ProgramID'],
        $out_schedule['UID'],
        $out_schedule['ProgramName'],
        $out_schedule['ProgramTypeID'],
        $out_schedule['Description']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['enrollments'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getUnofficialTranscript($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getUnofficialTranscript(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['StudentID'],
        $out_schedule['Name'],
        $out_schedule['CourseID'],
        $out_schedule['ID'],
        $out_schedule['GradeID'],
        $out_schedule['SemesterID'],
        $out_schedule['Term'],
        $out_schedule['Year'],
        $out_schedule['GPA'],
        $out_schedule['CreditHours'],
        $out_schedule['QualityPoints']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['transcript'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getHistoryByStudentIDAndSemesterID($conn) {
    if(!(isset($_GET['id'], $_GET['semesterID']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];
    $semesterID = $_GET['semesterID'];

    $stmt = $conn->prepare("CALL getHistoryByStudentIDAndSemesterID(?,?)");
    $stmt->bind_param("ss", $id, $semesterID);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['CRN'],
        $out_schedule['CourseID'],
        $out_schedule['Name'],
        $out_schedule['SectionID'],
        $out_schedule['ID'],
        $out_schedule['GradeID'],
        $out_schedule['SemPeriod']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['semesterHistory'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllPeriods($conn) {
    $stmt = $conn->prepare("CALL getAllPeriods()");
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['PeriodID'],
        $out_schedule['StartTime'],
        $out_schedule['EndTime']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['periods'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllDays($conn) {
    $stmt = $conn->prepare("CALL getAllDays()");
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['DayID'],
        $out_schedule['Name'],
        $out_schedule['NameAbbr']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['days'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getUserRoleByUID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getUserRoleByUID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['UID'],
        $out_schedule['UserType']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['userData'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCourseSectionDataByCRN($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL getCourseSectionByCRN(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['SemesterID'],
        $out_schedule['Term'],
        $out_schedule['Year'],
        $out_schedule['CRN'],
        $out_schedule['CourseID'],
        $out_schedule['DepartmentID'],
        $out_schedule['FacultyID'],
        $out_schedule['FirstName'],
        $out_schedule['LastName'],
        $out_schedule['BuildingID'],
        $out_schedule['RoomID'],
        $out_schedule['BuildingName'],
        $out_schedule['RoomNum'],
        $out_schedule['TimeSlotID1'],
        $out_schedule['TimeSlotID2'],
        $out_schedule['DayName1'],
        $out_schedule['DayName2'],
        $out_schedule['StartTime1'],
        $out_schedule['StartTime2'],
        $out_schedule['EndTime1'],
        $out_schedule['EndTime2'],
        $out_schedule['SeatsMinimum'],
        $out_schedule['SeatsCapacity'],
        $out_schedule['SeatsActual']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['data'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCourseSectionRosterByCRN($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL getCourseSectionRosterByCRN(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_roster = [];
    $stmt->bind_result(
        $out_roster['StudentID'],
        $out_roster['FirstName'],
        $out_roster['LastName'],
        $out_roster['StudentType'],
        $out_roster['Time'],
        $out_roster['Email']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_roster as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['roster'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCourseSectionAttendanceByCRN($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL getCourseSectionAttendanceByCRN(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_attendance = [];
    $stmt->bind_result(
        $out_attendance['StudentID'],
        $out_attendance['MeetingNumber'],
        $out_attendance['Status']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_attendance as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['attendance'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCourseSectionGradesByCRN($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL getCourseSectionGradesByCRN(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['StudentID'],
        $out_schedule['FirstName'],
        $out_schedule['LastName'],
        $out_schedule['ID'],
        $out_schedule['GradeID'],
        $out_schedule['SemPeriod']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['grades'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCourseSectionMeetingDatesByCRN($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL getPassedMeetingDatesByCRN(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['Date'],
        $out_schedule['Name'],
        $out_schedule['MeetingNumber']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['dates'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getCurrentSemesterID($conn) {
    $stmt = $conn->prepare("CALL getCurrentSemesterID()");
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['SemesterID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['semesterID'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function dropStudentFromCourseSection($conn, $params) {

    $arr ['status'] = "Failed!";
    if(!(isset($params['uid'], $params['crn']))) {
        $arr ['status'] = "Incomplete request";
    }

    $uid = $params['uid'];
    $crn = $params['crn'];

    $stmt = $conn->prepare("CALL dropCourseSectionByStudentIDAndCRN(?,?)");
    $stmt->bind_param("ss", $uid, $crn);
    $status = $stmt->execute();

    if($status === false)
        trigger_error($stmt->error, E_USER_ERROR);
    else
        $arr ['status'] = "$uid $crn";

    echo(json_encode($arr));

    mysqli_close($conn);

}

function addStudentToCourseSection($conn, $params) {

    $arr ['status'] = "Failed!";
    if(!(isset($params['uid'], $params['crn']))) {
        $arr ['status'] = "Incomplete request";
    }

    $uid = $params['uid'];
    $crn = $params['crn'];

    $stmt = $conn->prepare("CALL addStudentToCourseSection(?,?)");
    $stmt->bind_param("ss", $uid, $crn);
    $status = $stmt->execute();


    if($status === false)
        trigger_error($stmt->error, E_USER_ERROR);
    else
        $arr ['status'] = "$uid $crn";

    $out = [];
    $completeArray = [];
    try {
        $stmt->bind_result(
            $out['SeatsFilled'],
            $out['HasPassingGrade'],
            $out['AlreadyRegistered'],
            $out['HasHolds'],
            $out['CreditsExceeded'],
            $out['TimeWindowExceeded'],
            $out['TimeslotConflict']
        );


        while ($stmt->fetch()) {
            $row = [];
            foreach ($out as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
    } catch (ArgumentCountError $ex) {
        $out['ERROR'] = 'none';
    }

    $arr['ERRORS'] = $out;
    $arr['results'] = $completeArray;

    echo(json_encode($arr));

    mysqli_close($conn);

}

function deleteCourseSectionFromSchedule($conn) {
    $arr ['status'] = "Failed!";
    if(!(isset($_GET['crn']))) {
        $arr ['status'] = "Incomplete request";
    }

    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL deleteCourseSection(?)");
    $stmt->bind_param("s", $crn);
    $status = $stmt->execute();

    $out = '';
    $stmt->bind_result(
        $out
    );

    while ($stmt->fetch()) {
        $arr['result'] = $out;
    }

    if($status === false)
        trigger_error($stmt->error, E_USER_ERROR);
    else
        $arr ['status'] = $out;

    echo(json_encode($arr));

    mysqli_close($conn);
}

function createNewProgram($conn, $params) {

    $arr ['status'] = "Failed!";
    if(!(isset($params['programName'], $params['programTypeID'], $params['description'], $params['departmentID']))) {
        $arr ['status'] = "Incomplete request";
    }

    $programName = $params['programName'];
    $programTypeID = $params['programTypeID'];
    $description = $params['description'];
    $departmentID = $params['departmentID'];

    $stmt = $conn->prepare("CALL setNewProgramRecord(?,?,?,?)");
    $stmt->bind_param("ssss", $programName, $programTypeID, $description, $departmentID);
    $status = $stmt->execute();

    if($status === false)
        trigger_error($stmt->error, E_USER_ERROR);
    else
        $arr ['status'] = $programName . " " . $programTypeID . " " . $description . " " . $departmentID;

    echo(json_encode($arr));

    mysqli_close($conn);

}

function getStudentGradTypeByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getStudentGradTypeByStudentID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['UID'],
        $out_schedule['GradLevel'],
        $out_schedule['GradType']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['data'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getPrimaryProgramsForEnrollmentByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getPrimaryProgramsForEnrollmentByStudentID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['ProgramTypeID'],
        $out_schedule['ProgramID'],
        $out_schedule['ProgramName'],
        $out_schedule['Description'],
        $out_schedule['Name'],
        $out_schedule['ProgramLevel'],
        $out_schedule['ClassType'],
        $out_schedule['ClassLevel']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['programs'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getSecondaryProgramsForEnrollmentByStudentID($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getSecondaryProgramsForEnrollmentByStudentID(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['ProgramTypeID'],
        $out_schedule['ProgramID'],
        $out_schedule['ProgramName'],
        $out_schedule['Description'],
        $out_schedule['Name'],
        $out_schedule['ProgramLevel'],
        $out_schedule['ClassType'],
        $out_schedule['ClassLevel']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['programs'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAvailableAdvisorsUsingProgramID($conn) {
    if(!(isset($_GET['pid']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $pid = $_GET['pid'];

    $stmt = $conn->prepare("CALL getAvailableAdvisorsUsingProgramID(?)");
    $stmt->bind_param("s", $pid);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['UID'],
        $out_schedule['FirstName'],
        $out_schedule['LastName']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['advisors'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllTimeslots($conn) {

    $stmt = $conn->prepare("CALL getAllTimeslots()");
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['TimeslotID'],
        $out_schedule['Name'],
        $out_schedule['StartTime'],
        $out_schedule['EndTime']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['timeslots'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAvailableFacultyByTimeslotIDAndSemesterID($conn) {
    if(!(isset($_GET['sid'],$_GET['cid'],$_GET['ts1'],$_GET['ts2']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $sid = $_GET['sid'];
    $cid = $_GET['cid'];
    $ts1 = $_GET['ts1'];
    $ts2 = $_GET['ts2'];

    $stmt = $conn->prepare("CALL getAvailableFacultyByTimeslotIDAndSemesterID(?,?,?,?)");
    $stmt->bind_param("ssss", $sid, $cid, $ts1, $ts2);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['FacultyID'],
        $out_schedule['FirstName'],
        $out_schedule['LastName']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['faculty'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function setStudentToMajorMinor($conn) {
    if(!(isset($_GET['id'], $_GET['p1'], $_GET['f1']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];
    $p1 = $_GET['p1'];
    $f1 = $_GET['f1'];
    $p2 = null;
    $f2 = null;

    if(isset($_GET['p2'],$_GET['f2'])) {
        $p2 = $_GET['p2'];
        $f2 = $_GET['f2'];
    }

    $stmt = $conn->prepare("CALL setStudentToMajorMinor(?,?,?,?,?)");
    $stmt->bind_param("sssss", $id, $p1, $f1, $p2, $f2);
    $stmt->execute();

    $final_arr['payload'] = $id . " " . $p1 . " " . $f1 . " " . $p2 . " " . $f2;
    $final_arr['status'] = "0";
    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function createNewCourse($conn) {

    $arr ['status'] = "Failed!";
    if(!(isset($_GET['courseID'], $_GET['courseName'], $_GET['courseCredits'], $_GET['departmentID'], $_GET['description']))) {
        $arr ['status'] = "Incomplete request";
    }

    $courseID = $_GET['courseID'];
    $courseName = $_GET['courseName'];
    $courseCredits = $_GET['courseCredits'];
    $departmentID = $_GET['departmentID'];
    $description = $_GET['description'];

    $stmt = $conn->prepare("CALL setNewCourse(?,?,?,?,?)");
    $stmt->bind_param("sssss", $courseID, $courseName, $courseCredits, $departmentID, $description);
    $status = $stmt->execute();

    if($status === false)
        trigger_error($stmt->error, E_USER_ERROR);
    else
        $arr ['status'] = $courseID . " " . $courseName . " " . $courseCredits . " " . $departmentID . " " . $description;

    echo(json_encode($arr));

    mysqli_close($conn);

}

function createNewCourseSection($conn) {

    $arr ['status'] = "Failed!";
    if(!(isset($_GET['courseID'], $_GET['roomID'], $_GET['semesterID'], $_GET['timeslot1'], $_GET['timeslot2'], $_GET['facultyID'], $_GET['seatMax'], $_GET['seatMin']))) {
        $arr ['status'] = "Incomplete request";
    }

    $courseID = $_GET['courseID'];
    $roomID = $_GET['roomID'];
    $semesterID = $_GET['semesterID'];
    $timeslot1 = $_GET['timeslot1'];
    $timeslot2 = $_GET['timeslot2'];
    $facultyID = $_GET['facultyID'];
    $maxSeats = $_GET['seatMax'];
    $minSeats = $_GET['seatMin'];

    $stmt = $conn->prepare("CALL setNewCourseSection(?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssssssss", $courseID, $roomID, $semesterID, $timeslot1, $timeslot2, $facultyID, $maxSeats, $minSeats);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['CRN'],
        $out_schedule['SectionID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['result'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function createNewDepartment($conn) {

    $arr ['status'] = "Failed!";
    if(!(isset($_GET['fid'], $_GET['sid'], $_GET['did'], $_GET['desc'], $_GET['rid'], $_GET['phn']))) {
        $arr ['status'] = "Incomplete request";
        $final_arr['result'] = $arr;
        echo(json_encode($final_arr));
    }

    $fid = $_GET['fid'];
    $sid = $_GET['sid'];
    $did = $_GET['did'];
    $desc = $_GET['desc'];
    $rid = $_GET['rid'];
    $phn = $_GET['phn'];

    $stmt = $conn->prepare("CALL setNewDepartment(?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $fid, $sid, $did, $desc, $rid, $phn);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['ERROR']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['result'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function getAvailableOffices($conn) {

    $stmt = $conn->prepare("CALL getAvailableOffices()");
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['RoomID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['rooms'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllClassrooms($conn) {

    $stmt = $conn->prepare("CALL getAllClassrooms()");
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['RoomID']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['rooms'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAvailableRoomTimeslotsBySemesterIDAndRoomID($conn) {

    $arr ['status'] = "Failed!";
    if(!(isset($_GET['sid'], $_GET['rid']))) {
        $arr ['status'] = "Incomplete request";
    }

    $tsid = $_GET['sid'];
    $n = $_GET['rid'];

    $stmt = $conn->prepare("CALL getAvailableRoomTimeslotsBySemesterIDAndRoomID(?,?)");
    $stmt->bind_param("ss", $tsid, $n);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['TimeslotID'],
        $out_schedule['Name'],
        $out_schedule['StartTime'],
        $out_schedule['EndTime']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['timeslots'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function getAvailableFacultyForDepartmentHeadBySchoolID($conn) {

    $arr ['status'] = "Failed!";
    if(!(isset($_GET['sid']))) {
        $arr ['status'] = "Incomplete request";
        echo(json_encode($arr));
        return;
    }

    $sid = $_GET['sid'];

    $stmt = $conn->prepare("CALL getAvailableFacultyForDepartmentHeadBySchoolID(?)");
    $stmt->bind_param("s", $sid);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['FacultyID'],
        $out_schedule['FirstName'],
        $out_schedule['LastName']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['faculty'] = $completeArray;
    $final_arr['status'] = $arr['status'];

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function isLastMeetingEditable($conn) {

    $arr ['status'] = "Failed!";
    if(!(isset($_GET['cid']))) {
        $arr ['status'] = "Incomplete request";
        echo(json_encode($arr));
        return;
    }

    $cid = $_GET['cid'];

    $stmt = $conn->prepare("CALL checkMeetingNumber_Outer(?)");
    $stmt->bind_param("s", $cid);
    $stmt->execute();

    $out_schedule = [];
    $stmt->bind_result(
        $out_schedule['FacultyID'],
        $out_schedule['FirstName'],
        $out_schedule['LastName']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_schedule as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['faculty'] = $completeArray;
    $final_arr['status'] = $arr['status'];

    echo(json_encode($final_arr));

    mysqli_close($conn);

}

function getStudentHistory($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getStudentHistory(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CourseID'],
        $out_courses['GradeVal'],
        $out_courses['GradeLet']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['history'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getStudentHistory_past($conn) {
    if(!(isset($_GET['id']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $id = $_GET['id'];

    $stmt = $conn->prepare("CALL getStudentHistory_Past(?)");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CourseID'],
        $out_courses['GradeVal'],
        $out_courses['GradeLet']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['history'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getStudentHistory_Fulfilled($conn) {
    if(!(isset($_GET['pid'], $_GET['uid']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $pid = $_GET['pid'];
    $uid = $_GET['uid'];

    $stmt = $conn->prepare("CALL getStudentHistory_Fulfilled(?,?)");
    $stmt->bind_param("ss", $pid, $uid);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CourseID'],
        $out_courses['GradeVal'],
        $out_courses['GradeLet'],
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

    $final_arr['history'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function checkIfCanSetMidtermGrades($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL checkIfCanSetMidtermGrades(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CanGrade']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['status'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function checkIfCanSetFinalGrades($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];

    $stmt = $conn->prepare("CALL checkIfCanSetFinalGrades(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['CanGrade']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['status'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAvailableGrades($conn) {
    $stmt = $conn->prepare("CALL getAvailableGrades()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['GradeID'],
        $out_courses['Weight'],
        $out_courses['QualityPoints'],
        $out_courses['ID'],
        $out_courses['SemPeriod'],
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

    $final_arr['grades'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function getAllGrades_Passing($conn) {
    $stmt = $conn->prepare("CALL getAllGrades_Passing()");
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['GradeID'],
        $out_courses['Weight'],
        $out_courses['QualityPoints'],
        $out_courses['ID'],
        $out_courses['SemPeriod'],
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

    $final_arr['grades'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function checkMeetingNumber_Outer($conn) {
    if(!(isset($_GET['crn']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];


    $stmt = $conn->prepare("CALL checkMeetingNumber_Outer(?)");
    $stmt->bind_param("s", $crn);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['Status']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['status'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function assignGrades($conn) {
    if(!(isset($_GET['crn'], $_GET['grades']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];
    $grades = json_decode($_GET['grades'], true);

    $res_arr = [];
    for($i=0; $i < count($grades); $i++) {
        $stmt = $conn->prepare("CALL assignGrade(?,?,?)");
        //echo "\n".$grades[$i]['StudentID'] ." ". $crn ." ". $grades[$i]['ID'];

        $stmt->bind_param("sss", $grades[$i]['StudentID'], $crn, $grades[$i]['ID']);
        $stmt->execute();
        $out_courses = [];
        $stmt->bind_result(
            $out_courses['ERROR']
        );
        $completeArray = [];
        while ($stmt->fetch()) {
            $row = [];
            foreach ($out_courses as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
        $res_arr['record'] = $completeArray;
        $stmt->close();
    }

    $final_arr['result'] = $res_arr;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function assignAttendance($conn) {
    if(!(isset($_GET['crn'], $_GET['attendance']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $crn = $_GET['crn'];
    $attendance = json_decode($_GET['attendance'], true);

    $res_arr = [];
    for($i=0; $i < count($attendance); $i++) {
        $stmt = $conn->prepare("CALL assignAttendance(?,?,?,?)");
        echo "\n".$attendance[$i]['studentID']." ".$crn." ".$attendance[$i]['meetNum']." ".$attendance[$i]['status'];

        $stmt->bind_param("ssss", $attendance[$i]['studentID'], $crn, $attendance[$i]['meetNum'], $attendance[$i]['status']);
        $stmt->execute();
        $out_courses = [];
        $stmt->bind_result(
            $out_courses['ERROR']
        );
        $completeArray = [];
        while ($stmt->fetch()) {
            $row = [];
            foreach ($out_courses as $key => $val) {
                $row[$key] = $val;
            }
            $completeArray[] = $row;
        }
        $res_arr['record'] = $completeArray;
        $stmt->close();
    }

    $final_arr['result'] = $res_arr;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function setNewPrerequisite($conn) {
    if(!(isset($_GET['cid'], $_GET['minG']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $cid = $_GET['cid'];
    $minG = $_GET['minG'];

    $stmt = $conn->prepare("CALL setNewPrerequisite(?,?)");
    $stmt->bind_param("ss", $cid, $minG);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['ERROR']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['status'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}

function setNewRequirement($conn) {
    if(!(isset($_GET['cid'], $_GET['minG']))) {
        $out = ['error' => 'Incomplete request.'];
        echo json_encode($out);
        return;
    }
    $cid = $_GET['cid'];
    $minG = $_GET['minG'];

    $stmt = $conn->prepare("CALL setRequirement(?,?)");
    $stmt->bind_param("ss", $cid, $minG);
    $stmt->execute();

    $out_courses = [];
    $stmt->bind_result(
        $out_courses['ERROR']
    );

    $completeArray = [];
    while ($stmt->fetch()) {
        $row = [];
        foreach ($out_courses as $key => $val) {
            $row[$key] = $val;
        }
        $completeArray[] = $row;
    }

    $final_arr['status'] = $completeArray;

    echo(json_encode($final_arr));

    mysqli_close($conn);
}