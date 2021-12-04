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
    let sql = 'SELECT * FROM orders ORDER BY order_id DESC';
    con.query(sql, (err, result)=>{
        if(!err){
            res.render(process.cwd() + '/admin/pages/orders', {data: result});
        }
        else{
            res.status(404).send('404 PAGE NOT FOUND');
        }
    })
})

module.exports = router;