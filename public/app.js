var app = angular.module('securedApp3rdParty', ['ngRoute', 'app.homepageController', 'app.loginController'
  , 'app.confirmationController', 'app.headerController']);
angular.module('securedApp3rdParty.controllers', []);

app.config(function ($routeProvider) {
  let routeList = ['confirmation', 'login', 'success'];
  $routeProvider.when('/', {
      templateUrl: 'pages/homepage/homepage.html', controller: 'homepageController'
    });
  angular.forEach(routeList, function (route) {
    $routeProvider.when('/' + route, {
        templateUrl: 'pages/' + route + '/' + route + '.html', controller: route + 'Controller'
      });
  });
});
