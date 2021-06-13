import { Component, OnInit, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';


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
    overlayLoadingOnPurchase: boolean = false;
    toastRef;
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
    public gRowDataState: any = null;
    public dTableAPZC: any = null;

    public firstTimeCalling = true;
    public loadFirstTimeOnlyAllPurchasedZipCodes = true;
    public thisStatus: any = null;
    public monthlyBllingDate: string = "";
    constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private purchaseZipCodeService: PurchaseZipCodeService, private ngZone: NgZone,
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

        this.purchaseZipCodeService
            .BindState()
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
    }

    changeCategorySearch() {

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
    }

    changeSubCategorySearchCS() {

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
    }

    bindCityWiseState(city) {


        if (city !== undefined) {
            const countryId = "US";//this.cardForm.get('country').value;
            this.purchaseZipCodeService
                .BindCityWiseState(city)
                .subscribe(
                    data => {


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

                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailZipCodes");
                        var cartd = [];

                        if (($(docs).find("id").text() == '')) {

                            this.divShowCategorySearchCS = false;
                            this.formErrorMessageSearch = "Service Categories are no longer available in your selected zip code. Please choose another zip code";
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


                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailZipCodes");
                        var cartd = [];

                        if (($(docs).find("id").text() == '')) {

                            this.divShowCategorySearchCS = false;
                            this.isSearchingStartCS = false;
                            this.isSearchingStart = false;

                            this.showToast("Warning", "Service Categories are no longer available in your selected zip code.Please choose another zip code");
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
                                    var str = $(docs).find("categoryname").text();
                                    const stringLength = str.length; // this will be 16


                                    if (str.substr(str.length - 1) == 's') {
                                        str = str.slice(0, -1);
                                    }
                                    startValueCategory = { "value": $(docs).find("id").text(), "label": str + ' Services' };
                                }
                                var strCat = $(docs).find("categoryname").text();
                                const stringLength = strCat.length; // this will be 16


                                if (strCat.substr(strCat.length - 1) == 's') {
                                    strCat = strCat.slice(0, -1);
                                }
                                strCat = strCat + ' Services';

                                cartd.push({ "value": $(docs).find("id").text(), "label": strCat });
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

                        this.showToast("Warning", "Service Categories are no longer available in your selected zip code. Please choose another zip code");
                    }
                },
                error => {
                    this.isSearchingStartCS = false;
                    this.isSearchingStart = false;

                    this.showToast("Warning", "Service Categories are no longer available in your selected zip code. Please choose another zip code");
                }
            );

    }

    BindSubCategoryZip(zipCode, categoryId, selectedTab) {
        this.purchaseZipCodeService
            .BindSubCategoryZipCode(zipCode, categoryId)
            .subscribe(
                data => {

                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailSubCategories");
                        var subCategories = [];

                        if (($(docs).find("id").text() == '')) {
                            this.divShowSubCategorySearchCS = false;
                            this.isSearchingStartCS = false;
                            this.isSearchingStart = false;
                            this.showToast("Warning", "Service Categories are no longer available in your selected zip code.Please choose another zip code");
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

        var categoryName, subCategoryName, categoryId, subCategoryId, planId, priceValues, zipCode;

        this.purchaseZipCodeService
            .GetSubCategoryPrice(zipCode, subCategorySearch)
            .subscribe(
                data => {

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
                            categoryName = this.searchForm.get('categorySearchCS').value.label;
                            subCategoryName = this.searchForm.get('subCategorySearchCS').value.label;
                            categoryId = this.searchForm.get('categorySearchCS').value.value;
                            subCategoryId = this.searchForm.get('subCategorySearchCS').value.value;
                        }
                        else if (selectedTab == 'zipCode') {

                            zipCode = this.searchForm.get('zipCode').value;
                            categoryName = this.searchForm.get('categorySearch').value.label;
                            subCategoryName = '';// this.searchForm.get('subCategorySearch').value.label;
                            categoryId = this.searchForm.get('categorySearch').value.value;
                            subCategoryId = '';// this.searchForm.get('subCategorySearch').value.value;
                        }
                        var arrSearchedZipCode = [];
                        var searchedObject = { 'id': 0, 'Zipcode': zipCode, "CategoryName": categoryName, "SubCategoryName": subCategoryName, "Price": priceValues, "CategoryId": categoryId, "SubCategoryId": subCategoryId };
                        arrSearchedZipCode.push(searchedObject);

                        this.initializedDataTableSearchedZipCodes(arrSearchedZipCode);
                    }
                    else {
                        this.formErrorMessageSearch = "Something went wrong, Try Again!!!"
                    }
                    this.isSearchingStart = false;
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
                var rowDataState = $(this).closest('tr')[0];
                thisStatus.gRowDataState = rowDataState;
                var row = thisStatus.dTableSearching.fnGetPosition(rowDataState);
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


                thisStatus.ngZone.run(() => {
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


                thisStatus.ngZone.run(() => {

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

    }

    CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        this.purchaseZipCodeService
            .ZipCodePurchase()
            .subscribe(
                data => {

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
                                thisStatus.showToast('Warning', "Maximum Limit is expired. You've reached the maximum allowed number of sales advertisment posts.");
                                return false;
                            }
                        });
                    }
                    this.cdr.detectChanges();
                }
            );
    }

    ZipCodePurchaseCode(categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode) {
        this.purchaseZipCodeService
            .ZipCodePurchaseCode()
            .subscribe(
                data => {

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
                            this.ApplyCoponCodeNew(a, b, c, categoryText, subCategoryText, categoryId, subCategoryId, planId, priceValues, zipCode);
                        }
                        else {
                            this.overlayLoadingOnPurchase = false;
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


                    if (data.d == "1") {


                        var monthValue = 1;// MemberShip.value;
                        //var totalAmount = $("#lblprice").text();
                        const results: any = await Promise.apply(
                            this.purchaseZipCodeService
                                .InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
                                .then(subData => {
                                    if (subData !== undefined && subData != "" && subData != null) {
                                        if (subData.d == "1") {
                                            this.showToast('success', "Zip code successfully purchased!");
                                            this.showToast('success', "Credit card has been successfully charged.");
                                            this.overlayLoadingOnPurchase = false;
                                            debugger;
                                            this.dTableSearching.DataTable().clear().destroy();
                                            this.AssociateAlreadyCategories();

                                        }
                                        if (subData.d == "0") {

                                            this.showToast('Warning', "Failed to buy zip code, already exist.");
                                            this.overlayLoadingOnPurchase = false;

                                        }
                                        if (subData.d == "3") {
                                            this.showToast('Warning', "Error, Something went wrong. Reload page, Try Again!!!");
                                        }
                                    }
                                    else {
                                        this.showToast('Warning', "Error, Something went wrong. Reload page, Try Again!!!");
                                    }
                                    this.cdr.detectChanges();
                                }));
                    }
                    else {

                        if (this._Counter == 0) {
                            //this.AssociateAlreadyCategories();
                            this.onOpenModalClick();
                            this._Counter++;
                        }
                        else {
                            this._Counter++;

                            this.showToastCardError("Warning", "We can not complete this Zip Code Purchase at this time!!");
                            this.showToastCardError("Warning", "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.");
                            this.overlayLoadingOnPurchase = false;
                        }
                    }
                    this.cdr.detectChanges();

                });
    }

    RemoveSearchedZipCodes() {
        if (this.dTableSearching !== undefined && this.dTableSearching != null) {
            //this.dTableSearching.off('click');
            //this.dTableSearching.DataTable().clear().destroy();
            //this.dTableSearching.find("tbody").empty();

        }
        //if (this.dTableSearching !== undefined && this.dTableSearching != null) {
        //    this.dTableSearching.dataTable().fnClearTable();
        //}
    }


    RemoveCurrentPurchasedZipCode() {
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
            .SelectCurrentPurchasedZipCodes()
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {
                        this.dTableAPZC.DataTable().clear().destroy();
                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PurCategories");

                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson: any = [];
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet.MyCategories != null) {
                            if (!Array.isArray(dataJson.NewDataSet.MyCategories)) {
                                resultJson.push(dataJson.NewDataSet.MyCategories);
                                dataJson.NewDataSet.MyCategories = resultJson;
                            }
                            this.InitializedDataTableAllPurchasedZipCodes(dataJson.NewDataSet.MyCategories);
                        }
                        else {
                            this.InitializedDataTableAllPurchasedZipCodes(undefined);
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
                        this.totalNoOfPurchasedItems = totalNoOfPurchasedZiCodes;
                        this.totalPurchasedAmount = totalPurchasedAmount;

                        var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalPurchasedAmount + "</b></td><td></td></tr>";

                    }
                }
            );
    }



    ViewAllPurchasedZipCode() {
        this.purchaseZipCodeService
            //.GetPurchasedAllRecords()
            .SelectCurrentPurchasedZipCodes()
            .subscribe(
                data => {

                    if (data.d != null && data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("MyCategories");

                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson: any = [];
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet.MyCategories != null) {
                            if (!Array.isArray(dataJson.NewDataSet.MyCategories)) {
                                resultJson.push(dataJson.NewDataSet.MyCategories);
                                dataJson.NewDataSet.MyCategories = resultJson;
                            }
                            this.InitializedDataTableAllPurchasedZipCodes(dataJson.NewDataSet.MyCategories);
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
        //$("#allPurchasedZipCodes").DataTable().clear().destroy();

        debugger;
        this.dTableAPZC = $('#allPurchasedZipCodes');
        let thisStatus: any = this;
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



                        if (data.substr(data.length - 1) == 's') {
                            data = data.slice(0, -1);
                        }
                        data = data + ' Services';

                        return data
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
            e.preventDefault();

            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);



            thisStatus.ngZone.run(() => {

                thisStatus.onOpenModalConfirmationClick($(this));
            });
        });
    }

    RemoveAllPurchasedZipCodes() {

        if (this.dTableAPZC !== undefined && this.dTableSearching != null) {
            $('#allPurchasedZipCodes').off('click');
            this.dTableAPZC.DataTable().clear().destroy();

        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    }

    onOpenModalClick(): void {

        this.overlayLoadingOnPurchase = false;
        const modal: NgbModalRef = this.modalService.open(PaymentModalComponent, { size: 'lg', backdrop: "static" });
        const modalComponent: PaymentModalComponent = modal.componentInstance;

        modal.componentInstance.dismissParentCall.subscribe((data) => {
            console.log(data);
            this.overlayLoadingOnPurchase = false;
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;

            this.showToast('success', 'Purchasing is in process');

            var row = this.dTableSearching.fnGetPosition(this.gRowDataState);
            var rowData = this.dTableSearching.fnGetData(row);
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

            this.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);
        });

        //modal.result.then(
        //    (result) => {

        //        var row = this.dTableSearching.fnGetPosition($(this).closest('tr')[0]);
        //        var rowData = this.dTableSearching.fnGetData(row);
        //        // var rowColumns = rowData[rowData.length - 1];

        //        var id = rowData['id'];
        //        var zipCode = rowData['Zipcode'];
        //        var categoryText = rowData['CategoryName'];
        //        var subCategoryText = rowData['SubCategoryName'];
        //        var priceValues = rowData['Price'];
        //        var categoryId = rowData['CategoryId'];
        //        var subCategoryId = rowData['SubCategoryId'];
        //        this.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);

        //        //this.updateBindings();
        //    },
        //    () => { });
    }

    onOpenModalConfirmationClick(deleteow): void {

        const modal: NgbModalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', backdrop: "static" });
        (<ConfirmationModalComponent>modal.componentInstance).dataToTakeAsInputForZipCode = deleteow.closest('tr').children('td:nth-child(2)').text();

        const modalComponent: ConfirmationModalComponent = modal.componentInstance;

        //Case for cancel
        modal.componentInstance.dismissConfirmationEvent.subscribe((data) => {
            console.log('dismiss confirmation');
            //this.overlayLoadingOnPurchase = false;
        });

        //Case for confirmation 
        modal.componentInstance.CancelConfirmationEvent.subscribe((data) => {
            //this.showToast('success', 'Purchasing is in process');
            console.log('cnacel confirmation');
            this.purchaseZipCodeService
                .PermananetlyRemoveCategory(deleteow.closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        this.dTableAPZC.api().row(deleteow.parents('tr')).remove().draw(false);
                        this.showToast('success', 'Zip Code successfully removed.');
                    });
        });

    }


    switchNgBTab(id: string) {
        this.ctdTabset.select(id);
    }




    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type ,
            type: type,
            duration: 8000
        });
    }

    showToastCardError(toastrType, text)
    {
        const type = toastrType;
        this.toastRef = this.toaster.open({
            text: text,
            caption: type,
            type: type,
            duration: 8000000
        });

        //hide manually   this.toastr.clear(this.toastRef.ToastId);

    }

    ApplyCoponCode(cCode, disc, duration) {

        var categoryId, subCategoryId, planId, priceValues, zipCode;

        this.purchaseZipCodeService
            .ApplyCoponCode(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode)
            .subscribe(
                async data => {


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
                                this.showToast('Warning', "Failed, Already exist!!!");
                                //$('#fail_message').modal('show');
                            }
                            if (subData.d == "3") {
                                this.showToast('Warning', "Error, Something went wrong. Try Again!!!");
                            }

                        });

                        if (data.d == "0") {
                            this.showToast('Warning', "Failure, Already. Try Again!!!");
                        }
                        if (data.d == "3") {
                            this.showToast('Warning', "Error, Something went wrong. Try Again!!!");
                        }
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
                    .subscribe(
                        data => {
                            //thisStatus.getClientDetailsServicesData();
                            //thisStatus.getServicesCount();
                            //thisStatus.getTotalSalesAndServicesCount();
                        });
            });
            this.loadFirstTimeOnlyAllPurchasedZipCodes = false;
        }
    }

    RemoveAllCurrentPurchasedZipCode() {

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