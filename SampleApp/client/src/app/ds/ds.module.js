define([
  './apiService',
  'common/utils/registerToModule',
  './categories',
  './folders',
  './movie',
  './music',
  './novel',
  './rules',
  './tvPlay'
], function(apiService, rtm, categories, folders, movie, music, novel, rules, tvPlay) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, categories, folders, movie, music, novel, rules, tvPlay)(mod);
  return modName;
});
