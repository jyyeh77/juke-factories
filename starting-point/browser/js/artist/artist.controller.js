'use strict'

juke.controller('ArtistCtrl', function($scope, $log, $rootScope, ArtistFactory){

	$scope.$on('viewArtists', function(event, data){
		$scope.showMe = (data.name === 'allArtists');
		$scope.artists = data.artists;
	})

	$scope.viewOneArtist = function(artistId){
		console.log("Artist ID ", artistId);
		ArtistFactory.fetchById(artistId)
			.then(function(foundArtist){
				$scope.artist = foundArtist;
				foundArtist.albums = ArtistFactory.fetchAlbum(foundArtist.id)
					.then(function(foundAlbums){
						$scope.artist.albums = foundAlbums.map((album)=>{
							return album.name;
						}).join(', ');
					})
				ArtistFactory.fetchSongs(foundArtist.id)
					.then(function(foundSongs){
						$scope.artist.songs = foundSongs;
					})
				console.log($scope.artists);
				$rootScope.$broadcast('viewArtists', { name: 'allArtists', artists: $scope.artist});
			})
			.catch($log.error);
	}

	// $scope.$on('viewOneArtist', function(event, data){
	// 	$scope.showMe = (data.name === 'oneArtist');
	// })
})