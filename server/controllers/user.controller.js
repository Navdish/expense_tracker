const service = require('../services');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


const signup = async function(req, res){

    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_password = req.body.password;
    console.log(req.body);
  
    const user = await service.userService.find_user(user_email);
  
    if(user)
    {
      return res.status(400).json({message :'something went wrong'});
    }
    else 
    {
      const hash = await bcrypt.hash(user_password, saltRounds);
      console.log(hash);
      const new_user = await service.userService.create_user(user_name, user_email, hash);
      res.status(200);
    }
}

const login = async function(req, res){
    console.log(req.body);
    const {email, password} = req.body;
  
    const user = await service.userService.find_user(email);
    console.log("user",user);
    if(user)
    {
      
      await bcrypt.compare(password, user.password).then(function(result) {
        console.log(result);
        if(result === true)
        {
          const token = jwt.sign({id : user._id}, 'Zenmonk', {
              expiresIn: '4h'
          })
          return res.status(200).json(token);
        }
        else {
          return res.status(400).json({message :'No user found with such credentials'});
        }
      });
    }
    else {
      return res.status(400).json({message :'No user found with such credentials'});
    }
}

const fetch_expenses = async function(req, res) {
   const {search , category, prevDate, nextDate} = req.query;
   const user_id = req.res.user.id;
   const response_expenses = await service.userService.find_expenses(user_id, search, category, prevDate, nextDate);
   
   if(response_expenses)
   {
    res.status(200).json(response_expenses);
   }
   else {
    res.status(404);
   }
   
}

const add_expenses = async function(req, res) {
  console.log(req.body);
  const {title, description, category_type, amount, date} = req.body;
  const user_id = req.res.user.id;
  await service.userService.add_expense(title, description, category_type, amount, date, user_id);
  return res.status(200);
}

const edit_expenses = async function(req, res) {
  console.log(req.body);
  const {_id, title, description, category_type, amount, date} = req.body;
  await service.userService.edit_expense(_id, title, description, category_type, amount, date);
  return res.status(200);
}

const fetch_category = async function(req, res) {
  console.log(req.res.user.id);
  const user_id = req.res.user.id;
  const response_categories = await service.userService.find_categories(user_id);
  if(response_categories)
  {
    res.status(200).json(response_categories);
  }
  else {
    res.status(404);
  }
}

const add_category = async function(req, res) {
  console.log(req.body);
  const {image, title, description} = req.body;
  const user_id = req.res.user.id;
  await service.userService.new_category(image, title, description, user_id);
  return res.status(200);
}

const drop_expenses = async function(req, res) {
    const { id } = req.params; // id of expense
    await service.userService.drop(id);
}

module.exports = {
    signup,
    login,
    fetch_expenses,
    add_expenses,
    edit_expenses,
    fetch_category,
    add_category,
    drop_expenses
}