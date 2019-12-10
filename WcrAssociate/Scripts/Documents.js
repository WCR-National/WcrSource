/// <reference path="angular.js" />
/// <reference path="ngDialog.js" />


var mydoc = angular.module("mymod", [])
             .controller("mycontroller", function ($scope, $http) {
                 viewRecord();
                 function viewRecord() {
                     $scope.showData = function () {
                         $scope.curPage = 0;
                         $scope.pageSize = 2;
                         var successCallback = function (response) {
                             $scope.details = response.data;
                             //$scope.url = "inner_detail1.html?id=1";
                         };
                         var errorCallback = function (response) {
                             $scope.error = response.data;
                         }
                         $http({
                             method: "GET",
                             url: "ws/InnerPage.asmx/ViewRecords"
                         }).then(successCallback, errorCallback);

                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.details.length / $scope.pageSize);
                         };
                     }
                 }
                 function RedirectToUrl() {
                 $http.get('inner_detail1.html?val1=' + $routeParams.val1 + '&val2=' + $routeParams.val2 + '&val3=' + $routeParams.val3, { cache: true })
                        .then(function (res) {
           
                        });
                 }
             });
angular.module('mymod').filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});