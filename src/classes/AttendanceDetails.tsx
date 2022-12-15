import React from "react";


class AttendanceDetails {

    students: StudentAttendance[];

    constructor(data:any | null) {
        this.students = [];
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any) => {
            const { StudentID, MeetingNumber, Status} = row;

            let index = this.students.findIndex((s:StudentAttendance) => s.studentID === StudentID);
            if(index === -1)
                this.students.push(new StudentAttendance({StudentID, MeetingNumber, Status}));
            else
                this.students?.at(index)?.registerMeeting({MeetingNumber, Status});
            // this.students.map((s:any)=>(
            //     s.studentID === StudentID ?
            //         s.registerMeeting({MeetingNumber, Status}):
            //         this.students.push(new StudentAttendance({StudentID, MeetingNumber, Status}))
            // ))
        });
    }

    updateMeeting(sID:number, meetNum:number, status:number) {
        this.students.map((s:StudentAttendance)=>(
            s.studentID == sID ? s.updateMeeting(meetNum, status) : ""
        ))
    }

    print() {
        console.log("Printing attendance")
        this.students?.map((item: any) => {
            console.log(item);
        });
    }

}

export class StudentAttendance {

    studentID: any;
    attendance: Attendance[];

    constructor(data:any | null) {
        const {StudentID, MeetingNumber, Status} = data;
        this.studentID = StudentID;
        this.attendance = [];
        this.registerMeeting({MeetingNumber, Status});
    }

    registerMeeting(data:any){
        this.attendance.push(new Attendance(data));
    }

    updateMeeting(meetNum:number, status:number) {
        console.log("Student Match")
        this.attendance.map((a:Attendance) => (
            a.meetNum == meetNum ?a.update(status) : ""
        ))
    }
}

export class Attendance {

    meetNum: number = 0;
    status: number = 0;

    constructor(data: any | null) {
        const {MeetingNumber, Status} = data;
        this.meetNum = MeetingNumber;
        this.status = Status?Status:this.status;
    }

    update(status: number) {
        console.log("Meeting match")
        this.status= status;
    }
}

export default AttendanceDetails;