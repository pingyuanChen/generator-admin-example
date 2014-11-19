define([
  './novels.config',
  'common/utils/registerToModule',
  './categories.list',
  './categories.edit',
  './novel.list',
  './novel.edit'
], function(novelsConfig, rtm, CategoriesListCtrl, CategoriesEditCtrl, NovelListCtrl, NovelEditCtrl) /*invoke*/ {
  var modName = 'app.novels',
    mod = angular.module(modName, []);
  rtm(CategoriesListCtrl, CategoriesEditCtrl, NovelListCtrl, NovelEditCtrl)(mod);
  novelsConfig(mod);
  return modName;
});
