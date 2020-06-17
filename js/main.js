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
                    mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    mapService.panTo(pos.coords.latitude, pos.coords.longitude)
                })
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            moveToLocation(pos.coords.latitude, pos.coords.longitude);
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


document.querySelector('.btn-location').addEventListener('click', (ev) => {
    var elInput = document.querySelector('.input-loc').value;
    console.log(elInput)
    locService.getLocFromInput(elInput)
        .then(pos => {        
            mapService.addMarker(pos.data.results[0].geometry.location);
            mapService.panTo(pos.data.results[0].geometry.location.lat, pos.data.results[0].geometry.location.lng)
        })
})


