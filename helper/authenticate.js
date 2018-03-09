const ConnectRoles = require('connect-roles');



   

module.exports = {
     user:  new ConnectRoles({
        failureHandler: function (req, res, action) {
          // optional function to customise code that runs when 
          // user fails authorisation 
          var accept = req.headers.accept || '';
          res.status(403);
          if (~accept.indexOf('html')) {
            res.render('/dashboard', {
              action: action,
              failureFlash: true
            
            });
          } else {
           // res.send('Access Denied - You don\'t have permission to: ' + action);
          }
        }
      }),

      ensureAuthenticated: function(req,res,next) {
        if(req.isAuthenticated()){
          return next();
        } req.flash('error_msg', 'Not Log In ');
          res.redirect('/index/login');
      },

      alreadyAuthenticatd: function(req,res,next){
        if(req.isAuthenticated()){
          res.redirect('/profile  ');
          
        }return next();
      }



    
      


}
