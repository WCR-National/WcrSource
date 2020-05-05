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
export class CustomerSupportService {
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


    submitMessageCustomerSupport(message) {

        let urlToCountAssociateCategories: string = "Associate/ws/AssociateSupport.asmx/AssociateSupportQuery";
        return this.apiService.post(urlToCountAssociateCategories, { 'Messg': message})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    uploadimage(image){
        
        debugger;
        let urlToUploadImage: string = "Associate/ws/UpdatePic.ashx";
        this.http.post(urlToUploadImage, image);

        //return this.apiService.post(urlToUploadImage, { image })
        //    
    }
    
}
