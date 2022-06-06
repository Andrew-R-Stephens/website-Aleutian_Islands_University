import './AppImageBanner.css'

import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

    function AppImageBanner() {
        return (
            <Fragment>
                <img className='bg' src = "https://www.oldwestbury.edu/themes/custom/de_theme/logo.svg" alt={"Oops!"}/>
            </Fragment>
    );
}

export default AppImageBanner;