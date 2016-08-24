/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

	// $scope.songList;
  // load our initial data
	AlbumFactory.fetchAll()
		.then(function(foundAlbums){
			var randomIndex = Math.floor(Math.random() * foundAlbums.length);
			return AlbumFactory.fetchById(foundAlbums[randomIndex].id);
		})
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
	  // $scope.songList = album.songs;
    $scope.album = album;
	  StatsFactory.totalTime($scope.album)
		  .then(function (albumDuration){
		  	$scope.fullDuration = Math.floor(Math.ceil(albumDuration) / 60) + ':' + Math.ceil(albumDuration) % 60;
			  $scope.$evalAsync();
		  })
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound


	// retrieves current player state from Player Factory for use in DOM
	$scope.playing = function(){
		return PlayerFactory.isPlaying();
	}
	// retrieves current song from DOM using Player Factory method
	$scope.currentSong = function(){
		return PlayerFactory.getCurrentSong();
	}

  // main toggle
  $scope.toggle = function (song, songList) {
  	// if song is playing and song is the current song, then pause!
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
    	console.log("Pausing song! ", song.name);
      PlayerFactory.pause();
    } else if (!PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
    	console.log("Resuming song!", song.name);
	    PlayerFactory.resume(song);
    } else {
    	console.log("Starting new song! ", song.name);
    	// sets currentSong in PlayerFactory to song and plays it
      PlayerFactory.start(song, songList);
    }
  };

});

