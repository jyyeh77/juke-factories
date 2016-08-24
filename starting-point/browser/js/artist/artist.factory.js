'use strict'

juke.factory('ArtistFactory', function($http, $rootScope) {
	var artistFactory = {};
	artistFactory.fetchAll = () => {
		return $http.get('/api/artists')
			.then(function(res){
				return res.data;
			})
	}
	artistFactory.fetchById = (artistId) => {
		return $http.get('/api/artists/' + artistId)
			.then(function(res){
				return res.data;
		})
	}
	artistFactory.fetchAlbum = (artistId) => {
		return $http.get('/api/artists/' + artistId + '/albums')
			.then(function(res){
				return res.data;
			})
	}
	artistFactory.fetchSongs = (artistId) => {
		return $http.get('/api/artists/' + artistId + '/songs')
			.then(function(res){
				return res.data;
		})
	}
	return artistFactory;
});
