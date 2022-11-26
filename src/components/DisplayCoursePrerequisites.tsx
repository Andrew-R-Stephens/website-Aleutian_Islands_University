import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import ProgramDetails from "../classes/ProgramDetails";
import CourseDetails from "../classes/CourseDetails";
import CoursePrereqs from "../classes/CoursePrereqs";

function DisplayCoursePrerequisites(props:any) {

    const [courseID, setCourseID] = useState(props.CID);
    const [coursePrereqs, setCoursePrereqs] = useState<CoursePrereqs>();

    useEffect(()=> {
        requestCoursePrerequisites().then();
    }, [courseID])

    useEffect(() => {
        coursePrereqs?.print();
    }, [coursePrereqs])

    async function requestCoursePrerequisites() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getCoursePrerequisites",
                id: courseID
            }
        }).then(res => {
            const {error, coursePrereqs} = res.data;
            console.log("Course Prereqs",coursePrereqs)
            if(coursePrereqs) {
                const prereqs = new CoursePrereqs(coursePrereqs);
                setCoursePrereqs(prereqs);
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
        return coursePrereqs?.renderAdvanced();
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayCoursePrerequisites;