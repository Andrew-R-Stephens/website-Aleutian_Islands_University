import {Fragment} from "react";
import CreateCourse from "../components/CreateCourse";
import CreateDepartment from "../components/CreateDepartment";
import CreateCourseSection from "../components/CreateCourseSection";
import CreateUser from "../components/CreateUser";
import CreateProgram from "../components/CreateProgram";

function AdminPlayground() {
    return (
        <Fragment>
            {/*<CreateCourse/>

            <CreateDepartment/>

            <CreateCourseSection/>

            <CreateUser/>
*/}
            <CreateProgram/>
        </Fragment>
    );
}

export default AdminPlayground;