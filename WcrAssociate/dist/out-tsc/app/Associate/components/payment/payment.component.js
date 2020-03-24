import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import * as $ from 'jquery';
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(route, router, paymentService, xmlToJson, fb) {
        this.route = route;
        this.router = router;
        this.paymentService = paymentService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.isSubmitting = false;
        this.isCreditCardFormVisible = false;
        this.salesCount = '';
        this.servicesCount = '';
        this.TotalCount = '';
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
                'alphaNumeric': 'Allowed alphanumeric only.'
            },
            'city': {
                'required': 'City is required',
                'letterOnly': 'Allowed alphabeticals letters only.'
            },
            'state': {
                'required': 'State is required',
                'letterOnly': 'Allowed alphabeticals letters only.'
            },
            'country': {
                'required': 'Country is required',
                'letterOnly': 'Allowed alphabeticals letters only.'
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
                'numericOnly': 'Allowed digits only.'
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
            'firstName ': '',
            'lastName ': '',
            'address ': '',
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
    }
    PaymentComponent.prototype.ngOnInit = function () {
        debugger;
        this.initializeEventAndControls();
        this.setValidationOnForm();
        this.bindMonth();
        this.bindYear();
        this.getCardDataDetails();
    };
    PaymentComponent.prototype.initializeEventAndControls = function () {
        this.startValueZip = '';
        this.selectedZip = '';
        this.startValueState = '';
        this.selectedState = '';
    };
    PaymentComponent.prototype.handleChange = function (event) {
        console.log('changed value is ' + event.data[0].id);
    };
    PaymentComponent.prototype.setValidationOnForm = function () {
        this.cardForm = this.fb.group({
            cardid: [''],
            firstName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            lastName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            address: ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            city: ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            state: ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            country: ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            zipCode: ['', [Validators.required, StateValidator(/^[0-9]+$/, { numericOnly: true })]],
            //name        : ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            cardNumber: ['', [Validators.required, StateValidator(/^[a-zA-Z0-9]+$/, { alphaNumeric: true })]],
            expMonth: ['', [Validators.required]],
            expYear: ['', [Validators.required]],
            CVCNumber: ['', [Validators.required, StateValidator(/^[0-9]+$/, { numericOnly: true })]],
            cardType: ['', [Validators.required]],
            totalAmount: [''] //, [Validators.required, StateValidator(/^[0-9]+$/, { numericOnly: true })]
        });
    };
    PaymentComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.cardForm; }
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
    PaymentComponent.prototype.changeCity = function () {
        var city_value = this.cardForm.get('city').value;
        var state_value = this.cardForm.get('state').value;
        this.bindStateWiseZipCode(state_value, city_value);
    };
    PaymentComponent.prototype.changeState = function (event) {
        var city_value = this.cardForm.get('city').value;
        var state_value = event.data[0].id;
        this.bindStateWiseZipCode(state_value, city_value);
    };
    PaymentComponent.prototype.changeZipCode = function (event) { };
    PaymentComponent.prototype.selectCountry = function () {
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
                    countries.push({ "id": $(docs).find("countryid").text(), "text": $(docs).find("countryid").text() });
                });
                _this.exampleData = countries;
            }
        });
    };
    PaymentComponent.prototype.getCardDataDetails = function () {
        var _this = this;
        debugger;
        var thisStatus = this;
        this.paymentService
            .getCardAndBillinInfo()
            .subscribe(function (data) {
            if (data != "" && data != undefined && data != null) {
                if (data._crdID != undefined || data._crdID != "" || data._crdID != null) {
                    _this.isAddOrUpdateButton = false;
                }
                thisStatus.profileForm.get('cardid').setValue(data._crdID);
                thisStatus.profileForm.get('cardNumber ').setValue(data._crd);
                thisStatus.profileForm.get('firstName').setValue(data._fstName);
                thisStatus.profileForm.get('lastName').setValue(data._sndName);
                thisStatus.profileForm.get('address').setValue(data._Address);
                thisStatus.profileForm.get('city').setValue(data._city);
                thisStatus.profileForm.get('state').setValue(data._state);
                thisStatus.profileForm.get('zipCode').setValue(data._zip);
                thisStatus.profileForm.get('country').setValue(data._country);
                thisStatus.profileForm.get('CVCNumber').setValue(data._cvv);
                thisStatus.profileForm.get('expMonth').setValue(data._months);
                thisStatus.profileForm.get('expYear').setValue(data._year);
                thisStatus.profileForm.get('cardType').setValue(data._crdType);
                var cardType = data._crd.TrimStart('0').Substring(0, 1);
                if (cardType == "3") {
                    thisStatus.profileForm.get('cardType').setValue("amex");
                    //CheckBox3.Checked = true;
                }
                else if (cardType == "6") {
                    thisStatus.profileForm.get('cardType').setValue("discover");
                    //CheckBox4.Checked = true;
                }
                else if (cardType == "5") {
                    thisStatus.profileForm.get('cardType').setValue("mastercard");
                    //CheckBox2.Checked = true;
                }
                else if (cardType == "4") {
                    thisStatus.profileForm.get('cardType').setValue("visa");
                    //CheckBox1.Checked = true;
                }
                else {
                    thisStatus.profileForm.get('cardType').setValue("amex");
                    //CheckBox3.Checked = true;
                }
            }
            else {
                _this.bindState();
                thisStatus.profileForm.get('country').setValue("US");
                _this.isAddOrUpdateButton = true;
            }
        });
    };
    PaymentComponent.prototype.bindMonth = function () {
        this.expMonthData = [
            { id: "0", text: "Month" },
            { id: "1", text: "January" },
            { id: "2", text: "February" },
            { id: "3", text: "March" },
            { id: "4", text: "April" },
            { id: "5", text: "May" },
            { id: "6", text: "June" },
            { id: "7", text: "July" },
            { id: "8", text: "August" },
            { id: "9", text: "September" },
            { id: "10", text: "October" },
            { id: "11", text: "November" },
            { id: "12", text: "December" },
        ];
        this.startValueMonth = "2018";
    };
    PaymentComponent.prototype.bindYear = function () {
        this.expYearData = [
            { id: "2018", text: "2018" },
            { id: "2019", text: "2019" },
            { id: "2020", text: "2020" },
            { id: "2021", text: "2021" },
            { id: "2022", text: "2022" },
            { id: "2023", text: "2023" },
            { id: "2024", text: "2024" },
            { id: "2025", text: "2025" },
            { id: "2026", text: "2026" },
            { id: "2027", text: "2027" },
            { id: "2028", text: "2028" },
        ];
        this.startValueYear = "2018";
    };
    PaymentComponent.prototype.bindState = function () {
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
                arrState.push({ "id": "-1", "text": "Select State" });
                $.each(docs, function (i, docs) {
                    arrState.push({ "id": $(docs).find("stateid").text(), "text": $(docs).find("stateid").text() });
                });
                _this.stateData = arrState;
            }
        });
    };
    PaymentComponent.prototype.bindStateWiseZipCode = function (state, city) {
        var _this = this;
        var countryId = "US"; //this.cardForm.get('country').value;
        this.paymentService
            .bindStateWiseZipCode(state, city)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("States1");
                var arrState = [];
                arrState.push({ "id": "-1", "text": "Select State" });
                //this.startValueZip = '';
                $.each(docs, function (i, docs) {
                    arrState.push({ "id": $(docs).find("stateid").text(), "text": $(docs).find("stateid").text() });
                });
                _this.stateData = arrState;
            }
        });
    };
    PaymentComponent.prototype.submitCardForm = function () {
        var _this = this;
        var credentials = this.cardForm.value;
        this.abbrState(credentials.state, 'to');
        this.isSubmitting = true;
        this.paymentService
            .addCardAndBillinInfo(credentials)
            .subscribe(function (data) {
            if (data == "1") {
                $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                _this.isCreditCardFormVisible = true;
            }
            else if (data == "0") {
                $("#lbldetail").text("Your credit card info has been Inserted Successfully.");
                _this.isCreditCardFormVisible = false;
            }
            else if (data == "-1") {
                $("#lbldetail").text("Your credit card info has been Inserted Successfully.");
                _this.isCreditCardFormVisible = true;
            }
            else { }
        });
    };
    PaymentComponent.prototype.updateCardForm = function () {
        var _this = this;
        var credentials = this.cardForm.value;
        this.abbrState(credentials.state, 'to');
        this.isSubmitting = true;
        this.paymentService
            .updateCardAndBillinInfo(credentials)
            .subscribe(function (data) {
            if (data == "1") {
                $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                _this.isCreditCardFormVisible = true;
            }
            else if (data == "0") {
                $("#lbldetail").text("Your credit card info has been Inserted Successfully.");
                _this.isCreditCardFormVisible = false;
            }
            else if (data == "-1") {
                $("#lbldetail").text("Your credit card info has been Inserted Successfully.");
                _this.isCreditCardFormVisible = true;
            }
            else { }
        });
    };
    PaymentComponent.prototype.editForm = function () {
        this.isCreditCardFormVisible = true;
    };
    PaymentComponent.prototype.cancelForm = function () {
        debugger;
        this.isCreditCardFormVisible = false;
    };
    PaymentComponent.prototype.smallLettersToCapitalLetters = function (value) {
        value.toUpperCase();
    };
    PaymentComponent.prototype.abbrState = function (input, to) {
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
    PaymentComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-payment-page',
            templateUrl: './payment.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, PaymentService, XMLToJSON,
            FormBuilder])
    ], PaymentComponent);
    return PaymentComponent;
}());
export { PaymentComponent };
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
//# sourceMappingURL=payment.component.js.map