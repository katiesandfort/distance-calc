// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

//create map
const map = L.map('map').setView([47.6777, -122.338], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

 // create the geocoding control and add it to the map
//  var searchControl = L.esri.Geocoding.geosearch({
//   providers: [
//     L.esri.Geocoding.arcgisOnlineProvider({
//       // API Key to be passed to the ArcGIS Online Geocoding Service
//       apikey: 'YOUR_API_KEY'
//     })
//   ]
// }).addTo(map);

// // create an empty layer group to store the results and add it to the map
// var results = L.layerGroup().addTo(map);

// // listen for the results event and add every result to the map
// searchControl.on("results", function (data) {
//   results.clearLayers();
//   for (var i = data.results.length - 1; i >= 0; i--) {
//     results.addLayer(L.marker(data.results[i].latlng));
//   }
// });

//initialize variables
let startPoint;
let endPoint;
let polyline;
let markerA = null;
let markerB = null;

function getDistance(start, end) {
  polyline = L.polyline([start, end], {
    color:"purple"
  }).addTo(map);
  let length = map.distance(start, end);
  length = length/1000
  document.getElementById("distance").innerHTML = `${length.toFixed(2)}km`;
}

function placeMarker(point) {
  return L.marker(point).addTo(map);
}

//get form
const form = document.getElementById('form');

//listen for form submission
form.addEventListener('submit', (e) => {
  //prevent default
  e.preventDefault();

  //clear map if previous entries are present
  if (startPoint && endPoint) {
    map.removeLayer(markerA);
    map.removeLayer(markerB);
    map.removeLayer(polyline);
    polyline = null;
  }

  //get values from form
  const pointA = document.getElementById('pointA');
  const pointB = document.getElementById('pointB');
  const stringA = pointA.value;
  const stringB = pointB.value;

  //format starting point
  const pointAArr = stringA.split(',');
  startPoint = {
    lat: pointAArr[0],
    lng: pointAArr[1]
  }

  //formate ending point
  const pointBArr = stringB.split(',');
  endPoint = {
    lat: pointBArr[0],
    lng: pointBArr[1]
  }

  //place markers
  markerA = placeMarker(startPoint);
  markerB = placeMarker(endPoint);
  
  //get distance
  getDistance(startPoint, endPoint);
})

//extra functionality for clicking map
map.on('click', (e) => {
  //first click
  if(!startPoint){
    startPoint = e.latlng;
    markerA = placeMarker(startPoint);
  }
  //second click
  else if (!endPoint){
    endPoint = e.latlng;
    markerB = placeMarker(endPoint);
    getDistance(startPoint, endPoint);
  }
  //third click
  else{
    if (polyline){
      map.removeLayer(polyline);
      polyline = null;
    }
    startPoint = e.latlng;
    endPoint = null;
    map.removeLayer(markerA);
    map.removeLayer(markerB);
    markerA = L.marker(startPoint).addTo(map)
  }
});


