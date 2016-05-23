'use strict';

juke.factory('PlaylistFactory', function ($http, $q, AlbumFactory, SongFactory) {

  var cachedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.fetchAll = function () {
    return $http.get('/api/playlists')
    .then(function (response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  PlaylistFactory.create = function (data) {
    return $http.post('/api/playlists', data)
    .then(function (response) {
      var playlist = response.data
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  PlaylistFactory.fetchOne = function(playlistId){
    return $http.get('/api/playlists/'+playlistId)
    .then(function(results){
      return results.data;
    })
    .then(function (playlist) {
      playlist.songs = playlist.songs.map(SongFactory.convert);
      return playlist;
    })
  }

 PlaylistFactory.addSong = function(songId, playlistId){
    return $http.post('/api/playlists/'+playlistId+'/songs', {id: songId})
    .then(function (response) {

      return response.data;
    });
  }


  return PlaylistFactory;

});