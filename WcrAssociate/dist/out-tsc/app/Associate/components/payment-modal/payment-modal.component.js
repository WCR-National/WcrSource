import * as tslib_1 from "tslib";
import { Component, Optional, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { Toaster } from "ngx-toast-notifications";
import * as $ from 'jquery';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var PaymentModalComponent = /** @class */ (function () {
    function PaymentModalComponent(cdr, route, router, paymentService, xmlToJson, fb, activeModal, toaster) {
        this.cdr = cdr;
        this.route = route;
        this.router = router;
        this.paymentService = paymentService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.activeModal = activeModal;
        this.toaster = toaster;
        this.isSubmitting = false;
        this.isCreditCardFormVisible = false;
        this.salesCount = '';
        this.servicesCount = '';
        this.TotalCount = '';
        this.showSuccessMessage = '';
        this.isAddOrUpdateButton = true;
        this.defaultDeisableUpdateButton = true;
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
        this.exampleData = null;
        this.stateData = null;
        this.zipCodeData = null;
        this.expYearData = null;
        this.expMonthData = null;
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
        this.dismissParentCall = new EventEmitter();
        this.updateParentCall = new EventEmitter();
    }
    PaymentModalComponent.prototype.ngOnInit = function () {
        debugger;
        this.initializeEventAndControls();
        this.setValidationOnForm();
        this.bindMonth();
        this.bindYear();
        this.getCardDataDetails();
        var thisStatus = this;
        setTimeout(function () {
            thisStatus.cardForm.valueChanges.subscribe(function () {
                debugger;
                if (thisStatus.cardForm.valid) {
                    //thisStatus.cardForm.setErrors({ 'invalid': true });
                    thisStatus.defaultDeisableUpdateButton = false;
                }
                else {
                    thisStatus.defaultDeisableUpdateButton = true;
                }
            });
        }, 4000);
        this.cdr.detectChanges();
        //setTimeout(function () {
        //    debugger;
        //    thisStatus.cardForm.valueChanges.subscribe((data) => {
        //        debugger;
        //        if (/^[a-zA-Z]+$/.test(thisStatus.cardForm.controls['firstName'].value))
        //        {
        //            thisStatus.defaultDeisableUpdateButton = false;
        //        }
        //    });
        //}, 8000)
    };
    //public confirm(): void {
    //    if (this.activeModal)
    //        this.activeModal.close();
    //    else
    //        this.model.updated.next();
    //}
    PaymentModalComponent.prototype.dismiss = function () {
        if (this.activeModal) {
            this.activeModal.dismiss();
            this.dismissParentCall.emit('cancel');
        }
    };
    PaymentModalComponent.prototype.initializeEventAndControls = function () {
        this.startValueZip = '';
        this.selectedZip = '';
        this.startValueState = '';
        this.selectedState = '';
    };
    PaymentModalComponent.prototype.handleChange = function (event) {
        console.log('changed value is ' + event.data[0].id);
    };
    PaymentModalComponent.prototype.setValidationOnForm = function () {
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
    PaymentModalComponent.prototype.logValidationErrors = function (group) {
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
    PaymentModalComponent.prototype.selectCountry = function () {
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
    PaymentModalComponent.prototype.getCardDataDetails = function () {
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
                        thisStatus.defaultDeisableUpdateButton = true;
                        thisStatus.cdr.detectChanges();
                    }, 2000);
                    setTimeout(function () {
                        thisStatus.startValueZip = { value: data._zip, label: data._zip };
                        thisStatus.defaultDeisableUpdateButton = true;
                        thisStatus.cdr.detectChanges();
                    }, 3000);
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
                    //this.cardForm.setErrors({ 'incorrect': true });
                    //this.cardForm.controls['firstName'].setErrors({ 'incorrect': true });
                    $('#formDivId').focus();
                    $('#formDivId').focusin();
                    _this.defaultDeisableUpdateButton = true;
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
            //this.cardForm.setErrors({ 'incorrect': true });
            //this.cardForm.controls['firstName'].setErrors({ 'incorrect': true });
        });
    };
    PaymentModalComponent.prototype.bindMonth = function () {
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
    PaymentModalComponent.prototype.bindYear = function () {
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
    PaymentModalComponent.prototype.submitCardForm = function () {
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
                    _this.activeModal.close();
                    _this.updateParentCall.emit('update');
                }
                else if (data == "-1") {
                    _this.showToast('success', "Your credit card info has been Inserted Successfully.");
                    _this.activeModal.close();
                    _this.updateParentCall.emit('update');
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
    PaymentModalComponent.prototype.updateCardForm = function () {
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
                    _this.showToast('success', "Your credit card info has been updated Successfully.");
                    _this.activeModal.close();
                    _this.updateParentCall.emit('update');
                }
                else if (data == "-1") {
                    _this.showToast('success', "Your credit card info has been updated Successfully.");
                    _this.activeModal.close();
                    _this.updateParentCall.emit('update');
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
    PaymentModalComponent.prototype.checkCardNumber = function () {
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
    PaymentModalComponent.prototype.changeCity = function () {
        debugger;
        var city_value = this.cardForm.get('city').value;
        var state_value = this.cardForm.get('state').value;
        this.bindStateWiseZipCode(state_value.value, city_value);
    };
    PaymentModalComponent.prototype.changeState = function () {
        debugger;
        var city_value = this.cardForm.get('city').value;
        var state_value = this.cardForm.get('state').value;
        this.bindStateWiseZipCode(state_value.value, city_value);
    };
    PaymentModalComponent.prototype.changeZipCode = function () { };
    PaymentModalComponent.prototype.changeExpYear = function () { };
    PaymentModalComponent.prototype.changeExpMonth = function () { };
    PaymentModalComponent.prototype.bindState = function () {
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
    PaymentModalComponent.prototype.bindStateWiseZipCode = function (state, city) {
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
    PaymentModalComponent.prototype.smallLettersToCapitalLetters = function (value) {
        value.toUpperCase();
    };
    PaymentModalComponent.prototype.abbrState = function (input, to) {
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
    PaymentModalComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
        });
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PaymentModalComponent.prototype, "dismissParentCall", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PaymentModalComponent.prototype, "updateParentCall", void 0);
    PaymentModalComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-payment-modal-page',
            templateUrl: './payment-modal.component.html'
        }),
        tslib_1.__param(6, Optional()),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ActivatedRoute, Router, PaymentService, XMLToJSON,
            FormBuilder, NgbActiveModal, Toaster])
    ], PaymentModalComponent);
    return PaymentModalComponent;
}());
export { PaymentModalComponent };
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
//# sourceMappingURL=payment-modal.component.js.map