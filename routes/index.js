const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('User');



/* Initial Routes user dashboard */
router.get('/', (req,res) =>{
    res.render('index/homepage');
})

// ADMIN DASHBOARD
router.get('/admin-dashboard', (req,res) =>{
    res.render('index/admin-dashboard');
})
//Admin route for Monitoring the number of users 
router.get('/monitor', (req,res) =>{
    User.find({
       
    }).then(user => {
        res.render('index/monitor',{
            user:user
        });
        console.log(user);
    });
 
})

//Homeage Route
router.get('/dashboard', (req,res) =>{
    res.render('index/index');
})

//Log IN page
router.get('/login', (req,res) =>{
    res.render('index/login');
})
//Registration Page
router.get('/register', (req,res) =>{
    res.render('index/register');
})

router.get('/register/admin', (req,res)=>{
    res.render('index/registerAdmin');
})

router.get('/login-admin', (req,res)=>{
    res.render('index/loginAdmin');
})

// GIA form Registration
router.get('/giaform', (req,res) =>{
    res.render('index/giaform');
})

router.get('/test', (req,res) =>{
    res.render('index/test');
})

//profile router
router.get('/profile', (req,res) =>{
    User.findById({
        _id : req.admin.id
    }).then(user => {
        res.render('index/profile');
    })
  
})

module.exports = router;