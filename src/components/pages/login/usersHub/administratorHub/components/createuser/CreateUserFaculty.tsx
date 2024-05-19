import React, {Fragment, useEffect, useState} from "react";
import {UserAuthStore} from "../../../../../../../stores/AuthUserStore";
import {convertTime} from "../../../../../../../Utils";
import axios from "axios";

function CreateUserFaculty(props:any) {
    const {changePage} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);

    const [departments, setDepartments] = useState<any[]>();
    const [timeslots, setTimeslots] = useState<any[]>();

    const [userType, setUserType] = useState<string>("Faculty");
    const [time, setTime] = useState<string>();
    const [departmentID, setDepartmentID] = useState<string>();
    const [timeslot, setTimeslot] = useState<string>();
    const [rank, setRank] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [ssn, setSSN] = useState<string>();
    const [fName, setFName] = useState<string>();
    const [lName, setLName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [gender, setGender] = useState<string>();
    const [honorific, setHonorific] = useState<string>();
    const [birthdate, setBirthdate] = useState<string>();
    const [houseNum, setHouseNum] = useState<number>();
    const [street, setStreet] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();
    const [country, setCountry] = useState<string>('United States');
    const [zip, setZip] = useState<number>();

    useEffect(() => {
        requestAllDepartments().then(() => console.log('Departments request succeeded.'));
        requestAllTimeslots().then(() => console.log('Timeslots request succeeded.'));
    }, [userStoreID]);


    async function requestAllDepartments() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllDepartments_distinct"
            }
        }).then(res => {
            let {error, departments} = res.data;
            setDepartments(departments);
            console.log(departments);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllTimeslots() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllTimeslots"
            }
        }).then(res => {
            let {error, timeslots} = res.data;
            setTimeslots(timeslots);
            console.log(timeslots);
        }).catch(function(err) {
            console.log(err.message);
        })
    }


    const handleChangeUserType = (event:any) => {
        event.preventDefault();
        setUserType(event.target.value);
    }

    const handleChangeTime = (event:any) => {
        event.preventDefault();
        setTime(event.target.value);
    }

    const handleChangeDepartmentID = (event:any) => {
        event.preventDefault();
        setDepartmentID(event.target.value);
    }

    const handleChangeTimeslot = (event:any) => {
        event.preventDefault();
        setTimeslot(event.target.value);
    }

    const handleChangeRank = (event:any) => {
        event.preventDefault();
        setRank(event.target.value);
    }

    const handleChangePassword = (event:any) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const handleChangeSSN = (event:any) => {
        event.preventDefault();
        setSSN(event.target.value);
    }

    const handleChangeFirstName = (event:any) => {
        event.preventDefault();
        setFName(event.target.value);
    }

    const handleChangeLastName = (event:any) => {
        event.preventDefault();
        setLName(event.target.value);
    }

    const handleChangePhone = (event:any) => {
        event.preventDefault();
        setPhone(event.target.value);
    }

    const handleChangeGender = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setGender(event.target.value);
    }

    const handleChangeHonorific = (event:any) => {
        event.preventDefault();
        setHonorific(event.target.value);
    }

    const handleChangeBirthdate = (event:any) => {
        event.preventDefault();
        setBirthdate(event.target.value);
    }

    const handleChangeHouseNum = (event:any) => {
        event.preventDefault();
        setHouseNum(event.target.value);
    }

    const handleChangeStreet = (event:any) => {
        event.preventDefault();
        setStreet(event.target.value);
    }

    const handleChangeCity = (event:any) => {
        event.preventDefault();
        setCity(event.target.value);
    }

    const handleChangeState = (event:any) => {
        event.preventDefault();
        setState(event.target.value);
    }

    const handleChangeCountry = (event:any) => {
        event.preventDefault();
        setCountry(event.target.value);
    }

    const handleChangeZip = (event:any) => {
        event.preventDefault();
        setZip(event.target.value);
    }

    const handleSubmit = (event:any) => {
        props.createUser({
            userType, time, departmentID, timeslot, rank, password, ssn, fName, lName, phone,
            gender, honorific, birthdate, houseNum, street, city, state, country, zip
        });
    }

    function disableSubmit() {
        return !(userType && time && departmentID && timeslot && rank && password && ssn && fName && lName && phone &&
            gender && honorific && birthdate && houseNum && street && city && state && country && zip)
    }

    function displayEditOptions() {
        return <Fragment>
            <div>
                <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                <fieldset>
                <div style={{display:"inline-block", textAlign:'left'}}>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>User Type: </label>
                        <input className={'div-table-col'} type={'text'} value={userType} disabled={true}
                               onChange={handleChangeUserType} style={{marginLeft:"auto", marginRight:0}}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Faculty Time: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                value={time}
                                onChange={handleChangeTime}>
                            <option value="">Select option</option>
                            <option value={'Full Time'}>Full Time</option>
                            <option value={'Part Time'}>Part Time</option>
                        </select>
                    </div>


                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Department Specialty: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                value={departmentID}
                                onChange={handleChangeDepartmentID}>
                            <option value="">Select option</option>
                            {
                                departments?.map((item:any)=>(
                                    <option value={item.DepartmentID}>{item.DepartmentID}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Office Hours: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                value={timeslot}
                                onChange={handleChangeTimeslot}>
                            <option value="">Select option</option>
                            {
                                timeslots?.map((item:any)=>(
                                    <option value={item.TimeslotID}>{item.Name}: {convertTime(item.StartTime)} - {convertTime(item.EndTime)}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Rank: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                value={rank}
                                onChange={handleChangeRank}>
                            <option value="">Select option</option>
                            <option value={'Associate'}>Associate Professor</option>
                            <option value={'Assistant'}>Assistant Professor</option>
                            <option value={'Instructor'}>Instructor Professor</option>
                            <option value={'Professor'}>Professor Professor</option>
                        </select>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Password: </label>
                        <input className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                               type={"text"}
                               autoComplete={'on'}
                               value={password}
                               pattern={'[A-z0-9 ]{8,16}'}
                               maxLength={16}
                               onChange={handleChangePassword}
                        />
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>First Name: </label>
                        <input className={'div-table-col'} type={'text'} value={fName} onChange={handleChangeFirstName} style={{marginLeft:"auto", marginRight:0}}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Last Name: </label>
                        <input className={'div-table-col'} type={'text'} value={lName} onChange={handleChangeLastName} style={{marginLeft:"auto", marginRight:0}}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>SSN: </label>
                        <input className={'div-table-col'} type={'text'} value={ssn}
                               pattern={'[0-9]{3}-[0-9]{2}-[0-9]{4}'}
                               onChange={handleChangeSSN} style={{marginLeft:"auto", marginRight:0}}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Phone: </label>
                        <input className={'div-table-col'} type={'tel'} value={phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleChangePhone} style={{marginLeft:"auto", marginRight:0}}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Gender: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} onChange={handleChangeGender}
                                value={gender}>
                            <option value="">Select option</option>
                            <option value={'M'}>Male</option>
                            <option value={'F'}>Female</option>
                        </select>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Honorific: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} onChange={handleChangeHonorific}
                                value={honorific}>
                            <option value="">Select option</option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                        </select>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Birthdate: </label>
                        <input className={'div-table-col'} type="date" value={birthdate} min="1940-01-01" onChange={handleChangeBirthdate}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>House Number: </label>
                        <input className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} type={'number'} value={houseNum} onChange={handleChangeHouseNum}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Street: </label>
                        <input className={'div-table-col'}  style={{marginLeft:"auto", marginRight:0}} type={'text'} value={street} onChange={handleChangeStreet}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>City: </label>
                        <input className={'div-table-col'}  style={{marginLeft:"auto", marginRight:0}} type={'text'} value={city} onChange={handleChangeCity}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>State: </label>
                        <input className={'div-table-col'}  style={{marginLeft:"auto", marginRight:0}} type={'text'} value={state} onChange={handleChangeState}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Country: </label>
                        <input className={'div-table-col'}  style={{marginLeft:"auto", marginRight:0}} disabled={true} type={'text'} value={country} onChange={handleChangeCountry}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Zip: </label>
                        <input className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} type={'number'}
                               pattern={'[0-9]{5}'} value={zip} onChange={handleChangeZip}/>
                    </div>
                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <div style={{margin:"auto"}}><button type={'submit'} disabled={disableSubmit()}>Create</button></div>
                        <div style={{margin:"auto"}}><button type={'button'} onClick={changePage}>Cancel</button></div>
                    </div>
                </div>

                </fieldset>
                </form>
            </div>

        </Fragment>
    }

    return (
        <Fragment>
            <h1>Create Faculty</h1>
            {displayEditOptions()}
        </Fragment>
    );
}

export default CreateUserFaculty;