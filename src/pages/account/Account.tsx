import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import HomeNavBanner from "../../components/HomeNavBanner";
import SideBanner from "../../components/SideBanner";
import './Account.css';
import HideBar from "../../components/HideBar";
import RequestTable from "../../components/RequestTable";
import "../../components/RequestTable.css";
import axios from "axios";

interface StateType {
    id: any
}

function Account() {

    const useLoc = useLocation() as any;
    const state:StateType = useLoc.state;

    const [userID, setID] = useState();
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [email, setEmail] = useState();
    const [pageIndex, setPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(!state)
            navigate('/login');

        initUserData().then(res => console.log('Axios request succeeded.'));
    }, []);

    const pages:any = [<RequestTable/>, <HideBar/>];

    async function initUserData() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "standard",
                id : userID
            }
        }).then(res => {

            const {firstName, lastName, email} = res.data;

            setID(state.id);
            setFName(firstName);
            setLName(lastName);
            setEmail(email);

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={[]} names={[]}/>
                <div className={'main-body'}>
                    <SideBanner
                                urls={["/account", "profile", "student", "/login"]}
                                names={["Account", "Profile", "Student", "Logout"]}
                                classes={['item', 'item', 'item', 'item-last']}
                                roles={['active', 'inactive', 'inactive', 'inactive']}
                                id={userID}>
                    </SideBanner>
                    <div className = {'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <button onClick={() => setPage(pageIndex + 1)}>Change content</button>
                            {pages[pageIndex]}
                            <br/>
                            <div className={'plain'}>
                                <table><tbody>
                                    <tr><td><b>Name:</b></td><td>{firstName} {lastName}</td></tr>
                                    <tr><td><b>ID:</b></td><td>{userID}</td></tr>
                                    <tr><td><b>Email:</b></td><td>{email}</td></tr>
                                </tbody></table>
                            </div>
                            <br/>
                            <label><b>To Do:</b></label>
                            <ul style={{margin: "auto", maxWidth: 1080, textAlign: 'start'}}>
                                <li>Add welcome message</li>
                                <li>Add profile image on left (simple default profile pic logo with wolf  watermark)</li>
                                <li>Display data about semester</li>
                                <li>Display hyperlinks for registration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Account;