(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llMap', ['$q', '$parse', directive]);

  function directive($q, $parse) {
    return {
      restrict: 'A', // leaflet needs a <div>
      scope: {
        llMap: '=',
        llInit: '&'
      },
      link: link,
      controller: controller
    };

    function link(scope, element, attrs, ctrl) {
      var map = new L.Map(element[0], scope.llMap);
      ctrl._map.resolve(map);
      if (scope.llInit()) {
        scope.llInit()(L, map);
      }
      element.bind('$destroy', function() {
        map.remove();
      });
      [
        'Click', 'Dblclick', 'Mousedown', 'Mouseover', 'Mouseout',
        'Contextmenu', 'Add', 'Remove', 'Popupopen', 'Popupclose'
      ].map(function(eventName) {
        if (attrs['ll' + eventName]) {
          var handler = $parse(attrs['ll' + eventName]);
          map.on(eventName.toLowerCase(), function(event) {
            scope.$apply(function() {
              handler(scope.$parent, {$event: event});
            });
          });
        }
        return eventName;
      });
    }

    function controller() {
      this._map = $q.defer();
      this.getMap = function() {
        return this._map.promise;
      };
    }
  }
})();
