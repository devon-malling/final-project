var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/api.js');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/angular-aip-profiles");
// setting the database
require('./models/profileSeed.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', indexController.index);

app.get('/templates/:templateName', indexController.templates);

// Api methods:
app.get('/api/profile', apiController.getAll);
app.post('/api/profile', apiController.addProfile);
app.get('/api/snacks', apiController.snacks);
app.get('/api/curious_foods_library', apiController.curiousFoods);
app.delete('/api/profile/:profileId', apiController.deleteProfile);
app.get('/api/shared_curious_foods/:name', apiController.sharedCuriousFoods);

var server = app.listen(process.env.PORT || 7600, function() {
	console.log('Express server listening on port ' + server.address().port);
});
