'use strict'

juke.controller('ArtistCtrl', function($scope, $log, $rootScope, ArtistFactory){

	$scope.$on('viewArtists', function(event, data){
		$scope.showMe = (data.name === 'allArtists');
		$scope.artists = data.artists;
	})

	// hides all artists upon broadcast for single selected artist
	$scope.$on('hideAllArtists', function(event, data){
		$scope.showMe = (data.name === 'allArtists');

	})

	$scope.viewOneArtist = function(artistId){
		$rootScope.$broadcast('viewOneArtist', { name: 'oneArtist', artistId: artistId});
	}
})