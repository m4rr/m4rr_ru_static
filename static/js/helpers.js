$(function() {
  $("a").hover(function() {
    "" != $(this).attr("href") && "#" != $(this).attr("href") && $('a[href="' + $(this).attr("href") + '"]').addClass("hover")
  }, function() {
    $("a").removeClass("hover")
  });
});

const signs = document.querySelectorAll('.neonize')
const randomIn = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
  const ms = randomIn(2000, 4000)

      // console.log(ms);

  el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
  mixupInterval(el)
  el.addEventListener('webkitAnimationIteration', () => {
    mixupInterval(el)
  })
})
