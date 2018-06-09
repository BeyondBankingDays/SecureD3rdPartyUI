angular.module('app.loginController',[])
    .controller('loginController',['$scope','$timeout','$location', '$http','$window', function($scope, $timeout, $location, $http, $window){


    $scope.loginObj = {};
    
    $scope.login = function(){

        var config = {
            headers : {'Content-Type': 'application/json',
            'Authorization' : 'DirectLogin username=\"'+$scope.loginObj.username +'\",password=\"'+ $scope.loginObj.password +'\",consumer_key="ukj43wr0oc5ivqlvmbbawvyzkp0vo1vx3fcyal1n"'
          }}
        
          var data = {};

        $http.post('https://beyondbanking.openbankproject.com/my/logins/direct', data, config)
          .then(function(response){
            $window.sessionStorage.setItem("token", response.data.token);
            $location.path('/confirmation');
          });
    }

    }]);