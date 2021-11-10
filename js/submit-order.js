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


app.post("/details", (req,res)=>{
    let sql = "INSERT INTO orders SET ?";
    con.query(sql, newRow, (err,result) => {
        if(!err){
            res.send(result);
        }
        else{
            res.send("failed to insert to order form table...");
            throw err;
        }
    })
});

app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});