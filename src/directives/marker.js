(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llMarker', ['$q', directive]);

  function directive($q) {
    return {
      restrict: 'E',
      scope: {
        llMarker: '=',
        llLatLng: '='
      },
      require: ['^llMap', 'llMarker'],
      link: link,
      controller: controller
    };

    function link(scope, element, attrs, controllers) {
      var llMap = controllers[0];
      var ctrl = controllers[1];
      var marker = L.marker(scope.llLatLng, scope.llMarker);
      ctrl._marker.resolve(marker);
      llMap.getMap().then(function(map) {
        marker.addTo(map);
      });
      scope.$watch('llLatLng', function(llLatLng) {
        if (marker) {
          marker.setLatLng(llLatLng);
        }
      }, true);
      marker.on('dragend', function() {
        scope.$apply(function() {
          if (angular.isArray(scope.llLatLng)) {
            scope.llLatLng[0] = marker.getLatLng().lat;
            scope.llLatLng[1] = marker.getLatLng().lng;
          } else if (angular.isObject(scope.llLatLng)) {
            scope.llLatLng.lat = marker.getLatLng().lat;
            scope.llLatLng.lng = marker.getLatLng().lng;
          }
        });
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
