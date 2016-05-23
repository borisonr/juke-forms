juke.config(function ($stateProvider) {

  $stateProvider.state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/new-playlist-form.html',
    controller: 'NewPlaylistFormCtrl'
  });

  $stateProvider.state('viewPlaylist', {
    url: '/playlists/:playlist',
    templateUrl: '/js/playlist/templates/new-playlist-songs.html',
    controller: 'ViewPlaylistCtrl', 
    resolve: {
      thePlaylist: function (PlaylistFactory, $stateParams) {
        return PlaylistFactory.fetchOne($stateParams.playlist);
      },
      allSongs: function(SongFactory, $stateParams) {
      	return SongFactory.fetchAll()
      }
    }
  });

});