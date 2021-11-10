//connect node app
const express = require('express');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3000;
const app = express();

//connect node app with MySQL server
const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "foodorder",
});

con.connect((err) => {
    if (!err){
        console.log("connected to MySQL server at port 3306...");
    }
    else{
        console.log("error in port");
        throw err;
    }
});

//create database
app.get("/create-db", (req,res)=>{
    let sql = "CREATE DATABASE foodorder";
    con.query(sql, (err,result) => {
        if(!err){
            res.send("successfully created the school database..");
        }
        else{
            res.send("failed to create school database...");
            throw err;
        }
    })
});

app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});