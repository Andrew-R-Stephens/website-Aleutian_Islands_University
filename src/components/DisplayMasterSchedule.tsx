import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";

function DisplayMasterSchedule() {

    const [semesterIDs, setSemesterIDs] = useState([]);
    const [selectedSemesterID, setSelectedSemesterID] = useState();
    const [semesterSections, setSemesterSections]= useState([]);

    useEffect(() => {
        const request = async () => requestViewableSemesters();
        request().then(r => console.log("Completed Semester Request", semesterIDs));
    }, [])

    useEffect(() => {
        const request = async () => requestMasterSchedule();
        request().then(r=> console.log("Completed MasterSchedule Request", semesterSections));
    }, [selectedSemesterID])

    async function requestViewableSemesters() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getSemesterIDsInRange"
            }
        }).then(res => {
            const {
                SemesterIDs
            } = res.data;

            setSemesterIDs(SemesterIDs);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestMasterSchedule() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getMasterScheduleBySemesterID",
                semesterID : selectedSemesterID
            }
        }).then(res => {
            console.log(res.data);
            const {
                Sections
            } = res.data;

            setSemesterSections(Sections);

        }).catch(function(err) {
            console.log("getMasterScheduleByID", err.message);
        })
    }

    const handleSelectSemesterID = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedSemesterID(event.target.value);
    }

    return <Fragment>

        <h3>Display Master Schedule</h3>
        <select onChange={handleSelectSemesterID}>
            {
                semesterIDs?.map((item:any) => (
                    <option value={item.SemesterID}>{item.Term}{" "}{item.Year}</option>
                ))
            }
        </select>
        <div style={{maxHeight:"50vh", overflowY:"scroll"}}>
            {
                semesterSections?.map((item:any, key:number)=>(
                    <div style={{display:"flex"}}>
                        <div><button style={{margin:"auto"}}>Edit</button>{" "}<button>View</button></div>
                        <label style={{width:"7ch", margin:"auto"}}>{item.CRN}</label>
                        <label style={{width:"20ch", margin:"auto"}}>{item.CourseID}</label>
                        <label style={{width:"3ch", margin:"auto"}}>{item.SectionID}</label>
                        <label style={{width:"5ch", margin:"auto"}}>{item.RoomID}</label>
                    </div>
                ))
            }
        </div>
        <div><button>Create Section</button>{" "}<button>Apply Changes</button></div>

    </Fragment>;
}
export default DisplayMasterSchedule;