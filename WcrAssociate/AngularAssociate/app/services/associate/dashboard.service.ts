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
export class DashboardService {
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

    attemptAssociateAccountExists(type, credentials): Observable<any> {

        let urlToSignUp: string = "ws/AssociateRegistration.asmx/AssociateAccountExists";// + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return this.apiService.post(urlToSignUp, { EmailID: credentials.email })
            .pipe(map(
                data => {
                    debugger;

                    //if (data.d.length > 0) {
                    //    this.user.email = credentials.email;
                    //    this.user.password = credentials.password;
                    //    this.user.token = this.token();
                    //    this.setAuth(this.user);
                    //}
                    return data;
                }
            ));

        //let urlToSignUp: string = "ws/AssociateSignUp.ashx?action=AssociateLog&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        //return this.apiService.post( urlToSignUp, {})
        //    .pipe(map(
        //        data => {
        //            debugger;

        //            if (data > '0') {
        //                this.user.email = credentials.email;
        //                this.user.password = credentials.password;
        //                this.user.token = this.token();
        //                this.setAuth(this.user);
        //            }
        //            return data;
        //        }
        //    ));
    }

    async attempConsumerAccountExists(type, credentials) {

        let urlToSignUp: string = "ws/AssociateRegistration.asmx/ConsumerAccountExists";// + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return await this.apiService.post(urlToSignUp, { EmailID: credentials.email }).toPromise();
        //.pipe(map(
        //    data => {
        //        return data;
        //    }
        //));
    }

    
    validateEmail(email) {

        return this.apiService.get('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email)
            .pipe(
                map(
                    (data) => { return data; })
            );
    }

    emailAlreadyTaken(email) {

        return this.apiService.post('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email, {})
            .pipe(delay(300));
    }


    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }
    // Update the user on the server (email, pass, etc)
    update(user): Observable<User> {
        return this.apiService
            .put('/user', { user })
            .pipe(map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }
}
