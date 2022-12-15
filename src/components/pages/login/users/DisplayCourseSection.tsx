import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import DisplayCourseSectionAttendance from "./faculty/components/DisplayCourseSectionAttendance";
import DisplayCourseSectionDetails from "./faculty/components/DisplayCourseSectionDetails";
import DisplayCourseSectionRoster from "./faculty/components/DisplayCourseSectionRoster";
import {AuthRole, UserAuthStore} from "../../../../stores/AuthUserStore";
import DisplayCourseSectionRosterWithGrades from "./faculty/components/DisplayCourseSectionRosterWithGrades";

function DisplayCourseSection(props:any) {

    const {targetCRN, godRole} = props;
    const userStoreID = UserAuthStore((state:any) => state.userID);
    //const userRoleID = RoleAuthStore((state:any) => state.authRole);

    const [crn, setCRN] = useState(targetCRN);
    const [data, setData] = useState<any[]>();
    const [currentSemesterID, setCurrentSemesterID] = useState<any>();

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        requestCurrentSemester().then(r => console.log());
        requestSectionDetails().then(r => console.log());
    }, [crn])

    useEffect(() => {
        console.log("is known section", data)
    }, [data])

    async function requestSectionDetails() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionDataByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, data} = res.data;
            //const data = (data!?.filter((d:any)=>(d.FacultyID===userStoreID)))?.length > 0;
            setData(data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCurrentSemester() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCurrentSemesterID"
            }
        }).then(res => {
            let {error, semesterID} = res.data;
            setCurrentSemesterID(semesterID);
            console.log("semesterID", semesterID)
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function displayStudent() {
        return (
            <Fragment>
                <DisplayCourseSectionDetails targetCRN={crn}/>
                {
                    data!?.filter((d:any)=>(d.FacultyID===userStoreID && currentSemesterID?.at(0)?.SemesterID === d.SemesterID))?.length > 0 ?
                        <Fragment>
                            <DisplayCourseSectionRoster targetCRN={crn}/>
                        </Fragment>
                        :<Fragment/>
                }
            </Fragment>
        );
    }

    function displayFaculty() {
        return (
            <Fragment>
                <DisplayCourseSectionDetails targetCRN={crn}/>
                {
                    data!?.filter((d:any)=>(d.FacultyID===userStoreID && currentSemesterID?.at(0)?.SemesterID === d.SemesterID))?.length > 0 ?
                        <Fragment>
                            <DisplayCourseSectionRosterWithGrades targetCRN={crn}/>
                            <DisplayCourseSectionAttendance targetCRN={crn}/>
                        </Fragment>
                        :<Fragment/>
                }

            </Fragment>
        );
    }

    function displayAdministrator() {
        return (
            <Fragment>
                <DisplayCourseSectionDetails targetCRN={crn}/>
                <DisplayCourseSectionRosterWithGrades targetCRN={crn} godRole={godRole}/>
                <DisplayCourseSectionAttendance targetCRN={crn} godRole={godRole}/>
            </Fragment>
        );
    }

    function displayAsRole() {
        switch(godRole/*?godRole:userStoreRole*/) {
            case AuthRole.Student: {
                return displayStudent();
            }
            case AuthRole.Faculty: {
                return displayFaculty();
            }
            case AuthRole.Administrator:
            case AuthRole.Primary_Administrator: {
                return displayAdministrator();
            }
            default: {
                return <Fragment/>
            }
        }
    }


    return (
        <Fragment>
            <div>
                {displayAsRole()}
            </div>
        </Fragment>
    );

}

export default DisplayCourseSection;