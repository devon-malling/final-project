var aipApp = angular.module('aipApp',['ngResource', 'ngRoute']);

aipApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: '/templates/home',
			controller: 'aipProfileListController'
		})
		// use this when you want to create a view for your individual profiles
		.when('/view/:id',{
			templateUrl: '/templates/view',
			controller: 'viewController'
		})
		.when('/snackLibrary',{
			templateUrl: '/templates/snackLibrary',
			controller:'snackLibraryController'
		});
});

aipApp.factory('profileTemplate', function($resource){
	var model = $resource('api/aip/:id', {id: '@_id'});
	return{
		model: model,
		profiles: model.query()
	};
});

aipApp.controller('aipProfileListController', function($scope, profileTemplate){
	$scope.profiles = profileTemplate.profiles;
	console.log('TEST', $scope.profiles);

	$scope.addProfile = function(){
		var newProfile = new profileTemplate.model(this.newProfile);
		newProfile.$save(function(savedProfile){
			profileTemplate.profiles.push(savedProfile);
		});
		this.newProfile ={};
	};
});

aipApp.controller('viewController', function($scope, profileTemplate, $routeParams){
	console.log($routeParams.id);
	var profileId = $routeParams.id;

	$scope.aip = profileTemplate.model.get({_id: profileId});
});

// Snacks factory
aipApp.factory('snackLibrary', function($resource){
	var model = $resource('api/snacks/:id', {id: '@_id'});
	return{
		model: model,
		snacks: model.query()
	};
});


// snacks controller
aipApp.controller('snackLibraryController', function($scope, snackLibrary){
	console.log('TEST', $scope.snacks);
	$scope.snacks = snackLibrary.snacks;
});

aipApp.directive('profiletemplate', function(){
	return{
		restrict: 'E',
		templateUrl: '/templates/profileTemplate',
		scope: {
			aip: '='
		}
	};
});