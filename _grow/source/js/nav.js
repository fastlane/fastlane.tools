/**
 * @fileoverview
 * Opens menu on mobile, intercepts nav clicks for smooth scroll on non-mobile.
 */

const ANIMATION_SPEED = 700;
const SCROLL_OFFSET = 50;
const htmlBod = $('html,body');

initMobile_();
attachScroll_();

/**
 * Simple hookup for mobile element.
 */
function initMobile_() {
  const navEl = document.querySelector('[data-nav]');
  const toggleEl = document.querySelector('[data-nav-toggle]');
  const classHeaderOpen = 'header--open';

  /**
   *
   * @param {MouseEvent} $event
   */
  toggleEl.onclick = function($event) {
    if (navEl.classList.contains(classHeaderOpen)) {
      navEl.classList.remove(classHeaderOpen);
    } else {
      navEl.classList.add(classHeaderOpen);
    }
  };
}

/**
 * Intercept nav click, smooth scroll.
 */
function attachScroll_() {
  const targetElClasses = ['.header__nav__list--primary', '.features__cards__card__cta'];
  targetElClasses.forEach(sel => {
    const els = [...document.querySelectorAll(sel)];
    els.map(element => element.addEventListener('click', smoothScroll, true))
  })

  let target, hash;
  function smoothScroll (e) {
    hash = e.target.hash;
    if (hash) {
      e.preventDefault();
      target = $(hash);
      htmlBod.animate({
        scrollTop: target.offset().top - SCROLL_OFFSET
      }, ANIMATION_SPEED);
    }
  }
}