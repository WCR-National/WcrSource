import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/auth';
import { EmailValidator, ParentErrorStateMatcher, PasswordValidator } from '../../_helpers/validators';

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
    isSubmitting = false;
    authForm: FormGroup;
    account_validation_messages = {
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
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder,
        public emailValidator: EmailValidator,
        public passwordValidator: PasswordValidator
    ) {
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

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
            // add form control for username if this is the register page
            if (this.authType === 'register') {
                this.authForm.addControl('username', new FormControl());
            }
        });
    }

    submitForm() {
        this.isSubmitting = true;
        this.errors = { errors: {} };

        const credentials = this.authForm.value;
        this.userService
            .attemptAuth(this.authType, credentials)
            .subscribe(
                data => this.router.navigateByUrl('/'),
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
    }



    // When the user starts to type something inside the password field
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
