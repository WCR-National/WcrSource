import * as tslib_1 from "tslib";
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
    ClientDetailsService.prototype.verifyNavSidebarAccessible = function () {
        var urlToCountInterestedCustomers = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountInterestedCustomers, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer
    ClientDetailsService.prototype.getUserDetails = function () {
        var urlToCountAssociateCategories = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountAssociateCategories, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //select categories
    ClientDetailsService.prototype.updateProfileinfo = function (FirstName, LastName, PhoneNumber, email, Password, LicenseNumber, IssuingState, profileImage) {
        var urlToCountAssociateCategories = "ws/AssociateRegistration.asmx/UpdateAssociate";
        return this.apiService.post(urlToCountAssociateCategories, { 'FullName': FirstName, 'LastName': LastName, 'Password': Password, 'EmailID': email, 'MobileNo': PhoneNumber, 'LicenceID': LicenseNumber, 'LicenceState': IssuingState, 'ZipCode': '0' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ClientDetailsService.prototype.uploadimage = function (image) {
        //
        var urlToUploadImage = "ws/UpdatePic.ashx";
        return this.apiService.post(urlToUploadImage, { data: image })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ClientDetailsService.prototype.getServicesCount = function () {
        var urlToCountAssociateCategories = "ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype: 2 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer services
    ClientDetailsService.prototype.getSalesCount = function () {
        var urlToSalesCount = "ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToSalesCount, { jobtype: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer sales
    ClientDetailsService.prototype.getTotalSalesAndServicesCount = function () {
        var urlToSalesCount = "ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToSalesCount, { jobtype: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer
    ClientDetailsService.prototype.getClientDetailsSalesData = function () {
        var urlToClientDetailsSalesData = "ws/Sale.asmx/GetVisitorsInfo";
        return this.apiService.post(urlToClientDetailsSalesData, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer Sales data
    ClientDetailsService.prototype.getClientDetailsServicesData = function () {
        var urlToClientDetailsServicesData = "ws/Sale.asmx/GetVisitorsInfoServices";
        return this.apiService.post(urlToClientDetailsServicesData, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //interested consumer Servces data
    ClientDetailsService.prototype.deleteCustomerRecords = function (id) {
        var urlToClientDetailsServicesData = "/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToClientDetailsServicesData, { ID: id })
            .pipe(map(function (data) {
            return data;
        }));
    }; //delete data
    ClientDetailsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService,
            Router])
    ], ClientDetailsService);
    return ClientDetailsService;
}());
export { ClientDetailsService };
//# sourceMappingURL=client-details.service.js.map