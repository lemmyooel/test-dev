const express = require('express');
const router = express.Router();


/* Initial Routes */
router.get('/', (req,res) =>{
    res.render('index/homepage');
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

// GIA form Registration
router.get('/giaform', (req,res) =>{
    res.render('index/giaform');
})

router.get('/test', (req,res) =>{
    res.render('index/test');
})

module.exports = router;