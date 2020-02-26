import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


import { map, distinctUntilChanged, delay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { JwtService, ApiService } from '../auth';


@Injectable()
export class DashboardService {
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


    //
    initializeHeader(): Observable<any> {

        let urlToCountHeader: string = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountHeader, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories


    attemptToCountInterestedCustomers(): Observable<any> {

        let urlToCountInterestedCustomers: string = "Associate/ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToCountInterestedCustomers, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer


    attemptToCountAssociateCategories(): Observable<any> {

        let urlToCountAssociateCategories: string = "Associate/ws/Sale.asmx/CountAssociateCategories";
        return this.apiService.post(urlToCountAssociateCategories, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    attemptToCountPurchasedCategories(): Observable<any> {

        let urlToCountAssociateCategories: string = "Associate/ws/MyCategories.asmx/CountPurchasedCategories";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype:1 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //purchase property listings

    attemptToCountPurchaseZipCode(): Observable<any> {

        let urlToCountPurchaseZipCode: string = "Associate/ws/MyCategories.asmx/CountPurchasedZipCode";
        return this.apiService.post(urlToCountPurchaseZipCode, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //zip codes

    attemptToCountAllPurchasedCategories(): Observable<any> {

        let urlToCountAllPurchasedCategories: string = "Associate/ws/MyCategories.asmx/CountAllPurchasedCategories";
        return this.apiService.post(urlToCountAllPurchasedCategories, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //all purchased categories



    async attemptToZipcodeData() {

        let urlToCountAllPurchasedCategories: string = "Associate/ws/MyCategories.asmx/MuPurchaseCategories";
        return this.apiService.post(urlToCountAllPurchasedCategories, { 'JobType': '2' }).toPromise();
    } //zip code data

    async attemptToCategoriesData() {

        let urlToCountAllPurchasedCategories: string = "Associate/ws/MyCategories.asmx/AllPurchasedCategories";
        return this.apiService.post(urlToCountAllPurchasedCategories, {}).toPromise();
            //.pipe(map(
            //    data => {
            //        return data;
            //    }
            //));
    } //categories data

    async attemptToInterestedCustomerData() {

        let urlToGetVisitorsInfo: string = "Associate/ws/Sale.asmx/GetVisitorsInfo";
        return this.apiService.post(urlToGetVisitorsInfo, {}).toPromise();
            //.pipe(map(
            //    data => {
            //        return data;
            //    }
            //));
    } //interested consumer

    async attemptToInterestedCustomerServicesData() {

        let urlToGetVisitorsInfoServices: string = "Associate/ws/Sale.asmx/GetVisitorsInfoServices";
        return this.apiService.post(urlToGetVisitorsInfoServices, {}).toPromise();
        //.pipe(map(
        //    data => {
        //        return data;
        //    }
        //));
    } //interested consumer

    async attemptToMyPropertyListingsData() {

        let urlToCountAllPurchasedCategories: string = "Associate/ws/Sale.asmx/SelectAdvertisement";
        return this.apiService.post(urlToCountAllPurchasedCategories, { Jobtype: 1 }).toPromise();
            //.pipe(map(
            //    data => {
            //        return data;
            //    }
            //));
    } //my property listings

    async attemptToAllAdvertisement() {

        let urlToCountAllPurchasedCategories: string = "Associate/ws/Sale.asmx/SelectAllAdvertisement";
        return this.apiService.post(urlToCountAllPurchasedCategories, {}).toPromise();
            //.pipe(map(
            //    data => {
            //        return data;
            //    }
            //));
    } //All advertisement listings




    async attempConsumerAccountExists(type, credentials) {

        let urlToSignUp: string = "Associate/ws/AssociateRegistration.asmx/ConsumerAccountExists";// + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return await this.apiService.post(urlToSignUp, { EmailID: credentials.email }).toPromise();
        //.pipe(map(
        //    data => {
        //        return data;
        //    }
        //));
    }

    //
    deleteCustomerRecords(id): Observable<any> {

        let urlToDeleteCustomerRecords: string = "Associate/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToDeleteCustomerRecords, { ID: id})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //all purchased categories


    validateEmail(email) {

        return this.apiService.get('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email)
            .pipe(
                map(
                    (data) => { return data; })
            );
    }

    emailAlreadyTaken(email) {

        return this.apiService.post('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email, {})
            .pipe(delay(300));
    }


    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }
    // Update the user on the server (email, pass, etc)
    update(user): Observable<User> {
        return this.apiService
            .put('/user', { user })
            .pipe(map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }
}
