const express = require('express');
const connectDB = require('./DB/Conncection');
const app = express();
var cors = require('cors');

app.use(cors());

connectDB();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')

var customId = require("custom-id");

let cid=customId({});
//console.log(customId({}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/', require('./Api/User'));
app.use('/portfolio', require('./Api/kumaresh'));
app.get('/',(req,res)=>
{
    
    res.render('index',{
        gid:cid,
        withoutid:"https://secretmsgs.herokuapp.com/viewmessages?id="
    })
})

const Port = process.env.PORT || 3001;



app.listen(Port, () => console.log('Server started'));
