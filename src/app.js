const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
var cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth');
const ProfileRouter = require("./routes/profile");
const requestRouter = require('./routes/request');
const userRouter=require('./routes/user')
app.use("/", authRouter);
app.use("/", ProfileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)

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
