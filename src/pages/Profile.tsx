import React, {Fragment} from 'react';
import '../components/App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function Profile(props:any) {

    const {userID} = props;

    return (
        <Fragment>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>
            <p>This is the Profile Page</p>
        </Fragment>
    );
}

export default Profile;