import React from "react";
import {Logic, PrereqGroup, PrereqMaster} from "./CoursePrereqs";
import StudentHistory, {Course} from "./StudentHistory";

class PrereqComparable {

    master: PrereqMaster|undefined;

    constructor(master: PrereqMaster | undefined) {
        this.master = master;
    }

    isSatisfied(studentHistory: StudentHistory | undefined) {
        if(!studentHistory) {
            console.log("Empty student History");
            return false;
        }
        if(!this.master|| this.master?.groups.length == 0) {
            console.log("Empty Prereq Master -- defaulting OK");
            return true;
        }

        console.log("Proceeding to check");

        return this.compare(studentHistory);
    }

    compare(sh:StudentHistory) {
        const usedCourses:Course[] = [];

        const gMinCount =
            this.master?.logic === Logic.AND ?
                this.master?.groups?.length
                : 1
        let gTotal = 0;

        this.master?.groups?.map((g:PrereqGroup)=>{
            const pMinCount = g.logic === Logic.AND ? g.prereqs?.length : 1
            let pTotal = 0;

            let found = false;
            for(let i = 0; !found && i < g?.prereqs?.length; i++) {
                const p = g?.prereqs[i];
                for(let k = 0; !found && k < sh?.master?.courses?.length; k++) {
                    const c = sh?.master?.courses[k];
                    if(c.courseID === p.courseID && !usedCourses.includes(c)) {
                        pTotal += 1;
                        usedCourses.push(c);
                        console.log("Found:", c.courseID, p.courseID)
                        if(pTotal >= pMinCount) {
                            found = true;
                        }
                    }
                }
            }
            console.log("Prereq Totals ->", "Required", pMinCount,"Total", pTotal)
            if(pTotal >= pMinCount) {
                gTotal += 1;
            }
        })
        console.log("Group Totals ->", "Required", gMinCount,"Total", gTotal)

        return gTotal >= gMinCount;
    }
}

export default PrereqComparable;