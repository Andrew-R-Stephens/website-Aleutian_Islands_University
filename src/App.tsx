import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import AppNavBanner from "./AppNavBanner";
import AppImageBanner from "./AppImageBanner";

function App() {
  return (
      <Fragment>
          <div className={"App"} >
              <AppImageBanner/>
              <AppNavBanner/>
          </div>
      </Fragment>
    /*<div className="App">
      <header>
        <Router>
            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/about"} element={<About/>} />
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/profile"} element={<Profile/>} />
                <Route path={"/!*"} element={<ErrorPage/>} />
            </Routes>
        </Router>
      </header>
    </div>*/
  );
}

export default App;
