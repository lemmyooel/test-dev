const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = require('../app');


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
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        default: 'normalUser'
    },

    date: {
        type: Date,
        default: Date.now
    },
    university: {
        type: String,
        default: 'university',
        required: false
    },
    occupation: {
        type: String,
        default: 'occupation',
        required: false
    },
    phoneNumber: {
        type: String,
        default: 'phoneNumber',
        required: false
    },
    address: {
        address1: {
            type: String,
            default: 'address1',
            required: false
        },
        city: {
            type: String,
            default: 'city',
            required: false
        },
        province: {
            type: String,
            default: 'province',
            required: false
        }
    }
});


module.exports = mongoose.model('User', RegularUserSchema);


// const User = mongoose.conn.model('User', RegularUserSchema);
// module.exports = User;
