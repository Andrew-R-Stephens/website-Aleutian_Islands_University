import React, {Fragment, useEffect, useState} from 'react';
import '../stores/user-store';
import "./../css/CourseCatalog.css"
import CatalogDisplayPrograms from "./CatalogDisplayPrograms";
import CatalogDisplayCourses from "./CatalogDisplayCourses";

function CourseCatalog() {

    enum CatalogPages {
        MainMenu = 0,
        ProgramsFilter = 1,
        CourseFilter = 2
    }
    const [catalogPage, setCatalogPage] = useState(CatalogPages.MainMenu);

    function handlePageChange(newPage:number) {
        setCatalogPage(newPage);
    }

    function renderPage() {
        switch(catalogPage) {
            case CatalogPages.ProgramsFilter:{
                return <CatalogDisplayPrograms parentPage={catalogPage}/>
            }
            case CatalogPages.CourseFilter:{
                return <CatalogDisplayCourses/>
            }
            default: {
                return <div><p>The world is your oyster.</p></div>
            }
        }
    }

    return (
        <Fragment>
            <div style={{margin: 16}}>
                <label className={'catalog-main-header'}>Course Catalog</label>
            </div>
            <div style={{marginBottom: 16}}>
                <div style={{marginTop: 32, display:"flex", width: "100%"}}>
                    <div className={catalogPage == CatalogPages.ProgramsFilter ? 'label-icon-container selected': 'label-icon-container'}
                        onClick={() => handlePageChange(CatalogPages.ProgramsFilter)}>
                        <div style={{width:"100%", margin:"auto"}}>
                            <div className={'icon-catalog-programs icon-catalog'}/>
                        </div>
                        <div id={'label-wrapper'} style={{width:"100%", margin:"auto"}}>
                            <label>Programs</label>
                        </div>
                    </div>
                    <div className={catalogPage == CatalogPages.CourseFilter ? 'label-icon-container selected': 'label-icon-container'}
                        onClick={() => handlePageChange(CatalogPages.CourseFilter)}>
                        <div style={{width:"100%", margin:"auto"}}>
                            <div className={'icon-catalog-courses icon-catalog'}/>
                        </div>
                        <div id={'label-wrapper'} style={{width:"100%", margin:"auto"}}>
                            <label>Courses</label>
                        </div>
                    </div>
                    <div className={'label-icon-container'}>
                        <div style={{width:"100%", margin:"auto"}}>
                            <div className={'icon-catalog-departments icon-catalog'}/>
                        </div>
                        <div id={'label-wrapper'} style={{width:"100%", margin:"auto"}}>
                            <label>Departments</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {renderPage()}
            </div>
        </Fragment>
    );
}

export default CourseCatalog;
