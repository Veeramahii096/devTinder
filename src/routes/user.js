const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter=express.Router();
const Profile=require("../models/user")

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
   
   try{
    const loginedinuser=req.user._id;
    const connectionRequest=await ConnectionRequest.find({
        toUserId:loginedinuser,
        status:"interested"
    }).populate("fromUserId",["firstname","lastname"])
    res.json({
        message:"Data Fetched Successfully",
        data:connectionRequest
    })
   }
   catch(err){
    res.status(400).send(err.message)
   } 

})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    
    try{const loggedinUser=req.user;
    const connonnectionRequest=await ConnectionRequest.find({
       $or:[{toUserId:loggedinUser._id,status:"accepted"},
        {fromUserId:loggedinUser._id,status:"accepted"}
       ] 
    }).populate("fromUserId",["firstname","lastname"])
    .populate("toUserId",["firstname","lastname"])
    
    const Data=connonnectionRequest.map((row)=>{
        if(row.fromUserId._id.toString()===loggedinUser._id.toString()){
            return row.toUserId
        }
            return row.fromUserId
    }
    
    )
     res.json({Data})
}

   
    catch(err){
        res.status(400).send(err.message)
    }
})

userRouter.get("/feed",userAuth, async(req,res)=>{
    const loggedinUser=req.user;
     const connectionrequest=await ConnectionRequest.find(
        {
        $or:[{fromUserId:loggedinUser._id},{toUserId:loggedinUser._id}]
        }
     ).select("fromUserId toUserId")

     const hideUserFromFeed=new Set();
     connectionrequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString())
     })

     const users=await Profile.find({
        $and:[{
            _id:{$nin:Array.from(hideUserFromFeed)}
        },{_id:{$ne:loggedinUser._id}}]
     })
     res.send(users)
})
module.exports=userRouter