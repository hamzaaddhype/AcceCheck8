const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Products = require('../models/productSchema');
const Course = require('../models/courseSchema')
const router = express.Router();


// Add product in mongodb collection (PRODUCTS CRUD OPERATION)
router.get('/Admin', (req,res)=>{
    res.send("<h1>Admin Home Page!</h1>");
} );


// Get all products 
router.get("/Admin/get-products", async (req, res) => {
  let data = await Products.find();
  console.log(data);
  data.length > 0 ? res.send(data) : res.send("No data");
});


router.get('/Admin/update-product', (req,res)=>{
    res.send("<h1>Admin Update Page!</h1>");
} );


// Delete product in mongodb collection
router.delete("/Admin/dell-product/:_id", async (req, res) => {
  let dellCoourse = await Products.deleteOne({ _id: req.params._id  });
  if(dellCoourse){
    res.status(201).json({ message: 'Successfully Product Delete' });
  }else{
    res.status(201).json({ message: 'Error while deleted' });
  }

});

router.get("/Admin/get-prodcuts", async (req, res) => {
  let data = await Products.find();
  console.log(data);
  data.length > 0 ? res.send(data) : res.send("No data");
});

router.post('/Admin/add-product', async (req, res) => {
  const { title, id, description, points } = req.body;
  if (!title || !id || !description || !points) {
    return res.status(422).json({ error: 'Please enter all required fields of products' });
   }
  
    try {
      const productExict= await Products.findOne({ id:id })

      if (productExict) {
        return res.status(422).json({ error: 'Product id already exists' });
      }else{
        const product = new Products({ title, id, description, points });
        await product.save();
        res.status(201).json({ message: 'Successfully Product Inserted' });
      }
      
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Something went wrong' });
    };
});
// Product operations end here


// Add new cources into the mongodb collection (Cours CRUD OPERATION)

// Get all cources 
router.get("/Admin/get-cources", async (req, res) => {
  let data = await Course.find();
  console.log(data);
  data.length > 0 ? res.send(data) : res.send("No data");
});

router.post('/Admin/add-courses', async (req, res) => {
    const { name, id, discription,points, status, duration, url } = req.body;
    
    if (!name || !id || !discription || !points || !status || !duration || !url) {
        return res.status(422).json({ error: 'Please enter all required fields' });
     }
     try {
      const courseExict= await Course.findOne({ id : id })

      if (courseExict) {
        return res.status(422).json({ error: 'This course is already exists' });
      }else{
        const course = new Course({ name, id, discription, points, status, duration, url });
        await course.save();
        res.status(201).json({ message: 'Successfully Course Created' });
      }
      
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Something went wrong' });
    };
});


router.delete("/Admin/dell-courses/:_id", async (req, res) => {
  let dellCoourse = await Course.deleteOne({ _id: req.params._id  });
  if(dellCoourse){
    res.status(201).json({ message: 'Successfully Course Delete' });
  }else{
    res.status(201).json({ message: 'Error while deleted' });
  }

});



module.exports = router

