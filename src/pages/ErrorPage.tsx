import React, {Fragment} from 'react';
import HomeNavBanner from "../components/HomeNavBanner";

function ErrorPage() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>

                <h3>Error 404: Page not found.</h3>
            </div>
        </Fragment>
    );
}

export default ErrorPage;