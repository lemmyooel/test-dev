const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RegularUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    },
    password:{
        type: String,
        required: true
    },
    // isAdmin: {
    //     type:Boolean,
    //     default: false
    // },
    userType: {
        type:String,
        default: 'normalUser'
    },
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports  = mongoose.model('User', RegularUserSchema);
