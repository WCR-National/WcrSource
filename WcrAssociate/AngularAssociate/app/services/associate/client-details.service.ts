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
export class ClientDetailsService {

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

    uploadimage(image) {
        //
        
        let urlToUploadImage: string = "ws/UpdatePic.ashx";
        return this.apiService.post(urlToUploadImage, { data: image })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }


    getServicesCount(): Observable<any> {

        let urlToCountAssociateCategories: string = "ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype: 2 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer services

    getSalesCount(): Observable<any> {

        let urlToSalesCount: string = "ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToSalesCount, { jobtype: 1})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer sales

    getTotalSalesAndServicesCount(): Observable<any> {

        let urlToSalesCount: string = "ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToSalesCount, { jobtype: 1 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer


    getClientDetailsSalesData(): Observable<any> {

        let urlToClientDetailsSalesData: string = "ws/Sale.asmx/GetVisitorsInfo";
        return this.apiService.post(urlToClientDetailsSalesData, { })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer Sales data

    getClientDetailsServicesData(): Observable<any> {

        let urlToClientDetailsServicesData: string = "ws/Sale.asmx/GetVisitorsInfoServices";
        return this.apiService.post(urlToClientDetailsServicesData, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer Servces data

    deleteCustomerRecords(id): Observable<any> {

        let urlToClientDetailsServicesData: string = "/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToClientDetailsServicesData, { ID: id })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //delete data
}   
