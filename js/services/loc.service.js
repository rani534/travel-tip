export const locService = {
    // getLocs,
    getLocFromInput,
    getPosition,
    getWeatherForLoc
}
// var locs = [{ lat: 11.22, lng: 22.11 }]

// function getLocs() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(locs);
//         }, 2000)
//     });
// }


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
        .then(res => {
            console.log(res);
             return res.coords
        })
}

function getLocFromInput(el) {
    var prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${el}&key=AIzaSyAsASbQsbEeFyHwe6Ypjlwei49tcUNY604`)
        .then(res => {
            // console.log(res.data.results[0].formatted_address);  זה יביא לנו את שם המקום הפורמלי
            return res.data.results[0].geometry.location
        })
        .catch(err => {
            return console.log('input loc ERR:', err)
        })
    return prm
}

function getWeatherForLoc(lat, lng) {
    var prm = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=a8696af3caa6897d7557a938e56a28e7`)
        .then(res => res.data.current.temp)
        .catch(err => {
            console.log('input loc ERR:', err)
        })
    return prm
}

 