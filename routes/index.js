const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ConnectRoles = require('connect-roles');
const { user, alreadyAuthenticatd } = require('../helper/authenticate');

require('../models/User');
const User = mongoose.model('User');


/*****************************************CONNECT ROLES ******************************************** */

/* connect-roles middleware  */
//app.use(authentication)



//anonymous users can only access the home page
//returning false stops any more rules from being
//considered
// user.use(function (req, action) {
//     if (!req.isAuthenticated()) return action === 'public';
//   });
  
  //users logged can access to public pages 
  user.use(function(req, action){
      if(req.isAuthenticated() && action != 'access private page' && action != 'admin only')
        return true;
  });
  
  // Simple route middleware to ensure user is authenticated.
//   router.use(function(req, res, next) {
//     if (req.isAuthenticated()) { 
//         return next(); 
//     }else if(!req.isAuthenticated()){
       
    //}
  //  req.flash('error_msg', 'Not Authenticated')
  
//});

  //moderator users can access private page, but
  //they might not be the only ones so we don't return
  //false if the user isn't a moderator
//   user.use('access private page', function (req) {
//     console.log('access private page');
//     if (req.user.role === 'moderator') {
//       return true;
//     }
//   });
  
  //admin users can access all pages
  user.use('admin only', function (req) {
    if (req.user.userType === 'adminUser') {
      return true;
    }
  });

  user.use('already log in', (req) =>{
      if(req.isAuthenticated()){
        res.redirect('/dashboard');
      }
  })
/*****************************************END OF CONNECT ROLES ******************************************** */





/* Initial Routes user dashboard */
router.get('/', alreadyAuthenticatd,  (req,res) =>{
    res.render('index/homepage');
})

// ADMIN DASHBOARD // not needed just yet 
router.get('/admin-dashboard', (req,res) =>{
   
    //counts the number of registred Users
    User.count().then(numUser => {
        res.render('index/admin-dashboard',{    
            numUser:numUser
        });
        console.log(numUser);
    }).catch(err => console.log(err));
    
})


//Admin route for Monitoring the number of users 
router.get('/monitor',user.can('admin only'), (req,res) =>{
    User.find({
        isAdmin: false
    }).then(user => {
        res.render('index/monitor',{
            user:user
        });
        console.log(user);
    });
 
})

//Homeage Route
router.get('/dashboard', (req,res) =>{
    User.count({}).then(numUser => {
        res.render('index/index',{
            numUser:numUser
        });
        console.log(numUser);
    })



    
})

//Log IN page
router.get('/login', (req,res) =>{
    res.render('index/login');
})
//Registration Page
router.get('/register', (req,res) =>{
    res.render('index/register');
})

// router.get('/register/admin', (req,res)=>{
//     res.render('index/registerAdmin');
// })

// router.get('/login-admin', (req,res)=>{
//     res.render('index/loginAdmin');
// })

// GIA form Registration
router.get('/giaform',  (req,res) =>{
    res.render('index/gia');
})

router.get('/test', (req,res) =>{
    res.render('index/test');
})

//profile router
router.get('/profile/:id',  (req,res) =>{
     User.findById({
         _id : req.params.id
     }).then(user => {
        res.render('index/profile',{
        user:user
    });
     })

   
  
})


module.exports = router;
