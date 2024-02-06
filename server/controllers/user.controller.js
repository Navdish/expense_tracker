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
    const {email, password, role} = req.body;
  
    const user = await service.userService.find_user(email);
    console.log("user",user);
    if(user)
    {
      if(bcrypt.compare(password, user.password)  && (role === user.role))
      {
        const token = jwt.sign({id : user._id, role : user.role}, 'Zenmonk', {
            expiresIn: '4h'
        })
        return res.status(200).json(token);
      }
    }
    return res.status(400).json({message :'No user found with such credentials'});
}

module.exports = {
    signup,
    login
}