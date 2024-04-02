const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({
    event_name:{
        type:String,
        required:[true,"Event name must required"]
    },
    city:{
        type:String,
        required:[true,"Event city must required"]   
    },
    date:{
        type:Date,        
        required:[true,"Event Date must required"]
    },
    time:{
        type:String,
        required:[true,"Event Time must required"]
    },
    longitude:{
        type:String,
        required:[true,"Event longitude must required"]
    },
    latitude:{
        type:String,
        required:[true,"Event latitude must required"]
    },
    weather:{
        type:String,
        // required:[true,"Event name must required"]
    },
    distance:{
        type:Number
    }
})

const Event = new mongoose.model("Event",EventSchema)
module.exports = Event


