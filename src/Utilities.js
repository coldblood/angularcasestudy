var utilities = angular.module('Utilities',[]);
utilities.filter('ellipsis',['$filter', function(filter) {
	return function(data, limit) {
		if(data.length <= limit){
			return data;
		} else {
		return filter('limitTo')(data,limit)+'...';
		}
	}
}]);