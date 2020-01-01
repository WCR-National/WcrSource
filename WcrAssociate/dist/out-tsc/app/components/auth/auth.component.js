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
        this.resetPassword = false;
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
            if (data == "true") {
                _this.authForm.get('terms').enable();
            }
            else if (data == "false" && _this.authForm.get('consumer').value == "false") {
                _this.authForm.get('terms').disable();
            }
        });
        this.authForm.get('consumer').valueChanges.subscribe(function (data) {
            if (data == "true") {
                _this.authForm.get('terms').enable();
            }
            else if (data == "false" && _this.authForm.get('associate').value == "false") {
                _this.authForm.get('terms').disable();
            }
        });
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
                        patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { lowerLetter: true })
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
            _this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            if (_this.authType === 'login') {
                _this.title = 'Sign in';
                _this.authForm.get('email').clearValidators();
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('email').setValidators([Validators.required, Validators.email]);
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('passwordGroup').clearValidators();
                _this.authForm.get('passwordGroup').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20),
                    patternValidator(/\d/, { number: true }),
                    patternValidator(/[A-Z]/, { upperLetter: true }),
                    patternValidator(/[a-z]/, { lowerLetter: true }),
                    patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { lowerLetter: true })
                    //regexValidatorSpecial(new RegExp('/[^\w\s]/gi'), this)
                ]);
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
                    patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { lowerLetter: true })
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
    AuthComponent.prototype.submitLoginForm = function (email, password) {
        var _this = this;
        if (email === void 0) { email = ""; }
        if (password === void 0) { password = ""; }
        this.isSubmitting = true;
        //this.errors = { errors: {} };
        if (email != "" && password != "") {
            this.router.navigateByUrl('/');
        }
        var credentials = this.authForm.value;
        this.userService
            .attemptAuth(this.authType, credentials)
            .subscribe(function (data) {
            if (data > '0') {
                //this.router.navigateByUrl('/Associate');
                $(location).attr('href', 'https://wcrnational.com/Associate/ViewProfile.aspx');
            }
            else if (data == '-1') {
                _this.userService
                    .attemptConsumerAuth(_this.authType, credentials)
                    .subscribe(function (data) {
                    if (data > '0') {
                        _this.isSubmitting = false;
                        //this.router.navigateByUrl('/Consumer');
                        $(location).attr('href', 'http://wcrSevice/index.html');
                    }
                    else {
                        _this.formErrors.loginCredentials = _this.validationMessages['loginCredentials']['error'];
                        _this.isSubmitting = false;
                    }
                }, function (err) {
                    _this.formErrors.loginCredentials = _this.validationMessages['loginCredentials']['error'];
                    _this.isSubmitting = false;
                });
            }
            else {
                _this.formErrors.loginCredentials = _this.validationMessages['loginCredentials']['error'];
                _this.isSubmitting = false;
            }
        }, function (err) {
            _this.formErrors.loginCredentials = _this.validationMessages['loginCredentials']['error'];
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.submitRegistrationForm = function () {
        var _this = this;
        this.isSubmitting = true;
        //this.errors = { errors: {} };
        var credentials = this.authForm.value;
        this.userService
            .attemptRegister(this.authType, credentials)
            .subscribe(function (data) {
            if (data > 1) {
                _this.isSubmitting = false;
                _this.router.navigateByUrl('/Activate');
            }
            else {
                _this.formErrors.activationCode = _this.validationMessages['activationCode']['message'];
                _this.isSubmitting = false;
            }
        }, function (err) {
            _this.formErrors.activationCode = _this.validationMessages['activationCode']['message'];
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.submitActivationForm = function () {
        var _this = this;
        this.isSubmitting = true;
        //this.errors = { errors: {} };
        var credentials = this.authForm.value;
        this.userService
            .attemptActivateCode(this.authType, credentials)
            .subscribe(function (data) {
            if (data.d == credentials.activationCode) {
                _this.userService
                    .attemptVerfiedActivationCode(_this.authType, _this.globalEmail)
                    .subscribe(function (data) {
                    if (data.d.length > 0) {
                        _this.submitLoginForm(_this.globalEmail, _this.globalPassword);
                    }
                    else {
                        _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
                        _this.isSubmitting = false;
                        _this.activationSent = true;
                    }
                }, function (err) {
                    _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
                    _this.isSubmitting = false;
                });
            }
            else {
                _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
                _this.isSubmitting = false;
            }
        }, function (err) {
            _this.formErrors.activationCode = _this.validationMessages['activationCode']['notValidCode'];
            _this.isSubmitting = false;
        });
    };
    AuthComponent.prototype.onClickResendVerificationCode = function () {
        var _this = this;
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
    AuthComponent.prototype.onCliclResetPassword = function () {
        var _this = this;
        this.userService
            .attemptResetPassword(this.globalEmail)
            .subscribe(function (data) {
            if (data >= 1) { }
            else { //Email exist in db password can be changed
                _this.userService
                    .attemptResetAssociatePassword(_this.globalEmail) // Reset for associate
                    .subscribe(function (data) {
                    if (data == "0") {
                        _this.resetPassword = true;
                    }
                    else {
                        _this.userService
                            .attemptResetConsumerPassword(_this.globalEmail) //Reset for consumer
                            .subscribe(function (data) {
                            if (data == "0") {
                                _this.resetPassword = true;
                                _this.isSubmitting = false;
                            }
                            else {
                                _this.formErrors.activationCode = _this.validationMessages['email']['emailInUse'];
                                _this.isSubmitting = false;
                            }
                        }, function (err) {
                            _this.formErrors.activationCode = _this.validationMessages['email']['emailInUse'];
                            _this.isSubmitting = false;
                        });
                    }
                }, function (err) {
                    _this.formErrors.activationCode = _this.validationMessages['email']['emailInUse'];
                    _this.isSubmitting = false;
                });
            }
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
        if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine) {
            group.parent.get('associate').disable();
            group.parent.get('consumer').disable();
            return null;
        }
        else {
            group.parent.get('associate').enable();
            group.parent.get('consumer').enable();
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