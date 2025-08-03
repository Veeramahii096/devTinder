const express=require('express')
const ProfileRouter=express.Router()
const { userAuth } = require('../middlewares/auth');
const VaildEditProfileData = require('../utils/Validation');
const becrypt=require('bcrypt')
ProfileRouter.get("/profile/view", userAuth,async(req,res)=>{
   try{
    const user=req.user;
    res.send(user,'user verified sucessfully')
   }
   catch(err){
    res.status(400).send(err.message)
   }
}) 

ProfileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
    
    try{
        if(!VaildEditProfileData(req)){
            throw new Error("Invaild Edit request")
        }
        const loggedinUser=req.user;
        console.log("1",loggedinUser)
        Object.keys(req.body).forEach((key)=>(loggedinUser[key]=req.body[key]))
        await loggedinUser.save()
        console.log(loggedinUser)
        res.json({message:`${loggedinUser.firstname}Profile Updated Successfully`,data:loggedinUser})
    }
    catch(err){
        res.status(400).send(err.message)
    }
    


})

ProfileRouter.patch('/profile/password', userAuth,async(req,res)=>{
    try{
    const {password,newpassword}=req.body;
    const user = req.user;
    const loginedinuser=user.password
    const existingpassword=becrypt.compare(loginedinuser,password)
    if(!existingpassword){
        throw new Error("Enter correct password")
    } 
    const updatedpassword=await becrypt.hash(newpassword,10)
    user.password=updatedpassword

    await user.save();
    res.json({message:`${user.firstname}pasword reset successfully`,data:user})}
    catch(err){
        req.status(400).send(err.message)
    }
})
module.exports=ProfileRouter