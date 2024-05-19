import React, {Fragment, useState} from 'react';
import '../../css/LoginForm.css';
import axios from "axios";

function AdminPasswordReset(props:any) {

    const [email, setEmail] = useState<any>();
    const [status, setStatus] = useState<any>();
    const [newP, setNewP] = useState('');

    const {handlePageChange} = props;

    const handleChangeNewPassword = (event:any) => {
        event.preventDefault();
        setNewP(event.target.value);
    }

    const handleEmailChange = (event:any) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        requestUpdatePassword().then(r=>console.log("Password request completed."));
    }

    async function requestUpdatePassword() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "changePassword_Admin",
                email,
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

    function submitError() {
        let errMsg = "";

        if(email?.length == 0) {
            errMsg = "Please fill out the credentials.";
        }
        return errMsg;
    }

    function submitSuccess():any {
        let successMsg = <Fragment/>;

        if(status == 200) {
            successMsg =
                <div style={{display:"flex"}}>
                    <div style={{display:"block", wordBreak: "break-all", wordWrap: "break-word",
                        textOverflow:"ellipsis", whiteSpace:"pre-wrap"}}
                           className={'authSuccess'}>
                        <div>A request has been sent.</div>
                        <div>The user will receive an email with your newly provided password.</div>
                    </div>
                </div>
        }
        return successMsg;
    }

    return (
        <Fragment>
            <div style={{display:"inline-block", margin:32}}>
                <div style={{marginBottom:8}}>
                    <label style={{fontWeight:"bold", fontSize:32}}>Password Reset Request Form</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div style={{marginBottom:8}}>
                            <label className={'authError'}>
                                { submitError() }
                            </label>
                            { submitSuccess() }
                        </div>
                        <div className={'div-login-row'}>
                            <div className={'div-login-col'}>
                                <div className={'div-login-label'}>Requested Email: </div>
                            </div>
                            <div className={'div-login-col'}>
                                <input className={'inputText'}
                                    type={"email"}
                                    autoComplete={'on'}
                                    value={email}
                                    onChange={handleEmailChange}
                                    onClick={handleEmailChange}
                                />
                            </div>
                        </div>
                        <div className={'div-login-row'}>
                            <div className={'div-login-col'}>
                                <div className={'div-login-label'}>New Password: </div>
                            </div>
                            <div className={'div-login-col'}>
                                <input className={'inputText'}
                                       type={"text"}
                                       autoComplete={'on'}
                                       value={newP}
                                       pattern={'[A-z0-9 ]{8,16}'}
                                       maxLength={16}
                                       onChange={handleChangeNewPassword}
                                />
                            </div>
                        </div>
                        <div className={'submit'} style={{display:"inline-block", width:"100%", marginRight:"auto", marginLeft:"auto"}}>
                            <div style={{marginRight:"auto", marginLeft:"auto"}}>
                                <input type={"submit"} value={"Confirm"}/>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </div>
        </Fragment>
    );
}

export default AdminPasswordReset;
