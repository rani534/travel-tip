console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            locService.getPosition()
                .then(pos => {
                    console.log(pos)
                    
                    mapService.addMarker({ lat: pos.latitude, lng: pos.longitude });
                    mapService.panTo(pos.latitude, pos.longitude);
                    weatherLoc(pos.latitude, pos.longitude);
                })
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            moveToLocation(pos.latitude, pos.longitude);
            // console.log('User position is:', pos.coords.latitude, pos.coords.longitude);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function moveToLocation(lat, lng) {
    document.querySelector('.btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        mapService.panTo(lat, lng);
    })
}


document.querySelector('.btn-location').addEventListener('click', () => {
    var elInput = document.querySelector('.input-loc').value;
    console.log(elInput)
    locService.getLocFromInput(elInput)
        .then(pos => {
            console.log(pos)
            mapService.addMarker(pos);
            mapService.panTo(pos.lat, pos.lng)
            weatherLoc(pos.lat, pos.lng)
            // locService.getWeatherForLoc(pos.data.results[0].geometry.location.lat, pos.data.results[0].geometry.location.lng)
            //     .then(res => {
            //         let tmp = res.data.current.temp;
            //         document.querySelector('.weather').innerHTML = `Your Local Temperature is: ${kalvinToCel(tmp)}`;
            //     })
        })
})

function kalvinToCel(tmp) {
    return (tmp - 273.15).toFixed(0);
}

function weatherLoc(lat, lng) {
    locService.getWeatherForLoc(lat, lng)
        .then(res => {
            let tmp = res.data.current.temp;
            document.querySelector('.weather').innerHTML = `Your Local Temperature is: ${kalvinToCel(tmp)} celsius`;
        })
}

// function renderLocation(loc) {
//     document.querySelector('.location').innerHTML = `Location: ${loc}`;
// }

