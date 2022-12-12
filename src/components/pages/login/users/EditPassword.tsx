import React, {Fragment, useEffect, useState} from 'react';
import '../../../../css/DisplayInfo.css';
import axios from "axios";
import '../../../../stores/user-store';
import {RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";

function EditPassword(props:any) {

    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [currentP, setCurrentP] = useState('');
    const [newP, setNewP] = useState('');

    async function requestUpdatePassword() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "updatePassword",
                uid : userID,
                currentP,
                newP
            }
        }).then(res => {
            const{ERROR} = res.data;
            console.log(res.data)
            alert(ERROR?ERROR:"Password change successful.");
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangeCurrentPassword = (event:any) => {
        event.preventDefault();
        setCurrentP(event.target.value);
    }

    const handleChangeNewPassword = (event:any) => {
        event.preventDefault();
        setNewP(event.target.value);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        requestUpdatePassword().then(r=>console.log("Password request completed."));
    }

    function displayEditOptions() {
        return <Fragment>
            <h1>Change Password</h1>
            <div>
                <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                    <fieldset>
                        <div style={{display:"inline-block", textAlign:'left'}}>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Current Password:</label>
                                <input className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                       type={"text"}
                                       autoComplete={'on'}
                                       value={currentP}
                                       onChange={handleChangeCurrentPassword}
                                       pattern={'[A-z0-9 ]{8,16}'}
                                       maxLength={16}
                                />
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>New Password:</label>
                                <input className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} type={'text'} value={newP} onChange={handleChangeNewPassword}/>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", margin:16}}>
                                <button className={'div-table-col'} type={"submit"}>Apply</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>

        </Fragment>
    }

    return (
        <Fragment>
            <div>
                {displayEditOptions()}
            </div>
        </Fragment>
    );
}

export default EditPassword;
