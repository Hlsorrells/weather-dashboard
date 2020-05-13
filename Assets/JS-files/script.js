$(document).ready(function () {
    var searches = JSON.parse(localStorage.getItem("searches")) || [];

    // Retrieve previous searches from local storage
    function renderHistory() {
        $("#search-history").empty();

        for (var i = 0; i < searches.length; i++) {
            $("#search-history").append($("<p class='city'>").text(searches[i]));
        }
    }

    // Event listener for search submit button
    $("form").on("submit", function (event) {
        event.preventDefault();

        // Retrieve city value from input
        var city = $("#city").val().trim();
        console.log(city)

        // Add city to search history
        searches.push(city);
        localStorage.setItem("searches", JSON.stringify(searches));
        $("#city").val("");
        renderHistory();

        
    });

    // 
    $(document).on("click", ".city", function () {
        console.log($(this).text());
    });

    renderHistory();
});