var aipApp = angular.module('aipApp',['ngResource', 'ngRoute']);

aipApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: '/templates/home',
			controller: 'aipProfileListController'
		})
		.when('/view/:id',{
			templateUrl: '/temlates/view',
			controller: 'viewController'
		});
});

aipApp.factory('aipProfiles', function($resource){
	var model = $resource('api/aip/:id', {id: '@_id'});
	return{
		model: model,
		items: model.query()
	};
});

aipApp.controller('aipProfileListController', function($scope, aipProfiles){
	$scope.profiles = aipProfiles.profiles;

	$scope.addProfile = function(){
		var newProfile = new aipProfile.model(this.newProfile);
		newProfile.$save(function(savedProfile){
			aipProfiles.profiles.push(savedProfile);
		});
		this.newProfile ={};
	};
});

aipApp.controller('viewController', function($scope, aipProfiles, $routeParams){
	console.log($routeParams.id);
	var profileId = $routeParams.id;

	$scope.aip = aipProfiles.model.get({_id: profileId});
});

aipApp.directive('aipprofile', function(){
	return{
		restrict: 'E',
		templateUrl: '/templates/aipProfile',
		scope: {
			aip: '='
		}
	};
});