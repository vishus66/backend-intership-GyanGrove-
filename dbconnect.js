const mongoose = require("mongoose")

async function getconnect(){
    await mongoose.connect("mongodb+srv://vishus0606:IvyCCKmHoYAJA2AB@event.atlcokv.mongodb.net/")
    console.log("Databased is connected to the server....")
}

getconnect()
