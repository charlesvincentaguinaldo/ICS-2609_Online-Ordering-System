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
    let sql = 'SELECT * FROM products';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd() + '/admin/pages/products', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})

.get('/addProducts', (req, res)=>{
            res.render(process.cwd() + '/admin/pages/addProducts');
})

.get('/delProducts', (req, res)=>{
    let sql = 'SELECT * FROM products';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd()  + '/admin/pages/delProducts', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})


.post("/addProducts/send-product",(req,res)=>{
    let prod = req.body.product,
    price = req.body.price;
    let sql = "INSERT INTO foodorder.products (" + 
    "description, " + 
    "price) VALUES (" +
    con.escape(prod) + ',' +
    con.escape(price) + ')';
    con.query(sql, (err,result) => {
        if(!err){
            res.redirect('/p');
        }
        else{
            res.json(req.body);
            return;
        }
    })
})

.post("/delProducts/del-data",(req,res)=>{
    let id = req.body.foodID;
    let sql = "DELETE FROM foodorder.products WHERE food_id=" + id;
    con.query(sql, (err,result) => {
        if(!err){
            res.redirect('/p');
        }
        else{
            res.json(req.body);
            throw err;
        }
    })
});
module.exports = router;