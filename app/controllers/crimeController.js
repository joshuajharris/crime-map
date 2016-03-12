var spotcrime = require('../lib/crime.js');

var CrimeController = function(app) {
    this.initRoutes = function() {

        app.get('/crimes', function(req, res) {
            spotcrime(req.query).then(function(crime) {
                res.status(200).json(crime);
            }).catch(function(err) {
                res.status(500).send(err);
            });
        });

    };
};

module.exports = CrimeController;
