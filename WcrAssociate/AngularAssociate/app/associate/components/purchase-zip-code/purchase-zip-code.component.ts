import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';
import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PurchaseZipCodeService } from 'AngularAssociate/app/services/associate/purchase-zipcode.service';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

import * as moment from 'moment'; // add this 1 of 4
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { debug } from 'util';


@Component({
    selector: 'purchase-zip-code',
    templateUrl: './purchase-zip-code.component.html'
})
export class PurchaseZipCodeComponent implements OnInit {

    isSubmitting: boolean = false;

    itemsPurchasedCount: string = '';
    amountDueAtStartOfNextCycle: string = '';
    nextBillingCycleStart: string = '';
    showSuccessMessage: string = '';
    cardForm: FormGroup;
    searchForm: FormGroup;
    isAddOrUpdateButton: boolean = true;

    @ViewChild('ctdTabset') ctdTabset;

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
    };

    validationMessagesSearch = {

        'city': {
            'required': 'City is required',
            'letterOnly': 'Alphabetical letters only.'
        },
        'state': {
            'required': 'State is required',
            'letterOnly': 'Alphabetical letters only.'
        },
        'zipCode': {
            'required': 'Zip Code is required',
            'zipCode': 'Please enter 5 digit zip code.',
            'numericOnly': 'Allowed digits only.'
        },

    };

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

    formErrorsSearch = {

        'city': '',
        'state': '',
        'zipCode': '',
    };

    public exampleData = null;
    public stateData = null;
    public zipCodeData = null;
    public expYearData = null;
    public expMonthData = null;
    
    public startValueSearchState = null;
    public selectedSearchState = null;
    public g_selectedSearchState = null;

    public startValueState = null;
    public selectedState = null;
    public g_selectedState = null;

    public startValueZip = null;
    public selectedZip = null;
    public g_selectedZip = null;

    public startValueMonth = null;
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
    public formErrorMessageSearch = "";

    public closeResult: string;


    public divShowCategorySearch: boolean = false;
    public divShowCategorySearchCS: boolean = false;
    public divShowSubCategorySearchCS: boolean = false;
    public divShowSubCategorySearch: boolean = false;
    public divShowCurrentPurchasedZipCodes: boolean = false;
    public divShowTableSelectedSearch: boolean = false;

    public divZipCodeShow: boolean = false;

    public startValueZipCodeSearchCS = null ;
    public startValueZipCodeSearch = null;


    public stateSearchData = null;
    public zipCodeSearchData = null;
    public zipCodeSearchCSData = null;
    public categorySearchData = null;
    public categorySearchCSData = null;
    public subCategorySearchData = null;
    public subCategorySearchCSData = null;

    public isPageLoadCatSrchCS: boolean = false;
    public isPageLoadCatSrch: boolean = false;



    public monthlyBllingDate: string = "";
    constructor(private route: ActivatedRoute, private router: Router, private purchaseZipCodeService: PurchaseZipCodeService, private ngZone: NgZone,
        private paymentService: PaymentService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, private modalService: NgbModal, private toaster: Toaster) { }


    ngOnInit() {
        this.initializeEventAndControls();

        this.setValidationOnForm();

        this.bindMonth();

        this.bindYear();

        this.getCardDataDetails();


        /**************************************************************
         * ********************* Purchase Zip Code ********************
         * ************************************************************/


        this.bindStateSearch();

        if ((new Date()).getMonth() == 11) {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear() + 1, 0, 1)).format('yyyy-MM-dd');
        }
        else {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 1)).format('yyyy-MM-dd');
        }

        this.ViewAllPurchasedZipCode();

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

        this.searchForm = this.fb.group({
            city: ['', [Validators.required, StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            state: ['', [Validators.required]],
            zipCode: ['', [Validators.required]],
            zipCodeSearchCS: [''],
            zipCodeSearch: [''],
            categorySearchCS: [''],
            categorySearch: [''],
            subCategorySearchCS: [''],
            subCategorySearch: ['']

        });

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

    logValidationErrorsSearch(group: FormGroup = this.searchForm): void {
        this.formErrorMessageSearch = "";
        Object.keys(group.controls).forEach((key: string) => {

            const abstractControl = group.get(key);
            this.formErrorsSearch[key] = '';

            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty))
            {
                this.formErrorsSearch[key] = "";
                const messages = this.validationMessagesSearch[key];
                if (abstractControl.errors != null) {
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                this.formErrorsSearch[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrorsSearch(abstractControl);
            }
        });
    }


    selectCountry() {
        debugger;
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
        debugger;
        let thisStatus: any = this;
        this.paymentService
            .getCardAndBillinInfo()
            .subscribe(
                data => {
                    debugger;
                    if (data != "" && data != undefined && data != null && data != "-1" && data != -1) {
                        if (data._crdID != undefined && data._crdID != "" && data._crdID != null) {
                            debugger;


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

                            return false;
                        }
                        else {
                            this.bindState();
                            this.isAddOrUpdateButton = true;

                            thisStatus.cardForm.get('country').setValue("US");
                        }
                    }
                    else {
                        this.bindState();
                        this.isAddOrUpdateButton = true;
                        thisStatus.cardForm.get('country').setValue("US");
                    }
                });
    }


    bindMonth() {
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
        debugger;

        if (this.cardForm.valid) {
            const credentials = this.cardForm.value;

            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.paymentService
                .addCardAndBillinInfo(credentials)
                .subscribe(
                    data => {

                        if (data == "1") {
                            this.showToast('danger', "Something goes wrong. Please Try again.");
                        }
                        else if (data == "0") {
                            this.showToast('success', "Your credit card info has been Inserted Successfully.");
                        }
                        else if (data == "-1") {
                            this.showToast('success', "Your credit card info has been Inserted Successfully.");
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
        debugger;

        const credentials = this.cardForm.value;
        this.isSubmitting = true;

        if (this.cardForm.valid) {

            //this.abbrState(credentials.state, 'to');
            this.paymentService
                .updateCardAndBillinInfo(credentials)
                .subscribe(
                    data => {

                        if (data == "1") {
                            this.showToast('danger', "Something goes wrong. Please Try again.");
                        }
                        else if (data == "0") {
                            this.showToast('success', "Your credit card info has been Inserted Successfully.");
                        }
                        else if (data == "-1") {
                            this.showToast('success', "Your credit card info has been Inserted Successfully.");
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

    checkCardNumber() {
        debugger;
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
        debugger;
        let city_value = this.cardForm.get('city').value;
        let state_value: any = this.cardForm.get('state').value;

        this.bindStateWiseZipCode(state_value.value, city_value);
    }

    changeState() {
        debugger;
        let city_value = this.cardForm.get('city').value;
        let state_value: any = this.cardForm.get('state').value;

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
                            if (this.city != "" && this.city !== undefined) {
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

        debugger;
        if (state !== undefined) {
            const countryId = "US";//this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(
                    data => {
                        debugger;

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
                                if (i == 0) {
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


    /*******************************************************************
     ************************** Search Functions ***********************
     *******************************************************************/

    onClickBtnSearchCityState() {
        this.divShowCategorySearchCS = false;

        let state_value: any = this.searchForm.get('state').value;
        let zipCode_value: any = this.searchForm.get('zipCode').value;

        if (this.searchForm.get('zipCode').value == "") {
            if (state_value.value == 0 || state_value.value == "0") {
                this.formErrorMessageSearch = "State must be selected.";

                //$("#lblSuccess2").css("display", "block");
                //$("#lblSuccess2").text("");
                //alert("State Can't be blank!");
                return false;
            }
            else if ($("#txtCity").val() == "") {
                this.formErrorMessageSearch = "City can not be blank.";
                return false;
            }
            else {
                //Show categories
                this.bindStateWiseZipCodeForSearch(state_value.value, this.searchForm.get('city').value);
            }
        }
        else {
            this.purchaseZipCodeService
                .IsZipCodeExist(zipCode_value.value)
                .subscribe (
                    data => {

                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("ZipcodeExists");

                            if (parseInt($(docs).find("ID").text()) >= 1) {

                                this.divShowCategorySearchCS = true;
                                this.BindCategoryZip(zipCode_value.value, "cityState");
                                //this.BindSubCategoryZip(zipCode_value.value, "cityState");

                            }
                            else {
                                this.formErrorMessageSearch = "Zip code is not available in the database.";
                            }
                        }

                    });
        }
    }

    onClickBtnSearchZipCode() {
        this.divShowCategorySearch = false;

        let state_value: any = this.cardForm.get('state').value;
        let zipCode_value: any = this.cardForm.get('zipCode').value;

        if (this.cardForm.get('zipCode').value == "") {
            if (state_value.value == 0 || state_value.value == "0") {
                this.formErrorMessageSearch = "State must be selected.";

                //$("#lblSuccess2").css("display", "block");
                //$("#lblSuccess2").text("");
                //alert("State Can't be blank!");
                return false;
            }
            else if ($("#txtCity").val() == "") {
                this.formErrorMessageSearch = "City can not be blank.";
                return false;
            }
            else {
                //Show categories
                this.bindStateWiseZipCodeForSearch(state_value.value, this.searchForm.get('city').value);
            }
        }
        else {
            this.purchaseZipCodeService
                .IsZipCodeExist(zipCode_value.value)
                .subscribe(
                    data => {

                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("ZipcodeExists");

                            if (parseInt($(docs).find("ID").text()) >= 1) {

                                this.divShowCategorySearch = true;
                                this.BindCategoryZip(zipCode_value.value, "zipCode");
                                //this.BindSubCategoryZip(zipCode_value.value, "zipCode");
                            }
                            else {
                                this.formErrorMessageSearch = "Zip code is not available in the database.";
                            }
                        }

                    });
        }
    }

    bindStateSearch() {

        debugger;
        this.purchaseZipCodeService
            .BindState()
            .subscribe(
                data => {
                    debugger;

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
                        this.stateSearchData = arrState;

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


    changeStateSearch() {
        this.divShowCategorySearchCS = false;
    }

    changeCitySearch() {
        this.divShowCategorySearchCS = false;

        this.bindCityWiseState(this.searchForm.get('city').value);
    }

    changeZipCodeSearch() {
        debugger;
        this.divShowCategorySearch = false;
    }

    changeZipCodeSearchCS()
    {
        this.divShowCategorySearchCS = false;

    }

    changeCategorySearchCS() {
        debugger;
        var subCategoryId;

        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        var categoryId = this.searchForm.get('categorySearchCS').value != null ? this.searchForm.get('categorySearchCS').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (categoryId !== undefined && categoryId != null))
        {
            this.BindSubCategoryZip(zipCode, categoryId, 'cityState');
            if (categoryId == 2) {
                subCategoryId = 5;
            }
            else if (categoryId == 5) {
                subCategoryId = 13;
            }
            else if (categoryId == 3) {
                subCategoryId = 8;
            }
            else {
            }
            this.SetSearchedZipCodes(zipCode, subCategoryId, 'cityState');
            this.divShowSubCategorySearchCS = true;


        }

    }

    changeCategorySearch()
    {
        debugger;
        var subCategoryId;
        var zipCode = this.searchForm.get('zipCodeSearch').value != null ? this.searchForm.get('zipCodeSearch').value.value : null;
        var categoryId = this.searchForm.get('categorySearch').value != null ? this.searchForm.get('categorySearch').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (categoryId !== undefined && categoryId != null)) {
            this.BindSubCategoryZip(zipCode, categoryId, 'zipCode');
            if (categoryId == 2) {
                subCategoryId = 5;
            }
            else if (categoryId == 5) {
                subCategoryId = 13;
            }
            else if (categoryId == 3) {
                subCategoryId = 8;
            }
            else {
            }

            this.SetSearchedZipCodes(zipCode, subCategoryId, 'zipCode');
            this.divShowSubCategorySearch = true;

        }
    }

    changeSubCategorySearchCS()
    {
        debugger;
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        var subCategoryId = this.searchForm.get('subCategorySearchCS').value != null ? this.searchForm.get('subCategorySearchCS').value.value : null;
        //if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
        //}
        if (this.isPageLoadCatSrchCS) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrchCS = true;
    }

    changeSubCategorySearch() {
        var zipCode = this.searchForm.get('zipCodeSearch').value.value;
        var subCategoryId = this.searchForm.get('subCategorySearch').value.value;
        //if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
        //}
        if (this.isPageLoadCatSrch) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrch = true;
    }


    


    bindCityWiseState(city) {

        debugger;
        if (city !== undefined) {
            const countryId = "US";//this.cardForm.get('country').value;
            this.purchaseZipCodeService
                .BindCityWiseState(city)
                .subscribe(
                    data => {
                        debugger;

                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CityWiseStates");
                            var arrState = [];
                            //arrState.push({ "value": "-1", "label": "Select State" });
                            //this.startValueZip = '';
                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                if (i == 0) {
                                    val = $(docs).find("stateid").text();
                                    label = $(docs).find("stateid").text();
                                    //thisStatus.startValueZip= { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                }

                                arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                            });

                            this.stateSearchData = arrState;

                            //if (this.state != "" && this.state !== undefined) {
                            //    this.startValueZip = [this.state];//{ value: "1", label: "January" };
                            //}
                            //else {
                            //    this.startValueZip = { 'value': val, 'label': label };
                            //}
                        }
                    }
                )
        }

    }

    bindStateWiseZipCodeForSearch(state, city) {

        debugger;
        if (state !== undefined) {
            const countryId = "US";//this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(
                    data => {
                        debugger;

                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CityWiseZip");
                            var arrState = [];
                            //arrState.push({ "value": "-1", "label": "Select Zip Code" });
                            //this.startValueZip = '';
                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                //if ( $(docs).find("zipcode").text() == thisStatus.searchForm.get('zipCode').value ) {
                                if (i == 0) {
                                    val = $(docs).find("zipcode").text();
                                    label = $(docs).find("zipcode").text();
                                    thisStatus.startValueZipCodeSearchCS = { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                }

                                arrState.push({ "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() });
                            });
                            if (arrState.length == 0) {
                                this.formErrorMessageSearch = "City/State Combination is not valid. Try Again";
                                //this.switchNgBTab('cityStateTabId');

                                //$('#cityStateTabId').tab('show');
                            }
                            else {
                                this.zipCodeSearchData = arrState;
                                //this.switchNgBTab('zipCodeTabId');

                                //$('#zipCodeTabId').tab('show');
                            }


                        }
                    }
                )
        }

    }

    BindZipCodesByUserZipCode( zipCode, selectedTab ) {

        this.purchaseZipCodeService
            .BindZipCodesByUserZipCode(zipCode)
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailZipCodes");
                        var cartd = [];

                        if (($(docs).find("id").text() == '')) {

                            this.divShowCategorySearchCS = false;
                            this.formErrorMessageSearch = "Service Categories are no longer available in your selected zip code.Please choose another zip code";
                        }
                        else {
                            this.formErrorMessageSearch = "";
                            this.divShowCategorySearchCS = true;

                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                if (i == 0) {
                                    val = $(docs).find("id").text();
                                    label = $(docs).find("categoryname").text();
                                    //thisStatus.startValueZip= { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                }

                                cartd.push({ "value": $(docs).find("id").text(), "label": $(docs).find("categoryname").text() });
                            });
                            if (selectedTab == 'cityState') {
                                this.zipCodeSearchData = cartd;
                            }
                            else if (selectedTab == 'zipCode') {
                                this.zipCodeSearchData = cartd;
                            }
                        }
                    }
                }
            );

    }


    BindCategoryZip(zipCode, selectedTab) {

        this.purchaseZipCodeService
            .BindCategoryZipCode(zipCode)
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailZipCodes");
                        var cartd = [];

                        if (($(docs).find("id").text() == '')) {
                            $("#divCategory").css("display", "none");
                            $("#zipcodemsg").css("display", "block");
                            $("#zipcodemsg").text("Service Categories are no longer available in your selected zip code.Please choose another zip code");
                        }
                        else {
                            $("#zipcodemsg").css("display", "none");
                            $("#divCategory").css("display", "block");
                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                if (i == 0) {
                                    val = $(docs).find("id").text();
                                    label = $(docs).find("categoryname").text();
                                    //thisStatus.startValueZip= { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                }

                                cartd.push({ "value": $(docs).find("id").text(), "label": $(docs).find("categoryname").text() });
                            });
                            if (selectedTab == 'cityState') {
                                this.categorySearchCSData = cartd;
                            }
                            else if (selectedTab == 'zipCode') {
                                this.categorySearchData = cartd;
                            }
                        }
                    }
                }
            );

    }

    BindSubCategoryZip(zipCode, categoryId , selectedTab) {
        this.purchaseZipCodeService
            .BindSubCategoryZipCode(zipCode, categoryId)
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailSubCategories");
                        var cartd = [];

                        if (($(docs).find("id").text() == '')) {
                            $("#divCategory").css("display", "none");
                            $("#zipcodemsg").css("display", "block");
                            $("#zipcodemsg").text("Service Categories are no longer available in your selected zip code.Please choose another zip code");
                        }
                        else {
                            $("#zipcodemsg").css("display", "none");
                            $("#divCategory").css("display", "block");
                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                if (i == 0) {
                                    val = $(docs).find("id").text();
                                    label = $(docs).find("name").text();
                                    //thisStatus.startValueZip= { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                }

                                cartd.push({ "value": $(docs).find("id").text(), "label": $(docs).find("name").text().substr(4) });
                            });
                            if (selectedTab == 'cityState') {
                                this.subCategorySearchCSData = cartd;
                            }
                            else if (selectedTab == 'zipCode') {
                                this.subCategorySearchData = cartd;
                            }
                        }
                    }
                }
            );
    }


    onClickTabCityState() {
        this.searchForm.get('zipCode').setValue('');
        this.divShowTableSelectedSearch = false;
    }

    onClickTabZipCode() {
        this.searchForm.get('city').setValue('');
        this.divShowTableSelectedSearch = false;

        //this.searchForm.get('state').setValue('');
    }

    SetSearchedZipCodes(zipCode, subCategorySearch, selectedTab) {

        var categoryName, subCategoryName, categoryId, subCategoryId, planId, priceValues, zipCode;

        this.purchaseZipCodeService
            .GetSubCategoryPrice(zipCode, subCategorySearch )
            .subscribe (
                data => {
                    debugger;
                    if (data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("GetPrice");

                        $.each(docs, function (i, docs) {
                            priceValues = $(docs).find("price").text();
                        });
                        if (selectedTab == 'cityState') {
                            zipCode = this.searchForm.get('zipCodeSearchCS').value.value;
                            categoryName = this.searchForm.get('subCategorySearchCS').value.label;
                            subCategoryName = this.searchForm.get('subCategorySearchCS').value.label;
                            categoryId = this.searchForm.get('subCategorySearchCS').value.value;
                            subCategoryId = this.searchForm.get('subCategorySearchCS').value.value;
                        }
                        else {
                            zipCode = this.searchForm.get('zipCodeSearch').value.value;
                            categoryName = this.searchForm.get('subCategorySearch').value.label;
                            subCategoryName = this.searchForm.get('subCategorySearch').value.label;
                            categoryId = this.searchForm.get('subCategorySearch').value.value;
                            subCategoryId = this.searchForm.get('subCategorySearch').value.value;
                        }
                        var arrSearchedZipCode = [];
                        var searchedObject = { 'id': 0, Zipcode: zipCode, "CategoryName": categoryName, "SubCategoryName": subCategoryName, "Price": priceValues, "CategoryId": categoryId, "SubCategoryId": subCategoryId };
                        arrSearchedZipCode.push(searchedObject);
                        this.initializedDataTableSearchedZipCodes(arrSearchedZipCode);
                    }
                    else {
                        this.formErrorMessageSearch = "Something went wrong, Try Again!!!"
                    }
                }
        );

        
    }

    initializedDataTableSearchedZipCodes(asyncData) {
        console.log(asyncData);

        let dTable: any = $('#searchedZipCodes');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'S.N': '',
                'Zip Code': '',
                'Category': '',
                'Subcategory': "",
                'Price': ""
            };
        }
        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'id'
                },
                {
                    data: 'Zipcode'
                },
                {
                    data: "CategoryName",
                },
                {
                    data: "SubCategoryName",
                },
                {
                    data: "Price",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove purchase">Purchase</a>'
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove cancel">Cancel</a>'
                },
                {
                    data: "CategoryId",
                },
                {
                    data: "SubCategoryId",
                }
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            columnDefs: [
                {
                    targets: [0],
                    className: "hide_column"
                },
                {
                    targets: [7],
                    className: "hide_column"
                },
                {
                    targets: [8],
                    className: "hide_column"
                }
            ],
            order: [[1, 'asc']]
        });

        $('#searchedZipCodes').on('click', 'a.purchase', function (e) {
            e.preventDefault();

            var row = dTable.fnGetPosition($(this).closest('tr')[0]);
            var rowData = dTable.fnGetData(row);
            var rowColumns = rowData[rowData.length - 1];

            var id = rowColumns[0];
            var zipCode = rowColumns[1];
            var categoryText = rowColumns[2];
            var subCategoryText = rowColumns[3];
            var priceValues = rowColumns[4];
            var categoryId = rowColumns[7];
            var subCategoryId = rowColumns[8];


            thisStatus.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId,  '1', priceValues, zipCode);


            //$.each(actionColumnData, function (i, value) {
            //    alert(value.displayValue)
            //});

            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            //dTable.api().row($(this).parents('tr')).remove().draw(false);
           
        });

        $('#searchedZipCodes').on('click', 'a.cancel', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.dashboardService
                .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        //thisStatus.getClientDetailsServicesData();
                        //thisStatus.getServicesCount();
                        //thisStatus.getTotalSalesAndServicesCount();
                    });
        });

    }

    CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode)
    {
        this.purchaseZipCodeService
            .ZipCodePurchase()
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ZipcodePurchased");
                        var thisStatus = this;
                        $.each(docs, function (i, docs) {
                            if (parseInt($(docs).find("Total").text()) < 10) {
                                thisStatus.ZipCodePurchaseCode(categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
                            }
                            else {
                                thisStatus.showToast('danger', "Maximum Limit is expired. You've reached the maximum allowed number of sales advertisment posts.");
                                return false;
                            }
                        });
                    }
                }
            );
    }

    ZipCodePurchaseCode(categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        this.purchaseZipCodeService
            .ZipCodePurchaseCode()
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CheckAssoCard");

                        if (parseInt($(docs).find("id").text()) >= 1) {
                            var a = 0;
                            var b = 0;
                            var c = 0;
                            // ApplycoponCode(a, b, c);
                            this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
                        }
                        else {
                            this.open('');
                        }
                    }
                }
            );
    }

    ApplyCoponCodeNew(cCode, disc, duration, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {


        this.purchaseZipCodeService
            .ApplyCoponCodeNew(1, priceValues, categoryText, zipCode)
            .subscribe(
                async data => {

                    debugger;
                    if (data.d == "1") {
                        var monthValue = 1;// MemberShip.value;
                        var totalAmount = $("#lblprice").text();

                        const results: any = await Promise.apply(this.purchaseZipCodeService.InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)).ajaxSuccess(subData => {

                            if (subData.d == "1")
                            {
                                this.showToast('Success', "Zip code successfully purchased!");
                                this.showToast('Success', "Credit card has been successfully charged.");
                                this.AssociateAlreadyCategories();
                            }
                            if (subData.d == "0") {
                                this.showToast('danger', "Failed to buy zip code, already exist.");
                            }
                            if (subData.d == "3") {
                                this.showToast('danger', "Error, Something went wrong. Reload page, Try Again!!!");
                            }
                        });

                        if (data.d == "0") {
                            this.showToast('danger', "Failed to buy zip code, already exist.");
                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Error, Something went wrong. Reload page, Try Again!!!");
                        }
                    }
                }
            );
    }

    AssociateAlreadyCategories() {

        this.purchaseZipCodeService
            .MurchantPurchaseCategories()
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PurCategories");

                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson: any = [];
                        var dataJson = JSON.parse(json);

                        if (dataJson.PurCategories != null) {
                            if (!Array.isArray(dataJson.PurCategories)) {
                                resultJson.push(dataJson.PurCategories);
                                dataJson.PurCategories = resultJson;
                            }
                            this.InitializedDataTableCurrentPurchasedZipCodes(dataJson.PurCategories);
                        }
                        else {
                            this.InitializedDataTableCurrentPurchasedZipCodes(undefined);
                        }
                        this.divShowCurrentPurchasedZipCodes = true;

                        var cc = 0;
                        var count = 1;
                        var totalAmount1 = 0;
                        $.each(docs, function (i, docs) {
                            var a = $(docs).find("amount").text();
                            totalAmount1 = totalAmount1 + parseInt(a);
                        });
                        var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalAmount1 + "</b></td><td></td></tr>";

                    }
                }
            );
    }

    InitializedDataTableCurrentPurchasedZipCodes(asyncData) {
        console.log(asyncData);

        let dTable: any = $('#viewAllCurrentPurchasedZipCodes');
        let thisStatus: any = this;

        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'Zip': '',
                'Category': '',
                'Subcategory': "",
                'Cost': "",
                'Cancel':""

            };
        }

        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                   data: 'id'
                },
                {
                    data: 'zipcode'
                },
                {
                    data: "categoryname",
                },
                {
                    data: "Name",
                },
                {
                    data: "amount",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove Cancel">Delete</a>'
                },
                {
                    data: 'Zipcode',
                },
                {
                    data: 'subCategoryID',
                }
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            columnDefs: [
                {
                    targets: [0],
                    className: "hide_column"
                },
                {
                    targets: [6],
                    className: "hide_column"
                },
                {
                    targets: [7],
                    className: "hide_column"
                }
            ],
            order: [[1, 'asc']]
        });

        $('#viewAllCurrentPurchasedZipCodes').on('click', 'a.purchase', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());
            dTable.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.dashboardService
                .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        //thisStatus.getClientDetailsServicesData();
                        //thisStatus.getServicesCount();
                        //thisStatus.getTotalSalesAndServicesCount();
                    });
        });
    }


    ViewAllPurchasedZipCode()
    {
        this.purchaseZipCodeService
            .GetPurchasedAllRecords()
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Table1");

                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson: any = [];
                        var dataJson = JSON.parse(json);

                        if (dataJson.PurCategories != null) {
                            if (!Array.isArray(dataJson.Table1)) {
                                resultJson.push(dataJson.Table1);
                                dataJson.Table1 = resultJson;
                            }
                            this.InitializedDataTablePurchasedZipCodes(dataJson.Table1);
                        }
                        else {
                            this.InitializedDataTablePurchasedZipCodes(undefined);
                        }

                        var cc = 0;
                        var count = 1;
                        var totalAmount1 = 0;
                        $.each(docs, function (i, docs) {
                            var a = $(docs).find("amount").text();
                            totalAmount1 = totalAmount1 + parseInt(a);
                        });
                        var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalAmount1 + "</b></td><td></td></tr>";

                    }
                }
            );
    }

    InitializedDataTablePurchasedZipCodes(asyncData) {
        console.log(asyncData);

        let dTable: any = $('#viewAllPurchasedZipCodes');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'Zip': '',
                'Category': '',
                'Subcategory': "",
                'Cost': ""

            };
        }
        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'id'
                },
                {
                    data: 'zipcode'
                },
                {
                    data: "categoryname",
                },
                {
                    data: "Name",
                },
                {
                    data: "amount",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove purchase">Delete</a>'
                },
                {
                    data: 'Zipcode',
                },
                {
                    data: 'subCategoryID',
                }
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            columnDefs: [
                {
                    targets: [0],
                    className: "hide_column"
                },
                {
                    targets: [6],
                    className: "hide_column"
                },
                {
                    targets: [7],
                    className: "hide_column"
                }
            ],
            order: [[1, 'asc']]
        });

        $('#viewAllPurchasedZipCodes').on('click', 'a.purchase', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.dashboardService
                .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        //thisStatus.getClientDetailsServicesData();
                        //thisStatus.getServicesCount();
                        //thisStatus.getTotalSalesAndServicesCount();
                    });
        });
    }

    open(content) {
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

    switchNgBTab(id: string) {
        this.ctdTabset.select(id);
    }

    ApplyCoponCode(cCode, disc, duration) {

        var categoryId, subCategoryId, planId, priceValues, zipCode;

        this.purchaseZipCodeService
            .ApplyCoponCode(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
            .subscribe(
                async data => {

                    debugger;
                    if (data.d == "1") {
                        var monthValue = 1;// MemberShip.value;
                        var totalAmount = $("#lblprice").text();

                        const results: any = await Promise.apply(this.purchaseZipCodeService.MakeTransaction(monthValue, totalAmount)).ajaxSuccess(subData => {

                            if (subData.d == "1") {
                                this.showToast('success', "Zip code successfully Purchased!");
                                this.showToast('success', "Your Credit Card has been successfully charged.");
                                this.divShowTableSelectedSearch = false;

                                this.AssociateAlreadyCategories();
                            }
                            if (subData.d == "0") {
                                jQuery.noConflict();
                                this.showToast('danger', "Failed, Already exist!!!");
                                //$('#fail_message').modal('show');
                            }
                            if (subData.d == "3") {
                                jQuery.noConflict();
                                this.showToast('danger', "Error, Something went wrong. Try Again!!!");

                            }

                        });

                        if (data.d == "0") {
                            this.showToast('danger', "Failure, Already. Try Again!!!");
                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                        }
                    }
                }
            );
    }


    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
        });
    }

}


function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        debugger;
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