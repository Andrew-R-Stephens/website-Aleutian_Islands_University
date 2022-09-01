import React, {Fragment, useEffect, useState} from 'react';
import LoginForm from "../components/LoginForm";
import HomeNavBanner from "../components/HomeNavBanner";
import {useUserAuthStore} from "../stores/AuthUserStore";
function Login() {

    const userStoreID = useUserAuthStore((state:any) => state.userID);
    const setUserStoreID = useUserAuthStore((state:any) => state.setUserID);

    const [userID, setUserID] = useState(userStoreID);

    useEffect(() => {
        setUserStoreID(0);
        setUserID(0);
        console.log(userID, userStoreID);
    }, [userID])

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