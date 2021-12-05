const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const app = express();

const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "foodorder",
    timezone: 'Z'
});

app.set('view engine', 'ejs')
.use(express.static('admin'));

router

.get('/', (req, res)=>{
    let sql = 'SELECT * FROM admin';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd()  + '/admin/pages/viewAdmins', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})

.get('/addAdmins', (req, res)=>{
    res.render(process.cwd() + '/admin/pages/addAdmins');
})

.get('/delAdmins', (req, res)=>{
    let sql = 'SELECT * FROM admin';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd()  + '/admin/pages/delAdmins', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})


.post("/addAdmins/send-data",(req,res)=>{
    let name = req.body.admin,
    user = req.body.username,
    pass = req.body.password;
    let sql = "INSERT INTO foodorder.admin (" + 
    "full_name, " + 
    "username, password) VALUES (" +
    con.escape(name) + ',' +
    con.escape(user) + ',' +
    con.escape(pass) + ')';

    con.query(sql, (err,result) => {
        if(!err){
            res.redirect('/a');
        }
        else{
            res.json(req.body);
            return;
        }
    })
})

.post("/delAdmins/del-data",(req,res)=>{
    let id = req.body.adminID;
    let sql = "DELETE FROM foodorder.admin WHERE admin_id=" + id;
    con.query(sql, (err,result) => {
        if(!err){
            res.redirect('/a');
        }
        else{
            res.json(req.body);
            return;
        }
    })
})

module.exports = router;