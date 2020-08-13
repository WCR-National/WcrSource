import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var PurchaseZipCodeService = /** @class */ (function () {
    function PurchaseZipCodeService(user, apiService, http, jwtService, router) {
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
    PurchaseZipCodeService.prototype.getServicesCount = function () {
        var urlToCountAssociateCategories = "Associate/ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer services
    PurchaseZipCodeService.prototype.getSalesCount = function () {
        var urlToSalesCount = "Associate/ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToSalesCount, { jobtype: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer sales
    PurchaseZipCodeService.prototype.getTotalSalesAndServicesCount = function () {
        var urlToSalesCount = "Associate/ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToSalesCount, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer
    PurchaseZipCodeService.prototype.getClientDetailsSalesData = function () {
        var urlToClientDetailsSalesData = "Associate/ws/Sale.asmx/GetVisitorsInfo";
        return this.apiService.post(urlToClientDetailsSalesData, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer Sales data
    PurchaseZipCodeService.prototype.getClientDetailsServicesData = function () {
        var urlToClientDetailsServicesData = "Associate/ws/Sale.asmx/GetVisitorsInfoServices";
        return this.apiService.post(urlToClientDetailsServicesData, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer Servces data
    PurchaseZipCodeService.prototype.deleteCustomerRecords = function (id) {
        var urlToClientDetailsServicesData = "Associate/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToClientDetailsServicesData, { ID: id })
            .pipe(map(function (data) {
            return data;
        }));
    }; //delete data
    PurchaseZipCodeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService,
            Router])
    ], PurchaseZipCodeService);
    return PurchaseZipCodeService;
}());
export { PurchaseZipCodeService };
//# sourceMappingURL=purchase-zipcode.service.js.map