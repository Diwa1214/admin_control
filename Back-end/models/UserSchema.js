const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { findUser } = require("../Controller/UserController");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// UserSchema.pre('save',async function (next){
//    if(!this.isModified('password')){
//       return next()
//    }
//    await bcrypt.hash(this.password,10,(err,hashPassword)=>{
//       if(err){
//          return next(err)
//       }
//       this.password = hashPassword
//       next()
//     })
// })

// UserSchema.methods.comparePassword =  function(Newpassword,cb){
//    console.log(this.password,Newpassword)
//   return bcrypt.compare(Newpassword,this.password, (err,isMatch)=>{
//       console.log(isMatch)
//      if(err){
//         cb(err)
//      }
//      else {
//         if(!isMatch){
//            return cb(null,this)
//         }
//         else{
//            return cb(null,this)
//         }
//      }
//   })
// }

module.exports = mongoose.model("user", UserSchema);
