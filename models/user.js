const mongoose = require('mongoose')

// import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        min:6,
        max:255
    },
    email: {
        type: String,
        lowercase: true, // Always convert `email` to lowercase
        required: true,
        min:6,
        max:255
    },
    password: {
        type: String,
        // lowercase: true, //lowercase creates problem for bcrypt package so avoid it.
        required: true,
        min:6,
        max:1024
    },
    date:{
        type: Date,
        default: Date.now
    }
}) 


module.exports = mongoose.model('Users',UserSchema)