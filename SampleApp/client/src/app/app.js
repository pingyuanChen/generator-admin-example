/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
  'app.config.module',
  'services/services.module',
  'common/widgets/widgets.module',
  'common/filters/filters.module',

  'auth/auth.module',
  'ds/ds.module',
  'layouts/layouts.module',
  'novels/novels.module',
  'other/other.module',
  'videos/videos.module',
  'musics/musics.module',
  'reportModule/reportModule.module'
], function(appConfig, services, widgets, filters, auth, ds, layouts, novels, other, videos, musics, reportModule) /*invoke*/ {
  'use strict';

  var appMod = angular.module('app', [
    'ui.bootstrap',
    'ngTable',
    'ui.router',
    'ngSanitize',

    appConfig,
    services,
    widgets,
    filters,
    auth,
    ds,
    layouts,
    novels,
    other,
    videos,
    musics,
    reportModule
  ]); /*ngDeps*/
  return 'app';
});
