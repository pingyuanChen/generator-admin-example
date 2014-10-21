define([
  './videos.config',
  'common/utils/registerToModule',
  './movie.list',
  './movie.edit',
  './tvPlay.list',
  './tvPlay.edit'
], function(videosConfig, rtm, MovieListCtrl, MovieEditCtrl, TvPlayListCtrl, TvPlayEditCtrl) /*invoke*/ {
  var modName = 'app.videos',
    mod = angular.module(modName, []);
  rtm(MovieListCtrl, MovieEditCtrl, TvPlayListCtrl, TvPlayEditCtrl)(mod);
  videosConfig(mod);
  return modName;
});
