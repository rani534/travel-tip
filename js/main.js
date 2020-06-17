console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


// locService.getLocs()
//     .then(locs => console.log('locs', locs))

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
}


document.querySelector('.btn').addEventListener('click', (ev) => {
   
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.lat, pos.lng)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
})



document.querySelector('.btn-location').addEventListener('click', () => {
    var elInput = document.querySelector('.input-loc').value;
    console.log(elInput)
    locService.getLocFromInput(elInput)
        .then(pos => {
            console.log(pos)
            mapService.addMarker(pos);
            mapService.panTo(pos.lat, pos.lng);
            weatherLoc(pos.lat, pos.lng);
        })
})


function weatherLoc(lat, lng) {
    locService.getWeatherForLoc(lat, lng)
        .then(temp => {
            console.log(temp)
            document.querySelector('.weather').innerHTML = `Your Local Temperature is: ${kalvinToCel(temp)} celsius`;
        })
}
function kalvinToCel(tmp) {
    return (tmp - 273.15).toFixed(0);
}


