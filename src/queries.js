//import React from "react";
//import {useIsFetching, useMutation, useQuery} from "react-query";

const mysql = require('mysql');

function connect() {
    const con = mysql.createConnection({
        host: "systems-db.co5qlhtrnw14.us-east-1.rds.amazonaws.com",
        port: "3306",
        user: "admin",
        password: "systemsdb",
        database: "SystemsDesignDB"
    });

    con.connect(function (err) {
        if (err) {
            console.error('Connection failed: ' + err.stack);
            return;
        }
        console.log('Connection successful.');
    });

    return con;
}

export async function testQuery() {
    const con = connect();

    con.query("SELECT * FROM Person", function (err, result, fields) {
        if(err) {
            return err;
        }
        console.log(result);
    });
}
/*

export async function fetchPersons() {
    const res = await fetch('/data.json');
    return res.json();
}

export function getPersons() {
    const {data, status} = useQuery('persons', fetchPersons);
/!*

    const mutation = useMutation({
        onSuccess: (queryClient) => {
            queryClient.invalidateQueries('persons')
        }
    })
*!/

    if(status === 'loading') {
        return <p>Loading...</p>;
    }

    if(status === 'error') {
        return <p>Error!</p>;
    }

    return (
        <ul>
            {data.map((person) => (
                <li key={person.firstName}>{person.lastName}</li>
            ))}

            { useIsFetching && <p>Refreshing data...</p>}
        </ul>
    )
}*/
