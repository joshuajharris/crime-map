var PORT = process.env.PORT || 8080;

var Bootstrap = require('./app/bootstrap');
var app = new Bootstrap();

var server = app.init();

server.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '!');
});
