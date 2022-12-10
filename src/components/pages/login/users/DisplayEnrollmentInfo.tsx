import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";
import "./../../../../css/PeudoTable.css"
import DisplayCourseSection from "./DisplayCourseSection";
import {convertTime} from "../../../../Utils";

function DisplayEnrollmentInfo(props:any) {

    const {targetUID, targetRole, godRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [advisors, setAdvisors] = useState<any[]>();
    const [programs, setPrograms] = useState<any[]>();

    useEffect(() => {
        requestAdvisors().then();
        requestEnrolledPrograms().then();
    }, [])

    async function requestAdvisors() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAdvisorByStudentID",
                id: userID
            }
        }).then(res => {
            setAdvisors(res.data);
            console.log("advs", res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestEnrolledPrograms() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getProgramEnrollmentByStudentID",
                id: userID
            }
        }).then(res => {
            let {error, programs} = res.data;
            console.log(res.data)
            setPrograms(programs);
            console.log("user",  userID)
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function displayProgramEnrollments() {
        return (
            <Fragment>
                <Fragment>
                    {
                        programs?.map((item:any)=>(
                            <div>
                                {item.ProgramID}{item.ProgramTypeID}{item.ProgramName}
                            </div>
                        ))

                    }
                </Fragment>
            </Fragment>
        );
    }

    console.log(advisors)
    function displayAdvisorsInformation() {
        return (
            <Fragment>
                {
                    advisors?.map((item:any)=>(
                        <div>
                            {item.UID} {item.FirstName} {item.LastName}
                        </div>
                    ))

                }
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div style={{margin:32}}>
                {displayProgramEnrollments()}
                {displayAdvisorsInformation()}
            </div>

        </Fragment>
    );
}

export default DisplayEnrollmentInfo;

