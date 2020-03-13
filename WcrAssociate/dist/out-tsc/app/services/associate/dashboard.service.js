import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged, delay } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var DashboardService = /** @class */ (function () {
    function DashboardService(user, apiService, http, jwtService, router) {
        if (user === void 0) { user = null; }
        if (apiService === void 0) { apiService = null; }
        if (http === void 0) { http = null; }
        if (jwtService === void 0) { jwtService = null; }
        this.user = user;
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.router = router;
        this.currentUserSubject = new BehaviorSubject({});
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
        this.isAuthenticatedSubject = new ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
        this.isAuthenticated_extra = false;
    }
    //
    DashboardService.prototype.initializeHeader = function () {
        var urlToCountHeader = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountHeader, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    DashboardService.prototype.attemptToCountInterestedCustomers = function () {
        var urlToCountInterestedCustomers = "Associate/ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToCountInterestedCustomers, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer
    DashboardService.prototype.attemptToCountAssociateCategories = function () {
        var urlToCountAssociateCategories = "Associate/ws/Sale.asmx/CountAssociateCategories";
        return this.apiService.post(urlToCountAssociateCategories, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    DashboardService.prototype.attemptToCountPurchasedCategories = function () {
        var urlToCountAssociateCategories = "Associate/ws/MyCategories.asmx/CountPurchasedCategories";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //purchase property listings
    DashboardService.prototype.attemptToCountPurchaseZipCode = function () {
        var urlToCountPurchaseZipCode = "Associate/ws/MyCategories.asmx/CountPurchasedZipCode";
        return this.apiService.post(urlToCountPurchaseZipCode, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //zip codes
    DashboardService.prototype.attemptToCountAllPurchasedCategories = function () {
        var urlToCountAllPurchasedCategories = "Associate/ws/MyCategories.asmx/CountAllPurchasedCategories";
        return this.apiService.post(urlToCountAllPurchasedCategories, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //all purchased categories
    DashboardService.prototype.attemptToZipcodeData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToCountAllPurchasedCategories;
            return tslib_1.__generator(this, function (_a) {
                urlToCountAllPurchasedCategories = "Associate/ws/MyCategories.asmx/MuPurchaseCategories";
                return [2 /*return*/, this.apiService.post(urlToCountAllPurchasedCategories, { 'JobType': '2' }).toPromise()];
            });
        });
    }; //zip code data
    DashboardService.prototype.attemptToCategoriesData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToCountAllPurchasedCategories;
            return tslib_1.__generator(this, function (_a) {
                urlToCountAllPurchasedCategories = "Associate/ws/MyCategories.asmx/AllPurchasedCategories";
                return [2 /*return*/, this.apiService.post(urlToCountAllPurchasedCategories, {}).toPromise()];
            });
        });
    }; //categories data
    DashboardService.prototype.attemptToInterestedCustomerData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToGetVisitorsInfo;
            return tslib_1.__generator(this, function (_a) {
                urlToGetVisitorsInfo = "Associate/ws/Sale.asmx/GetVisitorsInfo";
                return [2 /*return*/, this.apiService.post(urlToGetVisitorsInfo, {}).toPromise()];
            });
        });
    }; //interested consumer
    DashboardService.prototype.attemptToInterestedCustomerServicesData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToGetVisitorsInfoServices;
            return tslib_1.__generator(this, function (_a) {
                urlToGetVisitorsInfoServices = "Associate/ws/Sale.asmx/GetVisitorsInfoServices";
                return [2 /*return*/, this.apiService.post(urlToGetVisitorsInfoServices, {}).toPromise()];
            });
        });
    }; //interested consumer
    DashboardService.prototype.attemptToMyPropertyListingsData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToCountAllPurchasedCategories;
            return tslib_1.__generator(this, function (_a) {
                urlToCountAllPurchasedCategories = "Associate/ws/Sale.asmx/SelectAdvertisement";
                return [2 /*return*/, this.apiService.post(urlToCountAllPurchasedCategories, { Jobtype: 1 }).toPromise()];
            });
        });
    }; //my property listings
    DashboardService.prototype.attemptToAllAdvertisement = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToCountAllPurchasedCategories;
            return tslib_1.__generator(this, function (_a) {
                urlToCountAllPurchasedCategories = "Associate/ws/Sale.asmx/SelectAllAdvertisement";
                return [2 /*return*/, this.apiService.post(urlToCountAllPurchasedCategories, {}).toPromise()];
            });
        });
    }; //All advertisement listings
    DashboardService.prototype.attempConsumerAccountExists = function (type, credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignUp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToSignUp = "Associate/ws/AssociateRegistration.asmx/ConsumerAccountExists";
                        return [4 /*yield*/, this.apiService.post(urlToSignUp, { EmailID: credentials.email }).toPromise()];
                    case 1: // + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //
    DashboardService.prototype.deleteCustomerRecords = function (id) {
        debugger;
        var urlToDeleteCustomerRecords = "Associate/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToDeleteCustomerRecords, { ID: id })
            .pipe(map(function (data) {
            return data;
        }));
    }; //all purchased categories
    DashboardService.prototype.validateEmail = function (email) {
        return this.apiService.get('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email)
            .pipe(map(function (data) { return data; }));
    };
    DashboardService.prototype.emailAlreadyTaken = function (email) {
        return this.apiService.post('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email, {})
            .pipe(delay(300));
    };
    DashboardService.prototype.getCurrentUser = function () {
        return this.currentUserSubject.value;
    };
    // Update the user on the server (email, pass, etc)
    DashboardService.prototype.update = function (user) {
        var _this = this;
        return this.apiService
            .put('/user', { user: user })
            .pipe(map(function (data) {
            // Update the currentUser observable
            _this.currentUserSubject.next(data.user);
            return data.user;
        }));
    };
    DashboardService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService,
            Router])
    ], DashboardService);
    return DashboardService;
}());
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map