const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();
const Cryptr = require('cryptr');

var customId = require("custom-id");

route.post('/getmessage', async (req, res) => {

  console.log("Name : ",req.body.Name);
  let user_name=req.body.Name;
  let ID=req.query.id;
let out=[];

  out=await User.find({"ID":ID});
  
  //https://secretmsgs.herokuapp.com/
  //  let URL_ID="http://localhost:3000/sendmessage?id="+ID;
    //let URL_USER="http://localhost:3000/viewmessages?id="+ID;

    let URL_ID="https://secretmsgs.herokuapp.com/sendmessage?id="+ID;
    let URL_USER="https://secretmsgs.herokuapp.com/viewmessages?id="+ID;
  
  
    let nowdate=new Date();
    var hours = nowdate.getHours()
var minutes = nowdate.getMinutes()

   // console.log("date ",nowdate,"hrs : ",hours,minutes);
    var time=hours+":"+minutes+":"+nowdate.getSeconds();
  if(out.length==0){
    let data = {};
    data.ID = ID;
    data.UserID = ID;
    data.Time=time;
    data.Password=ID[0]+ID[2]+user_name+ID[3];
    data.Message=[];

    let userModel = new User(data);
    await userModel.save();
   
    res.render("ok",{
      
        messagedata:[],
        date:nowdate+"",
        time:"00:00",
        URLFORM:URL_ID,
        URLFORM2:URL_USER  
            
        
    });
  }
  else{
    //res.json("already there");

let data=await User.find({"ID":ID});
console.log("here",data[0].Time)
res.render("ok",{
  messagedata:data[0].Messages,
   
  date:data[0].Date,
  time:data[0].Time,
  URLFORM:URL_ID,
  URLFORM2:URL_USER 
      
  });
}
  
});

route.post('/send', async (req, res) => {
  
  var message=req.body.message;
  var ID=req.query.id;

  let data=await User.find({"ID":ID});
let nowdate=new Date();
console.log("data :: ");
  console.log(req.body.message);

  var myquery = data[0];
  var newvalues = { $addToSet: {
      Messages:{a:message,
        Date:nowdate+""
      }
      
      
   }
   
   };
  await User.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("\n\tMessage updated");
    //res.json(out);  
  });

  res.render("aftermessage",{
    gid:customId({})
  });
});



route.get('/sendmessage', async (req, res) => {

  console.log("\nid = "+req.query.id);
  
res.render("send",{
  IDURL:req.query.id,
  message:req.query
 
});  
});


route.get('/viewmessages', async (req, res) => {


  console.log("Name : ",req.query);
  //let user_name=req.body.Name;
  let ID=req.query.id;
let out=[];

//let URL_ID="http://localhost:3000/sendmessage?id="+ID;
//let URL_USER="http://localhost:3000/viewmessages?id="+ID;
  
let URL_ID="https://secretmsgs.herokuapp.com/sendmessage?id="+ID;
let URL_USER="https://secretmsgs.herokuapp.com/viewmessages?id="+ID;

let nowdate=new Date();
  
  
let data=await User.find({"ID":ID});

console.log(data[0].Messages);

res.render("ok",{
  messagedata:data[0].Messages,
   
  date:data[0].Date,
  time:data[0].Time,
  URLFORM:URL_ID,
  URLFORM2:URL_USER
  });

  
});




module.exports = route;
