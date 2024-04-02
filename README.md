=======Event Management Service=========
This RESTful service manages and queries event data based on a user's geographical location and a specified date. It ingests data from a provided CSV dataset and offers APIs to add events and find events for users.

=======Core Requirements==========
--->Data Creation API
POST /events/add
This endpoint allows for the addition of events into the system using details provided in the CSV dataset.

======Request Body======

event_name: String (required) - The name of the event.
city: String (required) - The name of the city where the event takes place.
date: Date (required) - The date of the event in YYYY-MM-DD format.
time: String (required) - The time of the event in HH:MM format (24-hour clock).
latitude: Float (required) - The latitude coordinate of the event location.
longitude: Float (required) - The longitude coordinate of the event location.
Example Request

bash
Copy code
curl -X POST http://your-service-url/events/find \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Sample Event",
    "city": "New York",
    "date": "2024-04-15",
    "time": "14:00",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
Event Finder API
GET /events/find?latitude={latitude}&longitude={longitude}&date={date}
This endpoint lists all events based on the user's latitude, longitude, and a specified date. The system returns events occurring within the next 14 days from the specified date. The response is sorted by the earliest event after the specified date, with a page size of 10.

======Query Parameters======

latitude: Float (required) - The latitude coordinate of the user's location.
longitude: Float (required) - The longitude coordinate of the user's location.
date: Date (required) - The specified date in YYYY-MM-DD format.
Example Request

==bash==
--------Example Request--------- 
curl -X GET "http://localhost:8000/api/event/find?latitude=-81.69076572061553&longitude=88.33743021040294&date=2024-03-08T00:00:00.000"

----------Example Response---------
{
    "result": "Success",
    "count": 14,
    "events": [
       {
            "eventName": "Also during",
            "date": "2024-03-08T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "0.0"
        },
        {
            "eventName": "Medical clear",
            "date": "2024-03-08T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "15647.824831521393"
        },
        {
            "eventName": "Student bit reflect",
            "date": "2024-03-08T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "216.38388651482364"
        },
        {
            "eventName": "Some laugh pull",
            "date": "2024-03-08T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "5283.1280907886785"
        },
        {
            "eventName": "Page might",
            "date": "2024-03-09T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "13137.929017304614"
        },
        {
            "eventName": "Little push",
            "date": "2024-03-09T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "10246.751083576695"
        },
        {
            "eventName": "Even continue",
            "date": "2024-03-09T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "18986.2792875982"
        },
        {
            "eventName": "Individual establish approach technology",
            "date": "2024-03-10T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "12063.955392928518"
        },
        {
            "eventName": "Word impact",
            "date": "2024-03-10T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "7068.741637572887"
        },
        {
            "eventName": "Shake first",
            "date": "2024-03-11T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "17016.79807713455"
        },
        {
            "eventName": "Explain plant",
            "date": "2024-03-11T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "8586.235270922434"
        },
        {
            "eventName": "Over light of",
            "date": "2024-03-11T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "7938.014422730892"
        },
        {
            "eventName": "Direction",
            "date": "2024-03-12T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "8967.964351461485"
        },
        {
            "eventName": "Blood piece rest",
            "date": "2024-03-13T00:00:00.000Z",
            "weather": "Sunny, 18C",
            "distance": "12775.50493404768"
        }
    ]
}

External APIs
-------------
This service utilizes two external APIs for weather retrieval and distance calculation.

=>Weather API: Retrieve weather conditions for an event based on its location and date.
Example request: https://gg-backend-assignment.azurewebsites.net/api/Weather?code={weather_api_key}&city={city_name}&date={date}

=>Distance Calculation API: Calculate the distance between the user's location and the event location.
Example request: https://gg-backend-assignment.azurewebsites.net/api/Distance?code={distance_api_key}&latitude1={latitude}&longitude1={longitude}&latitude2={latitude}&longitude2={longitude}
Setup
Clone this repository.
Install dependencies using npm install.
Set up environment variables:
WEATHER_API_KEY: API key for the weather API.
DISTANCE_API_KEY: API key for the distance calculation API.
Start the server using npm start.
