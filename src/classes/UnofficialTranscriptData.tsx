import React from "react";
import {queryAllByAltText} from "@testing-library/react";

class CoursePrereqs {

    fullTranscript: any[] = [];

    transcript: Transcript;

    constructor(data:any | null) {
        this.parseFullData(data);
        this.transcript = new Transcript(this.fullTranscript);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const {StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints} = row;
            this.fullTranscript.push({StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints})
            console.log("Found", {StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints})
        });

        //this.print();
    }

    print() {
        console.log(this.transcript?.print())
    }

}

export class Transcript {
    terms: TranscriptTerm[] = [];

    constructor(data:any) {
        if(this.terms?.length == 0 && data?.length > 0) {
            console.log("Creating first")
            const {StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints} = data[0];
            this.terms.push(new TranscriptTerm({StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints}));
            console.log("first", this.terms[0])
        }
        for(let i = 1; i < data?.length; i++) {
            const {StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints} = data[i];
            console.log("using", data[i], this.terms.includes(data[i].semesterID), data[i].SemesterID);

            var isFound = false;
            for(let j  = 0; !isFound && j < this.terms?.length; j++) {
                console.log("comparing", this.terms[j]?.semesterID, data[i]?.SemesterID)
                if(this.terms[j]?.semesterID == data[i]?.SemesterID) {
                    console.log("Add to existing")
                    this.terms[j]?.addCourse({StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints});
                    isFound = true;
                }
            }
            if(!isFound) {
                console.log("adding")
                this.terms.push(new TranscriptTerm({StudentID, Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints}));
            }
        }
    }

    calcGPA(i:number):number {
        let total = 0;
        this.terms.map((t:TranscriptTerm, index:number)=>(
            (index<=i) ?
                total += t.calcGPA()
                : total += 0
        ))
        let avg = (total / (i+1));
        console.log("sum", total, "end", (i+1), "gpa", avg);
        console.log('---')
        return avg;
    }
    calcQualityHours(i:number):number {
        let total = 0;
        this.terms.map((t:TranscriptTerm, index:number)=>(
            (index<=i) ?
                total += t.calcQualityHours()
                : total += 0
        ))
        let avg = (total / (i+1));
        console.log("sum", total, "end", (i+1), "gpa", avg);
        console.log('---')
        return avg;
    }
    calcGPAHours(i:number):number {
        let total = 0;
        this.terms.map((t:TranscriptTerm, index:number)=>(
            (index<=i) ?
                total += t.calcGPAHours()
                : total += 0
        ))
        let avg = (total / (i+1));
        console.log("sum", total, "end", (i+1), "gpa", avg);
        console.log('---')
        return avg;
    }
    calcPassedHours(i:number):number {
        let total = 0;
        this.terms.map((t:TranscriptTerm, index:number)=>(
            (index<=i) ?
                total += t.calcPassedHours()
                : total += 0
        ))
        let avg = (total / (i+1));
        console.log("sum", total, "end", (i+1), "gpa", avg);
        console.log('---')
        return avg;
    }

    calcEarnedHours(i:number):number {
        let total = 0;
        this.terms.map((t:TranscriptTerm, index:number)=>(
            (index<=i) ?
                total += t.calcPassedHours()
                : total += 0
        ))
        let avg = (total / (i+1));
        console.log("sum", total, "end", (i+1), "gpa", avg);
        console.log('---')
        return avg;
    }

    calcAttemptHours(i:number):number {
        let total = 0;
        this.terms.map((t:TranscriptTerm, index:number)=>(
            (index<=i) ?
                total += t.calcAttemptHours()
                : total += 0
        ))
        let avg = (total / (i+1));
        console.log("sum", total, "end", (i+1), "gpa", avg);
        console.log('---')
        return avg;
    }

    print() {
        this.terms.map((t:any)=> (
            console.log(t.print())
        ))
    }
}

export class TranscriptTerm {

    semesterID: string = "NA";
    year: number = 0;
    term: string = "NA";
    courses: TranscriptCourse[] = [];

    constructor(data:any) {
        const {Name, CourseID, ID, GradeID, SemesterID, Term, Year, GPA, CreditHours, QualityPoints} = data;
        this.semesterID = SemesterID;
        this.year = Year;
        this.term = Term;
        this.addCourse({Name, CourseID, ID, GradeID, GPA, CreditHours, QualityPoints});
    }

    addCourse(data:any) {
        const {Name, CourseID, ID, GradeID, GPA, CreditHours, QualityPoints} = data;
        this.courses.push(new TranscriptCourse({Name, CourseID, ID, GradeID, GPA, CreditHours, QualityPoints}))
    }

    print() {
        console.log(this.semesterID, this.year, this.term);
        this.courses?.map((c:any)=> (
            console.log(c.print())
        ))
    }

    calcAttemptHours():number {
        let total = 0;
        this.courses.map((c:TranscriptCourse)=>(
            total += c.creditHours
        ))
        return total;
    }

    calcPassedHours():number {
        let total = 0;
        this.courses.map((c:TranscriptCourse)=>(
            c.qualityPoints <= 7 ? total += c.creditHours : total +=0
        ))
        return total;
    }

    calcEarnedHours():number {
        let total = 0;
        this.courses.map((c:TranscriptCourse)=>(
            c.qualityPoints < 13 ? total += c.creditHours : total+=0
        ))
        return total;
    }

    calcGPAHours():number {
        let total = 0;
        this.courses.map((c:TranscriptCourse)=>(
            total += c.creditHours
        ))
        return total;
    }

    calcQualityHours():number {
        let total = 0;
        this.courses.map((c:TranscriptCourse)=>(
            total += c.creditHours
        ))
        return total;
    }

    calcGPA():number {
        let total = 0;
        this.courses.map((c:TranscriptCourse)=>(
            total += c.qualityPoints
        ))
        total /= this.courses.length;
        return total;
    }

    hasFinalGrade() {
        let isFinalGrade = false;
        for(let i = 0; !isFinalGrade && i < this.courses.length; i++) {
            isFinalGrade = this.courses[i].qualityPoints >= 13
        }
        return isFinalGrade;
    }
}

export class TranscriptCourse {

    course: string = "NA";
    title:string = "NA";
    grade:string="NA";
    gradeVal:number=0;
    gpa: number=0;
    creditHours:number=0;
    qualityPoints:number=0;

    constructor(data:any) {
        const {Name, CourseID, ID, GradeID, GPA, CreditHours, QualityPoints} = data;
        this.course = CourseID;
        this.title = Name;
        this.grade = GradeID;
        this.gradeVal = parseInt(ID);
        this.gpa = parseInt(GPA);
        this.creditHours = parseInt(CreditHours);
        this.qualityPoints = parseInt(QualityPoints);
    }

    print() {
        console.log(this.course, this.title, this.grade, this.gradeVal, this.creditHours, this.qualityPoints)
    }
}

export default CoursePrereqs;