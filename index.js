const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require("./routes/courses.routes")
const Url ="mongodb+srv://belalsalah259:nodejs_123@learn-mongodb.utkzuls.mongodb.net/learn_node?retryWrites=true&w=majority&appName=learn-mongoDb";


mongoose.connect(Url).then(()=>{
    console.log("connect to mongodb succesfully")
})
app.use(express.json());
app.use('/api/courses',router)


app.listen(3000, ()=>{
    console.log("started listening on port 3000")
})
