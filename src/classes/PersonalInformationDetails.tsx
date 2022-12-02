import React from "react";

class PersonalInformationDetails {

    info: any;
    addr: string = "";
    user: any;

    constructor(data:any | null) {
        console.log("in:", data)
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        const {
            AddrCi, AddrCo, AddrHN, AddrSta, AddrStr, AddrZip,
            BDate, FirstN, Gender,  Honorific, LastN, PhoneN, SSN, UID, Email,
            UserType, Rank, Time
        } = data;
        this.info = {AddrCi, AddrCo, AddrHN, AddrSta, AddrStr, AddrZip,
            BDate, FirstN, Gender,  Honorific, LastN, PhoneN, SSN, UID, Email};
        this.user = {UserType, Rank, Time};
        this.addr = this.info.AddrHN + " " + this.info.AddrStr + " " +
            this.info.AddrCi + ", " + this.info.AddrSta + ", " + this.info.AddrCo;
    }

    print() {
        console.log("final:" ,this.info);
    }
}

export default PersonalInformationDetails;