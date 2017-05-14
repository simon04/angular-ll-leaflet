  export default [directive];

  function directive() {
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
