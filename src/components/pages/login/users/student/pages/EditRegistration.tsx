import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useLocation} from "react-router-dom";
import DisplaySemesterSchedule from "../../DisplaySemesterSchedule";
import DisplayMasterSchedule from "../../../../../DisplayMasterSchedule";
import axios from "axios";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import StudentHistory from "../../../../../../classes/StudentHistory";
import CoursePrereqs from "../../../../../../classes/CoursePrereqs";
import PrereqComparable from "../../../../../../classes/PrereqComparable";

function EditRegistration(props:any) {

    const location = useLocation();
    const {targetUID, targetRole, godRole} =
        (location as any|null)?.state ?
            (location as any|null)?.state
            : props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [, updateState] = useState<any>();

    enum Pages {
        Add_Drop,
        CourseSearch
    }
    const [page, setPage] = useState(0);
    const [registrableSemesterID, setRegistrableSemesterID] = useState<any>()

    const [chosenData, setChosenData] = useState<any>();
    const [studentHistory, setStudentHistory] = useState<StudentHistory>();
    const [coursePrereqs, setCoursePrereqs] = useState<CoursePrereqs>();

    useEffect(() => {
        requestSemesterWithRegistrationAvailable().then(r=>console.log("Semester registrations requested"))
        requestStudentHistory().then(r=>console.log("Student History requested"))
    }, [])

    useEffect(() => {
        requestCoursePrerequisites(chosenData?.courseID).then(r =>
            console.log("Requested prereqs!")
        )
    }, [chosenData])

    useEffect(() => {
        new PrereqComparable(coursePrereqs?.master).isSatisfied(studentHistory) ?
            requestAddCourseSection(chosenData?.crn)
            : console.log("Unsatisfied.")
    }, [coursePrereqs])

    async function requestSemesterWithRegistrationAvailable() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getSemesterWithRegistrationAvailable",
            }
        }).then(res => {
            const {
                SemesterID
            } = res.data;
            console.log("Semester Info", res.data);

            setRegistrableSemesterID(SemesterID);

        }).catch(function(err) {
            console.log("available sems", err.message);
        })
    }

    async function requestStudentHistory() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getStudentHistory",
                id: userID
            }
        }).then(res => {
            const {
                history
            } = res.data;
            console.log("History", res.data);

            setStudentHistory(new StudentHistory(history));

        }).catch(function(err) {
            console.log("available sems", err.message);
        })
    }


    async function requestCoursePrerequisites(courseID:string) {
        console.log("Course Prereqs Requested", courseID)
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getCoursePrerequisites",
                id: courseID
            }
        }).then(res => {
            const {error, coursePrereqs} = res.data;
            console.log("res Course Prereqs", coursePrereqs, "data", res.data)
            setCoursePrereqs(new CoursePrereqs(coursePrereqs));
        }).catch(function(err) {
            if(axios.isCancel(err)) {
                console.log("canceled!")
            }
            console.log(err.message);
        })
    }


    function requestAddCourseSection(crn:string) {
        console.log("Add course Requested", crn)
        axios.post(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                post: "addCourseSection",
                uid: userID,
                crn
            }
        }).then(res => {
            const{status='Failed'} = res.data;
            console.log("Res: ", res.data)
        }).catch(function(err) {
            console.log(err.message);
        })
    }


    function renderPage() {
        switch(page) {
            case Pages.CourseSearch: {
                return displayCourseSearch();
            }
            default: {
                return displayAddDrop();
            }
        }
    }

    function handlePageChange(event:any, newPage:number) {
        event.preventDefault();
        setPage(newPage)
    }

    function handleRegisterCourse(crn:string, courseID:string) {
        setChosenData({crn, courseID});
    }

    function displayAddDrop() {
        return (
            <Fragment>
                <h1>Add / Drop Course Sections</h1>
                <DisplaySemesterSchedule
                    targetRole={targetRole}
                    godRole={godRole}
                    targetUID={targetUID}
                    enableRegistration={true}
                    registrableSemesterID={registrableSemesterID?.at(0)?.SemesterID}
                    handleNavigateCourseSearch={(event:any)=>handlePageChange(event, Pages.CourseSearch)}/>
            </Fragment>
        );
    }

    function displayCourseSearch() {
        return (
            <Fragment>
                <h1>Registration Course Search</h1>
                <DisplayMasterSchedule
                    enableRegistration={true}
                   registrableSemesterID={registrableSemesterID?.at(0)?.SemesterID}
                   handleRegisterCourse={(crn:string, courseID:string)=>handleRegisterCourse(crn, courseID)}
                   handleBackButton={(event:any)=>handlePageChange(event, Pages.Add_Drop)}/>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div>
                {renderPage()}
            </div>
        </Fragment>
    );

}

export default EditRegistration;