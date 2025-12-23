/**
 * @fileoverview
 * Animates the typing and deletion of the given target and string.
 */
import {
  BETA,
  APPSTORE,
  TYPER_TARGET,
  AppStoreTyperEvent,
  BetaTyperEvent
} from './loop-constants';

// Animation frame request
let request;

// The string to write, either appstore or beta.
let string = '';

// Keystroke interval
let typeSpeed = 120;

let now, delta;
let then = Date.now();

const target = document.querySelector(TYPER_TARGET);
target.addEventListener('fastlane.platformSwitch', e => {
  string = e.detail;
  loop(del);
});

/**
 * Main animation loop
 * @param {function} fn Callback function
 */
function loop(fn) {
  request = requestAnimationFrame(() => loop(fn));
  now = Date.now();
  delta = now - then;
  if (delta > typeSpeed) {
    fn();
    then = now - delta % typeSpeed;
  }
}

/**
 * "Delete" the text.
 * Sets the interval to 50 as deleting shouldn't take too long.
 */
function del() {
  typeSpeed = 50;
  const content = target.textContent.split('');
  content.pop();
  target.textContent = content.join('');
  if (!content.length) {
    cancelAnimationFrame(request);
    loop(type);
  }
}

/**
 * Emulates typing text. Resets interval to 120ms.
 */
let typeIndex = 0;
function type() {
  if (!string[typeIndex]) {
    return;
  }
  typeSpeed = 120;
  target.textContent += string.charAt(typeIndex++);
  if (typeIndex == string.length) {
    cancelAnimationFrame(request);
    typeIndex = 0;
  }
}

document.addEventListener('visibilitychange', handleVizChange, false);
/**
 * When the tab is de-prioritized, the timers can get all wonky.
 * Cancel the animation request, reset vars when hidden.
 */
function handleVizChange(e) {
  cancelAnimationFrame(request);
  typeIndex = 0;
  if (document.hidden === false) {
    then = Date.now();
    loop(del);
  }
}
