// build a function to take the map and platform objects as parameters
function HERERoute (map, platform, routeOptions) {

  // access the routing service by calling getRoutingService()
  var router = platform.getRoutingService()

  // SS4 Added - specify a new PolyLine style to highlight the selected route
  var routeLineStyles = {
    normal: { strokeColor: 'rgba(0, 85, 170, 0.5)', lineWidth: 3 },
    selected: { strokeColor: 'rgba(255, 0, 0, 0.7)', lineWidth: 7 }
  }

  var selectedRoute

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

      // pass the first route as argument for temperary testing
      onRouteSelection(routes[0])
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
    style: routeLineStyles.normal })
    return routeLine
  }

  // defining a callback to be triggered every time a route is selected
  var onRouteSelection = function (route) {
    console.log('A route has been selected.', route)
    selectedRoute = route
    if (selectedRoute) {
      selectedRoute.routeLine.setStyle(routeLineStyles.normal).setZIndex(1)
    }
    route.routeLine.setStyle(routeLineStyles.selected).setZIndex(10)
    selectedRoute = route
  }

  router.calculateRoute(routeOptions, onSuccess, onError)
}
