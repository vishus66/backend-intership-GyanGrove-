const { default: axios } = require("axios");
const Event = require("../model/Eventmodel")


async function createRecorde(req,res){
    try {
        let data  = new Event(req.body)
        await data.save()
        res.send({result:"Done",data:data})
    } catch (error) {
        console.log(error)
        res.status(500).send({result:'Error',message:"Internal server error..."})
        
    }
}
async function getRecord(req,res){
    try {
        let data = await Event.find().sort({_id:-1})
        if(!data){
            res.send("No Data Found!!!")
        }
        else{
            res.send({result:"Done",count:data.length,data:data})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({result:'Error',message:"Internal server error..."})
        
    }
}

async function findevent(req, res) {
    const { latitude, longitude, date } = req.query;
    const searchDate = new Date(date);
    const endDate = new Date(searchDate);
    endDate.setDate(endDate.getDate() + 14);

    try {
        // console.log("Search Date:", searchDate);
        // console.log("End Date:", endDate);

        const data = await Event.find({
            date: { $gte: searchDate, $lte: endDate }
        }).limit(14).sort({ date: 1 });


        const eventdetailPromise = data.map(async (event) => {
            const weatherResponse = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=${process.env.WEATHER_API_KEY}==&city=${(event.city)}&date=${date}`);
            const distanceResponse = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Distance?code=${process.env.DISTANCE_API_KEY}==&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`);


            return {
                eventName: event.event_name,
                cityName: event.city,
                date: event.date,
                weather: weatherResponse.data.weather,
                distance: distanceResponse.data.distance
            };
        });
        

        const eventdetail = await Promise.all(eventdetailPromise);
        // console.log(eventdetail);
        res.send({ result: "Success",count:eventdetail.length, events: eventdetail });
    } catch (error) {
        console.error('Error finding events:', error);
        res.status(500).send('Internal server error');
    }
}


module.exports = {
    createRecorde:createRecorde,
    getRecord:getRecord,
    findevent:findevent
}