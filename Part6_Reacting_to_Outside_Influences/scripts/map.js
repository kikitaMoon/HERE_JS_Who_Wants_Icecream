// Constructor (HEREMap())
function HEREMap(mapContainer, platform, mapOptions) {
    this.platform = platform;
    this.position = mapOptions.center;

    // Added - Part 5
    this.router = new HERERouter(this.map, this.platform);
    this.route = new HERERoute(this.map, this.platform, routeOptions);
    this.router.drawRoute(routeOptions);
    this.markers = {
        myLocation: null,
        origin: null,
        destination: null
    };
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate wrapped HERE map
    this.map = new H.Map(mapContainer, defaultLayers.normal.map, mapOptions);

    // Basic behavior: Zooming and panning
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    // Watch the user's geolocation and display it
    navigator.geolocation.watchPosition(this.updateMyPosition.bind(this));

    // Resize the map when the window is resized
    window.addEventListener('resize', this.resizeToFit.bind(this));
}



// Centre the map and render the user position
HEREMap.prototype.updateMyPosition = function (event) {
    this.position = {
        lat: event.coords.latitude,
        lng: event.coords.longitude
    };

    // Remove old location marker if it exists
    this.updateMarker('myLocation', this.position)

    // Draw the route from current location to HERE HQ if not yet drawn
    this.drawRoute(this.position, endCoordinates);

    this.map.setCenter(this.position);
};



// Add a new marker at the provided coordinate
HEREMap.prototype.addMarker = function (coordinates) {
    var marker = new H.map.Marker(coordinates);
    this.map.addObject(marker);

    return marker;
};



// Part 5 moving markers after they have been created
HEREMap.prototype.updateMarker = function(markerName, coordinates) {
    if (this.markers[markerName]) {
      this.removeMarker(this.markers[markerName]);
    }
  
    this.markers[markerName] = this.addMarker(coordinates, markerName);
  }



// Remove a marker from the map
HEREMap.prototype.removeMarker = function (marker) {
    this.map.removeObject(marker);
};



// Update map centre and size if the browser window is resized.
HEREMap.prototype.resizeToFit = function () {
    this.map.getViewPort().resize();
};


HEREMap.prototype.drawRoute = function (fromCoordinates, toCoordinates) {
    var routeOptions = {
        mode: 'fastest;car',
        representation: 'display',
        // Part4 SS2 modified
        // By passing an integer via the alternatives key 
        // when requesting routing information from the API 
        // we will be provided additional options.
        alternatives: 2,
        waypoint0: Utils.locationToWaypointString(fromCoordinates),
        waypoint1: Utils.locationToWaypointString(toCoordinates)
    };
    // Modified by Part 5
    // this.route = new HERERoute(this.map, this.platform, routeOptions);
    this.router.drawRoute(routeOptions);

};