
/// <reference path="angular.js" />


var myApp = angular.module("mymod", []);
myApp.service('filteredListService', function () {

    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,

        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });
    };

    this.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };

});
var TableCtrl = myApp.controller("mycontroller", function ($scope, $http, $filter, filteredListService) {
                 viewRecord();
                 $scope.save = function () {
                     var nn = $scope.Document;
                     $http
                     ({
                         method: "POST",
                         url: "ws/WebDocs.asmx/InsertDocument",
                         data: JSON.stringify({ Name: nn }),
                         headers: {
                             "Content-Type": "application/json"
                         }
                     }).then(function (response) {
                         viewRecord();
                         $scope.Document = "";
                     }, function (error) {
                         alert(error);
                     });
                 }
                 function viewRecord() {
                     var successCallback = function (response) {
                         $scope.details = response.data;
                         $scope.pageSize = 4;
                         $scope.reverse = false;
                         //$scope.rowlimit = 3;
                         $scope.sortColumn = "Name";
                         $scope.reverseSort = false;
                         $scope.sortData = function (column) {
                             $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                             $scope.sortColumn = column;
                         }
                         $scope.getSortClass = function (column) {
                             if ($scope.sortColumn == column) {
                                 //return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
                                 return $scope.reverseSort
                             }
                             return '';

                         }


                     };
                     var errorCallback = function (response) {
                         $scope.error = response.data;
                     }
                     $http({
                         method: "GET",
                         url: "ws/WebDocs.asmx/ViewRecords"
                     }).then(successCallback, errorCallback);


                 }
                 $scope.edit = function (d) {
                     $scope.txtrowID = d.ID;
                     $scope.txtDocumentEdit = d.Name;
                     $scope.isDisabled = true;
                 }
                 $scope.remove = function (d) {
                     if (confirm("Are you sure?")) {
                         $http
                         ({
                             method: "POST",
                             url: "ws/WebDocs.asmx/DeleteDocument",
                             data: JSON.stringify({ ID: d.ID }),
                             headers: {
                                 "Content-Type": "application/json"
                             }
                         }).then(function (response) {
                             viewRecord();
                             $scope.txtDocumentEdit = "";
                         }, function (error) {
                             alert(error);
                         });

                     }
                     else { }
                 }
                 $scope.update = function () {
                     Perform_CRUD();
                     $scope.isDisabled = false;

                     ClearInput();
                 };
                 function Perform_CRUD() {

                     var nn = $scope.txtDocumentEdit;
                     var id = $scope.txtrowID;
                     $http
                     ({
                         method: "POST",
                         url: "ws/WebDocs.asmx/UpdateDocument",
                         data: JSON.stringify({ Name: nn, ID: id }),
                         headers: {
                             "Content-Type": "application/json"
                         }
                     }).then(function (response) {
                         viewRecord();
                         $scope.txtDocumentEdit = "";
                     }, function (error) {
                         alert(error);
                     });

                     //var request = {
                     //    method: 'post',
                     //    url: "ws/WebDocs.asmx/InsertDocument",
                     //    data: {
                     //        BookID: id,
                     //        BookName: $scope.bookname,
                     //        Category: $scope.category,
                     //        Price: $scope.price,
                     //        Operation: ops
                     //    },
                     //    dataType: 'json',
                     //    contentType: "application/json"
                     //};

                 }
                 function ClearInput() {
                     $scope.id = '';
                     $scope.txtDocumentEdit = '';

                 }

                 this.searched = function (valLists, toSearch) {
                                      return _.filter(valLists,

                                      function (i) {
                                          /* Search Text in all 3 fields */
                                          return searchUtil(i, toSearch);
                                      });
                                  };

               this.paged = function (valLists, pageSize) {
                                      retVal = [];
                                      for (var i = 0; i < valLists.length; i++) {
                                          if (i % pageSize === 0) {
                                              retVal[Math.floor(i / pageSize)] = [valLists[i]];
                                          } else {
                                              retVal[Math.floor(i / pageSize)].push(valLists[i]);
                                          }
                                      }
                                      return retVal;
                                  };

               $scope.search = function () {
                   $scope.filteredList = filteredListService.searched($scope.details, $scope.searchText);

                   if ($scope.searchText == '') {
                       $scope.filteredList = $scope.details;
                   }
                   $scope.pagination();
               }


               $scope.pagination = function () {
                   $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
               };

               $scope.setPage = function () {
                   $scope.currentPage = this.n;
               };

               $scope.firstPage = function () {
                   $scope.currentPage = 0;
               };

               $scope.lastPage = function () {
                   $scope.currentPage = $scope.ItemsByPage.length - 1;
               };

               $scope.range = function (input, total) {
                   var ret = [];
                   if (!total) {
                       total = input;
                       input = 0;
                   }
                   for (var i = input; i < total; i++) {
                       if (i != 0 && i != total - 1) {
                           ret.push(i);
                       }
                   }
                   return ret;
               };

               //$scope.sort = function (sortBy) {
                  

               //    $scope.columnToOrder = sortBy;

                   
               //    $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

               //    if ($scope.reverse) iconName = 'glyphicon glyphicon-chevron-up';
               //    else iconName = 'glyphicon glyphicon-chevron-down';

               //    if (sortBy === 'Name') {
               //        $scope.Header[0] = iconName;
               //    } else {
               //        $scope.Header[2] = iconName;
               //    }

               //    $scope.reverse = !$scope.reverse;

               //    $scope.pagination();
               //};

                
              // $scope.sort('Name');

             });
