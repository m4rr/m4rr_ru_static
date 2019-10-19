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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var factory = function(coordinate, options) {
  var div = document.createElement("div");
  div.className = "circle-annotation";
  div.style.backgroundColor = options.data.color;
  return div;
};

async function buildMap(markers) {
  var MarkerAnnotation = mapkit.MarkerAnnotation;
  var map = new mapkit.Map("map");

  map.colorScheme = map_color_scheme === "Dark" ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light;

  // var annotations =
  markers.forEach(function(landmark) {

    // var hue = Math.random() * 120 - 60; // magentas to yellows (300° to 60°)
    // var color = 'hsla(' + (hue < 0 ? hue % 360 + 360 : hue % 360) + ', 100%, 50%, 0.6)';
    var color = map_color_scheme === "Dark" ? 'rgba(255,255,255,0.8)' : 'rgba(160,104,172,0.8)';

    var options = {
      title: landmark.title_en,
      data: {
        color: color
      }
    };

    var coo = new mapkit.Coordinate(landmark.y, landmark.x);

    var annotation = new mapkit.Annotation(coo, factory, options);
    // annotation.color = color;
    annotation.title = landmark.title_en;
    annotation.subtitle = landmark.title_ru;
    annotation.anchorOffset = new DOMPoint(0, -10);
    annotation.animates = true;
    annotation.appearanceAnimation = "zoomIn 0.3s ease-out";
    // annotation.glyphText = "✈️";

    // return annotation;

    map.addAnnotation(annotation);

    await sleep(50);

  });
  // map.showItems(annotations);

  var Europe = new mapkit.CoordinateRegion(
    new mapkit.Coordinate(50, 5),
    new mapkit.CoordinateSpan(30, 30)
  );

  map.region = Europe;

  map.element.addEventListener("click", function(event) {
    if (event.target.parentNode !== map.element) {
        // This condition prevents clicks on controls. Binding to a
        // secondary click is another option to prevent conflict
        return;
    }
    var domPoint = new DOMPoint(event.pageX, event.pageY);
    var coordinate = map.convertPointOnPageToCoordinate(domPoint);
    map.addAnnotation(new mapkit.MarkerAnnotation(coordinate));
  });

}

window.onload = mapInitialize;
