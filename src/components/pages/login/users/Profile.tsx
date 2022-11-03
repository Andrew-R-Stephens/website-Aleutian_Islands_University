import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import HomeNavBanner from "../../../HomeNavBanner";
import SideBanner from "../../../SideBanner";
import {UserAuthStore} from "../../../../stores/AuthUserStore";

/**
 * The public, outwards-facing data for a specific user.
 * @param props
 * @constructor
 */
function Profile(props:any) {

    const { sideBanner = <SideBanner/>} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(userStoreID);

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={[]}
                               names={[]}/>
                {sideBanner}
                <div className={'main'}>
                    <div className={'main-header'}>
                        <div className={'frame-outer'}>
                            <iframe src="https://player.vimeo.com/video/659049579?h=ce8c0317ac&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1"
                                    allow="autoplay; fullscreen; picture-in-picture;" ></iframe>
                        </div>
                    </div>
                    <div className={'main-body'}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'}>
                                <p>Profile ID to display information for: {userID}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;