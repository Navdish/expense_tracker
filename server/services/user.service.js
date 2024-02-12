const model = require('../models');

const create_user = function(name, email, hash, role, description, address) {
    return model.User.create({name, email, password : hash, role});
} 

const find_user = function(email){
    return model.User.findOne({email: email}).exec();
}

const find_expenses = function (id, search, category, prevdate, nextDate){
    console.log(id, search, category, prevdate, nextDate);
    // return model.Expense.find({user_id : id}).exec();
    if(search === "")
    {
        console.log("--------------")
        return model.Expense.find({user_id : id, category_type : category, date :  { $gte: prevdate }, date : { $lte : nextDate}});
    }
    else {
        console.log("search wali query")
        return model.Expense.find({user_id : id, "title" : {$regex:search,  $options: 'i'}, category_type : category, date :  { $gte: prevdate , $lte : nextDate}});
    }
}

const find_categories = function(id){
    return model.Category.find({user_id : id}).exec();
}

const add_expense = function(title, description, category_type, amount, date, user_id){
    return model.Expense.create({title, description, category_type, amount, date, user_id});
}

const new_category = function(image, title, description, user_id){
    return model.Category.create({image, title, description, user_id});
}

const edit_expense = function(_id, title, description, category_type, amount, date, user_id){
    return model.Expense.findOneAndUpdate({_id : _id}, {title, description, category_type, amount, date, user_id});
}

const drop = function(id){
    return model.Expense.deleteOne({_id : id});
}

module.exports = {
    // fetch_user_by_id,
    create_user,
    find_user,
    find_expenses,
    find_categories,
    add_expense,
    new_category,
    edit_expense,
    drop
}