(function() {
  'use strict';
  angular.module('ll-leaflet').directive('llDivIcon', [directive]);

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
        var icon = createIcon(options);
        llMarker.getMarker().then(function(marker) {
          marker.setIcon(icon);
        });
      });
    }

    function createIcon(options) {
      var MyIcon = L.Icon.extend({
        options: {},
        createIcon: function() {
          this.options.elm = this.options.elm || document.createElement('div');
          this._setIconStyles(this.options.elm, 'icon');
          return this.options.elm;
        }
      });
      return new MyIcon(options);
    }
  }
})();
