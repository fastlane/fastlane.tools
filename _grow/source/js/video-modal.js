var player;
var $fastlaneYT = (function() {

  // Constants
  var MAX_WIDTH_PERC_ = 0.25;
  var EXPAND_DURATION_ = 0.45; // seconds
  var ratio = 16 / 9;

  return {
    onPlayerReady: onPlayerReady
  };

  /**
     * Callback for YouTube.onReady
     * @param {Event} e
     */
  function onPlayerReady(e) {
    initModal(e);
  }

  /**
   * Sets up event listeners, etc for modal interaction.
   */
  function initModal(e) {
    var modalContainer = document.querySelector('.video-modal');

    var vMedia = document.querySelector('.video-modal__media');
    var ytDom = document.getElementById('yt-player');

    var modalWidth, modalHeight;
    var winWidth, winHeight, maxWidth, maxHeight;
    setDimensions();

    modalContainer.addEventListener('click', onVideoClick);
    document.addEventListener('click', checkModalClose);
    window.addEventListener('keyup', closeModal);

    /**
       * Open the video modal.
       * @param {MouseEvent} e
       */
    function onVideoClick(e) {
      var pos = modalContainer.getBoundingClientRect();
      var x = pos.left;
      var y = pos.top;

      vMedia.style.display = 'block';
      vMedia.style.left = x + 'px';
      vMedia.style.top = y + 'px';

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
    }

    /**
       * Close the modal and return to natural position.
       * Callback from ESC keypress
       * @param {Event} e
       */
    function closeModal(e) {
      var pos = modalContainer.getBoundingClientRect();
      var x = pos.left;
      var y = pos.top;
      if (e.keyCode == 27) {
        TweenMax.to(vMedia, EXPAND_DURATION_, {
          width: modalWidth + 'px',
          height: modalHeight + 'px',
          left: x + 'px',
          top: y + 'px',
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: onModalClose
        });
      }
    }

    /**
       * Get the necessary dimensions for calculating the modal size/dim.
       */
    function setDimensions() {
      modalWidth = modalContainer.offsetWidth;
      modalHeight = modalContainer.offsetHeight;

      winWidth = window.innerWidth;
      winHeight = window.innerHeight;
      maxWidth = winWidth - winWidth * MAX_WIDTH_PERC_;
      maxHeight = maxWidth / ratio;
    }

    /**
       * Callback for clicking elsewhere on the document to close the modal.
       * @todo(sgeer)
       */
    function checkModalClose() {
      return false;
    }

    /**
       * 
       */
    function onModalOpen() {
      ytDom.style.display = 'block';
      vMedia.style.display = 'block'
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
  }
})();
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    width: '100%',
    height: '100%',
    videoId: 'seoY2-hm7lQ',
    events: {
      onReady: $fastlaneYT.onPlayerReady,
      onStateChange: $fastlaneYT.onPlayerStateChange
    }
  });
}
