(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llMarker', ['$q', directive]);

  function directive($q) {
    return {
      scope: {
        llLatLng: '='
      },
      require: ['^llMap', 'llMarker'],
      link: link,
      controller: controller
    };

    function link(scope, element, attrs, controllers) {
      var llMap = controllers[0];
      var ctrl = controllers[1];
      var marker = L.marker(scope.llLatLng);
      ctrl._marker.resolve(marker);
      llMap.getMap().then(function(map) {
        marker.addTo(map);
      });
      element.bind('$destroy', function() {
        llMap.getMap().then(function(map) {
          map.removeLayer(marker);
        });
      });
    }

    function controller() {
      this._marker = $q.defer();
      this.getMarker = function() {
        return this._marker.promise;
      };
    }
  }
})();
