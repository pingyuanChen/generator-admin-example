define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('other', {
            abstract: true,
            url: '/other',
            template: '<ui-view/>'
          })
          .state('other.folders', {
            url: '/folders',
            templateUrl: 'app/other/folders.list.html',
            data: {
              model: 'folders',
              action: ['list']
            },
            controller: 'FoldersListCtrl'
          })
          .state('other.add-folders', {
            url: '/folders/add',
            templateUrl: 'app/other/folders.edit.html',
            data: {
              model: 'folders',
              action: ['add']
            },
            controller: 'FoldersEditCtrl'
          })
          .state('other.edit-folders', {
            url: '/folders/:id',
            templateUrl: 'app/other/folders.edit.html',
            data: {
              model: 'folders',
              action: ['edit']
            },
            controller: 'FoldersEditCtrl'
          })
          .state('other.rules', {
            url: '/rules',
            templateUrl: 'app/other/rules.list.html',
            data: {
              model: 'rules',
              action: ['list']
            },
            controller: 'RulesListCtrl'
          })
          .state('other.add-rules', {
            url: '/rules/add',
            templateUrl: 'app/other/rules.edit.html',
            data: {
              model: 'rules',
              action: ['add']
            },
            controller: 'RulesEditCtrl'
          })
          .state('other.edit-rules', {
            url: '/rules/:id',
            templateUrl: 'app/other/rules.edit.html',
            data: {
              model: 'rules',
              action: ['edit']
            },
            controller: 'RulesEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
