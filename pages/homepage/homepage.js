app.controller('homepageController',['$scope','$timeout','$location', function($scope, $timeout, $location){

    $scope.initial = true;
    $scope.redirectToAuthentication = function(){
        $scope.initial = false;

        $timeout( function(){
            $location.path('/login');
        }, 2000 );

    };

}]);