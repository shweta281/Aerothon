
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import './Map.css';

const API_KEY1 = "AIzaSyBfZK2cawU8atROFlbffslnR8Eb0ZRRtLA";
const API_KEY2 = "4f95a1ab02491334fdeeb8932c1ddaf8";
const url_1 = "https://api.openweathermap.org/data/2.5/weather?q=";
const url_2 = `&appid=${API_KEY2}`;


const colors = {
  "Clouds": "#778899", 
  "Clear": "#87CEEB", 
  "Few Clouds": "#B0E0E6", 
  "Scattered Clouds": "#ADD8E6",
  "Broken Clouds": "#B0C4DE",
  "Shower Rain": "#4682B4",
  "Rain": "#1E90FF",
  "Thunderstorm": "#000080",
  "Snow": "#FFFAFA",
  "Mist": "#778899",
  "Smoke": "#696969",
  "Haze": "#708090",
  "Dust": "#D3D3D3",
  "Fog": "#C0C0C0",
  "Sand": "#EDC9AF",
  "Ash": "#A9A9A9",
};

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

function midpoint(lat1, lon1, lat2, lon2, n, arr) {
  if (n === 0) return;
  let latr1 = toRadians(lat1);
  let lonr1 = toRadians(lon1);
  let latr2 = toRadians(lat2);
  let lonr2 = toRadians(lon2);

  const x1 = Math.cos(latr1) * Math.cos(lonr1);
  const y1 = Math.cos(latr1) * Math.sin(lonr1);
  const z1 = Math.sin(latr1);

  const x2 = Math.cos(latr2) * Math.cos(lonr2);
  const y2 = Math.cos(latr2) * Math.sin(lonr2);
  const z2 = Math.sin(latr2);

  const x_m = (x1 + x2) / 2;
  const y_m = (y1 + y2) / 2;
  const z_m = (z1 + z2) / 2;

  const lon_m = Math.atan2(y_m, x_m);
  const hyp = Math.sqrt(x_m * x_m + y_m * y_m);
  const lat_m = Math.atan2(z_m, hyp);

  midpoint(lat1, lon1, toDegrees(lat_m), toDegrees(lon_m), n - 1, arr);
  midpoint(toDegrees(lat_m), toDegrees(lon_m), lat2, lon2, n - 1, arr);
  arr.push({
    lat: toDegrees(lat_m),
    lng: toDegrees(lon_m),
  });
}

const Map = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  const handleButtonClick = async () => {
    try {
        
      const response1 = await fetch(url_1 + input1 + url_2);
      const data1 = await response1.json();
      const lt1 = data1?.coord?.lat;
      const long1 = data1?.coord?.lon;

      const response2 = await fetch(url_1 + input2 + url_2);
      const data2 = await response2.json();
      const lt2 = data2?.coord?.lat;
      const long2 = data2?.coord?.lon;

      if (!(lt1 && lt2 && long1 && long2)) throw new Error("DATA NOT FETCHED: longitude latitude not found!")

      let arr = [];
      midpoint(lt1, long1, lt2, long2, 4, arr);
      arr.push({ lat: lt2, lng: long2 });
      arr.unshift({ lat: lt1, lng: long1 });

      const newMarkers = await Promise.all(arr.map(async (position) => {
        
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${API_KEY2}&lang=en&units=metric`);
        const weatherData = await weatherResponse.json();
        const weatherCond = weatherData.weather[0].main;
        const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        return {
          position,
          title: `${weatherData.name}, ${weatherData.weather[0].main}, ${weatherData.main.temp} °C`,
          weatherIcon,
          weatherCond,
        };
      }));

      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleMarkerClick = (marker) => {
    setInfoWindow(marker);
  };

  return (
    <center className="map-container">
      <div className="map-out">
        <div className="InputContainer">
          <input className='input' type="text" placeholder="Source..." value={input1} onChange={(e) => setInput1(e.target.value)} id="input1" />
          <input className='input' type="text" placeholder="Destination" value={input2} onChange={(e) => setInput2(e.target.value)} id="input2" />
          <button className="map-button" onClick={handleButtonClick}>Fetch Weather and Plot</button>
        </div>
        <div className='map-box'>
        <LoadScript googleMapsApiKey={API_KEY1}>
          <GoogleMap
            className="map-box"
            mapContainerStyle={{ height: '70vh', width: '100%' }}
            center={{ lat: 28.7041, lng: 77.1025 }}
            zoom={6}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                icon={{
                  url: marker.weatherIcon,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
            ))}
            {infoWindow && (
              <InfoWindow
                position={infoWindow.position}
                onCloseClick={() => setInfoWindow(null)}
              >
                <div>{infoWindow.title}</div>
              </InfoWindow>
            )}
            <Polyline
              path={markers.map(marker => marker.position)}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 1.0,
                strokeWeight: 4,
                geodesic: true,
              }}
            />
          </GoogleMap>
        </LoadScript>
        </div>
      </div>
    </center>
  );
};

export default Map;


// import React from "react";
// import { GoogleMap, LoadScript, InfoWindow, Marker, Polyline } from 'google-map-react';

// import './Map.css'
// // import MapContainer from './MapContainer'

// import  { useState } from 'react';
// import { useEffect } from 'react';

// const API_KEY = "AIzaSyBfZK2cawU8atROFlbffslnR8Eb0ZRRtLA";
// const url_1 = "https://api.openweathermap.org/data/2.5/weather?q=";
// const url_2 = `&appid=${API_KEY}`;

// const colors = {
//   "Clouds": "#778899", 
//   "Clear": "#87CEEB", 
//   "Few Clouds": "#B0E0E6", 
//   "Scattered Clouds": "#ADD8E6",
//   "Broken Clouds": "#B0C4DE",
//   "Shower Rain": "#4682B4",
//   "Rain": "#1E90FF",
//   "Thunderstorm": "#000080",
//   "Snow": "#FFFAFA",
//   "Mist": "#778899",
//   "Smoke": "#696969",
//   "Haze": "#708090",
//   "Dust": "#D3D3D3",
//   "Fog": "#C0C0C0",
//   "Sand": "#EDC9AF",
//   "Ash": "#A9A9A9",
// };

// function toRadians(degrees) {
//   return degrees * Math.PI / 180;
// }

// function toDegrees(radians) {
//   return radians * 180 / Math.PI;
// }

// function midpoint(lat1, lon1, lat2, lon2, n, arr) {
//   if (n === 0) return;
//   let latr1 = toRadians(lat1);
//   let lonr1 = toRadians(lon1);
//   let latr2 = toRadians(lat2);
//   let lonr2 = toRadians(lon2);

//   const x1 = Math.cos(latr1) * Math.cos(lonr1);
//   const y1 = Math.cos(latr1) * Math.sin(lonr1);
//   const z1 = Math.sin(latr1);

//   const x2 = Math.cos(latr2) * Math.cos(lonr2);
//   const y2 = Math.cos(latr2) * Math.sin(lonr2);
//   const z2 = Math.sin(latr2);

//   const x_m = (x1 + x2) / 2;
//   const y_m = (y1 + y2) / 2;
//   const z_m = (z1 + z2) / 2;

//   const lon_m = Math.atan2(y_m, x_m);
//   const hyp = Math.sqrt(x_m * x_m + y_m * y_m);
//   const lat_m = Math.atan2(z_m, hyp);

//   midpoint(lat1, lon1, toDegrees(lat_m), toDegrees(lon_m), n - 1, arr);
//   midpoint(toDegrees(lat_m), toDegrees(lon_m), lat2, lon2, n - 1, arr);
//   arr.push({
//     lat: toDegrees(lat_m),
//     lng: toDegrees(lon_m),
//   });
// }

// const Map = () => {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     const loadMap = async () => {
//       const { Map, InfoWindow } = await google.maps.importLibrary("maps");
//       const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

//       const mapInstance = new Map(document.getElementById("map"), {
//         center: { lat: 28.7041, lng: 77.1025 },
//         zoom: 6,
//         mapId: "4504f8b37365c3d0",
//       });
//       setMap(mapInstance);

//       const handleButtonClick = async () => {
//         try {
//           const response1 = await fetch(url_1 + input1 + url_2);
//           const data1 = await response1.json();
//           const lt1 = data1.coord.lat;
//           const long1 = data1.coord.lon;

//           const response2 = await fetch(url_1 + input2 + url_2);
//           const data2 = await response2.json();
//           const lt2 = data2.coord.lat;
//           const long2 = data2.coord.lon;

//           let arr = [];
//           midpoint(lt1, long1, lt2, long2, 4, arr);
//           arr.push({ lat: lt2, lng: long2 });
//           arr.unshift({ lat: lt1, lng: long1 });

//           const infoWindow = new InfoWindow();
//           arr.forEach(async (position) => {
//             try {
//               const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${API_KEY}&lang=en&units=metric`);
//               const weatherData = await weatherResponse.json();
//               const weatherCond = weatherData.weather[0].main;
//               const tempArr = weatherData.name || "unknown";
//               const image = document.createElement("img");
//               image.style.width = "70px";
//               image.style.height = "70px";
//               image.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

//               const pin = new PinElement({
//                 glyph: image,
//                 scale: 2,
//                 background: colors[weatherCond],
//               });
//               const marker = new AdvancedMarkerElement({
//                 position,
//                 map: mapInstance,
//                 title: `${tempArr}, ${weatherData.weather[0].main}, ${weatherData.main.temp} °C`,
//                 content: pin.element,
//                 gmpClickable: true,
//               });

//               marker.addListener("click", ({ domEvent, latLng }) => {
//                 const { target } = domEvent;
//                 infoWindow.close();
//                 infoWindow.setContent(marker.title);
//                 infoWindow.open(marker.map, marker);
//               });

//               const line = new google.maps.Polyline({
//                 path: arr,
//                 strokeColor: "#0000FF",
//                 strokeOpacity: 1.0,
//                 strokeWeight: 4,
//                 geodesic: true,
//                 map: mapInstance,
//               });
//               line.setMap(mapInstance);
//             } catch (error) {
//               console.error('Error fetching weather data:', error);
//             }
//           });
//         } catch (error) {
//           console.error('Error fetching weather data:', error);
//         }
//       };

//       document.getElementById("btn").addEventListener("click", handleButtonClick);
//     };

//     loadMap();
//   }, [input1, input2]);

//   return (
//     <center className="map-container">
//         <div className="map-out">
//             <div className="InputContaier">
//                 <input className='input' type="text" placeholder="Enter city 1" value={input1} onChange={(e) => setInput1(e.target.value)} id="input1" />
//                 <input className='input' type="text" placeholder="Enter city 2" value={input2} onChange={(e) => setInput2(e.target.value)} id="input2" />
//                 <button className="map-button" id="btn">Fetch Weather and Plot</button>
//             </div>
//             <div className="map-box" id="map" style={{ height: '70vh', width: '100%' }}></div>
//         </div>
//     </center>
//   );
// };

// export default Map;



// export default function Map(){
//     return (
//         <center className='map-container'>
//             <ul className='search-list'>
//                 <li>
//                     <div class="InputContainer">
//                         <input placeholder="Source.." id="input1" class="input" name="text" type="text"/>
//                     </div>
//                 </li>
//                 <li>
//                     <div class="InputContainer">
//                         <input placeholder="Destination.." id="input2" class="input" name="text" type="text"/>
//                     </div>
//                 </li>
//                 <li>
//                     <div >
//                         <button id='btn' className="map-button" onClick={"initMap()"}> Search </button>
//                     </div>
//                 </li>

//             </ul>
//             <div className='map-class'>
//                 <div className='map-box' style={{ height: '70vh', width: '100%' }}>
//                     <GoogleMapReact
//                         bootstrapURLKeys={{ key: API_KEY }}
//                         defaultCenter={defaultProps.center}
//                         defaultZoom={defaultProps.zoom}
//                     >
//                         <AnyReactComponent
//                         lat={59.955413}
//                         lng={30.337844}
//                         text="My Marker"
//                         />
//                     </GoogleMapReact>
//                     </div>
//             </div>
//         </center>
//     )
// }