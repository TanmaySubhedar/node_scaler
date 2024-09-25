const express = require('express');
const categories = require('./routes/category');
const students = require('./routes/students');
const courses = require('./routes/courses');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/LearningPlatform")
.then(()=> console.log('Connection Successfull'))
.catch(err=> console.log('Connection Error', err));

const app = express();

app.use(express.json()); 
app.use('/api/categories',categories)
app.use('/api/students',students);
app.use('/api/courses',courses);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// for testing purpose, you can use Postman or curl to test these endpoints
