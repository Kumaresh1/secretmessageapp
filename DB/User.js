const mongoose = require('mongoose');

const data = new mongoose.Schema({
  ID: {
    type: String
  },
  UserID: {
    type: String
  },
  Password: {
    type: String
  },
  Name: {
    type: String
  },
  Useragent: {
    type: String
  },
  Messages:{
    type:Array
  },
  Date:{
    type:Date,
    default:Date.now
  },
  
  Time:{
    type:String
  }
});

module.exports = User = mongoose.model('quizprank', data);
