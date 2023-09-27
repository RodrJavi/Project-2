async function getForecast(lat, lon) {
    const weatherURL = `/api/weather?lat=${lat}&lon=${lon}`
    console.log(lat)
    console.log(lon)

    console.log(weatherURL);
    
    fetch(weatherURL)
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

async function getCoordinates(cityName) {
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