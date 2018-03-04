const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/** Loading the keys.js containing the API keys */
const keys = require('./keys');
/**Loadint the user model */
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');



module.exports = function (passport) {
  
    passport.use('user', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        
        User.findOne({
                    email: email
                }).then(user => {
                    if (!user) {
                        return done(null, false, { message: 'No user found' });
                    }
                    //Matching the password using bcrypt
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                            console.log(user);
                        } else {
                            return done(null, false, { message: 'Incorrect Password try again' });
                        }
                    })
                })
            }));

     passport.use('admin', new LocalStrategy({ usernameField: 'adminemail', passwordField: 'adminpassword' }, (email, password, done) => {
                
                Admin.findOne({
                            adminemail: email
                        }).then(admin => {
                            if (!admin) {
                                return done(null, false, { message: 'No user found' });
                            }
                            //Matching the password using bcrypt
                            bcrypt.compare(password, admin.adminpassword, (err, isMatch) => {
                                if (err) throw err;
                                if (isMatch) {
                                    return done(null, admin);
                                    
                                } else {
                                    return done(null, false, { message: 'Incorrect Password try again' });
                                }
                            })
                        })
                    }));


              // authentication serializaion and desirialization this is for sessions managemnent 
              passport.serializeUser(function (user, done) {
               
                const key = {
                    id:user.id,
                    type: user.isAdmin
                } ;
                
                done(null,key);
            });
        
            passport.deserializeUser(function (key, done) {
              if (key.type == false ){
                  User.findById(key.id, function (err, user){
                      done(null, user);
                  })
              }  
              if (key.type == true ){
                Admin.findById(key.id, function (err, admin){
                    done(null, admin);
                })
            }  
       























           // if(key.type === true ){
                // Admin.findById(key.id,(err,user )=>{
                //     done(null, admin);
                //     console.log(admin);
                // })
         //   }
            });

        
        //     Admin.findOne({
        //         email: email
        //     }).then(Adminuser => {
        //         if (!Adminuser) {
        //             return done(null, false, { message: 'No user found' });
        //         }
        //         //Matching the password using bcrypt
        //         bcrypt.compare(password, Adminuser.password, (err, isMatch) => {
        //             if (err) throw err;
        //             if (isMatch) {
        //                 return done(null, Adminuser);
        //                 console.log(Adminuser);
        //             } else {
        //                 return done(null, false, { message: 'Incorrect Password try again' });
        //             }
        //         })
        //     })
        // }));
        //     // authentication serializaion and desirialization this is for sessions managemnent 
        //     passport.serializeUser(function (Adminuser, done) {
        //         done(null, Adminuser.id);
        //     });
        
        //     passport.deserializeUser(function (id, done) {
        //         User.findById(id, function (err, Adminuser) {
        //             done(err, Adminuser);
        //         });
        //     });
} 


   

