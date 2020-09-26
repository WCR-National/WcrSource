import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var ProfileService = /** @class */ (function () {
    function ProfileService(user, apiService, http, jwtService, router) {
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
    ProfileService.prototype.verifyNavSidebarAccessible = function () {
        var urlToCountInterestedCustomers = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountInterestedCustomers, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer
    ProfileService.prototype.getUserDetails = function () {
        var urlToCountAssociateCategories = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountAssociateCategories, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    ProfileService.prototype.updateProfileinfo = function (FirstName, LastName, PhoneNumber, email, Password, LicenseNumber, IssuingState) {
        var urlToCountAssociateCategories = "ws/AssociateRegistration.asmx/UpdateAssociate";
        return this.apiService.post(urlToCountAssociateCategories, { 'FullName': FirstName, 'LastName': LastName, 'Password': Password, 'EmailID': email, 'MobileNo': PhoneNumber, 'LicenceID': LicenseNumber, 'LicenceState': IssuingState, 'ZipCode': '0' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ProfileService.prototype.uploadimage = function (image) {
        debugger;
        var urlToUploadImage = "Associate/ws/UpdatePic.ashx";
        this.http.post(urlToUploadImage, image);
        //return this.apiService.post(urlToUploadImage, { image })
        //    
    };
    var _a, _b;
    ProfileService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [User,
            ApiService, typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object, JwtService, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object])
    ], ProfileService);
    return ProfileService;
}());
export { ProfileService };
//# sourceMappingURL=Profile.service.js.map