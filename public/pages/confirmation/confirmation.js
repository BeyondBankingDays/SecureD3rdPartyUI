angular.module('app.confirmationController',[])
    .controller('confirmationController',['$scope','$timeout','$location', '$http','$window', function($scope, $timeout, $location, $http, $window){
    
    $scope.error = false;
    $scope.processed = false;
    var token = $window.sessionStorage.getItem("token");
    var config = {
        headers : {'Content-Type': 'application/json',
        'Authorization' : 'DirectLogin token=\"' + token + '\"'
      }}

    $http.get('https://beyondbanking.openbankproject.com/obp/v3.0.0/users/current',config).then(
        function(success){
            var userId = success.data.user_id;
            $http.get('https://webapisecuredbb.azurewebsites.net/user/' + userId + '/documents').then(function(success){
                $scope.docs = success.data;
            }, function(error){
                $scope.error = true;
            })

        }, function(error){
            $scope.error = true;
        }
    );

    $scope.approve = function(){
        angular.forEach($scope.docs,function(doc){
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            doc.requestors =[
                
                ];
            
            var data = {};
            data.date = date;
            data.reqId = '2';
            data.reqName = 'ABN';
            doc.requestors.push(data);
            
            $http.put('https://webapisecuredbb.azurewebsites.net/documents/'+ doc.id, doc).then(function(success){
                console.log(success);
            }, function(error){
                console.log(error);
            });

        });
        
        $scope.processed = true;

        $timeout( function(){
            $location.path('/success');
        }, 2000 );
    }

}]);