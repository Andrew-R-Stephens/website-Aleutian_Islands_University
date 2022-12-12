import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useLocation} from "react-router-dom";
import DisplaySemesterSchedule from "../../DisplaySemesterSchedule";
import DisplayMasterSchedule from "../../../../../DisplayMasterSchedule";
import axios from "axios";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";

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

    // const navigate = useNavigate();

    useEffect(() => {
        requestSemesterWithRegistrationAvailable().then(r=>console.log())
    }, [])

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

    async function requestAddCourseSection(crn:string) {
        await axios.post(process.env["REACT_APP_API_CATALOG"] as string, {
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

    function handleRegisterCourse(crn:string) {
        requestAddCourseSection(crn).then(r => console.log("Attempted to register course"));
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
                   handleRegisterCourse={(crn:string)=>handleRegisterCourse(crn)}
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