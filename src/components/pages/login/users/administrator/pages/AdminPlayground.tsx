import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

function AdminPlayground() {

    const navigate = useNavigate();

    enum Pages {
        Create_Course,
        Create_Department,
        Create_Course_Section,
        Create_User,
        Create_Program
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
        }
    }

    return (
        <Fragment>
            <button onClick={()=>handlePageChange(Pages.Create_Course)}>Create Course</button>
            <button onClick={()=>handlePageChange(Pages.Create_Department)}>Create Department</button>
            <button onClick={()=>handlePageChange(Pages.Create_Course_Section)}>Create Course Section</button>
            <button onClick={()=>handlePageChange(Pages.Create_User)}>Create User</button>
            <button onClick={()=>handlePageChange(Pages.Create_Program)}>Create Program</button>
        </Fragment>
    );
}

export default AdminPlayground;