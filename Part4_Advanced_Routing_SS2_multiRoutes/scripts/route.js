// build a function to take the map and platform objects as parameters
function HERERoute(map, platform, routeOptions) {

    // access the routing service by calling getRoutingService()
    var router = platform.getRoutingService();


    var onSuccess = function (result) {
        // Option_1 Simply put the response to the console log
        console.log('Route found!', result);

        // Option_2 Furtherly draw the response to the map
        var route,
            routeShape,
            startPoint,
            endPoint,
            //strip;
            lineString;

        if (result.response.route) {

            // Just take the first Route in the array
            route = result.response.route[0];
            routeShape = route.shape;
            // H.geo.Strip has been deprecated since 3.0.15.0
            lineString = new H.geo.LineString();
            routeShape.forEach(function (point) {
                var parts = point.split(',');
                lineString.pushLatLngAlt(parts[0], parts[1]);
            });

            // Utilize H.map.Polyline to draw a blue line
            var routeLine = new H.map.Polyline(lineString, {
                style: {
                    strokeColor: 'blue',
                    lineWidth: 10
                }
            });
            map.addObject(routeLine);

            // update the map bounds to that of our route
            map.setViewBounds(routeLine.getBounds());
        }
    };

    var onError = function (error) {
        console.error('Oh no! There was some communication error!', error);
    }

    router.calculateRoute(routeOptions, onSuccess, onError);
}