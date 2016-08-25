'use strict'

juke.factory('ArtistFactory', function($http, $rootScope, $q, $log) {
	var artistFactory = {};
	artistFactory.fetchAll = () => {
		return $http.get('/api/artists')
			.then(function(res){
				return res.data;
			})
	}
	artistFactory.fetchById = (artistId) => {
		var queries = [$http.get('/api/artists/' + artistId),
			 $http.get('api/artists/' + artistId + '/albums'),
			$http.get('api/artists/' + artistId + '/songs')];
		return $q.all(queries)
			.then(function (artistInfo) {
				return artistInfo;
			})
			.catch($log.error);
	}
	artistFactory.fetchAlbums = (artistId) => {
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
