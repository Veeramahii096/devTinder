const Profile=require('../models/user')
const jwt=require('jsonwebtoken')
const AdminAuth=(req,res,next)=>{
    console.log("Admin auth is checked")
    const token='xyz';
    const isAdminAuthorized=token==='xyz'
    if(!isAdminAuthorized){
        res.status(401).send('unAthorized request');
    }
    else{
        next()
    }
}
const userAuth=async(req,res,next)=>{
    try{
           const cookies=req.cookies;
           const {token}=cookies;
           if(!token){
               throw new Error("invaild token")
           }
           const decodeduserdata=jwt.verify(token,'DevTinder@1234')
           const {_id}=decodeduserdata;
           const user=await Profile.findById(_id)
           if(!user){
               throw new Error('user not found')
           }
           req.user=user;
          next()
   
       }
       catch(err){
           res.status(400).send(err.message)
       }
}

module.exports={AdminAuth,userAuth}