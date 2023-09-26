let userPosition;
navigator.geolocation.getCurrentPosition(function(position){
    // userPosition = position
    console.log(position)
    
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    getForecast(position.coords.latitude, position.coords.longitude)
// fetch(`/api/weather/${lat}/${lon}`).then(data=>{

// })

})

function getWeather(lat,lon){

}