const User = require("../models/UserSchema")
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.UserRegistrationContoller =async(req,res)=>{
  const {email,password,role} = req.body
  try{
   const hashpassword = await bcrypt.hash(password,10)   
    User.findOne({email:email},async(err,user)=>{
        if(err){
          return res.status(500).json({msgBody:"Something went wrong",ErrorMessage:true})
        }
        if(user){
          return res.status(400).json({msgBody:"Email is Already exit",ErrorMessage:true})
        }
        else{
            const newUser = await User.create({email:email,password:hashpassword,role:role})
            return res.status(200).json({data:newUser,msgBody:"Successfully Register",ErrorMessage:false})
        }  
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.UserManangerController = async(req,res) =>{
   const manager = await User.find({role:"2"})
   if(manager){
      return  res.status(200).json({data:manager})
   }
} 


exports.UserCustomerController = async(req,res) =>{
  const customer = await User.find({role:"3"})
  console.log(customer,"c")
  if(customer){
     return  res.status(200).json({data:customer})
  }
} 


exports.UserAdminController = async(req,res) =>{
  const admin = await User.find({})
  if(admin){
     return  res.status(200).json({data:admin})
  }
} 

exports.UserDeleteController = async(req,res) =>{
   const id = req.query.data
   console.log(id)
   const deleteItem = await User.findByIdAndDelete({_id:id})
   console.log(deleteItem)
   if(deleteItem){
       res.status(200).json({data:deleteItem})
   }
}



