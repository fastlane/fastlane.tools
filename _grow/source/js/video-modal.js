/**
 * @fileoverview
 * This connects modal functionality and YouTube embedding for the
 * "how it works" section.  On non-mobile devices, the video will open in
 * a modal window.  For mobile devices, it will act as every other YT embed
 * as to not interfere with the normal UX.
 */
var player;
// Kicks off the process.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    width: '100%',
    height: '100%',
    videoId: 'wOtANfkh2bI',
    events: {
      onReady: $fastlaneYT.onPlayerReady,
      onStateChange: $fastlaneYT.onPlayerStateChange
    }
  });
}
window.$fastlaneYT = (function() {

  // Constants
  var MAX_WIDTH_PERC_ = 0.25;
  var EXPAND_DURATION_ = 0.45; // seconds
  // @todo(sgeer): Better mobile detection
  var ratio = 16 / 9;


  return {
    onPlayerReady: initModal
  };

  /**
   * Sets up event listeners, etc for modal interaction.
   */
  function initModal(player) {
    var isMobile = document.body.classList.contains('mobile');
    return isMobile ? setupMobilePlayer(player.target) : setupModalPlayer(player.target);
  }

  /**
   * Don't interrupt the normal mobile YouTube player flow if the user is
   * on a device.
   */
  function setupMobilePlayer(player) {
    console.info('Setting up mobile player.')
  }

  /**
   * If we have an idea the user isn't on a mobile device, set up the
   * modal functionality.
   */
  function setupModalPlayer(player) {
    player.setPlaybackQuality('hd720');

    var modalContainer = document.querySelector('.video-modal');
    var vMedia = document.querySelector('.video-modal__media');
    var ytDom = document.getElementById('yt-player');
    var closeButton = document.querySelector('.video-modal__close span');
    var backdrop = createBackdrop_();

    var modalWidth = modalContainer.offsetWidth;
    var modalHeight = modalContainer.offsetHeight;

    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var maxWidth = winWidth - winWidth * MAX_WIDTH_PERC_;
    var maxHeight = maxWidth / ratio;

    modalContainer.addEventListener('click', openModal);
    document.addEventListener('click', checkModalClose);
    window.addEventListener('keyup', closeModal);
    closeButton.addEventListener('click', closeModal.bind(this, null, true));

    /**
     * Open the video modal.
     * @param {MouseEvent} e
     */
    function openModal(e) {
      var pos = modalContainer.getBoundingClientRect();
      var x = pos.left;
      var y = pos.top;

      vMedia.style.display = 'block';
      vMedia.style.left = x + 'px';
      vMedia.style.top = y + 'px';
      backdrop.style.display = 'block';

      var END_WIDTH_ = maxWidth + 'px';
      var END_HEIGHT_ = maxWidth / ratio + 'px';

      TweenMax.to(vMedia, EXPAND_DURATION_, {
        width: END_WIDTH_,
        height: END_HEIGHT_,
        opacity: 1,
        left: (winWidth - maxWidth) / 2 + 'px',
        top: (winHeight - maxHeight) / 2 + 'px',
        ease: Power2.easeInOut,
        onComplete: onModalOpen
      });

      TweenMax.to(backdrop, EXPAND_DURATION_, {
        opacity: 1
      })
    }

    /**
     * Close the modal and return to natural position.
     * Callback from ESC keypress
     * @param {KeyboardEvent} e
     */
    function closeModal(e, force) {
      if (force === true || e.keyCode == 27) {
        player.pauseVideo();

        var pos = modalContainer.getBoundingClientRect();
        var x = pos.left;
        var y = pos.top;

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
     * @todo(sgeer)
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
})();
