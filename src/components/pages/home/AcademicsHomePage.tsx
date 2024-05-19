import React, {Fragment, useState} from 'react';
import HomeNavBanner from "../../shared/HomeNavBanner";
import CourseCatalog from "../../catalog/CourseCatalog";
import MasterSchedule from "../../shared/MasterSchedule";

function AcademicsHomePage() {

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
            <div style={{width:"100%", margin:"auto", display:"inline-flex"}}>
                <div className='label-icon-container'
                     onClick={(event)=>handlePageChange(event, Pages.Catalog)}>
                    <div style={{width:"100%", margin:"auto"}}>
                        <div className={'icon-catalog-courses icon-catalog'}/>
                    </div>
                    <div id={'label-wrapper'} style={{width:"100%", margin:"auto"}}>
                        <label>Catalog</label>
                    </div>
                </div>
                <div className='label-icon-container'
                     onClick={(event)=>handlePageChange(event, Pages.MasterSchedule)}>
                    <div style={{width:"100%", margin:"auto"}}>
                        <div className={'icon-catalog-schedule icon-catalog'}/>
                    </div>
                    <div id={'label-wrapper'} style={{width:"100%", margin:"auto"}}>
                        <label>Schedule</label>
                    </div>
                </div>
            </div>
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
                <HomeNavBanner urls={["/", "/academics", "/about"]}
                               names={["Home", "Academics", "About"]}/>
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

export default AcademicsHomePage;