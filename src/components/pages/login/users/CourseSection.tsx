import React, {Fragment} from 'react';
import {useLocation} from "react-router-dom";
import DisplayCourseSection from "./DisplayCourseSection";

function CourseSection(props:any) {

    const location:any = useLocation();
    const {targetCRN, godRole} = location.state?location.state:props;

    return (
        <Fragment>
            <DisplayCourseSection targetCRN={targetCRN} godRole={godRole}></DisplayCourseSection>
        </Fragment>
    );

}

export default CourseSection;