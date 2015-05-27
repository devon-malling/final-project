var Profile = require('./profile.js');

Profile.find({}, function(err, results){
	if(results.length === 0){
		var p1 = new Profile({
			name: 'Devon Malling',
			staples: ['baked sweet potato','roasted sweet potato', 'roasted chicken'],
			snacks: ['cricket butter', 'beef jerky'],
			curiousFoods: ['organ meats', 'chayote']
		});
		p1.save();

		var p2 = new Profile({
			name: 'Claire D.',
			staples: ['cauliflower rice', 'avocado', 'bone broth', 'shell fish'],
			snacks: ['kale chips', 'plantain crackers', 'coconut flour pancakes'],
			curiousFoods: ['mayo alternatives', 'ketchup alternatives','mustard alternatives'] 
		});
		p2.save();
	}
});