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
          .state('novels.categories', {
            url: '/categories',
            templateUrl: 'app/novels/categories.list.html',
            data: {
              model: 'categories',
              action: ['list']
            },
            controller: 'CategoriesListCtrl'
          })
          .state('novels.add-categories', {
            url: '/categories/add',
            templateUrl: 'app/novels/categories.edit.html',
            data: {
              model: 'categories',
              action: ['add']
            },
            controller: 'CategoriesEditCtrl'
          })
          .state('novels.edit-categories', {
            url: '/categories/:id',
            templateUrl: 'app/novels/categories.edit.html',
            data: {
              model: 'categories',
              action: ['edit']
            },
            controller: 'CategoriesEditCtrl'
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
