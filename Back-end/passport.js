
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const user = require('./models/UserSchema')
const JwtStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcryptjs')

const cookieExtrator = (req)=>{
  
  let token = null
  if(req && req.cookies){
    token = req.cookies['access_token']
  }
  
  return token
}

passport.use(new JwtStrategy({
    jwtFromRequest:cookieExtrator,
    secretOrKey:'Ysquare'
},(payload,done)=>{
   console.log(payload,'pa')
    user.findById({_id:payload.sub.id},(err,user)=>{
      console.log('user',user)
     if(err){
       return done(err,false)
     }
     if(user){
        return done(err,user)
     }
     else{
       return done(null ,false)
     }
    })
}))

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:"password"
},async(email,password,done)=>{
  const validEmail = await user.findOne({email:email})
  console.log(typeof(password),"email")  
  if(validEmail){
    bcrypt.compare(password,validEmail.password,(err,user)=>{
      console.log("isMatch",user)
       if(err){
         return done(err)
       }
       if(!user){
          return done(null,false)
       }else{
        
         return done(null,validEmail)
       }
    })
  }
}))