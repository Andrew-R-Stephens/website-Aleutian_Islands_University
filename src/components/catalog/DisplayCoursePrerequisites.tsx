import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import CoursePrereqs, {Logic, Prereq, PrereqGroup} from "../../classes/CoursePrereqs";

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

    function displayLogicVerbose(value: number)  {
        switch(value){
            case Logic.AND:{
                return "Complete all:";
            }
            case Logic.OR: {
                return "Choose one:"
            }
        }
    }

    function hasPrerequisites(prerequisites:number|undefined):boolean {
        const determinate: number|undefined = prerequisites;

        if(determinate == undefined) return false;

        return determinate > 0;
    }

    function renderDetails() {

        return (

            <Fragment>
                <div><label style={{fontSize:24, fontWeight:"bold"}}>Prerequisites</label></div>
                <div><label style={{fontSize:14}}>{
                    (hasPrerequisites(coursePrereqs?.master?.groups?.length)) ?
                    "Courses may only be used once." : "There are no prerequisites for this course."
                }</label></div>
                <div style={{fontWeight:"bold", marginTop:16, marginBottom:16}}>{displayLogicVerbose(coursePrereqs?.master?.logic??0)}</div>
                <div style={{display:"flex", margin:"auto"}}>
                    {
                        coursePrereqs?.master?.groups?.map((g:PrereqGroup)=>(
                            <div style={{display:"inline-block", margin:"auto"}}>
                                <div style={{fontWeight:"bold"}}>{displayLogicVerbose((g.logic)??0)}</div>
                                <div>
                                    {
                                        g.prereqs.map((p:Prereq)=> (
                                            <div>{p.courseID}{p.gradeVal<11?
                                                ":"+ p.gradeLet
                                                :""}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Fragment>

        );

    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto", maxWidth:700, backgroundColor:"#dddddd", borderRadius:15, padding:16}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayCoursePrerequisites;