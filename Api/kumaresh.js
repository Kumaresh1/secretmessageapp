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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    res.json(result);

  })
  .catch(err=>{
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    res.json(err);
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
    res.json(result)

  })
  .catch(err=>{
  
    res.json(err)

  })

});

module.exports = route;
