// build a function to take the map and platform objects as parameters
function HERERoute (map, platform, routeOptions) {

  // access the routing service by calling getRoutingService()
  var router = platform.getRoutingService()

  var onSuccess = function (result) {
    if (result.response.route) {
      var routeLineGroup = new H.map.Group()

      var routes = result.response.route.map(function (route) {
        var routeLine = drawRoute(route)
        routeLineGroup.addObject(routeLine)

        return {
          route: route,
          routeLine: routeLine
        }
      })

      map.addObject(routeLineGroup)
      map.setViewBounds(routeLineGroup.getBounds())
    }
  }

  var onError = function (error) {
    console.error('Oh no! There was some communication error!', error)
  }

  // Add drawRoute Function 
  var drawRoute = function (route) {
    var routeShape = route.shape
    var LineString = new H.geo.LineString()

    routeShape.forEach(function (point) {
      var parts = point.split(',')
      LineString.pushLatLngAlt(parts[0], parts[1])
    })

    var routeLine = new H.map.Polyline(LineString, {
      style: {
        strokeColor: 'rgba(0, 85, 170, 0.5)',
        lineWidth: 3
      }
    })

    return routeLine
  }

  router.calculateRoute(routeOptions, onSuccess, onError)
}
