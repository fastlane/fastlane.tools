// Init YouTube player
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Add mobile class
if (/ip(ad|hone|od)|android/i.test(window.navigator.userAgent)) {
  document.body.classList.add('mobile');
}