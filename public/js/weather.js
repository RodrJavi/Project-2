// const weatherAPIKey = "0515863abdb974046c441a5fc7974a22";
function getForecast(lat, lon) {
    // const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`;
    const weatherURL = "/weather/getCurrentWeather"

    console.log(weatherURL);
    
    fetch(weatherURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}


// Add in for after log in 
function getCoordinates(cityName) {
    const coordinatesURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherAPIKey}`
    fetch(coordinatesURL)
    .then (function (response) {
        console.log(response)
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        getForecast(data[0].lat, data[0].lon);
        
    });
}