import React, {Fragment, useEffect, useState} from 'react';
import HomeNavBanner from "../../../../HomeNavBanner";
import SideBanner from "../../../../SideBanner";
import CatalogDisplayCourses from "../../../../catalog/CatalogDisplayCourses";
import {useNavigate} from "react-router-dom";
import {UserAuthStore} from "../../../../../stores/AuthUserStore";
import AdminConsoleHome from "./pages/AdminConsoleHome";

function Administrator() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(userStoreID);

    const navigate = useNavigate();

    return (
        <Fragment>
            <div className={'main-container'}>
                <div className={'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <AdminConsoleHome/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Administrator;