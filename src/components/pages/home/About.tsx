import React, {Fragment} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import "./../../../css/PrimaryLayout.css";

function About() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about"]}
                               names={["Home", "Academics", "About"]}/>
                <div className={'main'}>
                    <div className={'main-body'} style={{backgroundColor:"#dfe5ec"}}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'}>
                                <div style={{width:"100%", height:"100%"}}>
                                    <div className={'img-graduation-class'}/>
                                </div>
                                <h1>Welcome to Aleutian Islands University</h1>
                                <h3>What is this website for?</h3>
                                <p>The B.S. in Computer and Information Science degree at SUNY Old Westbury
                                    requires extensive understanding of what it means to build a realistic website.</p>
                                <h3>Capstone requirements</h3>
                                <p>Development of a University website, complete with both
                                    Student, Faculty, Administrator, and Researcher features. Features must satisfy an
                                    exhaustive list of required use-cases.</p>
                                <h3>Understanding of Technologies</h3>
                                <div style={{'width': "fit-content", margin: "auto", display:"flex"}}>
                                    <ul style={{"listStyleType": "none", "margin": 0, "padding": 0, "overflow": "hidden",
                                        "textAlign": "left"}}>
                                        <li>Website build from scratch</li>
                                        <li>Front-end web development</li>
                                        <li>Back-end RESTful Api development</li>
                                        <li>Relational Database engineering</li>
                                        <li>AWS Cloud Computing</li>
                                        <li>Apache server maintenance</li>
                                        <li>Agile (Scrum) team management</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default About;