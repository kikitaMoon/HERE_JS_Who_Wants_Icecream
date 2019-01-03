// Get Map Container Element
var mapContainer = document.getElementById('map-container');


// ----------------------------------------------------------------------
// instantiate the Platform class, and specify the APPID & APPCODE
var platform = new H.service.Platform({
  app_id: 'oyNWTbKIov6XPMlrX***', // // <-- ENTER YOUR APP ID HERE
  app_code: '_W_7qfgpOxthQ4tQQKk***', // <-- ENTER YOUR APP CODE HERE
});

// ----------------------------------------------------------------------
// mapOptions
var endCoordinates = {
  lat: 39.997117, // Yiheyuan Park in Beijing, China
  lng: 116.268112
};
var mapOptions = {
  center: endCoordinates,
  zoom: 14
}

// only a single line after code cleaning up (Pre-session: Refactor)
var map = new HEREMap(mapContainer, platform, mapOptions);


