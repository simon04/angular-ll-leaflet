(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llView', [directive]);

  function directive() {
    return {
      restrict: 'E',
      scope: {
        llView: '='
      },
      require: '^llMap',
      link: link
    };

    function link(scope, element, attrs, llMap) {
      llMap.getMap().then(function(map) {
        map.on('zoomend', viewChanged);
        map.on('moveend', viewChanged);
        scope.$watch('llView', modelChanged, true);

        function modelChanged() {
          map.setView([scope.llView.lat, scope.llView.lng], scope.llView.zoom);
        }

        function viewChanged() {
          var newCenter = {
            lat: map.getCenter().lat,
            lng: map.getCenter().lng,
            zoom: map.getZoom()
          };
          scope.$applyAsync(function() {
            angular.extend(scope.llView, newCenter);
          });
        }

        element.bind('$destroy', function() {
          map.off('zoomend', viewChanged);
          map.off('moveend', viewChanged);
        });
      });
    }
  }
})();
