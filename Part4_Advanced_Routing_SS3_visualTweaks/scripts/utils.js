var Utils = {
  locationToWaypointString: function (coordinates) {
    return 'geo!' + coordinates.lat + ',' + coordinates.lng
  }
}
