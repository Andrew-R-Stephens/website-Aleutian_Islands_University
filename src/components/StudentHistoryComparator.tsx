import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useUserAuthStore} from '../stores/AuthUserStore';

function StudentHistoryComparator() {

    const userID = useUserAuthStore((state:any) => state.userID);

    const [studentHistory, setStudentHistory] = useState([]);

    useEffect(() => {
        getStudentHistory().then(res => console.log("Completed history"));
    }, [userID]);

    async function getStudentHistory() {
        await axios.get(process.env["REACT_APP_API_PROCEDURES"] as string, {
            params: {
                func: "getStudentHistory",
                studentID: userID
            }
        }).then(res => {
            const {studentHistory} = res.data;
            setStudentHistory(studentHistory);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    return (
        <Fragment>
            <div style={{alignItems: 'center', margin: '10vmin'}}>
                <p>This checks if a Student's History contains a course with a grade that's acceptable for fulfilling a program's course prerequisite.</p>
                <h3>The Actual Student History:</h3>
                <br/>
                <table>
                    <thead>
                    <tr><th>Student ID</th><th>Course ID</th><th>Acquired Grade</th></tr>
                    </thead>
                    <tbody>
                    {
                        studentHistory.map((item:any, key:number) => (
                            <tr key={key}><td>{userID}</td><td>{item.course_id}</td><td>{item.course_grade}</td></tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default StudentHistoryComparator;

// OLD ----------------------
/*
import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useUserAuthStore} from './AuthUserStore';

function StudentHistoryComparator() {

    const userID = useUserAuthStore((state:any) => state.userID);
    const setUserID = useUserAuthStore((state:any) => state.setUserID);
    const defaultUserID = useUserAuthStore((state:any) => state.defaultUserID);

    const [tempID, setTempID] = useState(userID);
    const [studentHistory, setStudentHistory] = useState([]);
    const [gradesList, setGradesList] = useState([]);

    useEffect(() => {
        getGradesList().then(r => console.log("Completed grades"));
    }, []);

    useEffect(() => {
        getStudentHistory().then(res => console.log("Completed history"));
    }, [userID]);

    async function getStudentHistory() {
        await axios.get(process.env["REACT_APP_API_PROCEDURES"] as string, {
            params: {
                func: "getStudentHistory",
                studentID: userID
            }
        }).then(res => {
            const {studentHistory} = res.data;
            setStudentHistory(studentHistory);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function getGradesList() {
        await axios.get(process.env["REACT_APP_API_PROCEDURES"] as string, {
            params: {
                func: "getGradesList"
            }
        }).then(res => {
            const {gradesList} = res.data;
            setGradesList(gradesList);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleIDChange = (event:any) => {
        setTempID(event.target.value);
    };

    function finalizeSubmission(event:any) {
        if(event.key === 'Enter') {
            setUserID(tempID)
        }
    }

    return (
        <Fragment>
            <div style={{alignItems: 'center', margin: '10vmin'}}>
                <p>This checks if a Student's History contains a course with a grade that's acceptable for fulfilling a program's course prerequisite.</p>
                <h3>The Actual Student History:</h3>
                <p>Student ID: <input type={"text"} onChange={handleIDChange} onKeyDown={finalizeSubmission} defaultValue={userID}></input></p>
                <br/>
                <table cellSpacing={0}>
                    <thead>
                    <tr><th>Student ID</th><th>Course ID</th><th>Acquired Grade</th></tr>
                    </thead>
                    <tbody>
                    {
                        studentHistory.map((item:any, key:number) => (
                            <tr key={key}><td>{userID}</td><td>{item.course_id}</td><td>{item.course_grade}</td></tr>
                        ))
                    }
                    </tbody>
                </table>
                <br/><hr/><br/>
                <h3>Program's Course Requirements:</h3>
                <br/>
                <table cellSpacing={0}>
                    <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Lowest Grade Needed</th>
                        <th style={{borderWidth: '0px', textAlign: 'center'}} colSpan={2}>
                            Is Satisfied?
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        studentHistory.map((item:any, key:number) => (
                            <GradeCheckComponent
                                key={studentHistory.length+key}
                                studentID={{userID}}
                                courseID={item.course_id}
                                gradesList={gradesList}>
                            </GradeCheckComponent>)
                        )
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

function GradeCheckComponent(props:any) {

    const { courseID = "", gradesList = []} = props;

    const [isSatisfied = -1, setIsSatisfied] = useState(-1);
    const [chosenGrade = '', setChosenGrade] = useState('');

    const userID = useUserAuthStore((state:any) => state.userID)

    function getGradesDropdown() {
        return (
            <select onChange={e => chooseGrade(e.target.value)}>
                <option value={''}>Choose here</option>
                {gradesList?.map((option:any, index:number) => (
                    <option key={index} value={option.id}>
                        {
                            option.description !== "Grade"
                                ? option.description + " (" + option.id + ")"
                                : option.id
                        }
                    </option>
                ))}
            </select>);
    }


    function chooseGrade(grade:any) {
        setChosenGrade(grade);
    }

    async function checkGrades() {
        await axios.get(process.env["REACT_APP_API_PROCEDURES"] as string, {
            params: {
                func: "isCourseGradeSatisfied",
                studentID : userID,
                courseID : courseID,
                courseGrade: chosenGrade
            }
        }).then(res => {
            console.log(res.data);
            const {isSatisfied} = res.data;
            setIsSatisfied(isSatisfied);

        }).catch(function(err) {
            console.log(err.message);
            const {error_code} = err;
            console.log(error_code);
        })
    }

    return (
        <Fragment>
            <tr>
                <td>{courseID}</td>
                <td>{getGradesDropdown()}</td>
                <td style={{borderWidth: '0px', textAlign: 'center'}}>
                    <button onClick={()=>checkGrades()}>Check DB</button>
                </td>
                <td style={{borderWidth: '0px', textAlign: 'center', minWidth:'3em'}}>
                    {" "}{isSatisfied === -1? ' ' : (isSatisfied === 0 ? 'No' : 'Yes')}
                </td>
            </tr>

        </Fragment>
    );
}

export default StudentHistoryComparator;

 */