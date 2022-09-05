import React, {Fragment, useEffect} from 'react';
import LoginForm from "../../LoginForm";
import HomeNavBanner from "../../HomeNavBanner";
import {RoleAuthStore, UserAuthStore} from "../../../stores/AuthUserStore";

function Login() {

    const setUserDefault = UserAuthStore((state:any) => state.setDefaults);
    const setRoleDefault = RoleAuthStore((state:any) => state.setDefaultRole);

    useEffect(() => {
        setUserDefault();
        setRoleDefault();
    }, [])

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