define([
  './musics.config',
  'common/utils/registerToModule',
  './music.list',
  './music.edit'
], function(musicsConfig, rtm, MusicListCtrl, MusicEditCtrl) /*invoke*/ {
  var modName = 'app.musics',
    mod = angular.module(modName, []);
  rtm(MusicListCtrl, MusicEditCtrl)(mod);
  musicsConfig(mod);
  return modName;
});
