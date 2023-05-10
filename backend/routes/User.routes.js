const express=require("express")

const {UserModel}=require("../models/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {blacklist}=require("../models/blacklist")
const {authenticate}=require("../middlewares/authenticate.middleware")
const { adminmodel } = require("../models/admin.model")

const {passport} = require("../google_auth")
// const {client} = require("../middlewares/redis")


//const {client} = require("../middlewares/redis")
require("dotenv").config()


userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,role}=req.body
    try{
        const userpresent=await UserModel.findOne({email})
        if(userpresent){
            res.send("User Already Present Please Login")
        }
        bcrypt.hash(pass,5,async(err, hash)=> {
            if(err) res.send({"msg":"Something went wrong","error":err.message})
            else{
                const user=new UserModel({name,email,pass:hash,role})
                await user.save()
                res.send({"msg":"New Users has been registred"})
           }
        });


       
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
    
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass}=(req.body)
    try{
        const user=await UserModel.find({email})
        console.log(user);
        if(user.length>0){
        let  aduser=  await adminmodel.find({email})
        bcrypt.compare(pass, user[0].pass,(err, result)=>{
            if(result){
                let token=jwt.sign({userID:user[0]._id},"masai");

              //  console.log(aduser[0].Image);
              if(user[0].role=="Admin"){
                res.send({"msg":"Logged in","token":token,"name":user[0].name,"role":user[0].role,"image":aduser[0].Image})
              }else{
                res.send({"msg":"Logged in","token":token,"name":user[0].name,"role":user[0].role})

              }
            }
            else{
                res.send({"msg":"wrong credentials"})
            }
        });

    }else{
            res.send({"msg":"please registered first!"})
        }
     }catch(err){
         res.send({"msg":"Something went wrong","error":err.message})
     }
})

userRouter.get("/",(req,res)=>{
    res.send("hii")
})


userRouter.get("/logout",(req,res)=>{
    blacklist.push(req.headers?.authorization?.split(" ")[1])

    res.send({msg:"logout successful"})
    })


   


    




    
    userRouter.get('/auth/google',

    passport.authenticate('google', { scope: ['profile','email'] }));

    userRouter.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
    function(req, res) {
      
      console.log(req.user)
      const user=req.user
      let name=user.name
      let id=user._id
    
      res.send(`<a href="http://127.0.0.1:5501/frontend/html/index.html?userid=${id}&name=${name}">Click here to continue</a>`)
 
  })

  let sendotpmail=async(Name,Email,otp)=>{

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'panigrahydeepakkumar27@gmail.com',
                pass: process.env.googlepassword
            }
        });

        let mailOptions = {
            from: 'panigrahydeepakkumar27@gmail.com',
            to: Email,
            subject: 'OTP verifecation mail',
            html:`<p>HI ${Name} <br> please use this OTP to update password.<br> ${otp} </p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                
            } else {
                console.log('Email sent: ' + info.response);
               
            }
        });
    } catch (error) {
        console.log(error)
    }



userRouter.post("/forgetpass",async(req,res)=>{
    try {
        let {email}=req.body
        let user=await UserModel.findOne({email})
        if(user){
            let OTP = "";
            for (let i = 0; i < 6; i++) {
            OTP+= Math.floor(Math.random() * 10);
            }
            console.log(OTP)
            // client.set('OTP', OTP, 'EX', 3600);
            sendotpmail(user.name,user.email,OTP)

        }
        res.send({"userdetails":user})
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/verifyotp",async(req,res)=>{
    try {
        let {OTP}=req.body
       let otp=await client.get('OTP')
       if(OTP==otp){
        res.status(200).send({"msg":"Otp verified"})
       }else{
        res.status(400).send({"msg":"incorrect verified"})
       }
       
    } catch (error) {
        console.log(error)
    }
})

userRouter.put("/updatepass",async(req,res)=>{
    try {
        let {id}=req.query
        let {pass}=req.body
        let hashpass=bcrypt.hashSync(pass,7)
        let user=await UserModel.findById({_id:id})
        user.Pass=hashpass
        await user.save()
        console.log(user)
         res.send({"msg":"password update successfull please login"})
    } catch (error) {
        res.send(error)
    }
})

  }


module.exports={
    userRouter
}
