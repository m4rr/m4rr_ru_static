function mapInitialize() {
  const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZIQzZQQVVTUTIifQ.eyJpc3MiOiJZNVA3QVg5VU0yIiwiaWF0IjoxNTY2NDM5MzY3LCJleHAiOjE2NjE0NzIwMDAsIm9yaWdpbiI6Im00cnIucnUifQ.A4jyqM7FmAhTXsRDMIZd8C2QL23ObN6vXTgCqNWvTJhy8PvjPJQdrUtzHvNSHStisFfbBk6_Sxhl2nrX8aaxcQ";

  mapkit.init({
      authorizationCallback: function(done) {
          done(tokenID);
      }
  });

  $.getJSON("cities.json", function(json) {
    buildMap(json);
  });
}

var factory = function(coordinate, options) {
  var div = document.createElement("div");
      // name = options.title,           // "John Appleseed"
      // parts = name.split(' ');        // ["John", "Appleseed"]
  // div.textContent = parts[0].charAt(0) + parts[1].charAt(0);    // "JA"
  div.className = "circle-annotation";
  div.style.backgroundColor = options.data.color;
  // div.style.borderColor = options.color2;
  return div;
};

function buildMap(markers) {
  var MarkerAnnotation = mapkit.MarkerAnnotation;

  var map = new mapkit.Map("map");

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
    // annotation.selected = "true";
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
