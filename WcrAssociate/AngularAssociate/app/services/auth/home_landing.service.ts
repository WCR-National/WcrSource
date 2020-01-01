import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';

import { map, distinctUntilChanged, debounce } from 'rxjs/operators';


@Injectable()
export class HomeLandingService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService
    ) { }




    //For sales
    attemptGetSalesCategoryByZip(zipc): Observable<any> {

        let urlToSubCategories: string = "Associate/ws/subCategory.asmx/SubCategories"
        return this.apiService.post( urlToSubCategories, { Categoryid: 1 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    async attemptGetAdvanceSearchByZipc(zipc, subCategoryId) {


        let urlToAdvanceSearch: string = "ws/TopSearch.asmx/ViewAdvanceSearch1";
        return await this.http.post(urlToAdvanceSearch, { zipcode: zipc, SubCategory: subCategoryId }).toPromise();


            //.pipe(map(
            //    data => {
            //        return data;
            //    }
            //))
           
    }


    //For services
    attemptGetJobtypeWiseCategory(): Observable<any> {

        let urlToJobTypeWiseCategory: string = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToJobTypeWiseCategory, { flag: 1, jobtype: 2 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    async attemptGetViewAdvanceSearchForServices(categoryId, zipc) {

        let urlToJobTypeWiseCategory: string = "ws/TopSearch.asmx/ViewAdvanceSearchForServices";
        //return this.apiService.post( urlToJobTypeWiseCategory, { zipcode: zipc, Category: subCategoryId })
        //    .pipe(map(
        //        data => {
        //            return data;
        //        }
        //    ));

        return await this.http.post(urlToJobTypeWiseCategory, { zipcode: zipc, Category: categoryId }).toPromise();

    }


    //For sales
    attemptGetSalesCategoryCityWise(state, city): Observable<any> {

        let urlToSubCategories: string = "Associate/ws/subCategory.asmx/SubCategories"
        return this.apiService.post( urlToSubCategories, { Categoryid: 1 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

     async attemptGetAdvanceSearchCityStateWise(state, city, subCategoryId) {


        let urlToAdvanceSearch: string = "ws/TopSearch.asmx/ViewAdvanceSearchCityStateWise";
        //    data: "{'State':'" + State + "','City':'" + City + "','SubCategory':" + ($(docs).find("id").text()) + "}"

        //return this.apiService.post( urlToAdvanceSearch, { State: state, City: city, SubCategory: subCategoryId })
        //    .pipe(map(
        //        data => {
        //            return data;
        //        }
        //    ));

        return await this.http.post(urlToAdvanceSearch, { State: state, City: city, SubCategory: subCategoryId }).toPromise();

    }


    //For services
    attemptGetServicesCategoryCityWise(state, city): Observable<any> {

        let urlToServiceCategory: string = "Associate/ws/Category.asmx/JobtypeWiseCategory"
        return this.apiService.post( urlToServiceCategory, { flag: 1, jobtype: 2 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    async attemptGetAdvanceSearchServicesCityStateWise(state, city, subCategoryId) {


        let urlToAdvanceSearch: string = "ws/TopSearch.asmx/ViewAdvanceSearchServicesCityStateWise";
        //  {'State':'" + State + "','City':'" + City + "','Category':" + ($(docs).find("ID").text()) + "}

        //return this.apiService.post( urlToAdvanceSearch, { State: state, City: city, Category: subCategoryId })
        //    .pipe(map(
        //        data => {
        //            return data;
        //        }
        //    ));

        return await this.http.post(urlToAdvanceSearch, { State: state, City: city, Category: subCategoryId }).toPromise();

    }

    //For IPAddress
    attemptGetSalesAdts() {

        let urlToGetIP: string = "http://jsonip.com?=callback";
        return this.http.get<any>(urlToGetIP)
            .pipe(map(
                data => {
                    let _ipAddress = data.ip;
                    this.attemptGetZipCodeByIPAddress(_ipAddress);
                  
                }
            ));
    }

    async attemptGetZipCodeByIPAddress(_ipAddress) {
        let urlToGetZipCodeByIpAddress = "ws/TopSearch.asmx/GetZipCodeIpAddress";
        return await this.apiService.post(urlToGetZipCodeByIpAddress, { _IpAddress: _ipAddress }).toPromise();
    }
}