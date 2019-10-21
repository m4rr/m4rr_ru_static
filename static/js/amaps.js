var EuropeDesktop = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(54.6669, 5.0879),
  new mapkit.CoordinateSpan(48.7855, 114.1699)
);

var EuropeMobile = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(39.7993, 21.04004),
  new mapkit.CoordinateSpan(85.8828, 65.91797)
);

var isMobile = window.matchMedia("only screen and (max-width: 767px)").matches;

var factory = function(coo, options) {
  var div = document.createElement("div");
  div.className = "circle-annotation";
  div.style.backgroundColor = options.data.color;
  return div;
};

function mapInitialize() {
  mapkit.init({
    language: map_locale,
    authorizationCallback: function(done) {
      done(tokenID);
    }
  });

  $.getJSON("/cities.json", function(json) {
    buildMap(json);
  });
}

const media = window.matchMedia('(prefers-color-scheme: dark)')
var isDark = media.matches

function buildMap(markers) {
  var map = new mapkit.Map("map");
  map.region = isMobile ? EuropeMobile : EuropeDesktop;
  map.mapType = mapkit.Map.MapTypes.MutedStandard
  map.colorScheme = isDark ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light;

  media.addListener(() => {
    isDark = media.matches
    map.colorScheme = isDark ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light;
  //   // alert(`The mode has changed to ${media.matches ? 'dark' : 'light'}`);
  });

  markers.sort((a,b) => a.x < b.x); // east to west // kommt die sonne
  markers.forEach(function(landmark, index) {
    // var hue = Math.random() * 120 - 60; // magentas to yellows (300° to 60°)
    // var color = 'hsla(' + (hue < 0 ? hue % 360 + 360 : hue % 360) + ', 100%, 50%, 0.6)';
    var color = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(160,104,172,0.8)';
    var options = {
      title: landmark.title_en,
      data: {
        color: color
      }
    };

    var coo = new mapkit.Coordinate(landmark.y, landmark.x);
    var annotation = new mapkit.Annotation(coo, factory, options);
    // annotation.color = color;
    // annotation.glyphText = "✈️";
    annotation.title = landmark.title_en;
    annotation.subtitle = landmark.title_ru;
    annotation.anchorOffset = new DOMPoint(0, -10);
    annotation.animates = true;
    annotation.appearanceAnimation = "zoomIn 0.3s ease-out";
    // return annotation;

    // map.addAnnotation(annotation);
    setTimeout(() => map.addAnnotation(annotation), 2000 + 10 * index); // delay 2s + interval 10ms
  });

  // var annotations = markers.map(...)
  // map.showItems(annotations);
}

window.onload = mapInitialize;
