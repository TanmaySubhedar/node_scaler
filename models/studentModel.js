const Joi = require('joi');
const mongoose = require('mongoose');

const studentschema  = new mongoose.Schema({
    name: {
        type:String, 
        required:true, 
        minlength: 3, 
        maxlength:10
    },

    isEnrolled: {
        type:Boolean,
        default: false
    },
    phoneNumber: {
        type:String,
        default:true,
        minlength:10,
        maxlength:10,
    }
})

const Student =  mongoose.model('Student', studentschema);
function validateData(student){
    const schema = {
        name: Joi.string().min(3).max(10).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        isEnrolled: Joi.boolean().default(false),
    }


    return Joi.valid(student, schema)
}


exports.validateData = validateData;
exports.Student = Student;