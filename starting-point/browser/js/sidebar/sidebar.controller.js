'use strict';

juke.controller('SidebarCtrl', function ($scope, $rootScope) {
	$scope.viewAlbums = function(){
		$rootScope.$broadcast('viewSwap', { name: 'allAlbums'});
	}
});
