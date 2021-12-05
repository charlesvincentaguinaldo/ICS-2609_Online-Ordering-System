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


//read admins
app.post("/read", (req,res)=>{
    let sql = "SELECT * FROM foodorder.admin";
    con.query(sql, (err,result) => {
        if(!err){
           res.render('foodorder.admin', {title: 'details', items:rows })
        }
        else{
            res.send("failed to read admin table...");
            throw err;
        }
    })
});

//add admin
app.post("/add-admin", (req,res)=>{
    let sql = "INSERT INTO foodorder.admin (full_name, username, password) VALUES ('Carl Valencia', 'CarlVadmin', 'f00dOrd3r');";
    con.query(sql, (err,result) => {
        if(!err){
            res.send(result);
        }
        else{
            res.send("failed to add admin...");
            throw err;
        }
    })
});

//delete admin
app.post("/delete-admin", (req,res)=>{
    let sql = "DELETE FROM foodorder.admin WHERE username=('"+req.body.username+"')";
    con.query(sql, (err,result) => {
        if(!err){
            res.send(result);
        }
        else{
            res.send("failed to delete admin...");
            throw err;
        }
    })
});

//update admin
app.post("/add-admin", (req,res)=>{
    let sql = "UPDATE foodorder.admin WHERE SET VALUES ('"+req.body.full_name+"', '"+req.body.username+"', '"+req.body.password+"')' WHERE id=('"+req.body.id+"')";
    con.query(sql, (err,result) => {
        if(!err){
            res.send(result);
        }
        else{
            res.send("failed to update admin...");
            throw err;
        }
    })
});

app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});

