import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useLocation} from "react-router-dom";
import axios from "axios";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";

function EditEnrollmentPage(props:any) {

    const location = useLocation();
    const {targetUID, targetRole, godRole} =
        (location as any|null)?.state ?
            (location as any|null)?.state
            : props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [studentInfo, setStudentInfo] = useState<any[]>();
    const [primaryPrograms, setPrimaryPrograms] = useState<any[]>();
    const [secondaryPrograms, setSecondaryPrograms] = useState<any[]>();
    const [primaryFaculty, setPrimaryFaculty] = useState<any[]>([]);
    const [secondaryFaculty, setSecondaryFaculty] = useState<any[]>([]);

    const [selectedPrimaryProgram, setSelectedPrimaryProgram] = useState<string>('');
    const [selectedSecondaryProgram, setSelectedSecondaryProgram] = useState<string>('');
    const [selectedPrimaryFaculty, setSelectedPrimaryFaculty] = useState<string>('');
    const [selectedSecondaryFaculty, setSelectedSecondaryFaculty] = useState<string>('');

    useEffect(() => {
        requestStudentGradType().then(r=>console.log());
        requestPrimaryPrograms().then(r=>console.log());
        requestSecondaryPrograms().then(r=>console.log());
    }, [userID])

    useEffect(() => {
        requestPrimaryFaculty().then(r=>console.log("Primary faculty acquired"))
    },[selectedPrimaryProgram])

    useEffect(() => {
        if(userRole === AuthRole.Student)
            setSelectedPrimaryFaculty(primaryFaculty?.at(0)?.UID)
    },[primaryFaculty])

    useEffect(() => {
        requestSecondaryFaculty().then(r=>(userRole === AuthRole.Student) ?
            setSelectedSecondaryFaculty(secondaryFaculty?.at(0)?.UID):'')
    },[selectedSecondaryProgram])

    useEffect(() => {
        if(userRole === AuthRole.Student)
            setSelectedSecondaryFaculty(secondaryFaculty?.at(0)?.UID ?
                    secondaryFaculty?.at(0)?.UID
                    : '')
    },[secondaryFaculty])

    async function requestStudentGradType() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getStudentGradTypeByStudentID",
                id: userID
            }
        }).then(res => {
            const {
                data
            } = res.data;

            setStudentInfo(data);
            console.log("requestStudentGradType", res.data);

        }).catch(function(err) {
            console.log("requestStudentGradType", err.message);
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
            console.log("requestPrimaryPrograms", res.data);

        }).catch(function(err) {
            console.log("requestPrimaryPrograms", err.message);
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
            console.log("requestSecondaryPrograms", res.data);

        }).catch(function(err) {
            console.log("requestSecondaryPrograms", err.message);
        })
    }

    async function requestPrimaryFaculty() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAvailableAdvisorsUsingProgramID",
                pid: selectedPrimaryProgram
            }
        }).then(res => {
            const {
                advisors
            } = res.data;

            setPrimaryFaculty(advisors);
            console.log("requestPrimaryFaculty", res.data);

        }).catch(function(err) {
            console.log("requestPrimaryFaculty", err.message);
        })
    }

    async function requestSecondaryFaculty() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAvailableAdvisorsUsingProgramID",
                pid: selectedSecondaryProgram
            }
        }).then(res => {
            const {
                advisors
            } = res.data;

            setSecondaryFaculty(advisors);
            console.log("requestSecondaryFaculty", res.data);

        }).catch(function(err) {
            console.log("requestSecondaryFaculty", err.message);
        })
    }

    async function requestSetEnrollments() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "setStudentToMajorMinor",
                id: userID,
                p1: selectedPrimaryProgram,
                f1: selectedPrimaryFaculty,
                p2: selectedSecondaryProgram===''?undefined:selectedSecondaryProgram,
                f2: selectedSecondaryFaculty===''?undefined:selectedSecondaryFaculty
            }
        }).then(res => {
            const {
                status
            } = res.data;
            console.log(res.data);
        }).catch(function(err) {
            console.log("requestSetEnrollments", err.message);
        })
    }

    const handleSelectPrimaryProgram = (event:any) => {
        setSelectedPrimaryProgram(event.target.value)
        console.log(selectedPrimaryProgram)
        if(event.target.value === '') {
            setSelectedPrimaryFaculty('')
            setSelectedSecondaryProgram('')
            setSelectedSecondaryFaculty('')
        }
    }

    const handleSelectSecondaryProgram = (event:any) => {
        setSelectedSecondaryProgram(event.target.value)
    }

    const handleSelectPrimaryAdvisor = (event:any) => {
        setSelectedPrimaryFaculty(event.target.value)
        if(event.target.value === '') {
            setSelectedSecondaryProgram('')
            setSelectedSecondaryFaculty('')
        }
    }

    const handleSelectSecondaryAdvisor = (event:any) => {
        setSelectedSecondaryFaculty(event.target.value)
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(selectedPrimaryProgram, selectedPrimaryFaculty, "."+selectedSecondaryProgram+".", "."+selectedSecondaryFaculty+".");
        requestSetEnrollments().then(r=>console.log("Enrollments requested"));
    }

    function disableSubmit():boolean {
        console.log("Check submit", "prog",selectedPrimaryProgram, "fac",selectedPrimaryFaculty+"", "prog",selectedSecondaryProgram, "fac",(selectedSecondaryFaculty+""))
        console.log(
            (selectedPrimaryProgram?.length>0 && (selectedPrimaryFaculty+"")?.length>0),
            (
                ((selectedSecondaryProgram?.length<=0 && (selectedSecondaryFaculty+"")?.length<=0)) ||
                ((selectedSecondaryProgram?.length>0 && (selectedSecondaryFaculty+"")?.length>0))
            )
        );
        return !(
            (selectedPrimaryProgram?.length>0 && (selectedPrimaryFaculty+"")?.length>0) &&
            (
                ((selectedSecondaryProgram?.length<=0 && (selectedSecondaryFaculty+"")?.length<=0)) ||
                ((selectedSecondaryProgram?.length>0 && (selectedSecondaryFaculty+"")?.length>0))
            )
        )
    }

    function displayStudentInfo() {
        return <Fragment>
            {
                studentInfo?.map((item:any)=>(
                    <div>{item.UID}{item.GradLevel}{item.GradType}</div>
                ))
            }
        </Fragment>
    }

    function displayProgram1Option() {
        return <Fragment>
            <div style={{display:"inline", margin:"auto"}}>
                <div style={{display:"inline"}}>
                    <div style={{display:"flex"}}>
                        <label style={{fontWeight:"bold", marginLeft:0, marginRight:"auto"}}>Primary Program</label>
                    </div>
                    <div>
                        <select defaultValue={selectedPrimaryProgram}
                                onChange={handleSelectPrimaryProgram}
                        >
                            <option value={''}>- Any -</option>
                            {
                                primaryPrograms!?.filter((p:any)=>(
                                    p.ProgramID+"" !== selectedSecondaryProgram+""
                                ))?.map((item:any)=>(
                                    <option value={item.ProgramID}>{item.ProgramName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {
                    userRole === AuthRole.Primary_Administrator ? displayFaculty1Option() : <Fragment/>
                }
            </div>
        </Fragment>
    }

    function displayProgram2Option() {
        return <Fragment>
            <div style={{display:"inline", margin:"auto"}}>
                <div style={{display:"inline"}}>
                    <div style={{display:"flex"}}>
                        <label style={{fontWeight:"bold", marginLeft:0, marginRight:"auto"}}>Secondary Program</label>
                    </div>
                    <div>
                        <select defaultValue={selectedSecondaryProgram}
                                value={selectedSecondaryProgram}
                                onChange={handleSelectSecondaryProgram}
                                disabled={(selectedPrimaryProgram?.length<=0) || (selectedPrimaryFaculty?.length<=0)}
                        >
                            <option value={''}>- Any -</option>
                            {
                                secondaryPrograms!?.filter((p:any)=>(
                                    p.ProgramID+"" !== selectedPrimaryProgram+""
                                ))?.map((item:any)=>(
                                    <option value={item.ProgramID}>{item.ProgramName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {
                    userRole === AuthRole.Primary_Administrator ? displayFaculty2Option() : <Fragment/>
                }
            </div>
        </Fragment>
    }

    function displayFaculty1Option() {
        return <Fragment>
            {
                <div style={{display:"inline"}}>
                    <div style={{display:"flex", marginTop: 16}}>
                        <label style={{fontWeight:"bold", marginLeft:0, marginRight:"auto"}}>Primary Advisor</label>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <select
                                value={selectedPrimaryFaculty}
                                onChange={handleSelectPrimaryAdvisor}
                        >
                            <option value={''}>- Any -</option>
                            {
                                primaryFaculty!?.filter((f:any)=>(
                                    f.UID+"" !== selectedSecondaryFaculty+""
                                ))?.map((item:any)=>(
                                    <option value={item.UID}>({item.UID}) {item.FirstName} {item.LastName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            }
        </Fragment>
    }

    function displayFaculty2Option() {
        return <Fragment>
            {
                <div style={{display:"inline"}}>
                    <div style={{display:"flex", marginTop: 16}}>
                        <label style={{fontWeight:"bold", marginLeft:0, marginRight:"auto"}}>Secondary Advisor</label>
                    </div>
                    <div style={{textAlign:"left"}}>
                        <select
                                value={selectedSecondaryFaculty}
                                onChange={handleSelectSecondaryAdvisor}
                                disabled={((selectedPrimaryProgram==="") || (selectedPrimaryFaculty===""))}
                        >
                            <option value={''}>- Any -</option>
                            {
                                secondaryFaculty!?.filter((f:any)=>(
                                    f.UID+"" !== selectedPrimaryFaculty+""
                                ))?.map((item:any)=>(
                                    <option value={item.UID}>({item.UID}) {item.FirstName} {item.LastName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            }
        </Fragment>
    }

    function renderPage() {
        return (
            <Fragment>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div id={'program-container'} style={{display:"flex", margin:"auto"}}>
                            {displayProgram1Option()}
                            {
                                studentInfo?.at(0)?.GradLevel !== 'Graduate' ?
                                displayProgram2Option()
                                : <Fragment/>
                            }
                        </div>
                        <button type={'submit'}
                                style={{marginTop: 16}}
                                disabled={disableSubmit()}>
                            Apply
                        </button>
                    </fieldset>
                </form>
            </Fragment>
        );
    }


    return (
        <Fragment>
            <div>
                <h1>Program Enrollment</h1>
                {renderPage()}
            </div>
        </Fragment>
    );

}

export default EditEnrollmentPage;