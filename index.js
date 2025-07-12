require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require("./routes/courses.routes")
const Url = process.env.MONGO_URL;
const httpStatusText = require('./utilites/statusCodeText');


mongoose.connect(Url).then(()=>{
    console.log("connected to mongodb succesfully")
})
app.use(express.json());
app.use('/api/courses',router);
app.use((error,req,res,next)=>{
    const statusCode = error.statusCode
    res.status(statusCode || 404  ).json({status:error.statusText|| httpStatusText.ERROR ,   message: (error.message || "error happend") ,code:error.statusCode|| 500 ,data : "null"})
})


app.listen(process.env.PORT || 3000, ()=>{
    console.log("started listening on port 3000")
})
