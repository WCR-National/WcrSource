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
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

import * as moment from 'moment'; // add this 1 of 4
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { debug } from 'util';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';


@Component({
    selector: 'purchase-zip-code',
    templateUrl: './purchase-zip-code.component.html'
})
export class PurchaseZipCodeComponent implements OnInit {

    isSubmitting: boolean = false;

    public totalNoOfPurchasedItems = 0;
    public totalPurchasedAmount = 0.0;
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
    public divShowZipCodeCS: boolean = false;


    public startValueZipCodeSearchCS = null;
    public startValueZipCodeSearch = null;
    public startValueCategorySearchCS = null;
    public startValueCategorySearch = null;
    public startValueSubCategorySearchCS = null;
    public startValueSubCategorySearch = null;


    public stateSearchData = null;
    public zipCodeSearchData = null;
    public zipCodeSearchCSData = null;
    public categorySearchData = null;
    public categorySearchCSData = null;
    public subCategorySearchData = null;
    public subCategorySearchCSData = null;

    public isPageLoadCatSrchCS: boolean = false;
    public isPageLoadCatSrch: boolean = false;

    public isSearchingStart: boolean = false;
    public isSearchingStartCS: boolean = false;
    public showOnSearchState: boolean = false;
    public showOnLoadState: boolean = true;

    
    public _Counter = 0;
    public dTableCPZC: any = null;
    public dTableSearching: any = null;
    public dTableAPZC: any = null;


    public thisStatus: any = null;
    public monthlyBllingDate: string = "";
    constructor(private route: ActivatedRoute, private router: Router, private purchaseZipCodeService: PurchaseZipCodeService, private ngZone: NgZone,
        private paymentService: PaymentService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, private modalService: NgbModal, private toaster: Toaster) { }



    ngOnInit() {

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

    }

    logValidationErrorsSearch(group: FormGroup = this.searchForm): void {
        this.formErrorMessageSearch = "";
        Object.keys(group.controls).forEach((key: string) => {

            const abstractControl = group.get(key);
            this.formErrorsSearch[key] = '';

            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
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


    /*******************************************************************
     ************************** Search Functions ***********************
     *******************************************************************/

    onClickBtnSearchCityState() {

        this.isSearchingStartCS = true;
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
                .subscribe(
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
        let zipCode_value: any = this.searchForm.get('zipCode').value;
        this.purchaseZipCodeService
            .IsZipCodeExist(zipCode_value)
            .subscribe(
                data => {

                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ZipcodeExists");

                        if (parseInt($(docs).find("ID").text()) >= 1) {

                            this.divShowCategorySearch = true;
                            this.BindCategoryZip(zipCode_value, "zipCode");
                            //this.BindSubCategoryZip(zipCode_value.value, "zipCode");
                        }
                        else {
                            this.isSearchingStart = false;
                            this.formErrorMessageSearch = "Zip code is not available.";
                        }
                    }
                });
        //}
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
                                thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
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

                    this.showOnLoadState = false;
                }
            )
    }


    changeStateSearch() {
        this.divShowCategorySearchCS = false;
    }

    changeCitySearch() {

        this.divShowCategorySearchCS = false;
        this.showOnSearchState = true;
        this.bindCityWiseState(this.searchForm.get('city').value);
    }

    changeZipCodeSearch() {
        debugger;
        this.divShowCategorySearch = false;
        var zipCode = this.searchForm.get('zipCodeSearch').value != null ? this.searchForm.get('zipCodeSearch').value.value : null;
        this.BindCategoryZip(zipCode, 'zipCode');
    }

    changeZipCodeSearchCS() {
        this.divShowCategorySearchCS = false;
        var zipCode = this.searchForm.get('zipCodeSearchCS').value != null ? this.searchForm.get('zipCodeSearchCS').value.value : null;
        if (zipCode != null) {
            this.BindCategoryZip(zipCode, 'cityState');
        }
        else {
            //this.dTableSearching.dataTable().fnClearTable();
        }
    }

    changeCategorySearchCS() {
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

        }
    }

    changeCategorySearch() {
        debugger;
        var subCategoryId;
        var zipCode = this.searchForm.get('zipCode').value != null ? this.searchForm.get('zipCode').value : null;
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

    changeSubCategorySearchCS() {
        debugger;
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

    }

    changeSubCategorySearch() {
        debugger;
        var zipCode = this.searchForm.get('zipCode').value;
        var subCategoryId = this.searchForm.get('subCategorySearch').value != null ? this.searchForm.get('subCategorySearch').value.value : null;
        if ((zipCode !== undefined && zipCode != null) && (subCategoryId !== undefined && subCategoryId != null)) {
            this.divShowSubCategorySearch = true;
            this.SetSearchedZipCodes(zipCode, subCategoryId, 'zipCode');

        }
        else {
            //this.dTableSearching.dataTable().fnClearTable();
        }
        if (this.isPageLoadCatSrch) {
            this.divShowTableSelectedSearch = true;
        }
        this.isPageLoadCatSrch = true;
        this.isSearchingStart = false;
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
                                    thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                                }
                                arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                            });

                            if (arrState == null || arrState == undefined || arrState.length <= 0) {
                                this.formErrorMessageSearch = "City is not valid. Please, Try Again!";
                                this.startValueState = { 'value': '', 'label': '' };
                                this.stateSearchData = [];
                            }
                            else {
                                this.stateSearchData = arrState;
                                this.divShowZipCodeCS = false;
                            }
                        }
                        this.showOnSearchState = false;
                    },
                    error => {
                        this.showOnSearchState = false;
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
                            var arrZipCode = [];
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

                                arrZipCode.push({ "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() });
                            });
                            if (arrZipCode.length == 0 || arrZipCode == null || arrZipCode == undefined) {

                               this.RemoveSearchedZipCodes();
                                

                                this.formErrorMessageSearch = "City/State Combination is not valid. Try Again";
                                this.divShowZipCodeCS = false;
                                this.isSearchingStartCS = false;
                            }
                            else {
                                this.zipCodeSearchCSData = arrZipCode;
                                this.divShowZipCodeCS = true;

                            }

                        }
                        else {
                            this.formErrorMessageSearch = "City/State Combination is not valid. Try Again";
                            this.divShowZipCodeCS = false;
                            this.isSearchingStartCS = false;
                        }

                        this.isSearchingStartCS = false;
                    });
        }
    }

    BindZipCodesByUserZipCode(zipCode, selectedTab) {

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
        debugger;
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
                            this.divShowCategorySearchCS = false;
                            this.isSearchingStartCS = false;
                            this.isSearchingStart = false;

                            this.showToast("danger", "Service Categories are no longer available in your selected zip code.Please choose another zip code");
                            this.RemoveSearchedZipCodes();
                            $("#divCategory").css("display", "none");
                        }
                        else {
                            var startValueCategory = null;
                            var thisStatus = this;
                            var val = "";
                            var label = "";
                            $.each(docs, function (i, docs) {
                                if (i == 0) {
                                    val = $(docs).find("id").text();
                                    label = $(docs).find("categoryname").text();
                                    startValueCategory = { "value": $(docs).find("id").text(), "label": $(docs).find("categoryname").text() };
                                }

                                cartd.push({ "value": $(docs).find("id").text(), "label": $(docs).find("categoryname").text() });
                            });


                            if (selectedTab == 'cityState') {
                                this.startValueCategorySearchCS = startValueCategory;
                                this.categorySearchCSData = cartd;
                                this.divShowCategorySearchCS = true;

                            }
                            else if (selectedTab == 'zipCode') {
                                this.startValueCategorySearch = startValueCategory;

                                this.categorySearchData = cartd;
                                this.divShowCategorySearchCS = true;
                            }
                            else {
                                this.RemoveSearchedZipCodes();
                            }
                        }
                    }
                    else {
                        this.isSearchingStartCS = false;
                        this.isSearchingStart = false;

                        this.showToast("danger", "Service Categories are no longer available in your selected zip code. Please choose another zip code");
                    }
                }
            );

    }

    BindSubCategoryZip(zipCode, categoryId, selectedTab) {
        this.purchaseZipCodeService
            .BindSubCategoryZipCode(zipCode, categoryId)
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailSubCategories");
                        var subCategories = [];

                        if (($(docs).find("id").text() == '')) {
                            this.divShowSubCategorySearchCS = false;
                            this.isSearchingStartCS = false;
                            this.isSearchingStart = false;
                            this.showToast("danger", "Service Categories are no longer available in your selected zip code.Please choose another zip code");
                            this.RemoveSearchedZipCodes();
                        }
                        else {
                            this.divShowSubCategorySearchCS = true;
                            var startValueSubCategory = null;
                            $("#zipcodemsg").css("display", "none");
                            $("#divCategory").css("display", "block");
                            var thisStatus = this;
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
                                this.startValueSubCategorySearchCS = startValueSubCategory;
                                this.subCategorySearchCSData = subCategories;
                            }
                            else if (selectedTab == 'zipCode') {
                                this.startValueSubCategorySearch = startValueSubCategory;
                                this.subCategorySearchData = subCategories;
                            }
                        }
                    }
                }
            );
    }


    onClickTabCityState() {
        this.formErrorMessageSearch = "";

        this.searchForm.get('zipCode').setValue('');
        this.divShowTableSelectedSearch = false;
        this.divShowCategorySearch = false;
        this.divShowCategorySearchCS = false;
        this.divShowSubCategorySearchCS = false;

    }

    onClickTabZipCode() {
        this.formErrorMessageSearch = "";
        //this.searchForm.get('city').setValue('');
        this.divShowTableSelectedSearch = false;

        this.divShowCategorySearchCS = false;
        this.divShowSubCategorySearchCS = false;
        this.divShowCategorySearch = false;
        this.divShowSubCategorySearch = false;
        //this.searchForm.get('state').setValue('');
    }

    SetSearchedZipCodes(zipCode, subCategorySearch, selectedTab) {
        debugger;
        var categoryName, subCategoryName, categoryId, subCategoryId, planId, priceValues, zipCode;

        this.purchaseZipCodeService
            .GetSubCategoryPrice(zipCode, subCategorySearch)
            .subscribe(
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
                        else if (selectedTab == 'zipCode') {
                            zipCode = this.searchForm.get('zipCode').value;
                            categoryName = this.searchForm.get('subCategorySearch').value.label;
                            subCategoryName = this.searchForm.get('subCategorySearch').value.label;
                            categoryId = this.searchForm.get('subCategorySearch').value.value;
                            subCategoryId = this.searchForm.get('subCategorySearch').value.value;
                        }
                        var arrSearchedZipCode = [];
                        var searchedObject = { 'id': 0, 'Zipcode': zipCode, "CategoryName": categoryName, "SubCategoryName": subCategoryName, "Price": priceValues, "CategoryId": categoryId, "SubCategoryId": subCategoryId };
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
        $("#searchedZipCodes").DataTable().clear().destroy();

        this.dTableSearching = $('#searchedZipCodes');
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
                    defaultContent: '<a href="" class="editor_remove purchase">Purchase</a>'
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove cancel">Cancel</a>'
                },
            ],
            "bDestroy": true,
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

        $('#searchedZipCodes').on('click', 'a.purchase', function (e) {
            e.preventDefault();


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
            thisStatus.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);

            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            //dTable.api().row($(this).parents('tr')).remove().draw(false);
            //$.each(actionColumnData, function (i, value) {
            //    alert(value.displayValue)
            //});
        });

        $('#searchedZipCodes').on('click', 'a.cancel', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());
            thisStatus.dTableSearching.api().row($(this).parents('tr')).remove().draw(false);
            var id = $(this).closest('tr').children('td:first').text();


            //thisStatus.purchaseZipCodeService
            //    .PermananetlyRemoveCategory(id)
            //    .subscribe(
            //        data => {
            //            console.log('deleted')
            //        });
        });

    }

    RemoveSearchedZipCodes()
    {
        if (this.dTableSearching !== undefined && this.dTableSearching != null)
        {
            this.dTableSearching.DataTable().clear().destroy();
            this.dTableSearching.off('click');
        }
        //if (this.dTableSearching !== undefined && this.dTableSearching != null) {
        //    this.dTableSearching.dataTable().fnClearTable();
        //}
    }


    CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
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
                            this.onOpenModalClick();
                            //this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
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
                        //var totalAmount = $("#lblprice").text();

                        const results: any = await Promise.apply(this.purchaseZipCodeService.InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)).ajaxSuccess(subData => {

                            if (subData.d == "1") {
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
                    else {

                        if (this._Counter == 0) {
                            //this.AssociateAlreadyCategories();
                            this.onOpenModalClick();
                            this._Counter++;

                        }
                        else {
                            this._Counter++;

                            this.showToast("danger", "We can not complete this Zip Code Purchase at this time!!");
                            this.showToast("danger", "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.");

                        }
                    }
                }
            );
    }

    RemoveCurrentPurchasedZipCode()
    {
        if (this.dTableCPZC !== undefined && this.dTableCPZC != null) {
            this.dTableCPZC.DataTable().clear().destroy();
            this.dTableCPZC.off('click');
        }
        //if (this.dTableCPZC !== undefined && this.dTableCPZC != null) {
        //    this.dTableCPZC.dataTable().fnClearTable();
        //}
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
                            this.InitializedDataTableAllCurrentPurchasedZipCodes(dataJson.PurCategories);
                        }
                        else {
                            this.InitializedDataTableAllCurrentPurchasedZipCodes(undefined);
                        }
                        this.divShowCurrentPurchasedZipCodes = true;

                        var cc = 0;
                        var totalNoOfPurchasedZiCodes = 1;
                        var totalPurchasedAmount = 0;
                        $.each(docs, function (i, docs) {
                            var purchasedAmount = $(docs).find("amount").text();
                            totalPurchasedAmount = totalPurchasedAmount + parseInt(purchasedAmount);
                            totalNoOfPurchasedZiCodes++;
                        });
                        this.totalNoOfPurchasedItems = totalNoOfPurchasedZiCodes;
                        this.totalPurchasedAmount = totalPurchasedAmount;

                        var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalPurchasedAmount + "</b></td><td></td></tr>";

                    }
                }
            );
    }

    InitializedDataTableAllCurrentPurchasedZipCodes(asyncData) {
        console.log(asyncData);
        $("#allCurrentPurchasedZipCodes").DataTable().clear().destroy();

        this.dTableCPZC = $('#allCurrentPurchasedZipCodes');
        let thisStatus: any = this;

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
                    defaultContent: '<a href="" class="editor_remove cancel">Delete</a>'
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

        $('#viewAllCurrentPurchasedZipCodes').on('click', 'a.cancel', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());
            this.dTableCPZC.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.purchaseZipCodeService
                .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        //thisStatus.getClientDetailsServicesData();
                        //thisStatus.getServicesCount();
                        //thisStatus.getTotalSalesAndServicesCount();
                    });
        });
    }

    RemoveAllPurchasedZipCode()
    {

    }

    ViewAllPurchasedZipCode() {
        debugger;
        this.purchaseZipCodeService
            .GetPurchasedAllRecords()
            .subscribe(
                data => {

                    debugger;
                    if (data.d != null && data.d.length > 0) {

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
                            this.InitializedDataTableAllPurchasedZipCodes(dataJson.Table1);
                        }
                        else {
                            this.InitializedDataTableAllPurchasedZipCodes(undefined);
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

    InitializedDataTableAllPurchasedZipCodes(asyncData) {
        console.log(asyncData);
        $("#allPurchasedZipCodes").DataTable().clear().destroy();

        debugger;
        this.dTableAPZC = $('#allPurchasedZipCodes');
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
        this.dTableAPZC.dataTable({
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
                    defaultContent: '<a href="" class="editor_remove cancel">Delete</a>'
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

        $('#allPurchasedZipCodes').on('click', 'a.cancel', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            this.dTableAPZC.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.purchaseZipCodeService
                .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        //thisStatus.getClientDetailsServicesData();
                        //thisStatus.getServicesCount();
                        //thisStatus.getTotalSalesAndServicesCount();
                    });
        });
    }

    RemoveAllPurchasedZipCodes() {

        if (this.dTableAPZC !== undefined && this.dTableSearching != null) {
            this.dTableAPZC.DataTable().clear().destroy();
            this.dTableAPZC.off('click');
        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    }

    onOpenModalClick(): void {

        debugger;
        const modal: NgbModalRef = this.modalService.open(PaymentModalComponent, { size: 'lg', backdrop: "static" });
        const modalComponent: PaymentModalComponent = modal.componentInstance;

        modal.result.then(
            (result) => {
                debugger;
                var row = this.dTableSearching.fnGetPosition($(this).closest('tr')[0]);
                var rowData = this.dTableSearching.fnGetData(row);
                // var rowColumns = rowData[rowData.length - 1];

                var id = rowData['id'];
                var zipCode = rowData['Zipcode'];
                var categoryText = rowData['CategoryName'];
                var subCategoryText = rowData['SubCategoryName'];
                var priceValues = rowData['Price'];
                var categoryId = rowData['CategoryId'];
                var subCategoryId = rowData['SubCategoryId'];
                this.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);

                //this.updateBindings();
            },
            () => { });
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
                                this.showToast('danger', "Failed, Already exist!!!");
                                //$('#fail_message').modal('show');
                            }
                            if (subData.d == "3") {
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
            duration: 8000
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