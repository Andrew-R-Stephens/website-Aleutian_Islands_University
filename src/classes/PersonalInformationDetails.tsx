import React, {useState} from "react";

class PersonalInformationDetails {

    info: any;
    addr: string = "";

    constructor(data:any | null) {
        console.log("in:", data)
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        const {AddrCi, AddrCo, AddrHN, AddrSta, AddrStr, AddrZip,
            BDate, FirstN, Gender,  Honorific, LastN, PhoneN, SSN, UID, Email} = data;
        this.info = {AddrCi, AddrCo, AddrHN, AddrSta, AddrStr, AddrZip,
            BDate, FirstN, Gender,  Honorific, LastN, PhoneN, SSN, UID, Email};
        this.addr = this.info.AddrHN + " " + this.info.AddrStr + " " +
            this.info.AddrCi + ", " + this.info.AddrSta + ", " + this.info.AddrCo;
    }

    print() {
        console.log("final:" ,this.info);
    }
}

export default PersonalInformationDetails;