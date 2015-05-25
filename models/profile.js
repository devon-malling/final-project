var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
	name: String,
	staples: Array,
	snacks: Array,
	curious: Array
});

module.exports = mongoose.model('profile', profileSchema);