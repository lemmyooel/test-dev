const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


require('../models/User');
const User = mongoose.model('User');

//registration form 
router.post('/register',(req,res) =>{
    console.log(req.body)
    let errors = [];

    //validation 
    if(req.body.password != req.body.password1) {
        errors.push({text: 'Passwords do no match!'});
    }if(req.body.password.length < 4 ){
        errors.push({text: 'Password must atleast be 5 characters long' });
    }if(errors.length > 0 ){
        res.render('/register', {
                     errors: errors,
                     email: req.body.email,
                     firstName: req.body.firstName,
                     lastName: req.body.lastName
                 });
    }else{
        User.findOne({
            email: req.body.email
        }).then(user => {
            if(user){
                req.flash('error_msg', 'Email already used');
                res.redirect('/register');
            }else{
                //Creating a new user
                const newUser = new User({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash) =>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user =>{
                            req.flash('success_msg', 'Congratulations you have successfully Registered');
                            res.redirect('/login');
                        })
                    })
                })

            }
        })// end of the promise
    }
    
})//end of registration form



/** PRocess Log IN porst */
router.post('/login', (req,res,next) =>{
    //    res.send('button clicked');
       //console.log(req.body);
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res,next);
    });
    
    
    //Log out functionality
    router.get('/logout', (req,res)=>{
        req.logout();
        res.redirect('/');
        console.log('user Logs out');
    });

        module.exports = router;