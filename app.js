const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const ConnectRoles = require('connect-roles');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const methodOverride = require('method-override');
const { user } = require('./helper/authenticate'); // this is restriction by role not done yet





/* ADDING DEPENDENCY FILES */
//require('./models/AdminUser');
require('./models/User');
const keys = require('./config/keys');
require('./config/passport')(passport);


/* EXPRESS AND HANDLEBARS PATHS*/
const app = express();
const port  = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log('Successfully Connected to Port 4000');
})

/* Connecting to online DB */
//mongoose.connect(keys.mongoURI).then(()=>{
  //  console.log('Successfully connected to Cloud Database');
//});

const mongoURI = 'mongodb://localhost/test-rgas';

 const conn = mongoose.connect(mongoURI,()=> console.log('Connected to the LOCAL DB instance'));

 


//handleabrs set up
app.engine('handlebars', exphbs({defaultLayout: 'tes'}));
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
app.use(user.middleware()); // connect-roles

/* Middleware for Body parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


/* Middleware for flas messages */
app.use(flash());

/** Global Variables */
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
   // res.locals.user = req.user ;
    res.locals.admin = req.user;
    
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





// //INITIALIZE GFS FOR GRID FS STREAM
// let gfs;
// conn.once('open', () => {
//    gfs = Grid(conn.db,mongoose.mongo);
//    gfs.collection('uploads');
//   // all set!
// })

// //STORAGE ENGINE /object
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });  
//     }
//   });

//   const upload = multer({ storage });

  require('./models/GiaForms');
  const Gia = mongoose.model('Giaform');

// router for GIA forms submission
// POST 
app.post('/gia-upload', (req,res) =>{
    console.log(req.body)


        const newGia = new Gia ({
            giaDesc: req.body.giaDesc,
            user: req.user.id,
          //  giaFormFile: req.body.file
        });

        newGia.save().then(gia =>{
            req.flash('success_msg', 'you have submitted the form congratulations');
            res.redirect('/dashboard');
        }).catch(err => console.log(err));

})

module.exports = conn;