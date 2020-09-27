import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var CustomerSupportService = /** @class */ (function () {
    function CustomerSupportService(user, apiService, http, jwtService, router) {
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
    CustomerSupportService.prototype.submitMessageCustomerSupport = function (message) {
        var urlToCountAssociateCategories = "Associate/ws/AssociateSupport.asmx/AssociateSupportQuery";
        return this.apiService.post(urlToCountAssociateCategories, { 'Messg': message })
            .pipe(map(function (data) {
            return data;
        }));
    };
    var _a, _b;
    CustomerSupportService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [User,
            ApiService, typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object, JwtService, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object])
    ], CustomerSupportService);
    return CustomerSupportService;
}());
export { CustomerSupportService };
//# sourceMappingURL=customer-support.service.js.map