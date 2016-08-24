/* global juke */
'use strict';

juke.controller('AlbumsCtrl', function($scope, $log, $rootScope, AlbumsFactory, AlbumFactory){
	AlbumsFactory.fetchAll()
		.then(function(foundAlbums){
			$scope.albums = foundAlbums;
			$scope.albums.forEach(album => {
				album.imageUrl = '/api/albums/' + album.id + '/image';
			})
		})
		.catch($log.error);

	$scope.$on('viewSwap', function (event, data) {
		// console.log(data.name === 'allAlbums');
		$scope.showMe = (data.name === 'allAlbums');
	})

	$scope.viewOneAlbum = function (albumId) {
		// console.log("I clicked this album: ", albumId);
		var clickedAlbum;
		AlbumFactory.fetchById(albumId)
			.then(function(fetchedAlbum){
				clickedAlbum = fetchedAlbum;
				clickedAlbum.imageUrl = '/api/albums/' + fetchedAlbum.id + '/image';
				$rootScope.$broadcast('viewSwap', {name: 'oneAlbum', album: clickedAlbum});
			})
			.catch($log.error)

	}
})

juke.factory('AlbumsFactory', function($http){
	var albumsObj = {};
	albumsObj.fetchAll = function (){
		return $http.get('/api/albums/')
			.then(function (res) {
				return res.data;
			})
	}

	return albumsObj;
})