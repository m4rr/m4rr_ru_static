const EuropeDesktop = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(54.6669, 5.0879),
  new mapkit.CoordinateSpan(48.7855, 114.1699)
);

const EuropeMobile = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(56.56591437170576, 16.00726314186568),
  new mapkit.CoordinateSpan(47.08312339848416, 46.73522065143359)
);

const factory = function(coo, options) {
  let div = document.createElement("div");
  div.className = "circle-annotation";
  return div;
};

var isMobile = window.matchMedia("only screen and (max-width: 767px)").matches
const darkMedia = window.matchMedia('(prefers-color-scheme: dark)') // for darkMedia.addListener()

function mapInitialize() {
  mapkit.init({
    language: map_locale,
    authorizationCallback: function(done) {
      done(tokenID);
    }
  });

  fetch("/cities.json")
    .then(response => response.json())
    .then(json => buildMap(json));
}
let map;
function buildMap(markers) {
   map = new mapkit.Map("map")
  map.region = isMobile ? EuropeMobile : EuropeDesktop
  map.mapType = mapkit.Map.MapTypes.MutedStandard
  map.colorScheme = darkMedia.matches ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light

  markers.sort((a,b) => a.x < b.x); // east to west // kommt die sonne
  markers.forEach(function(landmark, index) {
    // var hue = Math.random() * 120 - 60; // magentas to yellows (300° to 60°)
    // var color = 'hsla(' + (hue < 0 ? hue % 360 + 360 : hue % 360) + ', 100%, 50%, 0.6)';
    let options = {
      // data: {
      //   color: color
      // },
      title: landmark.title_en
    };

    let coo = new mapkit.Coordinate(landmark.y, landmark.x);
    let annotation = new mapkit.Annotation(coo, factory, options);
    annotation.title = landmark.title_en;
    annotation.subtitle = landmark.title_ru;
    annotation.anchorOffset = new DOMPoint(0, -10);
    annotation.animates = true;
    annotation.appearanceAnimation = "zoomIn 0.3s ease-out";

    let delay = 50;
    let interval = 10;
    setTimeout(() => map.addAnnotation(annotation), delay + interval * index);
  });

  // var annotations = markers.map(... return annotation)
  // map.showItems(annotations);

  darkMedia.addListener(() => {
    map.colorScheme = darkMedia.matches ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light
  });
}

window.onload = mapInitialize;
