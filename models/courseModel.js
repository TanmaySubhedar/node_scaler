const Joi = require('joi');
const mongoose = require('mongoose');
const {categoryschema} = require('../models/categoryModel');


const courseschema  = new mongoose.Schema({
    title: {
        type:String, 
        required:true, 
        minlength: 3, 
        maxlength:10
    },

    category:{
        type: categoryschema,
        required:true
    },

    creator: {
        type:String,
        required:true
    },
    rating: {
        type:Number,
        required:true,
        min:1,
        max:5
        
    }
})

const Course =  mongoose.model('Course', courseschema);

function validateData(course){
    const schema = Joi.object({
        title: Joi.string().min(3).max(10).required(),
        category: Joi.object().required(),
        creator: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    });
    return schema.validate(course);
}
exports.Course = Course;
exports.validateData = validateData;
