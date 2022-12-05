import React, {Fragment, useEffect, useState} from 'react';
import '../../../../css/DisplayInfo.css';
import axios from "axios";
import '../../../../stores/user-store';
import {RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";
import PersonalInformationDetails from "../../../../classes/PersonalInformationDetails";

function EditPersonalInfo(props:any) {

    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [personalInformation, setPersonalInformation] = useState<PersonalInformationDetails>();
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [honorific, setHonorific] = useState();
    const [birthdate, setBirthdate] = useState();
    const [houseNum, setHouseNum] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [zip, setZip] = useState();

    useEffect(() => {
        initUserData().then(() => console.log('Axios request succeeded.'));
    }, [userID]);

    useEffect(() => {
        setFName(personalInformation?.info?.FirstN)
        setLName(personalInformation?.info?.LastN)
        setPhone(personalInformation?.info?.PhoneN)
        setGender(personalInformation?.info?.Gender)
        setHonorific(personalInformation?.info?.Honorific)
        setBirthdate(personalInformation?.info?.BDate)
        setHouseNum(personalInformation?.info?.AddrHN)
        setStreet(personalInformation?.info?.AddrStr)
        setCity(personalInformation?.info?.AddrCi)
        setState(personalInformation?.info?.AddrSta)
        setCountry(personalInformation?.info?.AddrCo)
        setZip(personalInformation?.info?.AddrZip)
    }, [personalInformation])

    async function initUserData() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "getPersonalInformation",
                uid : userID
            }
        }).then(res => {
            setPersonalInformation(new PersonalInformationDetails(res.data));
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function updateUserPersonalInformation() {
        await axios.post(process.env["REACT_APP_API_USER"] as string, {
            params: {
                post: "updateUserPersonalInformation",
                uid: userID,
                fName,
                lName,
                phone,
                gender ,
                honorific,
                birthdate,
                houseNum,
                street,
                city,
                state,
                country,
                zip
            }
        }).then(res => {
            const{status='Failed'} = res.data;
            console.log("Res: ", res.data, "Status: ", res.data.toJSON)
            initUserData().then(() => console.log('Redraw request succeeded.'));
        }).catch(function(err) {
            console.log(err.message);
        })
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

    function handleSubmit() {
        updateUserPersonalInformation().then(r=>console.log("Requesting updates"));
    }

    function displayEditOptions() {
        return <Fragment>
            <h1>Edit Profile</h1>
            <div>
                <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                    <fieldset>
                        <div style={{display:"inline-block", textAlign:'left'}}>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>First Name: </label>
                                <input className={'div-table-col'} type={'text'} value={fName} onChange={handleChangeFirstName} style={{marginLeft:"auto", marginRight:0}}/>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Last Name: </label>
                                <input className={'div-table-col'} type={'text'} value={lName} onChange={handleChangeLastName} style={{marginLeft:"auto", marginRight:0}}/>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Phone: </label>
                                <input className={'div-table-col'} type={'tel'} value={phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleChangePhone} style={{marginLeft:"auto", marginRight:0}}/>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Gender: </label>
                                {/*<input type={'text'} value={gender} onChange={handleChangeGender}/>*/}
                                <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} onChange={handleChangeGender}>
                                    <option value={'M'}>Male</option>
                                    <option value={'F'}>Female</option>
                                </select>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Honorific: </label>
                                {/*<input type={'text'} value={honorific} onChange={handleChangeHonorific}/>*/}
                                <select className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} onChange={handleChangeHonorific}>
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Mrs.</option>
                                </select>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                                <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Birthdate: </label>
                                {/*<input type={'text'} value={birthdate} onChange={handleChangeBirthdate}/>*/}
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
                                <input className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}} type={'number'} value={zip} onChange={handleChangeZip}/>
                            </div>
                            <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", margin:16}}>
                                <button className={'div-table-col'} type={"submit"}>Apply</button>
                                <button className={'div-table-col'} style={{marginLeft: 16}} onClick={()=>props.backFun()}><label>Back</label></button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </Fragment>
    }

    return (
        <Fragment>
            <div>
                {displayEditOptions()}
            </div>
        </Fragment>
    );
}

export default EditPersonalInfo;
