import React, {Fragment, useEffect, useState} from "react";
import {RoleAuthStore, UserAuthStore} from "../../../../../../../stores/AuthUserStore";
import PersonalInformationDetails from "../../../../../../../classes/PersonalInformationDetails";
import axios from "axios";

function CreateUserStudent(props:any) {
    const {changePage, createUser} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);

    const [userType, setUserType] = useState<string>("Student");
    const [subType, setSubType] = useState<string>('');
    const [gradType, setGradType] = useState<string|undefined>();
    const [time, setTime] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [ssn, setSSN] = useState<string>();
    const [fName, setFName] = useState<string>();
    const [lName, setLName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [gender, setGender] = useState<string>();
    const [honorific, setHonorific] = useState<string>();
    const [birthdate, setBirthdate] = useState<string>();
    const [houseNum, setHouseNum] = useState<string>();
    const [street, setStreet] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();
    const [country, setCountry] = useState<string>('United States');
    const [zip, setZip] = useState<number>();

    const handleChangeUserType = (event:any) => {
        event.preventDefault();
        setUserType(event.target.value);
    }

    const handleChangeSubType = (event:any) => {
        event.preventDefault();
        setSubType(event.target.value);
        setGradType(undefined);
    }

    const handleChangeTime = (event:any) => {
        event.preventDefault();
        setTime(event.target.value);
    }

    const handleChangeGradType = (event:any) => {
        event.preventDefault();
        setGradType(event.target.value);
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

    function displayGraduateLevel() {
        switch(subType) {
            case 'Graduate': {
                return (
                    <select className={'div-table-col'} style={{marginLeft: "auto", marginRight: 0}}
                            value={gradType}
                            onChange={handleChangeGradType}>
                        <option value="">Select option</option>
                        <option value={'Masters'}>Masters</option>
                        <option value={'Ph.D.'}>Ph.D.</option>
                    </select>
                );
            }
            default: {
                return (
                    <select className={'div-table-col'} style={{marginLeft: "auto", marginRight: 0}}
                            value={''} disabled={true}
                            onChange={handleChangeGradType}>
                        <option value="">Select option</option>
                    </select>
                );
            }
        }

    }

    const handleSubmit = (event:any) => {
        props.createUser({
            userType, subType, gradType, time, password, ssn, fName, lName, phone,
            gender, honorific, birthdate, houseNum, street, city, state, country, zip
        });
    }

    function disableSubmit() {
        return !(userType && subType && (subType === 'Graduate'? gradType: !gradType) && time && password && ssn && fName && lName && phone &&
            gender && honorific && birthdate && houseNum && street && city && state && country && zip)
    }

    function displayEditOptions() {
        return <Fragment>
            <div>
                <div style={{display:"inline-block", textAlign:'left'}}>
                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>User Type: </label>
                        <input className={'div-table-col'} type={'text'} value={userType} disabled={true}
                               onChange={handleChangeUserType} style={{marginLeft:"auto", marginRight:0}}/>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Student Type: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                value={subType}
                                onChange={handleChangeSubType}>
                            <option value="">Select option</option>
                            <option value={'Undergraduate'}>Undergraduate</option>
                            <option value={'Graduate'}>Graduate</option>
                        </select>
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Graduate Level: </label>
                        {displayGraduateLevel()}
                    </div>

                    <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Student Time: </label>
                        <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}
                                value={time}
                                onChange={handleChangeTime}>
                            <option value="">Select option</option>
                            <option value={'Full Time'}>Full Time</option>
                            <option value={'Part Time'}>Part Time</option>
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
                               pattern={'[0-9]{5}'}
                               value={zip} onChange={handleChangeZip}/>
                    </div>
                    <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                        <div style={{margin:"auto"}}><button type={'submit'} disabled={disableSubmit()}>Create</button></div>
                        <div style={{margin:"auto"}}><button type={'button'} onClick={changePage}>Cancel</button></div>
                    </div>
                </div>
            </div>
        </Fragment>
    }

    return (
        <Fragment>
            <h1>Create Student</h1>
            <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                <fieldset>
                    {displayEditOptions()}

                </fieldset>
            </form>

        </Fragment>
    );
}

export default CreateUserStudent;