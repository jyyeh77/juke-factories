'use strict';

juke.controller('SidebarCtrl', function ($scope, $rootScope, $log, ArtistFactory) {
	$scope.viewAlbums = function(){
		$rootScope.$broadcast('viewSwap', { name: 'allAlbums'});
		$rootScope.$broadcast('viewArtists', {name: 'viewSwap'});
		$rootScope.$broadcast('hideSingleAlbum', {name: 'hideAlbum'});
	}
	$scope.viewAllArtists = function(){
		ArtistFactory.fetchAll()
			.then(function(foundArtists){
				$rootScope.$broadcast('viewArtists', { name: 'allArtists', artists: foundArtists});
				$rootScope.$broadcast('viewSwap', { name: 'allArtists'});
				$rootScope.$broadcast('hideSingleAlbum', {name: 'hideAlbum'});
			})
			.catch($log.error);
	}
});
