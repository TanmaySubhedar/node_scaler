const Joi = require('joi');
const mongoose = require('mongoose');

const categoryschema  = new mongoose.Schema({
    name: {type:String, required:true, minlength: 3, maxlength:10}
})

const Category =  mongoose.model('Category', categoryschema);

function validateData(category){
    const schema = Joi.string().min(3).required()

    return Joi.valid(category, schema)
}

exports.validateData = validateData;
exports.categoryschema = categoryschema;
exports.Category = Category;
