
import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import DisplayAttendance from "./faculty/components/DisplayCourseSectionAttendance";
import DisplayCourseSectionDetails from "./DisplayCourseSectionDetails";
import DisplayCourseSectionRoster from "./faculty/components/DisplayCourseSectionRoster";
import DisplayCourseSectionAttendance from "./faculty/components/DisplayCourseSectionAttendance";

function DisplayCourseSection(props:any) {

    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [data, setData] = useState<any[]>();
    const [roster, setRoster] = useState<any[]>();
    const [attendance, setAttendance] = useState<any[]>();
    const [grades, setGrades] = useState<any[]>();

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        requestSectionData().then(r=>console.log(r));
        requestSectionRoster().then(r=>console.log(r));
        requestSectionGrades().then(r=>console.log(r));
    }, [crn])

    async function requestSectionData() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionDataByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, data} = res.data;
            console.log(res.data)
            setData(data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestSectionRoster() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionRosterByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, roster} = res.data;
            console.log(res.data)
            setRoster(roster);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestSectionGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionGradesByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, grades} = res.data;
            console.log(res.data)
            setGrades(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function displayStudent() {
        return (
            <Fragment>

            </Fragment>
        );
    }

    function displayFaculty() {
        return (
            <Fragment>
                <DisplayCourseSectionDetails targetCRN={crn}/>
                <DisplayCourseSectionRoster targetCRN={crn}/>
                <DisplayCourseSectionAttendance targetCRN={crn}/>
            </Fragment>
        );
    }


    return (
        <Fragment>
            <div>
                {godRole==='1'?displayStudent():displayFaculty()}
            </div>
        </Fragment>
    );

}

export default DisplayCourseSection;