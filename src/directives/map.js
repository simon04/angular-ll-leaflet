(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llMap', ['$q', directive]);

  function directive($q) {
    return {
      scope: {
        llInit: '&'
      },
      link: link,
      controller: controller
    };

    function link(scope, element, attrs, ctrl) {
      var map = new L.Map(element[0]);
      ctrl._map.resolve(map);
      if (scope.llInit()) {
        scope.llInit()(L, map);
      }
      element.bind('$destroy', function() {
        map.remove();
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
