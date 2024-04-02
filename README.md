
# Assigment Backend-inter GyanGrove
This RESTful service manages and queries event data based on a user's geographical location and a specified date. It ingests data from a provided CSV dataset and offers APIs to add events and find events for users.




## Running Tests

Core Requirements
Data Creation API
POST /events/add

This endpoint allows for the addition of events into the system using details provided in the CSV dataset.

Request Body

- event_name: String (required) - The name of the event.

- city: String (required) - The name of the city where the event takes place.

- date: Date (required) - The date of the event in YYYY-MM-DD format.

- time: String (required) - The time of the event in HH:MM format (24-hour clock).

- latitude: Float (required) - The latitude coordinate of the event location.

- longitude: Float (required) - The longitude coordinate of the event location.

Example POST:- 
![Screenshot (148)](https://github.com/vishus66/backend-intership-GyanGrove-/assets/54369733/a90dd7fe-c16d-460b-8865-412d156b6915)



Event Finder API
GET /events/find?latitude={latitude}&longitude={longitude}&date={date}

This endpoint lists all events based on the user's latitude, longitude, and a specified date. The system returns events occurring within the next 14 days from the specified date. The response is sorted by the earliest event after the specified date, with a page size of 10.

Query Parameters

- latitude: Float (required) - The latitude coordinate of the - user's location.
- longitude: Float (required) - The longitude coordinate of the user's location.
- date: Date (required) - The specified date in YYYY-MM-DD format.

Example Request:-

![Screenshot (147)](https://github.com/vishus66/backend-intership-GyanGrove-/assets/54369733/46be292c-95aa-42d0-a3a6-644e74de6127)

bash
Copy code
curl -X GET "http://your-service-url/events/find?latitude=40.7128&longitude=-74.0060&date=2024-04-01"

Example Response

![Screenshot (147)](https://github.com/vishus66/backend-intership-GyanGrove-/assets/54369733/ac52a97d-28b3-4518-b525-e1b30025608e)

External APIs

This service utilizes two external APIs for weather retrieval and distance calculation.

- Weather API: Retrieve weather conditions for an event based on its location and date.
Example request: https://gg-backend-assignment.azurewebsites.net/api/Weather?code={weather_api_key}&city={city_name}&date={date}
- Distance Calculation API: Calculate the distance between the user's location and the event location.
Example request: https://gg-backend-assignment.azurewebsites.net/api/Distance?code={distance_api_key}&latitude1={latitude}&longitude1={longitude}&latitude2={latitude}&longitude2={longitude}

