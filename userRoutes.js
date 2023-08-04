const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const router = express.Router();

// User Registered
router.post("/user-register",async(req,res)=>{
    const { name, email, country , langguage, password, confrim_password } = req.body;
    if (!name || !email || !country || !langguage || !password|| !confrim_password)  {
      return res.status(422).json({ error: 'Please enter all required fields' });
    }
    try {
        const userExists= await User.findOne({ email: email })
  
        if (userExists) {
          return res.status(422).json({ error: 'Email already exists' });
        }else if(password!=confrim_password) {
          return res.status(422).json({ error: 'Password not matched' });
        }else{
          const user = new User({ name, email, country, langguage, password, confrim_password});
          // Encrypt the password befor saved
          await user.save();
          res.status(201).json({ message: 'Successfully created' });
        }
        
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Something went wrong' });
      };

    
})
router.post('/user-sigin', async(req, res)=>{
    // console.log(req.body);
    // res.json({ message: 'Awsome Signature' });
    try{
      const {email, password} = req.body
      if(!email || !password){
        return res.status(400).json({ message: 'Not Empty Fileds'})
      }
  
      // user Login
      // const isMatched= await bcrypt.compare(password,userLogin.password)
  
      const userLogin = await User.findOne({ email : email})
      // login functionality
      if(userLogin){
        const isMatched= await bcrypt.compare(password,userLogin.password)
        if(!isMatched){
          res.status(400).json({message:'Invalid Cranditionals'});
        }else{
          res.json({message:'User Login Successfully'});
        }
       
      } else{
        res.status(400).json({message:'Invalid Cranditionals'});
      }
      
      console.log(userLogin);
     
    
  
    }catch (error) {
      console.error(error);
    }
  } )

module.exports = router

