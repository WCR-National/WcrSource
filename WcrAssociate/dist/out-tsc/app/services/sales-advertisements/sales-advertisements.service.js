import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var SalesAdvertisementsService = /** @class */ (function () {
    function SalesAdvertisementsService(user, apiService, http, jwtService, router) {
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
    SalesAdvertisementsService.prototype.AssociateSignup = function (email) {
        var urlToAssociateSignup = "ws/AssociateSignUp.ashx?action=RecordExists&EmailID=" + email;
        return this.apiService.post(urlToAssociateSignup, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.GetConsumerDetails = function () {
        var urlToConsumerDetail = "ws/ConsumerRegistration.asmx/SelectConsumerDetail";
        return this.apiService.post(urlToConsumerDetail, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.GetPropertySalesAdevertisementData = function (id) {
        var urlToViewAdvertisementDetails = "ws/InnerPage.asmx/ViewAdvertisementDetails";
        return this.apiService.post(urlToViewAdvertisementDetails, { 'adID': id })
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.GetCatOrSubCatServices = function (id) {
        var urlToSelectCatSubCategory = "Associate/ws/SubCategory.asmx/SelectCatSubCategory";
        return this.apiService.post(urlToSelectCatSubCategory, { 'flag': 1, 'Categoryid': id })
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.ViewHomeAdvertisementsWithParam = function (subCatId, zipcode) {
        var urlToViewHomeAdvertisementsWithParam = "ws/InnerPage.asmx/ViewHomeAdvertisementsWithParam";
        return this.apiService.post(urlToViewHomeAdvertisementsWithParam, { 'subCategoryID': subCatId, 'param': zipcode })
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.ConsumerIsLogin = function () {
        var urlToViewHomeAdvertisementsWithParam = "ws/ConsumerRegistration.asmx/ConsumerIsLogin";
        return this.apiService.post(urlToViewHomeAdvertisementsWithParam, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.SelectServicesListData = function (zipc, CategoryID) {
        debugger;
        var urlToViewHomeAdvertisementsWithParam = "ws/TopSearch.asmx/SelectServicesListData";
        return this.apiService.post(urlToViewHomeAdvertisementsWithParam, { zipcode: zipc, Category: CategoryID })
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    SalesAdvertisementsService.prototype.UpdateSavedBookmarksSales = function (advId, zipcode) {
        var urlToInsertSavedAdts = "ws/InnerPage.asmx/InsertSavedAdts";
        return this.apiService.post(urlToInsertSavedAdts, { 'AdvertisementID': advId, 'zipCode': zipcode, 'jtype': '1' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SalesAdvertisementsService.prototype.UpdateSavedBookmarksService = function (advId, zipcode) {
        debugger;
        var urlToInsertSavedAdts = "ws/InnerPage.asmx/InsertSavedAdts";
        return this.apiService.post(urlToInsertSavedAdts, { 'AdvertisementID': advId, 'zipCode': zipcode, 'jtype': '2' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SalesAdvertisementsService.prototype.CheckEmailAndPhNo = function () {
        var urlToCheckPhNoAndEmail = "ws/ConsumerRegistration.asmx/CheckConsumerMobANDEmailExists";
        return this.apiService.post(urlToCheckPhNoAndEmail, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    //Contact to Associate
    SalesAdvertisementsService.prototype.InsertConsumerInterest = function (adverID, associateID, jobtypeID, zipcode) {
        var urlToInsertConsumerInterest = "ws/ConsumerComments.asmx/InsertConsumerInterest";
        return this.apiService.post(urlToInsertConsumerInterest, {
            AdvertisementID: adverID, 'AssociateID': associateID, 'jobType': jobtypeID, 'zipcode': zipcode
        })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SalesAdvertisementsService.prototype.SendConsumerDetail = function (associateID, adverID, jobtypeID, zipcode) {
        var urlToInsertConsumerInterest = "ws/ConsumerComments.asmx/SendConsumerDetail";
        return this.apiService.post(urlToInsertConsumerInterest, { 'associateID': associateID, 'advertisementID': adverID, 'jobtype': jobtypeID, 'zipcode': zipcode })
            .pipe(map(function (data) {
            return data;
        }));
    };
    //End Contact to Associate
    SalesAdvertisementsService.prototype.UpdateProfileData = function (NameOfUser) {
        var urlToCheckPhNoAndEmail = "ws/ConsumerRegistration.asmx/UpdateCompulsoryData";
        return this.apiService.post(urlToCheckPhNoAndEmail, { Name: NameOfUser })
            .pipe(map(function (data) {
            return data;
        }));
    };
    SalesAdvertisementsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService,
            Router])
    ], SalesAdvertisementsService);
    return SalesAdvertisementsService;
}());
export { SalesAdvertisementsService };
//# sourceMappingURL=sales-advertisements.service.js.map