const express = require('express');
const route = require('./route/route');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


mongoose.connect("mongodb+srv://nisitsolanki:9978793231@cluster0.te1decq.mongodb.net/21twelve", {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected......."))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(3000,()=>{
console.log("Express app running on"+ 3000)  })


    