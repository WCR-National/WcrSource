import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../auth';
var PaymentService = /** @class */ (function () {
    function PaymentService(user, apiService, http, jwtService, router) {
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
    PaymentService.prototype.selectCountry = function () {
        var urlToSelectCountry = "ws/Country.asmx/SelectCountry";
        return this.apiService.post(urlToSelectCountry, { 'flag': '1' })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PaymentService.prototype.bindState = function (countryId) {
        var urlToCountryWiseState = "Associate/ws/State.asmx/CountryWiseState";
        return this.apiService.post(urlToCountryWiseState, { 'Status': '1', 'CountryID': countryId })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PaymentService.prototype.bindStateWiseZipCode = function (state, city) {
        var urlToCountryWiseState = "Associate/ws/CategoryPurchase.asmx/StateWiseZipCode";
        return this.apiService.post(urlToCountryWiseState, { StateID: state, CityID: city })
            .pipe(map(function (data) {
            return data;
        }));
    };
    PaymentService.prototype.getCardAndBillinInfo = function () {
        //url: "..,
        var urlToGetCardAndBillingInfo = "ws/AssociateSignUp.ashx?action=GetCardData";
        return this.apiService.post(urlToGetCardAndBillingInfo, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    PaymentService.prototype.addCardAndBillinInfo = function (cardData) {
        //url: "..,
        var urlToCardAndBillingInfo = "ws/AssociateSignUp.ashx?action=CardData&CardNumber=" + cardData.cardNumber + "&Cardholder_FirstName=" + cardData.firstName + "&Cardholder_LastName=" + cardData.lastName + "&Cardholder_Address=" + cardData.address + "&Cardholder_City=" + cardData.city + "&Cardholder_State=" + cardData.state + "&Cardholder_Country=" + cardData.country + "&Cardholder_Zip=" + cardData.zipCode + "&cvv=" + cardData.CVCNumber + "&ExpMonth=" + cardData.expMonth + "&ExpYear=" + cardData.expYear + "&CardType=" + cardData.cardType + "&totalamount=" + cardData.totalAmount + "";
        return this.apiService.post(urlToCardAndBillingInfo, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    //  url: 
    PaymentService.prototype.updateCardAndBillinInfo = function (cardData) {
        //url: "..,
        var urlToUpdateCardAndBillingInfo = "ws/AssociateSignUp.ashx?action=Ucardata&CardNumber=" + cardData.cardNumber + "&Cardholder_FirstName=" + cardData.firstName + "&Cardholder_LastName=" + cardData.lastName + "&Cardholder_Address=" + cardData.address + "&Cardholder_City=" + cardData.city + "&Cardholder_State=" + cardData.state + "&Cardholder_Country=" + cardData.country + "&Cardholder_Zip=" + cardData.zipCode + "&cvv=" + cardData.CVCNumber + "&ExpMonth=" + cardData.expMonth + "&ExpYear=" + cardData.expYear + "&CardType=" + cardData.cardType + "&totalamount=" + cardData.totalAmount + "&cardDataID=" + cardData.cardid + "";
        return this.apiService.post(urlToUpdateCardAndBillingInfo, {})
            .pipe(map(function (data) {
            return data;
        }));
    };
    PaymentService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService,
            Router])
    ], PaymentService);
    return PaymentService;
}());
export { PaymentService };
//# sourceMappingURL=payment.service.js.map