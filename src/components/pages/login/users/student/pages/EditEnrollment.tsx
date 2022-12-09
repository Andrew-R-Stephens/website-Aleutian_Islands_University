import React, {Fragment, useCallback, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import DisplayEnrollmentInfo from "../../DisplayEnrollmentInfo";

function EditEnrollment(props:any) {

    const location = useLocation();
    const {targetUID, targetRole, godRole} =
        (location as any|null)?.state ?
            (location as any|null)?.state
            : props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [studentInfo, setStudentInfo] = useState<any>();
    const [currentAdvisors, setCurrentAdvisors] = useState<any[]>();
    const [enrolledPrograms, setEnrolledPrograms] = useState<any[]>();
    const [primaryPrograms, setPrimaryPrograms] = useState<any[]>();
    const [secondaryPrograms, setSecondaryPrograms] = useState<any[]>();
    const [primaryFaculty, setPrimaryFaculty] = useState<any[]>();
    const [secondaryFaculty, setSecondaryFaculty] = useState<any[]>();

    async function requestCurrentAdvisors() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAdvisorByStudentID",
                id: userID
            }
        }).then(res => {
            const {
                advisors
            } = res.data;

            setCurrentAdvisors(advisors);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestCurrentEnrolledPrograms() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getProgramEnrollmentByStudentID",
                id: userID
            }
        }).then(res => {
            let {error, schedule} = res.data;
            console.log(res.data)
            setEnrolledPrograms(schedule);
            console.log("user",  userID)
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestStudentGradType() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getStudentGradTypeByStudentID",
                id: userID
            }
        }).then(res => {
            const {
                studentInfo
            } = res.data;

            setStudentInfo(studentInfo);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestPrimaryPrograms() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getPrimaryProgramsForEnrollmentByStudentID",
                id: userID
            }
        }).then(res => {
            const {
                programs
            } = res.data;

            setPrimaryPrograms(programs);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestSecondaryPrograms() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getSecondaryProgramsForEnrollmentByStudentID",
                id: userID
            }
        }).then(res => {
            const {
                programs
            } = res.data;

            setSecondaryPrograms(programs);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestPrimaryFaculty() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAvailableAdvisorsUsingProgramID",
                id: userID
            }
        }).then(res => {
            const {
                faculty
            } = res.data;

            setPrimaryFaculty(faculty);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestSecondaryFaculty() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAvailableAdvisorsUsingProgramID",
                id: userID
            }
        }).then(res => {
            const {
                faculty
            } = res.data;

            setSecondaryFaculty(faculty);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    function renderPage() {
        return (
            <Fragment>
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

export default EditEnrollment;