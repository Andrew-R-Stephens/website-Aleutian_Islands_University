import React, {Fragment} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import CourseCatalog from "../../catalog/CourseCatalog";

function GeneralAcademics() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about", "/login"]}
                               names={["Home", "Academics", "About", "Login"]}/>
                <div className={'main'}>
                    <div className={'main-header'}>
                    <div className={'main-body'}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'}>
                                <div style={{margin:32}}>
                                    <CourseCatalog/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </Fragment>
    );
}

export default GeneralAcademics;