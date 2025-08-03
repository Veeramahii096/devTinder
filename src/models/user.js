const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const becrypt=require('bcrypt')
const UserSchema=new mongoose.Schema({
    firstname:{type:String,
        index:true
    },
    lastname:{type:String},
    emailId:{type:String,
        unique:true
    },
    password:{type:String},
    age:{type:Number},
    gender:{type:String}
})

UserSchema.index({ firstName: 1, lastName: 1 });

UserSchema.methods.getJwt=async function(){
    const user=this;
    const token= await jwt.sign({_id:user._id},"DevTinder@1234");
    return token;
}   
UserSchema.methods.vaildatePasword=async function(getpasswordfromuser){
    const user=this;
    const passwordhash=user.password;
    const ispasswordVaild=becrypt.compare(getpasswordfromuser,passwordhash)
    return ispasswordVaild
}

module.exports=mongoose.model("Profile",UserSchema);