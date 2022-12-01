import React, {Fragment, useEffect, useState} from "react";
import AttendanceDetails from "../../../../classes/AttendanceDetails";
import axios from "axios";

function DisplayCourseSectionDetails(props:any) {
    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [data, setData] = useState<any[]>();

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        requestSectionDetails().then(r=>console.log(r));
    }, [crn])

    async function requestSectionDetails() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionDataByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, data} = res.data;
            console.log(res.data)
            setData(data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function display() {
        return (
            <Fragment>
                <div style={{margin:32}}>
                    <div>
                        <h1>Course Section data</h1>
                    </div>
                </div>
            </Fragment>
        );
    }

    return <Fragment>
        {
            display()
        }
    </Fragment>
}

export default DisplayCourseSectionDetails;