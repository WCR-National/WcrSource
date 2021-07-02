import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


import { map, distinctUntilChanged, delay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { PlatformLocation } from '@angular/common';


@Injectable()
export class UserService {
    returnUrl: string;
    private currentUserSubject = new ReplaySubject<User>();
    public currentUser = this.currentUserSubject.asObservable();

    public isAuthenticated_extra = false;

    private isAuthenticatedConsumerSubject = new ReplaySubject<boolean>(1);
    public isAuthenticatedConsumer = this.isAuthenticatedConsumerSubject.asObservable();

    private isAuthenticatedAssociateSubject = new ReplaySubject<boolean>(1);
    public isAuthenticatedAssociate = this.isAuthenticatedAssociateSubject.asObservable();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private user: User = null,
        private apiService: ApiService = null,
        private http: HttpClient = null,
        private jwtService: JwtService = null,
        private router: Router,
        private route: ActivatedRoute,
        private platformLocation: PlatformLocation,
        private ngZone: NgZone

    ) { }

    populate() {
        debugger;
        // If JWT detected, attempt to get & store user's info
        if (localStorage.getItem('jwtToken')) {
            var user: any = JSON.parse(localStorage.getItem('jwtToken'));
            if (user.type == "1") { //associate
                var credentials: any = {};
                credentials.email = user.email;

                this.associateLoginSessionActivate("", credentials, user.id)
                    .subscribe((data) => {
                        debugger;
                        if (data.d == "1") {
                            this.router.navigate(['/associates']);
                            //this.user.token = this.token();
                            //this.user.email = credentials.email;
                            //this.user.id = user.id;
                            //this.user.type = "1";
                            //this.setAuth(this.user);
                        }
                        else {
                            this.purgeAuth();
                        }
                    });
            }
            else if (user.type == "2") {
                debugger;

                var credentials: any = {};
                credentials.email = user.email;
                this.consumerLoginSessionActivate("", credentials, user.id)
                    .subscribe((data: any) => {
                        if (data.d == "1") {
                            this.router.navigate(['/consumer-dashboard']);
                            //this.user.token = this.token();
                            //this.user.email = credentials.email;
                            //this.user.id = user.id;
                            //this.user.type = "2";
                            //this.setAuth(this.user);
                        }
                        else {
                            this.purgeAuth();
                        }
                    });
            }
        }
        else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
            //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
            //this.ngZone.run(() => this.router.navigate([url]));
        }
    }

    setAuth(user: User) {
        debugger;
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        //this.startRefreshTokenTimer();
        debugger;
        // Set isAuthenticated to true
        if (user.type == "1") {
            this.isAuthenticated_extra = true;
            this.isAuthenticatedAssociateSubject.next(true);
        }
        else if (user.type == "2") {
            this.isAuthenticatedConsumerSubject.next(true);
        }
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedAssociateSubject.next(false);
        this.isAuthenticatedConsumerSubject.next(false);
        this.isAuthenticatedSubject.next(false);


        //this.isAuthenticated_extra = false;
    }




    private refreshTokenTimeout;

    //private startRefreshTokenTimer() {
    //    // parse json object from base64 encoded jwt token
    //    //const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    //    // set a timeout to refresh the token a minute before it expires
    //    const expires = new Date(100 * 1000);
    //    const timeout = expires.getTime() - Date.now() - (20 * 60);
    //    this.refreshTokenTimeout = setTimeout(() => this.populate(), timeout);
    //}

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }


    //// Verify JWT in localstorage with server & load user's info.
    //// This runs once on application startup.
    //populate() {
    //    debugger;
    //    // If JWT detected, attempt to get & store user's info
    //    if (localStorage.getItem('jwtToken')) {
    //        var user: any = JSON.parse(localStorage.getItem('jwtToken'));
    //        this.isAssociate = 0;
    //        this.isAssociate = 0;
    //        if (user.type == "1") { //associate
    //            var credentials: any = {};
    //            credentials.email = user.email;

    //            this.associateLoginSessionActivate("", credentials, user.id)
    //                .then((data: any) => {
    //                    if (data.d == "1")
    //                    {
    //                        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    //                        if (this.returnUrl == '') {

    //                            this.isAssociate = 1;
    //                            let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
    //                            this.ngZone.run(() => this.router.navigate(['/associates']));
    //                            //this.router.navigateByUrl(url);
    //                        }
    //                        else {
    //                            this.ngZone.run(() => this.router.navigate([this.returnUrl]));
    //                            //this.router.navigateByUrl('');
    //                        }
    //                    }
    //                    else {
    //                        //this.ngZone.run(() => this.router.navigate(['/']));

    //                        //this.router.navigateByUrl('/');
    //                        this.isAssociate = 0;

    //                        this.purgeAuth();
    //                        //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
    //                        //this.ngZone.run(() => this.router.navigate([url]));
    //                    }
    //                });
    //        }
    //        else if (user.type == "2") {
    //            debugger;

    //            var credentials: any = {};
    //            credentials.email = user.email;
    //            //window.location.href = "ConsumerDashboard.html";
    //            //this.ngZone.run(() => this.router.navigate(['/ConsumerDashboard.html']));
    //            this.consumerLoginSessionActivate("", credentials, user.id)
    //                .then((data: any) => {
    //                    if (data.d == "1")
    //                    {
                           
    //                        this.isConsumer = 1;
    //                        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    //                        if (this.returnUrl == '') {
    //                            let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
    //                            this.ngZone.run(() => this.router.navigate([url]));
    //                            //this.router.navigateByUrl(url);
    //                        }
    //                        else {
    //                            this.ngZone.run(() => this.router.navigate([this.returnUrl]));
    //                            //this.router.navigateByUrl('');
    //                        }
    //                        //this.ngZone.run(() => this.router.navigate(['/']));
    //                        //this.router.navigateByUrl('/');
    //                    }
    //                    else
    //                    {
    //                        //this.ngZone.run(() => this.router.navigate(['/consumer-dashboard']));
    //                        //this.router.navigateByUrl('/');
    //                        this.isConsumer = 0;
    //                        this.purgeAuth();

    //                        //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
    //                        //this.ngZone.run(() => this.router.navigate([url]));
    //                    }
    //                });
    //        }
    //    }
    //    else {
    //        // Remove any potential remnants of previous auth states
    //        this.purgeAuth();
    //        //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
    //        //this.ngZone.run(() => this.router.navigate([url]));
    //    }
    //}

    //setAuth(user: User) {
        
    //    // Save JWT sent from server in localstorage
    //    this.jwtService.saveToken(user);
    //    // Set current user data into observable
    //    this.currentUserSubject.next(user);
    //    // Set isAuthenticated to true
    //    this.isAuthenticatedSubject.next(true);

    //    this.isAuthenticated_extra = true;
    //    console.log(this.isAuthenticated_extra);
    //}

    //purgeAuth() {
    //    // Remove JWT from localstorage
    //    this.jwtService.destroyToken();
    //    // Set current user to an empty object
    //    this.currentUserSubject.next({} as User);
    //    // Set auth status to false
    //    this.isAuthenticatedSubject.next(false);
    //    this.isAuthenticated_extra = false;
    //}

    rand() {
        return Math.random().toString(36).substr(2); // remove `0.`
    }

    token() {
        return this.rand() + this.rand(); // to make it longer
    }

    attemptAssociateAccountExists(type, credentials): Observable<any> {

        let urlToSignUp: string = "ws/AssociateRegistration.asmx/AssociateAccountExists";// + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return this.apiService.post(urlToSignUp, { EmailID: credentials.email })
            .pipe(map(
                data => {
                    

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
        //            

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

    attempConsumerAccountExists(type, credentials) {

        let urlToSignUp: string = "ws/AssociateRegistration.asmx/ConsumerAccountExists";// + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return this.apiService.post(urlToSignUp, { EmailID: credentials.email }).toPromise();
        //.pipe(map(
        //    data => {
        //        return data;
        //    }
        //));
    }

    attemptAssociateAuth(type, credentials) : any {
       
        let urlToSignIn: string = "ws/AssociateRegistration.asmx/AssociateLogin";
        return this.apiService.post(urlToSignIn, { EmailID: credentials.email, Password: credentials.passwordGroup.password })
            .pipe(map(
                data => {

                    return data;
                }
            ));

        //urlToSignIn "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + uname + "&Password=" + pass + ""
        //let urlToSignIn: string = "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "";
        //return await this.apiService.post(urlToSignIn, {})
        //    .pipe(map(
        //        data => {
        //            
        //            this.user.email = credentials.email;
        //            this.user.password = credentials.password;
        //            this.user.token = this.token();
        //            this.setAuth(this.user);
        //            return data;
        //        }
        //    )).toPromise();
    }

    attemptConsumerAuth(type, credentials): any {
        
        //urlToSignIn "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + uname + "&Password=" + pass + ""
        let urlToSignIn: string = "ws/AssociateRegistration.asmx/ConsumerLogin";
        return this.apiService.post(urlToSignIn, { EmailID: credentials.email, Password: credentials.passwordGroup.password })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    consumerLoginSessionActivate(type, credentials, associateID): Observable<any> | any{
        
        let urlToSignInSessionActivation: string = "ws/AssociateRegistration.asmx/ConsumerLoginSessionActivate";
       return this.apiService.post(urlToSignInSessionActivation, { username: credentials.email, assoID: associateID })
            .pipe(map(
                data => {
                    if (data.d == "1") {

                        this.user.token = this.token();
                        this.user.email = credentials.email;
                        this.user.id = associateID;
                        this.user.type = "2";
                        debugger;
                        this.setAuth(this.user);
                    }
                    return data;
                }
            ));
    }

    associateLoginSessionActivate(type, credentials, associateID): Observable<any> | any {
        //{'username':'" + uname + "','assoID':'" + $(docs).find("AssociateId").text() + "
        
        let urlToSignInSessionActivation: string = "ws/AssociateRegistration.asmx/AssociateLoginSessionActivate";
       return this.apiService.post(urlToSignInSessionActivation, { username: credentials.email, assoID: associateID })
            .pipe(map(
                data => {
                    if (data.d == "1") {
                        this.user.token = this.token();
                        this.user.email = credentials.email;
                        this.user.id = associateID;
                        this.user.type = "1";
                        debugger;
                        this.setAuth(this.user);
                    }
                    return data;
                }
            ));
    }

    attemptLogout() {
        let urlToLogout: string = "ws/AssociateSignUp.ashx?action=ConsumerLogout";
        return this.apiService.post(urlToLogout, {})
            .pipe(map(
                data => {
                    this.purgeAuth();
                    return data;
                }
            ));
    }

    attemptRegisterAssociate(type, credentials): Observable<any> {
        
        //url: "ws/AssociateSignUp.ashx?action=AssociateData&FullName=" + FullName + "&LastName=" + LName + "&EmailID=" + emailID + "&Password=" + password + "&Mobile=" + mobileNo + "&ZipCode=" + ZipCode + "&LicenseState=" + LicenseState + "&LicenseID=" + LicenseID + "&ReferralID=" + RefID + "",

        let urlToSignUp: string = "ws/AssociateSignUp.ashx?action=AssociateData";
        urlToSignUp += "&FullName=" + "0" + "&LastName=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "&Mobile=" + "0" + "&ZipCode=" + "0" + "&LicenseState=" + "0" + "&LicenseID=" + "0" + "&ReferralID=" + 0 + "";

        return this.apiService.post(urlToSignUp, {})
            .pipe(map(
                data => {
                    console.log(data);
                    return data;
                }
            ));
    }

    attemptRegisterationAssociate(credentials): Observable<any> {
        

        let urlToAssociateSignUp: string = "ws/AssociateSignUp.ashx?action=AssociateData&FullName=" + credentials.firstName + "&LastName=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "&Mobile=" + "0" + "&ZipCode=" + "0" + "&LicenseState=" + "0" + "&LicenseID=" + "0" + "&ReferralID=" + 0 + "";

        return this.apiService.post(urlToAssociateSignUp, {})
            .pipe(map(
                data => {
                    console.log(data);
                    return data;
                }
            ));
    }

    attemptRegisterConsumer(type, credentials): Observable<any> {

        //url: "ws/AssociateSignUp.ashx?action=AssociateData&FullName=" + FullName + "&LastName=" + LName + "&EmailID=" + emailID + "&Password=" + password + "&Mobile=" + mobileNo + "&ZipCode=" + ZipCode + "&LicenseState=" + LicenseState + "&LicenseID=" + LicenseID + "&ReferralID=" + RefID + "",

        let urlToSignUp: string = "ws/AssociateSignUp.ashx?action=Consumer";
        urlToSignUp += "&Name=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "&address=" + "0" + "&ZipCode=" + "0" + "&mobile=" + "0" + "";

        return this.apiService.post(urlToSignUp, {})
            .pipe(map(
                data => {
                    console.log(data);
                    return data;
                }
            ));
    }

    //attemptActivateCode(type, credentials): Observable<any> {

    //    let urlToGetActivationCode = "ws/AssociateRegistration.asmx/GetActivationCode";
    //    return this.apiService.post(urlToGetActivationCode, { username: credentials.email })
    //        .pipe(map(
    //            data => {
    //                return data;
    //            }
    //        ));
    //}

    getAttemptVerifiedActivationCodeAssociate(type, credentials) {
        credentials.email = credentials.email.replace(/^"(.*)"$/, '$1');
        let urlToGetActivationCode = "ws/AssociateRegistration.asmx/GetActivationCode";
        return this.apiService.post(urlToGetActivationCode, { username: credentials.email })//.toPromise()
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    async attemptVerifiedActivationCodeAssociate(type, email) {

        let urlToGetActivationCode = "ws/AssociateRegistration.asmx/VerifiedAccount";
        return await this.apiService.post(urlToGetActivationCode, { username: email }).pipe(map((data: any) => {
            if (data.d.length > 0) {
                this.user.token = this.token();
                this.user.email = email;
                this.user.id = "1";
                this.user.type = "1";
                this.setAuth(this.user);
            }
            return data;
        })).toPromise();
            
    }

    getAttemptVerifiedActivationCodeConsumer(type, credentials) {
        credentials.email = credentials.email.replace(/^"(.*)"$/, '$1');
        let urlToGetActivationCode = "ws/ConsumerRegistration.asmx/GetActivationCode";
        return this.apiService.post(urlToGetActivationCode, { username: credentials.email })//.toPromise()
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    async attemptVerifiedActivationCodeConsumer(type, email) {

        let urlToGetActivationCode = "ws/ConsumerRegistration.asmx/VerifiedAccount";
        return await this.apiService.post(urlToGetActivationCode, { username: email }).pipe(map((data: any) => {
            if (data.d.length > 0) {
                this.user.token = this.token();
                this.user.email = email;
                this.user.id = "2";
                this.user.type = "2";
                this.setAuth(this.user);
            }
            return data;
        })).toPromise();
    }

    attemptResendActivateCode(email): Observable<any> {

        let urlToResendActivationCode = "ws/AssociateRegistration.asmx/ResendActivationCode";
        return this.apiService.post(urlToResendActivationCode, { EmailID: email })
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    attemptResetPassword(email): Observable<any> {

        return this.apiService.get('ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email).pipe(map(
            data => {
                return data;
            }
        ));
    }

    async attemptResetAssociatePassword(email) {

        return await this.apiService.post("ws/AssociateSignUp.ashx?action=ResetAssociatePassNew&EmailID=" + email + "", {}).pipe(map(
            data => {
                return data;
            }
        )).toPromise();
    }

    async attemptResetConsumerPassword(email) {

        return await this.apiService.post("ws/AssociateSignUp.ashx?action=ResetConsumerPassNew&EmailID=" + email + "").toPromise();
    }

    //

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

    associateLogout() {


        let urlToAssociateLogout = "ws/AssociateSignUp.ashx?action=AssociateLogout";
        return this.apiService.post(urlToAssociateLogout, {})
            .pipe(map(
                data => {
                    return data;
                }
            ));
    }

    //getCurrentUser(): User {
    //    return '';this.currentUserSubject.value;
    //}

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
