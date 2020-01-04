import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';
import { map, distinctUntilChanged } from 'rxjs/operators';
var UserService = /** @class */ (function () {
    function UserService(user, apiService, http, jwtService) {
        if (user === void 0) { user = null; }
        if (apiService === void 0) { apiService = null; }
        if (http === void 0) { http = null; }
        if (jwtService === void 0) { jwtService = null; }
        this.user = user;
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.currentUserSubject = new BehaviorSubject({});
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
        this.isAuthenticatedSubject = new ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
    //// Verify JWT in localstorage with server & load user's info.
    //// This runs once on application startup.
    UserService.prototype.populate = function () {
        var _this = this;
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('/')
                .subscribe(function (data) { return _this.setAuth(data.user); }, function (err) { return _this.purgeAuth(); });
        }
        else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    };
    UserService.prototype.setAuth = function (user) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    };
    UserService.prototype.purgeAuth = function () {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({});
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    };
    UserService.prototype.rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    UserService.prototype.token = function () {
        return this.rand() + this.rand(); // to make it longer
    };
    UserService.prototype.attemptAssociateAccountExists = function (type, credentials) {
        var urlToSignUp = "ws/AssociateRegistration.asmx/AssociateAccountExists"; // + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
        return this.apiService.post(urlToSignUp, { EmailID: credentials.email })
            .pipe(map(function (data) {
            debugger;
            //if (data.d.length > 0) {
            //    this.user.email = credentials.email;
            //    this.user.password = credentials.password;
            //    this.user.token = this.token();
            //    this.setAuth(this.user);
            //}
            return data;
        }));
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
    };
    UserService.prototype.attempConsumerAccountExists = function (type, credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignUp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToSignUp = "ws/AssociateRegistration.asmx/ConsumerAccountExists";
                        return [4 /*yield*/, this.apiService.post(urlToSignUp, { EmailID: credentials.email }).toPromise()];
                    case 1: // + credentials.email + "&Password=" + credentials.passwordGroup.password + ""
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.attemptAssociateAuth = function (type, credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignIn;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        urlToSignIn = "ws/AssociateRegistration.asmx/AssociateLogin";
                        return [4 /*yield*/, this.apiService.post(urlToSignIn, { EmailID: credentials.email, Password: credentials.passwordGroup.password })
                                .pipe(map(function (data) {
                                return data;
                            })).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.attemptConsumerAuth = function (type, credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignIn;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        urlToSignIn = "ws/AssociateRegistration.asmx/ConsumerLogin";
                        return [4 /*yield*/, this.apiService.post(urlToSignIn, { EmailID: credentials.email, Password: credentials.passwordGroup.password })
                                .pipe(map(function (data) {
                                return data;
                            })).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.consumerLoginSessionActivate = function (type, credentials, associateID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignInSessionActivation;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        urlToSignInSessionActivation = "ws/AssociateRegistration.asmx/ConsumerLoginSessionActivate";
                        return [4 /*yield*/, this.apiService.post(urlToSignInSessionActivation, { username: credentials.email, assoID: associateID })
                                .pipe(map(function (data) {
                                return data;
                            })).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.associateLoginSessionActivate = function (type, credentials, associateID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToSignInSessionActivation;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //{'username':'" + uname + "','assoID':'" + $(docs).find("AssociateId").text() + "
                        debugger;
                        urlToSignInSessionActivation = "ws/AssociateRegistration.asmx/AssociateLoginSessionActivate";
                        return [4 /*yield*/, this.apiService.post(urlToSignInSessionActivation, { username: credentials.email, assoID: associateID })
                                .pipe(map(function (data) {
                                return data;
                            })).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.attemptLogout = function () {
        var _this = this;
        var urlToLogout = "ws/AssociateSignUp.ashx?action=ConsumerLogout";
        return this.apiService.post(urlToLogout, {})
            .pipe(map(function (data) {
            _this.purgeAuth();
            return data;
        }));
    };
    UserService.prototype.attemptRegisterAssociate = function (type, credentials) {
        debugger;
        //url: "ws/AssociateSignUp.ashx?action=AssociateData&FullName=" + FullName + "&LastName=" + LName + "&EmailID=" + emailID + "&Password=" + password + "&Mobile=" + mobileNo + "&ZipCode=" + ZipCode + "&LicenseState=" + LicenseState + "&LicenseID=" + LicenseID + "&ReferralID=" + RefID + "",
        var urlToSignUp = "ws/AssociateSignUp.ashx?action=AssociateData";
        urlToSignUp += "&FullName=" + "0" + "&LastName=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "&Mobile=" + "0" + "&ZipCode=" + "0" + "&LicenseState=" + "0" + "&LicenseID=" + "0" + "&ReferralID=" + 0 + "";
        return this.apiService.post(urlToSignUp, {})
            .pipe(map(function (data) {
            console.log(data);
            return data;
        }));
    };
    UserService.prototype.attemptRegisterConsumer = function (type, credentials) {
        //url: "ws/AssociateSignUp.ashx?action=AssociateData&FullName=" + FullName + "&LastName=" + LName + "&EmailID=" + emailID + "&Password=" + password + "&Mobile=" + mobileNo + "&ZipCode=" + ZipCode + "&LicenseState=" + LicenseState + "&LicenseID=" + LicenseID + "&ReferralID=" + RefID + "",
        var urlToSignUp = "ws/AssociateSignUp.ashx?action=Consumer";
        urlToSignUp += "&FullName=" + "0" + "&LastName=" + "0" + "&EmailID=" + credentials.email + "&Password=" + credentials.passwordGroup.password + "&Mobile=" + "0" + "&ZipCode=" + "0" + "&LicenseState=" + "0" + "&LicenseID=" + "0" + "&ReferralID=" + 0 + "";
        return this.apiService.post(urlToSignUp, {})
            .pipe(map(function (data) {
            console.log(data);
            return data;
        }));
    };
    //attemptActivateCode(type, credentials): Observable<any> {
    //    let urlToGetActivationCode = "ws/AssociateRegistration.asmx/GetActivationCode";
    //    return this.apiService.post(urlToGetActivationCode, { username: credentials.email })
    //        .pipe(map(
    //            data => {
    //                return data;
    //            }
    //        ));
    //}
    UserService.prototype.getAttemptVerifiedActivationCodeAssociate = function (type, email) {
        var urlToGetActivationCode = "ws/AssociateRegistration.asmx/GetActivationCode";
        return this.apiService.post(urlToGetActivationCode, { username: email }) //.toPromise()
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptVerifiedActivationCodeAssociate = function (type, email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToGetActivationCode;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToGetActivationCode = "ws/ConsumerRegistration.asmx/VerifiedAccount";
                        return [4 /*yield*/, this.apiService.post(urlToGetActivationCode, { username: email }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getAttemptVerifiedActivationCodeConsumer = function (type, email) {
        var urlToGetActivationCode = "ws/ConsumerRegistration.asmx/GetActivationCode";
        return this.apiService.post(urlToGetActivationCode, { username: email }) //.toPromise()
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptVerifiedActivationCodeConsumer = function (type, email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var urlToGetActivationCode;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlToGetActivationCode = "ws/ConsumerRegistration.asmx/GetActivationCode";
                        return [4 /*yield*/, this.apiService.post(urlToGetActivationCode, { username: email }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.attemptResendActivateCode = function (email) {
        var urlToResendActivationCode = "ws/AssociateRegistration.asmx/ResendActivationCode";
        return this.apiService.post(urlToResendActivationCode, { EmailID: email })
            .pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptResetPassword = function (email) {
        return this.http.get(environment.apiEndPoint + 'ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email).pipe(map(function (data) {
            return data;
        }));
    };
    UserService.prototype.attemptResetAssociatePassword = function (email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post("ws/AssociateSignUp.ashx?action=ResetAssociatePassNew&EmailID=" + email + "", {}).pipe(map(function (data) {
                            return data;
                        })).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.attemptResetConsumerPassword = function (email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.post("ws/AssociateSignUp.ashx?action=ResetConsumerPassNew&EmailID=" + email + "").toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //
    UserService.prototype.validateEmail = function (email) {
        return this.http.get(environment.apiEndPoint + 'ws/AssociateSignUp.ashx?action=RecordExists&EmailID=' + email)
            .pipe(map(function (data) { return data; }));
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUserSubject.value;
    };
    // Update the user on the server (email, pass, etc)
    UserService.prototype.update = function (user) {
        var _this = this;
        return this.apiService
            .put('/user', { user: user })
            .pipe(map(function (data) {
            // Update the currentUser observable
            _this.currentUserSubject.next(data.user);
            return data.user;
        }));
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [User,
            ApiService,
            HttpClient,
            JwtService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map