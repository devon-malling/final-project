var Profile = require('./profile.js');

Profile.find({}, function(err, results){
	if(results.length === 0){
		var p1 = new Profile({
			name: 'Devon Malling',
			staples: ['baked sweet potato','roasted sweet potato', 'roasted chicken'],
			snacks: ['cricket butter', 'beef jerky'],
			curious: ['']
		});
	}
})