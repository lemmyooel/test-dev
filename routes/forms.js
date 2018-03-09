const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const methodOverride = require('method-override');
const conn = require('../app');


require('../models/User');
const User = mongoose.model('User');
require('../models/GiaForms');
const Gia = mongoose.model('Giaform');



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



// // router for GIA forms submission
// // POST 
// app.post('/gia-upload', (req,res) =>{
//     console.log(req.body)


//         const newGia = new Gia ({
//             giaDesc: req.body.giaDesc,
//             user: req.user.id,
//             giaFormFile: req.body.file
//         });

//         newGia.save().then(gia =>{
//             req.flash('success_msg', 'you have submitted the form congratulations');
//             res.redirect('/dashboard');
//         }).catch(err => console.log(err));

// })


module.exports = router;