// Slick carousel module
//
var carousel = function() {
  var slickEls = document.querySelectorAll('.slick');
  slickEls.forEach(function(element) {
    var arrows = element.hasAttribute("data-arrows");
    var dots = element.hasAttribute("data-dots");
    var carouselName = element.getAttribute("data-carousel-name");

    $(element).slick({
      arrows: arrows,
      dots: dots,
      draggable: true,
      accessibility: true,
      responsive: [{
        breakpoint: 560,
        settings: {
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 1025,
        settings: {
          arrows: false
        }
      }]
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
