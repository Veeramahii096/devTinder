const mongoose = require('mongoose');

const connectDB = async () => {
        const conn = await mongoose.connect("mongodb+srv://Veera:FDO8AZf9YgdMGJCj@dev.ivuaodj.mongodb.net/devTinder", {
            family: 4  // Force IPv4
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host} 😊`);
       
        
    } 




module.exports = connectDB;