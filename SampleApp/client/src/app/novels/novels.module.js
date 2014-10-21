define([
  './novels.config',
  'common/utils/registerToModule',
  './novel.list',
  './novel.edit'
], function(novelsConfig, rtm, NovelListCtrl, NovelEditCtrl) /*invoke*/ {
  var modName = 'app.novels',
    mod = angular.module(modName, []);
  rtm(NovelListCtrl, NovelEditCtrl)(mod);
  novelsConfig(mod);
  return modName;
});
