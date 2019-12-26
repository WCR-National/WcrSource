import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';

import { map, distinctUntilChanged } from 'rxjs/operators';


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



    attemptGetSalesCategoryCityWise(state, city): Observable<any> {

        let urlToSubCategories: string = "Associate/ws/subCategory.asmx/SubCategories"
        return this.apiService.post(environment.apiEndPoint + urlToSubCategories, { Categoryid: 1 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptGetAdvanceSearchCityStateWise(state, city, subCategoryId): Observable<any> {


        let urlToAdvanceSearch: string = "ws/TopSearch.asmx/ViewAdvanceSearchCityStateWise";
        //    data: "{'State':'" + State + "','City':'" + City + "','SubCategory':" + ($(docs).find("id").text()) + "}"

        return this.apiService.post(environment.apiEndPoint + urlToAdvanceSearch, { State: state, City: city, SubCategory: subCategoryId })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptGetJobtypeWiseCategory(subCategoryId): Observable<any> {

        let urlToJobTypeWiseCategory: string = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(environment.apiEndPoint + urlToJobTypeWiseCategory, { flag: 1, jobtype: 2 })
                    .pipe(map(
                        data => {
                            return data;
                        }
                    ));
    }

    attemptGetViewAdvanceSearchForServices(subCategoryId, zipc): Observable<any> {

        let urlToJobTypeWiseCategory: string = "ws/TopSearch.asmx/ViewAdvanceSearchForServices";
        return this.apiService.post(environment.apiEndPoint + urlToJobTypeWiseCategory, { zipcode: zipc, Category: subCategoryId })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    //data: "{' + "}",
}
