import React, { useEffect } from 'react';

useEffect(() => {
  const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}, [])


function Map () {
  return (
    <div id="map"> </div>
  )
}

export default Map;