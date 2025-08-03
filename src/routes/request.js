const express=require('express')
const requestRouter=express.Router()
const mongoose = require("mongoose");
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const Profile=require("../models/user");
requestRouter.post("/request/send/:status/:toUserId", userAuth,async(req,res)=>{
   try{
    const fromUserId=req.user._id;
    const toUserId= req.params.toUserId;
    const status=req.params.status;
    const allowedstatus=["ignored","interested"];
    if(!allowedstatus.includes(status)){
      return res.status(400).json({message:'Invaild request'})
    }
    const coonectionrequest=new ConnectionRequest({
      fromUserId,toUserId,status
    })
    const existingUser=await Profile.findById(toUserId);
    if(!existingUser){
      return res.status(404).json({message:"User is not found"})
    }
    const existingConnectionrequest=await ConnectionRequest.findOne({
      $or:[
         {fromUserId,toUserId},
         {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })
    if(existingConnectionrequest){
      return res.status(400).send({message:"Conection Already exist"})
    }
   const data=await coonectionrequest.save()
    res.json({message:req.user.firstname +" "+"is"+" "+status+" "+existingUser.firstname,data});
   }
   catch(err){
    res.status(400).send(err.message)
   }
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
   const loggedinUser=req.user;
   console.log('2',loggedinUser)
   const {status,requestId}=req.params;
   console.log('3',status,requestId)
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ error: "Invalid request ID" });
      }
   const Allowedstatus=["accepted","rejected"];
   if(!Allowedstatus.includes(status)){
      return res.status(400).send("Invaild Request")
   }

   const connectionRequest=await ConnectionRequest.findOne({
      fromUserId:requestId,
      toUserId:loggedinUser._id,
      status:"interested"
   })
   console.log('1',connectionRequest)
   if(!connectionRequest){
      return res.status(400).json({message:"Connection request not found"})
   }
   connectionRequest.status=status;
   const data=await connectionRequest.save()
   res.send({message:"Connection Request"+" "+status,data})

})

module.exports=requestRouter