import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PurchaseZipCodeService } from 'AngularAssociate/app/services/associate/purchase-zipcode.service';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import * as moment from 'moment'; // add this 1 of 4
import { Toaster } from "ngx-toast-notifications";
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
var PurchaseZipCodeComponent = /** @class */ (function () {
    function PurchaseZipCodeComponent(cdr, route, router, purchaseZipCodeService, ngZone, paymentService, xmlToJson, fb, modalService, toaster) {
        this.cdr = cdr;
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
        this.totalNoOfPurchasedItems = 0;
        this.totalPurchasedAmount = 0.0;
        this.nextBillingCycleStart = '';
        this.showSuccessMessage = '';
        this.isAddOrUpdateButton = true;
        this.overlayLoadingOnPurchase = false;
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
        this.divShowZipCodeCS = false;
        this.startValueZipCodeSearchCS = null;
        this.startValueZipCodeSearch = null;
        this.startValueCategorySearchCS = null;
        this.startValueCategorySearch = null;
        this.startValueSubCategorySearchCS = null;
        this.startValueSubCategorySearch = null;
        this.stateSearchData = null;
        this.zipCodeSearchData = null;
        this.zipCodeSearchCSData = null;
        this.categorySearchData = null;
        this.categorySearchCSData = null;
        this.subCategorySearchData = null;
        this.subCategorySearchCSData = null;
        this.isPageLoadCatSrchCS = false;
        this.isPageLoadCatSrch = false;
        this.isSearchingStart = false;
        this.isSearchingStartCS = false;
        this.showOnSearchState = false;
        this.showOnLoadState = true;
        this._Counter = 0;
        this.dTableCPZC = null;
        this.dTableSearching = null;
        this.dTableAPZC = null;
        this.firstTimeCalling = true;
        this.loadFirstTimeOnlyAllPurchasedZipCodes = true;
        this.thisStatus = null;
        this.monthlyBllingDate = "";
    }
    PurchaseZipCodeComponent.prototype.ngOnInit = function () {
        this.initializeEventAndControls();
        this.setValidationOnForm();
        this.bindStateSearch();
        if ((new Date()).getMonth() == 11) {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear() + 1, 0, 1)).format('yyyy-MM-DD');
        }
        else {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 1)).format('yyyy-MM-DD');
        }
        this.nextBillingCycleStart = this.monthlyBllingDate;
        this.ViewAllPurchasedZipCode();
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
    /*******************************************************************
     ************************** Search Functions ***********************
     *******************************************************************/
    PurchaseZipCodeComponent.prototype.onClickBtnSearchCityState = function () {
        var _this = this;
        this.isSearchingStartCS = true;
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
            else if (this.searchForm.get('city').value == "") {
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
        this.isSearchingStart = true;
        //let state_value: any = this.cardForm.get('state').value;
        //
        //if (this.cardForm.get('zipCode').value == "") {
        //    if (state_value.value == 0 || state_value.value == "0") {
        //        this.formErrorMessageSearch = "State must be selected.";
        //        //$("#lblSuccess2").css("display", "block");
        //        //$("#lblSuccess2").text("");
        //        //alert("State Can't be blank!");
        //        return false;
        //    }
        //    else if ($("#txtCity").val() == "") {
        //        this.formErrorMessageSearch = "City can not be blank.";
        //        return false;
        //    }
        //    else {
        //        //Show categories
        //        this.bindStateWiseZipCodeForSearch(state_value.value, this.searchForm.get('city').value);
        //    }
        //}
        //else {
        var zipCode_value = this.searchForm.get('zipCode').value;
        this.purchaseZipCodeService
            .IsZipCodeExist(zipCode_value)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("ZipcodeExists");
                if (parseInt($(docs).find("ID").text()) >= 1) {
                    _this.divShowCategorySearch = true;
                    _this.BindCategoryZip(zipCode_value, "zipCode");
                    //this.BindSubCategoryZip(zipCode_value.value, "zipCode");
                }
                else {
                    _this.isSearchingStart = false;
                    _this.formErrorMessageSearch = "Zip code is not available.";
                }
            }
        });
        //}
    };
    PurchaseZipCodeComponent.prototype.bindStateSearch = function () {
        var _this = this;
        this.purchaseZipCodeService
            .BindState()
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
                        thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
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
            _this.showOnLoadState = false;
        });
    };
    PurchaseZipCodeComponent.prototype.changeStateSearch = function () {
        this.divShowCategorySearchCS = false;
    };
    PurchaseZipCodeComponent.prototype.changeCitySearch = function () {
        this.divShowCategorySearchCS = false;
        this.showOnSearchState = true;
        this.bindCityWiseState(this.searchForm.get('city').value);
    };
    PurchaseZipCodeComponent.prototype.changeZipCodeSearch = function () {
        this.divShowCategorySearch = false;
        var zipCode = this.searchForm.get('zipCodeSearch').value != null ? this.searchForm.get('zipCodeSearch').value.value : null;
        this.BindCategoryZip(zipCode, 'zipCode');
    };
    PurchaseZipCodeComponent.prototype.changeZipCodeSearchCS = function () {
        this.divShowCategorySearchCS = false;
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        if (zipCode != null) {
            this.BindCategoryZip(zipCode, 'cityState');
        }
        else {
            //this.dTableSearching.dataTable().fnClearTable();
        }
    };
    PurchaseZipCodeComponent.prototype.changeCategorySearchCS = function () {
        var subCategoryId;
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        var categoryId = this.searchForm.get('categorySearchCS').value != null ? this.searchForm.get('categorySearchCS').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (categoryId !== undefined && categoryId != null)) {
            //this.BindSubCategoryZip(zipCode, categoryId, 'cityState');
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
        }
    };
    PurchaseZipCodeComponent.prototype.changeCategorySearch = function () {
        this.isSearchingStart = true;
        var subCategoryId;
        var zipCode = this.searchForm.get('zipCode').value != null ? this.searchForm.get('zipCode').value : null;
        var categoryId = this.searchForm.get('categorySearch').value != null ? this.searchForm.get('categorySearch').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (categoryId !== undefined && categoryId != null)) {
            //this.BindSubCategoryZip(zipCode, categoryId, 'zipCode');
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
            if (this.isPageLoadCatSrch) {
                this.divShowTableSelectedSearch = true;
            }
        }
    };
    PurchaseZipCodeComponent.prototype.changeSubCategorySearchCS = function () {
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        var subCategoryId = this.searchForm.get('subCategorySearchCS').value != null ? this.searchForm.get('subCategorySearchCS').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
            this.divShowSubCategorySearch = true;
            this.SetSearchedZipCodes(zipCode, subCategoryId, 'cityState');
        }
        else {
            //this.dTableSearching.dataTable().fnClearTable();
        }
        if (this.isPageLoadCatSrchCS) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrchCS = true;
        this.isSearchingStartCS = false;
    };
    PurchaseZipCodeComponent.prototype.changeSubCategorySearch = function () {
        var zipCode = this.searchForm.get('zipCode').value;
        var subCategoryId = this.searchForm.get('subCategorySearch').value != null ? this.searchForm.get('subCategorySearch').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
            this.divShowSubCategorySearch = true;
            //this.SetSearchedZipCodes(zipCode, subCategoryId, 'zipCode');
        }
        else {
            //this.dTableSearching.dataTable().fnClearTable();
        }
        if (this.isPageLoadCatSrch) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrch = true;
        this.isSearchingStart = false;
    };
    PurchaseZipCodeComponent.prototype.bindCityWiseState = function (city) {
        var _this = this;
        if (city !== undefined) {
            var countryId = "US"; //this.cardForm.get('country').value;
            this.purchaseZipCodeService
                .BindCityWiseState(city)
                .subscribe(function (data) {
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
                            thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                        }
                        arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                    });
                    if (arrState == null || arrState == undefined || arrState.length <= 0) {
                        _this.formErrorMessageSearch = "City is not valid. Please, Try Again!";
                        _this.startValueState = { 'value': '', 'label': '' };
                        _this.stateSearchData = [];
                    }
                    else {
                        _this.stateSearchData = arrState;
                        _this.divShowZipCodeCS = false;
                    }
                }
                _this.showOnSearchState = false;
            }, function (error) {
                _this.showOnSearchState = false;
            });
        }
    };
    PurchaseZipCodeComponent.prototype.bindStateWiseZipCodeForSearch = function (state, city) {
        var _this = this;
        if (state !== undefined) {
            var countryId = "US"; //this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(function (data) {
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("CityWiseZip");
                    var arrZipCode = [];
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
                        arrZipCode.push({ "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() });
                    });
                    if (arrZipCode.length == 0 || arrZipCode == null || arrZipCode == undefined) {
                        _this.RemoveSearchedZipCodes();
                        _this.formErrorMessageSearch = "City/State Combination is not valid. Try Again";
                        _this.divShowZipCodeCS = false;
                        _this.isSearchingStartCS = false;
                    }
                    else {
                        _this.zipCodeSearchCSData = arrZipCode;
                        _this.divShowZipCodeCS = true;
                    }
                }
                else {
                    _this.formErrorMessageSearch = "City/State Combination is not valid. Try Again";
                    _this.divShowZipCodeCS = false;
                    _this.isSearchingStartCS = false;
                }
                _this.isSearchingStartCS = false;
            });
        }
    };
    PurchaseZipCodeComponent.prototype.BindZipCodesByUserZipCode = function (zipCode, selectedTab) {
        var _this = this;
        this.purchaseZipCodeService
            .BindZipCodesByUserZipCode(zipCode)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("AvailZipCodes");
                var cartd = [];
                if (($(docs).find("id").text() == '')) {
                    _this.divShowCategorySearchCS = false;
                    _this.formErrorMessageSearch = "Service Categories are no longer available in your selected zip code. Please choose another zip code";
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
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("AvailZipCodes");
                var cartd = [];
                if (($(docs).find("id").text() == '')) {
                    _this.divShowCategorySearchCS = false;
                    _this.isSearchingStartCS = false;
                    _this.isSearchingStart = false;
                    _this.showToast("danger", "Service Categories are no longer available in your selected zip code.Please choose another zip code");
                    _this.RemoveSearchedZipCodes();
                    $("#divCategory").css("display", "none");
                }
                else {
                    var startValueCategory = null;
                    var thisStatus = _this;
                    var val = "";
                    var label = "";
                    $.each(docs, function (i, docs) {
                        if (i == 0) {
                            val = $(docs).find("id").text();
                            label = $(docs).find("categoryname").text();
                            var str = $(docs).find("categoryname").text();
                            var stringLength_1 = str.length; // this will be 16
                            if (str.lastIndexOf('s') != -1) {
                                str = str.slice(0, -1);
                            }
                            startValueCategory = { "value": $(docs).find("id").text(), "label": str + ' Services' };
                        }
                        var strCat = $(docs).find("categoryname").text();
                        var stringLength = strCat.length; // this will be 16
                        if (strCat.lastIndexOf('s') != -1) {
                            strCat = strCat.slice(0, -1);
                        }
                        strCat = strCat + ' Services';
                        cartd.push({ "value": $(docs).find("id").text(), "label": strCat });
                    });
                    if (selectedTab == 'cityState') {
                        _this.startValueCategorySearchCS = startValueCategory;
                        _this.categorySearchCSData = cartd;
                        _this.divShowCategorySearchCS = true;
                    }
                    else if (selectedTab == 'zipCode') {
                        _this.startValueCategorySearch = startValueCategory;
                        _this.categorySearchData = cartd;
                        _this.divShowCategorySearchCS = true;
                    }
                    else {
                        _this.RemoveSearchedZipCodes();
                    }
                }
            }
            else {
                _this.isSearchingStartCS = false;
                _this.isSearchingStart = false;
                _this.showToast("danger", "Service Categories are no longer available in your selected zip code. Please choose another zip code");
            }
        }, function (error) {
            _this.isSearchingStartCS = false;
            _this.isSearchingStart = false;
            _this.showToast("danger", "Service Categories are no longer available in your selected zip code. Please choose another zip code");
        });
    };
    PurchaseZipCodeComponent.prototype.BindSubCategoryZip = function (zipCode, categoryId, selectedTab) {
        var _this = this;
        this.purchaseZipCodeService
            .BindSubCategoryZipCode(zipCode, categoryId)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("AvailSubCategories");
                var subCategories = [];
                if (($(docs).find("id").text() == '')) {
                    _this.divShowSubCategorySearchCS = false;
                    _this.isSearchingStartCS = false;
                    _this.isSearchingStart = false;
                    _this.showToast("danger", "Service Categories are no longer available in your selected zip code.Please choose another zip code");
                    _this.RemoveSearchedZipCodes();
                }
                else {
                    _this.divShowSubCategorySearchCS = true;
                    var startValueSubCategory = null;
                    $("#zipcodemsg").css("display", "none");
                    $("#divCategory").css("display", "block");
                    var thisStatus = _this;
                    var val = "";
                    var label = "";
                    $.each(docs, function (i, docs) {
                        if (i == 0) {
                            val = $(docs).find("id").text();
                            label = $(docs).find("name").text();
                            startValueSubCategory = { "value": $(docs).find("id").text(), "label": $(docs).find("name").text() };
                        }
                        subCategories.push({ "value": $(docs).find("id").text(), "label": $(docs).find("name").text().substr(4) });
                    });
                    if (selectedTab == 'cityState') {
                        _this.startValueSubCategorySearchCS = startValueSubCategory;
                        _this.subCategorySearchCSData = subCategories;
                    }
                    else if (selectedTab == 'zipCode') {
                        _this.startValueSubCategorySearch = startValueSubCategory;
                        _this.subCategorySearchData = subCategories;
                    }
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.onClickTabCityState = function () {
        this.formErrorMessageSearch = "";
        this.searchForm.get('zipCode').setValue('');
        this.divShowTableSelectedSearch = false;
        this.divShowCategorySearch = false;
        this.divShowCategorySearchCS = false;
        this.divShowSubCategorySearchCS = false;
    };
    PurchaseZipCodeComponent.prototype.onClickTabZipCode = function () {
        this.formErrorMessageSearch = "";
        //this.searchForm.get('city').setValue('');
        this.divShowTableSelectedSearch = false;
        this.divShowCategorySearchCS = false;
        this.divShowSubCategorySearchCS = false;
        this.divShowCategorySearch = false;
        this.divShowSubCategorySearch = false;
        //this.searchForm.get('state').setValue('');
    };
    PurchaseZipCodeComponent.prototype.SetSearchedZipCodes = function (zipCode, subCategorySearch, selectedTab) {
        var _this = this;
        var categoryName, subCategoryName, categoryId, subCategoryId, planId, priceValues, zipCode;
        this.purchaseZipCodeService
            .GetSubCategoryPrice(zipCode, subCategorySearch)
            .subscribe(function (data) {
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
                    categoryName = _this.searchForm.get('categorySearchCS').value.label;
                    subCategoryName = _this.searchForm.get('subCategorySearchCS').value.label;
                    categoryId = _this.searchForm.get('categorySearchCS').value.value;
                    subCategoryId = _this.searchForm.get('subCategorySearchCS').value.value;
                }
                else if (selectedTab == 'zipCode') {
                    zipCode = _this.searchForm.get('zipCode').value;
                    categoryName = _this.searchForm.get('categorySearch').value.label;
                    subCategoryName = ''; // this.searchForm.get('subCategorySearch').value.label;
                    categoryId = _this.searchForm.get('categorySearch').value.value;
                    subCategoryId = ''; // this.searchForm.get('subCategorySearch').value.value;
                }
                var arrSearchedZipCode = [];
                var searchedObject = { 'id': 0, 'Zipcode': zipCode, "CategoryName": categoryName, "SubCategoryName": subCategoryName, "Price": priceValues, "CategoryId": categoryId, "SubCategoryId": subCategoryId };
                arrSearchedZipCode.push(searchedObject);
                _this.initializedDataTableSearchedZipCodes(arrSearchedZipCode);
            }
            else {
                _this.formErrorMessageSearch = "Something went wrong, Try Again!!!";
            }
            _this.isSearchingStart = false;
        });
    };
    PurchaseZipCodeComponent.prototype.initializedDataTableSearchedZipCodes = function (asyncData) {
        console.log(asyncData);
        $("#searchedZipCodes").DataTable().clear().destroy();
        this.dTableSearching = $('#searchedZipCodes');
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
        this.dTableSearching.dataTable({
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
                    data: "CategoryId",
                },
                {
                    data: "SubCategoryId",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a id="purchaseId" href="javascript:void(0)" class="editor_remove purchaseId tx-green tx-700">Purchase</a>'
                },
                {
                    data: null,
                    className: "center ",
                    defaultContent: '<a  href="javascript:void(0)" class="editor_remove cancel tx-danger tx-700">Cancel</a>'
                },
            ],
            destroy: true,
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
                    targets: [1],
                    className: "dt-head-center dt-body-left"
                },
                {
                    targets: [2],
                    className: " dt-head-center dt-body-left"
                },
                {
                    targets: [3],
                    className: "hide_column"
                },
                {
                    targets: [4],
                    className: "dt-head-center dt-body-left"
                },
                {
                    targets: [5],
                    className: "hide_column"
                },
                {
                    targets: [6],
                    className: "hide_column"
                }
            ],
            order: [[1, 'asc']]
        });
        if (this.firstTimeCalling) {
            $('#searchedZipCodes tbody').on('click', '.purchaseId', function (e) {
                //alert('entered');
                var row = thisStatus.dTableSearching.fnGetPosition($(this).closest('tr')[0]);
                var rowData = thisStatus.dTableSearching.fnGetData(row);
                // var rowColumns = rowData[rowData.length - 1];
                var id = rowData['id'];
                var zipCode = rowData['Zipcode'];
                var categoryText = rowData['CategoryName'];
                var subCategoryText = rowData['SubCategoryName'];
                var priceValues = rowData['Price'];
                var categoryId = rowData['CategoryId'];
                var subCategoryId = rowData['SubCategoryId'];
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
                thisStatus.ngZone.run(function () {
                    thisStatus.CheckOutClick(categoryText, '', categoryId, subCategoryId, '1', priceValues, zipCode);
                    thisStatus.overlayLoadingOnPurchase = true;
                });
            });
            $('#searchedZipCodes').on('click', 'a.cancel', function (e) {
                e.preventDefault();
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());
                thisStatus.dTableSearching.api().row($(this).parents('tr')).remove().draw(false);
                var id = $(this).closest('tr').children('td:first').text();
                thisStatus.ngZone.run(function () {
                    thisStatus.RemoveSearchedZipCodes();
                });
                //thisStatus.purchaseZipCodeService
                //    .PermananetlyRemoveCategory(id)
                //    .subscribe(
                //        data => {
                //            console.log('deleted')
                //        });
            });
            this.firstTimeCalling = false;
        }
        this.dTableSearching.on('destroy.dt', function (e, settings) {
            $(this).off('click', '.purchaseId');
        });
    };
    PurchaseZipCodeComponent.prototype.CheckOutClick = function (categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        var _this = this;
        this.purchaseZipCodeService
            .ZipCodePurchase()
            .subscribe(function (data) {
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
            _this.cdr.detectChanges();
        });
    };
    PurchaseZipCodeComponent.prototype.ZipCodePurchaseCode = function (categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        var _this = this;
        this.purchaseZipCodeService
            .ZipCodePurchaseCode()
            .subscribe(function (data) {
            var a = 0;
            var b = 0;
            var c = 0;
            //this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
            debugger;
            //ye niche wala active krna hai.
            if (data.d.length > 0) {
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("CheckAssoCard");
                if (parseInt($(docs).find("id").text()) >= 1) {
                    // ApplycoponCode(a, b, c);
                    _this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
                }
                else {
                    _this.onOpenModalClick();
                    //this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
                }
            }
        });
    };
    PurchaseZipCodeComponent.prototype.ApplyCoponCodeNew = function (cCode, disc, duration, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        var _this = this;
        this.purchaseZipCodeService
            .ApplyCoponCodeNew(1, priceValues, categoryText, zipCode)
            .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var monthValue, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data.d == "1")) return [3 /*break*/, 2];
                        monthValue = 1;
                        return [4 /*yield*/, Promise.apply(this.purchaseZipCodeService
                                .InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
                                .then(function (subData) {
                                if (subData !== undefined && subData != "" && subData != null) {
                                    if (subData.d == "1") {
                                        _this.showToast('success', "Zip code successfully purchased!");
                                        _this.showToast('success', "Credit card has been successfully charged.");
                                        _this.overlayLoadingOnPurchase = false;
                                        debugger;
                                        _this.dTableSearching.DataTable().clear().destroy();
                                        _this.AssociateAlreadyCategories();
                                    }
                                    if (subData.d == "0") {
                                        _this.showToast('danger', "Failed to buy zip code, already exist.");
                                        _this.overlayLoadingOnPurchase = false;
                                    }
                                    if (subData.d == "3") {
                                        _this.showToast('danger', "Error, Something went wrong. Reload page, Try Again!!!");
                                    }
                                }
                                else {
                                    _this.showToast('danger', "Error, Something went wrong. Reload page, Try Again!!!");
                                }
                                _this.cdr.detectChanges();
                            }))];
                    case 1:
                        results = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this._Counter == 0) {
                            //this.AssociateAlreadyCategories();
                            this.onOpenModalClick();
                            this._Counter++;
                        }
                        else {
                            this._Counter++;
                            this.showToast("danger", "We can not complete this Zip Code Purchase at this time!!");
                            this.showToast("danger", "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.");
                            this.overlayLoadingOnPurchase = false;
                        }
                        _a.label = 3;
                    case 3:
                        this.cdr.detectChanges();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PurchaseZipCodeComponent.prototype.RemoveSearchedZipCodes = function () {
        if (this.dTableSearching !== undefined && this.dTableSearching != null) {
            //this.dTableSearching.off('click');
            //this.dTableSearching.DataTable().clear().destroy();
            //this.dTableSearching.find("tbody").empty();
        }
        //if (this.dTableSearching !== undefined && this.dTableSearching != null) {
        //    this.dTableSearching.dataTable().fnClearTable();
        //}
    };
    PurchaseZipCodeComponent.prototype.RemoveCurrentPurchasedZipCode = function () {
        if (this.dTableCPZC !== undefined && this.dTableCPZC != null) {
            this.dTableCPZC.DataTable().clear().destroy();
            this.dTableCPZC.off('click');
        }
        //if (this.dTableCPZC !== undefined && this.dTableCPZC != null) {
        //    this.dTableCPZC.dataTable().fnClearTable();
        //}
    };
    PurchaseZipCodeComponent.prototype.AssociateAlreadyCategories = function () {
        var _this = this;
        this.purchaseZipCodeService
            .SelectCurrentPurchasedZipCodes()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                _this.dTableAPZC.DataTable().clear().destroy();
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("PurCategories");
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var resultJson = [];
                var dataJson = JSON.parse(json);
                if (dataJson.NewDataSet.MyCategories != null) {
                    if (!Array.isArray(dataJson.NewDataSet.MyCategories)) {
                        resultJson.push(dataJson.NewDataSet.MyCategories);
                        dataJson.NewDataSet.MyCategories = resultJson;
                    }
                    _this.InitializedDataTableAllPurchasedZipCodes(dataJson.NewDataSet.MyCategories);
                }
                else {
                    _this.InitializedDataTableAllPurchasedZipCodes(undefined);
                }
                //this.divShowCurrentPurchasedZipCodes = true;
                var cc = 0;
                var totalNoOfPurchasedZiCodes = 1;
                var totalPurchasedAmount = 0;
                $.each(docs, function (i, docs) {
                    var purchasedAmount = $(docs).find("amount").text();
                    totalPurchasedAmount = totalPurchasedAmount + parseInt(purchasedAmount);
                    totalNoOfPurchasedZiCodes++;
                });
                _this.totalNoOfPurchasedItems = totalNoOfPurchasedZiCodes;
                _this.totalPurchasedAmount = totalPurchasedAmount;
                var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalPurchasedAmount + "</b></td><td></td></tr>";
            }
        });
    };
    PurchaseZipCodeComponent.prototype.ViewAllPurchasedZipCode = function () {
        var _this = this;
        this.purchaseZipCodeService
            //.GetPurchasedAllRecords()
            .SelectCurrentPurchasedZipCodes()
            .subscribe(function (data) {
            if (data.d != null && data.d.length > 0) {
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("MyCategories");
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var resultJson = [];
                var dataJson = JSON.parse(json);
                if (dataJson.NewDataSet.MyCategories != null) {
                    if (!Array.isArray(dataJson.NewDataSet.MyCategories)) {
                        resultJson.push(dataJson.NewDataSet.MyCategories);
                        dataJson.NewDataSet.MyCategories = resultJson;
                    }
                    _this.InitializedDataTableAllPurchasedZipCodes(dataJson.NewDataSet.MyCategories);
                }
                else {
                    _this.InitializedDataTableAllPurchasedZipCodes(undefined);
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
    PurchaseZipCodeComponent.prototype.InitializedDataTableAllPurchasedZipCodes = function (asyncData) {
        console.log(asyncData);
        //$("#allPurchasedZipCodes").DataTable().clear().destroy();
        debugger;
        this.dTableAPZC = $('#allPurchasedZipCodes');
        var thisStatus = this;
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'zipCode': '',
                'categoryname': '',
                //'Name': "",
                'amount': ''
            };
        }
        this.dTableAPZC.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'id'
                },
                {
                    data: 'zipCode'
                },
                {
                    data: "categoryname",
                },
                //{
                //    data: "Name",
                //},
                {
                    data: "amount",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove cancel tx-danger tx-700">Cancel</a>'
                },
                {
                    data: 'subCategoryID',
                }
            ],
            "bDestroy": true,
            "autoWidth": true,
            searching: false,
            paging: false,
            buttons: [
                'excel', 'pdf'
            ],
            columnDefs: [
                {
                    targets: [0],
                    className: "hide_column"
                },
                {
                    "render": function (data, type, row) {
                        // here you can convert data from base64 to hex and return it
                        if (data.indexOf('s') != -1) {
                            data = data.slice(0, -1);
                        }
                        data = data + ' Services';
                        return data;
                    },
                    targets: [2],
                },
                {
                    targets: [5],
                    className: "hide_column"
                }
            ],
            order: [[1, 'asc']]
        });
        $('#allPurchasedZipCodes').on('click', 'a.cancel', function (e) {
            var _this = this;
            e.preventDefault();
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());
            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);
            thisStatus.dTableAPZC.api().row($(this).parents('tr')).remove().draw(false);
            thisStatus.ngZone.run(function () {
                thisStatus.purchaseZipCodeService
                    .PermananetlyRemoveCategory($(_this).closest('tr').children('td:first').text())
                    .subscribe(function (data) {
                    //thisStatus.getClientDetailsServicesData();
                    //thisStatus.getServicesCount();
                    //thisStatus.getTotalSalesAndServicesCount();
                });
                thisStatus.RemoveAllPurchasedZipCodes();
            });
        });
    };
    PurchaseZipCodeComponent.prototype.RemoveAllPurchasedZipCodes = function () {
        if (this.dTableAPZC !== undefined && this.dTableSearching != null) {
            $('#allPurchasedZipCodes').off('click');
            this.dTableAPZC.DataTable().clear().destroy();
        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    };
    PurchaseZipCodeComponent.prototype.onOpenModalClick = function () {
        var _this = this;
        var modal = this.modalService.open(PaymentModalComponent, { size: 'lg', backdrop: "static" });
        var modalComponent = modal.componentInstance;
        modal.componentInstance.dismissParentCall.subscribe(function (data) {
            console.log(data);
            _this.overlayLoadingOnPurchase = false;
        });
        modal.componentInstance.updateParentCall.subscribe(function (data) {
            _this.showToast('success', 'Purchasing is in process');
            var row = _this.dTableSearching.fnGetPosition($(_this).closest('tr')[0]);
            var rowData = _this.dTableSearching.fnGetData(row);
            // var rowColumns = rowData[rowData.length - 1];
            var id = rowData['id'];
            var zipCode = rowData['Zipcode'];
            var categoryText = rowData['CategoryName'];
            var subCategoryText = rowData['SubCategoryName'];
            var priceValues = rowData['Price'];
            var categoryId = rowData['CategoryId'];
            var subCategoryId = rowData['SubCategoryId'];
            _this.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);
        });
        modal.result.then(function (result) {
            var row = _this.dTableSearching.fnGetPosition($(_this).closest('tr')[0]);
            var rowData = _this.dTableSearching.fnGetData(row);
            // var rowColumns = rowData[rowData.length - 1];
            var id = rowData['id'];
            var zipCode = rowData['Zipcode'];
            var categoryText = rowData['CategoryName'];
            var subCategoryText = rowData['SubCategoryName'];
            var priceValues = rowData['Price'];
            var categoryId = rowData['CategoryId'];
            var subCategoryId = rowData['SubCategoryId'];
            _this.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);
            //this.updateBindings();
        }, function () { });
    };
    PurchaseZipCodeComponent.prototype.switchNgBTab = function (id) {
        this.ctdTabset.select(id);
    };
    PurchaseZipCodeComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    };
    PurchaseZipCodeComponent.prototype.ApplyCoponCode = function (cCode, disc, duration) {
        var _this = this;
        var categoryId, subCategoryId, planId, priceValues, zipCode;
        this.purchaseZipCodeService
            .ApplyCoponCode(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
            .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var monthValue, totalAmount, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                                    _this.showToast('danger', "Failed, Already exist!!!");
                                    //$('#fail_message').modal('show');
                                }
                                if (subData.d == "3") {
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
    PurchaseZipCodeComponent.prototype.InitializedDataTableAllCurrentPurchasedZipCodes = function (asyncData) {
        console.log(asyncData);
        $("#allCurrentPurchasedZipCodes").DataTable().clear().destroy();
        this.dTableCPZC = $('#allCurrentPurchasedZipCodes');
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
        this.dTableCPZC.dataTable({
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
                    defaultContent: '<a href="" class="editor_remove cancel tx-danger tx-700">Delete</a>'
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
        if (this.loadFirstTimeOnlyAllPurchasedZipCodes) {
            $('#viewAllCurrentPurchasedZipCodes').on('click', 'a.cancel', function (e) {
                e.preventDefault();
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());
                this.dTableCPZC.api().row($(this).parents('tr')).remove().draw(false);
                thisStatus.purchaseZipCodeService
                    .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                    .subscribe(function (data) {
                    //thisStatus.getClientDetailsServicesData();
                    //thisStatus.getServicesCount();
                    //thisStatus.getTotalSalesAndServicesCount();
                });
            });
            this.loadFirstTimeOnlyAllPurchasedZipCodes = false;
        }
    };
    PurchaseZipCodeComponent.prototype.RemoveAllCurrentPurchasedZipCode = function () {
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        ViewChild('ctdTabset'),
        __metadata("design:type", Object)
    ], PurchaseZipCodeComponent.prototype, "ctdTabset", void 0);
    PurchaseZipCodeComponent = __decorate([
        Component({
            selector: 'purchase-zip-code',
            templateUrl: './purchase-zip-code.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _a : Object, typeof (_b = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _b : Object, typeof (_c = typeof Router !== "undefined" && Router) === "function" ? _c : Object, PurchaseZipCodeService, typeof (_d = typeof NgZone !== "undefined" && NgZone) === "function" ? _d : Object, PaymentService, XMLToJSON, typeof (_e = typeof FormBuilder !== "undefined" && FormBuilder) === "function" ? _e : Object, typeof (_f = typeof NgbModal !== "undefined" && NgbModal) === "function" ? _f : Object, typeof (_g = typeof Toaster !== "undefined" && Toaster) === "function" ? _g : Object])
    ], PurchaseZipCodeComponent);
    return PurchaseZipCodeComponent;
}());
export { PurchaseZipCodeComponent };
function patternValidator(regex, error) {
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