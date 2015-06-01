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
		
		var matches = [];
		// This finds the name entered in the form
		Profile.findOne({'name': req.params.name}, function(err, results){
			if (err){
				console.log(err);
			}
			// This stores the curious foods of the name entered
			var userCuriousFoods = results.curiousFoods;
			// This gets the profiles
			Profile.find({},function(err, results){
				if(err){
					console.log(err);
				}
				// This filters through the profiles and returns all 
				// the names that are not the name entered in the form!
				var usersToSearch = _.filter(results, function(obj){
					return obj.name != req.params.name;
				});
				// This loops through the filtered profiles
				for (var i = 0; i < usersToSearch.length; i++) {
					// This stores the users name and their curiousFood list
					var usersCuriousFoods = usersToSearch[i].curiousFoods;
					// This loops through the users curiousFoods lists
					for (var j = 0; j < usersCuriousFoods.length; j++) {
						// Checks if any thing in foodArray is in userCuriousFoods and returns true 
						var commonInterest =	_.contains(userCuriousFoods, usersCuriousFoods[j]);
						//  if common curious foods
						if(commonInterest){
							// push the name of that user to the matches 
							// array
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

