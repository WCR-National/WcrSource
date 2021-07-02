import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { User } from '../../entities/user';
import {  Router } from '@angular/router';


import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService, ApiService } from '../../services/auth';


@Injectable()
export class PurchaseZipCodeService {

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
  
    
    BindCityWiseState(city): Observable<any> {
        debugger;
        let urlToCountryWiseState: string = "Associate/ws/CategoryPurchase.asmx/CityWiseStates";
        return this.apiService.post( urlToCountryWiseState, { CityID : city } )
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    BindState(): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/State.asmx/CountryWiseState";
        return this.apiService.post(urlToCountryWiseState, { Status: '1', CountryID: 'US' })
            .pipe( map (
                data => {
                    return data;
                }
            ));
    }
    
    BindZipCodesByUserZipCode(zipCode): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/Category.asmx/AvailableZipCodesForServices";
        return this.apiService.post(urlToCountryWiseState, { jobtype: '2', zip: zipCode })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    BindCategoryZipCode(zipCode): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/Category.asmx/AvailableZipCodesForServices";
        return this.apiService.post(urlToCountryWiseState, { jobtype: '2', zip: zipCode })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    BindSubCategoryZipCode(zipCode, categoryId): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/Category.asmx/AvailableSubCategoryzipCode";
        return this.apiService.post(urlToCountryWiseState, { jobtype: '2', zip: zipCode, categoryID: categoryId })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    GetSubCategoryPrice(zipCode, subCategoryID): Observable<any> {
        debugger;
        let urlToCountryWiseState: string = "Associate/ws/CategoryPurchase.asmx/GetSubCategoryPrice";
        return this.apiService.post(urlToCountryWiseState, { zipCode: zipCode, subCategoryID: subCategoryID })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    ApplyCoponCode(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode): Observable<any> {

        if (categoryId == 2) {
            subCategoryId = 5;
        }
        else if (categoryId == 5) {
            subCategoryId = 13;
        }
        else if (categoryId == 3) {
            subCategoryId = 8;
        }
        else {
        }

        let urlToInsertCategory: string = "Associate/ws/CategoryPurchase.asmx/InsertCategory";
        return this.apiService.post(urlToInsertCategory, { categoryID: categoryId, SubcategoryID: subCategoryId, PlanID: '1', pricevalues: priceValues, zipcodeID: zipCode, Couponcode:  cCode , Discount: disc , Duration:  duration })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    MakeTransaction(monthVal, totalAmount): Observable<any> {

        let urlToInsertAmount: string = "Associate/ws/CategoryPurchase.asmx/InsertAmount";
        return this.apiService.post(urlToInsertAmount, { amount: monthVal * totalAmount })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    MurchantPurchaseCategories(): Observable<any> {

        let urlToMurchantPurchaseCategory: string = "Associate/ws/MyCategories.asmx/MuPurchaseCategories";
        return this.apiService.post(urlToMurchantPurchaseCategory, { JobType:'2' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }



    ApplyCoponCodeNew(monthValue, totalAmount, categoryText, zipCode): Observable<any> {

        let urlToInsertAmount: string = "Associate/ws/CategoryPurchase.asmx/InsertAmount";
        let desc: string = "Zip code " + zipCode + " has been purchased for  " + categoryText;
        return this.apiService.post(urlToInsertAmount, { amount: monthValue * totalAmount, Description: desc })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
    {
        debugger;
        if (categoryId == 2) {
            subCategoryId = 5;
        }
        else if (categoryId == 5) {
            subCategoryId = 13;
        }
        else if (categoryId == 3) {
            subCategoryId = 8;
        }
        else {
        }

        let urlToInsertCategory: string = "Associate/ws/CategoryPurchase.asmx/InsertCategory";
        return this.apiService.post(urlToInsertCategory, {
            categoryID: categoryId, SubcategoryID: subCategoryId, PlanID: '1', pricevalues: priceValues, zipcodeID: zipCode, Couponcode: cCode, Discount: disc, Duration: duration
        }).toPromise();
            //.pipe(map(
            //    data => {
            //        return data;
            //    }
            //));
    }

    PermananetlyRemoveCategory(id)
    {
        debugger;
        let urlToInsertCategory: string = "Associate/ws/MyCategories.asmx/DeletePurchasedCategories";
        return this.apiService.post(urlToInsertCategory, { id: id })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    GetPurchasedAllRecords() {
        let urlToSelectAllPurchasedCartDataServices : string = "Associate/ws/CategoryPurchase.asmx/SelectAllPurchasedCartDataServices";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    SelectCurrentPurchasedZipCodes(): Observable<any> {

        let urlToMurchantPurchaseCategory: string = "Associate/ws/MyCategories.asmx/SelectCurrentPurchasedZipCodes";
        return this.apiService.post(urlToMurchantPurchaseCategory, { JobType: '1' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }


    

    ZipCodePurchase() {
        let urlToInsertCategory: string = "Associate/ws/Sale.asmx/CountPurchasedZipcode";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    ZipCodePurchaseCode() {
        let urlToInsertCategory: string = "Associate/ws/CategoryPurchase.asmx/AssociateCardExists";
        return this.apiService.post(urlToInsertCategory, { })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    } //Check Card Exist or not

    IsZipCodeExist(zipCode)
    {
        let urlToInsertCategory: string = "Associate/ws/CategoryPurchase.asmx/ZipCodeExists";
        return this.apiService.post(urlToInsertCategory, { Zipcode: zipCode })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }
 
}   
