/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // state
  // $scope.currentSong;
  // $scope.playing = false;

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  //console.log(PlayerFactory);

  // main toggle
  $scope.toggle = function (song) {
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
		  PlayerFactory.start(song);
	  }
  };

  $scope.isPlaying = function(){
  	return PlayerFactory.isPlaying();
  }
	$scope.currentSong = function() {
		return PlayerFactory.getCurrentSong();
	}
	$scope.progress = PlayerFactory.getProgress;

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () {
  	PlayerFactory.pause();
		PlayerFactory.next();
  };
  $scope.prev = function () {
  	PlayerFactory.pause();
		PlayerFactory.previous();
  };

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  // $scope.handleProgressClick = function (evt) {
  //   seek(evt.offsetX / evt.currentTarget.scrollWidth);
  // };
});
