import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import axios from "axios";
import "./../../../../../../css/Icons.css"
import {RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import PersonalInformationDetails from "../../../../../../classes/PersonalInformationDetails";

function Holds(props:any) {

    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [holds, setHolds] = useState<any[]>();
    const [personalInformation, setPersonalInformation] = useState<PersonalInformationDetails>();

    useEffect(() => {
        requestUserPersonalInformation().then(r=>console.log("Personal Info request completed."));
        requestActiveHolds().then(r=>console.log("Holds request completed"));
    }, [userID])

    async function requestActiveHolds() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getHoldsByStudentID",
                id: userID
            }
        }).then(res => {
            let {error, holds} = res.data;
            setHolds(holds);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestUserPersonalInformation() {
        axios.get(process.env['REACT_APP_API_USER'] as string, {
            params: {
                func: "standard",
                uid: userID
            }
        }).then(res => {
            setPersonalInformation(new PersonalInformationDetails(res.data));
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    return (
        <Fragment>
            <div style={{margin:32}}>
                <div>
                    <div style={{fontSize: 32, fontWeight:"bold"}}>Student Holds</div>
                    <div style={{fontSize: 25, fontWeight:"bold", textAlign:"left", paddingLeft: 16}}>{personalInformation?.info.FirstN} {personalInformation?.info.LastN}</div>
                </div>
                <div className={'div-table'}>
                    <div className={'div-table-header'} style={{display:"flex"}}>
                        <div className={'div-table-col'}></div>
                        <div className={'div-table-col'}><label>Name</label></div>
                        <div className={'div-table-col'}><label>Description</label></div>
                        <div className={'div-table-col'}><label>Issue Date</label></div>
                    </div>
                    {
                        holds?.map((h:any) => (
                            <div className={'div-table-row'} style={{display:"flex", borderStyle:"solid", borderWidth:2, borderColor:"#D14D31"}}>
                                <div className={'div-table-col'}><div className={'icon-wrapper'}><div className={'icon-error'}></div></div></div>
                                <div className={'div-table-col'}><label style={{color:"#D14D31", fontWeight:"bold"}}>{h.Name}</label></div>
                                <div className={'div-table-col'}><label>{h.Description}</label></div>
                                <div className={'div-table-col'}><label>{h.Date}</label></div>
                            </div>
                        ))
                    }
                </div>
                <div style={{padding:16}}>
                    <div style={{color:"#D14D31", fontSize: 20, fontWeight:"bold", textAlign:"left"}}>Please note:</div>
                    <div style={{fontSize: 16, fontWeight:"bold", textAlign:"left", paddingLeft: 16}}>Any active Holds on your account, listed above, must be resolved before you may partake in registration.</div>
                </div>
            </div>
        </Fragment>
    );

}

export default Holds;