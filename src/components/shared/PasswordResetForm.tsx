import React, {Fragment, useState} from 'react';
import '../../css/LoginForm.css';
import axios from "axios";

function PasswordResetForm(props:any) {

    const [email, setEmail] = useState<any>();
    const [status, setStatus] = useState<any>();

    const {handlePageChange} = props;

    const handleEmailChange = (event:any) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        if(email?.length > 0) {
            requestPasswordReset().then(r => console.log(r))
            //console.log("sending")
        }
    }

    async function requestPasswordReset() {
        console.log("Attemping reset")
        axios.get(process.env['REACT_APP_API_USER'] as string, {
            params: {
                func: "sendPasswordResetRequest",
                sender: "noreply.aiu@owsysdb.com",
                subject: "Password Reset Request",
                message: "Please reset the password for " + email,
                email: email
            }
        }).then(res => {
            console.log(res);
            const {status} = res;
            setStatus(status);
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
                        <div>You will receive a response if the email address supplied exists.</div>
                    </div>
                </div>
        }
        return successMsg;
    }

    return (
        <Fragment>
            <div style={{marginBottom:8}}>
                <label style={{fontWeight:"bold", fontSize:14}}>Password Reset Request Form</label>
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
                            <div className={'div-login-label'}>Email: </div>
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
                    <div className={'submit'} style={{display:"inline-block", width:"100%", marginRight:"auto", marginLeft:"auto"}}>
                        <div style={{marginRight:"auto", marginLeft:"auto"}}>
                            <input type={"submit"} value={"Confirm"}/>
                            <input style={{marginLeft:16}} type={"button"} value={"Cancel"} onClick={handlePageChange}/>
                        </div>
                    </div>
                </fieldset>

            </form>

        </Fragment>
    );
}

export default PasswordResetForm;
