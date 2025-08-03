app.get("/getalluser",async (req,res)=>{
    try{
    const user=await Profile.find({})
    res.send(user);
    }
catch(err){
    res.status(400).send("somthing went wrong")
}
})

app.post("/delete",async (req,res)=>{
    const userId=req.body.userId
    try{
            const user=await Profile.findByIdAndDelete(userId)
            res.send("user deleted successfullty")
    }
    catch(err){
        req.status(400).send("somthing went wrong")
    }

})

app.post("/patch",async (req,res)=>{
    const userId=req.body.userId
    const data=req.body
    try{
            const user=await Profile.findByIdAndUpdate(userId,data)
            res.send("user details modifiyed")
    }
    catch(err){
        req.status(400).send("somthing went wrong")
    }

})

app.get("/user",async (req,res)=>{
const useremail=req.body.emailId;

try{
    const user=await Profile.findOne({emailId:useremail})
    if(user.length===0){
        res.status(404).send("User not found")
    }else{
        res.send(user);
    }
    
}
catch(err){
    res.status(400).send("somthing went wrong")
}
}
)





 //const{AdminAuth,userAuth}=require("./middlewares/auth")
// app.use("/Test",[(req,res,next)=>{
//     console.log('veera')
//     // res.send("hello from server1")
//     next();
// },
// (req,res,next)=>{
//     console.log('veera1')
//     // res.send("hello from server2")
//     next()
// },
// (req,res,next)=>{
//     console.log('veera2')
//     res.send("hello from server3")
// },]
// )

// app.use("/admin",AdminAuth);
// app.use("/user/login",(req,res)=>{
//     res.send('User login sucesfully')

// })
// app.use("/user",userAuth,(req,res)=>{
//     res.send('User Data send')

// })
// app.get("/admin/getAllData",(req,res)=>{
//     res.send("All Data sent");
// })
// app.get("/admin/DeleteUser",(req,res)=>{
//     res.send("Deleted a User");
// })

// app.get("/User/:userId",(req,res)=>{
//     //console.log(req.query)
//     console.log('params',req.params)
//     res.send({"firstname":'veera',LastName:"samy"})
// })

// app.post("/User",(req,res)=>{
//     res.send("Data saved sucessfully")
// })
// app.put("/User",(req,res)=>{
//     res.send("Data modified sucessfully")
// })
// app.delete("/User",(req,res)=>{
//     res.send("Data deleted sucessfully")
// })


