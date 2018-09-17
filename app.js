const express = require('express');
const app = express();
const morgon = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql');
const connection = require('express-myconnection');
const expressValidator = require('express-validator');

const productRoutes = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');
const employeeRoutes = require('./api/routes/employee');

//logger that display request LOG
app.use(morgon('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(expressValidator());



//Database  connection code
app.use(connection(mysql, {
    host: "localhost",
    user: "root",
    password: "password",
    database: "test" 

}, 'request'));


app.use((req, res, next) =>{
req.header("Access-Control-Allow-Origin", "*");
req.header(
    "Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept, Authorization"
);
if (req.method == 'OPTIONS'){
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({

    });
}
next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRouter);
app.use('/employee',employeeRoutes);


//rror handling
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message
        }
    });

});



// app.use((req, res, next) => {
// res.status(200).json({
// message:'it works'
//     });
// });
module.exports = app;