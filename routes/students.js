const express = require('express');
const router = express.Router();
const {Student, validateData} = require('../models/studentModel');



router.get('/', async(req, res) => {
    let students = await Student.find()
    res.send(students);
});

router.post('/', async(req, res) => {
    const {error} = validateData(req.body)
    if(error) return res.status(error.details)

    const newStudent = new Student({
        name:req.body.name,
        isEnrolled:req.body.isEnrolled,
        phoneNumber:req.body.phoneNumber,
    })
    await newStudent.save();
    res.send(students);
});

router.put('/:id', async(req, res) => {
    const {error} = validateData(req.body)
    if(error) return res.status(error.details)
    const student = await Student.findByIdAndUpdate(req.params.id, {name:req.body.name, phoneNumber:req.body.phoneNumber, isEnrolled: req.body.isEnrolled}, {new:true});
    if(!student){
        return res.status(404).send('The category with the given id not found');
    }
});

router.delete('/:id', async(req, res) => {
    const student = await Student.findByIdAndRemove(req.params.id);
    if(!student){
    return res.status(404).send('The category with the given id not found');
}
});


module.exports = router;