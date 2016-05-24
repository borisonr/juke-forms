juke.controller('NewPlaylistFormCtrl', function($scope, PlaylistFactory, $state){
		$scope.create = function(data){
		// if (data.name[0] === " ")	data.name = data.name.trim()
		PlaylistFactory.create(data)
		.then(function(result){
			console.log(result);
			$state.go('newPlaylistSongs', {playlist: result.id})
		})
	}

})

juke.controller('ViewPlaylistCtrl', function($scope, PlaylistFactory, thePlaylist, PlayerFactory, allSongs, SongFactory) {

  $scope.playlist = thePlaylist;
  $scope.allSongs = allSongs;
  $scope.addSong = function(songId, playlistId){
  	PlaylistFactory.addSong(songId, playlistId)
  	.then(function(song){
  		$scope.playlist.songs.push(SongFactory.convert(song));
  		// $scope.selectSong = '--choose song--'

  	});
  }

  $scope.deleteSong = function(songId, playlistId){
  	PlaylistFactory.deleteSong(songId, playlistId)
  	.then(function(data){
  		var index;
  		$scope.playlist.songs.forEach(function(song, idx) {
  			if (song.id === songId)  index = idx;
  		})
  		$scope.playlist.songs.splice(index, 1);
  		$scope.selectSong = '--choose song--';
  		return data;
  	});
  }

  // $scope.resetDropdown = function() {
  // 	$scope.selectSong.name = '--choose song--'
  // }

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