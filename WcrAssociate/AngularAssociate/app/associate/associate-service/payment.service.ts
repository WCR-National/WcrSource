import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { User } from '../../entities/user';
import {  Router } from '@angular/router';


import { map, distinctUntilChanged, delay } from 'rxjs/operators';
import { JwtService, ApiService } from '../../services/auth';


@Injectable()
export class PaymentService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    public isAuthenticated_extra = false;

    constructor(private user: User = null,
        private apiService: ApiService = null,
        private http: HttpClient = null,
        private jwtService: JwtService = null,
        private router: Router) { }

    selectCountry(): Observable<any> {

        let urlToSelectCountry: string = "ws/Country.asmx/SelectCountry";
        return this.apiService.post(urlToSelectCountry, { 'flag': '1' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    bindState(countryId): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/State.asmx/CountryWiseState";
        return this.apiService.post(urlToCountryWiseState, { 'Status': '1', 'CountryID': countryId })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    bindStateWiseZipCode(state, city): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/CategoryPurchase.asmx/StateWiseZipCode";
        return this.apiService.post(urlToCountryWiseState, { StateID: state , CityID: city })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    getCardAndBillinInfo() {
        //url: "..,
        
        let urlToGetCardAndBillingInfo: string = "ws/AssociateSignUp.ashx?action=GetCardData";
        return this.apiService.post(urlToGetCardAndBillingInfo, { })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    addCardAndBillinInfo(cardData) {
        //url: "..,

        let urlToCardAndBillingInfo: string = "ws/AssociateSignUp.ashx?action=CardData&CardNumber=" + cardData.cardNumber + "&Cardholder_FirstName=" + cardData.firstName + "&Cardholder_LastName=" + cardData.lastName + "&Cardholder_Address=" + cardData.address + "&Cardholder_City=" + cardData.city + "&Cardholder_State=" + cardData.state.value + "&Cardholder_Country=" + cardData.country + "&Cardholder_Zip=" + cardData.zipCode.value + "&cvv=" + cardData.CVCNumber + "&ExpMonth=" + cardData.expMonth.value + "&ExpYear=" + cardData.expYear.value + "&CardType=" + cardData.cardType + "&totalamount=" + cardData.totalAmount + "";
        return this.apiService.post(urlToCardAndBillingInfo, {  })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }
    //  url: 
    updateCardAndBillinInfo(cardData) {
        //url: "..,

        let urlToUpdateCardAndBillingInfo: string = "ws/AssociateSignUp.ashx?action=Ucardata&CardNumber=" + cardData.cardNumber + "&Cardholder_FirstName=" + cardData.firstName + "&Cardholder_LastName=" + cardData.lastName + "&Cardholder_Address=" + cardData.address + "&Cardholder_City=" + cardData.city + "&Cardholder_State=" + cardData.state.value + "&Cardholder_Country=" + cardData.country + "&Cardholder_Zip=" + cardData.zipCode.value + "&cvv=" + cardData.CVCNumber + "&ExpMonth=" + cardData.expMonth.value + "&ExpYear=" + cardData.expYear.value + "&CardType=" + cardData.cardType + "&totalamount=" + cardData.totalAmount + "&cardDataID=" + cardData.cardid + "";
        return this.apiService.post(urlToUpdateCardAndBillingInfo, {  })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }


}
