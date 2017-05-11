'use strict'; 
const Chalk = require('chalk'); 
const mongoose = require('mongoose'); 
// const { mlabURI } = require('../config'); 

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://arwl:1234@ds137281.mlab.com:37281/arwl-passport-local"); 

mongoose.connection.on('connected', () => {
  console.log(Chalk.green('mongoose connected to: ' + "mongodb://arwl:1234@ds137281.mlab.com:37281/arwl-passport-local")); 
}); 

mongoose.connection.on('error', (err) => {
  console.log(Chalk.red('mongoose connection error: ' + err)); 
}); 

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },  
  password: {
    type: String, 
    required: true
  }
}); 

const User = mongoose.model('user', UserSchema); 

module.exports = {
  mongoose, 
  User
}