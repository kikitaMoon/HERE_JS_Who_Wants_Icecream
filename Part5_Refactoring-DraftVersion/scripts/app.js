// Get Map Container Element
var mapContainer = document.getElementById('map-container')

// ----------------------------------------------------------------------
// instantiate the Platform class, and specify the APPID & APPCODE
var platform = new H.service.Platform({
  app_id: 'oyNWTbKIov6XPMlrXxCH', // // <-- ENTER YOUR APP ID HERE
  app_code: '_W_7qfgpOxthQ4tQQKkbLA', // <-- ENTER YOUR APP CODE HERE
  useHTTPS: true
})

// ----------------------------------------------------------------------
// mapOptions
var YHYCoordinates = {
  lat: 39.997117, // Yiheyuan Park in Beijing, China
  lng: 116.268112
}
var mapOptions = {
  center: YHYCoordinates,
  zoom: 14
}

// only a single line after code cleaning up (Pre-session: Refactor)
var map = new HEREMap(mapContainer, platform, mapOptions)
