(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llPopup', directive);

  function directive() {
    return {
      restrict: 'E',
      transclude: true,
      require: '^llMarker',
      link: link
    };

    function link(scope, element, attrs, llMarker, transclude) {
      transclude(function(popup) {
        llMarker.getMarker().then(function(marker) {
          marker.bindPopup(popup[0]);
        });
      });
      element.bind('$destroy', function() {
        llMarker.getMarker().then(function(marker) {
          marker.unbindPopup();
        });
      });
    }
  }
})();
