var aipApp = angular.module('aipApp',['ngResource', 'ngRoute']);

aipApp.config(function($routeProvider){
	$routeProvider
	// this is a route provider on the client side
		.when('/',{
			templateUrl: '/templates/home',
			controller: 'aipProfileListController'
		})
		// use this when you want to create a view for your individual profiles
		.when('/view/:id',{
			templateUrl: '/templates/view',
			controller: 'viewController'
		})
		.when('/snack_library',{
			templateUrl: '/templates/snackLibrary',
			controller:'snackLibraryController'
		})
		.when('/curious_foods_library',{
			templateUrl: '/templates/curiousFoodsLibrary',
			controller:'curiousFoodsLibraryController'
		});
});

aipApp.factory('profileTemplate', function($resource){
	var model = $resource('api/profile/:id', {id: '@_id'});
	return{
		model: model,
		profiles: model.query()
	};
});

aipApp.controller('aipProfileListController', function($scope, profileTemplate){
	$scope.profiles = profileTemplate.profiles;
	console.log('PROFILE TEST', $scope.profiles);

	$scope.addProfile = function(){
		var newProfile = new profileTemplate.model(this.newProfile);
		newProfile.$save(function(savedProfile){
			profileTemplate.profiles.push(savedProfile);
		});
		this.newProfile ={};
	};
});
// for view individual profiles
aipApp.controller('viewController', function($scope, profileTemplate, $routeParams){
	console.log($routeParams.id);
	var profileId = $routeParams.id;

	$scope.profile = profileTemplate.model.get({_id: profileId});
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
	// this was scope.snacks before, but now you can view the profile when you click on view
	$scope.profiles = snackLibrary.model.query();
	// console.log(' SNACK TEST', $scope.snacks);
});

// curiousFoods factory
aipApp.factory('curiousFoodsLibrary', function($resource){
	var model = $resource('api/curious_foods_library/:id', {id: '@_id'});
	return{
		model: model,
		curiousFoods: model.query()
	};
});

// curiousFoodsController
aipApp.controller('curiousFoodsLibraryController', function($scope, $http, curiousFoodsLibrary){
	console.log('CURIOUS FOODS TEST', $scope.curiousFoods);
	// The model.query() is not the best way to do this but it works for now
	$scope.profiles = curiousFoodsLibrary.model.query();
	$scope.name = '';
	$scope.sharedCuriousFoods = function(){
		console.log($scope.name);
		// This http request is good for this purpose because I am only using it in one place, but if I decide to access this from another place as well, I would need to create a factory, because controllers can't be accesed or something
		$http.get('/api/shared_curious_foods/' + $scope.name)
			.success(function(data){
				console.log(data);
				$scope.matches = data;
			})
			.error(function(data){
				console.log(data);
			});
	};
});


aipApp.directive('profiletemplate', function(){
	return{
		restrict: 'E',
		templateUrl: '/templates/profileTemplate',
		scope: {
			profile: '='
		},
		controller: function($scope, profileTemplate){
			$scope.deleteProfile = function(profile){
				console.log(profileTemplate);
				this.profile.$remove();
				profileTemplate.profiles.splice(profileTemplate.profiles.indexOf(profile), 1);
			};
		}
	};
});