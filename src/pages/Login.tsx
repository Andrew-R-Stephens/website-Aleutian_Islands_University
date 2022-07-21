import React, {Fragment} from 'react';
import LoginForm from "../components/LoginForm";
import HomeNavBanner from "../components/HomeNavBanner";
function Login() {

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>
                <div className={'main'}>
                    <div className={'main-header'}>
                    </div>
                    <div className={'main-body'}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'}>
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;