const express = require('express')
const cookiesParser = require('cookies-parser')
const mongoose = require('mongoose')
const router = require('./Router/route')
const app = express()
const passport  = require('passport')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());

app.use('/api',router)

mongoose.connect('mongodb+srv://user:user@cluster0.43znc.mongodb.net',{useNewUrlparser:true}).then(()=>{
    app.listen('5000',()=>{
        console.log('Server is ready')
    })
})