import React, {Component, Fragment} from 'react';
import '../components/LoginForm.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            pass: '',
            response: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePassChange(event) {
        this.setState({
            pass: event.target.value
        });
    }

    handleSubmit(event) {
        const {email, pass} = this.state;
        //process.env.REACT_APP_LOCAL_API_URL"+"
        /*axios.get(process.env.REACT_APP_API_URL + "/login.php", {
                params: {
                    func: 'auth',
                    email: {email},
                    pass: {pass}
                }
            }).then(response => {
                /!*if(response.request === true) {
                    const navigate = useNavigate();
                    navigate("/Profile", );
                } else {*!/
                    this.setState({
                        email: '',
                        pass: '',
                        response: response.data + response.status + response.headers
                    });
                    alert("Incorrect username/password combination.");
                //}
            }).catch(function(err) {
            console.log(err);
        })
        */

        axios.get(process.env.REACT_APP_API_URL+"/login.php", {
            params: {
                func: "auth",
                email,
                pass
            }
        }).then(res => {
                const response = res.data;
                if(response !== 0) {
                    const navigate = useNavigate();
                    navigate("/profile");
                }
                //this.setState({ response });
            }).catch(function(err) {
            console.log(err.message);
        })

        event.preventDefault();
    }

    render() {
        return (
            <Fragment>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <table className = "login">
                            <tbody>
                                <tr>
                                    <td><label>Email: </label></td>
                                    <td><input type={"email"}
                                               value={this.state.email}
                                               onChange={this.handleEmailChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Password: </label></td>
                                    <td><input type={"password"}
                                               value={this.state.pass}
                                               onChange={this.handlePassChange}/>
                                    </td>
                                </tr>
                                <tr className={'submit'}><td colSpan={2}><input type = "submit" value={"Login"}/></td></tr>
                            </tbody>
                        </table>
                    </form>
                    <p>{this.state.response}</p>
                </div>
            </Fragment>
        );
    }
}

export default LoginForm;
