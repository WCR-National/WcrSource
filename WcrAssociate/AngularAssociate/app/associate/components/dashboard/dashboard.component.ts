import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';



@Component({
    selector: 'associate-dashboard-page',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    authType: String = '';
    title: String = '';
    errors: Errors = { errors: {} };
    isSubmitting = false;
    private showLoadingGif = false;
    private debouncer: any;
    private globalEmail: string;
    private globalPassword: string;
    private resentCode: boolean = false;
    private activationSent: boolean = false;
    showOnValidateEmail: boolean = false;
    private showErrorsPassword: boolean = false;
    private showActivationDiv: boolean = false;
    private resetPassword: boolean = false;
    authForm: FormGroup;
    FormFilledSuccessfully: boolean = false;
    showEmailVerification: boolean = false;
    tokenFromUI: string = "7061737323313233";
    encrypted: any = "";
    decrypted: string;

    request: string;
    responce: string;

    loginErrorMessage: string = "";

    validationMessages = {
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
        }
        //,
        //'loginCredentials': {
        //    'error': 'User Authentication Failed. Please verify your credentials'
        //}
    }
    formErrors = {
        'email': '',
        'password': '',
        'confirmPassword': '',
        'passwordGroup': '',
        'associate': '',
        'consumer': '',
        'activationCode': '',
        'terms': ''
        //,
        //'loginCredentials': ''
    };

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private http: HttpClient
    ) { }

    ngOnInit() {

        //this.request = "ali87613@yahoo.com";
        //this.encryptUsingAES256();
        //console.log(this.encrypted);
        //this.router.navigate(['activate', '2', this.encrypted]);

        this.setValidationOnform();
        this.setSignInOrSignUpOrActivateOrReset();
        this.changeValuesOfFormsEvents();
    }

    changeValuesOfFormsEvents() {

        this.authForm.valueChanges.subscribe((data) => {
            this.logValidationErrors(this.authForm);
        });


        this.authForm.get('associate').valueChanges.subscribe((data) => {
            if (data == true) {
                this.authForm.get('terms').enable();
            }
            else if (data == false && this.authForm.get('consumer').value == false) {
                this.authForm.get('terms').disable();
            }
        });

        this.authForm.get('consumer').valueChanges.subscribe((data) => {
            if (data == true) {
                this.authForm.get('terms').enable();
            }
            else if (data == false && this.authForm.get('associate').value == false) {
                this.authForm.get('terms').disable();
            }
        });

        this.authForm.get('terms').valueChanges.subscribe((data) => {
            if (data == false) {
                this.FormFilledSuccessfully = false;
            }
            else {
                this.FormFilledSuccessfully = true;
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
    }

    logValidationErrors(group: FormGroup = this.authForm): void {

        if (this.authType == "login") {
            this.loginErrorMessage = "";
        }
        this.showEmailVerification = false;
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            this.formErrors[key] = '';

            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                this.formErrors[key] = "";
                const messages = this.validationMessages[key];
                if (abstractControl.errors != null) {
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                this.formErrors[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                    //if (key == "password") {
                    //}
                }

            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);
            }
        });
    }

    setValidationOnform() {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email], [this.emailAlreadyTaken()]],
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
    }

    setSignInOrSignUpOrActivateOrReset() {
        this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')

            this.authType = data[0].path;


            // Set a title for the page accordingly
            if (this.authType === 'login') {
                this.title = 'Sign in';

                this.authForm.get('email').clearValidators();
                this.authForm.get('email').clearAsyncValidators();
                this.authForm.get('email').updateValueAndValidity();



                this.authForm.get('email').setValidators([Validators.required, Validators.email]);
                this.authForm.get('email').updateValueAndValidity();

                this.authForm.get('passwordGroup').clearValidators();
                this.authForm.get('passwordGroup').updateValueAndValidity();

                this.authForm.get('passwordGroup').get('password').setValidators([Validators.required]);
                this.authForm.get('passwordGroup').get('password').updateValueAndValidity();

                this.authForm.get('passwordGroup').get('confirmPassword').clearValidators();
                this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();

                this.authForm.get('associate').clearValidators();
                this.authForm.get('associate').updateValueAndValidity();

                this.authForm.get('consumer').clearValidators();
                this.authForm.get('consumer').updateValueAndValidity();


                this.authForm.get('terms').clearValidators();
                this.authForm.get('terms').updateValueAndValidity();

                this.authForm.get('activationCode').clearValidators();
                this.authForm.get('activationCode').updateValueAndValidity();

            }
            else if (this.authType === 'register') {
                this.authForm.get('email').setValidators([Validators.required, Validators.email]);
                this.authForm.get('email').setAsyncValidators([this.emailAlreadyTaken()]);
                this.authForm.get('email').updateValueAndValidity();


                this.authForm.get('passwordGroup').get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20),
                patternValidator(/\d/, { number: true }),
                patternValidator(/[A-Z]/, { upperLetter: true }),
                patternValidator(/[a-z]/, { lowerLetter: true }),
                patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })

                ]);
                this.authForm.get('passwordGroup').get('password').updateValueAndValidity();


                this.authForm.get('passwordGroup').setValidators([matchPasswords]);
                this.authForm.get('passwordGroup').updateValueAndValidity();


                this.authForm.get('passwordGroup').get('confirmPassword').setValidators([Validators.required]);
                this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();


                this.authForm.get('terms').setValidators([Validators.required]);
                this.authForm.get('terms').updateValueAndValidity();

                this.authForm.get('passwordGroup').disable();
                this.authForm.get('passwordGroup').get('password').disable();
                this.authForm.get('passwordGroup').get('confirmPassword').disable();
                this.authForm.get('associate').disable();
                this.authForm.get('consumer').disable();
                this.authForm.get('terms').disable();

                this.authForm.get('activationCode').clearValidators();
                this.authForm.get('terms').updateValueAndValidity();


                this.title = 'Sign up';
            }
            else if (this.authType === 'activate') {

                this.authForm.get('email').clearValidators();
                this.authForm.get('email').clearAsyncValidators();
                this.authForm.get('email').updateValueAndValidity();

                this.authForm.get('passwordGroup').clearValidators();
                this.authForm.get('passwordGroup').updateValueAndValidity();

                this.authForm.get('passwordGroup').get('password').clearValidators();
                this.authForm.get('passwordGroup').get('password').updateValueAndValidity();

                this.authForm.get('passwordGroup').get('confirmPassword').clearValidators();
                this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();

                //this.authForm.get('associate').clearValidators();
                //this.authForm.get('consumer').clearValidators();

                this.authForm.get('terms').clearValidators();
                this.authForm.get('terms').updateValueAndValidity();

                this.authForm.get('activationCode').setValidators([Validators.required]);
                this.authForm.get('activationCode').updateValueAndValidity();

                this.title = 'Account Activation';
            }
            else if (this.authType === 'resetPassword') {
                //this.resetPassword = true;
                this.authForm.get('email').enable();
                this.authForm.get('email').updateValueAndValidity();

                this.authForm.get('email').clearAsyncValidators();
                this.authForm.get('email').setValidators([Validators.required, Validators.email]);
                this.authForm.get('email').updateValueAndValidity();

                this.authForm.get('passwordGroup').clearValidators();
                this.authForm.get('passwordGroup').updateValueAndValidity();


                this.authForm.get('passwordGroup').get('password').clearValidators();
                this.authForm.get('passwordGroup').get('password').updateValueAndValidity();

                this.authForm.get('passwordGroup').get('confirmPassword').clearValidators();
                this.authForm.get('passwordGroup').get('confirmPassword').updateValueAndValidity();

                //this.authForm.get('associate').clearValidators();
                //this.authForm.get('associate').updateValueAndValidity();

                //this.authForm.get('consumer').clearValidators();
                //this.authForm.get('associate').updateValueAndValidity();

                this.authForm.get('terms').clearValidators();
                this.authForm.get('terms').updateValueAndValidity();

                this.authForm.get('activationCode').clearValidators();
                this.authForm.get('activationCode').updateValueAndValidity();

                this.title = 'Reset Password';
            }
        });
    }


    /**
     * *************************************************
     * LOGIN Module Start
     * *************************************************
    **/

    submitLoginForm(email = "", password = "") {
        this.isSubmitting = true;
        this.loginErrorMessage = "";
        //this.errors = { errors: {} };
        if (email != "" && password != "") {
            this.router.navigateByUrl('/');
        }
        let thisStatus = this;
        const credentials = this.authForm.value;
        this.userService
            .attemptAssociateAccountExists(this.authType, credentials)
            .subscribe(
                data => {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("associateExists");
                    $.each(docs, function (i, docs) {
                        if ($(docs).find("AccountId").text() == "0") {
                            //for associate Login

                            thisStatus.userService.attempConsumerAccountExists(thisStatus.authType, credentials)
                                .then((data1: any) => {
                                    if (data1.d.length > 0) {
                                        var xmlDoc1 = $.parseXML(data1.d);
                                        var xml1 = $(xmlDoc1);
                                        var docs1 = xml1.find("consumerExists");

                                        $.each(docs1, function (i, docs1) {
                                            if ($(docs1).find("AccountId").text() == "0") {

                                                thisStatus.loginErrorMessage = "User Authentication Failed. Please verify your credentials"
                                            }
                                            else if ($(docs1).find("Status").text() == "0" && $(docs1).find("IsEmailVerified").text() == "0") {

                                            }
                                            else if ($(docs1).find("Status").text() == "0" && $(docs1).find("IsEmailVerified").text() == "1") {

                                                thisStatus.loginErrorMessage = "Your Account has been deactivated. Contact support at: support@wcrnational.com or 866.456.7331";
                                            }
                                            else {
                                                thisStatus.LoginAssociateOrConsumer(credentials, 2); //Consumer
                                            }
                                        });
                                    }
                                });
                        }
                        else if ($(docs).find("Status").text() == "0" && $(docs).find("IsEmailVerified").text() == "0") {

                            // window.location.href = "UserAccountActivation.aspx?email=" + uname + "&uType=" + lbluserType.value + "&aid=" + $(docs).find("AccountId").text();
                        }
                        else if ($(docs).find("Status").text() == "0" && $(docs).find("IsEmailVerified").text() == "1") {

                            thisStatus.loginErrorMessage = "Your Account has been deactivated. Contact support at: support@wcrnational.com or 866.456.7331";
                        }
                        else {
                            thisStatus.LoginAssociateOrConsumer(credentials, 1);//associate
                        }
                    });
                    this.isSubmitting = false;


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
                },
                err => {
                    //this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
                    this.isSubmitting = false;
                }
            );
    }

    LoginAssociateOrConsumer(credentials, uType) {
        let thisStatus = this;
        if (uType == 1) {
            this.userService
                .attemptAssociateAuth(this.authType, credentials)
                .then(
                    (data: any) => {


                        if (data.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("associateLogin");
                            $.each(docs1, function (i, docs1) {

                                if ($(docs1).find("AssociateId").text() == "-1") {
                                    thisStatus.loginErrorMessage = "User Authentication Failed. Please verify your credentials";
                                    return;
                                }
                                else if ($(docs1).find("Status").text() == "1") {

                                    thisStatus.associateLoginSessionActivate(docs1);
                                    return;
                                }
                                else {
                                    thisStatus.loginErrorMessage = "User Authentication Failed. Please verify your credentials";
                                    return;
                                }
                            });
                        }
                        else {
                            //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
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

                    },
                    err => {
                        //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                        this.isSubmitting = false;
                    }
                );
        }
        else if (uType == 2) {
            this.userService
                .attemptConsumerAuth(this.authType, credentials)
                .then(
                    (data: any) => {

                        if (data.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("consumerLogin");
                            $.each(docs1, function (i, docs1) {

                                if ($(docs1).find("Id").text() == "-1") {
                                    thisStatus.loginErrorMessage = "User Authentication Failed. Please verify your credentials";
                                }
                                else if ($(docs1).find("Flag").text() == "1") {

                                    thisStatus.consumerLoginSessionActivate(docs1);
                                }
                                else {
                                    thisStatus.loginErrorMessage = "User Authentication Failed. Please verify your credentials";
                                }
                            });
                        }
                        else {
                            this.showErrorsPassword = true;
                            //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                            this.isSubmitting = false;
                        }
                    },
                    err => {
                        this.showErrorsPassword = true;
                        //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                        this.isSubmitting = false;
                    }
                );
        }

    }

    consumerLoginSessionActivate(docs) {

        const credentials = this.authForm.value;
        this.userService
            .consumerLoginSessionActivate(this.authType, credentials, $(docs).find("Id").text())
            .then(
                (data: any) => {
                    if (data.d == "1") {
                        $(location).attr('href', '/ConsumerDashboard.html');
                    }
                },
                err => {
                    this.loginErrorMessage = "Some internal error occurred.";
                    this.isSubmitting = false;
                }
            );
    }

    associateLoginSessionActivate(docs) {

        const credentials = this.authForm.value;
        this.userService
            .associateLoginSessionActivate(this.authType, credentials, $(docs).find("AssociateId").text())
            .then(
                (data: any) => {
                    if (data.d == "1") {

                        if ($(docs).find("Mobile").text() == '') {
                            $(location).attr('href', 'Associate/ViewProfile.aspx');
                        }
                        else {
                            $(location).attr('href', 'Associate/Dashboard.aspx');
                        }
                    }
                },
                err => {
                    this.loginErrorMessage = "Some internal error occurred.";
                    //this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                    this.isSubmitting = false;
                }
            );
    }

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

    isEmailExist(control: AbstractControl) {

        //clearTimeout(this.debouncer);
        //return { 'emailInUse': true };
        let thisUserService = this.userService;

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(control.value).toLowerCase())) {
            this.showOnValidateEmail = true;

            setTimeout(() => {

                return thisUserService.validateEmail(control.value).subscribe(
                    data => {
                        if (Number(data) >= 1) {
                            console.log("Email validate" + data);

                            this.showOnValidateEmail = false;
                            this.FormFilledSuccessfully = false;
                        }
                        else {
                            this.showEmailVerification = false;

                            console.log("Email validate" + data);

                            control.parent.get('passwordGroup').enable();
                            control.parent.get('passwordGroup').get('password').enable();
                            control.parent.get('passwordGroup').get('confirmPassword').enable();

                            //control.parent.get('associate').enable();
                            //control.parent.get('consumer').enable();

                            //this.parent.get('terms').enable();
                            this.showOnValidateEmail = false;
                            this.FormFilledSuccessfully = false;

                            return null;
                        }
                    },
                    (err) => {
                        this.showOnValidateEmail = false;
                        this.FormFilledSuccessfully = false;
                        return { 'emailInUse': true };
                    });
            }, 1000);

        }
    }


    isEmailTaken(): boolean {
        this.logValidationErrors();
        return this.authForm.get('email').hasError('emailInUse');
    }

    emailAlreadyTaken(): AsyncValidatorFn {

        return (control: AbstractControl):
            | Promise<{ [key: string]: any } | null>
            | Observable<{ [key: string]: any } | null> => {

            let thisUserService = this.userService;
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(control.value).toLowerCase())) {
                this.showOnValidateEmail = true;

                return this.userService
                    .emailAlreadyTaken(control.value)
                    .pipe(
                        map(data => {
                            if (data >= 1) {
                                this.showOnValidateEmail = false;
                                this.FormFilledSuccessfully = false;
                                $('#validateEmailDiv').addClass('has-error');
                                $('#validateEmailDiv').attr('style', 'top: 19% !important');


                                return { emailInUse: true };
                            }
                            else {
                                this.showOnValidateEmail = false;
                                control.parent.get('passwordGroup').enable();
                                control.parent.get('passwordGroup').get('password').enable();
                                control.parent.get('passwordGroup').get('confirmPassword').enable();
                                $('#validateEmailDiv').removeAttr('style');

                                //control.parent.get('associate').enable();
                                //control.parent.get('consumer').enable();

                                //this.parent.get('terms').enable();
                                this.FormFilledSuccessfully = false;

                                return of(null);
                            }
                        })

                    );

                //return thisUserService.emailAlreadyTaken(control.value)
                //    .subscribe(
                //        (data) => {
                //            debugger;
                //            if (Number(data) >= 1) {
                //                console.log("Email validate" + data);

                //                this.showOnValidateEmail = false;
                //                this.FormFilledSuccessfully = false;
                //                return { 'emailTaken': true };
                //            }
                //            else {
                //                this.showEmailVerification = false;

                //                console.log("Email validate" + data);

                //                control.parent.get('passwordGroup').enable();
                //                control.parent.get('passwordGroup').get('password').enable();
                //                control.parent.get('passwordGroup').get('confirmPassword').enable();

                //                //control.parent.get('associate').enable();
                //                //control.parent.get('consumer').enable();

                //                //this.parent.get('terms').enable();
                //                this.FormFilledSuccessfully = false;

                //                return of(null);
                //            }
                //        },
                //        (err) => {
                //            this.showOnValidateEmail = false;
                //            this.FormFilledSuccessfully = false;
                //            return of(null);
                //        });
            }
        }

    }

    submitRegistrationForm() {

        //this.request = "ali87613@yahoo.com";
        //this.encryptUsingAES256();

        //this.router.navigate(['activate', '2', this.encrypted]);

        this.isSubmitting = true;
        this.FormFilledSuccessfully = true;

        if (this.authForm.get('associate').value == true) {
            this.associateRegister();
        }
        else if (this.authForm.get('consumer').value == true) {
            debugger;
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
    }

    associateRegister() {

        const credentials = this.authForm.value;
        this.userService
            .attemptRegisterAssociate(this.authType, credentials)
            .subscribe(
                data => {
                    if (data >= 1) {
                        this.isSubmitting = false;
                        this.request = credentials.email;
                        this.encryptUsingAES256()
                        credentials.email = this.encrypted;
                        credentials.email.replace('/', '~');

                        this.request = credentials.passwordGroup.password;
                        this.encryptUsingAES256()
                        credentials.passwordGroup.password = this.encrypted;
                        credentials.passwordGroup.password.replace('/', '~');

                        this.router.navigate(['activate', '1', credentials.email, credentials.passwordGroup.password]);
                    }
                    else {
                        this.isSubmitting = false;
                    }
                },
                err => {
                    this.isSubmitting = false;
                }
            );
    }

    consumerRegister() {
        debugger;

        const credentials = this.authForm.value;
        this.userService
            .attemptRegisterConsumer(this.authType, credentials)
            .subscribe(
                data => {
                    debugger;
                    if (data >= 1) {

                        this.isSubmitting = false;

                        this.request = credentials.email;
                        this.encryptUsingAES256()
                        credentials.email = this.encrypted;
                        credentials.email.replace('/', '~');

                        this.request = credentials.passwordGroup.password;
                        this.encryptUsingAES256()
                        credentials.passwordGroup.password = this.encrypted;
                        credentials.passwordGroup.password.replace('/', '~');


                        this.router.navigate(['activate', '2', credentials.email, credentials.passwordGroup.password]);
                    }
                    else {
                        this.isSubmitting = false;
                    }
                },
                err => {
                    this.isSubmitting = false;
                }
            );

    }
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
    submitActivationForm() {
        this.isSubmitting = true;
        const credentials = this.authForm.value;
        let urlComponent: string;

        let encryptedPassword: string;
        let encryptedEmail: string;
        this.route.url.subscribe(data => {

            if (data.length <= 4) {
                // Get the last piece of the URL (it's either 'login' or 'register')
                urlComponent = data[1].path;
                encryptedEmail = data[2].path;
                encryptedPassword = data[3].path;
                this.isSubmitting = false;

            }
            else {
                //page  not found
                this.isSubmitting = false;
            }
        });


        let userType = urlComponent;
        encryptedEmail.replace('~', '/');

        this.encrypted = encryptedEmail;
        this.decryptUsingAES256();
        credentials.email = this.decrypted;
        //credentials.email = credentials.emaild.replace(/^"(.*)"$/, '$1');

        console.log(this.decrypted);

        encryptedPassword.replace('~', '/');
        this.encrypted = encryptedPassword;
        this.decryptUsingAES256();
        credentials.passwordGroup.password = this.decrypted;

        //credentials.passwordGroup.password = credentials.passwordGroup.password.replace(/^"(.*)"$/, '$1');
        console.log(this.decrypted);

        if (userType == "1") {
            this.associateActivationCode(credentials);
        }
        else if (userType == "2") {
            this.consumerActivationCode(credentials);
        }
    }

    associateActivationCode(credentials) {

        this.userService
            .getAttemptVerifiedActivationCodeAssociate(this.authType, credentials)
            .subscribe(
                data => {
                    if (data.d == credentials.activationCode) {
                        this.userService
                            .attemptVerifiedActivationCodeAssociate(this.authType, credentials.email)
                            .then(
                                (data: any) => {
                                    if (data.d.length > 0)
                                    {
                                        $(location).attr('href', 'Associate/ViewProfile.aspx');
                                        //this.router.navigateByUrl('/login');
                                        //this.submitLoginForm(credentials.email, credentials.passwordGroup.password);
                                    }
                                    this.isSubmitting = false;

                                },
                                err => {
                                    this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                                    this.isSubmitting = false;
                                }
                            );
                    }
                    else {

                        this.formErrors.activationCode = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                        this.isSubmitting = false;
                        this.activationSent = true;
                    }
                },
                err => {
                    this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                    this.isSubmitting = false;
                }
            );
    }

    consumerActivationCode(credentials) {
        this.userService
            .getAttemptVerifiedActivationCodeConsumer(this.authType, credentials)
            .subscribe(
                data => {
                    if (data.d == credentials.activationCode) {
                        this.userService
                            .attemptVerifiedActivationCodeConsumer(this.authType, credentials.email)
                            .then(
                                (data: any) => {
                                    if (data.d.length > 0) {
                                        //this.router.navigateByUrl('/login');
                                        $(location).attr('href', '/ConsumerDashboard.html');

                                        //this.submitLoginForm(credentials.email, credentials.passwordGroup.password);
                                    }
                                    this.isSubmitting = false;

                                },
                                err => {
                                    this.formErrors.activationCode = "Verification code does not completed due to some error.";
                                    this.isSubmitting = false;
                                }
                            );
                    }
                    else {

                        this.formErrors.activationCode = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                        this.isSubmitting = false;
                        this.activationSent = true;
                    }
                },
                err => {
                    this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                    this.isSubmitting = false;
                }
            );
    }

    onClickResendVerificationCode() {

        let email: string;
        let urlComponent;
        let encryptedEmail: string;
        this.route.url.subscribe(data => {

            if (data.length <= 4) {
                // Get the last piece of the URL (it's either 'login' or 'register')
                urlComponent = data[0].path;
                encryptedEmail = data[2].path;
            }
            else {
                //page  not found
            }
        });


        let userType = urlComponent;

        this.encrypted = encryptedEmail;
        this.decryptUsingAES256();
        email = this.decrypted;
        email.replace('~', '/');

        console.log(this.decrypted);

        this.resentCode = true;
        this.userService
            .attemptResendActivateCode(email)
            .subscribe(
                data => {
                    if (data.d > 0 && data.d > "1") {
                        this.resentCode = false;
                        this.isSubmitting = false;
                    }
                    else {
                        this.resentCode = false;
                        this.isSubmitting = false;
                    }
                },
                err => {
                    this.resentCode = false;
                    this.isSubmitting = false;
                }
            );
    }

    /**
    * *************************************************
    * ACTIVATION Module END
    * *************************************************
    **/

    encryptUsingAES256() {
        let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(this.request), _key, {
                keySize: 16,
                iv: _iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
        this.encrypted = encrypted.toString();
    }

    decryptUsingAES256() {
        let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

        this.decrypted = CryptoJS.AES.decrypt(
            this.encrypted, _key, {
                keySize: 16,
                iv: _iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
    }

    submitFormResetPassword() {
        debugger;
        let thisStatus = this;
        const credentials = this.authForm.value;
        this.userService
            .attemptAssociateAccountExists(this.authType, credentials)
            .subscribe(
                data => {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("associateExists");
                    $.each(docs, function (i, docs) {
                        if ($(docs).find("AccountId").text() != "0") {
                            thisStatus.userService
                                .attemptResetAssociatePassword(credentials.email)
                                .then((data1: any) => {
                                    if (data1 == "0") {
                                        thisStatus.resetPassword = true;
                                        thisStatus.loginErrorMessage = "Please check your registered emailID for new password.";
                                    }
                                });
                        }
                        else {


                            thisStatus.userService
                                .attempConsumerAccountExists(thisStatus.authType, credentials)
                                .then((data1: any) => {
                                    if (data1.d.length > 0) {
                                        var xmlDoc1 = $.parseXML(data1.d);
                                        var xml1 = $(xmlDoc1);
                                        var docs1 = xml1.find("consumerExists");
                                        $.each(docs1, function (i, docs1) {
                                            if ($(docs1).find("AccountId").text() == "0") {
                                                //Please verify your email address and retry again.
                                                thisStatus.showEmailVerification = true;
                                            }
                                            else {
                                                thisStatus.userService
                                                    .attemptResetConsumerPassword(credentials.email)
                                                    .then((data2: any) => {
                                                        if (data2 == "0") {
                                                            thisStatus.resetPassword = true;
                                                            thisStatus.loginErrorMessage = "Please check your registered emailID for new password.";
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                });
                        }
                    });
                },
                err => {
                    this.showEmailVerification = true;
                    this.resetPassword = false;
                    this.isSubmitting = false;
                }
            );
    }

    showErrors() {
        this.showErrorsPassword = true;
    }

    hideErrors() {
        this.showErrorsPassword = false;

    }

    //showPreloaderIcon() {
    //    this.showOnValidateEmail = true;
    //}

    //onKeyup(event) {
    //    $("#message").css("display", "block");
    //    var lowerCaseLetters = /[a-z]/g;
    //    var upperCaseLetters = /[A-Z]/g;
    //    var numbers = /[0-9]/g;
    //    if (lowerCaseLetters.test(event.controls.password.value)) {
    //        $("#letter").removeClass("invalid");
    //        $("#letter").addClass("valid");
    //    }
    //    else {
    //        $("#letter").removeClass("valid");
    //        $("#letter").addClass("invalid");
    //    }
    //    if (upperCaseLetters.test(event.controls.password.value)) {
    //        $("#capital").removeClass("invalid");
    //        $("#capital").addClass("valid");
    //    }
    //    else {
    //        $("#capital").removeClass("valid");
    //        $("#capital").addClass("invalid");
    //    }
    //    if (numbers.test(event.controls.password.value)) {
    //        $("#number").removeClass("invalid");
    //        $("#number").addClass("valid");
    //    }
    //    else {
    //        $("#number").removeClass("valid");
    //        $("#number").addClass("invalid");
    //    }
    //    if (event.controls.password.value.length < 8) {
    //        $("#length").removeClass("valid");
    //        $("#length").addClass("invalid");
    //    }
    //    else {
    //        $("#length").removeClass("invalid");
    //        $("#length").addClass("valid");
    //    }
    //    var str = event.controls.password.value;
    //    var regex = /[^\w\s]/gi;
    //    if (regex.test(str) == true) {
    //        $("#specialcharacter").removeClass("invalid");
    //        $("#specialcharacter").addClass("valid");
    //    }
    //    else {
    //        $("#specialcharacter").removeClass("valid");
    //        $("#specialcharacter").addClass("invalid");
    //    }
    //}

}

function emailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const email: string = control.value;
        const domain = email.substring(email.lastIndexOf('@') + 1);
        if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
            return null;
        } else {
            return { 'emailDomain': true };
        }
    };
}

//function isEmailExist(userService: UserService, authComp: AuthComponent) {

//    return (control: AbstractControl): { [key: string]: any } | null => {
//        //clearTimeout(this.debouncer);
//        //return { 'emailInUse': true };
//        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//        if (re.test(String(control.value).toLowerCase())) {
//            authComp.showOnValidateEmail = true;
//            setTimeout(() => {
//                userService.validateEmail(control.value).subscribe(
//                    (data) => {
//                        if (data >= 1) {
//                            console.log("Email validate" + data);

//                            authComp.showOnValidateEmail = false;
//                            authComp.FormFilledSuccessfully = false;
//                            return { 'emailInUse': true };
//                        }
//                        else {
//                            console.log("Email validate" + data);

//                            control.parent.get('passwordGroup').enable();
//                            control.parent.get('passwordGroup').get('password').enable();
//                            control.parent.get('passwordGroup').get('confirmPassword').enable();

//                            //control.parent.get('associate').enable();
//                            //control.parent.get('consumer').enable();

//                            //control.parent.get('terms').enable();
//                            authComp.showOnValidateEmail = false;
//                            authComp.FormFilledSuccessfully = false;

//                            return null;
//                        }
//                    },
//                    (err) => {
//                        authComp.showOnValidateEmail = false;
//                        authComp.FormFilledSuccessfully = false;
//                        return { 'emailInUse': true };
//                    });
//            }, 500);
//        }
//        console.log('outside');

//        return { 'emailInUse': true };

//    }
//}

function matchPasswords(group: AbstractControl): { [key: string]: any } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
    if (group.parent !== undefined) {
        if (passwordControl.value != "" && (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine)) {
            group.parent.get('associate').enable();
            group.parent.get('consumer').enable();
            return null;
        } else {
            group.parent.get('associate').disable();
            group.parent.get('consumer').disable();
            return { 'passwordMismatch': true };
        }
    }
    else {
        return null;
    }
}


function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        const valid = regex.test(control.value);
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