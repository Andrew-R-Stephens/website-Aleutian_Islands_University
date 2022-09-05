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
    const [email, setEmail] = useState('');//useState("asteph11@oldwestbury.edu");
    const [pass, setPass] = useState('');//useState("burgers");
    const [response, setResponse] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    };

    const handlePassChange = (event:any) => {
        setPass(event.target.value);
    }

    const handleSubmit = () => {
        axios.get(process.env['REACT_APP_API_AUTH'] as string, {
            params: {
                func: "auth",
                email,
                pass
            }
        }).then(res => {
            let {id, role} = res.data;
            role = '1';

            if(id <= '0') {
                alert("Invalid email/password combination.");
                setUserID('');
                setUserRole(AuthRole.Visitor)
                setEmail("");
                setPass("");
                setResponse("-1");
            } else {
                setUserID(id);
                setUserStoreID(id);

                setUserRole(role);
                invalidateRole(role);

                navigate("/u");
            }
        }).catch(function(err) {
        console.log(err.message);
        })

    }

    return (
        <Fragment>
            <div>
                <form onSubmit={handleSubmit}>
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
                            <tr className={'submit'}><td colSpan={2}><input type = "submit" value={"Login"}/></td></tr>
                        </tbody>
                    </table>
                </form>
                <p color={'333333'}>{response === '-1' ? <em>Hint
                    <br/><b>E:</b> asteph11@oldwestbury.edu
                    <br/><b>P:</b> burgers
                </em> : ""}</p>
            </div>
        </Fragment>
    );
}

export default LoginForm;
