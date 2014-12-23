define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('report-module', {
            abstract: true,
            url: '/report-module',
            template: '<ui-view/>'
          })
          .state('report-module.stability', {
            url: '/stability',
            templateUrl: 'app/reportModule/stability.html',
            controller: 'StabilityListCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
