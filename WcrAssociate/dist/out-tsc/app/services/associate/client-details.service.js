import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var ClientDetailsService = /** @class */ (function () {
    function ClientDetailsService(user, apiService, http, jwtService, router) {
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
    ClientDetailsService.prototype.getServicesCount = function () {
        var urlToCountAssociateCategories = "Associate/ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer services
    ClientDetailsService.prototype.getSalesCount = function () {
        var urlToSalesCount = "Associate/ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToSalesCount, { jobtype: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer sales
    ClientDetailsService.prototype.getTotalSalesAndServicesCount = function () {
        var urlToSalesCount = "Associate/ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToSalesCount, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer
    ClientDetailsService.prototype.getClientDetailsSalesData = function () {
        var urlToClientDetailsSalesData = "Associate/ws/Sale.asmx/GetVisitorsInfo";
        return this.apiService.post(urlToClientDetailsSalesData, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer Sales data
    ClientDetailsService.prototype.getClientDetailsServicesData = function () {
        var urlToClientDetailsServicesData = "Associate/ws/Sale.asmx/GetVisitorsInfoServices";
        return this.apiService.post(urlToClientDetailsServicesData, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer Servces data
    ClientDetailsService.prototype.deleteCustomerRecords = function (id) {
        var urlToClientDetailsServicesData = "Associate/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToClientDetailsServicesData, { ID: id })
            .pipe(map(function (data) {
            return data;
        }));
    }; //delete data
    var _a, _b;
    ClientDetailsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [User,
            ApiService, typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object, JwtService, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object])
    ], ClientDetailsService);
    return ClientDetailsService;
}());
export { ClientDetailsService };
//# sourceMappingURL=client-details.service.js.map