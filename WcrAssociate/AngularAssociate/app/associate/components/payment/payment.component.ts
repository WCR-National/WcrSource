import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';
import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';


import * as $ from 'jquery';

@Component({
    selector: 'associate-payment-page',
    templateUrl: './payment.component.html'
})

export class PaymentComponent implements OnInit {



    isSubmitting: boolean = false;
    isCreditCardFormVisible: boolean = false;

    salesCount: string = '';
    servicesCount: string = '';
    TotalCount: string = '';
    showSuccessMessage: string = '';
    cardForm: FormGroup;
    isAddOrUpdateButton: boolean = true;

    validationMessages = {

        'firstName': {
            'required': 'First Name is required',
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'lastName': {
            'required': 'Last Name is required',
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'address': {
            'required': 'Address is required',
            'alphaNumeric': 'Allowed alphanumeric only.',
            'alphaNumericWithSpace': 'Allowed alphanumeric and spaces only.',

        },
        'city': {
            'required': 'City is required',
            'letterOnly': 'Alphabetical letters only.'
        },
        'state': {
            'required': 'State is required',
            'letterOnly': 'Alphabetical letters only.'
        },
        'country': {
            'required': 'Country is required',
            'letterOnly': 'Alphabetical letters only.'
        },
        'zipCode': {
            'required': 'Zip Code is required',
            'zipCode': 'Please enter 5 digit zip code.',
            'numericOnly': 'Allowed digits only.'
        },
        //'Name': {
        //    'required': 'Name is required',
        //    'letterOnly': 'Allowed alphabeticals letters only.'
        //},
        'cardNumber': {
            'required': 'Card number is required',
            //'letterOnly': 'Allowed alphabeticals letters only.',
            'alphaNumeric': 'Allowed alphanumeric only.'

        },
        'expMonth': {
            'required': 'Expired month is required'
        },
        'expYear': {
            'required': 'Expired year is required'
        },
        'CVCNumber': {
            'required': 'CVC number is required',
            'numericOnly': 'Allowed digits only.',
            'maxLength': 'Allowed 4 digits only.',

        },
        'totalAmount': {
            'required': 'Amount is required',
            'numericOnly': 'Allowed digits only.'
        },
        'cardType': {
            'required': 'Card type is required'
        }
    }

    formErrors = {
        'firstName': '',
        'lastName': '',
        'address': '',
        'city': '',
        'state': '',
        'country': '',
        'zipCode': '',
        //'name': '',
        'cardNumber': '',
        'expMonth': '',
        'expYear': '',
        'CVCNumber': '',
        'cardType': '',
        'totalAmount': ''
    };

    public exampleData = null;
    public stateData = null;
    public zipCodeData = null;

    public expYearData = null;
    public expMonthData = null;



    public startValueState = null;
    public selectedState = null;
    public g_selectedState = null;

    public startValueZip = null;
    public selectedZip = null;
    public g_selectedZip = null;

    public startValueMonth=null;
    public selectedMonth = null;
    public g_selectedMonth = null;

    public startValueYear = null;
    public selectedYear = null;
    public g_selectedYear = null;



    public crdId: string;
    public crd: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public state: string;
    public country: string;
    public zipCode: string;

    public name: string;
    public cardNumber: string;
    public expMonth: string;
    public expYear: string;
    public CVCNumber: string;
    public cardType: string;

    public isVisaOrMCOrAmexOrDisc: string = null;

    public cardTypeSelector: string;

    public formErrorMessage = "";
    constructor(private route: ActivatedRoute, private router: Router, private paymentService: PaymentService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, ) {

    }

    ngOnInit() {

        
        this.initializeEventAndControls();

        this.setValidationOnForm();

        this.bindMonth();

        this.bindYear();

        this.getCardDataDetails();
    }

    initializeEventAndControls() {

        this.startValueZip = '';
        this.selectedZip = '';

        this.startValueState = '';
        this.selectedState = '';
    }

    handleChange(event): void {
        console.log('changed value is ' + event.data[0].id);
    }

    setValidationOnForm() {

        this.cardForm = this.fb.group({
            cardid: [''],
            firstName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            lastName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            address: ['', [Validators.required, StateValidator(/^[a-zA-Z0-9\-\s]+$/, { alphaNumericWithSpace: true })]],
            city: ['', [Validators.required, StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            state: ['', [Validators.required]],
            country: ['', [Validators.required, StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            zipCode: ['', [Validators.required]],

            //name        : ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            cardNumber: ['', [Validators.required, StateValidator(/^[a-zA-Z0-9]+$/, { alphaNumeric: true })]],
            expMonth: ['', [Validators.required]],
            expYear: ['', [Validators.required]],
            CVCNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4), StateValidator(/^[0-9]+$/, { numericOnly: true })]],
            cardType: [''],
            totalAmount: [''] //, [Validators.required, StateValidator(/^[0-9]+$/, { numericOnly: true })]

        });
    }

    logValidationErrors(group: FormGroup = this.cardForm): void {
        this.formErrorMessage = "";
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

    selectCountry() {
        
        this.paymentService
            .selectCountry()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Countries");
                        var countries = [];
                        $.each(docs, function (i, docs) {
                            countries.push({ "value": $(docs).find("countryid").text(), "label": $(docs).find("countryid").text() });
                        });
                        this.exampleData = countries;
                    }
                }
            )
    }

    getCardDataDetails() {
        
        let thisStatus: any = this;
        this.paymentService
            .getCardAndBillinInfo()
            .subscribe(
                data => {
                    
                    if (data != "" && data != undefined && data != null && data != "-1" && data != -1) {
                        if (data._crdID != undefined && data._crdID != "" && data._crdID != null) {
                            


                            this.crdId = data._crdID;
                            this.crd = data._crd;

                            this.firstName = data._fstName;
                            this.lastName = data._sndName;
                            this.address = data._Address
                            this.city = data._city
                            this.state = data._state
                            this.country = data._country
                            this.zipCode = data._zip

                            this.cardNumber = data._crd;
                            this.expYear = data._year;
                            this.CVCNumber = data._cvv;
                            this.cardType = data._crdType;


                            this.expMonth = data._months; //(parseInt() + 1).toString();


                            thisStatus.cardForm.get('cardid').setValue(data._crdID);
                            thisStatus.cardForm.get('cardNumber').setValue(data._crd);
                            thisStatus.cardForm.get('firstName').setValue(data._fstName);
                            thisStatus.cardForm.get('lastName').setValue(data._sndName);
                            thisStatus.cardForm.get('address').setValue(data._Address);
                            thisStatus.cardForm.get('city').setValue(data._city);
                            thisStatus.cardForm.get('country').setValue(data._country);
                            thisStatus.cardForm.get('CVCNumber').setValue(data._cvv);
                            thisStatus.cardForm.get('cardType').setValue(data._crdType);

                            thisStatus.startValueYear = { value: data._year, label: data._year };

                            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                            var selectedMonthName = months[(parseInt(data._months) - 1)];

                            thisStatus.startValueMonth = { value: data._months, label: selectedMonthName };

                            this.bindState();
                            
                            //this.bindStateWiseZipCode(data._state, data._city);

                            setTimeout(function () {
                                thisStatus.startValueState = { value: data._state, label: data._state };
                            }, 2000);

                            setTimeout(function () {
                                thisStatus.startValueZip = { value: data._zip, label: data._zip }; 
                            }, 4000);

                            //required to change to set selected values
                            //thisStatus.cardForm.get('expYear').setValue(data._year);
                            //thisStatus.cardForm.get('zipCode').setValue(data._zip
                            //thisStatus.cardForm.get('state').setValue(thisStatus.startValueState);

                            //thisStatus.startValueZip = { "": "", "": "" };
                            //

                            //thisStatus.startValueMonth = { "": "", "": "" };
                            //thisStatus.cardForm.get('expMonth').setValue(data._months);


                            let cardType = data._crd.substring(0, 1);
                            if (cardType == "3") {
                                thisStatus.cardForm.get('cardType').setValue("amex");
                                //CheckBox3.Checked = true;
                            }
                            else if (cardType == "6") {
                                this.cardType = "discover";
                                thisStatus.cardForm.get('cardType').setValue("discover");
                                //CheckBox4.Checked = true;
                            }
                            else if (cardType == "5") {
                                this.cardType = "mastercard";

                                thisStatus.cardForm.get('cardType').setValue("mastercard");
                                //CheckBox2.Checked = true;
                            }
                            else if (cardType == "4") {
                                this.cardType = "visa";

                                thisStatus.cardForm.get('cardType').setValue("visa");
                                //CheckBox1.Checked = true;
                            }
                            else {
                                this.cardType = "amex";

                                thisStatus.cardForm.get('cardType').setValue("amex");
                                //CheckBox3.Checked = true;
                            }
                            this.isAddOrUpdateButton = false;
                            this.isCreditCardFormVisible = false;

                            return false;
                        }
                        else {
                            this.bindState();
                            thisStatus.cardForm.get('country').setValue("US");
                            this.isAddOrUpdateButton = true;
                            this.isCreditCardFormVisible = true;
                        }
                    }
                    else {
                        this.bindState();
                        thisStatus.cardForm.get('country').setValue("US");
                        this.isAddOrUpdateButton = true;
                        this.isCreditCardFormVisible = true;
                    }
                });
    }


    bindMonth()
    {
        this.expMonthData = [
            //{ value: "0", label: "Month" },
            { value: "1", label: "January" },
            { value: "2", label: "February" },
            { value: "3", label: "March" },
            { value: "4", label: "April" },
            { value: "5", label: "May" },
            { value: "6", label: "June" },
            { value: "7", label: "July" },
            { value: "8", label: "August" },
            { value: "9", label: "September" },
            { value: "10", label: "October" },
            { value: "11", label: "November" },
            { value: "12", label: "December" },
        ];
        if (this.expMonth != "" && this.expMonth !== undefined) {
            this.startValueMonth = [this.expMonth];//{ value: "1", label: "January" };
        }
        else {
            this.startValueMonth = { value: "1", label: "January" };
        }

    }

    bindYear() {
        this.expYearData = [
            { 'value': "2018", 'label': "2018" },
            { 'value': "2019", 'label': "2019" },
            { 'value': "2020", 'label': "2020" },
            { 'value': "2021", 'label': "2021" },
            { 'value': "2022", 'label': "2022" },
            { 'value': "2023", 'label': "2023" },
            { 'value': "2024", 'label': "2024" },
            { 'value': "2025", 'label': "2025" },
            { 'value': "2026", 'label': "2026" },
            { 'value': "2027", 'label': "2027" },
            { 'value': "2028", 'label': "2028" },
        ];
        if (this.expYear != "" && this.expYear !== undefined) {
            this.startValueYear = [this.expYear];//{ value: "1", label: "January" };
        }
        else {
            this.startValueYear = { 'value': "2018", 'label': "2018" };
        }
    }

    submitCardForm() {
        

        if (this.cardForm.valid) {
            const credentials = this.cardForm.value;

            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.paymentService
                .addCardAndBillinInfo(credentials)
                .subscribe(
                    data => {

                        if (data == "1") {
                            $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                            this.isCreditCardFormVisible = true;
                        }
                        else if (data == "0") {
                            $("#lbldetail").text("Your credit card info has been Inserted Successfully.")
                            this.isCreditCardFormVisible = false;
                        }
                        else if (data == "-1") {
                            $("#lbldetail").text("Your credit card info has been Inserted Successfully.");
                            this.isCreditCardFormVisible = true;
                        }
                        else { }
                    });
        }
        else {
            this.formErrorMessage = "Please make sure, you entered correct data."; 
            this.logValidationErrors(this.cardForm);
            this.isSubmitting = false;
            return;
        }
    }

    updateCardForm() {
        
        
        const credentials = this.cardForm.value;
        this.isSubmitting = true;

        if (this.cardForm.valid) {

            //this.abbrState(credentials.state, 'to');
            this.paymentService
                .updateCardAndBillinInfo(credentials)
                .subscribe(
                    data => {

                        if (data == "1") {
                            $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                            this.isCreditCardFormVisible = true;
                        }
                        else if (data == "0" || data == 0) {
                            this.getCardDataDetails();
                            $("#lbldetail").text("Your credit card info has been Inserted Successfully.")
                            this.isCreditCardFormVisible = false;
                        }
                        else if (data == "-1") {
                            $("#lbldetail").text("Your credit card info has been Inserted Successfully.");
                            this.isCreditCardFormVisible = true;
                        }
                        else { }
                        this.isSubmitting = false;
                    });
        }
        else {
            this.formErrorMessage = "Please make sure, you entered correct data."; 
            this.logValidationErrors(this.cardForm);
            this.isSubmitting = false;
        }
    }

    checkCardNumber()
    {
        
        let cardNumber = this.cardForm.get('cardNumber').value;
        if (cardNumber.charAt(0) == "3") {
            this.isVisaOrMCOrAmexOrDisc = "amex";
            this.cardTypeSelector = "amex";
        }
        else if (cardNumber.charAt(0) == "4") {
            this.isVisaOrMCOrAmexOrDisc = "visa";
            this.cardTypeSelector = "visa";
        }
        else if (cardNumber.charAt(0) == "5") {
            this.isVisaOrMCOrAmexOrDisc = "mastercard";
            this.cardTypeSelector = "mastercard";
        }
        else if (cardNumber.charAt(0) == "6") {
            this.isVisaOrMCOrAmexOrDisc = "discover";
            this.cardTypeSelector = "discover";
        }
    }

    changeCity() {
        
        let city_value = this.cardForm.get('city').value;
        let state_value: any = this.cardForm.get('state').value;

        this.bindStateWiseZipCode(state_value.value, city_value);
    }

    changeState() {
        
        let city_value = this.cardForm.get('city').value;
        let state_value:any = this.cardForm.get('state').value;

        this.bindStateWiseZipCode(state_value.value, city_value);
    }

    changeZipCode() { }

    changeExpYear() { }

    changeExpMonth() { }


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

                        if (this.state != "" && this.state !== undefined) {
                            this.startValueState = [this.state];//{ value: "1", label: "January" };
                            if (this.city != "" && this.city !== undefined)
                            {
                                this.bindStateWiseZipCode(this.state, this.city);
                            }
                        }
                        else {
                            this.startValueState = { 'value': val, 'label': label };
                        }

                    }
                }
            )
    }

    bindStateWiseZipCode(state, city) {

        
        if (state !== undefined) {
            const countryId = "US";//this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(
                    data => {
                        

                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CityWiseZip");
                            var arrState = [];
                            //arrState.push({ "value": "-1", "label": "Select State" });
                            //this.startValueZip = '';
                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                if (i == 0)
                                {
                                    val = $(docs).find("zipcode").text();
                                    label = $(docs).find("zipcode").text();
                                    //thisStatus.startValueZip= { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                }

                                arrState.push({ "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() });
                            });
                            this.zipCodeData = arrState;

                            if (this.state != "" && this.state !== undefined) {
                                this.startValueZip = [this.state];//{ value: "1", label: "January" };
                            }
                            else {
                                this.startValueZip = { 'value': val, 'label': label };
                            }
                        }
                    }
                )
        }

    }

    editForm() {
        this.isCreditCardFormVisible = true;
    }

    cancelForm() {
        
        this.isCreditCardFormVisible = false;
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
            else {
                return { tenDigits: true };
            }
        }
        else {
            return null;
        }

    };
}

function alphaNumeric(regex: RegExp, error: ValidationErrors, status): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        status.smallLettersToCapitalLetters(control.value);
        // test the value of the control against the regexp supplied
        const valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}