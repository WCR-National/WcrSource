import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { distinctUntilChanged } from 'rxjs/operators';
var ProfilesService = /** @class */ (function () {
    function ProfilesService(user, apiService, http, jwtService) {
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
    var _a;
    ProfilesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [User,
            ApiService, typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object, JwtService])
    ], ProfilesService);
    return ProfilesService;
}());
export { ProfilesService };
//# sourceMappingURL=profile.service.js.map