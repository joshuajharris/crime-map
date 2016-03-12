var MapController = function(app) {
    this.initRoutes = function() {
        app.get('/', function(req, res) {
            res.render('index.html');
        });
    };
};

module.exports = MapController;
