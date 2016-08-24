'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var jukeFactoryObj = {};

  var currentSong = null;
  var isPlayingBOOL = false;
  var currentaudio = document.createElement('audio');
	var currentTime = 0;
	var currentProgress = 0;
	var songList = [];

	currentaudio.addEventListener('timeupdate', function () {
	  currentProgress = currentaudio.currentTime / currentaudio.duration * 100;
	  $rootScope.$evalAsync();
	});

	// Doesn't work atm
  currentaudio.addEventListener('ended', function () {
    jukeFactoryObj.next();
    $rootScope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });

	// HELPER FUNCTIONS FOR NEXT AND PREV //
	function mod (num, m) { return ((num % m) + m) % m; }

	// ACCESSIBLE METHODS IN FACTORY
  jukeFactoryObj.start = function(song, listOfSongs) {
  	songList = listOfSongs;
  	if( isPlayingBOOL ){
  		jukeFactoryObj.pause();
  		isPlayingBOOL = false;
  	}
	  else {
		  currentSong = song;
		  currentaudio.src = song.audioUrl;
		  currentaudio.load();
		  currentaudio.play();
		  isPlayingBOOL = true;
	  }
  };

  jukeFactoryObj.pause = function() {
  	isPlayingBOOL = false;
		currentTime = currentaudio.currentTime;
  	currentaudio.pause();
  };

  jukeFactoryObj.resume = function(song) {
  	if( !isPlayingBOOL ){
		  currentaudio.currentTime = currentTime;
		  currentaudio.src = currentSong.audioUrl;
		  currentaudio.load();
		  currentaudio.play();
		  isPlayingBOOL = true;
		}
  }

  jukeFactoryObj.isPlaying = function() {
  	return isPlayingBOOL;
  }

  jukeFactoryObj.getCurrentSong = function() {
  	return currentSong;
  }

  jukeFactoryObj.getCurrentTime = function(){
  	return currentTime;
  }

  function skip (interval) {
		if (!currentSong) return;
		var index = songList.indexOf(currentSong);
		index = mod( (index + (interval || 1)), songList.length );
		currentSong = songList[index];
	}

  jukeFactoryObj.next = function() {
  	skip(1);
  	this.start(currentSong, songList);
  }

  jukeFactoryObj.previous = function() {
  	skip(-1);
  	this.start(currentSong, songList);
  }

  jukeFactoryObj.getProgress = function() {
	  return currentProgress;
  }

  return jukeFactoryObj;
});
