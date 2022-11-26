import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import ProgramDetails from "../classes/ProgramDetails";
import CourseDetails from "../classes/CourseDetails";

function DisplayCourseDetails(props:any) {

    const [courseID, setCourseID] = useState(props.CID);
    const [courseDetails, setCourseDetails] = useState<CourseDetails>();

    useEffect(()=> {
        requestCourseDetails().then();
    }, [courseID])

    useEffect(() => {
        courseDetails?.print();
    }, [courseDetails])

    async function requestCourseDetails() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getCourseDetails",
                id: courseID
            }
        }).then(res => {
            const {error, courseDetails} = res.data;
            if(courseDetails) {
                const courseData = new CourseDetails(courseDetails);
                setCourseDetails(courseData);
                console.log("Course Details",courseDetails)
            } else {
                console.log("Error:", error);
            }
        }).catch(function(err) {
            if(axios.isCancel(err)) {
                console.log("canceled!")
            }
            console.log(err.message);
        })
    }

    function renderDetails():any {
        return courseDetails?.renderAdvanced();
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayCourseDetails;