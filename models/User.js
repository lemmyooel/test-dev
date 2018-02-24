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
    date:{
        type: Date,
        default: Date.now
    }
});


 const User = mongoose.model('User', RegularUserSchema);
 module.exports = User;