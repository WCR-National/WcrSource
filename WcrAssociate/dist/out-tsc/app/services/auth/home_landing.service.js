import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
var HomeLandingService = /** @class */ (function () {
    function HomeLandingService(apiService, http, jwtService) {
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.currentUserSubject = new BehaviorSubject({});
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
        this.isAuthenticatedSubject = new ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
    //For sales
    HomeLandingService.prototype.attemptGetSalesCategoryByZip = function (zipc) {
        var urlToSubCategories = "Associate/ws/subCategory.asmx/SubCategories";
        return this.apiService.post(urlToSubCategories, { Categoryid: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    HomeLandingService.prototype.attemptGetAdvanceSearchByZipc = function (zipc, subCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToAdvanceSearch;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToAdvanceSearch = "ws/TopSearch.asmx/ViewAdvanceSearch1";
                        return [4 /*yield*/, this.http.post(urlToAdvanceSearch, { zipcode: zipc, SubCategory: subCategoryId }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //For services
    HomeLandingService.prototype.attemptGetJobtypeWiseCategory = function () {
        var urlToJobTypeWiseCategory = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToJobTypeWiseCategory, { flag: 1, jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    HomeLandingService.prototype.attemptGetViewAdvanceSearchForServices = function (categoryId, zipc) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToJobTypeWiseCategory;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToJobTypeWiseCategory = "ws/TopSearch.asmx/ViewAdvanceSearchForServices";
                        return [4 /*yield*/, this.http.post(urlToJobTypeWiseCategory, { zipcode: zipc, Category: categoryId }).toPromise()];
                    case 1: 
                    //return this.apiService.post( urlToJobTypeWiseCategory, { zipcode: zipc, Category: subCategoryId })
                    //    .pipe(map(
                    //        data => {
                    //            return data;
                    //        }
                    //    ));
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //For sales
    HomeLandingService.prototype.attemptGetSalesCategoryCityWise = function (state, city) {
        var urlToSubCategories = "Associate/ws/subCategory.asmx/SubCategories";
        return this.apiService.post(urlToSubCategories, { Categoryid: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    HomeLandingService.prototype.attemptGetAdvanceSearchCityStateWise = function (state, city, subCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToAdvanceSearch;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToAdvanceSearch = "ws/TopSearch.asmx/ViewAdvanceSearchCityStateWise";
                        return [4 /*yield*/, this.http.post(urlToAdvanceSearch, { State: state, City: city, SubCategory: subCategoryId }).toPromise()];
                    case 1: 
                    //    data: "{'State':'" + State + "','City':'" + City + "','SubCategory':" + ($(docs).find("id").text()) + "}"
                    //return this.apiService.post( urlToAdvanceSearch, { State: state, City: city, SubCategory: subCategoryId })
                    //    .pipe(map(
                    //        data => {
                    //            return data;
                    //        }
                    //    ));
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //For services
    HomeLandingService.prototype.attemptGetServicesCategoryCityWise = function (state, city) {
        var urlToServiceCategory = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToServiceCategory, { flag: 1, jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    HomeLandingService.prototype.attemptGetAdvanceSearchServicesCityStateWise = function (state, city, subCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToAdvanceSearch;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToAdvanceSearch = "ws/TopSearch.asmx/ViewAdvanceSearchServicesCityStateWise";
                        return [4 /*yield*/, this.http.post(urlToAdvanceSearch, { State: state, City: city, Category: subCategoryId }).toPromise()];
                    case 1: 
                    //  {'State':'" + State + "','City':'" + City + "','Category':" + ($(docs).find("ID").text()) + "}
                    //return this.apiService.post( urlToAdvanceSearch, { State: state, City: city, Category: subCategoryId })
                    //    .pipe(map(
                    //        data => {
                    //            return data;
                    //        }
                    //    ));
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //For IPAddress
    HomeLandingService.prototype.attemptGetSalesAdts = function () {
        var _this = this;
        var urlToGetIP = "http://jsonip.com";
        //  {'State':'" + State + "','City':'" + City + "','Category':" + ($(docs).find("ID").text()) + "}
        return this.http.get(urlToGetIP)
            .pipe(map(function (data) {
            debugger;
            var _ipAddress = data.ip;
            var urlToGetZipCodeByIpAddress = "ws/TopSearch.asmx/GetZipCodeIpAddress";
            return _this.apiService.post(urlToGetZipCodeByIpAddress, { _IpAddress: _ipAddress })
                .pipe(map(function (data) {
                return data;
            }));
        }));
    };
    HomeLandingService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            HttpClient,
            JwtService])
    ], HomeLandingService);
    return HomeLandingService;
}());
export { HomeLandingService };
//# sourceMappingURL=home_landing.service.js.map