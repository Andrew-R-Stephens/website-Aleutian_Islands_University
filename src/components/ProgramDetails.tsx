import React from "react";
import {red} from "@mui/material/colors";

class ProgramDetails {

    name: any;
    totalCredits: any;
    programType: any;
    departments: any[];
    schools: any[];

    constructor(data:any | null) {
        this.departments = [];
        this.schools = [];
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const { ProgramName, ProgramTypeID, MinCredits, DepartmentID, SchoolID } = row;
            this.name = ProgramName;
            this.totalCredits = MinCredits;
            this.programType = ProgramTypeID;
            if (!this.departments.includes(DepartmentID)) {
                this.departments.push(DepartmentID);
            }
            if (!this.schools.includes(SchoolID)) {
                this.schools.push(SchoolID);
            }
        });
    }

    print() {
        console.log(this.name, this.totalCredits);
        this.departments?.map((item: any, key: any) => {
            console.log(item);
        });
    }

    renderAdvanced():any {
        return (
            <div>
                <div>
                    <h1>{this.name}, ({this.programType})</h1>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 500}}>
                    <div style={{textAlign:"left"}}>
                        <div style={{marginBottom:8}}>
                            <label style={{textAlign:"left", fontWeight: "bold", fontSize: 16}}>Total Credits: </label>
                            <label style={{textAlign:"left", fontWeight: "normal"}}>{this.totalCredits}</label>
                        </div>
                        <div style={{marginBottom:8}}>
                            <label style={{fontSize:18, fontWeight: "bold"}}>Departments</label>
                            {this.departments?.map((department: any, key: number) => (
                                <div style={{marginBottom:2}}>
                                    <div style={{textAlign: "left", marginLeft: 16}}>
                                        <div style={{display: "flex"}}>
                                            <label style={{fontSize: 14}}>{department}</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{marginBottom:8}}>
                            <label style={{fontSize:18, fontWeight: "bold"}}>Schools</label>
                            {this.schools?.map((school: any, key: number) => (
                                <div style={{marginBottom:2}}>
                                    <div style={{textAlign: "left", marginLeft: 16}}>
                                        <div style={{display: "flex"}}>
                                            <label style={{fontSize: 14}}>{school}</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default ProgramDetails;