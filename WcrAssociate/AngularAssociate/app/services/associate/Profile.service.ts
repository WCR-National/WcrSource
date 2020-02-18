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
export class ProfileService {
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



    verifyNavSidebarAccessible(): Observable<any> {

        let urlToCountInterestedCustomers: string = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountInterestedCustomers, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer

    getUserDetails(): Observable<any> {

        let urlToCountAssociateCategories: string = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToCountAssociateCategories, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //select categories


    updateProfileinfo(FirstName, LastName, PhoneNumber, email, Password, LicenseNumber, IssuingState, profileImage) {
        let urlToCountAssociateCategories: string = "ws/AssociateRegistration.asmx/UpdateAssociate";
        return this.apiService.post(urlToCountAssociateCategories, { 'FullName': FirstName, 'LastName': LastName, 'Password': Password, 'EmailID': email, 'MobileNo': PhoneNumber, 'LicenceID': LicenseNumber, 'LicenceState': IssuingState , 'ZipCode': '0'})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }
    
}
