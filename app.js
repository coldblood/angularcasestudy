var main = angular.module('main',['ServicesModule','Utilities','ui.router','ngGrid']);
main.config(function($stateProvider){
	$stateProvider.state('user',{
		url: '/user',
		views: {
			'':{
				templateUrl: 'templates/userform.html'
			},
			'userform@user':{
				templateUrl: 'templates/form.html'
			},
			'list@user':{
				templateUrl:'templates/list.html'
			},
			'grid@user':{
				templateUrl:'templates/grid.html'
			}
		},
		pagekey: 'USER'
	}).state('home',{
		url: '/home',
		views: {
			'':{
				templateUrl: 'templates/home.html'
			},
			'list@home':{
				templateUrl:'templates/grid.html'
			}
		},
		pagekey: 'HOME'
	});
});

main.directive('userForm',['Services', function(services){
	return {
		restrict: 'EA',
		templateUrl: 'templates/form.html'
	}
}]);

main.controller('UserController',['$scope','Services',function(scope,services){
	scope.genders=[{label:'male', code:'M'},{label:'female', code:'F'}];
	scope.grades=['A','B','C'];
	var skillsPromise = services.getSkills();
	skillsPromise.success(function(response){
		scope.allSkills = response.skills;
	});
	var colorsPromise = services.getColors();
	colorsPromise.success(function(response){
		scope.colors = response.colors;
		scope.user = {name: 'a', age: 9, gender: scope.genders[0], selectedSkills: [false,false,true,true], grade: scope.grades[1], color: scope.colors[0]};
	});
	scope.users = [];
	scope.save = function(){
		var promise = services.save(scope.user);
		promise.success(function(){
			scope.users.push(angular.copy(scope.user));
			scope.user = {};
		});
		promise.error(function(){
			alert('error saving');
			scope.user = {};
		});
	}
	scope.delete = function(index){
		if(confirm('Are you sure?')){
			console.log(scope.users);
			var promise = services.delete(scope.users[index]);
			promise.success(function(){
				scope.users.splice(index, 1);
				console.log('deleted the file')	;
			});
		}
	}
	scope.validateAge = function(userForm,ageField){
		ageField.$error.age = false;
		userForm.$invalid = false;
		console.log(ageField);
		if(ageField.$viewValue <= 0){
			ageField.$error.age = true;
			userForm.$invalid = true;
		}
	}

	scope.gridOptions = {
		data : 'users',
		filterOptions: scope.searchText,
		columnDefs: [
			{ field: 'name', displayName: 'Name'},
			{ field: 'age', displayName: 'Age'},
			{ field: 'grade', displayName: 'Grade'},
			{ field: 'color.color', displayName: 'Color'},
			{ field: 'gender.label', displayName: 'Gender'},
			{ field: 'selectedSkills', displayName: 'Selected', cellTemplate: "<div class='ngCellText' style='margin-top: 4px;'><span ng-repeat='skill in allSkills' ng-show='row.entity.selectedSkills[$index]' class='label label-info' style='margin-right:2px'>{{skill}}</li></ul></span></div>"},
		]
	}
}]);
