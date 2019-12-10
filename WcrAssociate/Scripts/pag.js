/// <reference path="angular.js" />



var myapp = angular.module('sampleapp', []);

myapp.controller('samplecontoller', function ($scope , $http) {


    $scope.showData = function () {

        $scope.curPage = 0;
        $scope.pageSize = 3;
       

      
            var successCallback = function (response) {
                $scope.datalists = response.data;
           
            };
            var errorCallback = function (response) {
                $scope.error = response.data;
            }
            $http({
                method: "GET",
                url: "ws/WebDocs.asmx/ViewRecords"
            }).then(successCallback, errorCallback);

        


        $scope.numberOfPages = function () {
            return Math.ceil($scope.datalists.length / $scope.pageSize);
        };

    }

});

angular.module('sampleapp').filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});