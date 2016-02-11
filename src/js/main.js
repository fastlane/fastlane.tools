(function(){

  var url = "https://refresher.fastlane.tools/duration";
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

        for (var i = 0; i < hoursAsArray.length; i++) {
          outputHtml += '<span>'+ hoursAsArray[i] +'</span>';
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

  var since = new Date().getTime() - new Date(Date.parse("2015-07-14"));
  since = parseInt(since / 1000 / 60 / 60 / 24 / 30);
  document.getElementById('since').innerHTML = since;


  new WOW().init();
  
})();