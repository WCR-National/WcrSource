import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


import { map, distinctUntilChanged, delay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';


@Injectable()
export class UserService {
    returnUrl: string;
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    public isAuthenticated_extra = false;

    constructor(private user: User = null,
        private apiService: ApiService = null,
        private http: HttpClient = null,
        private jwtService: JwtService = null,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    //// Verify JWT in localstorage with server & load user's info.
    //// This runs once on application startup.
    populate() {
        debugger;
        // If JWT detected, attempt to get & store user's info
        if (localStorage.getItem('jwtToken')) {
            var user: any = JSON.parse(localStorage.getItem('jwtToken'));
            if (user.type == "1") { //associate
                var credentials: any = {};
                credentials.email = user.email;

                this.associateLoginSessionActivate("", credentials, user.id)
                    .then((data: any) => {
                        if (data.d == "1") {
                            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
                            if (this.returnUrl == '') {
                                this.router.navigateByUrl('/associates');
                            }
                            else {
                                this.router.navigateByUrl('returnUrl');
                            }
                        }
                        else {
                            this.router.navigateByUrl('/');
                        }
                    });
            }
            else if (user.type == "2") {
                var credentials: any = {};
                credentials.email = user.email;
                this.consumerLoginSessionActivate("", credentials, user.id)
                    .then((data: any) => {
                        if (data.d == "1") {
                            this.router.navigateByUrl('/');
                        }
                        else {
                            this.router.navigateByUrl('/');
                        }
                    });
            }
        }
        else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(user: User) {
        debugger;
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);

        this.isAuthenticated_extra = true;
        console.log(this.isAuthenticated_extra);

    }

    purgeAuth() {
        debugger;
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);

        this.isAuthenticated_extra = false;
    }

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


    async attemptAssociateAuth(type, credentials) {
        debugger;

        let urlToSignIn: string = "ws/AssociateRegistration.asmx/AssociateLogin";
        return await this.apiService.post(urlToSignIn, { EmailID: credentials.email, Password: credentials.passwordGroup.password })
            .pipe(map(
                data => {

                    return data;
                }
            )).toPromise();

        //urlToSignIn "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + uname + "&Password=" + pass + ""
        //let urlToSignIn: string = "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "";
        //return await this.apiService.post(urlToSignIn, {})
        //    .pipe(map(
        //        data => {
        //            debugger;
        //            this.user.email = credentials.email;
        //            this.user.password = credentials.password;
        //            this.user.token = this.token();
        //            this.setAuth(this.user);
        //            return data;
        //        }
        //    )).toPromise();
    }

    async attemptConsumerAuth(type, credentials) {
        debugger;
        //urlToSignIn "ws/AssociateSignUp.ashx?action=ConsumerLog&EmailID=" + uname + "&Password=" + pass + ""
        let urlToSignIn: string = "ws/AssociateRegistration.asmx/ConsumerLogin";
        return await this.apiService.post(urlToSignIn, { EmailID: credentials.email, Password: credentials.passwordGroup.password })
            .pipe(map(
                data => {
                    return data;
                }
            )).toPromise();
    }

    async consumerLoginSessionActivate(type, credentials, associateID) {

        debugger;
        let urlToSignInSessionActivation: string = "ws/AssociateRegistration.asmx/ConsumerLoginSessionActivate";
        return await this.apiService.post(urlToSignInSessionActivation, { username: credentials.email, assoID: associateID })
            .pipe(map(
                data => {
                    if (data.d == "1") {

                        this.user.token = this.token();
                        this.user.email = credentials.email;
                        this.user.id = associateID;
                        this.user.type = "2";
                        this.setAuth(this.user);

                    }
                    return data;
                }
            )).toPromise();
    }

    async associateLoginSessionActivate(type, credentials, associateID) {
        //{'username':'" + uname + "','assoID':'" + $(docs).find("AssociateId").text() + "
        debugger;
        let urlToSignInSessionActivation: string = "ws/AssociateRegistration.asmx/AssociateLoginSessionActivate";
        return await this.apiService.post(urlToSignInSessionActivation, { username: credentials.email, assoID: associateID })
            .pipe(map(
                data => {
                    if (data.d == "1") {
                        this.user.token = this.token();
                        this.user.email = credentials.email;
                        this.user.id = associateID;
                        this.user.type = "1";
                        this.setAuth(this.user);
                    }
                    return data;
                }
            )).toPromise();
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
        debugger;
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
        return await this.apiService.post(urlToGetActivationCode, { username: email }).toPromise()
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
        return await this.apiService.post(urlToGetActivationCode, { username: email }).toPromise()
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
