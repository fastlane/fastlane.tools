// Slick carousel module
//
var slick = function() {
  var slickEls = document.querySelectorAll('.slick');
  slickEls.forEach(function(element) {
    var arrows = element.hasAttribute("data-arrows");
    var dots = element.hasAttribute("data-dots");
    var carouselName = element.getAttribute("data-carousel-name");

    $(element).slick({
      arrows: arrows,
      dots: dots,
      draggable: true,
      accessibility: true
    });

    // Accessibility
    // Add ability to move through carousel
    //
    $(element).on('keydown', function(e) {
      var keyCode = e.which;
      if ((keyCode === 13) || (keyCode === 32)) {
        e.preventDefault();
        $(this).slick('slickNext');
      }
    });
  });
}();
