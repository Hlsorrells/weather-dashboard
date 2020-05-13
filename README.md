# Weather Dashboard

## Project Description

A weather dashboard app that features dynamically updated HTML and CSS powered by OpenWeather API to retrieve data for cities.

## Deployment

  [Weather Dashboard](https://hlsorrells.github.io/WeatherDashboard/)

  ![](assets/images/.gif)

## Table of Contents

  * [Assignment Instructions](#assignment-instructions)
    * [User Story](#user-story)
    * [Acceptance Criteria](#acceptance-criteria)
  * [Project Lessons](#project-lessons)
    * [Creating the bank of characters](#Creating-the-bank-of-characters)
    * [User prompts and responses](#user-prompts-and-responses)
    * [Password Generation Loop](#password-generation-loop)
    * [Error alerts](#error-alerts)
    * [Final assembly and deployment](#final-assembly-and-deployment)
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

### 