import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../css/DisplayInfo.css';
import axios from "axios";
import '../../../../stores/user-store';
import {RoleAuthStore, UserAuthStore} from "../../../../../stores/AuthUserStore";

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

    return (
        <Fragment>
            <div className={'plain'}>
            <table>
                <tbody>
                    <tr><td><b>Name:</b></td><td>{honorific} {firstName} {lastName}</td></tr>
                    <tr><td><b>Gender:</b></td><td>{gender}</td></tr>
                    <tr><td><b>Birthdate:</b></td><td>{birthdate}</td></tr>
                    <tr><td><b>Address:</b></td><td>{addrHN} {addrStr}, {addrCi}, {addrSta}, {addrCo} {addrZip}</td></tr>
                    <tr><td><b>Phone:</b></td><td>{phone}</td></tr>
                </tbody>
            </table>
        </div>
    </Fragment>
                );
}

export default DisplayPersonalInfo;
