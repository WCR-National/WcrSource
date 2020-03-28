import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'AngularAssociate/app/services/auth';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
var LandingRegistrationComponent = /** @class */ (function () {
    function LandingRegistrationComponent(route, router, userService, fb, http, ngZone) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.http = http;
        this.ngZone = ngZone;
        this.showOnValidateEmail = false;
        this.showEmailVerification = false;
        this.formFilledSuccessfully = false;
        this.isSubmitting = false;
        this.tokenFromUI = "7061737323313233";
        this.formErrorMessage = null;
        this.showErrorsPassword = false;
        this.validationMessages = {
            'firstName': {
                'required': 'First Name is required',
                'firstName': 'Alphabetical letters only.'
            },
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
            'terms': {
                'required': 'You must accept terms and conditions'
            }
        };
        this.formErrors = {
            'firstName': '',
            'email': '',
            'password': '',
            'confirmPassword': '',
            'passwordGroup': '',
            'terms': ''
        };
    }
    LandingRegistrationComponent.prototype.ngOnInit = function () {
        this.setValidationOnform();
        this.changeValuesOfFormsEvents();
    };
    LandingRegistrationComponent.prototype.setValidationOnform = function () {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            firstName: ['', [Validators.required]],
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
            terms: ['', Validators.required]
        });
    };
    LandingRegistrationComponent.prototype.changeValuesOfFormsEvents = function () {
        var _this = this;
        this.authForm.valueChanges.subscribe(function (data) {
            _this.formErrorMessage = null;
            _this.logValidationErrors(_this.authForm);
        });
        this.authForm.get('terms').valueChanges.subscribe(function (data) {
            if (data == false) {
                _this.formFilledSuccessfully = false;
            }
            else {
                _this.formFilledSuccessfully = true;
            }
        });
    };
    LandingRegistrationComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.authForm; }
        this.showEmailVerification = false;
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
                            if (messages[errorKey] !== undefined) {
                                _this.formErrors[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }
            if (abstractControl instanceof FormGroup) {
                _this.logValidationErrors(abstractControl);
            }
        });
    };
    LandingRegistrationComponent.prototype.emailAlreadyTaken = function () {
        var _this = this;
        return function (control) {
            var thisUserService = _this.userService;
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(control.value).toLowerCase())) {
                _this.showOnValidateEmail = true;
                return _this.userService
                    .emailAlreadyTaken(control.value)
                    .pipe(map(function (data) {
                    if (data >= 1) {
                        _this.showOnValidateEmail = false;
                        _this.formFilledSuccessfully = false;
                        $('#validateEmailDiv').addClass('has-error');
                        $('#validateEmailDiv').attr('style', 'top: 19% !important');
                        return { emailInUse: true };
                    }
                    else {
                        _this.showOnValidateEmail = false;
                        control.parent.get('passwordGroup').enable();
                        control.parent.get('passwordGroup').get('password').enable();
                        control.parent.get('passwordGroup').get('confirmPassword').enable();
                        $('#validateEmailDiv').removeAttr('style');
                        //control.parent.get('associate').enable();
                        //control.parent.get('consumer').enable();
                        //this.parent.get('terms').enable();
                        _this.formFilledSuccessfully = false;
                        return of(null);
                    }
                }));
            }
        };
    };
    LandingRegistrationComponent.prototype.submitRegistrationForm = function () {
        var _this = this;
        var credentials = this.authForm.value;
        if (this.authForm.valid) {
            this.userService
                .attemptRegisterationAssociate(credentials)
                .subscribe(function (data) {
                if (data >= 1) {
                    _this.isSubmitting = false;
                    _this.request = credentials.email;
                    _this.encryptUsingAES256();
                    credentials.email = _this.encrypted;
                    credentials.email.replace('/', '~');
                    _this.request = credentials.passwordGroup.password;
                    _this.encryptUsingAES256();
                    credentials.passwordGroup.password = _this.encrypted;
                    credentials.passwordGroup.password.replace('/', '~');
                    _this.router.navigate(['activate', '1', credentials.email, credentials.passwordGroup.password]);
                }
                else {
                    _this.isSubmitting = false;
                }
            }, function (err) {
                _this.formErrorMessage = "some internal error. Please try again.";
                _this.isSubmitting = false;
            });
        }
        else {
            this.formErrorMessage = "some internal error. Please try again.";
            this.isSubmitting = false;
        }
    };
    LandingRegistrationComponent.prototype.encryptUsingAES256 = function () {
        var _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        var _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.request), _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        this.encrypted = encrypted.toString();
    };
    LandingRegistrationComponent.prototype.decryptUsingAES256 = function () {
        var _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        var _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        this.decrypted = CryptoJS.AES.decrypt(this.encrypted, _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    };
    LandingRegistrationComponent.prototype.showErrors = function () {
        this.showErrorsPassword = true;
    };
    LandingRegistrationComponent.prototype.hideErrors = function () {
        this.showErrorsPassword = false;
    };
    LandingRegistrationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-landing-registration-page',
            templateUrl: './landing-registration.component.html',
            styleUrls: ['./landing-registration.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, UserService, FormBuilder,
            HttpClient, NgZone])
    ], LandingRegistrationComponent);
    return LandingRegistrationComponent;
}());
export { LandingRegistrationComponent };
function matchPasswords(group) {
    var passwordControl = group.get('password');
    var confirmPasswordControl = group.get('confirmPassword');
    if (group.parent !== undefined) {
        if (passwordControl.value != "" && (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine)) {
            group.parent.get('terms').enable();
            return null;
        }
        else {
            group.parent.get('terms').disable();
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
//# sourceMappingURL=landing-registration.component.js.map