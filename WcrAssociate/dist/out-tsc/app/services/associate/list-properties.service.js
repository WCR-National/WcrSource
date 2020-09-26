import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var ListPropertiesService = /** @class */ (function () {
    function ListPropertiesService(user, apiService, http, jwtService, router) {
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
    ListPropertiesService.prototype.BindCountry = function () {
        var urlToCountryWiseState = "Associate/ws/Country.asmx/SelectCountry";
        return this.apiService.post(urlToCountryWiseState, { 'flag': '1' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.BindState = function () {
        var urlToCountryWiseState = "Associate/ws/CategoryPurchase.asmx/CityWiseStates";
        return this.apiService.post(urlToCountryWiseState, { Status: '1', CountryID: 'US' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.SelectAllPurchasedCartData = function () {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/CategoryPurchase.asmx/SelectAllPurchasedCartData";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.RemoveCardSessions = function () {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/CategoryPurchase.asmx/RemoveCardSessions";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.SelectAdvertisement = function () {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/Sale.asmx/SelectAdvertisement";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { Jobtype: 1 })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.DeleteDataFromAdvertisement = function (advertisementId) {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/Sale.asmx/DeleteDataFromadvertisement";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { advtID: advertisementId })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.GetAdvertisementDetails = function (advertisementId) {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/Sale.asmx/ViewAdvertisementDetails";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { adID: advertisementId })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.ViewAssociateBasicDetails = function () {
        var urlToSelectAllPurchasedCartDataServices = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.InsertAmount = function (totalAmount, title, subcategory) {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/CategoryPurchase.asmx/InsertAmount";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { amount: totalAmount, Description: 'Property Listing purchase for  ' + title + " of " + subcategory })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.InsertSale = function (CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice) {
        if (adsPrice == "") {
            adsPrice = 0;
        }
        else {
            adsPrice = parseFloat(adsPrice);
        }
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/Sale.asmx/InsertSale";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {
            'CategoryId': CategoryId, 'SubCategoryId': parseInt(subCategoryId), 'title': title, 'address': address.trim(), 'contactNo': contactNo, 'description': description.trim(), 'Features': features, 'countryID': countryID, 'StateID': stateID, 'cityID': cityId, 'isFeatured': isFeatured, 'zipcode': zipcod, 'jobtype': jobtype, 'amount': amount, 'advertisementPrice': adsPrice
        })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.InsertCatgoryPostAds = function (CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration) {
        var urlToSelectAllPurchasedCartDataServices = "Associate/ws/CategoryPurchase.asmx/InsertCatgoryPostAds";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {
            categoryID: CatID, 'SubcategoryID': SubCatID, 'PlanID': PlanID, 'pricevalues': Price, 'zipcodeID': Zipcode, 'Couponcode': CouponCode, 'Discount': Discount, 'Duration': Duration
        })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.AssociateCardExists = function () {
        var urlToInsertCategory = "Associate/ws/CategoryPurchase.asmx/AssociateCardExists";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.CountAssociateAdvertisements = function () {
        var urlToInsertCategory = "Associate/ws/Sale.asmx/CountAssociateAdvertisements";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.UpdateSale = function (CategoryId, SubCategoryId, title, Features, address, contactNo, description, countryID, StateID, cityID, zipcode, amount, id) {
        var urlToUpdateSale = "Associate/ws/Sale.asmx/UpdateSale";
        return this.apiService.post(urlToUpdateSale, {
            'CategoryId': CategoryId, 'SubCategoryId': parseInt(SubCategoryId), 'title': title, 'Features': Features, 'address': address.trim(),
            'contactNo': contactNo, 'description': description.trim(), 'countryID': countryID, 'StateID': StateID, 'cityID': cityID,
            'zipcode': zipcode, 'amount': amount, 'id': parseInt(id)
        }).pipe(map(function (data) {
            return data;
        }));
        //
    };
    ListPropertiesService.prototype.AssociatePurchasedCategory = function (jobcate) {
        var urlToUpdateSale = "Associate/ws/Category.asmx/AssociatePurchasedCategory";
        return this.apiService.post(urlToUpdateSale, { jobtype: jobcate }).pipe(map(function (data) {
            return data;
        }));
        //
    };
    ListPropertiesService.prototype.SelectedChoicesForPurchase = function () {
        //
        var urlToUpdateSale = "Associate/ws/CategoryPurchase.asmx/SelectCartData";
        return this.apiService.post(urlToUpdateSale, {}).pipe(map(function (data) {
            return data;
        }));
    }; //GetAllRecords
    ListPropertiesService.prototype.PurchasedItems = function (CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id) {
        //
        var urlToUpdateSale = "Associate/ws/CategoryPurchase.asmx/PurchasedItems";
        return this.apiService.post(urlToUpdateSale, { CatID: CategoryID, 'catName': CategoryName, 'subCatName': SubCategoryName, 'subCatID': subCategoryID, 'zipcode': Zipcode, 'price': Price }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.BindMembership = function () {
        //
        var urlToUpdateSale = "Associate/ws/MemberShip.asmx/SelectMemberShip";
        return this.apiService.post(urlToUpdateSale, { flag: 1 }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.RemoveItem = function (id) {
        //
        var urlToUpdateSale = "Associate/ws/CategoryPurchase.asmx/RemoveItem";
        return this.apiService.post(urlToUpdateSale, { subCatID: id }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.RemoveItem1 = function (id) {
        //
        var urlToUpdateSale = "Associate/ws/CategoryPurchase.asmx/RemoveItem1";
        return this.apiService.post(urlToUpdateSale, { subCatID: id }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.AssociateCategoryExistsOrNot = function () {
        var urlToUpdateSale = "Associate/ws/SubCategory.asmx/AssociateCategoryExistsOrNot";
        return this.apiService.post(urlToUpdateSale, {}).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.InsertDNew = function (CategoryID, subCategoryID, CategoryName, SubCategoryName, Price) {
        debugger;
        var urlToUpdateSale = "Associate/ws/CategoryPurchase.asmx/InsertDNew";
        return this.apiService.post(urlToUpdateSale, {
            CatID: CategoryID, 'catName': CategoryName, 'subCatName': SubCategoryName, 'zipcode': '0', 'subCatID': subCategoryID, 'price': Price
        }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.BindAssociateCategory = function (CategoryID) {
        debugger;
        var urlToUpdateSale = "Associate/ws/subCategory.asmx/AssociateSubCategory";
        return this.apiService.post(urlToUpdateSale, {
            Categoryid: CategoryID
        }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.MurchantPurchaseCategories = function () {
        var urlToMurchantPurchaseCategory = "Associate/ws/MyCategories.asmx/MuPurchaseCategories";
        return this.apiService.post(urlToMurchantPurchaseCategory, { JobType: '1' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.CountPurchasedCategories = function () {
        var urlToUpdateSale = "Associate/ws/MyCategories.asmx/CountPurchasedCategories";
        return this.apiService.post(urlToUpdateSale, {
            jobtype: 1
        }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.BindAllCategories = function () {
        var urlToUpdateSale = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToUpdateSale, { 'flag': '1', 'jobtype': '1' }).pipe(map(function (data) {
            return data;
        }));
    };
    ListPropertiesService.prototype.GetPostAdvertisementPrice = function (zipCode, subCategory) {
        var urlToUpdateSale = "Associate/ws/CategoryPurchase.asmx/GetPostAdvertisementPrice";
        return this.apiService.post(urlToUpdateSale, { 'zip': zipCode, 'subCategoryID': subCategory })
            .pipe(map(function (data) {
            return data;
        }));
    };
    var _a, _b;
    ListPropertiesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [User,
            ApiService, typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object, JwtService, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object])
    ], ListPropertiesService);
    return ListPropertiesService;
}());
export { ListPropertiesService };
//# sourceMappingURL=list-properties.service.js.map