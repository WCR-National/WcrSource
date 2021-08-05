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
export class SalesAdvertisementsService {
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


    AssociateSignup(email): Observable<any> {

        let urlToAssociateSignup: string = "ws/AssociateSignUp.ashx?action=RecordExists&EmailID=" + email;
        return this.apiService.post(urlToAssociateSignup, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    GetConsumerDetails(): Observable<any> {

        let urlToConsumerDetail: string = "ws/ConsumerRegistration.asmx/SelectConsumerDetail";
        return this.apiService.post(urlToConsumerDetail, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    GetPropertySalesAdevertisementData(id): Observable<any> {

        let urlToViewAdvertisementDetails: string = "ws/InnerPage.asmx/ViewAdvertisementDetails";
        return this.apiService.post(urlToViewAdvertisementDetails, { 'adID' : id})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    GetCatOrSubCatServices(id): Observable<any> {

        let urlToSelectCatSubCategory: string = "Associate/ws/SubCategory.asmx/SelectCatSubCategory";
        return this.apiService.post(urlToSelectCatSubCategory, { 'flag': 1, 'Categoryid': id })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    ViewHomeAdvertisementsWithParam(subCatId, zipcode): Observable<any> {

        let urlToViewHomeAdvertisementsWithParam: string = "ws/InnerPage.asmx/ViewHomeAdvertisementsWithParam";
        return this.apiService.post(urlToViewHomeAdvertisementsWithParam, { 'subCategoryID': subCatId, 'param': zipcode })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    ConsumerIsLogin(): Observable<any> {

        let urlToViewHomeAdvertisementsWithParam: string = "ws/ConsumerRegistration.asmx/ConsumerIsLogin";
        return this.apiService.post(urlToViewHomeAdvertisementsWithParam, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories


    GetServiceAdvertisementByZipcode(consumerId, zipc, CategoryID): Observable<any> {
            debugger;
        let urlToViewserviceAdvertisements: string = "ws/TopSearch.asmx/GetServiceAdvertisementByZipcode";
        return this.apiService.post(urlToViewserviceAdvertisements, { inConsumerId: consumerId, inZipCode: zipc, inCategoryId: CategoryID })
                .pipe(map(
                    data => {

                        return data;
                    }
                ));
        } //select categories

    SelectServicesListData(zipc, CategoryID): Observable<any> {
        debugger;
        let urlToViewHomeAdvertisementsWithParam: string = "ws/TopSearch.asmx/SelectServicesListData";
        return this.apiService.post(urlToViewHomeAdvertisementsWithParam, { zipcode: zipc, Category: CategoryID })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories

    UpdateSavedBookmarksSales(advId, zipcode) {

        let urlToInsertSavedAdts: string = "ws/InnerPage.asmx/InsertSavedAdts";
        return this.apiService.post(urlToInsertSavedAdts, { 'AdvertisementID': advId, 'zipCode': zipcode, 'jtype': '1' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    UpdateSavedBookmarksService(advId, zipcode) {
        debugger;
        let urlToInsertSavedAdts: string = "ws/InnerPage.asmx/InsertSavedAdts";
        return this.apiService.post(urlToInsertSavedAdts, { 'AdvertisementID': advId, 'zipCode': zipcode, 'jtype': '2' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    CheckEmailAndPhNo()
    {
        let urlToCheckPhNoAndEmail: string = "ws/ConsumerRegistration.asmx/CheckConsumerMobANDEmailExists";
        return this.apiService.post(urlToCheckPhNoAndEmail, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    //Contact to Associate
    InsertConsumerInterest(adverID, associateID, jobtypeID, zipcode) {
        let urlToInsertConsumerInterest: string = "ws/ConsumerComments.asmx/InsertConsumerInterest";
        return this.apiService.post(urlToInsertConsumerInterest, {
            AdvertisementID: adverID, 'AssociateID': associateID, 'jobType': jobtypeID, 'zipcode': zipcode
        })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    SendConsumerDetail(associateID, adverID, jobtypeID, zipcode) {
        let urlToInsertConsumerInterest: string = "ws/ConsumerComments.asmx/SendConsumerDetail";
        return this.apiService.post(urlToInsertConsumerInterest, { 'associateID': associateID, 'advertisementID': adverID, 'jobtype': jobtypeID, 'zipcode': zipcode })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }
    //End Contact to Associate

    UpdateProfileData(NameOfUser)
    {
        let urlToCheckPhNoAndEmail: string = "ws/ConsumerRegistration.asmx/UpdateCompulsoryData";
        return this.apiService.post(urlToCheckPhNoAndEmail, { Name: NameOfUser })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }
}
