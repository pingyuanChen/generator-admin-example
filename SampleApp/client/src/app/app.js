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
  'videos/videos.module',
  'musics/musics.module',
  'novels/novels.module'
], function(appConfig, services, widgets, filters, auth, ds, layouts, videos, musics, novels) /*invoke*/ {
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
    videos,
    musics,
    novels
  ]); /*ngDeps*/
  return 'app';
});
