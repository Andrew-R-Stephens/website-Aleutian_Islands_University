import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import '../css/PeudoTable.css'
import '../css/TablePagination.css'
import {TablePagination} from "@mui/material";

function DisplayAllStudents() {

    const [activePage, setActivePage] = useState(0);
    const [allStudents, setAllStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState<number>();

    const studentCount = useRef(0);
    const [paginationPage, setPaginationPage] = useState(0);
    const [maxPaginationResults, setMaxPaginationResults] = useState(15);

    useEffect(() => {
        const request = async () => requestAllStudents();
        request().then(r=> console.log("Completed Request", allStudents));
    }, [paginationPage, maxPaginationResults])

    async function requestAllStudents() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAllStudents_Identifiable",
                pageNum: paginationPage,
                maxResults: maxPaginationResults
            }
        }).then(res => {
            console.log(res.data);
            const {
                Students,
                TotalResults
            } = res.data;

            studentCount.current = TotalResults;
            setAllStudents(Students);

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function handleViewStudentSelection(UID:number) {
        setSelectedStudent(UID)
    }

    const handleChangePaginate = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPaginationPage(newPage);
    };

    const handleChangePaginationRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setMaxPaginationResults(parseInt(event.target.value, 10));
        setPaginationPage(0);
    };

    return (
        <Fragment>
            <div style={{marginBottom: 50}}>
                <TablePagination component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={studentCount.current}
                                 page={paginationPage} rowsPerPage={maxPaginationResults} onPageChange={handleChangePaginate}
                                 onRowsPerPageChange={handleChangePaginationRowsPerPage}/>
            </div>
            <div className={'div-table'}>
                <div>
                    <div className={'div-table-header'} key={-1} style={{display:"flex"}}>
                        <div className={'div-table-col'}></div>
                        <div className={'div-table-col'}><label>UID</label></div>
                        <div className={'div-table-col'}><label>First Name</label></div>
                        <div className={'div-table-col'}><label>Last Name</label></div>
                        <div className={'div-table-col'}><label>User Type</label></div>
                    </div>
                    <div style={{overflowY: "auto", maxHeight:"80vh"}}>
                    {
                        allStudents.map((item: any, key: number) => (
                            <div className={'div-table-row'} key={key} style={{display: "flex"}}>
                                <div className={'div-table-col'}>
                                    <button className={'div-table-button'}
                                            onClick={() => handleViewStudentSelection(item.UID)}>View
                                    </button>
                                </div>
                                <div className={'div-table-col'}><label>{item.UID}</label></div>
                                <div className={'div-table-col'}><label>{item.firstName}</label></div>
                                <div className={'div-table-col'}><label>{item.lastName}</label></div>
                                <div className={'div-table-col'}><label>{item.UserType}</label></div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>

        </Fragment>);
}

export default DisplayAllStudents;