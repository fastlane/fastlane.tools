// Magic strings
export const BETA = 'beta';
export const APPSTORE = 'appstore';

export const TYPER_TARGET = '.typeahead__target';

// Events
export const AppStoreTyperEvent = new CustomEvent('fastlane.platformSwitch', {
  detail: APPSTORE
});
export const BetaTyperEvent = new CustomEvent('fastlane.platformSwitch', {
  detail: BETA
});

// Elements
export const EL_MAP = {
  'beta': {
    root: document.getElementById('#code-beta'),
    stepsCtn: document.getElementById('steps-beta'),
    steps: $('#steps-beta li').toArray(),
    loc: $('#code-beta .line:not(.line--first)').toArray(),
    currentLine: $('#code-beta .current-loc')[0],
    firstLine: document.querySelector('#code-beta .line--first')
  },
  'appstore': {
    root: document.getElementById('code-appstore'),
    stepsCtn: document.getElementById('steps-appstore'),
    steps: $('#steps-appstore li').toArray(),
    loc: $('#code-appstore .line:not(.line--first)').toArray(),
    currentLine: $('#code-appstore .current-loc')[0],
    firstLine: document.querySelector('#code-appstore .line--first')
  }
}