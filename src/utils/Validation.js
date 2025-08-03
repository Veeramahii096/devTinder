const Validator=require('validator')

const VaildEditProfileData=(req)=>{
    const allowedEditfiled=["firstname","lastname","emailId"]

    const isEditAlowed=Object.keys(req.body).every((fileds)=>allowedEditfiled.includes(fileds))

    return isEditAlowed
}

module.exports=VaildEditProfileData