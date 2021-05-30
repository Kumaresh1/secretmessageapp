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
  Messages:{
    type:Array
  },
  Date:{
    type:Date,
    default:Date.now
  }
});

module.exports = User = mongoose.model('quizprank', data);
