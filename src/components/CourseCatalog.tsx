import React, {Fragment, useEffect, useState} from 'react';
import '../stores/user-store';
import DisplayProgramRequirements from "./DisplayProgramRequirements";
import './../css/RequestTable.css';
import DisplayProgramDetails from "./DisplayProgramDetails";

function CourseCatalog() {

    const [programID, setProgramID] = useState(1);
    var search:any;

    useEffect(() => {
        search = programID;
    }, [])

    function submitSearch() {
        setProgramID(search);
    }

    const handleSearchChange = (event:any) => {
        search = event.target.value;
    };

    return (
        <Fragment>
            <form onSubmit={submitSearch} style={{marginBottom:32, marginTop:32}}>
                <div>
                    <button type={"submit"}>Go</button>
                    <input style={{marginLeft:8}} type={"number"} value={search} defaultValue={programID} onChange={handleSearchChange}></input>
                </div>
            </form>
            {programID ?
                <div>
                    <DisplayProgramDetails PID={programID}/>
                    <DisplayProgramRequirements PID={programID}/>
                </div>:""}

        </Fragment>);

}

export default CourseCatalog;
