const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://navdishjaggi:navdishjaggi@cluster0.x0ojbrl.mongodb.net/")
    .then(console.log("DB connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;


//navdishjaggi
//navdishjaggi