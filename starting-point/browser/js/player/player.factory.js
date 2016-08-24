'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var jukeFactoryObj = {};

  var currentSong = undefined;
  var isPlayingBOOL;
  var currentaudio = document.createElement('audio');

  // jukeFactoryObj.currentaudio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });


  jukeFactoryObj.start = function( event, song) {
  	
  	if( isPlayingBOOL ){
  		jukeFactoryObj.pause();
  		isPlayingBOOL = false;
  	}

  	currentSong = song;
    currentaudio.src = song.audioUrl;
    currentaudio.load();
    currentaudio.play();
    console.log("before", isPlayingBOOL);
    isPlayingBOOL = true;
    console.log("after", isPlayingBOOL);
  }

  jukeFactoryObj.pause = function() {
  	currentaudio.pause();
  }

  jukeFactoryObj.resume = function(event, song) {
  	if( !isPlayingBOOL )
  		jukeFactoryObj.start(song, audio);
  }

  jukeFactoryObj.isPlaying = function() {
  	return isPlayingBOOL;
  }

  jukeFactoryObj.getCurrentSong = function(song) {
  	return currentSong;
  }

  jukeFactoryObj.next = function() {}

  jukeFactoryObj.previous = function() {}

  jukeFactoryObj.getProgress = function() {}


  return jukeFactoryObj;
});
