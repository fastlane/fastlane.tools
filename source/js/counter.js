'use strict';

import 'odometer';

(function(){
  let startedWithMinutes = null;

  // This number *never* changes
  const developerSecondsSavedBeforeAnalyticIngester = 26304323354;

  // These numbers are taken from our SQL query
  const developerSecondsSavedAfterAnalyticIngester = 4292012226;
  const developerSecondsSavedPerSecond = 560;
  const timeUpdated = 1499885116;

  let odometerEl = document.getElementById('odometer');

  let calculateHours = function() {
     // get current time
     // get difference in seconds from timeUpdated
     // multiply difference in seconds by developerSecondsSavedPerSecond
     // add to sum of developerSecondsSavedBefore and After
     let currentEpoch = ((new Date()).getTime()) / 1000;
     let developerSecondsSavedSinceUpdate = (currentEpoch - timeUpdated) * developerSecondsSavedPerSecond;
     let seconds = developerSecondsSavedSinceUpdate + developerSecondsSavedBeforeAnalyticIngester + developerSecondsSavedAfterAnalyticIngester;
     let minutes = seconds / 60; // to minutes
     if (startedWithMinutes === null) {
       startedWithMinutes = minutes;
     }
     let hours = parseInt(minutes / 60); // to hours
     odometerEl.innerHTML = hours;
  }

  setTimeout(calculateHours, 50);
  setInterval(function(){
     calculateHours();
  }, 5000);
})();
