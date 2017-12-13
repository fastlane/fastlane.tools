/**
 * @param {string} selector DOM selector to watch
 * @param {Function} callback Callback when intersection happens.
 */
export function Observer(selector, callback) {
  this.target = document.querySelector(selector);
  this.io = new IntersectionObserver(e => {
    if (e.find(i => i.isIntersecting)) {
      callback();
      this.stop();
    }
  });

  this.io.observe(this.target);
}

/**
 * Stops observing.
 */
Observer.prototype.stop = function() {
  if (!this.target) {
    return console.warn("I'm not watching anything.");
  }
  this.io.unobserve(this.target);
};
