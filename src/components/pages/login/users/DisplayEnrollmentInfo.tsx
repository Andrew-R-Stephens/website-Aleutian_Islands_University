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

    const [advisors, setAdvisors] = useState<any[]>(testAdv);
    const [programs, setPrograms] = useState<any[]>(testProgs);

    useEffect(() => {
        //requestAdvisors().then();
        //requestEnrolledPrograms().then();
    }, [])

    async function requestAdvisors() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAdvisorByStudentID"
            }
        }).then(res => {
            const {
                advisors
            } = res.data;

            setAdvisors(advisors);
            console.log(res.data);

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
            let {error, schedule} = res.data;
            console.log(res.data)
            setPrograms(schedule);
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

const testProgs = [
    {
        "ProgramID" : 10,
        "UID" : 300694,
        "ProgramName" : "American Studies",
        "ProgramTypeID" : "B.A.",
        "Description" : "American Studies is an interdisciplinary liberal arts program. Courses in the program examine the history and culture of the United States, social and economic structure, forms of cultural expression, and political and legal institutions. These courses integrate history, sociology, literature, and media studies and are designed to encourage the development of critical thinking, debate and clear expository writing. American Studies courses emphasize the diversity of American Society and the experiences of ordinary life, paying particular attention to ethnic, gender, and other forms of social inequality. Courses examine institutions of power and control and the ways people attempt to change society."
    },
    {
        "ProgramID" : 41,
        "UID" : 300694,
        "ProgramName" : "Media and Communications",
        "ProgramTypeID" : "B.A.",
        "Description" : "The major in Media and Communications provides students with a broad-based education emphasizing theoretical, historical and experiential learning in an interdisciplinary context. Its curriculum is designed to give students a grounding in the economic, political, social, and intellectual history of the U.S."
    }
]

const testAdv = [
    {
        "UID" : 376668,
        "FirstName" : "Lavina",
        "LastName" : "West-Frimley",
        "PhoneNum" : "978-782-3812",
        "Email" : "lwestf@aiuniversity.edu",
        "RoomNum" : 233,
        "BuildingName" : "Sandhill Cluster",
        "TIME_FORMAT(pe.StartTime, '%r')" : "08:15:00 PM",
        "TIME_FORMAT(pe.EndTime, '%r')" : "09:30:00 PM",
        "Name" : "Wednesday"
    },
    {
        "UID" : 385381,
        "FirstName" : "Drew",
        "LastName" : "Ladlow",
        "PhoneNum" : "215-338-5293",
        "Email" : "dladlo@aiuniversity.edu",
        "RoomNum" : 229,
        "BuildingName" : "Sandhill Cluster",
        "TIME_FORMAT(pe.StartTime, '%r')" : "09:45:00 AM",
        "TIME_FORMAT(pe.EndTime, '%r')" : "11:00:00 AM",
        "Name" : "Thursday"
    }
]
