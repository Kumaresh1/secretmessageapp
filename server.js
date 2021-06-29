const express = require('express');
const connectDB = require('./DB/Conncection');
const app = express();


connectDB();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')

var customId = require("custom-id");

let cid=customId({});
//console.log(customId({}));
app.use('/', require('./Api/User'));
app.use('/portfolio', require('./Api/kumaresh'));
app.get('/',(req,res)=>
{
    
    res.render('index',{
        gid:cid,
        withoutid:"https://secretmsgs.herokuapp.com/viewmessages?id="
    })
})

const Port = process.env.PORT || 3000;



app.listen(Port, () => console.log('Server started'));
