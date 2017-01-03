  export default [directive];

  function directive() {
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
