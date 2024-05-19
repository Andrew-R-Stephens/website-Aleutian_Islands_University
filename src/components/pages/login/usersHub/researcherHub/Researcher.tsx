import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {UserAuthStore} from "../../../../../stores/AuthUserStore";
import ResearcherConsoleHome from "./pages/ResearcherConsoleHome";

function Researcher() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(userStoreID);

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <div className={'main-container'}>
                <div className={'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <ResearcherConsoleHome/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Researcher;