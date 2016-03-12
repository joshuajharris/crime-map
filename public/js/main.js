$(function() {
    var mymap;

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;

          initMap(lat, lon);
          getCrimes(lat, lon, markCrimes);
      });
    } else {
      /* geolocation IS NOT available */
    }

    function initMap(lat, lon) {
        mymap = L.map('mapid').setView([lat, lon], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9zaHVhamhhcnJpcyIsImEiOiJjaWs4aXY4OTUwMnM4dTNrdzc0NDI3Mm1yIn0.2qKe8jSYKFlGRiApo2ZiVw', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'joshuajharris.pd270hm2',
            accessToken: 'pk.eyJ1Ijoiam9zaHVhamhhcnJpcyIsImEiOiJjaWs4aXY4OTUwMnM4dTNrdzc0NDI3Mm1yIn0.2qKe8jSYKFlGRiApo2ZiVw'
        }).addTo(mymap);

        var youMarker = L.marker([lat, lon]).addTo(mymap);
        youMarker.bindPopup('<b>You</b>');
    };

    function getCrimes(lat, lon, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    var crimes = JSON.parse(xhr.responseText);
                    callback(crimes);
                } else {
                    console.log("Error: " + xhr.statusText)j
                }
            }
        };
        xhr.open('GET', "/crimes?lat=" + lat + "&lon=" + lon, true);
        xhr.send();
    };

    function markCrimes(crimes) {
        var markers = [];
        crimes.forEach(function(crime) {
            // console.log(crime);
            var marker = L.marker([crime.lat, crime.lon]).addTo(mymap);
            marker.bindPopup('<b>' + crime.type + '</b><br>' + crime.address + '<br>' + crime.date);
            markers.push(marker);
            buildHTML(crime);
        });
    }

    function buildHTML(crime) {
        var el = $("#crime").clone().attr('id', crime.cid).show();
        $('.type', el).text(crime.type);
        $('.address', el).text(crime.address);
        $('.date', el).text(crime.date);

        $('#crimes').append(el);
    }
});
