'use strict'

juke.controller('singleArtistCtrl', function($scope, $log, $rootScope, ArtistFactory, PlayerFactory, AlbumFactory){

	// listens for one artist broadcast from all Artists panel
	$scope.$on('viewOneArtist', function(event, data){
		console.log("Received data: ", data);
		$scope.artistId = data.artistId;
		$scope.showMe = (data.name === 'oneArtist');
		$rootScope.$broadcast('hideAllArtists', {name: 'hideArtists'});

		ArtistFactory.fetchById($scope.artistId)
			.then(function(foundArtist){
				console.log("Promise result from controller: ", foundArtist);
				$scope.artist = foundArtist[0].data;
				$scope.albums = foundArtist[1].data;
				// attaches images for albums
				$scope.albums.forEach(album => {
					album.imageUrl = '/api/albums/' + album.id + '/image';
				})
				$scope.songs = foundArtist[2].data;
			})
			.catch($log.error);
	})

	// ArtistFactory.fetchById($scope.artistId)
	// 	.then(function(foundArtist){
	// 		$scope.artist = foundArtist;
	// 		foundArtist.albums = ArtistFactory.fetchAlbums(foundArtist.id)
	// 			.then(function(foundAlbums){
	// 				$scope.artist.albums = foundAlbums.map((album)=>{
	// 					return album.name;
	// 				}).join(', ');
	// 			})
	// 		ArtistFactory.fetchSongs(foundArtist.id)
	// 			.then(function(foundSongs){
	// 				$scope.artist.songs = foundSongs;
	// 			})
	// 	})
	// 	.catch($log.error);

});