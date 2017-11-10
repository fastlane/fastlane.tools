/**
 * @fileoverview
 * Handles the intersection observation for the "how it works" section
 * and applies necessary animation triggers.
 */
(function(){  
  var target = document.querySelector('.typeahead');

  var io = new IntersectionObserver(function(e) {
    var inView = e.find(function(i) {
      return i.isIntersecting;
    });
    if (inView) {
      connectAnimations();
    }
  });

  io.observe(target);

  function connectAnimations() {
    var BETA = 'beta';
    var APPSTORE = 'appstore';

    var currentActive = BETA;

    var stepsContainer = document.querySelector('.animation__steps');

    var betaCode = document.getElementById('beta');
    var betaSteps = document.getElementById('steps-beta');

    var appStoreCode = document.getElementById('appstore');
    var appstoreSteps = document.getElementById('steps-appstore');

    // Typeahead element
    var whichType = document.querySelector('.typeahead__target');

    setInterval(function() {
      if (currentActive == APPSTORE) {
        appStoreCode.classList.remove('active');
        appstoreSteps.classList.remove('active');

        stepsContainer.classList.remove('expanded')
        betaCode.classList.add('active');
        betaSteps.classList.add('active');
        whichType.textContent = BETA;
        currentActive = BETA;
      } else if (currentActive == BETA) {
        appStoreCode.classList.add('active');
        appstoreSteps.classList.add('active');

        stepsContainer.classList.add('expanded');
        betaCode.classList.remove('active');
        betaSteps.classList.remove('active');
        whichType.textContent = APPSTORE;
        currentActive = APPSTORE;
      }
    }, 4000);
  }
})();