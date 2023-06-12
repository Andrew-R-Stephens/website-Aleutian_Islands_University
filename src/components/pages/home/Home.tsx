import React, {Fragment} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import '../../../css/VideoPlayer.css'
import '../../../css/PrimaryLayout.css';

function Home() {

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about", "/login"]}
                               names={["Home", "Academics", "About", "Login"]}/>
                <div className={'main'}>
                    <div className={'main-header'}>
                        <div className={'frame-outer'}>
                            <div className={'banner-video-wrapper'}>
                                <iframe className={'banner-video'}
                                        src="https://player.vimeo.com/video/659049579?controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1"
                                        allow="autoplay;" ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className={'main-body'} style={{backgroundColor:"#dfe5ec"}}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;