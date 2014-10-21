define([
  './apiService',
  'common/utils/registerToModule',
  './movie',
  './music',
  './novel',
  './tvPlay'
], function(apiService, rtm, movie, music, novel, tvPlay) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, movie, music, novel, tvPlay)(mod);
  return modName;
});
