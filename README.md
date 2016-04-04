# angular-ll-leaflet
This project aims at providing a very lightweight [AngularJS](https://github.com/jbdemonte/angular-google-maps-native)-directive for the [Leaflet](http://leafletjs.com/) maps API.

## Directives
* `<div ll-map>` – corresponds to `L.Map`
* `<ll-view>` – corresponds to the current map view (lat, lng, zoom)
* `<ll-marker>` – corresponds to a `L.Marker`
* `<ll-div-icon>` – corresponds to a `L.DivIcon`, supports transclusion of the content
* `<ll-popup>` – corresponds to a `L.Popup`, supports transclusion of the content

## Alternatives?
* [ui-leaflet](https://github.com/angular-ui/ui-leaflet) – Feature rich, but as of version 1.0.0, it amounts to 80kB of glue code for a library of 120kB
* [angular-google-maps-native](https://github.com/jbdemonte/angular-google-maps-native) – Nice, but for the Google Maps API
