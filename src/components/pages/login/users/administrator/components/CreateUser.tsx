import React, {Fragment, useState} from 'react';
import {Roles} from "../../../../../../stores/AuthUserStore";
import CreateUserStudent from "./createuser/CreateUserStudent";
import CreateUserFaculty from "./createuser/CreateUserFaculty";
import CreateUserResearcher from "./createuser/CreateUserResearcher";
import CreateUserAdministrator from "./createuser/CreateUserAdministrator";
import axios from "axios";

function CreateUser() {

    const [page, setPage] = useState<number>(-1);

    function displayPage() {
        switch(page) {
            case Roles.Student: {
                return <CreateUserStudent
                    changePage={()=>setPage(-1)}
                    createUser={requestCreateUser}/>
            }
            case Roles.Faculty: {
                return <CreateUserFaculty
                    changePage={()=>setPage(-1)}
                    createUser={requestCreateUser}/>
            }
            case Roles.Researcher: {
                return <CreateUserResearcher
                    changePage={()=>setPage(-1)}
                    createUser={requestCreateUser}/>
            }
            case Roles.Primary_Administrator: {
                return <CreateUserAdministrator
                    changePage={()=>setPage(-1)}
                    createUser={requestCreateUser}/>
            }
            default: {
                return displayDefault();
            }
        }
    }

    async function requestCreateUser(params: any) {
        console.log("Sent:", params);
        const {
            userType, subType=undefined, gradType=undefined, time=undefined,
            departmentID=undefined, timeslot=undefined, rank=undefined,
            password,
            ssn, fName, lName, phone, gender, honorific, birthdate,
            houseNum, street, city, state, country, zip
        } = params;

        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "setNewUser",
                userType: userType,
                subType: subType,
                gradType: gradType,
                time: time,
                departmentID: departmentID,
                timeslot: timeslot,
                rank: rank,
                password: password,
                ssn: ssn,
                fName: fName,
                lName: lName,
                pNum: phone,
                gender: gender,
                honor: honorific,
                bdate: birthdate,
                addrHN: houseNum,
                addrStr: street,
                addrCi: city,
                addSta: state,
                addrCo: country,
                addrZ: zip
            }
        }).then(res => {
            alert(res);
        }).catch(function(err) {
            console.log(err.message);
        })

    }

    function displayDefault() {
        return (
            <Fragment>
                <button onClick={()=>setPage(Roles.Student)}>Create Student</button>
                <button onClick={()=>setPage(Roles.Faculty)}>Create Faculty</button>
                <button onClick={()=>setPage(Roles.Researcher)}>Create Researcher</button>
                <button onClick={()=>setPage(Roles.Primary_Administrator)}>Create Administrator</button>
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