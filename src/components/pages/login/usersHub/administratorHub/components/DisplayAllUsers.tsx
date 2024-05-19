import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import '../../../../../../css/PeudoTable.css'
import '../../../../../../css/TablePagination.css'
import {TablePagination} from "@mui/material";
import {RoleAuthStore} from "../../../../../../stores/AuthUserStore";
import {useNavigate} from "react-router-dom";

function DisplayAllUsers() {

    const roleStoreID = RoleAuthStore((state:any) => state.authRole);

    const [activePage, setActivePage] = useState(0);
    const [allUsers, setAllUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState<number>();

    const userCount = useRef(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [maxResults, setMaxResults] = useState(15);

    const [selectedUserType, setSelectedUserType] = useState<any[]>([]);
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedUID, setSelectedUID] = useState<string>("");

    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        requestAllUsers().then(r=> console.log("Completed Request", allUsers));
    }, [])

    useEffect(() => {
        setPageNumber(0)
        filterSections().then(r=>setFilteredUsers(r));
    }, [allUsers, selectedUserType, selectedName, selectedUID])

    useEffect(() => {
        console.log(selectedUserType)
    }, [selectedUserType])

    async function requestAllUsers() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getAllUsers_Identifiable"
            }
        }).then(res => {
            console.log(res.data);
            const {
                Users
            } = res.data;

            setAllUsers(Users);

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleSelectedName = (event:any) => {
        event.preventDefault();
        setSelectedName(event.target.value);
    }

    const handleSelectedUID = (event:any) => {
        event.preventDefault();
        setSelectedUID(event.target.value);
    }

    function handleSelectedUserType(event:any, userType: any) {
        setSelectedUserType(old => old.filter((t:any)=>(t !== userType)));
        if(event.target.checked)
            setSelectedUserType(old => [...old, userType]);
    }

    function handleViewUserSelection(UID:number) {
        setSelectedUser(UID)
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

    function handleSelectUser(uid:any) {
        navigate('./../advisor-console', {state:{targetUID:uid, godRole:roleStoreID}});
    }

    function displayFilterUID() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>User ID</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'number'}
                       autoComplete={'on'}
                       value={selectedUID}
                       onChange={handleSelectedUID}/>
            </div>
        );
    }

    function displayFilterName() {

        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>User Name</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedName}
                       onChange={handleSelectedName}/>
            </div>
        );
    }


    function displayFilterUserType() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>User Types</label>
                <form>
                    <fieldset style={{display:"inline-block"}}>
                        <div style={{textAlign:"left"}}>
                            <input type={'checkbox'}
                                   onChange={(event)=>handleSelectedUserType(event, "Student")}/>
                            <label style={{paddingLeft:8}}>Student</label>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <input type={'checkbox'}
                                   onChange={(event)=>handleSelectedUserType(event, "Faculty")}/>
                            <label style={{paddingLeft:8}}>Faculty</label>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <input type={'checkbox'}
                                   onChange={(event)=>handleSelectedUserType(event, "Researcher")}/>
                            <label style={{paddingLeft:8}}>Researcher</label>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <input type={'checkbox'}
                                   onChange={(event)=>handleSelectedUserType(event, "Administrator")}/>
                            <label style={{paddingLeft:8}}>Administrator</label>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }


    function displayFilterOptions() {
        return(
            <div style={{backgroundColor:"#eeeeee", borderRadius:15, boxShadow: "0 0 15px #333333", padding: 16, display:"flex", maxWidth: 700, margin:"auto"}}>
                <div style={{marginLeft:"auto", marginTop: 16, marginRight:"auto", display:"inline-block"}}>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterUID()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterName()}</div>
                </div>
                <div style={{width: "100%", marginLeft:"auto", marginTop: 16, marginRight:"auto", display:"inline-block"}}>
                    <div style={{marginLeft:"auto", marginTop: 16, marginRight:"auto", display:"flex"}}>
                        <div style={{backgroundColor:"#dfdfdf", borderRadius:15, padding:8, marginLeft:"auto", marginRight:"auto", marginTop:0, marginBottom:"auto"}}>{displayFilterUserType()}</div>
                    </div>
                </div>
            </div>
        );
    }

    async function filterSections() {
        return allUsers!?.filter((u:any)=> (
            selectedName === "" || (u.firstName.includes(selectedName.split(' ')[0])
                || (u.lastName.includes(selectedName.split(' ')[1])))
        ))!.filter((u:any)=> (
            selectedUID === "" || ((u.UID+"").includes(selectedUID))
        ))!.filter((u:any)=> (
            !(selectedUserType?.length>0) || (selectedUserType?.includes(u.UserType))
        ))
    }

    return <Fragment>
        <h1>User Search</h1>
        <div style={{marginTop:32}}>
            {displayFilterOptions()}
        </div>
        <form>
            <fieldset>
                <div style={{overflowX:"auto"}}>
                    <div style={{width:"100%"}}>
                        <TablePagination
                            style={{float:"left"}}
                            component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={filteredUsers?filteredUsers?.length:0}
                            page={pageNumber} rowsPerPage={maxResults} onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}/>
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
                                    filteredUsers.map((u: any, key: number) => (
                                        <div className={'div-table-row'} key={key} style={{display: "flex"}}>
                                            <div className={'div-table-col'}>
                                                <button className={'div-table-button'}
                                                        onClick={() => handleSelectUser(u.UID)}>View
                                                </button>
                                            </div>
                                            <div className={'div-table-col'}><label>{u.UID}</label></div>
                                            <div className={'div-table-col'}><label>{u.firstName}</label></div>
                                            <div className={'div-table-col'}><label>{u.lastName}</label></div>
                                            <div className={'div-table-col'}><label>{u.UserType}</label></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </fieldset>
        </form>
    </Fragment>;

}

export default DisplayAllUsers;