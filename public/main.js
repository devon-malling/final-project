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
	var model = $resource('api/aip/:id', {id: '@_id'});
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
// aipApp.controller('viewController', function($scope, profileTemplate, $routeParams){
// 	console.log($routeParams.id);
// 	var profileId = $routeParams.id;

// 	$scope.aip = profileTemplate.model.get({_id: profileId});
// });

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
	console.log(' SNACK TEST', $scope.snacks);
	$scope.snacks = snackLibrary.snacks;
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
aipApp.controller('curiousFoodsLibraryController', function($scope, curiousFoodsLibrary){
	console.log('CURIOUS FOODS TEST', $scope.curiousFoods);
	$scope.curiousFoods = curiousFoodsLibrary.curiousFoods;
});


aipApp.directive('profiletemplate', function(){
	return{
		restrict: 'E',
		templateUrl: '/templates/profileTemplate',
		scope: {
			aip: '='
		},
		controller: function($scope, profileTemplate){
			$scope.deleteProfile = function(aip){
				console.log(profileTemplate);
				this.aip.$remove();
				profileTemplate.profiles.splice(profileTemplate.profiles.indexOf(aip), 1);
			};
		}
	};
});