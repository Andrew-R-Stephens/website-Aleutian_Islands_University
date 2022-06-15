import React, {Fragment} from 'react';
import LoginForm from "../components/LoginForm";
import HomeNavBanner from "../components/HomeNavBanner";

function Login() {

    return (
        <Fragment>
            <body className={'main-content'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>

                <LoginForm/>
            </body>
        </Fragment>
    );
}

export default Login;