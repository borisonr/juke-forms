juke.controller('NewPlaylistFormCtrl', function($scope){
		$scope.create = function(data){
		// if (data.name[0] === " ")	data.name = data.name.trim()
		PlaylistFactory.create(data)
		.then(function(result){
			console.log(result);
			$scope.title = " ";
			$scope.reset = function() {

			}
		})
	}

})

juke.controller('NewPlaylistCtrl', function($scope, PlaylistFactory, thePlaylist, PlayerFactory) {

  $scope.playlist = thePlaylist;

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

})