import React, {Fragment, useEffect, useState} from 'react';
import '../css/LoginForm.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../stores/user-store';
import {AuthRole, RoleAuthStore, UserAuthStore} from "../stores/AuthUserStore";

function LoginForm() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const roleStoreID = RoleAuthStore((state:any) => state.authRole);
    const setUserStoreID = UserAuthStore((state:any) => state.setUserID);
    const invalidateRole = RoleAuthStore((state:any) => state.invalidateRole);

    const [userID, setUserID] = useState('0');
    const [userRole, setUserRole] = useState('0');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event:any) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handlePassChange = (event:any) => {
        event.preventDefault();
        setPass(event.target.value);
    }

    function handleSubmit(event:any) {
        //console.log("Input:", email, pass);
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
                alert("Invalid email/password combination.");
                setUserRole(AuthRole.Visitor);
                setEmail("");
                setPass("");
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

    return (
        <Fragment>
            <div>
                <form onSubmit={event => handleSubmit(event)}>
                    <table className = "login">
                        <tbody>
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
                            <tr className={'submit'}><td colSpan={2}><input type={"submit"} value={"Login"}/></td></tr>
                        </tbody>
                    </table>
                </form>
                {userID === '-1' ?
                    <table className = "default">
                        <tbody>
                            <tr>
                                <td align={'center'} colSpan={3} style={{paddingBottom:10, fontSize: 24}}><label><b>Having trouble logging in?</b></label></td>
                            </tr>
                            <tr>
                                <td align={'left'}><label><b>Email</b></label></td>
                                <td align={'center'} style={{paddingRight: 16, paddingBottom: 8}}><label><b>:</b></label></td>
                                <td align={'left'}>as****@aiuniversity.edu</td>
                            </tr>
                            <tr>
                                <td align={'left'}><label><b>Password</b></label></td>
                                <td align={'center'} style={{paddingRight: 16}}><label><b>:</b></label></td>
                                <td align={'left'}>hoop***</td>
                            </tr>
                        </tbody>
                    </table>
                    : ""}
            </div>
        </Fragment>
    );
}

export default LoginForm;
