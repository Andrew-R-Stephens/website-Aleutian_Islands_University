import React from 'react';
import HomeNavBanner from "../components/HomeNavBanner";

function About() {
    return (
        <header>
            <body className={'main-content'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>

                <p>This is the About page.</p>
            </body>
        </header>
    );
}

export default About;