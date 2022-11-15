import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import './../css/RequestTable.css';
import {TablePagination} from "@mui/material";

function CatalogDisplayCourses() {

    const [courses, setCourses] = useState([]);
    const [courseCount, setCourseCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    const [maxResults, setMaxResults] = useState(10);

    const [columnSort, setColumnSort] = useState(0);
    const [sortDirection, setSortDirection] = useState(-1);
    const [searchInput, setSearchInput] = useState("");

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

    function viewCourse(courseID: string) {

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
                        <tr key={key}>
                            <td className={'fit-width'}><div>
                                    <button onClick={() => viewCourse(item.id)}><label>View</label></button>
                            </div></td>
                            <td className={'fit-width'}><div>{item.id}</div></td>
                            <td className={'fit-width'}><div>{item.name}</div></td>
                            <td className={'fit-width'}><div>{item.credits}</div></td>
                            <td className={'fit-width'}><div>{item.department}</div></td>
                            <td className={'fit-width'}><div>{item.description}</div></td>
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

    return (
        <Fragment>
            <div>
                <form>
                    <div style={{marginTop: 50}}>
                        <input style={{marginRight: 16, marginBottom: 16}}
                               type={"search"}
                               autoComplete={'on'}
                               value={searchInput}
                               onChange={handleSearchChange}
                               onKeyDown={handleSearchCommit}/>
                        <button onClick={commitSearch}><label>Search</label></button>
                    </div>
                </form>
                <table className={'request-table'}>
                    <tbody>
                    <tr>
                        <th><label></label></th>
                        <th><label onClick={()=>handleSort(ColumnSort.ID)}>Course ID</label></th>
                        <th><label onClick={()=>handleSort(ColumnSort.Name)}>Name</label></th>
                        <th><label onClick={()=>handleSort(ColumnSort.Credits)}>Credits</label></th>
                        <th><label onClick={()=>handleSort(ColumnSort.Department)}>Department</label></th>
                        <th><label>Description</label></th>
                    </tr>
                    {
                        displayCourses()
                    }

                    </tbody>
                </table>
                <div style={{marginBottom: 50}}>
                    <TablePagination component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={courseCount}
                                     page={pageNumber} rowsPerPage={maxResults} onPageChange={handleChangePage}
                                     onRowsPerPageChange={handleChangeRowsPerPage}/>
                </div>
            </div>
        </Fragment>
    );
}

export default CatalogDisplayCourses;
