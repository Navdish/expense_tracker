const mongoose = require('mongoose');

const Category =  mongoose.Schema({
    image : String,
    title : String,
    description : String,
    user_id : String
})

module.exports =  mongoose.model('categoryModel', Category);