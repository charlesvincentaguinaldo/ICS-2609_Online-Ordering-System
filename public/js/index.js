const express = require('express');
const mysql2 = require('mysql2');
const morgan = require('morgan');
const { SlimNodeMySQL } = require('slim-node-mysql');

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

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .post("/details", (req,res)=>{
        res.json(req.body);
    });

    
app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});
 module.exports = app;