express = require('express');
bodyParser = require('body-parser');

var Bootstrap = function() {
    this.init = function() {
        var app = express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static('public'));

        var MapController = require('./controllers/mapController');
        var mapController = new MapController(app);
        mapController.initRoutes();

        var CrimeController = require('./controllers/crimeController');
        var crimeController = new CrimeController(app);
        crimeController.initRoutes();

        return app;
    };

    return this;
}

module.exports = Bootstrap;
