const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/** Loading the keys.js containing the API keys */
const keys = require('./keys');
/**Loadint the user model */
const User = mongoose.model('User');



module.exports = function (passport) {
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        
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
        
            // authentication serializaion and desirialization this is for sessions managemnent 
            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });
        
            passport.deserializeUser(function (id, done) {
                User.findById(id, function (err, user) {
                    done(err, user);
                });
            });
}   

   

