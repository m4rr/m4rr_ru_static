function mapInitialize() {
  mapkit.init({
      language: map_locale,
      authorizationCallback: function(done) {
          done(tokenID);
      }
  });

  $.getJSON("/js/cities.json", function(json) {
    buildMap(json);
  });
}

var factory = function(coordinate, options) {
  var div = document.createElement("div");
  div.className = "circle-annotation";
  div.style.backgroundColor = options.data.color;
  return div;
};

function buildMap(markers) {
  var MarkerAnnotation = mapkit.MarkerAnnotation;
  var map = new mapkit.Map("map");

  map.colorScheme = map_color_scheme === "Dark" ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light;

  var annotations = markers.map(function (landmark) {
    var coo = new mapkit.Coordinate(landmark.y, landmark.x);
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);

    var options = {
      title: landmark.title_en,
      data: {
        color: color
      }
    };

    var annotation = new mapkit.Annotation(coo, factory, options);
    // annotation.color = color;
    annotation.title = landmark.title_en;
    annotation.subtitle = landmark.title_ru;
    annotation.anchorOffset = new DOMPoint(0, -10);
    // annotation.glyphText = "✈️";

    return annotation;
  });

  map.showItems(annotations);

  var Cupertino = new mapkit.CoordinateRegion(
    new mapkit.Coordinate(50, 5),
    new mapkit.CoordinateSpan(30, 30)
  );

  map.region = Cupertino;
}

window.onload = mapInitialize;
