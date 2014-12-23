define([
  './reportModule.config',
  'common/utils/registerToModule',
  './stability'
], function(reportModuleConfig, rtm, StabilityListCtrl) /*invoke*/ {
  var modName = 'app.reportModule',
    mod = angular.module(modName, []);
  rtm(StabilityListCtrl)(mod);
  reportModuleConfig(mod);
  return modName;
});
