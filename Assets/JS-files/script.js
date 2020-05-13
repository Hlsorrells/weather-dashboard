$(document).ready(function () {
    var searches = JSON.parse(localStorage.getItem("searches")) || [];

    // Retrieve previous searches from local storage
    function renderHistory() {
        $("#search-history").empty();

        // Limit search history to last 5 cities
        var last5 = searches.slice(0, 4);
        for (var i = 0; i < last5.length; i++) {
            $("#search-history").append($("<p class='city'>").text(last5[i]));
        }
    }

    // Event listener for search submit button
    $("form").on("submit", function (event) {
        event.preventDefault();

        // Retrieve city value from input
        var city = $("#search").val().trim();

        // Add city to search history
        searches.push(city);
        localStorage.setItem("searches", JSON.stringify(searches));
        $("#search").val("");
        renderHistory();

        // Pull current weather data from API 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9288340a0d00c00e02bf6e9f809e872",
            method: "GET"
        }).then(function (response) {
            // Convert the temp to fahrenheit
            // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // var tempLike = (response.main.feels_like - 273.15) * 1.80 + 32;

            // Insert data into current weather section
            var box = $("#current-weather");
            console.log(response);
            box.append($("#city").text(response.name));
            box.append($("#temp").text("Current Temp (F): " + response.main.temp.toFixed(2)));
            box.append($("#feels-like").text("Feels Like (F): " + response.main.feels_like.toFixed(2)));
            box.append($("#humidity").text("Humidity: " + response.main.humidity + "%"));
            box.append($("#wind").text("Wind Speed: " + response.wind.speed + " mph"));
            $("#current-weather").append(box);
        })

        // Pull 5 day forecast data from API
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c9288340a0d00c00e02bf6e9f809e872",
            method: "GET"
        }).then(function (response) {
            console.log(response)
            // Convert the temp to fahrenheit
            // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // var tempLike = (response.main.feels_like - 273.15) * 1.80 + 32;

            // Insert data into current weather section
            // var box = $("#current-weather");
            // console.log(response);
            // box.append($("#city").text(response.name));
            // box.append($("#temp").text(tempF));
            // box.append($("#feels-like").text(tempLike));
            // box.append($("#humidity").text(response.main.humidity));
            // box.append($("#wind").text(response.wind.speed));
            // $("#current-weather").append(box);

        })
    });

    $(document).on("click", ".city", function () {
        console.log($(this).text());
    });

    renderHistory();
});