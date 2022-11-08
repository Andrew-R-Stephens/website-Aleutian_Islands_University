import React, {Fragment} from 'react';
import HomeNavBanner from "../../HomeNavBanner";

function ErrorPage() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about", "/login"]}
                               names={["Home", "Academics", "About", "Login"]}/>

                <h3>Error 404: Page not found.</h3>
            </div>
        </Fragment>
    );
}

export default ErrorPage;