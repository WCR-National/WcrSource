import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/auth';
import { EmailValidator, PasswordValidator } from '../../_helpers/validators';
import * as $ from 'jquery';
var AuthComponent = /** @class */ (function () {
    function AuthComponent(route, router, userService, fb, emailValidator, passwordValidator) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.emailValidator = emailValidator;
        this.passwordValidator = passwordValidator;
        this.authType = '';
        this.title = '';
        this.errors = { errors: {} };
        this.isSubmitting = false;
        this.account_validation_messages = {
            'username': [
                { type: 'required', message: 'Email is required' },
                { type: 'minlength', message: 'Username must be at least 5 characters long' },
                { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
                { type: 'pattern', message: 'Your username must contain only numbers and letters' },
                { type: 'validUsername', message: 'Your username has already been taken' }
            ],
            'email': [
                { type: 'required', message: 'Email is required' },
                { type: 'pattern', message: 'Enter a valid email' },
                { type: 'emalInUse', message: 'This Email address is not available. Please Try another email address.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required' },
                { type: 'areEqual', message: 'Password mismatch' }
            ],
            'password': [
                { type: 'required', message: 'Password is required' },
                { type: 'minlength', message: 'Minimum of 8 char & a max of 20 char in length' },
                { type: 'pattern', message: 'Must contain at least one uppercase, one lowercase, one number and 1 special character in ! @ # $ % ^ * _ ' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions' }
            ]
        };
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                emailValidator.checkEmail.bind(emailValidator)
            ])),
            'password': [''],
            //confirmPassword: this.matching_passwords_group,
            terms: new FormControl(false, Validators.pattern('true'))
        });
        $("#passwrd").focusin(function () {
            $("#message").css("display", "block");
        });
        $("#passwrd").blur(function () {
            $("#message").css("display", "none");
        });
        $("#btnforclose").click(function () {
            window.location.reload();
        });
    }
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.url.subscribe(function (data) {
            // Get the last piece of the URL (it's either 'login' or 'register')
            _this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            _this.title = (_this.authType === 'login') ? 'Sign in' : 'Sign up';
            // add form control for username if this is the register page
            if (_this.authType === 'register') {
                _this.authForm.addControl('username', new FormControl());
            }
        });
    };
    AuthComponent.prototype.submitForm = function () {
        var _this = this;
        this.isSubmitting = true;
        this.errors = { errors: {} };
        var credentials = this.authForm.value;
        this.userService
            .attemptAuth(this.authType, credentials)
            .subscribe(function (data) { return _this.router.navigateByUrl('/'); }, function (err) {
            _this.errors = err;
            _this.isSubmitting = false;
        });
    };
    // When the user starts to type something inside the password field
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
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            UserService,
            FormBuilder,
            EmailValidator,
            PasswordValidator])
    ], AuthComponent);
    return AuthComponent;
}());
export { AuthComponent };
//# sourceMappingURL=auth.component.js.map