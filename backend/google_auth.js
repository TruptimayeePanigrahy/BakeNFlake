const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const { v4: uuidv4 } = require('uuid');
const { UserModel } = require('./models/User.model');
// const UserModel=require("./models/User.model")

require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://handsome-nightshirt-cow.cyclic.app/users/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
      let email=profile._json.email
      const user=await UserModel.findOne({email})
      if(!user){
      
      
      
        let newuser=new UserModel({email,name:profile._json.name,pass:"12345"})
        await newuser.save()
        return cb(null,newuser)
      

      }
      else{
        return cb(null,user)
      }
        
    }
    catch(err){
      console.log(err);
    }
    
    
  
  }
));

module.exports={passport};