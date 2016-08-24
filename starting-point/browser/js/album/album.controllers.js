/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

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
  $scope.toggle = function (song) {
  	// if song is playing and song is the current song, then pause!
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else {
    	// sets currentSong in PlayerFactory to song and plays it
      PlayerFactory.start(song)
    }
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // }

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  }
  function next () { skip(1); }
  function prev () { skip(-1); }

});

