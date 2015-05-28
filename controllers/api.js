var Profile = require('../models/profile.js');
var _ = require('../node_modules/underscore/underscore.js');

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
	console.log('billy boy');
	},

	deleteProfile: function(req,res){
		var aipId = req.params.aipId;
		Profile.findByIdAndRemove(aipId, function(err, results){
			res.send(results);
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
	},
	curiousFoods: function(req, res) {
		Profile.find({}, function(err, profiles){
			var curiousFoods = _.chain(profiles)
				.pluck('curiousFoods').flatten()
				.uniq()
				.value();
			
			res.send(curiousFoods);
		});
	},
	sharedCuriousFoods: function(req, res){
		
		// res.send('success');

		// Profile.findById(requestedId, function(err, profiles){
		// });
		var matches = [];
		Profile.findOne({'name': req.params.name}, function(err, results){
			if (err){
				console.log(err);
			}
			
			var userCuriousFoods = results.curiousFoods;
			Profile.find({},function(err, results){
				if(err){
					console.log(err);
				}
				
				var usersToSearch = _.filter(results, function(obj){
					return obj.name != req.params.name;
				});
				
				for (var i = 0; i < usersToSearch.length; i++) {
					var foodArray = usersToSearch[i].curiousFoods;
					for (var j = 0; j < foodArray.length; j++) {
						
						var foodBoolean =	_.contains(userCuriousFoods, foodArray[j]);
						
						if(foodBoolean){
							matches.push(usersToSearch[i].name);
						}
					}
				}

			res.send(matches);
			});
			
		});
	}

};

module.exports = apiController;

