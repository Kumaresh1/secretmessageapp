const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const model=require('../DB/kumareshDB')
const model1=require('../DB/kumareshmsgDB')


route.post('/uservisit', async (req, res) => {

let data=new model({
  ip:req.ip,
  device:req.headers['user-agent']
})
 await data.save()
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


  let data = new model1({
    ip:req.ip,
    device:req.headers['user-agent'],
    message:req.body.message
  })
 await data.save()
  .then(result=>{

    console.log(result);
    res.json(result)

  })
  .catch(err=>{
  
    res.json(err)

  })

});

module.exports = route;
