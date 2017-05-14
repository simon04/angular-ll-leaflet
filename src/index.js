import angular from 'angular';

import divIcon from './directives/divIcon';
import fitBounds from './directives/fitBounds';
import map from './directives/map';
import marker from './directives/marker';
import popup from './directives/popup';
import view from './directives/view';

export default angular.module('ll-leaflet', [])
  .directive('llDivIcon', divIcon)
  .directive('llFitBounds', fitBounds)
  .directive('llMap', map)
  .directive('llMarker', marker)
  .directive('llPopup', popup)
  .directive('llView', view)
  .name;
