const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const data=require('../DB/kumareshDB')

route.post('/uservisit', async (req, res) => {


  data.save({
    ip:req.ip,
    device:req.headers['user-agent']
  })
  .then(result=>{
    console.log(result);

  })
  .catch(err=>{

  })

});


route.post('/message', async (req, res) => {


  data.save({
    ip:req.ip,
    device:req.headers['user-agent'],
    message:req.body.message
  })
  .then(result=>{
    console.log(result);

  })
  .catch(err=>{

  })

});

module.exports = route;
