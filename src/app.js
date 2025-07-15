const express = require('express');

const app = express();

app.get("/User",(req,res)=>{
    res.send({"firstname":'veera',LastName:"samy"})
})

app.post("/User",(req,res)=>{
    res.send("Data saved sucessfully")
})
app.put("/User",(req,res)=>{
    res.send("Data modified sucessfully")
})
app.delete("/User",(req,res)=>{
    res.send("Data deleted sucessfully")
})
app.use("/Test",(req,res)=>{
    res.send("hello from server")
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
