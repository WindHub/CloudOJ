define([
  'app'
], function(app) {
  'use strict';
  return app.config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when('/home', {
        templateUrl: "views/home/index.html",
        controller: "HomeController",
        resolve: {
          routes: function() { return [{i18n_title: 'HOME'}]; }
        }
      })
      .when('/help/', {
        redirectTo: "/help/index"
      })
      .when('/help/:id', {
        templateUrl: "views/help/index.html",
        controller: "HelpController",
        resolve: {
          routes: [
            function() {
              return [{i18n_title: 'HELP'}];
            }
          ],
          content: [
            "$sce", "$templateRequest", "$route",
            function($sce, $templateRequest, $route) {
              var templateUrl = $sce.getTrustedResourceUrl(
                '/views/help/zh_cn/' + ($route.current.params.id || 'index') + '.html'
              );
              return $templateRequest(templateUrl);
            }
          ]
        }
      })
      .when('/problem', {
        templateUrl: "views/problem/index.html",
        controller: "ProblemController",
        resolve: {
          routes: function(){ return [{i18n_title: 'PROBLEM'}]; }
        }
      })
      .when('/judge', {
        templateUrl: "views/judge/index.html",
        controller: 'JudgeController',
        resolve: {
          routes: function(){ return [{i18n_title: 'JUDGE'}]; }
        }
      })
      .when('/', {
        redirectTo: '/home'
      })
      .when('/error', {
        templateUrl: "views/error/index.html",
        controller: "ErrorController",
        resolve: {
          routes: function() { return [{i18n_title: 'ERROR'}]; },
          error: function() { return {code: 404}; }
        }
      })
      .when('/test/timeout', {
        templateUrl: "views/home/index.html",
        controller: "HomeController",
        resolve: {
          routes: function() { return [{i18n_title: 'HOME'}]; },
          delay: ["$q", "$timeout", function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/error'
      });
    }
  ]);
});
