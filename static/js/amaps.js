var Europe = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(50, 5),
  new mapkit.CoordinateSpan(30, 30)
);

var factory = function(coo, options) {
  var div = document.createElement("div");
  div.className = "circle-annotation";
  div.style.backgroundColor = options.data.color;
  return div;
};

var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

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

var map = 0;
function buildMap(markers) {
  map = new mapkit.Map("map");
  map.region = isMobile ? EuropeMobile : EuropeDesktop;
  map.colorScheme = map_color_scheme === "Dark" ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light;

  markers.sort((a,b) => a.x < b.x); // east to west // kommt die sonne
  markers.forEach(function(landmark, index) {
    // var hue = Math.random() * 120 - 60; // magentas to yellows (300° to 60°)
    // var color = 'hsla(' + (hue < 0 ? hue % 360 + 360 : hue % 360) + ', 100%, 50%, 0.6)';
    var color = map_color_scheme === "Dark" ? 'rgba(255,255,255,0.9)' : 'rgba(160,104,172,0.8)';
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
