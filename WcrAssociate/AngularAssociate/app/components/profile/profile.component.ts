import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';



@Component({
    selector: 'consumer-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    defaultDisableSubmitButton: boolean = true;
    defaultDisableUpdateButton: boolean = true;

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
    public startValueState = null;
    public selectedState:string = null;
    public g_selectedState = null;

    public stateData = null;

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
                'required': 'State is required',
                'letterOnly': 'Alphabetical letters only.'
       },
        'ZipCode': {

            'zipCode': 'Please enter 5 digit zip code.',
            'numericOnly': 'Allowed digits only like nnnnn or nnnnn-nnnn'
        },
        'unitApt':
        {
            'alphaNumeric': 'Allowed alphanumeric only.',
            'alphaNumericWithHash': 'Allowed alphanumeric and hashes only.',
        },
        'MobileNo': {
            'required': 'Mobile no is required',
            'tenDigits': 'Allowed 10 or 7 digits for mobile No like: XXXXXXXXXX or XXXXXXX.',
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
        private fb: FormBuilder, private toaster: Toaster, private cdr: ChangeDetectorRef, private paymentService: PaymentService) { }

    ngOnInit() {
        this.initializeForm();
        this.startValueState = { value: '', label: ''};
        this.selectedState = '';

        this.getProfileDataDetails();
        var thisStatus = this;
        setTimeout(function () {
            thisStatus.profileForm.valueChanges.subscribe(() => {
                debugger;
                if (thisStatus.profileForm.valid) {
                    //thisStatus.cardForm.setErrors({ 'invalid': true });
                    thisStatus.defaultDisableUpdateButton = false;
                }
                else {
                    thisStatus.defaultDisableUpdateButton = true;
                }
            });
        }, 4000);
        this.cdr.detectChanges();
    }

    initializeForm() {
        this.profileForm = this.fb.group({
            userName: ['n'],
            FirstName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            lastName: ['', [patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            Address: ['', [StateValidator(/^[a-zA-Z0-9\-\s]+$/, { alphaNumericWithSpace: true })]],
            city: ['', [StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            stateID: [''],
            unitApt: ['', [StateValidator(/^[a-zA-Z0-9\-\#]+$/, { alphaNumericWithHash: true })]],
            ZipCode: ['', [StateValidator(/^\d+(-\d+)?$/, { numericOnly: true })] ],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
            patternValidator(/\d/, { number: true }),
            patternValidator(/[A-Z]/, { upperLetter: true }),
            patternValidator(/[a-z]/, { lowerLetter: true }),
            patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
            
            ]],
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
                    var thisStatus = this;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ConsumerDetail");
                        

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

                        if (data.FirstName != "" && data.lastName !== "" && data != null && data != "-1" && data != -1) {

                            //this.profileId = data._crdID;

                            //this.userName = data._zip
                            thisStatus.profileForm.get('email').setValue(thisStatus.email);


                            thisStatus.profileForm.get('ZipCode').setValue(thisStatus.ZipCode);
                            thisStatus.profileForm.get('MobileNo').setValue(thisStatus.MobileNo);
                            thisStatus.profileForm.get('FirstName').setValue(thisStatus.FirstName);

                            thisStatus.profileForm.get('city').setValue(thisStatus.city);
                            //thisStatus.profileForm.get('stateID').setValue(thisStatus.stateID);
                            //thisStatus.profileForm.get('userName').setValue(thisStatus.userName);
                            thisStatus.profileForm.get('lastName').setValue(thisStatus.lastName);
                            thisStatus.profileForm.get('password').setValue(thisStatus.password);
                            thisStatus.profileForm.get('Address').setValue(thisStatus.Address);
                            thisStatus.profileForm.get('unitApt').setValue(thisStatus.unitApt);


                            this.bindState();

                            setTimeout(function () {
                                thisStatus.startValueState = { value: data.stateID, label: data.stateID };
                            }, 2000);

                            this.isAddOrUpdateButton = false;
                            this.isProfileFormVisible = false;
                            this.defaultDisableUpdateButton = true;
                        }
                        else {
                            thisStatus.profileForm.get('email').setValue(thisStatus.email);
                            thisStatus.profileForm.get('password').setValue(thisStatus.password)
                            thisStatus.profileForm.get('userName').setValue("n");

                            this.bindState();


                            this.isAddOrUpdateButton = true;
                            this.isProfileFormVisible = true;
                        }
                    }

                });
    }

    changeState() {

        //let city_value = this.cardForm.get('city').value;
        //let state_value: any = this.cardForm.get('state').value;
        //this.bindStateWiseZipCode(state_value.value, city_value);
    }

    bindState() {
        const countryId = "US";//this.cardForm.get('country').value;
        this.paymentService
            .bindState(countryId)
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("States1");
                        var arrState = [];
                        //this.startValueState = '';
                        var thisStatus = this;
                        //arrState.push({ "value": "-1", "label": "Select State" })
                        var val = "";
                        var label = "";
                        $.each(docs, function (i, docs) {
                            if (i == 0) {
                                val = $(docs).find("stateid").text();
                                label = $(docs).find("stateid").text();
                                //thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                            }
                            arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                        });
                        this.stateData = arrState;

                        //if (this.state != "" && this.state !== undefined) {
                        //    this.startValueState = [this.state];//{ value: "1", label: "January" };
                        //    if (this.city != "" && this.city !== undefined) {
                        //        this.bindStateWiseZipCode(this.state, this.city);
                        //    }
                        //}
                        //else {
                        //    this.startValueState = { 'value': val, 'label': label };
                        //}

                    }
                }
            )
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

    abbrState(input, to) {

        var states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];

        if (to == 'abbr') {
            input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            for (let i = 0; i < states.length; i++) {
                if (states[i][0] == input) {
                    return (states[i][1]);
                }
            }
        } else if (to == 'name') {
            input = input.toUpperCase();
            for (let i = 0; i < states.length; i++) {
                if (states[i][1] == input) {
                    return (states[i][0]);
                }
            }
        }
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
            else if (/\d{7}/.test(control.value)) {
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
