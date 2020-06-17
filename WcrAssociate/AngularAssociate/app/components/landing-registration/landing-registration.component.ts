import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'AngularAssociate/app/services/auth';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StickyDirection } from '@angular/cdk/table';


@Component({
    selector: 'app-landing-registration-page',
    templateUrl: './landing-registration.component.html',
    styleUrls: ['./landing-registration.component.css']
})

export class LandingRegistrationComponent implements OnInit {

    authForm: FormGroup;
    showOnValidateEmail: boolean = false;
    showEmailVerification: boolean = false;
    formFilledSuccessfully: boolean = false;
    isSubmitting: boolean = false;
    isSubmittingForm: boolean = false;
    tokenFromUI: string = "7061737323313233";
    formErrorMessage: string = null;
    showErrorsPassword: boolean = false;
    ifFormNotFilledSuccessfully: boolean = true;
    request: string;
    responce: string;

    encrypted: string;
    decrypted: string;
    closeResult: string;
    validationMessages = {
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
}

    formErrors = {
        'firstName': '',
        'email': '',
        'password': '',
        'confirmPassword': '',
        'passwordGroup': '',
        'terms': ''
    };

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder,
        private http: HttpClient, private modalService: NgbModal, private ngZone: NgZone
    ) { }

    ngOnInit() {
        debugger;
        $('#header').hide();

        this.setValidationOnform();
        this.changeValuesOfFormsEvents();
        this.authForm.get('passwordGroup').disable();

        this.authForm.get('passwordGroup').get('password').disable();
        this.authForm.get('passwordGroup').get('confirmPassword').disable();
        this.authForm.get('terms').disable();

        this.authForm.get('email').valueChanges.subscribe((data) => {
            if ((data == "" || data == undefined) || (this.authForm.get('firstName').value == "" || this.authForm.get('associate').value == undefined)) {
                this.authForm.get('password').disable();
                this.authForm.get('confirmPassword').disable();
                this.authForm.get('terms').disable();
            }
            else {
                this.authForm.get('password').enable();
                this.authForm.get('confirmPassword').enable();
            }
        });
        this.authForm.get('terms').valueChanges.subscribe((data) => {
            if (data == true) {
                this.ifFormNotFilledSuccessfully = false;
            }
            else if (data == false) {
                this.ifFormNotFilledSuccessfully = true;
            }
        });
    }

    open(content) {
        debugger;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }



    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    setValidationOnform() {
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
    }

    changeValuesOfFormsEvents() {
        this.authForm.valueChanges.subscribe((data) => {
            this.formErrorMessage = null;
            this.logValidationErrors(this.authForm);
        });
        this.authForm.get('terms').valueChanges.subscribe((data) => {
            if (data == false) {
                this.formFilledSuccessfully = false;
            }
            else {
                this.formFilledSuccessfully = true;
            }
        });
    }

    logValidationErrors(group: FormGroup = this.authForm): void {

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
                }

            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);
            }
        });
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
                                this.showEmailVerification = true;
                                this.formFilledSuccessfully = false;
                                $('#validateEmailDiv').addClass('has-error');
                                $('#validateEmailDiv').attr('style', 'top: 19% !important');
                                control.parent.get('passwordGroup').disable();
                                control.parent.get('passwordGroup').get('password').disable();
                                control.parent.get('passwordGroup').get('confirmPassword').disable();

                                return { emailInUse: true };
                            }
                            else {
                                this.showOnValidateEmail = false;
                                this.showEmailVerification = true;

                                control.parent.get('passwordGroup').enable();
                                control.parent.get('passwordGroup').get('password').enable();
                                control.parent.get('passwordGroup').get('confirmPassword').enable();
                                $('#validateEmailDiv').removeAttr('style');

                                //control.parent.get('associate').enable();
                                //control.parent.get('consumer').enable();

                                //this.parent.get('terms').enable();
                                this.formFilledSuccessfully = false;

                                return of(null);
                            }
                        })

                    );
            }
        }

    }

    submitRegistrationForm() {

        this.isSubmittingForm = true;
        this.authForm.controls['email'].setErrors(null);

        const credentials = this.authForm.value;

        if (this.authForm.valid) {
            this.userService
                .attemptRegisterationAssociate(credentials)
                .subscribe(
                    data => {
                        if (data >= 1) {
                            this.isSubmittingForm = false;
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
                            this.isSubmittingForm = false;
                        }
                    },
                    err => {
                        this.formErrorMessage = "some internal error. Please try again.";
                        this.isSubmitting = false;
                    }
                );
        }
        else {
            this.formErrorMessage = "some internal error. Please try again.";
            //this.Parameters = false;
        }
    }

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

    showErrors() {
        this.showErrorsPassword = true;
    }

    hideErrors() {
        this.showErrorsPassword = false;

    }

}

function matchPasswords(group: AbstractControl): { [key: string]: any } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
    if (group.parent !== undefined) {
        if (passwordControl.value != "" && (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine)) {
            group.parent.get('terms').enable();
            return null;
        } else {
            group.parent.get('terms').disable();
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

