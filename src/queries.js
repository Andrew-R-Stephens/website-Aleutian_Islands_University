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