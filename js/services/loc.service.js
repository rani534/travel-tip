export const locService = {
    getLocs,
    getLocFromInput,
    getPosition
}
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getLocFromInput(el) {
    var prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${el}&key=AIzaSyAsASbQsbEeFyHwe6Ypjlwei49tcUNY604`);
    prm.then(res => res)
    prm.catch(err => {
        console.log('input loc ERR:', err);
    })
    console.log(prm)
    return prm
}

