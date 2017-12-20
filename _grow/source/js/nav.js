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
  const targetElClass = '.header__nav__list--primary';
  const el = document.querySelector(targetElClass);

  let target, hash;
  el.addEventListener('click', e => {
    e.preventDefault();
    hash = e.target.hash;
    if (!hash) {
      return;
    }

    target = $(hash);
    htmlBod.animate({
      scrollTop: target.offset().top - SCROLL_OFFSET
    }, ANIMATION_SPEED);
  }, true);
  
}