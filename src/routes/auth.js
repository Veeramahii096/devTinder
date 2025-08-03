const express=require('express')
const authRouter=express.Router()
const Profile=require("../models/user");
const becrypt=require('bcrypt')

authRouter.post("/signUp",async (req,res)=>{
    console.log('1')
const {firstname,lastname,emailId,password}=req.body
const passwordhash= await becrypt.hash(password,10);
console.log(passwordhash)

const user=new Profile({
    firstname,lastname,emailId,password:passwordhash
})

try{
    await user.save();
res.send("User Added Sucessfully")
}
catch(err){
    res.status(400).send("Error saving the erro",+err.message)
}


});

authRouter.post("/Login",async(req,res)=>{
    try{

        const{emailId,password}=req.body;
        const user=await Profile.findOne({emailId:emailId});
        if(!user){
            throw new error("mismatch details")
        }
        const ispasswordvaild=await user.vaildatePasword(password)
        console.log('ispassword',ispasswordvaild)
        if(ispasswordvaild){
            const token=await user.getJwt()
            console.log('1',token)
            res.cookie('token',token);
            res.send("login successfull")
        }
        else{
            throw new error("Login failed")
        }
    }
    catch(err){
        res.status(400).send("error while login")
    }
})


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("Logout successfully")
})
module.exports=authRouter