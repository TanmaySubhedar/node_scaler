const express = require('express');
const router = express.Router();
const {Category} = require('../models/categoryModel');
const {Course, validateData} = require('../models/courseModel');

router.get('/', async(req, res) => {
    let courses = await Course.find()
    res.send(courses);
});

router.post('/', async(req, res) => {
    const {error} = validateData(req.body)
    
    if(error) return res.status(error.details)


    const category = await Course.findById(req.body.categoryId)
    const newCourse = new Course({
        title:req.body.name,
        category:{
            _id:category._id,
            name:category.name
        },
        creator :req.body.creator,
        rating:req.body.rating,

    })
    await newCourse.save();
    res.send(courses);
});

router.put('/:id', async(req, res) => {
    const {error} = validateData(req.body)
    if(error) return res.status(error.details)
        const category = await Course.findById(req.body.categoryId)
    if(!category){
        return res.status(404).send('Category not found');
    }
    const course = await Course.findByIdAndUpdate(req.params.id, {
        title:req.body.name,
        category:{
            _id:category._id,
            name:category.name
        },
        creator :req.body.creator,
        rating:req.body.rating,

    }, 
    {
        new:true
    }
);
    if(!course){
        return res.status(404).send('The category with the given id not found');
    }
});

router.delete('/:id', async(req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if(!course){
    return res.status(404).send('The category with the given id not found');
}
});


module.exports = router;