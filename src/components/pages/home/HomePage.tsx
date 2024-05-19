import React, {Fragment, useEffect} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import '../../../css/VideoPlayer.css'
import '../../../css/PrimaryLayout.css';

function HomePage() {

    useEffect(() => {
        const banner_video = document.getElementById('banner-video');
        banner_video?.addEventListener('load', ()=> {
            console.log("Loaded")
        }, true)
        }
    )

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about"]}
                               names={["Home", "Academics", "About"]}/>
                <div className={'main'}>
                    <div className={'main-header'}>
                        <div className={'frame-outer'}>
                            <div className={'banner-video-wrapper'}>
                                <iframe className={'banner-video'} id={'banner-video'}
                                        src="https://player.vimeo.com/video/659049579?controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1"
                                        allow="autoplay;"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className={'banner-logo-after'}/>
                    <div className={'main-body'}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'} style={{maxWidth:"960px", display:"inline-block", margin:"clamp(32px, 1svmin, 64px)", textAlign:"start"}}>
                                <h1>Welcome to Aleutian Islands University</h1>
                                <h3>What is Aleutian Island University?</h3>
                                <p>To graduate from SUNY Old Westbury with a Bachelor's in Computer and Information
                                    Science, all students are tasked to complete a massive capstone project. The goal of
                                    each team, which consists of three people with various levels of understanding, was
                                    to use three (3) months of available time to design and implement a vast list of
                                    functional requirements. Nothing else was provided to us, and the website was to be
                                    developed from the ground, up.</p>
                                <p>Ultimately, the development of AUI required extensive understanding of what it means
                                    to build a realistic website. Requirements included, but were not limited to hosting
                                    and assembling a custom server, designing and developing a functional front end,
                                    designing a large dynamic schema with a database filled with real data, develop a
                                    functional API, and follow a rolling list of client specifications in order to
                                    fulfill real (and extensive) user expectations.</p>
                                <p>Please keep in mind that all data was created with dynamic use in mind. No data is
                                    hard coded. All data was meticulously built on a per-user, per use-case basis, and
                                    with the future in mind. We were, however, asked to constrain usability to the years
                                    of 2022 and 2023 as the future years would not be needed post-graduation.</p>
                                <h3>Capstone requirements</h3>
                                <p>Development of a University website, complete with both
                                    Student, Faculty, Administrator, and Researcher features. Features must satisfy an
                                    exhaustive list of required use-cases.</p>
                                <h3>Technologies</h3>
                                <ul style={{listStyle:"inside" ,margin: 0, padding: 0, overflow: "hidden", textAlign: "left"}}>
                                    <li>Front-end web development <em>(React)</em></li>
                                    <li>Back-end RESTful API development <em>(PHP)</em></li>
                                    <li>Relational Database engineering <em>(MySQL)</em></li>
                                    <li>AWS Cloud Computing <em>(EC2, Route53, ElasticIP)</em></li>
                                    <li>Server creation and maintenance <em>(Apache2)</em></li>
                                    <li>Agile team management <em>(Scrum)</em></li>
                                    <li>Documentation <em>(SRS, Design, User Manual)</em></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;