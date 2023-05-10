const jwt = require('jsonwebtoken');
const {UserModel}=require("../models/User.model")
const {blacklist}=require("../models/blacklist")

const authenticate = async(req, res, next) => {
 
    const token = req.headers.authorization.split(' ')[1];
    if(blacklist.includes(token)){
      res.send('please log in again')
    }
   // let token=req.headers.authorization.split(' ')[1];
    
    if(token){
        let decoded=jwt.verify(token,'masai');
       // console.log(decoded)
        if(decoded.userID){
            req.body.userID=decoded.userID;
          //  console.log(req.body);
            next();
        }
        else{
            res.status(400).send({msg:"Please login !"})
        }
    }else{
        res.status(400).send({msg:"Please login !"});
    }
   
}

module.exports = {authenticate}