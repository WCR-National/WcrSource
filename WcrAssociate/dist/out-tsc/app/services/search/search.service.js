import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from '../auth';
import { JwtService } from '../auth';
import { map, distinctUntilChanged } from 'rxjs/operators';
var SearchService = /** @class */ (function () {
    function SearchService(apiService, http, jwtService) {
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.currentUserSubject = new BehaviorSubject({});
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
        this.isAuthenticatedSubject = new ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
        //console.log((platformLocation as any).location);
        //console.log((platformLocation as any).location.origin);
    }
    //For sales
    SearchService.prototype.subCategoriesByZipcode = function (zipc) {
        var urlToSubCategories = "Associate/ws/subCategory.asmx/SubCategories";
        return this.apiService.post(urlToSubCategories, { Categoryid: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SearchService.prototype.viewAdvanceSearchByZipcode = function (zipc, subCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToAdvanceSearch, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToAdvanceSearch = "ws/TopSearch.asmx/ViewAdvanceSearch1";
                        return [4 /*yield*/, this.apiService.post(urlToAdvanceSearch, { 'zipcode': zipc, 'SubCategory': subCategoryId }).pipe(map(function (data) {
                                return data;
                            })).toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //For services
    SearchService.prototype.getJobtypeWiseCategoryByZipcode = function () {
        var urlToJobTypeWiseCategory = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToJobTypeWiseCategory, { flag: 1, jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SearchService.prototype.getViewAdvanceSearchForServices = function (categoryId, zipc) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToJobTypeWiseCategory;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToJobTypeWiseCategory = "ws/TopSearch.asmx/ViewAdvanceSearchForServices";
                        return [4 /*yield*/, this.apiService.post(urlToJobTypeWiseCategory, { zipcode: zipc, Category: categoryId }).toPromise()];
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
    SearchService.prototype.getSalesCategoryCityWise = function (state, city) {
        var urlToSubCategories = "Associate/ws/subCategory.asmx/SubCategories";
        return this.apiService.post(urlToSubCategories, { Categoryid: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SearchService.prototype.getAdvanceSearchCityStateWise = function (state, city, subCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToAdvanceSearch;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToAdvanceSearch = "ws/TopSearch.asmx/ViewAdvanceSearchCityStateWise";
                        return [4 /*yield*/, this.apiService.post(urlToAdvanceSearch, { State: state, City: city, SubCategory: subCategoryId }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //For services
    SearchService.prototype.getServicesCategoryCityWise = function (state, city) {
        var urlToServiceCategory = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToServiceCategory, { flag: 1, jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SearchService.prototype.getAdvanceSearchServicesCityStateWise = function (state, city, subCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToAdvanceSearch;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToAdvanceSearch = "ws/TopSearch.asmx/ViewAdvanceSearchServicesCityStateWise";
                        return [4 /*yield*/, this.apiService.post(urlToAdvanceSearch, { State: state, City: city, Category: subCategoryId }).toPromise()];
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
    //async attemptGetSalesAdts() {
    //    let urlToGetIP: string = "http://jsonip.com?=callback";
    //    return await this.apiService.get<any>(urlToGetIP)
    //        .pipe(map(
    //            data => {
    //                debugger;
    //                let _ipAddress = data.ip;
    //                this.attemptGetZipCodeByIPAddress(_ipAddress);
    //            }
    //        )).toPromise();
    //}
    SearchService.prototype.attemptGetZipCodeByIPAddress = function (_ipAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToGetZipCodeByIpAddress;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToGetZipCodeByIpAddress = "ws/TopSearch.asmx/GetZipCodeIpAddress";
                        return [4 /*yield*/, this.apiService.post(urlToGetZipCodeByIpAddress, { _IpAddress: _ipAddress }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SearchService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            HttpClient,
            JwtService])
    ], SearchService);
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=search.service.js.map