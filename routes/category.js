const express = require('express');
const router = express.Router();
const {Category, validateData} = require('../models/categoryModel');




// const category = [
//     {id:1, name:'Web Dev'},
//     {id:2, name:'Mobile Dev'},
//     {id:3, name:'Svelte'}
// ]


router.get('/', async(req, res) => {
    let category_list = await Category.find()
    res.send(category_list);
});

router.post('/', async(req, res) => {
    const {error} = validateData(req.body)
    if(error) return res.status(error.details)

    const newCategory = new Category({
        name:req.body.name,
    })
    await newCategory.save();
    res.send(category);
});

router.put('/:id', async(req, res) => {
    const {error} = validateData(req.body)
    if(error) return res.status(error.details)
    const category = await Category.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true});
    if(!category){
        return res.status(404).send('The category with the given id not found');
    }
});

router.delete('/:id', async(req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category){
    return res.status(404).send('The category with the given id not found');
}
});



module.exports = router;