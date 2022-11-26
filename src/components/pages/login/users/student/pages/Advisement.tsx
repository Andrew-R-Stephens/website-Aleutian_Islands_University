import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import axios from "axios";
import {TablePagination} from "@mui/material";
import "./../../../../../../css/Switch.css"
import "./../../../../../../css/PeudoTable.css"

function StudentAdvisement(props:any) {

    const[advisor, setAdvisor] = useState<any>();

    useEffect(() => {
        requestAdvisor().then(r => console.log("StudentAdvisement"));
    }, [])

    async function requestAdvisor() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAdvisorByStudentID",
                id: props.targetStudent
            }
        }).then(res => {
            let {error, advisor} = res.data;
            setAdvisor(advisor);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    return <div>
        {
            advisor?
                <div style={{margin: 32, padding:16, borderRadius: 15, backgroundColor: "#cccccc"}}>
                    <div style={{fontSize:32, marginBottom: 16, fontWeight: "bold"}}><label></label>Advisor Information</div>
                    <div style={{fontSize:20, marginBottom: 16}}><label style={{fontWeight:"bold"}}>{advisor.FirstName} {advisor.LastName}</label></div>
                    <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Phone: </label>{advisor.PhoneNum}</div>
                    <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Email: </label>{advisor.Email}</div>
                    <div style={{fontSize:20, marginBottom: 16}}><label style={{fontWeight:"bold"}}>Location: </label><label>{advisor.RoomNum}, {advisor.BuildingName}</label></div>
                    <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Office Hours: </label>{advisor.Name} {advisor.StartTime} - {advisor.EndTime}</div>
                </div>:""
        }
    </div>;
}

function FacultyAdvisement(props:any) {

    enum ViewAdvisees {
        all = 0,
        self = 1
    }

    const[advisor, setAdvisor] = useState<any>(props.targetFaculty);
    const[advisees_self, setAdvisees_self] = useState<any[]>();
    const[advisees_all, setAdvisees_all] = useState<any[]>();

    const adviseeCount = useRef(0);
    const [paginationPage, setPaginationPage] = useState(0);
    const [maxPaginationResults, setMaxPaginationResults] = useState(15);

    const [viewAdviseesOption, setViewAdviseesOption] = useState(ViewAdvisees.self)

    useEffect(() => {
        requestAdvisor().then(r => console.log("FacultyAdvisor", advisor));
        requestAllAdvisees().then(r => console.log("FacultyAdviseesAll", advisees_all));
    }, [])

    useEffect(() => {
        requestAdvisees().then(r => console.log("FacultyAdvisees", advisees_self));
    }, [advisor])

    useEffect(() => {
        requestAllAdvisees().then(r => console.log("FacultyAdviseesAll", advisees_all));
    }, [paginationPage, maxPaginationResults])

    async function requestAdvisor() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAdvisorByAdvisorID",
                id: props.targetFaculty
            }
        }).then(res => {
            let {error, advisor} = res.data;
            setAdvisor(advisor);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAdvisees() {
        const {UID} = advisor;
        console.log(UID)
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAdviseesByAdvisorID",
                id: UID
            }
        }).then(res => {
            let {error, advisees} = res.data;
            setAdvisees_self(advisees);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllAdvisees() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllAdvisees",
                pageNum : paginationPage,
                maxResults: maxPaginationResults
            }
        }).then(res => {
            let {error, advisees, count} = res.data;
            console.log(advisees)
            adviseeCount.current = count;
            setAdvisees_all(advisees);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangePaginate = (event: any, newPage: number) => {
        event.preventDefault();
        setPaginationPage(newPage);
    };

    const handleChangePaginationRowsPerPage = (event: any) => {
        event.preventDefault();
        setMaxPaginationResults(parseInt(event.target.value, 10));
        setPaginationPage(0);
    };

    const handleChangeDisplayAdvisees = (event:any) => {
        event.preventDefault();
        console.log(event.target.checked)
        setViewAdviseesOption(event.target.checked ? ViewAdvisees.all : ViewAdvisees.self);
    }

    function handleEmail (email:string) {
        window.location.href = ("mailto:" + email);
    }

    return <div>
        {
            advisor?
                <div>
                    <div style={{margin: 32, padding:16, borderRadius: 15, backgroundColor: "#cccccc"}}>
                        <div style={{fontSize:32, marginBottom: 16, fontWeight: "bold"}}><label></label>Advisor Information</div>
                        <div style={{fontSize:20, marginBottom: 16}}><label style={{fontWeight:"bold"}}>{advisor.FirstName} {advisor.LastName}</label></div>
                        <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Phone: </label>{advisor.PhoneNum}</div>
                        <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Email: </label>{advisor.Email}</div>
                        <div style={{fontSize:20, marginBottom: 16}}><label style={{fontWeight:"bold"}}>Location: </label><label>{advisor.RoomNum}, {advisor.BuildingName}</label></div>
                        <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Office Hours: </label>{advisor.Name} {advisor.StartTime} - {advisor.EndTime}</div>
                    </div>
                    <div style={{marginLeft:"auto", marginRight:"auto", marginBottom: 32}}>
                        <label style={{textAlign: "center", padding: 4, fontWeight:"bold"}}>Your Advisees</label>
                        <label className="switch">
                            <input type="checkbox" onInput={handleChangeDisplayAdvisees}/>
                            <span className="slider round"></span>
                        </label>
                        <label style={{textAlign: "center", padding: 4, fontWeight:"bold"}}>All Advisees</label>
                    </div>
                    {viewAdviseesOption ? <div>
                        <div style={{marginBottom: 50}}>
                            <div style={{textAlign:"left", fontSize:32, fontWeight: "bold"}}><label></label>Your Advisees</div>
                            <div className={'div-table'}>
                                <div className={'div-table'}>
                                    <div className={'div-table-header'} style={{display:"flex"}}>
                                        <div className={'div-table-col'}></div>
                                        <div className={'div-table-col'}><label>First Name</label></div>
                                        <div className={'div-table-col'}><label>Last Name</label></div>
                                        <div className={'div-table-col'}><label>Phone Number</label></div>
                                        <div className={'div-table-col'}><label>Email</label></div>
                                    </div>
                                    {
                                    advisees_self?.map((a:any) => (
                                            <div className={'div-table-row'} style={{display:"flex"}}>
                                                <div className={'div-table-col div-table-button '}><div className={'div-table-button-content'}>View</div></div>
                                                <div className={'div-table-col'}><label>{a.FirstName}</label></div>
                                                <div className={'div-table-col'}><label>{a.LastName}</label></div>
                                                <div className={'div-table-col'}><label>{a.PhoneNum}</label></div>
                                                <div className={'div-table-col'}><div className={'div-mailTo'} onClick={() => handleEmail(a.Email)} defaultValue={a.Email}>{a.Email}</div></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <div style={{marginBottom: 50}}>
                            <div style={{textAlign:"left", fontSize:32, marginTop: 32, fontWeight: "bold"}}><label></label>All Advisees</div>
                            <TablePagination component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={adviseeCount.current}
                                             page={paginationPage} rowsPerPage={maxPaginationResults} onPageChange={handleChangePaginate}
                                             onRowsPerPageChange={handleChangePaginationRowsPerPage}/>
                            <div className={'div-table'}>
                                <div className={'div-table-header'} style={{display:"flex"}}>
                                    <div className={'div-table-col'}></div>
                                    <div className={'div-table-col'}><label>First Name</label></div>
                                    <div className={'div-table-col'}><label>Last Name</label></div>
                                    <div className={'div-table-col'}><label>Phone Number</label></div>
                                    <div className={'div-table-col'}><label>Email</label></div>
                                </div>{
                                advisees_all?.map((a:any) => (
                                    <div className={'div-table-row'} style={{display:"flex"}}>
                                        <div className={'div-table-col div-table-button'}><div className={'div-table-button-content'}>View</div></div>
                                        <div className={'div-table-col'}><label>{a.FirstName}</label></div>
                                        <div className={'div-table-col'}><label>{a.LastName}</label></div>
                                        <div className={'div-table-col'}><label>{a.PhoneNum}</label></div>
                                        <div className={'div-table-col'}><label>{a.Email}</label></div>
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>}
                </div>:
                <div>
                    You are not registered to Advise students.
                </div>
        }
    </div>;
}

function AdministratorAdvisement(props:any) {

    enum ViewAdvisees {
        all = 0
    }

    const[advisor, setAdvisor] = useState<any>(props.targetFaculty);
    const[advisees_self, setAdvisees_self] = useState<any[]>();
    const[advisees_all, setAdvisees_all] = useState<any[]>();

    const adviseeCount = useRef(0);
    const [paginationPage, setPaginationPage] = useState(0);
    const [maxPaginationResults, setMaxPaginationResults] = useState(15);

    const [viewAdviseesOption, setViewAdviseesOption] = useState(ViewAdvisees.all)

    useEffect(() => {
        requestAdvisor().then(r => console.log("FacultyAdvisor", advisor));
        requestAllAdvisees().then(r => console.log("FacultyAdviseesAll", advisees_all));
    }, [])

    useEffect(() => {
        requestAdvisees().then(r => console.log("FacultyAdvisees", advisees_self));
    }, [advisor])

    useEffect(() => {
        requestAllAdvisees().then(r => console.log("FacultyAdviseesAll", advisees_all));
    }, [paginationPage, maxPaginationResults])

    async function requestAdvisor() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAdvisorByAdvisorID",
                id: props.targetFaculty
            }
        }).then(res => {
            let {error, advisor} = res.data;
            setAdvisor(advisor);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAdvisees() {
        const {UID} = advisor;
        console.log(UID)
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAdviseesByAdvisorID",
                id: UID
            }
        }).then(res => {
            let {error, advisees} = res.data;
            setAdvisees_self(advisees);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllAdvisees() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllAdvisees",
                pageNum : paginationPage,
                maxResults: maxPaginationResults
            }
        }).then(res => {
            let {error, advisees, count} = res.data;
            console.log(advisees)
            adviseeCount.current = count;
            setAdvisees_all(advisees);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangePaginate = (event: any, newPage: number) => {
        event.preventDefault();
        setPaginationPage(newPage);
    };

    const handleChangePaginationRowsPerPage = (event: any) => {
        event.preventDefault();
        setMaxPaginationResults(parseInt(event.target.value, 10));
        setPaginationPage(0);
    };

    const handleChangeDisplayAdvisees = (event:any) => {
        event.preventDefault();
        console.log(event.target.checked)
        setViewAdviseesOption(event.target.checked ? ViewAdvisees.all : ViewAdvisees.all);
    }

    function handleEmail (email:string) {
        window.location.href = ("mailto:" + email);
    }

    return <div>
        {
            advisor?
                <div>
                    <div style={{margin: 32, padding:16, borderRadius: 15, backgroundColor: "#cccccc"}}>
                        <div style={{fontSize:32, marginBottom: 16, fontWeight: "bold"}}><label></label>Advisor Information</div>
                        <div style={{fontSize:20, marginBottom: 16}}><label style={{fontWeight:"bold"}}>{advisor.FirstName} {advisor.LastName}</label></div>
                        <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Phone: </label>{advisor.PhoneNum}</div>
                        <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Email: </label>{advisor.Email}</div>
                        <div style={{fontSize:20, marginBottom: 16}}><label style={{fontWeight:"bold"}}>Location: </label><label>{advisor.RoomNum}, {advisor.BuildingName}</label></div>
                        <div style={{fontSize:20}}><label style={{fontWeight:"bold"}}>Office Hours: </label>{advisor.Name} {advisor.StartTime} - {advisor.EndTime}</div>
                    </div>
                    <div style={{marginLeft:"auto", marginRight:"auto", marginBottom: 32}}>
                        <label style={{textAlign: "center", padding: 4, fontWeight:"bold"}}>Your Advisees</label>
                        <label className="switch">
                            <input type="checkbox" onInput={handleChangeDisplayAdvisees}/>
                            <span className="slider round"></span>
                        </label>
                        <label style={{textAlign: "center", padding: 4, fontWeight:"bold"}}>All Advisees</label>
                    </div>
                    {viewAdviseesOption ? <div>
                            <div style={{marginBottom: 50}}>
                                <div style={{textAlign:"left", fontSize:32, fontWeight: "bold"}}><label></label>Your Advisees</div>
                                <div className={'div-table'}>
                                    <div className={'div-table'}>
                                        <div className={'div-table-header'} style={{display:"flex"}}>
                                            <div className={'div-table-col'}></div>
                                            <div className={'div-table-col'}><label>First Name</label></div>
                                            <div className={'div-table-col'}><label>Last Name</label></div>
                                            <div className={'div-table-col'}><label>Phone Number</label></div>
                                            <div className={'div-table-col'}><label>Email</label></div>
                                        </div>
                                        {
                                            advisees_self?.map((a:any) => (
                                                <div className={'div-table-row'} style={{display:"flex"}}>
                                                    <div className={'div-table-col div-table-button '}><div className={'div-table-button-content'}>View</div></div>
                                                    <div className={'div-table-col'}><label>{a.FirstName}</label></div>
                                                    <div className={'div-table-col'}><label>{a.LastName}</label></div>
                                                    <div className={'div-table-col'}><label>{a.PhoneNum}</label></div>
                                                    <div className={'div-table-col'}><div className={'div-mailTo'} onClick={() => handleEmail(a.Email)} defaultValue={a.Email}>{a.Email}</div></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div>
                            <div style={{marginBottom: 50}}>
                                <hr/>
                                <div style={{textAlign:"left", fontSize:32, marginTop: 32, fontWeight: "bold"}}><label></label>All Advisees</div>
                                <TablePagination component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={adviseeCount.current}
                                                 page={paginationPage} rowsPerPage={maxPaginationResults} onPageChange={handleChangePaginate}
                                                 onRowsPerPageChange={handleChangePaginationRowsPerPage}/>
                                <div className={'div-table'}>
                                    <div className={'div-table-header'} style={{display:"flex"}}>
                                        <div className={'div-table-col'}></div>
                                        <div className={'div-table-col'}><label>First Name</label></div>
                                        <div className={'div-table-col'}><label>Last Name</label></div>
                                        <div className={'div-table-col'}><label>Phone Number</label></div>
                                        <div className={'div-table-col'}><label>Email</label></div>
                                    </div>{
                                    advisees_all?.map((a:any) => (
                                        <div className={'div-table-row'} style={{display:"flex"}}>
                                            <div className={'div-table-col div-table-button'}><div className={'div-table-button-content'}>View</div></div>
                                            <div className={'div-table-col'}><label>{a.FirstName}</label></div>
                                            <div className={'div-table-col'}><label>{a.LastName}</label></div>
                                            <div className={'div-table-col'}><label>{a.PhoneNum}</label></div>
                                            <div className={'div-table-col'}><label>{a.Email}</label></div>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>}
                </div>:
                <div>
                    You are not registered to Advise students.
                </div>
        }
    </div>;
}

function Advisement() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(userStoreID);

    const navigate = useNavigate();

    function displayAdvisement() {
        switch(userStoreRole) {
            case AuthRole.Student: {
                return displayStudentAdvisement();
            }
            case AuthRole.Faculty: {
                return displayFacultyAdvisement();
            }
            case AuthRole.Administrator: {
                return displayAdministratorAdvisement();
            }
            default: return <Fragment/>
        }

    }

    function displayStudentAdvisement(){
        return <StudentAdvisement targetStudent={userID}/>
    }

    function displayFacultyAdvisement(){
        return <FacultyAdvisement targetFaculty={userID}/>
    }

    function displayAdministratorAdvisement(){
        return <AdministratorAdvisement/>
    }

    return (
        <Fragment>
            <div className={'main-container'}>
                <div className={'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            {displayAdvisement()}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Advisement;