import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/auth';
import { CustomValidator } from '../../shared/validators';
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
        this.resetPassword = false;
        this.validationMessages = {
            'email': {
                'required': 'Email is required',
                'email': 'Email is not in correct format.',
                'emalInUse': 'This Email address is not available. Please Try another email address.'
            },
            'password': {
                'required': 'Password is required',
                'minlength': 'Minimum of 8 char & a max of 20 char in length',
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
                var messages = _this.validationMessages[key];
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            _this.formErrors[key] += messages[errorKey] + ' ';
                        }
                    }
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
            email: ['', [Validators.required, Validators.email, CustomValidator.isEmailExist(this.userService)]],
            passwordGroup: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
                        CustomValidator.regexValidator(new RegExp('^[0-9]+$'), { 'number': '' }),
                        CustomValidator.regexValidator(new RegExp('/[a-z]/g'), { 'lowerLetter': '' }),
                        CustomValidator.regexValidator(new RegExp('/[A-Z]/g'), { 'upperLetter': '' }),
                        CustomValidator.regexValidator(new RegExp('/[^\w\s]/gi'), { 'special Character': '' })
                    ]],
                confirmPassword: ['', [Validators.required,]],
            }, { validator: CustomValidator.matchPasswords }),
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
                    CustomValidator.regexValidator(new RegExp('^[0-9]+$'), { 'number': '' }),
                    CustomValidator.regexValidator(new RegExp('/[a-z]/g'), { 'lowerLetter': '' }),
                    CustomValidator.regexValidator(new RegExp('/[A-Z]/g'), { 'upperLetter': '' }),
                    CustomValidator.regexValidator(new RegExp('/[^\w\s]/gi'), { 'special Character': '' })
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
                _this.authForm.get('email').setValidators([Validators.required, Validators.email, CustomValidator.isEmailExist(_this.userService)]);
                _this.authForm.get('email').updateValueAndValidity();
                _this.authForm.get('passwordGroup').get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20),
                    CustomValidator.regexValidator(new RegExp('^[0-9]+$'), { 'number': '' }),
                    CustomValidator.regexValidator(new RegExp('/[a-z]/g'), { 'lowerLetter': '' }),
                    CustomValidator.regexValidator(new RegExp('/[A-Z]/g'), { 'upperLetter': '' }),
                    CustomValidator.regexValidator(new RegExp('/[^\w\s]/gi'), { 'special Character': '' })
                ]);
                _this.authForm.get('passwordGroup').get('password').updateValueAndValidity();
                _this.authForm.get('passwordGroup').setValidators([CustomValidator.matchPasswords]);
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
    AuthComponent.prototype.onKeyup = function (event) {
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