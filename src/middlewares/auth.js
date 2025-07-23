const AdminAuth=(req,res,next)=>{
    console.log("Admin auth is checked")
    const token='xyz';
    const isAdminAuthorized=token==='xyz'
    if(!isAdminAuthorized){
        res.status(401).send('unAthorized request');
    }
    else{
        next()
    }
}
const userAuth=(req,res,next)=>{
    console.log("User auth is checked")
    const token='xyz';
    const isAdminAuthorized=token==='xyz'
    if(!isAdminAuthorized){
        res.status(401).send('unAthorized request');
    }
    else{
        next()
    }
}

module.exports={AdminAuth,userAuth}