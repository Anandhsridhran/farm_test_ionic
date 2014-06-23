angular.module('starter.services', [])


/**
 * A simple example service that returns some data.
 */
.factory('Farms', function() {

       var farms = [
      { id: 0, name: 'Farm1' },
      { id: 1, name: 'Farm2' },
      { id: 2, name: 'Farm3' },
      { id: 3, name: 'Farm4' }
    ];
  
  return {
            all: function() {
              return farms;
            },
            get: function(farmId) {
              // Simple index lookup
              return farms[farmId];
            }
          }
  // Some fake testing data
 
});