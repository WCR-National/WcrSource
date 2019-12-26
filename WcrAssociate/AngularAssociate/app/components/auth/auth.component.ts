import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/auth';
import * as $ from 'jquery';

import { Errors } from '../../entities/errors.model';


@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    authType: String = '';
    title: String = '';
    errors: Errors = { errors: {} };
    private isSubmitting = false;
    private showLoadingGif = false;
    private debouncer: any;
    private globalEmail: string;
    private globalPassword: string;
    private resentCode: boolean = false;
    private resetPassword: boolean = false;
    authForm: FormGroup;

    validationMessages = {
        'email': {
            'required': 'Email is required',
            'email': 'Email is not in correct format.',
            'emalInUse': 'This Email address is not available. Please Try another email address.'
        },
        'passowrd': {
            'required': 'Password is required',
            'minlength': 'Minimum of 8 char & a max of 20 char in length',
            //'pattern': 'Must contain at least one uppercase, one lowercase, one number and 1 special character in ! @ # $ % ^ * _ ',
            'number': 'At least one number.',
            'lowerLetter': 'At least one lowercase.',
            'upperLetter': 'At least one uppercase.',
            'special Character': 'At least one special character.'
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
    }
    formErrors = {
        'email': '',
        'passowrd': '',
        'confirmPassword': '',
        'passwordGroup': '',
        'associate': '',
        'consumer': '',
        'activationCode': '',
        'terms': '',
        'loginCredentials': ''
    };

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder) { }

    ngOnInit() {
        this.setValidationOnform();
        this.setSignInOrSignUpOrActivateOrReset();
        this.changeValuesOfFormsEvents();
    }

    changeValuesOfFormsEvents() {

        this.authForm.valueChanges.subscribe((data) => {
            this.logValidationErrors(this.authForm);
        });

        this.authForm.get('associate').valueChanges.subscribe((data: string) => {
            if (data == "true") {
                this.authForm.get('terms').enable();
            }
            else if (data == "false" && this.authForm.get('consumer').value == "false") {
                this.authForm.get('terms').disable();
            }
        });

        this.authForm.get('consumer').valueChanges.subscribe((data: string) => {
            if (data == "true") {
                this.authForm.get('terms').enable();
            }
            else if (data == "false" && this.authForm.get('associate').value == "false") {
                this.authForm.get('terms').disable();
            }
        });
    }

    logValidationErrors(group: FormGroup = this.authForm): void {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            this.formErrors[key] = '';

            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                const messages = this.validationMessages[key];
                for (const errorKey in abstractControl.errors) {
                    if (errorKey) {
                        this.formErrors[key] += messages[errorKey] + ' ';
                    }
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
            email: ['', [Validators.required, Validators.email, isEmailExist]],
            passwordGroup: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
                regexValidator(new RegExp('^[0-9]+$'), { 'number': '' }),
                regexValidator(new RegExp('/[a-z]/g'), { 'lowerLetter': '' }),
                regexValidator(new RegExp('/[A-Z]/g'), { 'upperLetter': '' }),
                regexValidator(new RegExp('/[^\w\s]/gi'), { 'special Character': '' })
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
            this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            if (this.authType === 'login') {
                this.title = 'Sign in';

                this.authForm.get('email').clearValidators();
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
                this.authForm.get('email').setValidators([Validators.required, Validators.email, isEmailExist]);
                this.authForm.get('email').updateValueAndValidity();


                this.authForm.get('passwordGroup').get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)]);
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
                this.authForm.get('email').enable();
                this.authForm.get('email').updateValueAndValidity();

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

    submitLoginForm(email = "", password = "") {
        this.isSubmitting = true;

        //this.errors = { errors: {} };
        if (email != "" && password != "") {
            this.router.navigateByUrl('/');
        }
        const credentials = this.authForm.value;
        this.userService
            .attemptAuth(this.authType, credentials)
            .subscribe(
                data => {
                    if (data > '0') {
                        this.router.navigateByUrl('/Associate');
                    }
                    else if (data == '-1') {
                        this.userService
                            .attemptConsumerAuth(this.authType, credentials)
                            .subscribe(
                                data => {
                                    if (data > '0') {
                                        this.isSubmitting = false;
                                        this.router.navigateByUrl('/Consumer');
                                    }
                                    else {
                                        this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
                                        this.isSubmitting = false;
                                    }
                                },
                                err => {
                                    this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
                                    this.isSubmitting = false;
                                }
                            );
                    }
                    else {
                        this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
                        this.isSubmitting = false;
                    }
                },
                err => {
                    this.formErrors.loginCredentials = this.validationMessages['loginCredentials']['error'];
                    this.isSubmitting = false;
                }
            );
    }

    submitRegistrationForm() {
        this.isSubmitting = true;

        //this.errors = { errors: {} };

        const credentials = this.authForm.value;
        this.userService
            .attemptRegister(this.authType, credentials)
            .subscribe(
                data => {
                    if (data > 1) {
                        this.isSubmitting = false;
                        this.router.navigateByUrl('/Activate');
                    }
                    else {
                        this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                        this.isSubmitting = false;
                    }
                },
                err => {
                    this.formErrors.activationCode = this.validationMessages['activationCode']['message'];
                    this.isSubmitting = false;
                }
            );
    }

    submitActivationForm() {
        this.isSubmitting = true;
        //this.errors = { errors: {} };

        const credentials = this.authForm.value;
        this.userService
            .attemptActivateCode(this.authType, credentials)
            .subscribe(
                data => {
                    if (data.d == credentials.activationCode) {
                        this.userService
                            .attemptVerfiedActivationCode(this.authType, this.globalEmail)
                            .subscribe(
                                data => {
                                    if (data.d.length > 0) {
                                        this.submitLoginForm(this.globalEmail, this.globalPassword);
                                    }
                                    else {
                                        this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                                        this.isSubmitting = false;
                                    }
                                },
                                err => {
                                    this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                                    this.isSubmitting = false;
                                }
                            );
                    }
                    else {
                        this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                        this.isSubmitting = false;
                    }
                },
                err => {
                    this.formErrors.activationCode = this.validationMessages['activationCode']['notValidCode'];
                    this.isSubmitting = false;
                }
            );
    }

    onClickResendVerificationCode() {
        this.userService
            .attemptResendActivateCode(this.globalEmail)
            .subscribe(
                data => {
                    if (data.d > 0 && data.d > "1") {
                        this.resentCode = true;
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

    onCliclResetPassword() {
        this.userService
            .attemptResetPassword(this.globalEmail)
            .subscribe(
                data => {
                    if (data >= 1) {}
                    else { //Email exist in db password can be changed
                        this.userService
                            .attemptResetAssociatePassword(this.globalEmail) // Reset for associate
                            .subscribe(
                                data => {
                                    if (data == "0") {
                                        this.resetPassword = true;
                                    }
                                    else {
                                        this.userService
                                            .attemptResetConsumerPassword(this.globalEmail) //Reset for consumer
                                            .subscribe(
                                                data => {
                                                    if (data == "0") {
                                                        this.resetPassword = true;
                                                        this.isSubmitting = false;
                                                    }
                                                    else {
                                                        this.formErrors.activationCode = this.validationMessages['email']['emailInUse'];
                                                        this.isSubmitting = false;
                                                    }
                                                },
                                                err => {
                                                    this.formErrors.activationCode = this.validationMessages['email']['emailInUse'];
                                                    this.isSubmitting = false;
                                                }
                                            );
                                    }
                                },
                                err => {
                                    this.formErrors.activationCode = this.validationMessages['email']['emailInUse'];
                                    this.isSubmitting = false;
                                }
                            );
                    }
                },
                err => {
                    this.resentCode = false;
                    this.isSubmitting = false;
                }
            );
    }

    onKeyup(event) {
        $("#message").css("display", "block");
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
        if (lowerCaseLetters.test(event.controls.password.value)) {
            $("#letter").removeClass("invalid");
            $("#letter").addClass("valid");
        }
        else {
            $("#letter").removeClass("valid");
            $("#letter").addClass("invalid");
        }
        if (upperCaseLetters.test(event.controls.password.value)) {
            $("#capital").removeClass("invalid");
            $("#capital").addClass("valid");
        }
        else {
            $("#capital").removeClass("valid");
            $("#capital").addClass("invalid");
        }
        if (numbers.test(event.controls.password.value)) {
            $("#number").removeClass("invalid");
            $("#number").addClass("valid");
        }
        else {
            $("#number").removeClass("valid");
            $("#number").addClass("invalid");
        }
        if (event.controls.password.value.length < 8) {
            $("#length").removeClass("valid");
            $("#length").addClass("invalid");
        }
        else {
            $("#length").removeClass("invalid");
            $("#length").addClass("valid");
        }
        var str = event.controls.password.value;
        var regex = /[^\w\s]/gi;
        if (regex.test(str) == true) {
            $("#specialcharacter").removeClass("invalid");
            $("#specialcharacter").addClass("valid");
        }
        else {
            $("#specialcharacter").removeClass("valid");
            $("#specialcharacter").addClass("invalid");
        }
    }

}

function isEmailExist(control: AbstractControl): { [key: string]: any } | null {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
        this.debouncer = setTimeout(() => {
            this.userService.validateEmail(control.value).subscribe(
                (data) => {
                    if (data >= 1) {
                        return null;
                    }
                    else {
                        return { 'emalInUse': true };
                    }
                }
                , (err) => {
                    return { 'emalInUse': true };
                });

        }, 1000);

    });

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
}

function matchPasswords(group: AbstractControl): { [key: string]: any } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine) {
        this.authForm.get('associate').disable();
        this.authForm.get('consumer').disable();
        return null;
    } else {
        this.authForm.get('associate').enable();
        this.authForm.get('consumer').enable();
        return { 'passwordMismatch': true };
    }
}

function regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            return null;
        }
        const valid = regex.test(control.value);
        return valid ? null : error;
    };
}

//$("#passwrd").focusin(function () {
//    $("#message").css("display", "block");
//});
//$("#passwrd").blur(function () {
//    $("#message").css("display", "none");
//});
//$("#btnforclose").click(function () {
//    window.location.reload();
//});