/* global juke */
'use strict';

juke.controller('AlbumsCtrl', function($scope, $log, AlbumsFactory){
	AlbumsFactory.fetchAll()
		.then(function(foundAlbums){
			$scope.albums = foundAlbums;
			$scope.albums.forEach(album => {
				album.imageUrl = '/api/albums/' + album.id + '/image';
			})
		})
		.catch($log.error);
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