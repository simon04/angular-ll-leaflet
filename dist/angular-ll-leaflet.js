/**
 * Lightweight directives to use Leaflet with AngularJS
 * @version v0.3.0
 * @link https://github.com/simon04/angular-ll-leaflet
 * @license ISC
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular'), require('leaflet')) :
  typeof define === 'function' && define.amd ? define(['exports', 'angular', 'leaflet'], factory) :
  (factory((global['angular-ll-leaflet'] = global['angular-ll-leaflet'] || {}),global.angular,global.L));
}(this, (function (exports,angular,L) { 'use strict';

angular = 'default' in angular ? angular['default'] : angular;
L = 'default' in L ? L['default'] : L;

var divIcon = [directive];

  function directive() {
    return {
      restrict: 'E',
      transclude: true,
      require: '^llMarker',
      scope: {
        llDivIcon: '='
      },
      link: link
    };

    function link(scope, element, attrs, llMarker, transclude) {
      transclude(function(html) {
        var options = scope.llDivIcon || {};
        options.elm = Array.prototype.filter.call(html, function(i) {
          return i.nodeType !== Node.TEXT_NODE;
        })[0];
        var icon = L.icon(options);
        icon.createIcon = function() {
          this._setIconStyles(this.options.elm, 'icon');
          return this.options.elm;
        };
        llMarker.getMarker().then(function(marker) {
          marker.setIcon(icon);
        });
      });
    }
  }

var fitBounds = [directive$1];

  function directive$1() {
    return {
      restrict: 'E',
      scope: {
        llBounds: '='
      },
      require: '^llMap',
      link: link
    };

    function link(scope, element, attrs, llMap) {
      llMap.getMap().then(function(map) {
        scope.$watch('llBounds', modelChanged, true);

        function modelChanged() {
          if (scope.llBounds) {
            map.fitBounds(scope.llBounds);
          }
        }
      });
    }
  }

var map = ['$q', '$parse', directive$2];

  function directive$2($q, $parse) {
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
        'Click', 'Dblclick', 'Mousedown', 'Mouseup', 'Mouseover', 'Mouseout',
        'Mousemove', 'Contextmenu', 'Focus', 'Blur', 'Preclick', 'Load',
        'Unload', 'Viewreset', 'Movestart', 'Move', 'Moveend', 'Dragstart',
        'Drag', 'Dragend', 'Zoomstart', 'Zoomend', 'Zoomlevelschange',
        'Resize', 'Autopanstart', 'Layeradd', 'Layerremove',
        'Baselayerchange', 'Overlayadd', 'Overlayremove', 'Locationfound',
        'Locationerror', 'Popupopen', 'Popupclose'
      ].map(function(eventName) {
        if (attrs['ll' + eventName]) {
          var handler = $parse(attrs['ll' + eventName]);
          map.on(eventName.toLowerCase(), function(event) {
            scope.$applyAsync(function() {
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

var marker = ['$q', '$parse', directive$3];

  function directive$3($q, $parse) {
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
        scope.$applyAsync(function() {
          if (angular.isArray(scope.llLatLng)) {
            scope.llLatLng[0] = marker.getLatLng().lat;
            scope.llLatLng[1] = marker.getLatLng().lng;
          } else if (angular.isObject(scope.llLatLng)) {
            scope.llLatLng.lat = marker.getLatLng().lat;
            scope.llLatLng.lng = marker.getLatLng().lng;
          }
        });
      });
      [
        'Click', 'Dblclick', 'Mousedown', 'Mouseover', 'Mouseout',
        'Contextmenu', 'Add', 'Remove', 'Popupopen', 'Popupclose',
        'Tooltipopen', 'Tooltipclose'
      ].map(function(eventName) {
        if (attrs['ll' + eventName]) {
          var handler = $parse(attrs['ll' + eventName]);
          marker.on(eventName.toLowerCase(), function(event) {
            scope.$applyAsync(function() {
              handler(scope.$parent, {$event: event});
            });
          });
        }
        return eventName;
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

var popup = [directive$4];

  function directive$4() {
    return {
      restrict: 'E',
      transclude: true,
      require: '^llMarker',
      link: link
    };

    function link(scope, element, attrs, llMarker, transclude) {
      transclude(function(popup) {
        var elm = Array.prototype.filter.call(popup, function(i) {
          return i.nodeType !== Node.TEXT_NODE;
        })[0];
        llMarker.getMarker().then(function(marker) {
          marker.bindPopup(elm);
        });
      });
      element.bind('$destroy', function() {
        llMarker.getMarker().then(function(marker) {
          marker.unbindPopup();
        });
      });
    }
  }

var view = [directive$5];

  function directive$5() {
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

var index = angular.module('ll-leaflet', [])
  .directive('llDivIcon', divIcon)
  .directive('llFitBounds', fitBounds)
  .directive('llMap', map)
  .directive('llMarker', marker)
  .directive('llPopup', popup)
  .directive('llView', view)
  .name;

exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-ll-leaflet.js.map
