var spotcrime = require('../lib/crime.js');

var CrimeController = function(app) {
    this.initRoutes = function() {

        app.get('/crimes', function(req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Content-Type', 'application/json');
            spotcrime(req.query).then(function(crime) {
                res.status(200).json(crime);
            }).catch(function(err) {
                res.status(500).send(err);
            });
        });

    };
};

module.exports = CrimeController;
