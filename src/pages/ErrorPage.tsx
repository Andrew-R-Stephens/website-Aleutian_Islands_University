import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function ErrorPage() {
    return (
        <div><h3>Error 404: Page not found.</h3></div>
    );
}

export default ErrorPage;