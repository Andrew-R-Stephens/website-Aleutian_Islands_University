import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../css/DisplayInfo.css';
import axios from "axios";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../stores/AuthUserStore";
import PersonalInformationDetails from "../../../../../classes/PersonalInformationDetails";

function DisplayPersonalInfo(props:any) {

    const {targetUID, targetRole} = props;
    console.log(props)

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [personalInformation, setPersonalInformation] = useState<PersonalInformationDetails>();

    const [sectionNum_about, setSectionNum_about] = useState(0);

    enum Sections_About {
        Overview=0,
        Residence,
        Education,
        ContactInfo
    }

    useEffect(() => {
        initUserData().then(() => console.log('Axios request succeeded.'));
    }, [userID]);

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

    function updateSectionNum_about(index:number) {
        console.log(index);
        setSectionNum_about(index)
    }

    function displaySelectedAboutSection() {
        switch (sectionNum_about){
            case Sections_About.Education: {
                return displayEducationInfo();
            }
            case Sections_About.Residence: {
                return displayResidenceInfo();
            }
            case Sections_About.ContactInfo: {
                return displayContactInfo();
            }
            default: {
                return displayOverviewInfo();
            }
        }
    }

    function displayOverviewInfo() {
        return <Fragment>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Name:</label>
                <label>{personalInformation?.info.Honorific} {personalInformation?.info.LastN}, {personalInformation?.info.FirstN}</label>
            </div>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Role:</label>
                <label>{personalInformation?.user.UserType}, {personalInformation?.user.Time} {personalInformation?.user.Rank}</label>
            </div>
            <hr style={{borderColor:"#555555"}}/>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Lives in:</label>
                <label>{personalInformation?.info.AddrCi}, {personalInformation?.info.AddrSta}</label>
            </div>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Gender:</label>
                <label>{personalInformation?.info.Gender==="M" ? "Male":"Female" }</label>
            </div>
        </Fragment>
    }

    function displayEducationInfo() {
        return <Fragment>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Role:</label>
                <label>{personalInformation?.user.UserType}</label>
            </div>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>{personalInformation?.user.UserType} Type:</label>
                <label>{personalInformation?.user.Rank}</label>
            </div>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Time:</label>
                <label>{personalInformation?.user.Time}</label>
            </div>
        </Fragment>
    }

    function displayResidenceInfo() {
        return <Fragment>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Address:</label>
                <label>{personalInformation?.info.AddrHN} {personalInformation?.info.AddrStr} Street, {personalInformation?.info.AddrCi}</label>
            </div>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Region:</label>
                <label>{personalInformation?.info.AddrSta}, {personalInformation?.info.AddrCo}</label>
            </div>
            <div className={'display-right-content'}>
                <label style={{fontWeight:"bold", paddingRight:8}}>Postal Code:</label>
                <label>{personalInformation?.info.AddrZip}</label>
            </div>
        </Fragment>
    }

    function displayContactInfo() {
        return (
            <Fragment>
                <div className={'display-right-content'}>
                    <label style={{fontWeight:"bold", paddingRight:8}}>Phone:</label><label>{personalInformation?.info.PhoneN}</label>
                </div>
                <div className={'display-right-content'}>
                    <label style={{fontWeight:"bold", paddingRight:8}}>Email:</label><label>{personalInformation?.info.Email}</label>
                </div>
        </Fragment>);
    }

    function displayEditButton() {
        return (
            userStoreRole === AuthRole.Primary_Administrator || targetUID === userStoreID
        )
    }

    return (
        <Fragment>
            <div className={'display-info'}>
                <div className={'cover'}>
                    <div className={'profile-image'}></div>
                    <div className={'nameplate-section'}>
                        <div className={'nameplate'}>{personalInformation?.info.FirstN} {personalInformation?.info.LastN}</div>
                    </div>
                </div>
                <div className={'main-section'}>
                    <div className={'options-left'}>
                        <div className={'wrapper'}>
                            <label className={'section-label'}>About</label>
                            <button className={'default-button'}
                                    role={sectionNum_about===Sections_About.Overview?'active':'inactive'}
                                    onClick={() => updateSectionNum_about(Sections_About.Overview)}>
                                <label className={'default-label'}>Overview</label></button>

                            <button className={'default-button'}
                                    role={sectionNum_about===Sections_About.Education?'active':'inactive'}
                                    onClick={() => updateSectionNum_about(Sections_About.Education)}>
                                <label className={'default-label'}>Education</label></button>

                            <button className={'default-button'}
                                    role={sectionNum_about===Sections_About.Residence?'active':'inactive'}
                                    onClick={() => updateSectionNum_about(Sections_About.Residence)}>
                                <label className={'default-label'}>Residence</label></button>

                            <button className={'default-button'}
                                    role={sectionNum_about===Sections_About.ContactInfo?'active':'inactive'}
                                    onClick={() => updateSectionNum_about(Sections_About.ContactInfo)}>
                                <label className={'default-label'}>Contact Info</label></button>
                        </div>
                    </div>
                    <div className={'display-right'}>
                        {displaySelectedAboutSection()}
                    </div>

                    {
                        displayEditButton() ?
                        <div>
                            <button onClick={() => props.pageFun()}>Edit</button>
                        </div> : <Fragment/>
                    }
                </div>

            </div>
        </Fragment>
    );
}

export default DisplayPersonalInfo;
