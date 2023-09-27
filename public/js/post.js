const postFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector("#post-content").value.trim();
    const postDate = new Date();

    // try {

    var backgroundImage = '';

    const userPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = userPosition.coords.latitude;
    const lon = userPosition.coords.longitude;

    backgroundImage = await getbackGround(lat, lon)

    console.log(backgroundImage);

    if (content) {
        const response = await fetch("/api/users/post", {
            method: "POST",
            body: JSON.stringify({ content, postDate, backgroundImage }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Error posting");
        }
    }
    else {
        alert("Post can not be empty");
    }

    // } catch (error) {
    //     console.error('Error getting user location:', error);
    //     alert("Error getting user location");
    // }

};

async function getForecast(lat, lon) {
    const weatherURL = `/api/weather?lat=${lat}&lon=${lon}`;
    console.log(lat);
    console.log(lon);

    console.log(weatherURL);

    return fetch(weatherURL)
        .then(function (response) {
            return response.json();
        });
}


async function getbackGround(lat, lon) {
    var imgString;

    const data = await getForecast(lat, lon)

    console.log(data);

    var ID = data.list[0].weather[0].id;

    if (ID >= 200 && ID <= 232) { imgString = "/assets/images/stormyphoto.jpg" }
    else if (ID >= 300 && ID <= 321) { imgString = "/assets/images/stormyphoto.jpg" }
    else if (ID >= 500 && ID <= 531) { imgString = "/assets/images/stormyphoto.jpg" }
    else if (ID >= 600 && ID <= 622) { imgString = "/assets/images/snowyphoto.jpg" }
    else if (ID == 701) { imgString = "/assets/images/cloudyphoto.JPG" }
    else if (ID == 11) { imgString = "/assets/images/cloudyphoto.JPG" }
    else if (ID == 721) { imgString = "/assets/images/cloudyphoto.JPG" }
    else if (ID == 731) { imgString = "/assets/images/cloudyphoto.JPG" }
    else if (ID == 741) { imgString = "/assets/images/cloudyphoto.JPG" }
    else if (ID == 751) { imgString = "/assets/images/stormyphoto.jpg" }
    else if (ID == 761) { imgString = "/assets/images/stormyphoto.jpg" }
    else if (ID == 762) { imgString = "/assets/images/volcanophoto.jpeg" }
    else if (ID == 771) { imgString = "/assets/images/stormyphoto.jpg" }
    else if (ID == 781) { imgString = "/assets/images/tornadophoto.jpeg" }
    else if (ID == 800) { imgString = "/assets/images/sunnyphoto.jpeg" }
    else if (ID >= 801 && ID <= 804) { imgString = "/assets/images/cloudyphoto.JPG" }

    return imgString;

}

document
    .querySelector(".post-form")
    .addEventListener("submit", postFormHandler);
