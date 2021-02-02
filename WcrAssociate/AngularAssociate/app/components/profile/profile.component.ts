import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt, ProfilesService } from '../../services/auth';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

import { Errors } from '../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { Toaster } from 'ngx-toast-notifications';



@Component({
    selector: 'consumer-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    isSubmitting: boolean = false;
    profileForm: FormGroup;
    isProfileFormVisible: boolean = true;
    formErrorMessage: string;
    isAddOrUpdateButton: boolean = true;
    profileId: string;
    private FirstName: string = '';
    private lastName: string = '';
    private email: string = '';
    private password: string = '';
    private Address: string = '';
    private unitApt: string = '';
    private city: string = '';
    private stateID: string = '';
    private ZipCode: string = '';
    private MobileNo: string = '';
    private userName: string = '';

    validationMessages = {

        'FirstName': {
            'required': 'First Name is required',
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'lastName': {
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'Address': {
            'alphaNumeric': 'Allowed alphanumeric only.',
            'alphaNumericWithSpace': 'Allowed alphanumeric and spaces only.',
        },
        'city': {
            'letterOnly': 'Alphabetical letters only.'
        },
        'stateID': {
            'letterOnly': 'Alphabetical letters only.'
        },
        'ZipCode': {

            'zipCode': 'Please enter 5 digit zip code.',
            'numericOnly': 'Allowed digits only.'
        },
        'unitApt':
        {
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'MobileNo': {
            'required': 'CVC number is required',
            'numericOnly': 'Allowed digits only.',
            'maxLength': 'Allowed 4 digits only.',
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
        'email': {
            'required': 'Email is required',
            'email': 'Email is not in correct format.',
        },
    }

    formErrors = {
        'FirstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'Address': '',
        'unitApt': '',
        'city': '',
        'stateID': '',
        'ZipCode': '',
        'MobileNo': '',
        'userName': ''
    };

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfilesService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, private toaster: Toaster) { }

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm() {
        this.profileForm = this.fb.group({
            userName: ['n'],
            FirstName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            lastName: ['', [patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            Address: ['', [StateValidator(/^[a-zA-Z0-9\-\s]+$/, { alphaNumericWithSpace: true })]],
            city: ['', [StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            stateID: ['', [StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            unitApt: ['', [StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            ZipCode: ['', [Validators.required]],
            password: ['', [Validators.required, StateValidator(/^[a-zA-Z0-9]+$/, { alphaNumeric: true })]],
            email: ['', [Validators.required]],
            MobileNo: ['', [Validators.required, phoneValidator(/\d{11}/, { elevenDigits: true })]],
        });
    }

    logValidationErrors(group: FormGroup = this.profileForm): void {

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

    getProfileDataDetails() {

        let thisStatus: any = this;
        this.profileService
            .getProfileInfo()
            .subscribe(
                data => {

                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ConsumerDetail");
                        var thisStatus = this;
                        $.each(docs, function (i, docs) {
                            thisStatus.city = $(docs).find("City").text();
                            thisStatus.stateID = $(docs).find("StateId").text();
                            thisStatus.ZipCode = $(docs).find("ZipCode").text();

                            thisStatus.Address = $(docs).find("Address").text();
                            thisStatus.unitApt = $(docs).find("Unit_Apt").text();
                            thisStatus.FirstName = $(docs).find("Name").text();
                            thisStatus.lastName = $(docs).find("LastName").text();
                            thisStatus.email = $(docs).find("EmailId").text();
                            thisStatus.password = $(docs).find("Password").text();
                            thisStatus.MobileNo = $(docs).find("Mob").text();
                        });
                    }

                    if (data != "" && data != undefined && data != null && data != "-1" && data != -1) {

                        //this.profileId = data._crdID;

                        //this.userName = data._zip
                        thisStatus.profileForm.get('ZipCode').setValue(thisStatus.ZipCode);
                        thisStatus.profileForm.get('MobileNo').setValue(thisStatus.MobileNo);
                        thisStatus.profileForm.get('FirstName').setValue(thisStatus.FirstName);

                        thisStatus.profileForm.get('city').setValue(thisStatus.city);
                        thisStatus.profileForm.get('stateID').setValue(thisStatus.stateID);
                        //thisStatus.profileForm.get('userName').setValue(thisStatus.userName);
                        thisStatus.profileForm.get('lastName').setValue(thisStatus.lastName);
                        thisStatus.profileForm.get('password').setValue(thisStatus.password);
                        thisStatus.profileForm.get('Address').setValue(thisStatus.Address);
                        thisStatus.profileForm.get('unitApt').setValue(thisStatus.unitApt);
                        this.isAddOrUpdateButton = false;
                        this.isProfileFormVisible = false;

                    }
                    else {
                        thisStatus.profileForm.get('userName').setValue("n");
                        this.isAddOrUpdateButton = true;
                        this.isProfileFormVisible = true;
                    }
                });
    }

    submitProfileForm() {
        debugger;
        if (this.profileForm.valid) {
            const consumerData = this.profileForm.value;

            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.profileService
                .UpdateConsumer(consumerData)
                .subscribe(
                    data => {
                        if (data.d >= 1) {
                            this.showToast('success', "Profile data saved.");
                            this.isProfileFormVisible = false;
                        }
                        if (data.d == "0") {
                            this.showToast('danger', "Email or mobile no already exists! Please try another one.");
                            this.isProfileFormVisible = true;
                        }
                        if (data.d == "-1") {
                            this.showToast('danger', "OOPS Error ! Please try again.");
                            this.isProfileFormVisible = true;
                        }
                    });

        }
        else {

            this.formErrorMessage = "Please make sure, you entered correct data in all fields.";
            this.logValidationErrors(this.profileForm);
            this.isSubmitting = false;
            return;
        }
    }

    updateProfileForm() {


        if (this.profileForm.valid) {
            const consumerData = this.profileForm.value;

            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.profileService
                .UpdateConsumer(consumerData)
                .subscribe(
                    data => {
                        if (data.d >= 1) {
                            this.showToast('success', "Profile Data Updated.");
                            this.isProfileFormVisible = false;
                        }
                        if (data.d == "0") {
                            this.showToast('danger', "This email or mobile no already exists! Please try another one.");
                            this.isProfileFormVisible = true;
                        }
                        if (data.d == "-1") {
                            this.showToast('danger', "OOPS Error ! Please try again.");
                            this.isProfileFormVisible = true;
                        }
                    });
        }
        else {
            this.formErrorMessage = "Please make sure, you entered correct data.";
            this.logValidationErrors(this.profileForm);
            this.isSubmitting = false;
            return;
        }
    }

    editForm() {
        this.isProfileFormVisible = true;
    }

    cancelForm() {

        this.isProfileFormVisible = false;
    }

    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    }

    smallLettersToCapitalLetters(value) {
        value.toUpperCase();
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

function StateValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
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

function phoneValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        if (control.value[0] == "1") {
            if (/\d{11}/.test(control.value)) {
                // if control is empty return no error
                return null;
            }
            else {
                return { elevenDigits: true };
            }
        }
        else if (control.value[0] != "1") {
            if (/\d{10}/.test(control.value)) {
                // if control is empty return no error
                return null;
            }
            else {
                return { tenDigits: true };
            }
        }
        else {
            return null;
        }

    };
}
