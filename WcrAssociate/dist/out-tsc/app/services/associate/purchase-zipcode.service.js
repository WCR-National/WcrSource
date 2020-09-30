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
    PurchaseZipCodeService.prototype.BindCityWiseState = function (city) {
        debugger;
        var urlToCountryWiseState = "Associate/ws/CategoryPurchase.asmx/CityWiseStates";
        return this.apiService.post(urlToCountryWiseState, { CityID: city })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.BindState = function () {
        var urlToCountryWiseState = "Associate/ws/State.asmx/CountryWiseState";
        return this.apiService.post(urlToCountryWiseState, { Status: '1', CountryID: 'US' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.BindZipCodesByUserZipCode = function (zipCode) {
        var urlToCountryWiseState = "Associate/ws/Category.asmx/AvailableZipCodesForServices";
        return this.apiService.post(urlToCountryWiseState, { jobtype: '2', zip: zipCode })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.BindCategoryZipCode = function (zipCode) {
        var urlToCountryWiseState = "Associate/ws/Category.asmx/AvailableZipCodesForServices";
        return this.apiService.post(urlToCountryWiseState, { jobtype: '2', zip: zipCode })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.BindSubCategoryZipCode = function (zipCode, categoryId) {
        var urlToCountryWiseState = "Associate/ws/Category.asmx/AvailableSubCategoryzipCode";
        return this.apiService.post(urlToCountryWiseState, { jobtype: '2', zip: zipCode, categoryID: categoryId })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.GetSubCategoryPrice = function (zipCode, subCategoryID) {
        debugger;
        var urlToCountryWiseState = "Associate/ws/CategoryPurchase.asmx/GetSubCategoryPrice";
        return this.apiService.post(urlToCountryWiseState, { zipCode: zipCode, subCategoryID: subCategoryID })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.ApplyCoponCode = function (cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode) {
        if (categoryId == 2) {
            subCategoryId = 5;
        }
        else if (categoryId == 5) {
            subCategoryId = 13;
        }
        else if (categoryId == 3) {
            subCategoryId = 8;
        }
        else {
        }
        var urlToInsertCategory = "Associate/ws/CategoryPurchase.asmx/InsertCategory";
        return this.apiService.post(urlToInsertCategory, { categoryID: categoryId, SubcategoryID: subCategoryId, PlanID: '1', pricevalues: priceValues, zipcodeID: zipCode, Couponcode: cCode, Discount: disc, Duration: duration })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.MakeTransaction = function (monthVal, totalAmount) {
        var urlToInsertAmount = "Associate/ws/CategoryPurchase.asmx/InsertAmount";
        return this.apiService.post(urlToInsertAmount, { amount: monthVal * totalAmount })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.MurchantPurchaseCategories = function () {
        var urlToMurchantPurchaseCategory = "Associate/ws/MyCategories.asmx/MuPurchaseCategories";
        return this.apiService.post(urlToMurchantPurchaseCategory, { JobType: '2' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.ApplyCoponCodeNew = function (monthValue, totalAmount, categoryText, zipCode) {
        var urlToInsertAmount = "Associate/ws/CategoryPurchase.asmx/InsertAmount";
        var desc = "Zip code " + zipCode + " has been purchased for  " + categoryText;
        return this.apiService.post(urlToInsertAmount, { amount: monthValue * totalAmount, Description: desc })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.InsertCategory = function (cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode) {
        debugger;
        if (categoryId == 2) {
            subCategoryId = 5;
        }
        else if (categoryId == 5) {
            subCategoryId = 13;
        }
        else if (categoryId == 3) {
            subCategoryId = 8;
        }
        else {
        }
        var urlToInsertCategory = "Associate/ws/CategoryPurchase.asmx/InsertCategory";
        return this.apiService.post(urlToInsertCategory, {
            categoryID: categoryId, SubcategoryID: subCategoryId, PlanID: '1', pricevalues: priceValues, zipcodeID: zipCode, Couponcode: cCode, Discount: disc, Duration: duration
        }).toPromise();
        //.pipe(map(
        //    data => {
        //        return data;
        //    }
        //));
    };
    PurchaseZipCodeService.prototype.PermananetlyRemoveCategory = function (id) {
        debugger;
        var urlToInsertCategory = "Associate/ws/MyCategories.asmx/DeletePurchasedCategories";
        return this.apiService.post(urlToInsertCategory, { id: id })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.GetPurchasedAllRecords = function () {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/CategoryPurchase.asmx/SelectAllPurchasedCartDataServices";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.SelectCurrentPurchasedZipCodes = function () {
        var urlToMurchantPurchaseCategory = "Associate/ws/MyCategories.asmx/SelectCurrentPurchasedZipCodes";
        return this.apiService.post(urlToMurchantPurchaseCategory, { JobType: '1' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.ZipCodePurchase = function () {
        var urlToInsertCategory = "Associate/ws/Sale.asmx/CountPurchasedZipcode";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    PurchaseZipCodeService.prototype.ZipCodePurchaseCode = function () {
        var urlToInsertCategory = "Associate/ws/CategoryPurchase.asmx/AssociateCardExists";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(function (data) {
            return data;
        }));
    }; //Check Card Exist or not
    PurchaseZipCodeService.prototype.IsZipCodeExist = function (zipCode) {
        var urlToInsertCategory = "Associate/ws/CategoryPurchase.asmx/ZipCodeExists";
        return this.apiService.post(urlToInsertCategory, { Zipcode: zipCode })
            .pipe(map(function (data) {
            return data;
        }));
    };
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