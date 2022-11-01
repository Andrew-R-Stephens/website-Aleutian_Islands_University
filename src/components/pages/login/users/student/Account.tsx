import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import HomeNavBanner from "../../../../HomeNavBanner";
import SideBanner from "../../../../SideBanner";
import '../../../../../css/Account.css';
import HideBar from "../../../../HideBar";
import RequestTable from "../../../../RequestTable";
import "../../../../../css/RequestTable.css";
import axios from "axios";
import {UserAuthStore} from "../../../../../stores/AuthUserStore";
import sideBanner from "../../../../SideBanner";

function Account(props: any) {

    const { sideBanner = <SideBanner/>} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);

    const pages:any = [<RequestTable/>, <HideBar/>];

    const [userID, setID] = useState(userStoreID);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [ssn, setSSN] = useState();
    const [phone, setPhoneNum] = useState();
    const [gender, setGender] = useState();
    const [honorific, setHonorific] = useState();
    const [birthdate, setBirthDate] = useState();
    const [addrHN, setAddrHouseNum] = useState();
    const [addrStr, setAddrStreet] = useState();
    const [addrCi, setAddCity] = useState();
    const [addrSta, setAddState] = useState();
    const [addrCountry, setAddCountry] = useState();
    const [addrZip, setZipCode] = useState();

    const [pageIndex, setPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        initUserData().then(() => console.log('Axios request succeeded.', userID, userStoreID));
    }, [userID]);

    async function initUserData() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "standard",
                uid : userID
            }
        }).then(res => {

            const {
                UID, SSN, FirstN, LastN, PhoneN, Gender, Honorific, BDate,
                AddrHN, AddrStr, AddrCi, AddrSta, AddrCo, AddrZip
            } = res.data;

            console.log(res.data);

            setFName(FirstN);
            setLName(LastN);
            setSSN(SSN);
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
            <div className={'main-container'}>
                <HomeNavBanner urls={[]} names={[]}/>
                <div className={'main-body'}>
                    {sideBanner}
                    {/*<SideBanner
                        urls={["./", "./../profile", "./../student", "/login"]}
                        names={["Account", "Profile", "Student", "Logout"]}
                        classes={['item', 'item', 'item', 'item-last']}
                        roles={['active', 'inactive', 'inactive', 'inactive']}/>*/}
                    <div className = {'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <button onClick={() => setPage(pageIndex + 1)}>Change content</button>
                            {pages[pageIndex]}
                            <br/>
                            <div className={'plain'}>
                                <table><tbody>
                                    <tr><td><b>Name:</b></td><td>{firstName} {lastName}</td></tr>
                                    <tr><td><b>Gender:</b></td><td>{gender}</td></tr>
                                    <tr><td><b>SSN:</b></td><td>{ssn}</td></tr>
                                </tbody></table>
                            </div>
                            <br/>
                            <label><b>To Do:</b></label>
                            <ul style={{margin: "auto", maxWidth: 1080, textAlign: 'start'}}>
                                <li>Add welcome message</li>
                                <li>Add profile image on left (simple default profile pic logo with wolf  watermark)</li>
                                <li>Display data about semester</li>
                                <li>Display hyperlinks for registration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Account;