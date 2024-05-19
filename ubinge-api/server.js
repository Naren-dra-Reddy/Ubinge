const express= require('express');
const dotenv= require('dotenv')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require("./routes/UserRoutes")


//rest object
const app = express();

//dot config
dotenv.config()

//mongodb connection
console.log(connectDB())


app.use("/api/user",userRoutes)


//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//port
const PORT = process.env.PORT || 8080;

app.get("/", (req,res)=>{
    res.send("server is running")
})

//listen
app.listen(PORT,()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue.white)
})

