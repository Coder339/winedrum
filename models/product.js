const mongoose = require('mongoose')

// import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true,
        min:6,
        max:255
    },
    description:{
        type: String,
        required: true,
    },
    img:{
        data: Buffer,
        contentType: String,
    },
    isFav:{
        type: Boolean
    }
    // date:{
    //     type: Date,
    //     default: Date.now
    // }
},{timestamps:true}) 


module.exports = mongoose.model('Products',ProductSchema)