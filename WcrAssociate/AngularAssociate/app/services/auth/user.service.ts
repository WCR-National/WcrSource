import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';

import { map, distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService
    ) { }

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('/user')
                .subscribe(
                    data => this.setAuth(data.user),
                    err => this.purgeAuth()
                );
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(user: User) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type, credentials): Observable<any> {

        let urlToSignUp: String = "ws/AssociateSignUp.ashx?action=AssociateLog&EmailID=" + credentials.email + "&Password=" + credentials.password + ""
        return this.apiService.post(environment.apiEndPoint + urlToSignUp, {})
            .pipe(map(
                data => {
                    if (data > '0') {
                        this.setAuth(data.user);
                    }
                    return data;
                }
            ));
    }

    attemptConsumerAuth(type, credentials): Observable<any> {
        //urlToSignIn "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + uname + "&Password=" + pass + ""
        let urlToSignIn: String = "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + credentials.email + "&Password=" + credentials.password + "";
        return this.apiService.post(environment.apiEndPoint + urlToSignIn, {})
            .pipe(map(
                data => {
                    this.setAuth(data.user);
                    return data;
                }
            ));
    }

    attemptRegister(type, credentials): Observable<number> {

        let urlToSignUp: String = "ws/AssociateSignUp.ashx?action=AssociateData";
        urlToSignUp += "FullName=" + "0" + "&LastName=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.password + "&Mobile=" + "0" + "&ZipCode=" + "0" + "&LicenseState=" + "0" + "&LicenseID=" + "0" + "&ReferralID=" + 0 + "";

        return this.apiService.post(environment.apiEndPoint + urlToSignUp, { user: credentials })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptActivateCode(type, credentials): Observable<any> {

        let urlToGetActivationCode = "ws/AssociateRegistration.asmx/GetActivationCode";
        return this.apiService.post(environment.apiEndPoint + urlToGetActivationCode, { username: credentials.email })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptVerfiedActivationCode(type, email): Observable<any> {

        let urlToGetActivationCode = "ws/AssociateRegistration.asmx/VerifiedAccount";
        return this.apiService.post(environment.apiEndPoint + urlToGetActivationCode, { username: email })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptResendActivateCode(email): Observable<any> {

        let urlToResendActivationCode = "ws/AssociateRegistration.asmx/ResendActivationCode";
        return this.apiService.post(environment.apiEndPoint + urlToResendActivationCode, { EmailID: email })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptResetPassword(email): Observable<any> {

        return this.http.get(environment.apiEndPoint + 'ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email).pipe(map(
            data => {
                return data;
            }
        ));
    }

    attemptResetAssociatePassword(email): Observable<any> {

        return this.http.get(environment.apiEndPoint + "ws/AssociateSignUp.ashx?action=ResetAssociatePassNew&EmailID=" + email + "").pipe(map(
            data => {
                return data;
            }
        ));
    }

    attemptResetConsumerPassword(email): Observable<any> {

        return this.http.get(environment.apiEndPoint + "ws/AssociateSignUp.ashx?action=ResetConsumerPassNew&EmailID=" + email + "").pipe(map(
            data => {
                return data;
            }
        ));
    }

    //

    validateEmail(email) {
        return this.http.get(environment.apiEndPoint + 'ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email).pipe(map(
            data => {
                return data;
            }
        ));
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
