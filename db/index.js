'use strict'; 
const Chalk = require('chalk'); 
const mongoose = require('mongoose'); 
const { mlabURI } = require('../config'); 

mongoose.Promise = global.Promise;
mongoose.connect(mlabURI); 

mongoose.connection.on('connected', () => {
  console.log(Chalk.green('mongoose connected to: ' + mlabURI)); 
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