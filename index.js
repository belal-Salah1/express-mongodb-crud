require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require("./routes/courses.routes")
const Url = process.env.MONGO_URL;


mongoose.connect(Url).then(()=>{
    console.log("connected to mongodb succesfully")
})
app.use(express.json());
app.use('/api/courses',router)


app.listen(process.env.PORT || 3000, ()=>{
    console.log("started listening on port 3000")
})
