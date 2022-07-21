import React, {Fragment, useState} from 'react';
import '../components/LoginForm.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../facades/user-store';

function LoginForm() {

    const [email, setEmail] = useState('');//useState("asteph11@oldwestbury.edu");
    const [pass, setPass] = useState('');//useState("burgers");
    const [response, setResponse] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePassChange = (event) => {
        setPass(event.target.value);
    }

    const handleSubmit = async (event) => {
        await axios.get(process.env.REACT_APP_API_AUTH, {
            params: {
                func: "auth",
                email,
                pass
            }
        }).then(res => {
                const {id} = res.data;
                setResponse(id);
                if(id > ('0')) {
                    navigate("/account", {state: {id}})
                } else {
                    alert("Invalid email/password combination.");
                    setEmail("");
                    setPass("");
                    setResponse("");
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
                <p>{response}</p>
            </div>
        </Fragment>
    );
}

export default LoginForm;
