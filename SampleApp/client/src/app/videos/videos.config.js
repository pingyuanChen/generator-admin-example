define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('videos', {
            abstract: true,
            url: '/videos',
            template: '<ui-view/>'
          })
          .state('videos.movie', {
            url: '/movie',
            templateUrl: 'app/videos/movie.list.html',
            data: {
              model: 'movie',
              action: ['list']
            },
            controller: 'MovieListCtrl'
          })
          .state('videos.add-movie', {
            url: '/movie/add',
            templateUrl: 'app/videos/movie.edit.html',
            data: {
              model: 'movie',
              action: ['add']
            },
            controller: 'MovieEditCtrl'
          })
          .state('videos.edit-movie', {
            url: '/movie/:id',
            templateUrl: 'app/videos/movie.edit.html',
            data: {
              model: 'movie',
              action: ['edit']
            },
            controller: 'MovieEditCtrl'
          })
          .state('videos.tv-play', {
            url: '/tv-play',
            templateUrl: 'app/videos/tvPlay.list.html',
            data: {
              model: 'tv-play',
              action: ['list']
            },
            controller: 'TvPlayListCtrl'
          })
          .state('videos.add-tv-play', {
            url: '/tv-play/add',
            templateUrl: 'app/videos/tvPlay.edit.html',
            data: {
              model: 'tv-play',
              action: ['add']
            },
            controller: 'TvPlayEditCtrl'
          })
          .state('videos.edit-tv-play', {
            url: '/tv-play/:id',
            templateUrl: 'app/videos/tvPlay.edit.html',
            data: {
              model: 'tv-play',
              action: ['edit']
            },
            controller: 'TvPlayEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
