const express = require('express');
const connectDB = require("./Config/Database");
const becrypt=require('bcrypt')
const app = express();
const Profile=require("./models/user");
app.use(express.json())

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

app.post("/signUp",async (req,res)=>{
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


})

app.post("/Login",async(req,res)=>{
    try{

        const{emailId,password}=req.body;
        const user=await Profile.findOne({emailId:emailId});
        if(!user){
            throw new error("mismatch details")
        }
        const ispasswordvaild=await becrypt.compare(password,user.password)
        if(ispasswordvaild){
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
// Connect to MongoDB
connectDB().then(()=>{
  console.log("Database connection is healthy 🟢");
  app.listen(3000, () => {
    console.log("server is running on port 3000");
});
}).catch((err)=>{
    console.error(`Database Error: ${err.message} 😢`)
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


