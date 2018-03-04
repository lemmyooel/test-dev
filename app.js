const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');





/* ADDING DEPENDENCY FILES */
require('./models/AdminUser');
require('./models/User');
const keys = require('./config/keys');
require('./config/passport')(passport);


/* EXPRESS AND HANDLEBARS PATHS*/
const app = express();
const port  = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log('Successfully Connected to Port 3000');
})

/* Connecting to online DB */
// mongoose.connect(keys.mongoURI).then(()=>{
//     console.log('Successfully connected to Cloud Database');
// });

mongoose.connect('mongodb://localhost/rgas-dev',{

}).then(()=>{
    console.log('COnnected to local DB');
}).catch((err)=>{
    console.log(err);
})



//handleabrs set up
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/** Paths Middleware */
const p = app.use('/public', express.static(path.join(__dirname, 'public')));





/* END OF EXPRESS AND HANDLEBARS */

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));
/** Passport Middleware for sessions and initialization */
app.use(passport.initialize());
app.use(passport.session());

/* Middleware for Body parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* Middleware for flas messages */
app.use(flash());

/** Global Variables */
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
   res.locals.user = req.user ;
  // res.locals.admin = req.user;
    next();
});


/* Middleware Section */
const index = require('./routes/index');
app.use('/', index);
const auth = require('./routes/auth');
app.use('/auth', auth);
const forms = require('./routes/forms');
app.use('/forms', forms);

/* Middleware for Body parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


