const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/mydairy?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () =>{
    mongoose.connect(mongoURL, ()=>{
        console.log("connected to moongoose");
    })
}

module.exports = connectToMongo;