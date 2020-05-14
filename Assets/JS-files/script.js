$(document).ready(function () {
    var searches = JSON.parse(localStorage.getItem("searches")) || [];

    // Retrieve previous searches from local storage
    function renderHistory() {
        $("#search-history").empty();

        // Limit search history to last 5 cities
        var last5 = searches.slice(0, 4);
        for (var i = 0; i < last5.length; i++) {
            $("#search-history").append($("<a href='' class='city list-group-item'>").text(last5[i]));
        };
    };

    // Event listener for search submit button
    $("form").on("submit", function (event) {
        event.preventDefault();

        // Retrieve city value from input
        var city = $("#search").val().trim();

        // Pull current weather data from API 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9288340a0d00c00e02bf6e9f809e872",
            method: "GET"
        }).then(function (response) {
            // Add city to search history
            if (!searches.includes(response.name)) {
                searches.push(response.name);
            }
            localStorage.setItem("searches", JSON.stringify(searches));
            $("#search").val("");
            renderHistory();

            // Insert data into current weather section
            var box = $("#current-weather");
            console.log(response);
            box.append($("#city").text(response.name + " (" + moment().format('L') + ")"));
            box.append($("#temp").text("Current Temp (F): " + response.main.temp.toFixed(2)));
            box.append($("#feels-like").text("Feels Like (F): " + response.main.feels_like.toFixed(2)));
            box.append($("#humidity").text("Humidity: " + response.main.humidity + "%"));
            box.append($("#wind").text("Wind Speed: " + response.wind.speed + " MPH"));
            $("#current-weather").append(box);

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
            }).then(function (response) {
                var currentEL = $("#current-weather");
                currentEL.append($("#uv").text("UV Index: " + response.value));
            });
        };


        // Pull 5 day forecast data from API
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=c9288340a0d00c00e02bf6e9f809e872",
            method: "GET"
        }).then(function (response) {
            console.log(response)
            // Empty the historical cards if exists
            $(".card").empty();
            // Iterate through current date to set date title
            for (var i = 1; i < 6; i++) {
                var tile = $(".card");
                var title = $("<h5 class='card-title'>")
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png").attr("style", "width: 200px");
                var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");
                tile.append((title).text(moment().add(i, "day").format('L')), img, p1, p2);
            }
        });

    });

    $(document).on("click", ".city", function () {
        console.log($(this).text());
    });

    renderHistory();
});