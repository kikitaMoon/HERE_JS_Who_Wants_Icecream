// Get Map Container Element
var mapContainer = document.getElementById('map-container');

// Specify the APPID & APPCODE
var platform = new H.service.Platform({
  app_id: 'oyNWTbKIov6XPMlrXxCH', // // <-- ENTER YOUR APP ID HERE
  app_code: '_W_7qfgpOxthQ4tQQKkbLA', // <-- ENTER YOUR APP CODE HERE
});


// ----------------------------------------------------------------------- 
// Displaying a Basic Map， Initialize Map Object
// Create Defaulr Layer
var defaultLayers = platform.createDefaultLayers();

// // Adjust the Map Center and the Initial Zoom Level 
var coordinates = {
  lat: 52.530974, // HERE HQ in Berlin, Germany
  lng: 13.384944
};
var mapOptions = {
  center: coordinates,
  zoom: 14
}
var map = new H.Map(
  mapContainer,
  defaultLayers.normal.map,
  mapOptions);


// ----------------------------------------------------------------------- 
// Interacting with the map, at least move around and zoom in / out
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


// ----------------------------------------------------------------------- 
// Set Event Listener to Make Map React Properly
window.addEventListener('resize', function () {
  map.getViewPort().resize();
});


// // -----------------------------------------------------------------------
// // Adding Markers to the Map
// var marker = new H.map.Marker(coordinates);

// // Custom Icons for Markers
// var iconUrl = './images/icecream.svg';

// var iconOptions = {
// 	// The icon's size in pixel:
//   size: new H.math.Size(26, 34),
// 	// The anchorage point in pixel, 
// 	// defaults to bottom-center
//   anchor: new H.math.Point(14, 34)
// };

// var markerOptions = {
//    icon: new H.map.Icon(iconUrl, iconOptions)
// };

// var marker = new H.map.Marker(coordinates, markerOptions);
//  map.addObject(marker);


/// ===============================================================
/// Part 2 update


// -----------------------------------------------------------------
// Acquire a user's location once via Browser
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
// Action
navigator.geolocation.getCurrentPosition(success, error, options);

// --------------------------------------------------------------------
// WatchPosition call every time the position of the device changes
function updatePosition (event) {
  var coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };
  var iconUrl = './images/icecream.svg';
  var iconOptions = {
    size: new H.math.Size(26, 34),
    anchor: new H.math.Point(14, 34)
  };
  var markerOptions = {
    icon: new H.map.Icon(iconUrl, iconOptions)
  };
   var marker = new H.map.Marker(coordinates, markerOptions);
  map.addObject(marker);
  map.setCenter(coordinates);
}
// Action
navigator.geolocation.watchPosition(updatePosition);

//-------------------------------------------------------------------
// clearWatch to stop watching for location updates 
// navigator.geolocation.clearWatch(watchID);