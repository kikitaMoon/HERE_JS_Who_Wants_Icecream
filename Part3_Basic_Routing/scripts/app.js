// Get Map Container Element
var mapContainer = document.getElementById('map-container');

// ----------------------------------------------------------------------
// instantiate the Platform class, and specify the APPID & APPCODE
var platform = new H.service.Platform({
  app_id: 'oyNWTbKIov6XPMlrX***', // // <-- ENTER YOUR APP ID HERE
  app_code: '_W_7qfgpOxthQ4tQQKk***', // <-- ENTER YOUR APP CODE HERE
});


// ----------------------------------------------------------------------- 
// Displaying a Basic Map， Initialize Map Object
// Create Defaulr Layer
var defaultLayers = platform.createDefaultLayers();

// // Adjust the Map Center and the Initial Zoom Level 
var EndCoordinates = {
  lat: 39.997117, // Yiheyuan Park in Beijing, China
  lng: 116.268112
};
var mapOptions = {
  center: EndCoordinates,
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


//----------------------------------------------------------------
// ##### Option 1 simply request a route via 2 points
//
// // simply call the HERE Routing  function
// var route = new HERERoute(map, platform, {
//   mode: 'fastest;car',
//   representation: 'display',
//   'waypoint0': 'geo!52.530974,13.384944', // HERE HQ in Berlin, Germany,
//   'waypoint1': 'geo!52.5206,13.3862'  // Friedrichstraße Railway Station
// });



// ##### Option 2  Advancedly acquire current location
//
// a small helper which converts a location into a waypoint
function locationToWaypointString(coordinates) {
  return 'geo!' + coordinates.lat + ',' + coordinates.lng;
}

// set a flag called RouteRendered
// to ensure that the route is only rendered the first time
var routeRendered = false;

function updatePosition(event) {
  var coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  var marker = new H.map.Marker(coordinates);
  map.addObject(marker);

  // If the route has not been rendered yet, 
  // calculate and render it
  if (!routeRendered) {
    var route = new HERERoute(map, platform, {
      mode: 'fastest;car',
      representation: 'display',
      waypoint0: locationToWaypointString(coordinates),
      waypoint1: locationToWaypointString(EndCoordinates)
    });
    routeRendered = true;
  }
}

// request the user's current location
navigator.geolocation.watchPosition(updatePosition);

