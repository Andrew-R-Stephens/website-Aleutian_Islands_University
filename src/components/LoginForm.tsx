import React, {Fragment, useEffect, useState} from 'react';
import '../css/LoginForm.css';
import '../css/LoginTable.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../stores/user-store';
import {AuthRole, RoleAuthStore, UserAuthStore} from "../stores/AuthUserStore";
import {fail} from "assert";

function LoginForm() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const roleStoreID = RoleAuthStore((state:any) => state.authRole);
    const setUserStoreID = UserAuthStore((state:any) => state.setUserID);
    const invalidateRole = RoleAuthStore((state:any) => state.invalidateRole);

    const [userID, setUserID] = useState('0');
    const [userRole, setUserRole] = useState('0');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [failedAttemptCount, setFailedAttempts] = useState(0);

    const navigate = useNavigate();

    const handleEmailChange = (event:any) => {
        event.preventDefault();
        setUserID('0');
        setEmail(event.target.value);
    };

    const handlePassChange = (event:any) => {
        event.preventDefault();
        setUserID('0');
        setPass(event.target.value);
    }

    function handleSubmit(event:any) {

        axios.get(process.env['REACT_APP_API_AUTH'] as string, {
            params: {
                func: "auth",
                email,
                pass
            }
        }).then(res => {
            let {uid, role} = res.data;

            setUserID(uid);
            console.log("Response:",uid);

            if(uid <= '0') {
                setUserRole(AuthRole.Visitor);
                setFailedAttempts(failedAttemptCount +1);
            } else {
                setUserRole(role);

                setUserStoreID(uid);
                invalidateRole(role);

                navigate("/u");
            }
        }).catch(function(err) {
            console.log(err.message);
        })

        event.preventDefault();
    }

    function renderError() {
        var errMsg = "";

        if(userID === '-1'){

            if(failedAttemptCount >= 3) {
                errMsg = "Too many failed attempts. Please try again later."
            }
            else if((email.length == 0 || pass.length == 0)) {
                errMsg = "Please fill out the credentials.";
            } else {
                errMsg = "Invalid email and password combination.";
            }
        }

        return errMsg;
    }

    return (
        <Fragment>
            <div>
                <form onSubmit={event => handleSubmit(event)}>
                    <fieldset disabled={failedAttemptCount >= 5} className = "login">
                        <table>
                            <tbody>
                                 <tr>
                                    <td colSpan={2}>
                                        <label className={'authError'}>
                                            { renderError() }
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Email: </label></td>
                                    <td><input className={'inputText'}
                                               type={"email"}
                                               autoComplete={'on'}
                                               value={email}
                                               onChange={handleEmailChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Password: </label></td>
                                    <td><input className={'inputText'}
                                               type={"password"}
                                               autoComplete={'on'}
                                               value={pass}
                                               onChange={handlePassChange}/>
                                    </td>
                                </tr>
                                <tr className={'submit'}>
                                    <td colSpan={2}></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={'submit'} style={{display:"inline-block", width:"100%", marginRight:"auto", marginLeft:"auto"}}>
                            <div style={{marginRight:"auto", marginLeft:"auto"}}>
                                <input type={"submit"} value={"Login"}/>
                            </div>
                            <div style={{fontSize:13, marginTop:32, float:"right"}}>
                                <label className={'clickable-text'}>Can't sign in?</label>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </Fragment>
    );
}

export default LoginForm;
