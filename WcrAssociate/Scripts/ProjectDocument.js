/// <reference path="angular.min.js" />
/// <reference path="ng-file-upload-shim.min.js" />
/// <reference path="ng-file-upload.min.js" />


var projDoc = angular.module("mymodule", ['ngFileUpload'])
                     .controller("mycontroller", ['$scope', 'Upload', '$timeout', '$http', function ($scope, Upload, $timeout, $http) {
                        
                         viewProjects();
                         viewDocs();
                         $scope.save = function () {
                             $http
                                 ({
                                     method: 'POST',
                                     url: 'ws/WebProject.asmx/InsertProject',
                                     data: JSON.stringify({ Name: nn }),
                                     headers: {
                                         "Content-Type": "application/json"
                                     }

                                 }).then(function (response) {
                                     $scope.Project = "";
                                     viewData();
                                 }, function (error) {
                                     alert(error);
                                 });
                         }

                         function viewProjects() {
                             var successCallback = function (response) {
                                 $scope.projects = response.data;
                               
                             }
                             var errorCallback = function (response) {
                                 $scope.error = response.data;
                             }

                             $http
                             ({
                                 method: 'GET',
                                 url: 'ws/WebProject.asmx/ViewRecords'

                             }).then(successCallback, errorCallback);
                         }
                         function viewDocs() {
                             var successCallback = function (response) {
                                 $scope.details = response.data;
                             };
                             var errorCallback = function (response) {
                                 $scope.error = response.data;
                             }
                             $http({
                                 method: "GET",
                                 url: "ws/WebDocs.asmx/ViewRecords"
                             }).then(successCallback, errorCallback);


                         }

                         $scope.uploadPic = function (file) {
                             file.upload = Upload.upload({
                                 url: 'UploadHandler.ashx',
                                 data: { file: file }
                             });
                             file.upload.then(function (response) {
                                 $timeout(function () {
                                     file.result = response.data;
                                 });
                             }, function (response) {
                                 if (response.status > 0)
                                     $scope.errorMsg = response.status + ': ' + response.data;
                             }, function (evt) {
                                 // Math.min is to fix IE which reports 200% sometimes
                                 file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                             });
                         }
                     }]);

