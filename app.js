const express=require("express");
const app=express();
const port=80;
const path=require("path");
const bodyparser=require("body-parser")

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/samarth');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//define mongoose schema

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    password: String
  });

var Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status=200;
    res.render('index.pug',params); 
});

app.get('/home',(req,res)=>{
    const params={}
    res.status=200;
    res.render('home.pug',params); 
});

app.get('/contact',(req,res)=>{
    const params={}
    res.status=200;
    res.render('contact.pug',params); 
});

app.post('/contact',(req,res)=>{
    const params={}
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Data Saved Successfully!")
    }).catch(()=>{
        res.status(400).send("Data Not Saved!")
    });
    // res.status=200;
    // res.render('form Submitted'); 
});
app.listen(port,()=>{
    console.log(`Server Started on port ${port} `);
});