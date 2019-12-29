import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import { map, distinctUntilChanged } from 'rxjs/operators';
var UserService = /** @class */ (function () {
    function UserService(user, apiService, http, jwtService) {
        if (user === void 0) { user = null; }
        if (apiService === void 0) { apiService = null; }
        if (http === void 0) { http = null; }
        if (jwtService === void 0) { jwtService = null; }
        this.user = user;
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.currentUserSubject = new BehaviorSubject({});
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
        this.isAuthenticatedSubject = new ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
    //// Verify JWT in localstorage with server & load user's info.
    //// This runs once on application startup.
    UserService.prototype.populate = function () {
        var _this = this;
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('/')
                .subscribe(function (data) { return _this.setAuth(data.user); }, function (err) { return _this.purgeAuth(); });
        }
        else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    };
    UserService.prototype.setAuth = function (user) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    };
    UserService.prototype.purgeAuth = function () {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({});
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    };
    UserService.prototype.rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    UserService.prototype.token = function () {
        return this.rand() + this.rand(); // to make it longer
    };
    UserService.prototype.attemptAuth = function (type, credentials) {
        var _this = this;
        debugger;
        var urlToSignUp = "ws/AssociateSignUp.ashx?action=AssociateLog&EmailID=" + credentials.email + "&Password=" + credentials.password + "";
        return this.apiService.post(environment.apiEndPoint + urlToSignUp, {})
            .pipe(map(function (data) {
            if (data > '0') {
                _this.user.email = credentials.email;
                _this.user.password = credentials.password;
                _this.user.token = _this.token();
                _this.setAuth(_this.user);
            }
            return data;
        }));
    };
    UserService.prototype.attemptConsumerAuth = function (type, credentials) {
        var _this = this;
        debugger;
        //urlToSignIn "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + uname + "&Password=" + pass + ""
        var urlToSignIn = "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + credentials.email + "&Password=" + credentials.password + "";
        return this.apiService.post(environment.apiEndPoint + urlToSignIn, {})
            .pipe(map(function (data) {
            debugger;
            _this.user.email = credentials.email;
            _this.user.password = credentials.password;
            _this.user.token = _this.token();
            _this.setAuth(_this.user);
            return data;
        }));
    };
    UserService.prototype.attemptLogout = function () {
        var _this = this;
        var urlToLogout = "ws/AssociateSignUp.ashx?action=ConsumerLogout";
        return this.apiService.post(environment.apiEndPoint + urlToLogout, {})
            .pipe(map(function (data) {
            _this.purgeAuth();
            return data;
        }));
    };
    UserService.prototype.attemptRegister = function (type, credentials) {
        var urlToSignUp = "ws/AssociateSignUp.ashx?action=AssociateData";
        urlToSignUp += "FullName=" + "0" + "&LastName=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.password + "&Mobile=" + "0" + "&ZipCode=" + "0" + "&LicenseState=" + "0" + "&LicenseID=" + "0" + "&ReferralID=" + 0 + "";
        return this.apiService.post(environment.apiEndPoint + urlToSignUp, { user: credentials })
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptActivateCode = function (type, credentials) {
        var urlToGetActivationCode = "ws/AssociateRegistration.asmx/GetActivationCode";
        return this.apiService.post(environment.apiEndPoint + urlToGetActivationCode, { username: credentials.email })
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptVerfiedActivationCode = function (type, email) {
        var urlToGetActivationCode = "ws/AssociateRegistration.asmx/VerifiedAccount";
        return this.apiService.post(environment.apiEndPoint + urlToGetActivationCode, { username: email })
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptResendActivateCode = function (email) {
        var urlToResendActivationCode = "ws/AssociateRegistration.asmx/ResendActivationCode";
        return this.apiService.post(environment.apiEndPoint + urlToResendActivationCode, { EmailID: email })
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptResetPassword = function (email) {
        return this.http.get(environment.apiEndPoint + 'ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email).pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptResetAssociatePassword = function (email) {
        return this.http.get(environment.apiEndPoint + "ws/AssociateSignUp.ashx?action=ResetAssociatePassNew&EmailID=" + email + "").pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptResetConsumerPassword = function (email) {
        return this.http.get(environment.apiEndPoint + "ws/AssociateSignUp.ashx?action=ResetConsumerPassNew&EmailID=" + email + "").pipe(map(function (data) {
            return data;
        }));
    };
    //
    UserService.prototype.validateEmail = function (email) {
        return this.http.get(environment.apiEndPoint + 'ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email).pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUserSubject.value;
    };
    // Update the user on the server (email, pass, etc)
    UserService.prototype.update = function (user) {
        var _this = this;
        return this.apiService
            .put('/user', { user: user })
            .pipe(map(function (data) {
            // Update the currentUser observable
            _this.currentUserSubject.next(data.user);
            return data.user;
        }));
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map