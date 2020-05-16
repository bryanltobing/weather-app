const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageIcons = document.querySelector('#message-icons');
const messageLocation = document.querySelector('#message-location');
const messageTemperature = document.querySelector('#message-temperature');
const messagePrecip = document.querySelector('#message-precip');
const messageDescription = document.querySelector('#message-description');



weatherform.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageIcons.src = "https://f.v1.n0.cdn.getcloudapp.com/items/1J0Y1N1I441v1E2k3e2W/weather.png";
    messageLocation.textContent = "Loading...";
    messageTemperature.textContent = ``;
    messagePrecip.textContent = ``;
    messageDescription.textContent = ``;
    document.getElementById("cardId").style.display = "block";


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageIcons.textContent = data.error;
            } else {
                messageIcons.src = data.icons;
                messageLocation.textContent = data.location;
                messageTemperature.textContent = `${data.forecast}°C`;
                messagePrecip.textContent = `${data.precip}% rain`;
                messageDescription.textContent = `"${data.description}"`;
            }
        })
    });
});