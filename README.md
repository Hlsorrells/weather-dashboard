# Weather Dashboard

## Project Description

A weather dashboard app that features dynamically updated HTML and CSS powered by OpenWeather API to retrieve data for cities.

## Deployment

  [Weather Dashboard](https://hlsorrells.github.io/weather-dashboard/)

  ![](assets/images/.gif)

## Table of Contents

  * [Assignment Instructions](#assignment-instructions)
    * [User Story](#user-story)
    * [Acceptance Criteria](#acceptance-criteria)
  * [Project Lessons](#project-lessons)
    * [Webpage Layout](#webpage-layout)
    * [Search History](#search-history)
    * [API Data](#api-data)
    * [Building the Forecast](#building-the-forecast)
    * [](#)
  * [Screenshots of Application](#screenshots-of-application)
  * [Authors](#author)

----

## Assignment Instructions

Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS. Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

<details>
    <summary markdown="span">Click to expand Assignment Instruction Details</summary>

### User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

### Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
</details>
----

## Project Lessons

### Webpage Layout
This project was designed using a bootstrap layout which consisted of a navbar and a container with aside and main sections. While building the layout, I created id values for any tags that would contain data from the API. Within the aside section, I placed the search box and search history. I chose to use a form template for the search box and added an id to the input tag for easy capture of user input. For the search history, I created a simple div with an id to target for appending data. The main section contained a row for the current weather data, a row for the weather tile header, and a row to contain the 5 forecast tiles. As the current weather would be a singular data dump, I created the divs with ids to contain the data from the API. I chose to create a single div for the forecast tiles, building the needed tiles to be appended to the div with API data.

### Search History
I tackled working with the search history first. Using examples from other class activities, I was able to apply those lessons to this project. First, I created a click listener for the document to capture the user input for the city. Then created a variable to retrieve the searches variable from local storage using JSON parse. Next, I focused on building the renderHistory function with the following steps.
    1. Empty any previous search history from the HTML.
    2. Limit the retrieval of city names to the last five cities within the searches variable.
    3. Append the city name to the search history div.
At first, I included appending the new city name to the searches variable within the renderHistory function, but later moved it to within the form event listener. This allowed for updating the user's input to the formal spelling of the name (Capitalization) which could then filter any duplicate names from being pushed to the searches variable.

```javascript
// Add city to search history
    if (!searches.includes(response.name)) {
        searches.push(response.name);
    }
    localStorage.setItem("searches", JSON.stringify(searches));
    $("#search").val("");
    renderHistory();
```

### API Data
For this project, I needed to use AJAX functions for 3 API calls to return all the needed data for the dashboard. The first call was made to OpenWeather API's [Current Weather Data](https://openweathermap.org/current) which returns the current weather for any location. This call returned the city name, current temperature, feels like temperature, humidity, and wind speed. 

I needed to use an additional call to OpenWeather API's [UV Index](https://openweathermap.org/api/uvi) to retrieve the UV Index for the location. This index pulls UV data based on the latitude and longitude values for the city which were included in the current weather data response. I used the getUVindex function to pass the city coordinates into the UV Index AJAX function. 

<details>
    <summary markdown="span">Click to expand UV Index Code Snippet</summary>

```javascript
 // Event listener for search submit button
    $("form").on("submit", function (event) {
        // Pull current weather data from API 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9288340a0d00c00e02bf6e9f809e872",
            method: "GET"
        }).then(function (response) {
            // Set city coordinates and pass them to UV data API call
            var cityCoord = [response.coord.lat, response.coord.lon];
            getUVindex(cityCoord);
        });

        // Pull UV data for current city
        function getUVindex(cityCoord) {
            // Call current UV data for current city
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=c9288340a0d00c00e02bf6e9f809e872&lat=" + cityCoord[0] + "&lon=" + cityCoord[1],
                method: "GET"
            })
        }
    }
```
</details>

My last API call was made to OpenWeather API's [Call 5 day/3 hour forecast data](https://openweathermap.org/forecast5) which returned the city's forecasted data for the next 5 days in 3 hour increments.

### Building the Forecast

The forecast utilized the OpenWeather API data from the 5-day/3-hour forecast call. I was able to filter the data down to a single hour for each day which could then be rendered to the weather tile HTML. Arranging the tiles horizontally was done using Bootstrap CSS framework.

## Screenshots of Application

![Day planner header image showing date format and styling](assets/Images/day-planner-header.PNG)*Day planner header image showing date format and styling*


## Author

[Heather Sorrells](mailto:hlsorrells.dev@gmail.com)