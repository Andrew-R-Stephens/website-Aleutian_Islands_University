import React, {Fragment, useCallback, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import DisplayEnrollmentInfo from "../../DisplayEnrollmentInfo";
import student from "../Student";

function EditEnrollment(props:any) {

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
    const [currentAdvisors, setCurrentAdvisors] = useState<any[]>();
    const [enrolledPrograms, setEnrolledPrograms] = useState<any[]>();
    const [primaryPrograms, setPrimaryPrograms] = useState<any[]>();
    const [secondaryPrograms, setSecondaryPrograms] = useState<any[]>();
    const [primaryFaculty, setPrimaryFaculty] = useState<any[]>([]);
    const [secondaryFaculty, setSecondaryFaculty] = useState<any[]>([]);

    const [selectedPrimaryProgram, setSelectedPrimaryProgram] = useState<string>('');
    const [selectedSecondaryProgram, setSelectedSecondaryProgram] = useState<string>();
    const [selectedPrimaryFaculty, setSelectedPrimaryFaculty] = useState<string>('');
    const [selectedSecondaryFaculty, setSelectedSecondaryFaculty] = useState<string>();

    useEffect(() => {
        requestCurrentAdvisors().then(r=>console.log());
        requestCurrentEnrolledPrograms().then(r=>console.log());
        requestStudentGradType().then(r=>console.log());
        requestPrimaryPrograms().then(r=>console.log());
        requestSecondaryPrograms().then(r=>console.log());
    }, [userID])

    useEffect(() => {
        requestPrimaryFaculty().then(r=>console.log("Populating f1", r));
    },[selectedPrimaryProgram])

    useEffect(() => {
        requestSecondaryFaculty().then(r=>console.log("Populating f2", r));
    },[selectedSecondaryProgram])

    async function requestCurrentAdvisors() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAdvisorByStudentID",
                id: userID
            }
        }).then(res => {
            const {
                advisors
            } = res.data;

            setCurrentAdvisors(advisors);
            console.log("requestCurrentAdvisors", res.data);

        }).catch(function(err) {
            console.log("requestCurrentAdvisors", err.message);
        })
    }

    async function requestCurrentEnrolledPrograms() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getProgramEnrollmentByStudentID",
                id: userID
            }
        }).then(res => {
            let {error, schedule} = res.data;
            console.log("requestCurrentEnrolledPrograms", res.data)
            setEnrolledPrograms(schedule);
            console.log("user",  userID)
        }).catch(function(err) {
            console.log("requestCurrentEnrolledPrograms", err.message);
        })
    }

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
        requestSetEnrollments().then(r=>console.log("Enrollments requested"));
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

    console.log(selectedPrimaryProgram, selectedPrimaryFaculty, selectedSecondaryProgram, selectedSecondaryFaculty)

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
                                primaryPrograms?.map((item:any)=>(
                                    <option value={item.ProgramID}>{item.ProgramName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {displayFaculty1Option()}
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
                                secondaryPrograms?.map((item:any)=>(
                                    <option value={item.ProgramID}>{item.ProgramName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {displayFaculty2Option()}
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
                                primaryFaculty?.map((item:any)=>(
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
                                secondaryFaculty?.map((item:any)=>(
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
                {displayStudentInfo()}
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
                        <button type={'submit'}>Apply</button>
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

export default EditEnrollment;