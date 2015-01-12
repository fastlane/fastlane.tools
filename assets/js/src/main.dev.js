$('.mobile-nav').click(function() {


    if ( $('.nav-links ul').hasClass('mobile-active') ) {
        $('.nav-links ul').removeClass('mobile-active');
    } else {
        $('.nav-links ul').addClass('mobile-active');
    }

});