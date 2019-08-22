function mapInitialize() {
  const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZIQzZQQVVTUTIifQ.eyJpc3MiOiJZNVA3QVg5VU0yIiwiaWF0IjoxNTY2NDM2MzA1LCJleHAiOjE3Mjk3MjgwMDAsIm9yaWdpbiI6Im00cnIucnUifQ.3JwIwwT8_sj_U5rHa6qlrqqksryzU81TVl5la6_EZVuWljkPqcjArbXUswy2s_ZXDb1w0PUo8YHl1_NlypvmyA";

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

  mapkit.init({
    authorizationCallback: function (done) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/services/jwt");
      xhr.addEventListener("load", function () {
        done(this.responseText);
      });
      xhr.send();
    }
  });
  var map = new mapkit.Map("map");

  var annotations = markers.map(function (landmark) {
    var coo = new mapkit.Coordinate(landmark.y, landmark.x);
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var color2 = '#'+Math.floor(Math.random()*16777215).toString(16);

    var options = {
      title: landmark.title_en,
      color: color,
      color2: color2
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
