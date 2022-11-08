import React, {Fragment} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import CourseCatalog from "../../CourseCatalog";

function Academics() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about", "/login"]}
                               names={["Home", "Academics", "About", "Login"]}/>
                <div className={'main-header'}>

                </div>
                <div className={'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <div>
                                <CourseCatalog/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Academics;