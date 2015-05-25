var Profile = require('../models/profile.js');
var _ = require('../node_modules/underscore/underscore.js');

var apiController = {

	getAll: function(req, res){
		var requestedId = req.query._id;
		if(requestedId){
			Profile.findById(requestId, function(err, result){
				console.log(result);
				res.send(result);
			});
		} else {
			Profile.find({}, function(err, results){
				console.log(results);
				res.send(results);
			});
		}
	},

	addProfile: function(req, res){
		var profile = new Profile(req.body);
		profile.save(function(err, result){
			res.send(result);
		});
	},

	snacks: function(req, res){
		// This my friend, is how you locate the snacks inside all users profiles
		Profile.find({}, function(err, profiles){
			var snacks = _.chain(profiles)
				.pluck('snacks').flatten()
				.uniq()
				.value();
			res.send(snacks);
		});
	}
};

module.exports = apiController;

