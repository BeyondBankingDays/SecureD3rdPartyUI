var app = angular.module('securedApp3rdParty', ['ngRoute', 'app.homepageController', 'app.loginController'
  , 'app.confirmationController', 'app.headerController']);
angular.module('securedApp3rdParty.controllers', []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/homepage/homepage.html',
      controller: 'homepageController'
    })
    .when('/login', {
      templateUrl: 'pages/login/login.html',
      controller: 'loginController'
    })
    .when('/confirmation', {
      templateUrl: 'pages/confirmation/confirmation.html',
      controller: 'confirmationController'
    })
    .when('/success', {
      templateUrl: 'pages/success/success.html',
      controller: 'successController'
    });
});