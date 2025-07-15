const express=require('express');
const app=express();

app.use("/Test",(req,res)=>{
    res.send("hello from server")
})
app.listen(3000,()=>{
    console.log("server is runing port number 3000"
    )
})
