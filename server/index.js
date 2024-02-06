const express = require("express");
const bodyParser = require("body-parser");
const {Users} = require('./Schema.js');
const {Products} = require('./Schema.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')
var jwt = require('jsonwebtoken');
// const multer = require('multer');
// const upload = multer({ dest: '../images/' })

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('./config/mongoDB');

// Routes declaration
app.use("/", require("./routes"));

app.listen(8080, function() {
    console.log("Server is running on 8080");
  });
  