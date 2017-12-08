'use strict';

var hero = function() {

  /*
  * Browser fixes
  */
  // IE does not supports the transform attribute, but not the CSS style
  // This is a workaround for it
  var transformedElements = $('.has-transform');
  $.each(transformedElements, function(index, el){
    var transform = getComputedStyle(el).getPropertyValue('transform');
    $(el).attr('transform', transform);
  })

  /*
  * Helper methods
  */
  Math.randMinMax = function(t, n, a){
    var r = t + Math.random() * (n - t);
    return a && ( r = Math.round(r) ), r;
  }

  /*
  * Placing elements based on viewport width
  */
  var bottomRightX;
  var bottomRightMeshWidth = 300;
  var placeElements = function(){
    var $heroBg = $('.hero__background');
    var heroWidth = $heroBg.width();
    var heroHeight = $heroBg.height();

    var $triangleBottomRight = $('.mesh-lines-bottom-right');
    bottomRightX = heroWidth - bottomRightMeshWidth;

    TweenMax.set($triangleBottomRight, {
      x: bottomRightX
    });
  }

  /*
  * Animates individual line opacities on large meshes
  */
  var animateLineOpacity = function(){
    var triangleLines = $('.mesh-lines').toArray();
    triangleLines.sort(function(){ return 0.5-Math.random() });
    var opacityTl = new TimelineMax();

    opacityTl.staggerTo(triangleLines, 1, {alpha:0.3, repeatDelay:4, repeat:-1, yoyo:true}, 0.1);
    opacityTl.play();
  }

  /*
  * Animates individual triangles attaching / reattaching to meshes (loop)
  */
  var animateTriangles = function(){
    var triangles = document.querySelectorAll('.triangle');
    TweenMax.set(triangles, {
      scale: 0.75,
      alpha: 0
    });

    // Triangle Left Top animation (Attach + Drop down)
    var triangle1Detach = document.querySelector('.triangle-1--detach');
    var triangle1Attach = document.querySelector('.triangle-1--attach');

    var tl1 = new TimelineMax({repeat: -1, repeatDelay:10});
    tl1.timeScale(6);
    tl1.to(triangle1Attach, 5, {
      alpha: 1
    });
    tl1.to(triangle1Attach, 25, {
      rotation:'+=270',
      svgOrigin:'526 -30',
      ease:Power2.easeInOut,
      x: 355,
      y: 140
    });
    tl1.to(triangle1Attach, 15, {
      alpha: 0
    });
    tl1.to(triangle1Detach, 5, {
      alpha: 1
    }, '-=15');
    tl1.to(triangle1Detach, 25, {
      rotation:'+=270',
      svgOrigin:'375 200',
      ease:Power2.easeInOut,
      x: 550,
      y: 650
    });
    tl1.to(triangle1Detach, 5, {
      alpha: 0
    });

    // Triangle Right Half (Little machine drop / conveyor belt)
    var triangle2FloatIn = document.querySelector('.triangle-2--float-in');
    var triangle2Attach = document.querySelector('.triangle-2--attach');
    var meshTopRight = document.querySelector('.mesh-lines-top-right');
    var triangle2Curve1 =[{x: bottomRightX - 200, y:600}, {x:bottomRightX - 350, y:320}, {x:bottomRightX - 250, y: 278}];
    var triangle2Curve2 =[{x:bottomRightX - 250, y: 278}, {x:bottomRightX - 250, y:420}, {x:bottomRightX - 233, y: 435}];

    TweenMax.set(triangle2FloatIn, {
      x: bottomRightX,
      y: 600
    });
    TweenMax.set(triangle2Attach, {
      x: bottomRightX - 200,
      y: 600
    });
    TweenMax.set(meshTopRight, {
      x: bottomRightX + 60,
      y: 100
    });
    var tl2 = new TimelineMax({repeat: -1, repeatDelay:25});
    tl2.timeScale(6);
    tl2.to([triangle2Attach, triangle2FloatIn], 25, {
      alpha: 1
    });
    tl2.to(triangle2Attach, 25, {
      rotation:'+=120',
      svgOrigin: (bottomRightX) + ' 700',
      ease:Power2.easeInOut,
      bezier:{
        type: "quadratic",
        curviness: 5,
        values: triangle2Curve1
	     }
    });
    tl2.to([triangle2Attach, meshTopRight], 10, {
      rotation:'-=60',
      svgOrigin: (bottomRightX + 137) + ' 120'
    })
    tl2.to(triangle2Attach, 15, {
      bezier:{
        type: "quadratic",
        curviness: 5,
        values: triangle2Curve2
	     }
    });
    tl2.to(triangle2Attach, 15, {
      rotate: '+=13',
      x: bottomRightX + 50,
      y: 260
    });
    tl2.to(meshTopRight, 10, {
      rotation:'+=60',
      svgOrigin: (bottomRightX + 137) + ' 120'
    })
    tl2.to(triangle2FloatIn, 25, {
      ease: Power2.easeInOut,
      x: bottomRightX + 30,
      y: 396
    });
    tl2.to(triangle2FloatIn, 5, {
      alpha: 0
    });

    // Triangle Left Bottom animation
    var triangle3Attach = document.querySelector('.triangle-3--attach');
    TweenMax.set(triangle3Attach, {
      rotate: '-250',
      x: -40,
      y: 420
    });
    var tl3 = new TimelineMax({repeat: -1, repeatDelay:25});
    tl3.timeScale(6);
    tl3.to(triangle3Attach, 5, {
      alpha: 1
    });
    tl3.to(triangle3Attach, 5, {
      ease:Linear.easeNone,
      x: 58,
      y: 362
    });
    tl3.to(triangle3Attach, 5, {
      x: 120,
      y: 401
    });
    tl3.to(triangle3Attach, 5, {
      x: 183,
      y: 364
    });
    tl3.to(triangle3Attach, 3, {
      x: 183,
      y: 280
    });
    tl3.to(triangle3Attach, 15, {
      rotation:'-=270',
      transformOrigin:'0 0',
      ease:Power2.easeIn,
      x: 650,
      y: 700
    });
  }

  /*
  * Animates floating particles (uses particles.js)
  */
  var createParticles = function() {
    particlesJS("particle__wrapper", {
      "particles": {
        "number": {
          "value": 9,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": ['#00F6FB', '#0081FF', '#FF2200', '#00F200']
        },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 8,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.2,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 5,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#3E3EF8",
          "opacity": 0,
          "width": 0
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 10,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 300,
            "duration": 10
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2,
            "opacity": 0
          }
        }
      },
      "retina_detect": true
    });
  }

  /*
  * Initialize
  */
  var init = function() {
    placeElements();
    animateLineOpacity();
    animateTriangles();
    createParticles();
  }();

}();
