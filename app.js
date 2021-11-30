const express = require('express');
const mysql2 = require('mysql2');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();

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
    .post("/send-data", (req,res)=>{
        let order = req.body.OrderNo;
        let quantity = req.body.quantity;
        let first = req.body.fname, 
        last = req.body.lname,
        contact = req.body.Contact,
        email = "" + req.body.emailAdd,
        fb = req.body.facebook,
        date = req.body.date,
        delivery = req.body.delivery,
        payment = req.body.payment,
        time = req.body.time;
        order.forEach((product, index, arr)=>{
                const q = quantity[index];
                let sql = "INSERT INTO foodorder.orders (" +
                    "food_id," +
                    " qty,"+ 
                    " customer_FName," + 
                    " customer_LName," +
                    " customer_number," +
                    " customer_email," +
                    " customer_facebook," +
                    " order_date," +
                    " delivery_option," +
                    " mode_of_payment," +
                    " delivery_time" +
                 ") VALUES (" + 
                     con.escape(product) + `,` +
                     con.escape(q) + `,` +
                     con.escape(first) + `,` +
                     con.escape(last) + `,` +
                     con.escape(contact) + `,` +
                     con.escape(email) + `,` +
                     con.escape(fb) + `,` +
                     con.escape(date) + `,` +
                     con.escape(delivery) + `,` +
                     con.escape(payment) + `,` +
                     con.escape(time) +
                     `)`;  
                         
                con.query(sql, (err,result) => {
                    if(!err){
                        res.send(result);
                        return;
                    }
                    else{
                        res.json(req.body);
                        return;
                    }
                })
        })
    });

    
app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});