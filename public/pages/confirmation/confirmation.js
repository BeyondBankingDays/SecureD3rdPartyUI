angular.module('app.confirmationController',[])
    .controller('confirmationController',['$scope','$timeout','$location', function($scope, $timeout, $location){

    $scope.processed = false;

    $scope.approve = function(){
        $scope.processed = true;

        $timeout( function(){
            $location.path('/success');
        }, 2000 );

    }

}]);