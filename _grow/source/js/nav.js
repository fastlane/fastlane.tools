(function(){
  var navEl = document.querySelector('[data-nav]');
  var toggleEl = document.querySelector('[data-nav-toggle]');
  var classHeaderOpen = 'header--open';

  // setup listeners
  toggleEl.onclick = function($event) {
    if (navEl.classList.contains(classHeaderOpen)) {
      navEl.classList.remove(classHeaderOpen);
    } else {
      navEl.classList.add(classHeaderOpen);
    }
  }
})();
