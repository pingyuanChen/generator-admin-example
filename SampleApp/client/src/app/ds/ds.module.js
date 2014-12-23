define([
  './apiService',
  'common/utils/registerToModule',
  './categories',
  './folders',
  './movie',
  './music',
  './novel',
  './rules',
  './tvPlay',
  './stability'
], function(apiService, rtm, categories, folders, movie, music, novel, rules, tvPlay, stability) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, categories, folders, movie, music, novel, rules, tvPlay, stability)(mod);
  return modName;
});
