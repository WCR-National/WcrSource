import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../../services/auth';


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
  
    
    getServicesCount(): Observable<any> {

        let urlToCountAssociateCategories: string = "Associate/ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToCountAssociateCategories, { jobtype: 2 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer services

    getSalesCount(): Observable<any> {

        let urlToSalesCount: string = "Associate/ws/Sale.asmx/CountTotalVisitorsSales";
        return this.apiService.post(urlToSalesCount, { jobtype: 1})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer sales

    getTotalSalesAndServicesCount(): Observable<any> {

        let urlToSalesCount: string = "Associate/ws/Sale.asmx/CountTotalVisitors";
        return this.apiService.post(urlToSalesCount, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer


    getClientDetailsSalesData(): Observable<any> {

        let urlToClientDetailsSalesData: string = "Associate/ws/Sale.asmx/GetVisitorsInfo";
        return this.apiService.post(urlToClientDetailsSalesData, { })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer Sales data

    getClientDetailsServicesData(): Observable<any> {

        let urlToClientDetailsServicesData: string = "Associate/ws/Sale.asmx/GetVisitorsInfoServices";
        return this.apiService.post(urlToClientDetailsServicesData, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //interested consumer Servces data

    deleteCustomerRecords(id): Observable<any> {

        let urlToClientDetailsServicesData: string = "Associate/ws/Sale.asmx/DeleteCustomerRecords";
        return this.apiService.post(urlToClientDetailsServicesData, { ID: id })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //delete data
}   
