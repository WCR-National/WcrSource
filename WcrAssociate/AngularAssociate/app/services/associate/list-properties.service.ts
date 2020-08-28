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
export class ListPropertiesService {

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


    BindCountry(): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/Country.asmx/SelectCountry";
        return this.apiService.post(urlToCountryWiseState, { 'flag': '1' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    BindState(): Observable<any> {

        let urlToCountryWiseState: string = "Associate/ws/CategoryPurchase.asmx/CityWiseStates";
        return this.apiService.post(urlToCountryWiseState, { Status: '1', CountryID: 'US' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    SelectAllPurchasedCartData() {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/CategoryPurchase.asmx/SelectAllPurchasedCartData";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }



    RemoveCardSessions() {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/CategoryPurchase.asmx/RemoveCardSessions";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    SelectAdvertisement() {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/Sale.asmx/SelectAdvertisement";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { Jobtype: 1 })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    DeleteDataFromAdvertisement(advertisementId) {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/Sale.asmx/DeleteDataFromadvertisement";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { advtID: advertisementId })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }



    GetAdvertisementDetails(advertisementId) {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/Sale.asmx/ViewAdvertisementDetails";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { advtID: advertisementId })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    ViewAssociateBasicDetails() {
        let urlToSelectAllPurchasedCartDataServices: string = "ws/AssociateRegistration.asmx/ViewAssociateBasicDetails";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    InsertAmount(totalAmount, title, subcategory) {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/CategoryPurchase.asmx/InsertAmount";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, { amount: totalAmount, Description: 'Property Listing purchase for  ' + title + " of " + subcategory })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    InsertSale(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice) {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/Sale.asmx/InsertSale";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {
            'CategoryId': CategoryId, 'SubCategoryId': subCategoryId, 'title': title, 'Features': features, 'address': address.trim(), 'contactNo': contactNo, 'description': description.trim(), 'countryID': countryID, 'StateID': stateID, 'cityID': cityId, 'zipcode': zipcod, 'isFeatured': isFeatured, 'jobtype': jobtype, 'amount': amount, 'advertisementPrice': adsPrice
        })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    InsertCatgoryPostAds(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration) {
        let urlToSelectAllPurchasedCartDataServices: string = "Associate/ws/CategoryPurchase.asmx/InsertCatgoryPostAds";
        return this.apiService.post(urlToSelectAllPurchasedCartDataServices, {
            categoryID: CatID, 'SubcategoryID': SubCatID, 'PlanID': PlanID, 'pricevalues': Price, 'zipcodeID': Zipcode, 'Couponcode': CouponCode, 'Discount': Discount, 'Duration': Duration
        })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }

    AssociateCardExists() {
        let urlToInsertCategory: string = "Associate/ws/CategoryPurchase.asmx/AssociateCardExists";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    CountAssociateAdvertisements() {
        let urlToInsertCategory: string = "Associate/ws/Sale.asmx/CountAssociateAdvertisements";
        return this.apiService.post(urlToInsertCategory, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }


    UpdateSale(CategoryId, SubCategoryId, title, Features, address, contactNo, description, countryID, StateID, cityID, zipcode, amount, id) {
        let urlToUpdateSale: string = "Associate/ws/Sale.asmx/UpdateSale";
        return this.apiService.post(urlToUpdateSale, {
            'CategoryId': CategoryId, 'SubCategoryId': SubCategoryId, 'title': title, 'Features': Features, 'address': address.trim(),
            'contactNo': contactNo, 'description': description.trim(), 'countryID': countryID, 'StateID': StateID, 'cityID': cityID,
            'zipcode': zipcode, 'amount': amount, 'id': id
        }).pipe(map(
            data => {
                return data;
            }
        ));
        //
    }

    AssociatePurchasedCategory(jobcate) {
        let urlToUpdateSale: string = "Associate/ws/Category.asmx/AssociatePurchasedCategory";
        return this.apiService.post(urlToUpdateSale, { jobtype: jobcate }).pipe(map(
            data => {
                return data;
            }
        ));
        //
    }

    SelectedChoicesForPurchase() {
        //
        let urlToUpdateSale: string = "Associate/ws/CategoryPurchase.asmx/SelectCartData";
        return this.apiService.post(urlToUpdateSale, {}).pipe(map(
            data => {
                return data;
            }
        ));
    } //GetAllRecords


    PurchasedItems(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id) {
        //
        let urlToUpdateSale: string = "Associate/ws/CategoryPurchase.asmx/PurchasedItems";
        return this.apiService.post(urlToUpdateSale, { CatID: CategoryID, 'catName': CategoryName, 'subCatName': SubCategoryName, 'subCatID': subCategoryID, 'zipcode': Zipcode, 'price': Price }).pipe(map(
            data => {
                return data;
            }
        ));
    }

    BindMembership() {
        //
        let urlToUpdateSale: string = "Associate/ws/MemberShip.asmx/SelectMemberShip";
        return this.apiService.post(urlToUpdateSale, { flag : 1 }).pipe(map(
            data => {
                return data;
            }
        ));
    }
    


    RemoveItem(id) {
        //
        let urlToUpdateSale: string = "Associate/ws/CategoryPurchase.asmx/RemoveItem";
        return this.apiService.post(urlToUpdateSale, { subCatID: id }).pipe(map(
            data => {
                return data;
            }
        ));
    }

    RemoveItem1(id) {
        //
        let urlToUpdateSale: string = "Associate/ws/CategoryPurchase.asmx/RemoveItem1";
        return this.apiService.post(urlToUpdateSale, { subCatID: id }).pipe(map(
            data => {
                return data;
            }
        ));
    }

    AssociateCategoryExistsOrNot()
    {
        let urlToUpdateSale: string = "Associate/ws/SubCategory.asmx/AssociateCategoryExistsOrNot";
        return this.apiService.post(urlToUpdateSale, { }).pipe(map(
            data => {
                return data;
            }
        ));

    }

    InsertDNew(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price) {
        debugger;

        let urlToUpdateSale: string = "Associate/ws/CategoryPurchase.asmx/InsertDNew";
        return this.apiService.post(urlToUpdateSale, {
            CatID: CategoryID, 'catName': CategoryName, 'subCatName': SubCategoryName, 'zipcode': '0', 'subCatID': subCategoryID, 'price': Price   }).pipe(map(
            data => {
                return data;
            }
        ));

    }

    BindAssociateCategory(CategoryID) {
        debugger;
        let urlToUpdateSale: string = "Associate/ws/subCategory.asmx/AssociateSubCategory";
        return this.apiService.post(urlToUpdateSale, {
            Categoryid: CategoryID
        }).pipe(map(
            data => {
                return data;
            }
        ));

    }

    MurchantPurchaseCategories(): Observable<any> {

        let urlToMurchantPurchaseCategory: string = "Associate/ws/MyCategories.asmx/MuPurchaseCategories";
        return this.apiService.post(urlToMurchantPurchaseCategory, { JobType: '1' })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }


    CountPurchasedCategories() {

        let urlToUpdateSale: string = "Associate/ws/MyCategories.asmx/CountPurchasedCategories";
        return this.apiService.post(urlToUpdateSale, {
            jobtype:1
        }).pipe(map(
            data => {
                return data;
            }
        ));

    }

    BindAllCategories() {

        let urlToUpdateSale: string = "Associate/ws/Category.asmx/JobtypeWiseCategory";
        return this.apiService.post(urlToUpdateSale, { 'flag':'1','jobtype':'1' }).pipe(map(
            data => {
                return data;
            }
        ));

    }


    GetPostAdvertisementPrice(zipCode, subCategory)
    {

        let urlToUpdateSale: string = "Associate/ws/CategoryPurchase.asmx/GetPostAdvertisementPrice";
        return this.apiService.post(urlToUpdateSale, { 'zip': zipCode, 'subCategoryID': subCategory })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    

}   
