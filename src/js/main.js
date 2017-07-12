(function(){

  var url = "https://fastlane-refresher.herokuapp.com/duration";
  var startedWithMinutes = null;

  function reloadThis() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var results = JSON.parse(xmlhttp.responseText);
        var seconds = 0;
        for (var key in results) {
          seconds += results[key];
        }

        minutes = seconds / 60; // to minutes
        if (startedWithMinutes === null) {
          startedWithMinutes = minutes;
        }
        var hours = minutes / 60; // to hours

        var hoursAsArray = parseInt(hours).toString().split('');
        var outputHtml = '';
        var hoursOutput = [];
        hoursAsArray.reverse();

        for (var i = 0; i < hoursAsArray.length; i++) {
          if ((i !== 0) && (i % 3 === 0)) {
            hoursOutput[i] = '<span>'+ hoursAsArray[i] +'</span><span class="comma">,</span>';
          }else{
            hoursOutput[i] = '<span>'+ hoursAsArray[i] +'</span>';
          }
        }

        hoursOutput.reverse();
        for (var a = 0; a < hoursOutput.length; a++) {
          outputHtml += hoursOutput[a] ;
        }

        //document.getElementById("currentCount").innerHTML = parseInt(hours); // .toLocaleString()
        document.getElementById('currentCount').innerHTML = outputHtml;

        var diff = minutes - startedWithMinutes;
        if (diff > 1) {
          // document.getElementById("pageMinutes").innerHTML = diff
          // document.getElementById("divTransparentMinutes").style.opacity = 1
        }

        // show everything
        document.getElementById('timeCounter').style.opacity = 1;
      }
    };
  }
  reloadThis();
  setInterval(reloadThis, 10000);

  new WOW().init();

})();
