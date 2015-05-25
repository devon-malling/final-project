var Profile = require('../models/profile.js');

var apiController = {

	getAll: function(req, res){
		var requestedId = req.query._id;
		if(requestedId){
			Profile.findById(requestId, function(err, result){
				res.send(result);
			});
		} else {
			Profile.find({}, function(err, results){
				res.send(results);
			});
		}
	},

	addProfile: function(req, res){
		var profile = new Profile(req.body);
		profile.save(function(err, result){
			res.send(result);
		});
	}
};

module.exports = apiController;

