import React, {Fragment, useState} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import CourseCatalog from "../../catalog/CourseCatalog";
import {useNavigate} from "react-router-dom";
import {shouldSkipGeneratingVar} from "@mui/material";
import MasterSchedule from "../../MasterSchedule";

function GeneralAcademics() {

    enum Pages {
        Home,
        Catalog,
        MasterSchedule
    }
    const [page, setPage] = useState(Pages.Home);

    const handlePageChange = (event:any, newPage:number) => {
        event.preventDefault();
        setPage(newPage);
    }

    function displayHome() {
        return (
            <Fragment>
                <div onClick={(event)=>handlePageChange(event, Pages.Catalog)}>Press for catalog</div>
                <div onClick={(event)=>handlePageChange(event, Pages.MasterSchedule)}>Press for schedule</div>
            </Fragment>
        );
    }

    function displayCatalog() {
        return (
            <Fragment>
                <CourseCatalog/>
            </Fragment>
        );
    }

    function displayMasterSchedule() {
        return (
            <Fragment>
                <MasterSchedule/>
            </Fragment>
        );
    }

    function displayPages() {
        switch(page) {
            case Pages.Catalog: {
                return displayCatalog()
            }
            case Pages.MasterSchedule: {
                return displayMasterSchedule()
            }
            default: {
                return displayHome()
            }
        }
    }

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/academics", "/about", "/login"]}
                               names={["Home", "Academics", "About", "Login"]}/>
                <div className={'main'}>
                    <div className={'main-header'}>
                    <div className={'main-body'}>
                        <div className={'inner-body'}>
                            <div className={'inner-body-constraints'}>
                                <div style={{margin:32}}>
                                    {page!==Pages.Home ?
                                        <div style={{width:"100%", display:"flex"}}>
                                            <div>
                                                <button className={'page-button'}  style={{marginLeft:0, marginRight:"auto"}} onClick={(event)=>handlePageChange(event, Pages.Home)}>Back</button>
                                            </div>
                                        </div>
                                        :<Fragment/>}
                                    {displayPages()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </Fragment>
    );
}

export default GeneralAcademics;