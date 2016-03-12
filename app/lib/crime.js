var spotcrime = require('./spotcrime/spotcrime.js');
var Promise = require('promise');

module.exports = function(params) {
    return new Promise(function(resolve, reject) {
        var loc = {
          lat: parseFloat(params.lat),
          lon: parseFloat(params.lon)
        };

        var radius = 0.05; // this is miles

        spotcrime.getCrimes(loc, radius, function(err, crimes) {
            if(err) {
                reject({Error: err});
            } else {
                resolve(crimes);
            }
        });
    });
}
