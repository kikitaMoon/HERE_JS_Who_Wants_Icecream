// Constructor (HEREMap())
function HEREMap(mapContainer, platform, mapOptions) {
    this.platform = platform;
    this.position = mapOptions.center;

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
    if (this.myLocationMarker) {
        this.removeMarker(this.myLocationMarker);
    }

    this.myLocationMarker = this.addMarker(this.position);
    this.map.setCenter(this.position);
};

// Add a new marker at the provided coordinate
HEREMap.prototype.addMarker = function (coordinates) {
    var marker = new H.map.Marker(coordinates);
    this.map.addObject(marker);

    return marker;
};

// Remove a marker from the map
HEREMap.prototype.removeMarker = function (marker) {
    this.map.removeObject(marker);
};

// Update map centre and size if the browser window is resized.
HEREMap.prototype.resizeToFit = function () {
    this.map.getViewPort().resize();
};

// Drawing Route
if (!this.route) {
    this.drawRoute(this.position, endCoordinates);
  }

HEREMap.prototype.drawRoute = function (fromCoordinates, toCoordinates) {
    var routeOptions = {
        mode: 'fastest;car',
        representation: 'display',
        waypoint0: locationToWaypointString(fromCoordinates),
        waypoint1: locationToWaypointString(toCoordinates)
    };

    this.routes = new HERERoute(this.map, this.platform, routeOptions);
};



