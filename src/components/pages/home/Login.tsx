import React, {Fragment, useEffect, useState} from 'react';
import LoginForm from "../../LoginForm";
import HomeNavBanner from "../../HomeNavBanner";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../stores/AuthUserStore";
import axios from "axios";

function Login() {

    window.sessionStorage.removeItem("lastPage");
    const setUserDefault = UserAuthStore((state:any) => state.setDefaults);
    const setRoleDefault = RoleAuthStore((state:any) => state.setDefaultRole);

    useEffect(() => {
        setUserDefault();
        setRoleDefault();
    }, [])

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about", "/login"]}
                               names={["Home", "Academics", "About", "Login"]}/>
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