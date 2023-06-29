const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const crudSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    serialNo: {
        type: String,
        required: true
    },
    dateOfP: {
        type: Date,
        required: true,
        default: Date.now
    },
    noOfYears: {
        type: String,
        required: true
    },
    assetTag: {
        type: String,
        required: true
    }
});


const User = new mongoose.model('User', userSchema);
const Crud = new mongoose.model('Crud', crudSchema);

module.exports  =   { User,  Crud };