import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { map, distinctUntilChanged } from 'rxjs/operators';
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
    ProfilesService.prototype.UpdateConsumer = function (consumerData) {
        var urlToConsumerData = "ws/ConsumerRegistration.asmx/UpdateConsumer";
        return this.apiService.post(urlToConsumerData, { 'FirstName': consumerData.FirstName, 'Address': consumerData.Address, 'MobileNo': consumerData.MobileNo, 'userName': consumerData.userName, 'password': consumerData.password, 'emailID': consumerData.email, 'ZipCode': consumerData.ZipCode, 'lastName': consumerData.lastName, 'Unit_Apt': consumerData.unitApt, 'city': consumerData.city, 'stateID': consumerData.stateID.value })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ProfilesService.prototype.getProfileInfo = function () {
        //url: "..,
        var urlToGetProfileInfo = "ws/ConsumerRegistration.asmx/SelectConsumerDetail";
        return this.apiService.post(urlToGetProfileInfo, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ProfilesService.prototype.getBookmarkServicesList = function () {
        var urlToGetSavedServices = "ws/InnerPage.asmx/ConsumerSavedBookAdvertisementsForServices";
        return this.apiService.post(urlToGetSavedServices, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ProfilesService.prototype.getBookmarkSalesList = function () {
        var urlToGetSavedAdvertisement = "ws/InnerPage.asmx/ViewConsumerSavedAdvertisements";
        return this.apiService.post(urlToGetSavedAdvertisement, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ProfilesService.prototype.deleteBookmark = function (bookmarkId) {
        debugger;
        var urlToDeleteSavedAdvertisement = "ws/InnerPage.asmx/DeleteSavedAdts";
        return this.apiService.post(urlToDeleteSavedAdvertisement, { 'ID': bookmarkId })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ProfilesService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService])
    ], ProfilesService);
    return ProfilesService;
}());
export { ProfilesService };
//# sourceMappingURL=profile.service.js.map