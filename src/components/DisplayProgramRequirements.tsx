import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import './../css/RequestTable.css';
import {TablePagination, TableSortLabel} from "@mui/material";
import ProgramReqs_1 from '../res/Program_1_ReqTest.json'
import ProgramReqs_15 from '../res/Program_15_ReqTest.json'
import ProgramRequirements from "./ProgramRequirements";

function DisplayProgramRequirements() {

    var data = ProgramReqs_15;
    console.log(data);

    const [programID, setProgramID] = useState(-1);

    const[programRequirements, setProgramRequirements] = useState(new ProgramRequirements());

    useEffect(() => {

    }, [])

    useEffect(()=> {
        var section = new ProgramRequirements();
        parseData(section);
        setProgramRequirements(section);
        section.print();
    }, [])

    useEffect(()=> {
        programRequirements.print();
    }, [programRequirements])

    function parseData(section: ProgramRequirements) {
        data?.map((row: any, key: number) => {
            section.parsetoGroup(row);
        });
        return ProgramRequirements;
    }

    function renderParsedAdvanced():any {
        return programRequirements.renderAdvanced();
    }

    return (
        <Fragment>
            <h1>Display of Accounting Program</h1>
            <div style={{ width: "50vw", marginLeft: "auto", marginRight: "auto"}}>
                {renderParsedAdvanced()}
            </div>
        </Fragment>);

}

export default DisplayProgramRequirements;
