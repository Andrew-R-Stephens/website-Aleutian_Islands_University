import React, {Fragment, useEffect, useState} from "react";
import AttendanceDetails from "../../../../classes/AttendanceDetails";
import axios from "axios";

function DisplayCourseSectionRoster(props:any) {
    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [roster, setRoster] = useState<any[]>();

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        requestSectionRoster().then(r=>console.log(r));
    }, [crn])

    async function requestSectionRoster() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionAttendanceByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, roster} = res.data;
            console.log(res.data)
            setRoster(roster);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function display() {
        return (
            <Fragment>
                <div style={{margin:32}}>
                    <div>
                        <h1>Roster</h1>
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

export default DisplayCourseSectionRoster;