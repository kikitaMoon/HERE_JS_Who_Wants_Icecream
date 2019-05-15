// Constructor (HEREMap())
function HEREMap (mapContainer, platform, mapOptions) {
  this.platform = platform
  this.position = mapOptions.center

  // Part 5 - new added
  this.markers = {
    myLocation: null,
    origin: null,
    destination: null
  }

  var defaultLayers = platform.createDefaultLayers()

  // Instantiate wrapped HERE map
  this.map = new H.Map(mapContainer, defaultLayers.terrain.map, mapOptions)

  // Part 5 - Instantiate the new class HERERouter
  this.router = new HERERouter(this.map, this.platform)

  // Basic behavior: Zooming and panning
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))

  // Watch the user's geolocation and display it
  navigator.geolocation.watchPosition(this.updateMyPosition.bind(this))

  // Resize the map when the window is resized
  window.addEventListener('resize', this.resizeToFit.bind(this))
}

// Centre the map and render the user position
HEREMap.prototype.updateMyPosition = function (event) {
  this.position = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  }

  this.updateMarker('marker-gelato', this.position)

  // Drawing Route
  // if (!this.route) {
  //   this.drawRoute(this.position, YHYCoordinates)
  //   this.myLocationMarker = this.addMarker(this.position, 'iceCream')
  //   this.map.setCenter(this.position)
  //   navigator.geolocation.clearWatch(id)
  // }
  this.drawRoute(this.position, YHYCoordinates)
  this.map.setCenter(this.position)
}

// Add a new marker at the provided coordinate
// Modified in Part-4-SS3-VisualTweaks
HEREMap.prototype.addMarker = function (coordinates, icon) {
  // Add an markerOptions object
  var markerOptions = {}
  // three different icons for origin, destination and the user's current position
  var icons = {
    iceCream: {
      url: './images/marker-gelato.svg',
      options: {
        size: new H.math.Size(26, 34),
        anchor: new H.math.Point(14, 34)
      }
    },
    origin: {
      url: './images/origin.png',
      options: {
        size: new H.math.Size(64, 64),
        anchor: new H.math.Point(32, 32)
      }
    },
    destination: {
      url: './images/destination.png',
      options: {
        size: new H.math.Size(64, 64),
        anchor: new H.math.Point(32, 32)
      }
    }
  }

  if (icons[icon]) {
    markerOptions = {
      icon: new H.map.Icon(icons[icon].url, icons[icon].options)
    }
  }

  var marker = new H.map.Marker(coordinates, markerOptions)
  this.map.addObject(marker)

  return marker
}

// Remove a marker from the map
HEREMap.prototype.removeMarker = function (marker) {
  this.map.removeObject(marker)
}

// Part 5 -  introduced a new updateMarker method to move markers after created
HEREMap.prototype.updateMarker = function (markerName, coordinates) {
  if (this.markers[markerName]) {
    this.removeMarker(this.markers[markerName])
  }

  this.markers[markerName] = this.addMarker(coordinates, markerName)
}





HEREMap.prototype.drawRoute = function (fromCoordinates, toCoordinates) {
  var routeOptions = {
    mode: 'fastest;car',
    representation: 'display',
    alternatives: 2,
    // routeattributes: 'waypoints,summary,shape,legs',
    waypoint0: Utils.locationToWaypointString(fromCoordinates),
    waypoint1: Utils.locationToWaypointString(toCoordinates)
  }

  this.addMarker(fromCoordinates, 'origin')
  this.addMarker(toCoordinates, 'destination')

  // this.routes = new HERERoute(this.map, this.platform, routeOptions)
  this.router.drawRoute(routeOptions)
}



// Update map centre and size if the browser window is resized.
HEREMap.prototype.resizeToFit = function () {
  this.map.getViewPort().resize()
}
