'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var jukeFactoryObj = {};

  var currentSong = undefined;
  var isPlayingBOOL = false;
  var currentaudio = document.createElement('audio');
	var currentTime = 0;

  // jukeFactoryObj.currentaudio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });


  jukeFactoryObj.start = function(song) {
  	if( isPlayingBOOL ){
  		jukeFactoryObj.pause();
  		isPlayingBOOL = false;
  	}
  	if (currentaudio.currentTime > 0 && song === currentSong) currentaudio.play();
	  else {
		  currentSong = song;
		  currentaudio.src = song.audioUrl;
		  currentaudio.load();
		  currentaudio.play();
	  }
	  isPlayingBOOL = true;

  }

  jukeFactoryObj.pause = function() {
  	isPlayingBOOL = false;
	  currentTime = currentaudio.currentTime;
	  console.log("Paused time at: ", currentTime);
  	currentaudio.pause();
  }

  jukeFactoryObj.resume = function(song) {
  	if( !isPlayingBOOL )
  		if (song === currentSong) {
  		  currentaudio.currentTime = currentTime;
			  console.log("Time at pause: ", currentaudio.currentTime)
  		  jukeFactoryObj.start(currentSong);
		  }
  }

  jukeFactoryObj.isPlaying = function() {
  	return isPlayingBOOL;
  }

  jukeFactoryObj.getCurrentSong = function() {
  	// console.log("Current song is: ", currentSong);
  	return currentSong;
  }

  jukeFactoryObj.getCurrentTime = function(){
  	return currentTime;
  }

  jukeFactoryObj.next = function() {}

  jukeFactoryObj.previous = function() {}

  jukeFactoryObj.getProgress = function() {}


  return jukeFactoryObj;
});
