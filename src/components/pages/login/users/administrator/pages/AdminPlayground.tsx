import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

function AdminPlayground() {

    const navigate = useNavigate();

    enum Pages {
        Create_Course,
        Create_Department,
        Create_Course_Section,
        Create_User,
        Create_Program,
        Create_Prerequisite,
        Create_Requirement
    }
    function handlePageChange(page:number) {
        switch (page) {
            case Pages.Create_Course: {
                navigate("./../create-course");
                break;
            }
            case Pages.Create_Department: {
                navigate("./../create-department");
                break;
            }
            case Pages.Create_Course_Section: {
                navigate("./../create-course-section");
                break;
            }
            case Pages.Create_User: {
                navigate("./../create-user");
                break;
            }
            case Pages.Create_Program: {
                navigate("./../create-program");
                break;
            }
            case Pages.Create_Prerequisite: {
                navigate("./../create-prerequisite");
                break;
            }
            case Pages.Create_Requirement: {
                navigate("./../create-requirement");
                break;
            }
        }
    }

    return (
        <Fragment>
            <div>
                <h1>Creator Sandbox</h1>
            </div>
            <div style={{display:"inline-block"}}>
                <div style={{marginBottom:32, display:"inline-block"}}>
                    <div style={{marginBottom:32, display:"flex"}}>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Course)}>Create Course</button></div>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Department)}>Create Department</button></div>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Course_Section)}>Create Course Section</button></div>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_User)}>Create User</button></div>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Program)}>Create Program</button></div>
                    </div>
                    <div style={{marginBottom:32, display:"flex"}}>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Prerequisite)}>Create Prerequisite</button></div>
                        <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Requirement)}>Create Requirement</button></div>
                    </div>
                </div>
                {/*<div style={{marginBottom:32, display:"flex"}}>
                    <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Course)}>Create Prerequisite</button></div>
                    <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Department)}>Create Requirement</button></div>
                    <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Course_Section)}>Create Course Section</button></div>
                    <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_User)}>Create User</button></div>
                    <div style={{margin:"auto"}}><button onClick={()=>handlePageChange(Pages.Create_Program)}>Create Program</button></div>
                </div>*/}
            </div>
        </Fragment>
    );
}

export default AdminPlayground;