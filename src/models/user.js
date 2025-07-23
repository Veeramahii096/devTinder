const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    emailId:{type:String},
    password:{type:String},
    age:{type:Number},
    gender:{type:String}
})


module.exports=mongoose.model("Profile",UserSchema);