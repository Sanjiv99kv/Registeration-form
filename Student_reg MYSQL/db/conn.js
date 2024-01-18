const mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "student"
});

conn.connect((e)=>{
    if(!e){
        console.log('connected to mysql');
    }
    else{
        console.log(e);
    }
});

module.exports = conn;