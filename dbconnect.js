const mongoose = require("mongoose")

async function getconnect(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Event-based")
    console.log("Databased is connected to the server....")
}

getconnect()