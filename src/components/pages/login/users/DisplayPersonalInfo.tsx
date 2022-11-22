import React, {Fragment, useEffect, useState} from 'react';
import '../../../../css/DisplayInfo.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../../../../stores/user-store';
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";

function DisplayPersonalInfo(props:any) {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const roleStoreID = RoleAuthStore((state:any) => state.authRole);

    const {externalUID} = props;

    const [userID, setID] = useState(externalUID?externalUID:userStoreID);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [phone, setPhoneNum] = useState();
    const [gender, setGender] = useState();
    const [honorific, setHonorific] = useState();
    const [birthdate, setBirthDate] = useState();
    const [addrHN, setAddrHouseNum] = useState();
    const [addrStr, setAddrStreet] = useState();
    const [addrCi, setAddCity] = useState();
    const [addrSta, setAddState] = useState();
    const [addrCo, setAddCountry] = useState();
    const [addrZip, setZipCode] = useState();

    const [sectionNum_about, setSectionNum_about] = useState(0);

    enum Sections_About {
        Overview=0,
        Residence,
        ContactInfo
    }

    useEffect(() => {
        initUserData().then(() => console.log('Axios request succeeded.'));
    }, [userID]);

    async function initUserData() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "standard",
                uid : userID
            }
        }).then(res => {

            const {
                FirstN, LastN, PhoneN, Gender, Honorific, BDate,
                AddrHN, AddrStr, AddrCi, AddrSta, AddrCo, AddrZip
            } = res.data;

            console.log(res.data);

            setFName(FirstN);
            setLName(LastN);
            setPhoneNum(PhoneN);
            setGender(Gender);
            setHonorific(Honorific);
            setBirthDate(BDate);
            setAddrHouseNum(AddrHN);
            setAddrStreet(AddrStr);
            setAddCity(AddrCi);
            setAddState(AddrSta);
            setAddCountry(AddrCo);
            setZipCode(AddrZip);

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function updateSectionNum_about(index:number) {
        console.log(index);
        setSectionNum_about(Sections_About.Overview)
    }

    return (
        <Fragment>
            <div className={'display-info'}>
                <div className={'cover'}>
                    <div className={'profile-image'}></div>
                    <div className={'nameplate-section'}>
                        <div className={'nameplate'}>{firstName} {lastName}</div>
                    </div>
                </div>
                <div className={'main-section'}>
                    <div className={'options-left'}>
                        <div className={'wrapper'}>
                            <label className={'section-label'}>About</label>
                            <button className={'default-button'} onClick={() => updateSectionNum_about(Sections_About.Overview)}><label className={'default-label'}>Overview</label></button>
                            <button className={'default-button'} onClick={() => updateSectionNum_about(Sections_About.Residence)}><label className={'default-label'}>Residence</label></button>
                            <button className={'default-button'} onClick={() => updateSectionNum_about(Sections_About.ContactInfo)}><label className={'default-label'}>Contact Info</label></button>
                        </div>
                    </div>
                    <div className={'display-right'}>

                    </div>
                </div>


            </div>
        </Fragment>
    );
}

export default DisplayPersonalInfo;
