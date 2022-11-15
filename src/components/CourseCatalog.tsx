import React, {Fragment, useEffect, useState} from 'react';
import '../stores/user-store';
import "./../css/CourseCatalog.css"
import DisplayProgramRequirements from "./DisplayProgramRequirements";
import DisplayProgramDetails from "./DisplayProgramDetails";

import axios from "axios";
import DisplayProgram from "./DisplayProgram";
import CatalogDisplayPrograms from "./CatalogDisplayPrograms";
import CatalogDisplayCourses from "./CatalogDisplayCourses";

function CourseCatalog() {

    enum CatalogPages {
        MainMenu = 0,
        ProgramsFilter = 1,
        CourseFilter = 2
    }
    const [catalogPage, setCatalogPage] = useState(CatalogPages.MainMenu);

    function renderPage() {
        switch(catalogPage) {
            case CatalogPages.ProgramsFilter:{
                return <CatalogDisplayPrograms/>
            }
            case CatalogPages.CourseFilter:{
                return <CatalogDisplayCourses/>
            }
        }
    }


    return (
        <Fragment>
            <div>
            <button onClick={() => setCatalogPage(CatalogPages.ProgramsFilter)}><label>Programs</label></button>
            <button onClick={() => setCatalogPage(CatalogPages.CourseFilter)}><label>Courses</label></button>
            </div>
            <div>
                {renderPage()}
            </div>
        </Fragment>
    );
}

export default CourseCatalog;
