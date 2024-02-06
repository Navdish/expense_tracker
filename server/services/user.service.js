const model = require('../models');

const create_user = function(name, email, hash, role, description, address) {
    return model.User.create({name, email, password : hash, role});
} 

const find_user = function(email){
    return model.User.findOne({email: email}).exec();
}

module.exports = {
    // fetch_user_by_id,
    create_user,
    find_user
}