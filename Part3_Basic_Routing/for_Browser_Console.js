// Requesting a route
router.calculateRoute({
  // calculateRouteParams object
  'mode': 'fastest;car',
  // Start and end point
  'waypoint0': 'geo!52.530974,13.384944', // HERE HQ in Berlin, Germany
  'waypoint1': 'geo!52.5206,13.3862',  // Friedrichstraße Railway Station in Berlin, Germany
  // response formatting 
  'representation': 'display'
},

// onSuccess callback
function(result) {
  console.log('Route found!', result);
},

// onError callback
function(error) {
  console.error('Oh no! There was some communication error!', error);
}
);