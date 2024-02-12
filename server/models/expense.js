const mongoose = require('mongoose');

const Expense =  mongoose.Schema({
    title : String,
    description : String,
    category_type : String,
    amount : Number,
    date : String,
    user_id : String
})

module.exports =  mongoose.model('expenseModel', Expense);