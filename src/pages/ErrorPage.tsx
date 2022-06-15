import React, {Fragment} from 'react';
import HomeNavBanner from "../components/HomeNavBanner";

function ErrorPage() {
    return (
        <Fragment>
            <body className={'main-content'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>

                <h3>Error 404: Page not found.</h3>
            </body>
        </Fragment>
    );
}

export default ErrorPage;