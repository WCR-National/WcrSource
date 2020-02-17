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
    DashboardService.prototype.attemptAssociateAccountExists = function (type, credentials) {
        var urlToSignUp = "ws/AssociateRegistration.asmx/AssociateAccountExists"; // + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return this.apiService.post(urlToSignUp, { EmailID: credentials.email })
            .pipe(map(function (data) {
            debugger;
            //if (data.d.length > 0) {
            //    this.user.email = credentials.email;
            //    this.user.password = credentials.password;
            //    this.user.token = this.token();
            //    this.setAuth(this.user);
            //}
            return data;
        }));
        //let urlToSignUp: string = "ws/AssociateSignUp.ashx?action=AssociateLog&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        //return this.apiService.post( urlToSignUp, {})
        //    .pipe(map(
        //        data => {
        //            debugger;
        //            if (data > '0') {
        //                this.user.email = credentials.email;
        //                this.user.password = credentials.password;
        //                this.user.token = this.token();
        //                this.setAuth(this.user);
        //            }
        //            return data;
        //        }
        //    ));
    };
    DashboardService.prototype.attempConsumerAccountExists = function (type, credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignUp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToSignUp = "ws/AssociateRegistration.asmx/ConsumerAccountExists";
                        return [4 /*yield*/, this.apiService.post(urlToSignUp, { EmailID: credentials.email }).toPromise()];
                    case 1: // + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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