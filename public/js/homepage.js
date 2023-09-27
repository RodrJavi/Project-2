let userPosition;

navigator.geolocation.getCurrentPosition(function(position){
    console.log(position)
    
    getForecast(position.coords.latitude, position.coords.longitude)

})
