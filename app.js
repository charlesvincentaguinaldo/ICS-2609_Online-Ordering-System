const express = require('express');
const mysql2 = require('mysql2');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();
const server = require("./jsreport/server");
const pRoute = require("./routes/products");
const oRoute = require("./routes/orders");
const aRoute = require("./routes/admins");

const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "foodorder",
    timezone: 'Z'
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

//-------------PUBLIC-----------------//
app
    .use(morgan('dev'))
    .use('/', express.static('public'))
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .post("/send-data", (req,res)=>{
        let order = req.body.OrderNo;
        let quantity = req.body.quantity;
        let first = req.body.fname, 
        last = req.body.lname,
        contact = req.body.Contact,
        email = req.body.emailAdd,
        fb = req.body.facebook,
        date = req.body.date,
        delivery = req.body.delivery,
        payment = req.body.payment,
        time = req.body.time;
        [order].forEach((product, index, arr)=>{
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
                     con.escape(""+email) + `,` +
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



//---------------ADMIN----------------//
app.set('view engine', 'ejs')
    .use(express.static('admin'))
    .get('/system', (req, res)=>{
        res.render(__dirname + '/admin/pages/index');
    })
    .post('/auth', (req, res)=>{
        var user = req.body.username;
	    var pass = req.body.password;
	    if (user && pass) {
		    con.query('SELECT * FROM admin WHERE username = ? AND password = ?', 
            [user, pass], function(err, results, fields) {
			    if (results.length > 0) {
				    req.loggedin = true;
				    req.user = user;
				    res.redirect('/o');
			    } else {
				    res.send('Incorrect Username and/or Password!');
			    }			
			    res.end();
		    });
	    } else {
		    res.send('Please enter Username and Password!');
		    res.end();
	    }
    })
    
    
//---------------ROUTES---------------//
.get('/p', (req, res)=>{
    res.redirect('/products')
})

.use('/products', pRoute)

.get('/o', (req, res)=>{
    res.redirect('/orders')
})

.use('/orders', oRoute)

.get('/a', (req, res)=>{
    res.redirect('/admins')
})

.use('/admins', aRoute)


 
    
app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});