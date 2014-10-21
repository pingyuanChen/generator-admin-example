define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('novels', {
            abstract: true,
            url: '/novels',
            template: '<ui-view/>'
          })
          .state('novels.novel', {
            url: '/novel',
            templateUrl: 'app/novels/novel.list.html',
            data: {
              model: 'novel',
              action: ['list']
            },
            controller: 'NovelListCtrl'
          })
          .state('novels.add-novel', {
            url: '/novel/add',
            templateUrl: 'app/novels/novel.edit.html',
            data: {
              model: 'novel',
              action: ['add']
            },
            controller: 'NovelEditCtrl'
          })
          .state('novels.edit-novel', {
            url: '/novel/:id',
            templateUrl: 'app/novels/novel.edit.html',
            data: {
              model: 'novel',
              action: ['edit']
            },
            controller: 'NovelEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
