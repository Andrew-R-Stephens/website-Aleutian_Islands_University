import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import CourseDetails from "../../classes/CourseDetails";

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
        return(
            <div>
                <div style={{marginTop:32, width:"100%"}}>
                    <label style={{fontWeight:"bold", fontSize:40}}>{courseDetails?.course.Name}</label>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 700}}>
                    <div style={{textAlign:"left"}}>
                        <div style={{marginBottom:32}}>
                            <div style={{marginBottom:2}}>
                                <div style={{textAlign: "left", marginLeft: 16}}>
                                    <div  style={{width: "100%", float:"left", display:"inline-block", marginBottom:16}}>
                                        <div style={{fontSize: 20, width:"100%", display: "flex"}}>
                                            <div style={{fontWeight: "bold", marginRight:8}}>Course ID: </div>
                                            <div style={{fontSize: 16, marginTop:"auto", marginBottom:"auto"}}>{courseDetails?.course.CourseID}</div>
                                        </div>
                                        <div style={{fontSize: 20, width:"100%", display: "flex"}}>
                                            <div style={{fontWeight: "bold", marginRight:8}}>Department: </div>
                                            <div style={{fontSize: 16, marginTop:"auto", marginBottom:"auto"}}>{courseDetails?.course.DepartmentID}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={{textAlign:"left", fontSize: 14}}>{courseDetails?.course.Description}</p>
                        </div>
                        <div style={{margin:32}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayCourseDetails;