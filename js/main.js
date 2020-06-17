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

<<<<<<< HEAD


document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);
})
=======
function moveToLocation(lat, lng) {
    document.querySelector('.btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        mapService.panTo(lat, lng);
    })
}
>>>>>>> b290f6f3c63e2df249f83c83f39fb79f24347edf
