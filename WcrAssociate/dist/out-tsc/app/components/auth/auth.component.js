import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/auth';
import * as $ from 'jquery';
var AuthComponent = /** @class */ (function () {
    function AuthComponent(route, router, userService, fb) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.authType = '';
        this.title = '';
        this.errors = { errors: {} };
        this.isSubmitting = false;
        this.showLoadingGif = false;
        this.resentCode = false;
        this.activationSent = false;
        this.showOnValidateEmail = false;
        this.showErrorsPassword = false;
        this.showActivationDiv = false;
        this.resetPassword = false;
        this.FormFilledSuccessfully = false;
        this.validationMessages = {
            'email': {
                'required': 'Email is required',
                'email': 'Email is not in correct format.',
                'emailInUse': 'This Email address is not available. Please Try another email address.'
            },
            'password': {
                'required': 'Password is required',
                'minlength': 'Min of 8 char in length',
                'maxlength': 'Max of 20 char in length',
                'number': 'At least one number.',
                'lowerLetter': 'At least one lowercase.',
                'upperLetter': 'At least one uppercase.',
                'hasSpecialCharacters': 'At least one special character.'
            },
            'confirmPassword': {
                'required': 'Confirm password is required',
            },
            'passwordGroup': {
                'passwordMismatch': 'Password and Confirm password does not match.'
            },
            'activationCode': {
                'required': 'Activation code is required',
                'notValidCode': 'Activation code is not valid',
            },
            'terms': {
                'required': 'You must accept terms and conditions'
            },
            'loginCredentials': {
                'error': 'User Authentication Failed. Please verify your credentials'
            }
        };
        this.formErrors = {
            'email': '',
            'password': '',
            'confirmPassword': '',
            'passwordGroup': '',
            'associate': '',
            'consumer': '',
            'activationCode': '',
            'terms': '',
            'loginCredentials': ''
        };
    }
    AuthComponent.prototype.ngOnInit = function () {
        this.setValidationOnform();
        this.setSignInOrSignUpOrActivateOrReset();
        this.changeValuesOfFormsEvents();
    };
    AuthComponent.prototype.changeValuesOfFormsEvents = function () {
        var _this = this;
        this.authForm.valueChanges.subscribe(function (data) {
            _this.logValidationErrors(_this.authForm);
        });
        this.authForm.get('associate').valueChanges.subscribe(function (data) {
            debugger;
            if (data == true) {
                _this.authForm.get('terms').enable();
            }
            else if (data == false && _this.authForm.get('consumer').value == false) {
                _this.authForm.get('terms').disable();
            }
        });
        this.authForm.get('consumer').valueChanges.subscribe(function (data) {
            debugger;
            if (data == true) {
                _this.authForm.get('terms').enable();
            }
            else if (data == false && _this.authForm.get('associate').value == false) {
                _this.authForm.get('terms').disable();
            }
        });
        this.authForm.get('terms').valueChanges.subscribe(function (data) {
            debugger;
            if (data == false) {
                _this.FormFilledSuccessfully = false;
            }
            else {
                _this.FormFilledSuccessfully = true;
            }
        });
        //this.authForm.get('terms').valueChanges.subscribe((data) => {
        //    if (data == true) {
        //        this.authForm.;
        //    }
        //    else if (data == "false" && this.authForm.get('associate').value == "false") {
        //        this.authForm.get('terms').disable();
        //    }
        //});
    };
    AuthComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.authForm; }
        Object.keys(group.controls).forEach(function (key) {
            var abstractControl = group.get(key);
            _this.formErrors[key] = '';
            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                _this.formErrors[key] = "";
                var messages = _this.validationMessages[key];
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            _this.formErrors[key] += messages[errorKey] + ' ';
                        }
                    }
                    //if (key == "password") {
                    //}
                }
            }
            if (abstractControl instanceof FormGroup) {
                _this.logValidationErrors(abstractControl);
            }
        });
    };
    AuthComponent.prototype.setValidationOnform = function () {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, isEmailExist(this.userService, this)]],
            passwordGroup: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
                        patternValidator(/\d/, { number: true }),
                        patternValidator(/[A-Z]/, { upperLetter: true }),
                        patternValidator(/[a-z]/, { lowerLetter: true }),
                        patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
                        //regexValidatorNumbers(new RegExp('^[0-9]+$'), this),
                        //regexValidatorLower(new RegExp('/[a-z]/g'), this),
                        //regexValidatorCapital(new RegExp('/[A-Z]/g'), this),
                        //regexValidatorSpecial(new RegExp('/[^\w\s]/gi'), this)
                    ]],
                confirmPassword: ['', [Validators.required,]],
            }, { validator: matchPasswords }),
            associate: [''],
            consumer: [''],
            terms: ['', Validators.required],
            activationCode: ['', Validators.required],
            submitButton: ['']
        });
    };
    AuthComponent.prototype.setSignInOrSignUpOrActivateOrReset = function () {
        var _this = this;
        this.route.url.subscribe(function (data) {
            // Get the last piece of the URL (it's either 'login' or 'register')
            debugger;
            _this.authType = data[0].path;
            // Set a title for the page accordingly
            if (_this.authType === 'login') {
                _this.title = 'Sign in';
                _this.authForm.get('email').clearValidators();
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('email').setValidators([Validators.required, Validators.email]);
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('passwordGroup').clearValidators();
                _this.authForm.get('passwordGroup').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('password').setValidators([Validators.required]);
                _this.authForm.get('passwordGroup').get('password').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('confirmPassword').clearValidators();
                _this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();
                _this.authForm.get('associate').clearValidators();
                _this.authForm.get('associate').updateValueAndValidity();
                _this.authForm.get('consumer').clearValidators();
                _this.authForm.get('consumer').updateValueAndValidity();
                _this.authForm.get('terms').clearValidators();
                _this.authForm.get('terms').updateValueAndValidity();
                _this.authForm.get('activationCode').clearValidators();
                _this.authForm.get('activationCode').updateValueAndValidity();
            }
            else if (_this.authType === 'register') {
                _this.authForm.get('email').setValidators([Validators.required, Validators.email, isEmailExist(_this.userService, _this)]);
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20),
                    patternValidator(/\d/, { number: true }),
                    patternValidator(/[A-Z]/, { upperLetter: true }),
                    patternValidator(/[a-z]/, { lowerLetter: true }),
                    patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
                ]);
                _this.authForm.get('passwordGroup').get('password').updateValueAndValidity();
                _this.authForm.get('passwordGroup').setValidators([matchPasswords]);
                _this.authForm.get('passwordGroup').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('confirmPassword').setValidators([Validators.required]);
                _this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();
                _this.authForm.get('terms').setValidators([Validators.required]);
                _this.authForm.get('terms').updateValueAndValidity();
                _this.authForm.get('passwordGroup').disable();
                _this.authForm.get('passwordGroup').get('password').disable();
                _this.authForm.get('passwordGroup').get('confirmPassword').disable();
                _this.authForm.get('associate').disable();
                _this.authForm.get('consumer').disable();
                _this.authForm.get('terms').disable();
                _this.authForm.get('activationCode').clearValidators();
                _this.authForm.get('terms').updateValueAndValidity();
                _this.title = 'Sign up';
            }
            else if (_this.authType === 'activate') {
                _this.authForm.get('email').clearValidators();
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('passwordGroup').clearValidators();
                _this.authForm.get('passwordGroup').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('password').clearValidators();
                _this.authForm.get('passwordGroup').get('password').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('confirmPassword').clearValidators();
                _this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();
                //this.authForm.get('associate').clearValidators();
                //this.authForm.get('consumer').clearValidators();
                _this.authForm.get('terms').clearValidators();
                _this.authForm.get('terms').updateValueAndValidity();
                _this.authForm.get('activationCode').setValidators([Validators.required]);
                _this.authForm.get('activationCode').updateValueAndValidity();
                _this.title = 'Account Activation';
            }
            else if (_this.authType === 'resetPassword') {
                //this.resetPassword = true;
                _this.authForm.get('email').enable();
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('email').setValidators([Validators.required, Validators.email]);
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('passwordGroup').clearValidators();
                _this.authForm.get('passwordGroup').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('password').clearValidators();
                _this.authForm.get('passwordGroup').get('password').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('confirmPassword').clearValidators();
                _this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();
                //this.authForm.get('associate').clearValidators();
                //this.authForm.get('associate').updateValueAndValidity();
                //this.authForm.get('consumer').clearValidators();
                //this.authForm.get('associate').updateValueAndValidity();
                _this.authForm.get('terms').clearValidators();
                _this.authForm.get('terms').updateValueAndValidity();
                _this.authForm.get('activationCode').clearValidators();
                _this.authForm.get('activationCode').updateValueAndValidity();
                _this.title = 'Reset Password';
            }
        });
    };
    /**
     * *************************************************
     * LOGIN Module Start
     * *************************************************
    **/
    AuthComponent.prototype.submitLoginForm = function (email, password) {
        var _this = this;
        if (email === void 0) { email = ""; }
        if (password === void 0) { password = ""; }
        this.isSubmitting = true;
        debugger;
        //this.errors = { errors: {} };
        if (email != "" && password != "") {
            this.router.navigateByUrl('/');
        }
        var thisStatus = this;
        var credentials = this.authForm.value;
        this.userService
            .attemptAssociateAccountExists(this.authType, credentials)
            .subscribe(function (data) {
            var xmlDoc = $.parseXML(data.d);
            var xml = $(xmlDoc);
            var docs = xml.find("associateExists");
            $.each(docs, function (i, docs) {
                if ($(docs).find("AccountId").text() == "0") {
                    //for associate Login
                    thisStatus.userService.attempConsumerAccountExists(thisStatus.authType, credentials)
                        .then(function (data1) {
                        if (data1.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data1.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("consumerExists");
                            $.each(docs1, function (i, docs1) {
                                if ($(docs1).find("AccountId").text() == "0") {
                                    thisStatus.formErrors.loginCredentials = "User Authentication Failed. Please verify your credentials";
                                }
                                else if ($(docs1).find("Status").text() == "0" && $(docs1).find("IsEmailVerified").text() == "0") {
                                }
                                else if ($(docs1).find("Status").text() == "0" && $(docs1).find("IsEmailVerified").text() == "1") {
                                    thisStatus.formErrors.loginCredentials = "Your Account has been deactivated. Contact support at: support@wcrnational.com or 866.456.7331";
                                }
                                else {
                                    thisStatus.LoginAssociateOrConsumer(credentials, 2); //Associate
                                }
                            });
                        }
                    });
                }
                else if ($(docs).find("Status").text() == "0" && $(docs).find("IsEmailVerified").text() == "0") {
                    // window.location.href = "UserAccountActivation.aspx?email=" + uname + "&uType=" + lbluserType.value + "&aid=" + $(docs).find("AccountId").text();
                }
                else if ($(docs).find("Status").text() == "0" && $(docs).find("IsEmailVerified").text() == "1") {
                    thisStatus.formErrors.loginCredentials = "Your Account has been deactivated. Contact support at: support@wcrnational.com or 866.456.7331";
                    return false;
                }
                else {
                    thisStatus.LoginAssociateOrConsumer(credentials, 1); //associate
                }
            });
            //if (data > '0') {
            //    //this.router.navigateByUrl('/Associate');
            //    $(location).attr('href', 'Associate/ViewProfile.aspx')
            //}
            //else if (data == '-1') {
            //    this.userService
            //        .attemptConsumerAuth(this.authType, credentials)
            //        .then(
            //            (data: any) => {
            //                if (data > '0') {
            //                    this.isSubmitting = false;
            //                    //this.router.navigateByUrl('/Consumer');
            //                    $(location).attr('href', '/index.html')
            //                }
            //                else {
            //                    this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
            //                    this.isSubmitting = false;
            //                }
            //            },
            //            err => {
            //                this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
            //                this.isSubmitting = false;
            //            }
            //        );
            //}
            //else {
            //    this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
            //    this.isSubmitting = false;
            //}
        }, function (err) {
            _this.formErrors.loginCredentials = _this.validationMessages['loginCredentials']['error'];
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.LoginAssociateOrConsumer = function (credentials, uType) {
        var _this = this;
        var thisStatus = this;
        if (uType == 1) {
            this.userService
                .attemptAssociateAuth(this.authType, credentials)
                .then(function (data) {
                if (data > 1) {
                    if (data.d.length > 0) {
                        var xmlDoc1 = $.parseXML(data.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("associateLogin");
                        $.each(docs1, function (i, docs1) {
                            if ($(docs1).find("AssociateId").text() == "-1") {
                                thisStatus.formErrors.loginCredentials = "User Authentication Failed. Please verify your credentials";
                                return;
                            }
                            else if ($(docs1).find("Status").text() == "1") {
                                thisStatus.associateLoginSessionActivate(docs1);
                                return;
                            }
                            else {
                                thisStatus.formErrors.loginCredentials = "User Authentication Failed. Please verify your credentials";
                                return;
                            }
                        });
                    }
                }
                else {
                    //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                    _this.isSubmitting = false;
                }
                //if (data > 1) {
                //    this.isSubmitting = false;
                //    this.router.navigateByUrl('/');
                //}
                //else {
                //    this.showErrorsPassword = true;
                //    //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                //    this.isSubmitting = false;
                //}
            }, function (err) {
                //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                _this.isSubmitting = false;
            });
        }
        else if (uType == 2) {
            this.userService
                .attemptConsumerAuth(this.authType, credentials)
                .then(function (data) {
                if (data > 1) {
                    if (data.d.length > 0) {
                        var xmlDoc1 = $.parseXML(data.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("consumerLogin");
                        $.each(docs1, function (i, docs1) {
                            if ($(docs1).find("Id").text() == "-1") {
                                thisStatus.formErrors.loginCredentials = "User Authentication Failed. Please verify your credentials";
                            }
                            else if ($(docs1).find("Flag").text() == "1") {
                                thisStatus.consumerLoginSessionActivate(docs1);
                                return;
                            }
                            else {
                                thisStatus.formErrors.loginCredentials = "User Authentication Failed. Please verify your credentials";
                                return false;
                            }
                        });
                    }
                }
                else {
                    _this.showErrorsPassword = true;
                    //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                    _this.isSubmitting = false;
                }
            }, function (err) {
                _this.showErrorsPassword = true;
                //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                _this.isSubmitting = false;
            });
        }
    };
    AuthComponent.prototype.consumerLoginSessionActivate = function (docs) {
        var _this = this;
        var credentials = this.authForm.value;
        this.userService
            .consumerLoginSessionActivate(this.authType, credentials, $(docs).find("Id").text())
            .then(function (data) {
            if (data.d == "1") {
                $(location).attr('href', '/ConsumerDashboard.html');
            }
        }, function (err) {
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.associateLoginSessionActivate = function (docs) {
        var _this = this;
        var credentials = this.authForm.value;
        this.userService
            .associateLoginSessionActivate(this.authType, credentials, $(docs).find("AssociateId").text())
            .then(function (data) {
            if (data.d == "1") {
                if ($(docs).find("Mobile").text() == '') {
                    $(location).attr('href', 'Associate/ViewProfile.aspx');
                }
                else {
                    $(location).attr('href', 'Associate/Dashboard.aspx');
                }
            }
        }, function (err) {
            //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
            _this.isSubmitting = false;
        });
    };
    /**
     * *************************************************
     * LOGIN Module END
     * *************************************************
    **/
    /**
    * *************************************************
    * SIGN UP Module END
    * *************************************************
    **/
    AuthComponent.prototype.submitRegistrationForm = function () {
        this.isSubmitting = true;
        if (this.authForm.get('associate').value == true) {
            this.associateRegister();
        }
        else if (this.authForm.get('consumer').value == true) {
            this.consumerRegister();
        }
        //this.errors = { errors: {} };
        //const credentials = this.authForm.value;
        //this.userService
        //    .attemptRegister(this.authType, credentials)
        //    .subscribe(
        //        data => {
        //            if (data > 1) {
        //                this.isSubmitting = false;
        //                this.router.navigateByUrl('/Activate');
        //            }
        //            else {
        //                this.showErrorsPassword = true;
        //                //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
        //                this.isSubmitting = false;
        //            }
        //        },
        //        err => {
        //            this.showErrorsPassword = true;
        //            //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
        //            this.isSubmitting = false;
        //        }
        //    );
    };
    AuthComponent.prototype.associateRegister = function () {
        var _this = this;
        var credentials = this.authForm.value;
        this.userService
            .attemptRegisterAssociate(this.authType, credentials)
            .subscribe(function (data) {
            if (data >= 1) {
                _this.isSubmitting = false;
                _this.router.navigate(['/Activate', '1']);
            }
            else {
                _this.isSubmitting = false;
            }
        }, function (err) {
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.consumerRegister = function () {
        var _this = this;
        var credentials = this.authForm.value;
        this.userService
            .attemptRegisterConsumer(this.authType, credentials)
            .subscribe(function (data) {
            if (data >= 1) {
                _this.isSubmitting = false;
                _this.router.navigate(['/Activate', '2']);
            }
            else {
                _this.isSubmitting = false;
            }
        }, function (err) {
            _this.isSubmitting = false;
        });
    };
    /**
    * *************************************************
    * SIGNUP Module END
    * *************************************************
    **/
    /**
    * *************************************************
    * ACTIVATION Module END
    * *************************************************
    **/
    AuthComponent.prototype.submitActivationForm = function () {
        this.isSubmitting = true;
        var credentials = this.authForm.value;
        var urlComponent;
        var splitCurrentUrl = this.router.url.split('/');
        this.route.url.subscribe(function (data) {
            // Get the last piece of the URL (it's either 'login' or 'register')
            debugger;
            urlComponent = data[0].path;
        });
        var userType = urlComponent;
        console.log(userType);
        if (userType == "1") {
            this.associateActivationCode(credentials);
        }
        else if (userType == "2") {
            this.consumerActivationCode(credentials);
        }
    };
    AuthComponent.prototype.associateActivationCode = function (credentials) {
        var _this = this;
        this.userService
            .getAttemptVerifiedActivationCodeAssociate(this.authType, credentials)
            .subscribe(function (data) {
            if (data.d == credentials.activationCode) {
                _this.userService
                    .attemptVerifiedActivationCodeAssociate(_this.authType, _this.globalEmail)
                    .then(function (data) {
                    if (data.d.length > 0) {
                        _this.submitLoginForm(_this.globalEmail, _this.globalPassword);
                    }
                    _this.isSubmitting = false;
                }, function (err) {
                    _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
                    _this.isSubmitting = false;
                });
            }
            else {
                _this.formErrors.activationCode = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                _this.isSubmitting = false;
                _this.activationSent = true;
            }
        }, function (err) {
            _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.consumerActivationCode = function (credentials) {
        var _this = this;
        this.userService
            .getAttemptVerifiedActivationCodeConsumer(this.authType, credentials)
            .subscribe(function (data) {
            if (data.d == credentials.activationCode) {
                _this.userService
                    .attemptVerifiedActivationCodeConsumer(_this.authType, _this.globalEmail)
                    .then(function (data) {
                    if (data.d.length > 0) {
                        _this.submitLoginForm(_this.globalEmail, _this.globalPassword);
                    }
                    _this.isSubmitting = false;
                }, function (err) {
                    _this.formErrors.activationCode = "Verification code does not completed due to some error.";
                    _this.isSubmitting = false;
                });
            }
            else {
                _this.formErrors.activationCode = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                _this.isSubmitting = false;
                _this.activationSent = true;
            }
        }, function (err) {
            _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.onClickResendVerificationCode = function () {
        var _this = this;
        this.resentCode = false;
        this.userService
            .attemptResendActivateCode(this.globalEmail)
            .subscribe(function (data) {
            if (data.d > 0 && data.d > "1") {
                _this.resentCode = true;
                _this.isSubmitting = false;
            }
            else {
                _this.resentCode = false;
                _this.isSubmitting = false;
            }
        }, function (err) {
            _this.resentCode = false;
            _this.isSubmitting = false;
        });
    };
    /**
    * *************************************************
    * ACTIVATION Module END
    * *************************************************
    **/
    AuthComponent.prototype.submitFormResetPassword = function () {
        var _this = this;
        var thisStatus = this;
        var credentials = this.authForm.value;
        this.resetPassword = true;
        this.userService
            .attemptAssociateAccountExists(this.authType, credentials)
            .subscribe(function (data) {
            var xmlDoc = $.parseXML(data.d);
            var xml = $(xmlDoc);
            var docs = xml.find("associateExists");
            $.each(docs, function (i, docs) {
                if ($(docs).find("AccountId").text() != "0") {
                    thisStatus.userService
                        .attemptResetAssociatePassword(credentials.email)
                        .then(function (data1) {
                        if (data1 == "0") {
                            //show message : "Please check your registered emailID for new password."
                        }
                    });
                }
                else {
                    thisStatus.userService
                        .attempConsumerAccountExists(thisStatus.authType, credentials)
                        .then(function (data1) {
                        if (data1.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data1.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("consumerExists");
                            $.each(docs1, function (i, docs1) {
                                if ($(docs1).find("AccountId").text() == "0") {
                                    //Please verify your email address and retry again.
                                }
                                else {
                                    thisStatus.userService
                                        .attemptResetConsumerPassword(credentials.email)
                                        .then(function (data2) {
                                        if (data2 == "0") {
                                            //show message : "Please check your registered emailID for new password."
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }, function (err) {
            _this.resentCode = false;
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.showErrors = function () {
        this.showErrorsPassword = true;
    };
    AuthComponent.prototype.hideErrors = function () {
        this.showErrorsPassword = false;
    };
    AuthComponent = tslib_1.__decorate([
        Component({
            selector: 'app-auth-page',
            templateUrl: './auth.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, UserService, FormBuilder])
    ], AuthComponent);
    return AuthComponent;
}());
export { AuthComponent };
function emailDomain(domainName) {
    return function (control) {
        var email = control.value;
        var domain = email.substring(email.lastIndexOf('@') + 1);
        if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
            return null;
        }
        else {
            return { 'emailDomain': true };
        }
    };
}
function isEmailExist(userService, authComp) {
    return function (control) {
        //clearTimeout(this.debouncer);
        //return { 'emailInUse': true };
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(control.value).toLowerCase())) {
            authComp.showOnValidateEmail = true;
        }
        setTimeout(function () {
            userService.validateEmail(control.value).subscribe(function (data) {
                if (data >= 1) {
                    control.parent.get('passwordGroup').enable();
                    control.parent.get('passwordGroup').get('password').enable();
                    control.parent.get('passwordGroup').get('confirmPassword').enable();
                    //control.parent.get('associate').enable();
                    //control.parent.get('consumer').enable();
                    //control.parent.get('terms').enable();
                    authComp.showOnValidateEmail = false;
                    authComp.FormFilledSuccessfully = false;
                    return null;
                }
                else {
                    return { 'emailInUse': true };
                }
            }, function (err) {
                return { 'emailInUse': true };
            });
        }, 1000);
        return null;
    };
}
function matchPasswords(group) {
    var passwordControl = group.get('password');
    var confirmPasswordControl = group.get('confirmPassword');
    if (group.parent !== undefined) {
        if (passwordControl.value != "" && (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine)) {
            group.parent.get('associate').enable();
            group.parent.get('consumer').enable();
            return null;
        }
        else {
            group.parent.get('associate').disable();
            group.parent.get('consumer').disable();
            return { 'passwordMismatch': true };
        }
    }
    else {
        return null;
    }
}
function patternValidator(regex, error) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        var valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
//function regexValidatorNumbers(regex: RegExp, authComp: AuthComponent): ValidatorFn {
//    return (control: AbstractControl): { [key: string]: any } => {
//        if (!control.value) {
//            return null;
//        }
//        const valid = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})".test(control.value);
//        return valid ? null : { 'number': 'At least one number.' };
//    };
//}
//function regexValidatorLower(regex: RegExp, authComp: AuthComponent): ValidatorFn {
//    return (control: AbstractControl): { [key: string]: any } => {
//        if (!control.value) {
//            return null;
//        }
//        const valid = regex.test(control.value);
//        return valid ? null : { 'lowerLetter': 'At least one lowercase.' };
//        return valid ? null : {};
//    };
//}
//function regexValidatorCapital(regex: RegExp, authComp: AuthComponent): ValidatorFn {
//    return (control: AbstractControl): { [key: string]: any } => {
//        if (!control.value) {
//            return null;
//        }
//        const valid = regex.test(control.value);
//        return valid ? null : { 'upperLetter': 'At least one uppercase.' };
//    };
//}
//function regexValidatorSpecial(regex: RegExp, authComp: AuthComponent): ValidatorFn {
//    return (control: AbstractControl): { [key: string]: any } => {
//        if (!control.value) {
//            return null;
//        }
//        const valid = regex.test(control.value);
//        return valid ? null : { 'special Character': 'At least one special character.' };
//    };
//}
//const email: string = control.value;
//const emailFromDB = this.userService.validateEmail(email); //getUserEmailFromDB();
//if (emailFromDB === '' || emailFromDB === email) {
//    return null;
//} else {
//    this.authForm.get('passwordGroup').enable();
//    this.authForm.get('passwordGroup').get('password').enable();
//    this.authForm.get('passwordGroup').get('confirmPassword').enable();
//    return { 'emalInUse': true };
//}
//$("#passwrd").focusin(function () {
//    $("#message").css("display", "block");
//});
//$("#passwrd").blur(function () {
//    $("#message").css("display", "none");
//});
//$("#btnforclose").click(function () {
//    window.location.reload();
//});
//# sourceMappingURL=auth.component.js.map