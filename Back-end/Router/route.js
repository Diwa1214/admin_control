const express = require("express")
const { UserRegistrationContoller, UserManangerController, UserCustomerController, UserAdminController, UserDeleteController, UserEditController, UserDetailsController } = require("../Controller/UserController")
const passport = require('passport')
const passportConfig = require('../passport')
const jwt = require('jsonwebtoken')
const Userrouter = express.Router()

const SignInToken =(id,role)=>{
   return  jwt.sign({
     iss:'Ysqure',
     sub:{
       id:id,
       role:role
     }
   },"Ysqure",{expiresIn:'1h'})
}

Userrouter.post('/user/register',UserRegistrationContoller)

Userrouter.post('/user/login',passport.authenticate('local',{session:false}),(req,res)=>{
  if(req.isAuthenticated()){
    const{_id,email,role} = req.user
    const token = SignInToken(_id,role)
    res.cookie('access_token',token,{httpOnly:true},{sameSite:true})
    res.status(200).json({isAuthenticated:true,user:{role,email,token}})
  }
  
})
Userrouter.get('/user/logout',passport.authenticate('jwt',{session:false},(err,user)=>{console.log(user)}),(req,res)=>{
  console.log(res,'res')
  res.clearCookie('access_token')
  res.status(202).json({isAuthenticated:false,user:{email:"",role:""}})
})

Userrouter.get('/user/authenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
        return res.status(201).json({isAuthenticated:true,user:req.user.email,role:req.user.role})
})


Userrouter.get('/manager',UserManangerController)
Userrouter.get('/admin',UserAdminController)
Userrouter.get('/customer',UserCustomerController)
Userrouter.delete('/delete',UserDeleteController)
Userrouter.put('/edit',UserEditController)
Userrouter.get("/details",UserDetailsController)
module.exports = Userrouter