import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../../css/RequestTable.css';
import {TablePagination} from "@mui/material";
import DisplayCourseDetails from "../DisplayCourseDetails";
import DisplayCoursePrerequisites from "../DisplayCoursePrerequisites";

function CatalogDisplayCourses(props:any) {

    const [courses, setCourses] = useState([]);
    const [courseCount, setCourseCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    const [maxResults, setMaxResults] = useState(10);

    const [columnSort, setColumnSort] = useState(0);
    const [sortDirection, setSortDirection] = useState(-1);
    const [searchInput, setSearchInput] = useState("");

    const [selectedCourse, setSelectedCourse] = useState<string>();

    useEffect(() => {
        const getCourses = () => requestSearchAllCourses();
        getCourses();
    }, [pageNumber, maxResults]);

    function requestSearchAllCourses() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "searchAllCourses",
                pageNum: pageNumber,
                maxResults: maxResults,
                searchInput: searchInput
            }
        }).then(res => {
            let {error, courses, count} = res.data;
            setCourses(courses);
            setCourseCount(count);
            console.log(courses, count);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function handleViewCourse(courseID: string) {
        setSelectedCourse(courseID);
    }

    enum ColumnSort {
        ID=0,
        Name=1,
        Credits=2,
        Department=3
    }

    function displayCourses() {
        if(courses) {
            return (courses?.sort((a:any,b:any) => {
                    switch(columnSort) {
                        case ColumnSort.ID: {
                            if (a.id < b.id) {
                                return sortDirection;
                            }
                            if (a.id > b.id) {
                                return -sortDirection;
                            }
                            return 0;
                        }
                        case ColumnSort.Name: {
                            if (a.name < b.name) {
                                return sortDirection;
                            }
                            if (a.name > b.name) {
                                return -sortDirection;
                            }
                            return 0;
                        }
                        case ColumnSort.Credits: {
                            if (a.credits < b.credits) {
                                return sortDirection;
                            }
                            if (a.credits > b.credits) {
                                return -sortDirection;
                            }
                            return 0;
                        }
                        case ColumnSort.Department: {
                            if (a.department < b.department) {
                                return sortDirection;
                            }
                            if (a.department > b.department) {
                                return -sortDirection;
                            }
                            return 0;
                        }
                    }
                    return 0;

                }).map((item: any, key: number) => (
                        <tr className={'request-table-tr'} key={key}>
                            <td className={'request-table-td fit-width'}><div>
                                    <button onClick={() => handleViewCourse(item.id)}><label>View</label></button>
                            </div></td>
                            <td className={'request-table-td fit-width'}><div className={'request-table-div'}>{item.id}</div></td>
                            <td className={'request-table-td fit-width'}><div className={'request-table-div'}>{item.name}</div></td>
                            <td className={'request-table-td fit-width'}><div className={'request-table-div'}>{item.credits}</div></td>
                            <td className={'request-table-td fit-width'}><div className={'request-table-div'}>{item.department}</div></td>
                            <td className={'request-table-td fit-width'}><div className={'request-table-div'}>{item.description}</div></td>
                        </tr>
                    )
                )
            );
        }
    }

    function handleSort(columnNum:number) {
        if(columnNum === columnSort) {
            setSortDirection(sortDirection * -1);
            console.log("Sort dir", sortDirection, columnNum, columnSort);
        } else {
            setSortDirection(-1);
            setColumnSort(columnNum);
            console.log("Sort col", sortDirection, columnNum, columnSort);
        }
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setMaxResults(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    const handleSearchChange = (event:any) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    }

    const handleSearchCommit = (event:any) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            commitSearch();
        }
    }

    function commitSearch() {
        if(searchInput.length > 0) {
            const doSearch = () => requestSearchAllCourses();
            doSearch();
            setPageNumber(0);
        }
    }

    function displayAllCourses() {
        return (
            <div style={{margin: 32}}>
                <div style={{marginTop:64}}>
                    <h1>Course Search</h1>
                </div>
                <div style={{display:"flex", width:"100%"}}>
                    <div style={{width:"100%"}}>
                        <TablePagination
                            style={{float:"left"}}
                            component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={courseCount}
                            page={pageNumber} rowsPerPage={maxResults} onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </div>
                    <div style={{width:"100%"}}>
                        <form style={{marginLeft:"auto", marginRight:0}}>
                            <div style={{display:"flex", marginTop: 8}}>
                                <div style={{marginLeft:"auto", marginRight:0, backgroundColor: "#333333", padding:16, borderRadius:15}}>
                                    <input style={{marginRight: 8}}
                                           type={"search"}
                                           autoComplete={'on'}
                                           value={searchInput}
                                           onChange={handleSearchChange}
                                           onKeyDown={handleSearchCommit}/>
                                    <button onClick={commitSearch}><label>Search</label></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <table className={'request-table'}>
                    <tbody>
                    <tr>
                        <th className={'request-table-th'}><label></label></th>
                        <th className={'request-table-th'}><label onClick={()=>handleSort(ColumnSort.ID)}>Course ID</label></th>
                        <th className={'request-table-th'}><label onClick={()=>handleSort(ColumnSort.Name)}>Name</label></th>
                        <th className={'request-table-th'}><label onClick={()=>handleSort(ColumnSort.Credits)}>Credits</label></th>
                        <th className={'request-table-th'}><label onClick={()=>handleSort(ColumnSort.Department)}>Department</label></th>
                        <th className={'request-table-th'}><label>Description</label></th>
                    </tr>
                    {
                        displayCourses()
                    }

                    </tbody>
                </table>

            </div>
        );
    }

    function displaySelectedCourse() {
        return (
            <div style={{margin: 32}}>
                <div style={{display:"flex", margin: "auto", width: 700}}>
                    <div style={{
                        marginTop: 32,
                        marginLeft: 0,
                        marginRight:"auto",
                        minWidth: 150, minHeight:25,
                        backgroundColor: "#333353",
                        color: "whitesmoke",
                        borderRadius: 5,
                        display:"inline-block"
                    }} onClick={() => setSelectedCourse("")}>
                        <label style={{padding:32}}> {"< "}Go Back to All Courses</label>
                    </div>
                </div>
                <div>
                    <DisplayCourseDetails CID={selectedCourse}/>
                    <DisplayCoursePrerequisites CID={selectedCourse}/>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <div>
                {selectedCourse?displaySelectedCourse():displayAllCourses()}
            </div>
        </Fragment>
    );
}

export default CatalogDisplayCourses;
