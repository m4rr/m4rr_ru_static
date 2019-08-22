function mapInitialize() {
  const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZIQzZQQVVTUTIifQ.eyJpc3MiOiJZNVA3QVg5VU0yIiwiaWF0IjoxNTY2NDM3NDExLCJleHAiOjE1NjcxMjMyMDB9.2hnzfROnPojobV1RlZb9wNlovQyT-WLZi68NycdmhzVc7L1oahueeYn2QVqQBGZKX3X4ADwBM-S0m1boibbPNQ";

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
  div.style.backgroundColor = options.color;
  // div.style.borderColor = options.color2;
  return div;
};

function buildMap(markers) {
  var MarkerAnnotation = mapkit.MarkerAnnotation;

  var map = new mapkit.Map("map");

  var annotations = markers.map(function (landmark) {
    var coo = new mapkit.Coordinate(landmark.y, landmark.x);
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var color2 = '#'+Math.floor(Math.random()*16777215).toString(16);

    var options = {
      title: landmark.title_en,
      color: color
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
