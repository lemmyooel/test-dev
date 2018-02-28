const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AdminUserSchema = new Schema({
    adminemail: {
        type: String,
        required: true
    },
    adminfirstName: {
        type: String
    },
    adminlastName: {
        type: String
    },
    adminimage: {
        type: String
    },
    adminpassword:{
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        default: true
    }
});

module.exports =  mongoose.model('Admin', AdminUserSchema);
