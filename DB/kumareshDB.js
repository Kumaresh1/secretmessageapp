const mongoose = require('mongoose');

const data = new mongoose.Schema({
  
  ip: {
    type: String
  },
  device:{
    type:String
  },
  message:{
    type:String
  }

},{timestamps:true});

module.exports = User = mongoose.model('Portfolio', data);
