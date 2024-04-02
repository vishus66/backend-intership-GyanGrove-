// In This first used axios for fetch the external APIs  and for Import the Model for EventModel where Schema is contain 
const { default: axios } = require("axios");
const Event = require("../model/Eventmodel")

// Function to insert the data into the data based 
// We are using the data based - MongoDB 
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
// Function to Get All the record form the data based 
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

// Function to find out the 1.The system should return events occurring within the next 14 days from the specified date,
//                          2.Each event in the response should include the event name, city, date, weather, and the distance from the user's location.

async function findevent(req, res) {
    const { latitude, longitude, date } = req.query;
    const searchDate = new Date(date);
    const endDate = new Date(searchDate);
    endDate.setDate(endDate.getDate() + 14);

    try {
        // Here we are just testing that Search date is giving the data or not console.log("Search Date:", searchDate);

        const data = await Event.find({
            date: { $gte: searchDate, $lte: endDate }
        }).limit(14).sort({ date: 1 });

        // Here we calculate the distance and weather 
        const eventdetailPromise = data.map(async (event) => {
            // In the axios we are taking the user data and passed throw the query parameter 
            const weatherResponse = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=${process.env.WEATHER_API_KEY}==&city=${(event.city)}&date=${date}`);
            const distanceResponse = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Distance?code=${process.env.DISTANCE_API_KEY}==&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`);

            // Display the data 
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

// Export the All the function to the router Folder for Routing 
module.exports = {
    createRecorde:createRecorde,
    getRecord:getRecord,
    findevent:findevent
}
