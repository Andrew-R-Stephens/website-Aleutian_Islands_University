import React, {Fragment, useState} from 'react';
import '../css/LoginForm.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import '../facades/user-store';
import {useUserAuthStore} from "../facades/AuthUserStore";

function LoginForm() {

    const userStoreID = useUserAuthStore((state:any) => state.userID);
    const setUserStoreID = useUserAuthStore((state:any) => state.setUserID);

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

    const handleSubmit = (event:any) => {
        axios.get(process.env['REACT_APP_API_AUTH'] as string, {
            params: {
                func: "auth",
                email,
                pass
            }
        }).then(res => {
                const {id} = res.data;
                setResponse(id);
                if(id > ('0')) {
                    //window.location.replace('./manifest.json')
                    setUserStoreID(id);
                    navigate("/account", {state: {id}})
                } else {
                    alert("Invalid email/password combination.");
                    setEmail("");
                    setPass("");
                    setResponse("-1");
                }
            }).catch(function(err) {
            console.log(err.message);
        })

        event.preventDefault();
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
