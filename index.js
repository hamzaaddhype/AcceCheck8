const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const router = express.Router();

const app = express();
dotenv.config({path:'config.env'})
require('./config/conn')
app.use(express.json());

 const Products = require('./models/productSchema.js');
 const Course = require('./models/courseSchema.js');
 const User = require('./models/userSchema.js');


 const { json } = require('body-parser');
app.use(require('./routes/adminRoutes'));
app.use(require('./routes/userRoutes'));
const PORT=process.env.PORT

// Running server 
app.listen(PORT, (req, res)=>{
    console.log(`Server listening on Port ${PORT}` )
})
