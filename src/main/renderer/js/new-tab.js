function getFormattedTime() {
    var d = new Date();
    var hour = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    document.getElementById("time").innerHTML = `${hour}:${m}:${s}`
    
}

setInterval(getFormattedTime, 1000);

(function () {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var d = new Date();
    var weekdate = weekdays[d.getDay()];
    var month = months[d.getMonth()];
    var day = d.getDate();
    var year = d.getFullYear();

    const renderedDate = `${weekdate}, ${month} ${day}, ${year}`
    console.log(renderedDate)

    document.getElementById("datetext").innerHTML = renderedDate;
    document.getElementById("datetext").style.textDecoration = "bold";
})();

(function (){
    var d = new Date();
    var day = d.getDay();

    
    if (day === 0) {
        // Sunday
        var availableReplies = ["Relax! It's Sunday!", "Just Relax!", "Today is a great day", "No work, no worries", "Be happy! It's Sunday!"];
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]
    } else if (day === 1) {
        var availableReplies = ["It's Monday! Start the week with a smile ;)", "Hard work gives great rewards", "New week! Take a breath!", "Weekend has ended, but time goes faster with hard work"];
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]
    } else if (day === 2) {
        var availableReplies = ["Tuesday, you passed monday so... less work today!", "Keep effort on this week", "First day passed!"];
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]
    } else if (day === 3) {
        var availableReplies = ["Congratulations! You've reached the middle of the week!", "Wednesday, this day is a perfect combination of relaxation and work", "Enjoy your Wednesday!"]
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]
    } else if (day === 4) {
        var availableReplies = ["Thursday, be happy because today you know what day it is!", "Be happy, you almost finish the weekdays!", "Inspire and work, tommorrow ends the weekdays"];
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]
    } else if (day === 5) {
        var availableReplies = ["It's Friday! Be excited!", "Friday always is happier", "Yay!", "Have fun!"];
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]

    } else if (day === 6) {
        var availableReplies = ["No work, no worries!", "Do whatever you want, today you have no work", "Yeah! Enjoy your Saturday!"]
        document.getElementById("motivatephrase").innerHTML = availableReplies[Math.floor(Math.random() * availableReplies.length)]
    }
})();

(function () {
    // THIS IS NOT STORED. YOU ARE PROTECTED. THIS IS ONLY FOR WEATHER DISPLAY PURPOSES
    (function () {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition);
        else document.getElementById("temperature").innerHTML = "--°"
    }
    )();

    async function showPosition(position) {
        const weather = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then(r => r.json());
        document.getElementById("temperature").innerHTML = `${weather.name}, ${weather.sys.country} | ${weather.main.temp}°C`;
        document.getElementById("weathericon").setAttribute("src", weather.weather[0].icon)

    }
})();
