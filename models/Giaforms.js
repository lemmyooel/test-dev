const mongoose = require('mongoose');
const conn = require('../app');
const Schema =  mongoose.Schema;


const GiaformSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    // giaFormFile: {
    //     type: Schema.Types.ObjectId,
    //     ref:'uploads.files'
    // },

    giaDesc: {
        type: String,
        required: true,
        lowercase: true
    }

})


module.exports = mongoose.model('Giaform', GiaformSchema);
