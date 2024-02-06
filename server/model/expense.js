const mongoose = require('mongoose');

const Expense =  mongoose.Schema({
    category_type : String,
    amount : Float32Array,
    date : {
        type : Date,
        default : Date.now
    },
    user_id : String
})

module.exports =  mongoose.model('expenseModel', Expense);