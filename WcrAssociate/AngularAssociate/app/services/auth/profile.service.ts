import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';


import { map, distinctUntilChanged, delay } from 'rxjs/operators';


@Injectable()
export class ProfilesService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private user: User = null,
        private apiService: ApiService = null,
        private http: HttpClient = null,
        private jwtService: JwtService = null) { }

    UpdateConsumer(consumerData:any)
    {
        let urlToConsumerData: string = "ws/ConsumerRegistration.asmx/UpdateConsumer";
        return this.apiService.post(urlToConsumerData, { 'FirstName': consumerData.FirstName, 'Address': consumerData.Address, 'MobileNo': consumerData.MobileNo, 'userName': consumerData.userName, 'password': consumerData.password, 'emailID': consumerData.email, 'ZipCode': consumerData.ZipCode, 'lastName': consumerData.lastName, 'Unit_Apt': consumerData.unitApt, 'city': consumerData.city, 'stateID': consumerData.stateID.value })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    getProfileInfo() {
        //url: "..,

        let urlToGetProfileInfo: string = "ws/ConsumerRegistration.asmx/SelectConsumerDetail";
        return this.apiService.post(urlToGetProfileInfo, {})
            .pipe(map(
                data => {

                    return data;
                }
            ));
    }

    getBookmarkServicesList()
    {
        let urlToGetSavedServices: string = "ws/InnerPage.asmx/ConsumerSavedBookAdvertisementsForServices";
        return this.apiService.post(urlToGetSavedServices, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    getBookmarkSalesList() {
        let urlToGetSavedAdvertisement: string = "ws/InnerPage.asmx/ViewConsumerSavedAdvertisements";
        return this.apiService.post(urlToGetSavedAdvertisement, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }
}
