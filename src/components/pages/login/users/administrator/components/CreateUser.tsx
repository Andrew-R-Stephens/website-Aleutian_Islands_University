import React, {Fragment, useState} from 'react';
import {Roles} from "../../../../../../stores/AuthUserStore";
import CreateUserStudent from "./createuser/CreateUserStudent";
import CreateUserFaculty from "./createuser/CreateUserFaculty";
import CreateUserResearcher from "./createuser/CreateUserResearcher";
import CreateUserAdministrator from "./createuser/CreateUserAdministrator";

function CreateUser() {

    const [page, setPage] = useState<number>(-1);

    function displayPage() {
        switch(page) {
            case Roles.Student: {
                return <CreateUserStudent
                    changePage={()=>setPage(-1)}
                    createUser={(obj:{})=>requestCreateUser(obj)}/>
            }
            case Roles.Faculty: {
                return <CreateUserFaculty
                    changePage={()=>setPage(-1)}
                    createUser={(obj:{})=>requestCreateUser(obj)}/>
            }
            case Roles.Researcher: {
                return <CreateUserResearcher
                    changePage={()=>setPage(-1)}
                    createUser={(obj:{})=>requestCreateUser(obj)}/>
            }
            case Roles.Administrator: {
                return <CreateUserAdministrator
                    changePage={()=>setPage(-1)}
                    createUser={(obj:{})=>requestCreateUser(obj)}/>
            }
            default: {
                return displayDefault();
            }
        }
    }

    function requestCreateUser(params: {}) {
        //todo: add all-encompassing api call *here*
        console.log(params);
    }

    function displayDefault() {
        return (
            <Fragment>
                <button onClick={()=>setPage(Roles.Student)}>Create Student</button>
                <button onClick={()=>setPage(Roles.Faculty)}>Create Faculty</button>
                <button onClick={()=>setPage(Roles.Researcher)}>Create Researcher</button>
                <button onClick={()=>setPage(Roles.Administrator)}>Create Administrator</button>
            </Fragment>
        )
    }

    return(
        <Fragment>
            {displayPage()}
        </Fragment>
    )
}

export default CreateUser;