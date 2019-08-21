// function isMobile() {
//   var
//     element = document.querySelector('#map'),
//     style = window.getComputedStyle(element),
//     display = style.getPropertyValue('display');

//   return display === 'none';
// }


// function loadScript() {
//   if (isMobile()) {
//     return;
//   }

//   // Preventing the Google Maps libary from downloading an extra font
//   var head = $('head')[0];
//   var insertBefore = head.insertBefore;
//   head.insertBefore = function (newElement, referenceElement) {
//     // intercept font download
//     if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) { return; }
//     // intercept style elements for IEs
//     if (newElement.tagName.toLowerCase() === 'style' && newElement.styleSheet && newElement.styleSheet.cssText && newElement.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0) { return; }
//     // intercept style elements for other browsers
//     if (newElement.tagName.toLowerCase() === 'style' && newElement.innerHTML && newElement.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0) { return; }

//     insertBefore.call(head, newElement, referenceElement);
//   };
// }


$(function() {
  $("a").hover(function() {
    "" != $(this).attr("href") && "#" != $(this).attr("href") && $('a[href="' + $(this).attr("href") + '"]').addClass("hover")
  }, function() {
    $("a").removeClass("hover")
  });
});
