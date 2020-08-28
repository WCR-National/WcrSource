import * as tslib_1 from "tslib";
import { Component, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PurchaseZipCodeService } from 'AngularAssociate/app/services/associate/purchase-zipcode.service';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import * as moment from 'moment'; // add this 1 of 4
import { Toaster } from "ngx-toast-notifications";
var PurchaseZipCodeComponent = /** @class */ (function () {
    function PurchaseZipCodeComponent(route, router, purchaseZipCodeService, ngZone, paymentService, xmlToJson, fb, modalService, toaster) {
        this.route = route;
        this.router = router;
        this.purchaseZipCodeService = purchaseZipCodeService;
        this.ngZone = ngZone;
        this.paymentService = paymentService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.modalService = modalService;
        this.toaster = toaster;
        this.isSubmitting = false;
        this.itemsPurchasedCount = '';
        this.amountDueAtStartOfNextCycle = '';
        this.nextBillingCycleStart = '';
        this.showSuccessMessage = '';
        this.isAddOrUpdateButton = true;
        this.validationMessages = {
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
        this.validationMessagesSearch = {
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
        this.formErrors = {
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
        this.formErrorsSearch = {
            'city': '',
            'state': '',
            'zipCode': '',
        };
        this.exampleData = null;
        this.stateData = null;
        this.zipCodeData = null;
        this.expYearData = null;
        this.expMonthData = null;
        this.startValueSearchState = null;
        this.selectedSearchState = null;
        this.g_selectedSearchState = null;
        this.startValueState = null;
        this.selectedState = null;
        this.g_selectedState = null;
        this.startValueZip = null;
        this.selectedZip = null;
        this.g_selectedZip = null;
        this.startValueMonth = null;
        this.selectedMonth = null;
        this.g_selectedMonth = null;
        this.startValueYear = null;
        this.selectedYear = null;
        this.g_selectedYear = null;
        this.isVisaOrMCOrAmexOrDisc = null;
        this.formErrorMessage = "";
        this.formErrorMessageSearch = "";
        this.divShowCategorySearch = false;
        this.divShowCategorySearchCS = false;
        this.divShowSubCategorySearchCS = false;
        this.divShowSubCategorySearch = false;
        this.divShowCurrentPurchasedZipCodes = false;
        this.divShowTableSelectedSearch = false;
        this.divZipCodeShow = false;
        this.startValueZipCodeSearchCS = null;
        this.startValueZipCodeSearch = null;
        this.stateSearchData = null;
        this.zipCodeSearchData = null;
        this.zipCodeSearchCSData = null;
        this.categorySearchData = null;
        this.categorySearchCSData = null;
        this.subCategorySearchData = null;
        this.subCategorySearchCSData = null;
        this.isPageLoadCatSrchCS = false;
        this.isPageLoadCatSrch = false;
        this.monthlyBllingDate = "";
    }
    PurchaseZipCodeComponent.prototype.ngOnInit = function () {
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
    };
    PurchaseZipCodeComponent.prototype.initializeEventAndControls = function () {
        this.startValueZip = '';
        this.selectedZip = '';
        this.startValueState = '';
        this.selectedState = '';
    };
    PurchaseZipCodeComponent.prototype.handleChange = function (event) {
        console.log('changed value is ' + event.data[0].id);
    };
    PurchaseZipCodeComponent.prototype.setValidationOnForm = function () {
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
    };
    PurchaseZipCodeComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.cardForm; }
        this.formErrorMessage = "";
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
    PurchaseZipCodeComponent.prototype.logValidationErrorsSearch = function (group) {
        var _this = this;
        if (group === void 0) { group = this.searchForm; }
        this.formErrorMessageSearch = "";
        Object.keys(group.controls).forEach(function (key) {
            var abstractControl = group.get(key);
            _this.formErrorsSearch[key] = '';
            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                _this.formErrorsSearch[key] = "";
                var messages = _this.validationMessagesSearch[key];
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                _this.formErrorsSearch[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }
            if (abstractControl instanceof FormGroup) {
                _this.logValidationErrorsSearch(abstractControl);
            }
        });
    };
    PurchaseZipCodeComponent.prototype.selectCountry = function () {
        var _this = this;
        debugger;
        this.paymentService
            .selectCountry()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("Countries");
                var countries = [];
                $.each(docs, function (i, docs) {
                    countries.push({ "value": $(docs).find("countryid").text(), "label": $(docs).find("countryid").text() });
                });
                _this.exampleData = countries;
            }
        });
    };
    PurchaseZipCodeComponent.prototype.getCardDataDetails = function () {
        var _this = this;
        debugger;
        var thisStatus = this;
        this.paymentService
            .getCardAndBillinInfo()
            .subscribe(function (data) {
            debugger;
            if (data != "" && data != undefined && data != null && data != "-1" && data != -1) {
                if (data._crdID != undefined && data._crdID != "" && data._crdID != null) {
                    debugger;
                    _this.crdId = data._crdID;
                    _this.crd = data._crd;
                    _this.firstName = data._fstName;
                    _this.lastName = data._sndName;
                    _this.address = data._Address;
                    _this.city = data._city;
                    _this.state = data._state;
                    _this.country = data._country;
                    _this.zipCode = data._zip;
                    _this.cardNumber = data._crd;
                    _this.expYear = data._year;
                    _this.CVCNumber = data._cvv;
                    _this.cardType = data._crdType;
                    _this.expMonth = data._months; //(parseInt() + 1).toString();
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
                    _this.bindState();
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
                    var cardType = data._crd.substring(0, 1);
                    if (cardType == "3") {
                        thisStatus.cardForm.get('cardType').setValue("amex");
                        //CheckBox3.Checked = true;
                    }
                    else if (cardType == "6") {
                        _this.cardType = "discover";
                        thisStatus.cardForm.get('cardType').setValue("discover");
                        //CheckBox4.Checked = true;
                    }
                    else if (cardType == "5") {
                        _this.cardType = "mastercard";
                        thisStatus.cardForm.get('cardType').setValue("mastercard");
                        //CheckBox2.Checked = true;
                    }
                    else if (cardType == "4") {
                        _this.cardType = "visa";
                        thisStatus.cardForm.get('cardType').setValue("visa");
                        //CheckBox1.Checked = true;
                    }
                    else {
                        _this.cardType = "amex";
                        thisStatus.cardForm.get('cardType').setValue("amex");
                        //CheckBox3.Checked = true;
                    }
                    _this.isAddOrUpdateButton = false;
                    return false;
                }
                else {
                    _this.bindState();
                    _this.isAddOrUpdateButton = true;
                    thisStatus.cardForm.get('country').setValue("US");
                }
            }
            else {
                _this.bindState();
                _this.isAddOrUpdateButton = true;
                thisStatus.cardForm.get('country').setValue("US");
            }
        });
    };
    PurchaseZipCodeComponent.prototype.bindMonth = function () {
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
            this.startValueMonth = [this.expMonth]; //{ value: "1", label: "January" };
        }
        else {
            this.startValueMonth = { value: "1", label: "January" };
        }
    };
    PurchaseZipCodeComponent.prototype.bindYear = function () {
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
            this.startValueYear = [this.expYear]; //{ value: "1", label: "January" };
        }
        else {
            this.startValueYear = { 'value': "2018", 'label': "2018" };
        }
    };
    PurchaseZipCodeComponent.prototype.submitCardForm = function () {
        var _this = this;
        debugger;
        if (this.cardForm.valid) {
            var credentials = this.cardForm.value;
            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.paymentService
                .addCardAndBillinInfo(credentials)
                .subscribe(function (data) {
                if (data == "1") {
                    _this.showToast('danger', "Something goes wrong. Please Try again.");
                }
                else if (data == "0") {
                    _this.showToast('success', "Your credit card info has been Inserted Successfully.");
                }
                else if (data == "-1") {
                    _this.showToast('success', "Your credit card info has been Inserted Successfully.");
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
    };
    PurchaseZipCodeComponent.prototype.updateCardForm = function () {
        var _this = this;
        debugger;
        var credentials = this.cardForm.value;
        this.isSubmitting = true;
        if (this.cardForm.valid) {
            //this.abbrState(credentials.state, 'to');
            this.paymentService
                .updateCardAndBillinInfo(credentials)
                .subscribe(function (data) {
                if (data == "1") {
                    _this.showToast('danger', "Something goes wrong. Please Try again.");
                }
                else if (data == "0") {
                    _this.showToast('success', "Your credit card info has been Inserted Successfully.");
                }
                else if (data == "-1") {
                    _this.showToast('success', "Your credit card info has been Inserted Successfully.");
                }
                else { }
                _this.isSubmitting = false;
            });
        }
        else {
            this.formErrorMessage = "Please make sure, you entered correct data.";
            this.logValidationErrors(this.cardForm);
            this.isSubmitting = false;
        }
    };
    PurchaseZipCodeComponent.prototype.checkCardNumber = function () {
        debugger;
        var cardNumber = this.cardForm.get('cardNumber').value;
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
    };
    PurchaseZipCodeComponent.prototype.changeCity = function () {
        debugger;
        var city_value = this.cardForm.get('city').value;
        var state_value = this.cardForm.get('state').value;
        this.bindStateWiseZipCode(state_value.value, city_value);
    };
    PurchaseZipCodeComponent.prototype.changeState = function () {
        debugger;
        var city_value = this.cardForm.get('city').value;
        var state_value = this.cardForm.get('state').value;
        this.bindStateWiseZipCode(state_value.value, city_value);
    };
    PurchaseZipCodeComponent.prototype.changeZipCode = function () { };
    PurchaseZipCodeComponent.prototype.changeExpYear = function () { };
    PurchaseZipCodeComponent.prototype.changeExpMonth = function () { };
    PurchaseZipCodeComponent.prototype.bindState = function () {
        var _this = this;
        var countryId = "US"; //this.cardForm.get('country').value;
        this.paymentService
            .bindState(countryId)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("States1");
                var arrState = [];
                //this.startValueState = '';
                var thisStatus = _this;
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
                _this.stateData = arrState;
                if (_this.state != "" && _this.state !== undefined) {
                    _this.startValueState = [_this.state]; //{ value: "1", label: "January" };
                    if (_this.city != "" && _this.city !== undefined) {
                        _this.bindStateWiseZipCode(_this.state, _this.city);
                    }
                }
                else {
                    _this.startValueState = { 'value': val, 'label': label };
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.bindStateWiseZipCode = function (state, city) {
        var _this = this;
        debugger;
        if (state !== undefined) {
            var countryId = "US"; //this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(function (data) {
                debugger;
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("CityWiseZip");
                    var arrState = [];
                    //arrState.push({ "value": "-1", "label": "Select State" });
                    //this.startValueZip = '';
                    var thisStatus = _this;
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
                    _this.zipCodeData = arrState;
                    if (_this.state != "" && _this.state !== undefined) {
                        _this.startValueZip = [_this.state]; //{ value: "1", label: "January" };
                    }
                    else {
                        _this.startValueZip = { 'value': val, 'label': label };
                    }
                }
            });
        }
    };
    PurchaseZipCodeComponent.prototype.smallLettersToCapitalLetters = function (value) {
        value.toUpperCase();
    };
    PurchaseZipCodeComponent.prototype.abbrState = function (input, to) {
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
            for (var i = 0; i < states.length; i++) {
                if (states[i][0] == input) {
                    return (states[i][1]);
                }
            }
        }
        else if (to == 'name') {
            input = input.toUpperCase();
            for (var i = 0; i < states.length; i++) {
                if (states[i][1] == input) {
                    return (states[i][0]);
                }
            }
        }
    };
    /*******************************************************************
     ************************** Search Functions ***********************
     *******************************************************************/
    PurchaseZipCodeComponent.prototype.onClickBtnSearchCityState = function () {
        var _this = this;
        this.divShowCategorySearchCS = false;
        var state_value = this.searchForm.get('state').value;
        var zipCode_value = this.searchForm.get('zipCode').value;
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
                .subscribe(function (data) {
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("ZipcodeExists");
                    if (parseInt($(docs).find("ID").text()) >= 1) {
                        _this.divShowCategorySearchCS = true;
                        _this.BindCategoryZip(zipCode_value.value, "cityState");
                        //this.BindSubCategoryZip(zipCode_value.value, "cityState");
                    }
                    else {
                        _this.formErrorMessageSearch = "Zip code is not available in the database.";
                    }
                }
            });
        }
    };
    PurchaseZipCodeComponent.prototype.onClickBtnSearchZipCode = function () {
        var _this = this;
        this.divShowCategorySearch = false;
        var state_value = this.cardForm.get('state').value;
        var zipCode_value = this.cardForm.get('zipCode').value;
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
                .subscribe(function (data) {
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("ZipcodeExists");
                    if (parseInt($(docs).find("ID").text()) >= 1) {
                        _this.divShowCategorySearch = true;
                        _this.BindCategoryZip(zipCode_value.value, "zipCode");
                        //this.BindSubCategoryZip(zipCode_value.value, "zipCode");
                    }
                    else {
                        _this.formErrorMessageSearch = "Zip code is not available in the database.";
                    }
                }
            });
        }
    };
    PurchaseZipCodeComponent.prototype.bindStateSearch = function () {
        var _this = this;
        debugger;
        this.purchaseZipCodeService
            .BindState()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("States1");
                var arrState = [];
                //this.startValueState = '';
                var thisStatus = _this;
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
                _this.stateSearchData = arrState;
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
        });
    };
    PurchaseZipCodeComponent.prototype.changeStateSearch = function () {
        this.divShowCategorySearchCS = false;
    };
    PurchaseZipCodeComponent.prototype.changeCitySearch = function () {
        this.divShowCategorySearchCS = false;
        this.bindCityWiseState(this.searchForm.get('city').value);
    };
    PurchaseZipCodeComponent.prototype.changeZipCodeSearch = function () {
        debugger;
        this.divShowCategorySearch = false;
    };
    PurchaseZipCodeComponent.prototype.changeZipCodeSearchCS = function () {
        this.divShowCategorySearchCS = false;
    };
    PurchaseZipCodeComponent.prototype.changeCategorySearchCS = function () {
        debugger;
        var subCategoryId;
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        var categoryId = this.searchForm.get('categorySearchCS').value != null ? this.searchForm.get('categorySearchCS').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (categoryId !== undefined && categoryId != null)) {
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
    };
    PurchaseZipCodeComponent.prototype.changeCategorySearch = function () {
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
    };
    PurchaseZipCodeComponent.prototype.changeSubCategorySearchCS = function () {
        debugger;
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        var subCategoryId = this.searchForm.get('subCategorySearchCS').value != null ? this.searchForm.get('subCategorySearchCS').value.value : null;
        //if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
        //}
        if (this.isPageLoadCatSrchCS) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrchCS = true;
    };
    PurchaseZipCodeComponent.prototype.changeSubCategorySearch = function () {
        var zipCode = this.searchForm.get('zipCodeSearch').value.value;
        var subCategoryId = this.searchForm.get('subCategorySearch').value.value;
        //if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
        //}
        if (this.isPageLoadCatSrch) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrch = true;
    };
    PurchaseZipCodeComponent.prototype.bindCityWiseState = function (city) {
        var _this = this;
        debugger;
        if (city !== undefined) {
            var countryId = "US"; //this.cardForm.get('country').value;
            this.purchaseZipCodeService
                .BindCityWiseState(city)
                .subscribe(function (data) {
                debugger;
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("CityWiseStates");
                    var arrState = [];
                    //arrState.push({ "value": "-1", "label": "Select State" });
                    //this.startValueZip = '';
                    var thisStatus = _this;
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
                    _this.stateSearchData = arrState;
                    //if (this.state != "" && this.state !== undefined) {
                    //    this.startValueZip = [this.state];//{ value: "1", label: "January" };
                    //}
                    //else {
                    //    this.startValueZip = { 'value': val, 'label': label };
                    //}
                }
            });
        }
    };
    PurchaseZipCodeComponent.prototype.bindStateWiseZipCodeForSearch = function (state, city) {
        var _this = this;
        debugger;
        if (state !== undefined) {
            var countryId = "US"; //this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(function (data) {
                debugger;
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("CityWiseZip");
                    var arrState = [];
                    //arrState.push({ "value": "-1", "label": "Select Zip Code" });
                    //this.startValueZip = '';
                    var thisStatus = _this;
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
                        _this.formErrorMessageSearch = "City/State Combination is not valid. Try Again";
                        //this.switchNgBTab('cityStateTabId');
                        //$('#cityStateTabId').tab('show');
                    }
                    else {
                        _this.zipCodeSearchData = arrState;
                        //this.switchNgBTab('zipCodeTabId');
                        //$('#zipCodeTabId').tab('show');
                    }
                }
            });
        }
    };
    PurchaseZipCodeComponent.prototype.BindZipCodesByUserZipCode = function (zipCode, selectedTab) {
        var _this = this;
        this.purchaseZipCodeService
            .BindZipCodesByUserZipCode(zipCode)
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("AvailZipCodes");
                var cartd = [];
                if (($(docs).find("id").text() == '')) {
                    _this.divShowCategorySearchCS = false;
                    _this.formErrorMessageSearch = "Service Categories are no longer available in your selected zip code.Please choose another zip code";
                }
                else {
                    _this.formErrorMessageSearch = "";
                    _this.divShowCategorySearchCS = true;
                    var thisStatus = _this;
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
                        _this.zipCodeSearchData = cartd;
                    }
                    else if (selectedTab == 'zipCode') {
                        _this.zipCodeSearchData = cartd;
                    }
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.BindCategoryZip = function (zipCode, selectedTab) {
        var _this = this;
        this.purchaseZipCodeService
            .BindCategoryZipCode(zipCode)
            .subscribe(function (data) {
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
                    var thisStatus = _this;
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
                        _this.categorySearchCSData = cartd;
                    }
                    else if (selectedTab == 'zipCode') {
                        _this.categorySearchData = cartd;
                    }
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.BindSubCategoryZip = function (zipCode, categoryId, selectedTab) {
        var _this = this;
        this.purchaseZipCodeService
            .BindSubCategoryZipCode(zipCode, categoryId)
            .subscribe(function (data) {
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
                    var thisStatus = _this;
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
                        _this.subCategorySearchCSData = cartd;
                    }
                    else if (selectedTab == 'zipCode') {
                        _this.subCategorySearchData = cartd;
                    }
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.onClickTabCityState = function () {
        this.searchForm.get('zipCode').setValue('');
        this.divShowTableSelectedSearch = false;
    };
    PurchaseZipCodeComponent.prototype.onClickTabZipCode = function () {
        this.searchForm.get('city').setValue('');
        this.divShowTableSelectedSearch = false;
        //this.searchForm.get('state').setValue('');
    };
    PurchaseZipCodeComponent.prototype.SetSearchedZipCodes = function (zipCode, subCategorySearch, selectedTab) {
        var _this = this;
        var categoryName, subCategoryName, categoryId, subCategoryId, planId, priceValues, zipCode;
        this.purchaseZipCodeService
            .GetSubCategoryPrice(zipCode, subCategorySearch)
            .subscribe(function (data) {
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
                    zipCode = _this.searchForm.get('zipCodeSearchCS').value.value;
                    categoryName = _this.searchForm.get('subCategorySearchCS').value.label;
                    subCategoryName = _this.searchForm.get('subCategorySearchCS').value.label;
                    categoryId = _this.searchForm.get('subCategorySearchCS').value.value;
                    subCategoryId = _this.searchForm.get('subCategorySearchCS').value.value;
                }
                else {
                    zipCode = _this.searchForm.get('zipCodeSearch').value.value;
                    categoryName = _this.searchForm.get('subCategorySearch').value.label;
                    subCategoryName = _this.searchForm.get('subCategorySearch').value.label;
                    categoryId = _this.searchForm.get('subCategorySearch').value.value;
                    subCategoryId = _this.searchForm.get('subCategorySearch').value.value;
                }
                var arrSearchedZipCode = [];
                var searchedObject = { 'id': 0, Zipcode: zipCode, "CategoryName": categoryName, "SubCategoryName": subCategoryName, "Price": priceValues, "CategoryId": categoryId, "SubCategoryId": subCategoryId };
                arrSearchedZipCode.push(searchedObject);
                _this.initializedDataTableSearchedZipCodes(arrSearchedZipCode);
            }
            else {
                _this.formErrorMessageSearch = "Something went wrong, Try Again!!!";
            }
        });
    };
    PurchaseZipCodeComponent.prototype.initializedDataTableSearchedZipCodes = function (asyncData) {
        console.log(asyncData);
        var dTable = $('#searchedZipCodes');
        var thisStatus = this;
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
            thisStatus.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);
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
                .subscribe(function (data) {
                //thisStatus.getClientDetailsServicesData();
                //thisStatus.getServicesCount();
                //thisStatus.getTotalSalesAndServicesCount();
            });
        });
    };
    PurchaseZipCodeComponent.prototype.CheckOutClick = function (categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        var _this = this;
        this.purchaseZipCodeService
            .ZipCodePurchase()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("ZipcodePurchased");
                var thisStatus = _this;
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
        });
    };
    PurchaseZipCodeComponent.prototype.ZipCodePurchaseCode = function (categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        var _this = this;
        this.purchaseZipCodeService
            .ZipCodePurchaseCode()
            .subscribe(function (data) {
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
                    _this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
                }
                else {
                    _this.open('');
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.ApplyCoponCodeNew = function (cCode, disc, duration, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        var _this = this;
        this.purchaseZipCodeService
            .ApplyCoponCodeNew(1, priceValues, categoryText, zipCode)
            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var monthValue, totalAmount, results;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        if (!(data.d == "1")) return [3 /*break*/, 2];
                        monthValue = 1;
                        totalAmount = $("#lblprice").text();
                        return [4 /*yield*/, Promise.apply(this.purchaseZipCodeService.InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)).ajaxSuccess(function (subData) {
                                if (subData.d == "1") {
                                    _this.showToast('Success', "Zip code successfully purchased!");
                                    _this.showToast('Success', "Credit card has been successfully charged.");
                                    _this.AssociateAlreadyCategories();
                                }
                                if (subData.d == "0") {
                                    _this.showToast('danger', "Failed to buy zip code, already exist.");
                                }
                                if (subData.d == "3") {
                                    _this.showToast('danger', "Error, Something went wrong. Reload page, Try Again!!!");
                                }
                            })];
                    case 1:
                        results = _a.sent();
                        if (data.d == "0") {
                            this.showToast('danger', "Failed to buy zip code, already exist.");
                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Error, Something went wrong. Reload page, Try Again!!!");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    PurchaseZipCodeComponent.prototype.AssociateAlreadyCategories = function () {
        var _this = this;
        this.purchaseZipCodeService
            .MurchantPurchaseCategories()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("PurCategories");
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var resultJson = [];
                var dataJson = JSON.parse(json);
                if (dataJson.PurCategories != null) {
                    if (!Array.isArray(dataJson.PurCategories)) {
                        resultJson.push(dataJson.PurCategories);
                        dataJson.PurCategories = resultJson;
                    }
                    _this.InitializedDataTableCurrentPurchasedZipCodes(dataJson.PurCategories);
                }
                else {
                    _this.InitializedDataTableCurrentPurchasedZipCodes(undefined);
                }
                _this.divShowCurrentPurchasedZipCodes = true;
                var cc = 0;
                var count = 1;
                var totalAmount1 = 0;
                $.each(docs, function (i, docs) {
                    var a = $(docs).find("amount").text();
                    totalAmount1 = totalAmount1 + parseInt(a);
                });
                var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalAmount1 + "</b></td><td></td></tr>";
            }
        });
    };
    PurchaseZipCodeComponent.prototype.InitializedDataTableCurrentPurchasedZipCodes = function (asyncData) {
        console.log(asyncData);
        var dTable = $('#viewAllCurrentPurchasedZipCodes');
        var thisStatus = this;
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'Zip': '',
                'Category': '',
                'Subcategory': "",
                'Cost': "",
                'Cancel': ""
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
                .subscribe(function (data) {
                //thisStatus.getClientDetailsServicesData();
                //thisStatus.getServicesCount();
                //thisStatus.getTotalSalesAndServicesCount();
            });
        });
    };
    PurchaseZipCodeComponent.prototype.ViewAllPurchasedZipCode = function () {
        var _this = this;
        this.purchaseZipCodeService
            .GetPurchasedAllRecords()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("Table1");
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var resultJson = [];
                var dataJson = JSON.parse(json);
                if (dataJson.PurCategories != null) {
                    if (!Array.isArray(dataJson.Table1)) {
                        resultJson.push(dataJson.Table1);
                        dataJson.Table1 = resultJson;
                    }
                    _this.InitializedDataTablePurchasedZipCodes(dataJson.Table1);
                }
                else {
                    _this.InitializedDataTablePurchasedZipCodes(undefined);
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
        });
    };
    PurchaseZipCodeComponent.prototype.InitializedDataTablePurchasedZipCodes = function (asyncData) {
        console.log(asyncData);
        var dTable = $('#viewAllPurchasedZipCodes');
        var thisStatus = this;
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
                .subscribe(function (data) {
                //thisStatus.getClientDetailsServicesData();
                //thisStatus.getServicesCount();
                //thisStatus.getTotalSalesAndServicesCount();
            });
        });
    };
    PurchaseZipCodeComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    PurchaseZipCodeComponent.prototype.getDismissReason = function (reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    PurchaseZipCodeComponent.prototype.switchNgBTab = function (id) {
        this.ctdTabset.select(id);
    };
    PurchaseZipCodeComponent.prototype.ApplyCoponCode = function (cCode, disc, duration) {
        var _this = this;
        var categoryId, subCategoryId, planId, priceValues, zipCode;
        this.purchaseZipCodeService
            .ApplyCoponCode(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
            .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var monthValue, totalAmount, results;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        if (!(data.d == "1")) return [3 /*break*/, 2];
                        monthValue = 1;
                        totalAmount = $("#lblprice").text();
                        return [4 /*yield*/, Promise.apply(this.purchaseZipCodeService.MakeTransaction(monthValue, totalAmount)).ajaxSuccess(function (subData) {
                                if (subData.d == "1") {
                                    _this.showToast('success', "Zip code successfully Purchased!");
                                    _this.showToast('success', "Your Credit Card has been successfully charged.");
                                    _this.divShowTableSelectedSearch = false;
                                    _this.AssociateAlreadyCategories();
                                }
                                if (subData.d == "0") {
                                    jQuery.noConflict();
                                    _this.showToast('danger', "Failed, Already exist!!!");
                                    //$('#fail_message').modal('show');
                                }
                                if (subData.d == "3") {
                                    jQuery.noConflict();
                                    _this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                                }
                            })];
                    case 1:
                        results = _a.sent();
                        if (data.d == "0") {
                            this.showToast('danger', "Failure, Already. Try Again!!!");
                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    PurchaseZipCodeComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
        });
    };
    tslib_1.__decorate([
        ViewChild('ctdTabset'),
        tslib_1.__metadata("design:type", Object)
    ], PurchaseZipCodeComponent.prototype, "ctdTabset", void 0);
    PurchaseZipCodeComponent = tslib_1.__decorate([
        Component({
            selector: 'purchase-zip-code',
            templateUrl: './purchase-zip-code.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, PurchaseZipCodeService, NgZone,
            PaymentService, XMLToJSON,
            FormBuilder, NgbModal, Toaster])
    ], PurchaseZipCodeComponent);
    return PurchaseZipCodeComponent;
}());
export { PurchaseZipCodeComponent };
function patternValidator(regex, error) {
    return function (control) {
        debugger;
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
function StateValidator(regex, error) {
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
function phoneValidator(regex, error) {
    return function (control) {
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
function alphaNumeric(regex, error, status) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        status.smallLettersToCapitalLetters(control.value);
        // test the value of the control against the regexp supplied
        var valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
//# sourceMappingURL=purchase-zip-code.component.js.map