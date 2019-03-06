// build a function to take the map and platform objects as parameters
function HERERoute(map, platform, routeOptions) {

    // access the routing service by calling getRoutingService()
    var router = platform.getRoutingService();


    var onSuccess = function (result) {

        // Part4 SS2 modified
        // Simplify on success function
        if (result.response.route) {
            var routes = result.response.route;
            // Setting view bounds
            // routes.forEach(drawRoute);
            // add all routes to a group
            var routeLines = routes.map(drawRoute);
            var routeLineGroup = new H.map.Group({
                objects: routeLines
            });
            map.addObject(routeLineGroup);
            map.setViewBounds(routeLineGroup.getBounds());
        }
    };


    var onError = function (error) {
        console.error('Oh no! There was some communication error!', error);
    }

    // Part4 SS2 modified
    // Add drawRoute Function 
    var drawRoute = function (route) {
        var routeShape = route.shape;
        var LineString = new H.geo.LineString();

        routeShape.forEach(function (point) {
            var parts = point.split(',');
            LineString.pushLatLngAlt(parts[0], parts[1]);
        });

        var routeLine = new H.map.Polyline(LineString, {
            style: {
                strokeColor: 'blue',
                lineWidth: 3
            }
        });

        // Setting view bounds using Group bounds not the last route
        // map.addObject(routeLine);
        // map.setViewBounds(routeLine.getBounds());
        return routeLine;
    };


    router.calculateRoute(routeOptions, onSuccess, onError);
}