import { Observer } from './observer';
import {
  BETA,
  APPSTORE,
  EL_MAP,
  TYPER_TARGET,
  AppStoreTyperEvent,
  BetaTyperEvent
} from './loop-constants';

// Step fade-in time.
const STAGGER_OFFSET = 0.2;

// Time between steps appearing
const STAGGER_DURATION_IN = 1.5;

// Time between steps disappearing
const STAGGER_DURATION_OUT = 0.25;

// Element maps
const [betaEls, appStoreEls] = [EL_MAP[BETA], EL_MAP[APPSTORE]];

const master = new TimelineMax({
  repeat: -1,
  paused: true
});

// Wait for our target to be in view before resuming.
const observer = new Observer('.typeahead', () => {
  master.resume();
});

master
  .addCallback(() => activate(BETA))
  .add(BETA)
  .set(betaEls.currentLine, { opacity: 1, top: '8px' })
  .to(betaEls.firstLine, STAGGER_DURATION_IN, { css: { className: '-=inactive' } })
  .add(TweenMax.set(betaEls.stepsCtn, { opacity: 1 }))
  .add([
    TweenMax.staggerTo(betaEls.steps, STAGGER_OFFSET, opts(1), STAGGER_DURATION_IN),
    TweenMax.staggerTo(betaEls.loc, STAGGER_OFFSET, { css: { className: '-=inactive' }, onStart: onStart_, onStartParams: ['{self}', betaEls] }, STAGGER_DURATION_IN)
  ])
  .pause()
  .add([
    TweenMax.staggerTo(betaEls.steps, STAGGER_OFFSET, opts(0), STAGGER_DURATION_OUT),
    TweenMax.staggerTo(betaEls.loc, STAGGER_OFFSET, { css: { className: '+=inactive' } }, STAGGER_DURATION_OUT),
    TweenMax.to(betaEls.firstLine, STAGGER_DURATION_IN, { css: { className: '+=inactive' } }),
    TweenMax.to(betaEls.stepsCtn, opts(0)),
    TweenMax.to(betaEls.currentLine, STAGGER_DURATION_OUT, { opacity: 0 })
  ])
  .add(APPSTORE)
  .addCallback(() => activate(APPSTORE))
  .set(appStoreEls.currentLine, { opacity: 1, top: '8px' })
  .to(appStoreEls.firstLine, STAGGER_DURATION_IN, { css: { className: '-=inactive' } })
  .set(appStoreEls.stepsCtn, { opacity: 1 })
  .add([
    TweenMax.staggerTo(appStoreEls.steps, STAGGER_OFFSET, opts(1), STAGGER_DURATION_IN),
    TweenMax.staggerTo(appStoreEls.loc, STAGGER_OFFSET, { css: { className: '-=inactive' }, onStart: onStart_, onStartParams: ['{self}', appStoreEls] }, STAGGER_DURATION_IN)
  ])
  .add([
    TweenMax.staggerTo(appStoreEls.steps, STAGGER_OFFSET, opts(0), STAGGER_DURATION_OUT),
    TweenMax.staggerTo(appStoreEls.loc, STAGGER_OFFSET, { css: { className: '+=inactive' } }, STAGGER_DURATION_OUT),
    TweenMax.to(appStoreEls.firstLine, STAGGER_DURATION_IN, { css: { className: '+=inactive' } }),
    TweenMax.to(appStoreEls.stepsCtn, opts(0)),
  ])
  .to(appStoreEls.currentLine, STAGGER_DURATION_OUT, { opacity: 0 })
  .addCallback(() => resetActiveSteps())

/**
 * Callback for each step on start
 * @param {any} target Element target of the tween.
 */
function onStart_({ target }, store) {
  if (store) {
    const curline = $(store.currentLine);
    const targetTop = curline.position().top;
    const curTop = curline.css('top', targetTop + 24 + 'px');
  }
  $(target).addClass('active');
}

/**
 * Remove 'active' class from all steps.
 */
function resetActiveSteps() {
  [...betaEls.steps, ...appStoreEls.steps].forEach(step => {
    $(step).removeClass('active');
  });
}

const eventTarget = document.querySelector(TYPER_TARGET);
function activate(str) {
  eventTarget.dispatchEvent(str == BETA ? BetaTyperEvent : AppStoreTyperEvent);
}

/**
 * Returns common options with opacity override
 * @param {number} opacity End opacity requirements
 */
function opts(opacity, active) {
  return {
    opacity: opacity,
    onStart: onStart_,
    onStartParams: ['{self}', active]
  };
}
