function appendTimeStamp(data){
	if(!data){
		return data;
	}
	var obj = angular.fromJson(data);
	obj.timeStamp = new Date();
	return angular.toJson(obj);
}

angular.module('ServicesModule',[]).service('Services', ['$http', function(http){	
	http.defaults.transformRequest.push(appendTimeStamp);
	return {
		save: function(user){
			var configObj = {
				url: 'data/'+user.name+'.json',
				method: 'put',
				data: user
			};
			return http(configObj);
		},
		delete: function(user){
			return http({
				url: 'data/'+user.name+'.json',
				method: 'delete',
				transformRequest: function(){

				}
			});	
		},
		getSkills: function(){
			return http({
				url: 'skills.json'
			})
		},
		getColors: function(){
			return http({
				url: 'colors.json'
			})
		}
	}
}]);