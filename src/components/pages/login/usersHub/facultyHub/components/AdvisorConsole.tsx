import React, {Fragment, useEffect, useState} from 'react';
import {AuthRole, Roles} from "../../../../../../stores/AuthUserStore";
import {useLocation} from "react-router-dom";
import Advisement from "../../shared/Advisement";
import axios from "axios";
import DegreeAuditPage from "../../studentHub/pages/DegreeAuditPage";
import DispllayHoldsPage from "../../studentHub/pages/DispllayHoldsPage";
import SemesterGrades from "../.././studentHub/pages/SemesterGrades";
import SemesterSchedule from "../../shared/SemesterSchedule";
import UnofficialTranscript from "../.././studentHub/pages/UnofficialTranscript";
import Profile from "../../shared/Profile";
import EditRegistrationPage from "../../studentHub/pages/EditRegistrationPage";
import EditEnrollmentPage from "../../studentHub/pages/EditEnrollmentPage";

function AdvisorConsole() {

    const location = useLocation();
    const {targetUID, godRole} = (location as any|null)?.state;

    console.log(targetUID, godRole)

    const [userID, setUserID] = useState(targetUID?targetUID:undefined);
    const [userRole, setUserRole] = useState<string>();

    enum Page {
        Home=0,
        Advisor=1,
        DegreeAudit=2,
        Holds=3,
        SemesterGrades=4,
        SemesterSchedules=5,
        UnofficialTranscript=6,
        PersonalInformation=7,
        Registration=8,
        Enrollment=9
    }
    const [page, setPage] = useState<number>(Page.Home);

    useEffect(() => {
        requestUserRoleByUID().then(r=>console.log("Done request role", userRole))
    }, [])

    async function requestUserRoleByUID() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getUserRoleByUID",
                id: targetUID
            }
        }).then(res => {
            console.log(res.data);
            const {userData} = res.data;
            userData.map((d:any) => (
                setUserRole(Roles[d.UserType].valueOf()+"")
            ))
        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    function displayHomeButton() {
        console.log("Page:", page, Page.Home)
        return (
            <div style={{display:"flex", margin: "auto", marginLeft: 32}}>
                <div style={{
                    marginTop: 32,
                    marginLeft: 0,
                    marginRight:"auto",
                    minWidth: 150, minHeight:25,
                    backgroundColor: "#333353",
                    color: "whitesmoke",
                    borderRadius: 5,
                    display:"inline-block"
                }} onClick={() => setPage(Page.Home)}>
                    <label style={{padding:32}}> {"< "}Back to Advisor Console</label>
                </div>
            </div>
        );
    }

    function handleSetPage(pageNum:number) {
        setPage(pageNum);
    }

    function displayDefaultPage() {
        return (
            <Fragment>
                <div>
                    <div className={'bubbles-container'}>
                        <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                            <div className={'page-bubble-wrapper page-bubble'} onClick={()=>handleSetPage(Page.PersonalInformation)}>
                                <div className={'icon-profile-image'}/>
                                <label className={'page-bubble-label'}>Personal Information</label>
                                <div className={'page-bubble-description'}>Todo</div>
                            </div>
                            {
                                userRole === AuthRole.Student ?
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.Holds)}>
                                        <div className={'icon-holds'}/>
                                        <label className={'page-bubble-label'}>Holds</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                    : <Fragment/>
                            }
                            {
                                (userRole === AuthRole.Student || userRole === AuthRole.Faculty) ?
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.Advisor)}>
                                        <div className={'icon-advisement'}/>
                                        <label className={'page-bubble-label'}>Advisement</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                    :<Fragment/>
                            }
                        </div>
                        {
                            userRole === AuthRole.Student ?
                                <div style={{display: "flex", marginTop: 32, marginBottom: 32}}>
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.DegreeAudit)}>
                                        <div className={'icon-degree-audit'}/>
                                        <label className={'page-bubble-label'}>Degree Audit</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.SemesterGrades)}>
                                        <div className={'icon-semester-grades'}/>
                                        <label className={'page-bubble-label'}>Semester Grades</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.UnofficialTranscript)}>
                                        <div className={'icon-unofficial-transcript'}/>
                                        <label className={'page-bubble-label'}>Unofficial Transcript</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                </div>
                                : <Fragment/>
                        }
                        <div style={{display:"flex", marginTop: 32}}>
                            {
                                (godRole === AuthRole.Primary_Administrator) && userRole === AuthRole.Student ?
                                <Fragment>
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.Registration)}>
                                        <div className={'icon-registration'}/>
                                        <label className={'page-bubble-label'}>Registration</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                    <div className={'page-bubble-wrapper page-bubble'} onClick={() => handleSetPage(Page.Enrollment)}>
                                        <div className={'icon-registration'}/>
                                        <label className={'page-bubble-label'}>Enrollment</label>
                                        <div className={'page-bubble-description'}>Todo</div>
                                    </div>
                                </Fragment>
                                :<Fragment/>
                            }
                            {
                                (userRole !== AuthRole.Administrator && userRole !== AuthRole.Primary_Administrator) ?
                                <div className={'page-bubble-wrapper page-bubble'}
                                     onClick={() => handleSetPage(Page.SemesterSchedules)}>
                                    <div className={'icon-semester-schedule'}/>
                                    <label className={'page-bubble-label'}>Semester Schedule</label>
                                    <div className={'page-bubble-description'}>Todo</div>
                                </div>
                                :<Fragment/>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    function displayPage() {

        switch(page) {
            case Page.Registration:{
                return <EditRegistrationPage targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.Enrollment:{
                return <EditEnrollmentPage targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.Advisor:{
                return <Advisement targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.DegreeAudit:{
                return <DegreeAuditPage targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.Holds:{
                return <DispllayHoldsPage targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.SemesterGrades:{
                return <SemesterGrades targetUID={targetUID}/>
            }
            case Page.SemesterSchedules:{
                return <SemesterSchedule targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.UnofficialTranscript:{
                return <UnofficialTranscript targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            case Page.PersonalInformation:{
                return <Profile targetUID={targetUID} targetRole={userRole} godRole={godRole}/>
            }
            default: {
                return <Fragment>{displayDefaultPage()}</Fragment>
            }

        }

    }

    return (
        <Fragment>
            <div style={{display:"inline-block", width: "100%", padding: 16, marginLeft:"auto", marginRight:"auto", backgroundColor:"#111113"}}>
                <div style={{display: "inline-block"}}>
                    <div style={{display: "inline-block"}}>
                        <label style={{color:"whitesmoke", fontSize:24}}>Advisor Console</label>
                    </div>
                    <div style={{marginTop: 8}}>
                        <label style={{color:"whitesmoke", fontSize:16}}>Viewing on behalf of {userID}</label>
                    </div>
                </div>
                <div>
                {
                    !(page===Page.Home)?displayHomeButton():<></>
                }
                </div>
            </div>
            {displayPage()}
        </Fragment>
    );

}

export default AdvisorConsole;