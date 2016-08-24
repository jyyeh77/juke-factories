'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var jukeFactoryObj = {};

  var currentSong = null;
  var isPlayingBOOL = false;
  var currentaudio = document.createElement('audio');
	var currentTime = 0;
	var songList = [];

  // jukeFactoryObj.currentaudio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

	// HELPER FUNCTIONS FOR NEXT AND PREV //
	function mod (num, m) { return ((num % m) + m) % m; }

	

	// ACCESSIBLE METHODS IN FACTORY
  jukeFactoryObj.start = function(song, listOfSongs) {
  	songList = listOfSongs;
  	if( isPlayingBOOL ){
  		jukeFactoryObj.pause();
  		isPlayingBOOL = false;
  	}
  	// if (currentaudio.currentTime > 0 && song === currentSong) currentaudio.play();
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
	console.log("Paused time at: ", currentTime);
  	currentaudio.pause();
  };

  jukeFactoryObj.resume = function(song) {
  	if( !isPlayingBOOL ){
	  currentaudio.currentTime = currentTime;
	  console.log("Time at pause: ", currentaudio.currentTime)
	  currentaudio.play();
	  isPlayingBOOL = true;
	  console.log("Are we playing: ", isPlayingBOOL)
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

  function skip (interval) {
		if (!currentSong) return;
		var index = extractIndexOfCurrentSong(currentSong, songList);
		console.log("index", index);
		index = mod( (index + (interval || 1)), songList.length );
		console.log("index after", index);
		console.log("currentSong before:", currentSong);
		currentSong = songList[index];
		console.log("currentSong after:", currentSong);
		
	}

function extractIndexOfCurrentSong( songToCheck, songList){
	
	var albumIndex;

	songList.forEach( function(song, i){
		if( song.audioUrl === songToCheck.audioUrl ){
			albumIndex = i;
		}
	})

	return albumIndex;
}

  jukeFactoryObj.next = function() {
  	skip(1);
  	if (!isPlayingBOOL) jukeFactoryObj.start(currentSong, songList);
  }

  jukeFactoryObj.previous = function() {
  	skip(-1);
  	if (!isPlayingBOOL) jukeFactoryObj.start(currentSong, songList);
  }

  jukeFactoryObj.getProgress = function() {
  	return 100 * currentaudio.currentTime / currentaudio.duration;
  }


  return jukeFactoryObj;
});
