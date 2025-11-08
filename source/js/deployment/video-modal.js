/**
 * @fileoverview
 * This connects modal functionality and YouTube embedding for the
 * "how it works" section.  On non-mobile devices, the video will open in
 * a modal window.  For mobile devices, it will act as every other YT embed
 * as to not interfere with the normal UX.
 */
let player;
// Kicks off the process.
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('yt-player', {
    width: '100%',
    height: '100%',
    videoId: 'wOtANfkh2bI',
    events: {
      onReady: initModal,
      onStateChange: onPlayerStateChange
    }
  });
}

// Constants
const MAX_WIDTH_PERC_ = 0.25;
const EXPAND_DURATION_ = 0.45; // seconds
const RATIO = 16 / 9;

var isMobile = document.body.classList.contains('mobile');

/**
 * Sets up event listeners, etc for modal interaction.
 */
function initModal(player) {
  if (!isMobile) {
    return setupModalPlayer(player.target);
  }
}

function onPlayerStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    ga('send', 'event', 'Video', 'click', (isMobile ? 'mobile' : 'desktop'));
  }
}

/**
 * Don't interrupt the normal mobile YouTube player flow if the user is
 * on a device. Noop for now.
 */
function setupMobilePlayer(player) { }

/**
 * If we have an idea the user isn't on a mobile device, set up the
 * modal functionality.
 */
function setupModalPlayer(player) {
  player.setPlaybackQuality('hd720');

  const modalContainer = document.querySelector('.video-modal');
  const vMedia = document.querySelector('.video-modal__media');
  const ytDom = document.getElementById('yt-player');
  const closeButton = document.querySelector('.video-modal__close span');
  const backdrop = createBackdrop_();

  const modalWidth = modalContainer.offsetWidth;
  const modalHeight = modalContainer.offsetHeight;

  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const maxWidth = winWidth - winWidth * MAX_WIDTH_PERC_;
  const maxHeight = maxWidth / RATIO;

  modalContainer.addEventListener('click', openModal);
  document.addEventListener('click', checkModalClose);
  window.addEventListener('keyup', closeModal);
  closeButton.addEventListener('click', closeModal.bind(this, null, true));

  /**
   * Open the video modal.
   * @param {MouseEvent} e
   */
  function openModal(e) {
    ga('send', 'event', 'Watch Video', 'click');
    const pos = modalContainer.getBoundingClientRect();
    const {left: x, top: y} = pos;

    vMedia.style.display = 'block';
    vMedia.style.left = x + 'px';
    vMedia.style.top = y + 'px';
    backdrop.style.display = 'block';

    const END_WIDTH_ = maxWidth + 'px';
    const END_HEIGHT_ = maxWidth / RATIO + 'px';

    TweenMax.to(vMedia, EXPAND_DURATION_, {
      width: END_WIDTH_,
      height: END_HEIGHT_,
      opacity: 1,
      left: (winWidth - maxWidth) / 2 + 'px',
      top: (winHeight - maxHeight) / 2 + 'px',
      ease: Power2.easeInOut,
      onComplete: onModalOpen
    });

    TweenMax.to(backdrop, EXPAND_DURATION_, { opacity: 1 })
  }

  /**
   * Close the modal and return to natural position.
   * Callback from ESC keypress
   * @param {KeyboardEvent} e
   */
  function closeModal(e, force) {
    if (force === true || e.keyCode == 27) {
      player.pauseVideo();
      const {left: x, top: y} = modalContainer.getBoundingClientRect();

      TweenMax.to(vMedia, EXPAND_DURATION_, {
        width: modalWidth + 'px',
        height: modalHeight + 'px',
        left: x + 'px',
        top: y + 'px',
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: onModalClose
      });

      TweenMax.to(backdrop, EXPAND_DURATION_, {
        opacity: 0,
        onComplete: function() {
          backdrop.style.display = 'none';
        }
      })
    }
  }

  /**
   * Callback for clicking elsewhere on the document to close the modal.
   */
  function checkModalClose(e) {
    if (e.target.classList.contains('video-modal__backdrop')) {
      closeModal(null, true);
    }
  }

  /**
   * onComplete callback for opening the modal.
   */
  function onModalOpen() {
    ytDom.style.display = 'block';
    vMedia.style.display = 'block'
    player.playVideo();
    return TweenMax.to(ytDom, EXPAND_DURATION_, {
      opacity: 1
    });
  }

  function onModalClose() {
    return TweenMax.to(ytDom, EXPAND_DURATION_, {
      opacity: 0,
      onComplete: function() {
        ytDom.style.display = 'none';
        vMedia.style.display = 'none'
      }
    });
  }

  function createBackdrop_() {
    var div = document.createElement('div');
    div.classList.add('video-modal__backdrop');
    document.body.appendChild(div);
    return div;
  }
}

