import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
        this.url = 'http://localhost:44371';
    }
    HomeService.prototype.getAllCategories = function () {
        return this.http.get('http://localhost:44371/Services/WebService.asmx/GetCategoryData');
    };
    HomeService.prototype.getAllCityStateZipCodeData = function () {
        return this.http.get('http://localhost:44371/Services/WebService.asmx/GetCityStateZipCodeData');
    };
    HomeService.prototype.getAllPurchase = function () {
        return this.http.get('http://localhost:44371/Services/WebService.asmx/GetListEntries');
    };
    HomeService.prototype.createPurchase = function (inObject) {
        debugger;
        var httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
        var body = new HttpParams().set('inObject', JSON.stringify({ inObject: inObject }));
        return this.http.post('http://localhost:44371/Services/WebService.asmx/AddListObjectEntry', body, httpOptions);
    };
    HomeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HomeService);
    return HomeService;
}());
export { HomeService };
//var inaddobject = {};
//inaddobject.index = -1;
//inaddobject.Category = "New Category";
//inaddobject.ZipCode = 92626;
//inaddobject.City = "Irvine";
//inaddobject.State = "CA";
//inaddobject.ChargeAmount = 27.00;
//$.ajax({
//    type: 'POST',
//    url: 'Services/WebService.asmx/AddListObjectEntry',
//    data: "{inObject:" + JSON.stringify(inaddobject) + "}",
//    dataType: 'json',
//    contentType: 'application/json; charset=utf-8',
//    success:
//        function (response) {
//            alert(response.d + "Success");
//        },
//    error: function (error) {
//        alert("error");
//    }
//});
//# sourceMappingURL=home.service.js.map