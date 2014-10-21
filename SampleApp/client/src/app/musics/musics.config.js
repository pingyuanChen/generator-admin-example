define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('musics', {
            abstract: true,
            url: '/musics',
            template: '<ui-view/>'
          })
          .state('musics.music', {
            url: '/music',
            templateUrl: 'app/musics/music.list.html',
            data: {
              model: 'music',
              action: ['list']
            },
            controller: 'MusicListCtrl'
          })
          .state('musics.add-music', {
            url: '/music/add',
            templateUrl: 'app/musics/music.edit.html',
            data: {
              model: 'music',
              action: ['add']
            },
            controller: 'MusicEditCtrl'
          })
          .state('musics.edit-music', {
            url: '/music/:id',
            templateUrl: 'app/musics/music.edit.html',
            data: {
              model: 'music',
              action: ['edit']
            },
            controller: 'MusicEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
