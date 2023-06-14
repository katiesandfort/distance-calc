// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

//create map
const map = L.map('map').setView([47.6777, -122.338], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//calculate distance
let startPoint;
let endPoint;
let _polyline;
let markerA = null;
let markerB = null;

//get button
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (startPoint && endPoint) {
    map.removeLayer(markerA);
    map.removeLayer(markerB);
    map.removeLayer(_polyline);
      _polyline = null;
  }

  const pointA = document.getElementById('pointA');
  const pointB = document.getElementById('pointB');
  const stringA = pointA.value;
  const pointAArr = stringA.split(',');
  startPoint = {
    lat: pointAArr[0],
    lng: pointAArr[1]
  }

  const stringB = pointB.value;
  const pointBArr = stringB.split(',');
  endPoint = {
    lat: pointBArr[0],
    lng: pointBArr[1]
  }

  markerA = L.marker(startPoint).addTo(map);
  markerB = L.marker(endPoint).addTo(map);
  _polyline = L.polyline([startPoint, endPoint], {
    color:"purple"
  }).addTo(map);
  let length = map.distance(startPoint, endPoint);
  length = length/1000
  document.getElementById("distance").innerHTML = `${length}kms`;
})

map.on('click', (e) => {
  if(!startPoint){
    startPoint = e.latlng;
    console.log(startPoint);
    markerA = L.marker(startPoint).addTo(map);
  }else if (!endPoint){
    endPoint = e.latlng;
    markerB = L.marker(endPoint).addTo(map);
    _polyline = L.polyline([startPoint, endPoint], {
      color:"purple"
    }).addTo(map);
    let length = map.distance(startPoint, endPoint);
    length = length/1000
    document.getElementById("distance").innerHTML = `${length}kms`;
  }else{
    if (_polyline){
      map.removeLayer(_polyline);
      _polyline = null;
    }
    startPoint = e.latlng;
    endPoint = null;
    map.removeLayer(markerA);
    map.removeLayer(markerB);
    markerA = L.marker(startPoint).addTo(map)
  }
})