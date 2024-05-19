import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../../stores/AuthUserStore";
import "../../../../../css/PeudoTable.css"
import DisplayCourseSection from "./DisplayCourseSection";
import DisplaySemesterSchedule from "./DisplaySemesterSchedule";

function SemesterSchedule(props:any) {

    const {targetUID, targetRole} = props;
    console.log("SemSched", props)

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [semesterIDs, setSemesterIDs] = useState<any []>();
    const [selectedSemesterID, setSelectedSemesterID] = useState<string>();

    const [semesterSchedule, setSemesterSchedule] = useState<any[]>();
    const [dropStatus, setDropStatus] = useState<boolean[]>([])

    const [selectedCRN, setSelectedCRN] = useState<string>();

    useEffect(() => {
        requestViewableSemesters().then();
    }, [])

    useEffect(() => {
        console.log("Using Ids", semesterIDs)
        setSelectedSemesterID(semesterIDs?.at(0).SemesterID)
    }, [semesterIDs])

    useEffect(() => {
        if(selectedSemesterID && userID) {
            setSelectedCRN("");
            requestScheduleByUIDAndSemesterID().then(r => console.log("Schedule Request Done"));
        }
    }, [selectedSemesterID])

    useEffect(() => {
        const status:boolean[] = [];
        semesterSchedule?.map((index:any)=>(status.push(false)))
        setDropStatus(status);
    }, [semesterSchedule])

    async function requestViewableSemesters() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getSemesterIDsInRange"
            }
        }).then(res => {
            const {
                SemesterIDs
            } = res.data;

            if(SemesterIDs.length == 0) {
                SemesterIDs.push({SemesterID: 'F22', Term: 'Fall', Year: '2022'})
                SemesterIDs.push({SemesterID: 'S23', Term: 'Spring', Year: '2023'})
            }

            setSemesterIDs(SemesterIDs);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestScheduleByUIDAndSemesterID() {
        console.log("requesting", userID, selectedSemesterID);
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getScheduleByUIDAndSemesterID",
                id: userID,
                semesterID: selectedSemesterID
            }
        }).then(res => {
            let {error, schedule} = res.data;
            console.log(res.data)
            console.log("user", userID)
            setSemesterSchedule(schedule);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleSelectSemesterID = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedSemesterID(event.target.value);
    }

    function handleSelectCRN(event:any, CRN:string){
        event.preventDefault();
        setSelectedCRN(CRN);
    }

    function displayCourseSection() {
        return (
            <Fragment>
                <DisplayCourseSection targetCRN={selectedCRN} godRole={userStoreRole}/>
            </Fragment>
        );
    }

    const handleChangeDropStatus = (event:any, index:number) => {
        const status:boolean[] = dropStatus;
        const value = parseInt(event.target.value)
        status[index] = !!value;
        setDropStatus(status);
    }

    return (
        <Fragment>
            <div style={{margin:32}}>
                <div>
                    <h1>Semester Schedule</h1>
                </div>
                <DisplaySemesterSchedule targetUID={targetUID} targetRole={targetRole}/>
            </div>
        </Fragment>
    );
}

export default SemesterSchedule;