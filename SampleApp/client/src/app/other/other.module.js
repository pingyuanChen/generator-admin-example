define([
  './other.config',
  'common/utils/registerToModule',
  './folders.list',
  './folders.edit',
  './rules.list',
  './rules.edit'
], function(otherConfig, rtm, FoldersListCtrl, FoldersEditCtrl, RulesListCtrl, RulesEditCtrl) /*invoke*/ {
  var modName = 'app.other',
    mod = angular.module(modName, []);
  rtm(FoldersListCtrl, FoldersEditCtrl, RulesListCtrl, RulesEditCtrl)(mod);
  otherConfig(mod);
  return modName;
});
