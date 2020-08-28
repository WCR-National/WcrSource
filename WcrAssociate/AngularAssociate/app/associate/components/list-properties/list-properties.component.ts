import { Component, OnInit, ViewChild, Input, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';

import { ValidationErrors, AbstractControl, ValidatorFn, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ListPropertiesService } from 'AngularAssociate/app/services/associate/list-properties.service';
import { PurchaseZipCodeService } from 'AngularAssociate/app/services/associate/purchase-zipcode.service';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // add this 1 of 4
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
    selector: 'list-properties',
    templateUrl: './list-properties.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPropertiesComponent implements OnInit {
    cardForm: FormGroup;
    PostAdvertisement: FormGroup;
    categorySearchForm: FormGroup;

    items: GalleryItem[];
    editor = ClassicEditor;

    isSubmitting: boolean = false;
    isCreditCardFormVisible: boolean = false;

    salesCount: string = '';
    servicesCount: string = '';
    TotalCount: string = '';
    showSuccessMessage: string = '';
    isAddOrUpdateButton: boolean = true;

    public TotalCountOfItemsPurchased = 0;

    validationMessagesPA = {

        'consumerSegmentType': {
            'required': 'Please select Consumer Segment Type.'
        },
        'titlePA': {
            'required': 'Title field is required.',
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'pricePA': {
            'required': 'Price field is required.',
            'Numeric': 'Allowed numeric only.'
        },
        'descPA': {
            'required': 'Description field is required.',
            'letterOnly': 'Alphabetical letters only.'
        },
        'additionalFeature': {
            'required': 'Additional feature is required.'
        },
        'contactNoPA': {
            'required': 'Contact no is required',
            'tenDigits': 'Allowed 10 digits for mobile no.',
            'elevenDigits': 'Start with 1, Allowed 11 digits'
        },
        'stAddressPA': {
            'required': 'Street address is required',
            'alphaNumeric': 'Allowed alphanumeric only.'
        },
        'cityPA': {
            'required': 'City is required',
            'alphaNumeric': 'Allowed alphanumeric only.'
        },
        'statePA': {
            'required': 'State is required'
        },
        'countryPA': {
            'required': 'Country is required'
        },
        'zipCodePA': {
            'required': 'Zip Code is required',
            'zipCode': 'Please enter 5 digit zip code.',
            'numericOnly': 'Allowed digits only.',
            'maxLength': 'Allowed 4 digits only.',
        }
    }

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

    formErrorsPA = {
        'consumerSegmentType': '',
        'titlePA': '',
        'pricePA': '',
        'descPA': '',
        'additionalFeature': '',
        'contactNoPA': '',
        'stAddressPA': '',
        //'name': '',
        'cityPA': '',
        'statePA': '',
        'countryPA': '',
        'zipCodePA': ''
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

    public startValueMonth = null;
    public selectedMonth = null;
    public g_selectedMonth = null;

    public startValueYear = null;
    public selectedYear = null;
    public g_selectedYear = null;



    public startValueZipCodePA = null;
    public startValueStatePA = null;
    public selectedZipCodePA = null;
    public selectedStatePA = null;


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
    public formErrorMessagePA = "";

    public imageUrl = "";
    public arrayOfImages = [];


    public startValueCountry = null;
    public countryData = [];

    public catPriceValue = 0.0;
    public stateDataPA = [];

    public arrayCategories = [];

    public _Counter = 0;

    public isDisabledPABtn: boolean = false;
    public closeResult: string;
    
    public zipCodeDataPA = null;

    public categorySearchData = null;
    public startValueCategorySearch = null;
    public subCategorySearchData = null;
    public startValueSubCategorySearch = null;

    public isPurchaseNewCategoriesVisible: boolean = false;
    public isPostAdvertismentClicked: boolean = false;
    public isNewFormPostAdvertisement = false;
    public isPostAdvertisementFormVisible = false;
    public iSConsumerSegmentAdvertisement = false;
    public sts1 = 0;

    public monthlyBllingDate: string = "";
    public monthlyPurchaseCategoriesDate: string = "";

    public isSubmittingPA: boolean = false;



    constructor(private route: ActivatedRoute, private router: Router, private paymentService: PaymentService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, private listpropertiesService: ListPropertiesService, private purchaseZipCodeService: PurchaseZipCodeService, private modalService: NgbModal,
        private ngZone: NgZone, public gallery: Gallery, private toaster: Toaster) {

    }

    ngOnInit() {


        // Load item into different lightbox instance
        // With custom gallery config
        //this.withCustomGalleryConfig();

        this.initializeEventAndControls();

        this.setValidationOnForm();

        this.bindMonth();

        this.bindYear();

        this.getCardDataDetails();


        /***************************************************************
         * *************** List Properties *****************************
         * *************************************************************/

        this.BindStatePA();

        this.AssociateAlreadyCategories();

        this.BindAllCategory();

        this.CountAssociateCategory();

        if ((new Date()).getMonth() == 11) {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear() + 1, 0, 1)).format('yyyy-MM-dd');
        }
        else {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 1)).format('yyyy-MM-dd');
        }
        this.monthlyPurchaseCategoriesDate = this.monthlyBllingDate;
        this.PostAdvertisement.get('countryPA').setValue('US');
        this.GetMobileNo();
        this.InitializrEventsAndControlsPA();

    }

    InitializrEventsAndControlsPA() {



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

        this.PostAdvertisement = this.fb.group({
            consumerSegmentType: [''],
            titlePA: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            pricePA: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { numericOnly: true })]],
            descPA: ['', [Validators.required, StateValidator(/^[a-zA-Z0-9\-\s]+$/, { letterOnly: true })]],
            additionalFeature: ['', [Validators.required]],
            contactNoPA: ['', [Validators.required, phoneValidator(/\d{11}/, { elevenDigits: true })]],
            stAddressPA: ['', [Validators.required, StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { alphaNumeric: true })]],
            cityPA: ['', [Validators.required]],
            statePA: ['', [Validators.required]],
            countryPA: ['', [Validators.required]],
            zipCodePA: ['', [Validators.required]],
            advId: [''],
            subCat: [''],
            lblzipCodeprice: ['']
        });

        this.categorySearchForm = this.fb.group({
            categorySearch: [''],
            subCategorySearch: ['']
        });

    }

    RemoveCardSessions() {
        this.listpropertiesService
            .RemoveCardSessions()
            .subscribe(
                data => {
                    debugger;
                }
            );
    }

    BindMembership() {

        this.listpropertiesService
            .BindMembership()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("MemberShipPlan");
                        var cartd = [];
                        cartd.push("<option value=0>Select</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("mDuration").text() + "'>" + $(docs).find("PlanName").text() + "</option>");
                        });
                        $("#MemberShip").html(cartd.join(''));
                    }
                }
            );
    }


    logValidationErrorsPA(group: FormGroup = this.PostAdvertisement): void {
        this.formErrorMessagePA = "";
        Object.keys(group.controls).forEach((key: string) => {

            const abstractControl = group.get(key);
            this.formErrorsPA[key] = '';

            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                this.formErrorsPA[key] = "";
                const messages = this.validationMessagesPA[key];
                if (abstractControl.errors != null) {
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                this.formErrorsPA[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrorsPA(abstractControl);
            }
        });
    }

    onSelectFile(event, imageIndex) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            var imageExist = false;
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            for (var i = 0; i < this.arrayOfImages.length; i++) {
                if (this.arrayOfImages[i] !== undefined && this.arrayOfImages[i].imageIndex == imageIndex) {
                    reader.onload = (event: any) => { // called once readAsDataURL is completed
                        this.imageUrl = event.target.result;
                        this.arrayOfImages[i].imageUrl = this.imageUrl;
                        this.arrayOfImages[i].previewUrl = this.imageUrl;
                    }
                    imageExist = true;
                }
            }
            if (!imageExist) {
                reader.onload = (event: any) => { // called once readAsDataURL is completed
                    this.imageUrl = event.target.result;
                    let imageObject = { 'srcUrl': this.imageUrl, 'previewUrl': this.imageUrl, 'imageIndex': imageIndex };
                    this.arrayOfImages.push(imageObject);
                }
            }
            this.showImagesUsingFAncyBox(this.arrayOfImages);
            if (imageIndex == '0')
                this.UpdateImages($('#FileUpload1'), this.PostAdvertisement.get('advId').value, 'UpdateAdvertisementImges.ashx');
            else if (imageIndex == '1')
                this.UpdateImages($('#FileUpload1'), this.PostAdvertisement.get('advId').value, 'UpdateAdvertisementSecondImage.ashx');
            else if (imageIndex == '2')
                this.UpdateImages($('#FileUpload1'), this.PostAdvertisement.get('advId').value, 'UpdateThirdImg.ashx');
            else if (imageIndex == '3')
                this.UpdateImages($('#FileUpload1'), this.PostAdvertisement.get('advId').value, 'UpdateFourthImg.ashx');
        }
    }

    showImagesUsingFAncyBox(p_arrayOImages) {
        // 1. Create gallery items
        this.items = p_arrayOImages.map(item =>
            new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
        );

        // Load items into the lightbox
        this.gallery.ref().load(this.items);
    }

    BindCountry() {
        const countryId = "US";//this.cardForm.get('country').value;
        this.listpropertiesService
            .BindCountry()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Countries");
                        var arrCountry = [];
                        //this.startValueState = '';
                        var thisStatus = this;
                        //arrState.push({ "value": "-1", "label": "Select State" })
                        var val = "";
                        var label = "";
                        $.each(docs, function (i, docs) {
                            if (i == 0) {
                                val = $(docs).find("countryid").text();
                                label = $(docs).find("countryid").text();
                                //thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                            }
                            arrCountry.push({ "value": $(docs).find("countryid").text(), "label": $(docs).find("countryid").text() });
                        });
                        this.countryData = arrCountry;

                        //if (this.state != "" && this.country !== undefined) {
                        //    this.startValueCountry = [this.country];//{ value: "1", label: "January" };
                        //    if (this.city != "" && this.city !== undefined) {
                        //        this.bindStateWiseZipCode(this.state, this.city);
                        //    }
                        //}
                        //else {
                        //    this.startValueCountry = { 'value': val, 'label': label };
                        //}

                    }
                }
            )
    }

    GetMobileNo() {

        this.listpropertiesService
            .ViewAssociateBasicDetails()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        var cartd = [];
                        var sd = [];
                        let thisStatus = this;
                        $.each(docs, function (i, docs) {
                            thisStatus.PostAdvertisement.get('contactNoPA').setValue($(docs).find("MobileNo").text());
                            $("#contactNoPA").attr("disabled", "disabled");
                        });
                    }
                }
            );
    }

    BindStatePA(startStateValue = null) {

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
                        if (startStateValue != null) {
                            $.each(docs, function (i, docs) {
                                if ($(docs).find("stateid").text() == startStateValue) {
                                    val = $(docs).find("stateid").text();
                                    label = $(docs).find("stateid").text();
                                    thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                                }
                                arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                            });
                        }
                        else {
                            $.each(docs, function (i, docs) {
                                if (i == 0) {
                                    val = $(docs).find("stateid").text();
                                    label = $(docs).find("stateid").text();
                                    thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                                }

                                arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                            });
                        }
                        this.stateDataPA = arrState;
                    }
                }
            );
    }

    UpdateImages(fileuploaderID, AdID, handUrl) {
        var fileUpload = fileuploaderID.get(0);
        var files = fileUpload.files;
        var test = new FormData();

        for (var i = 0; i < files.length; i++) {
            if (fileuploaderID.val() == '') {
            }
            else {
                test.append(files[i].name, files[i], AdID);
            }
        }

        $.ajax({
            url: handUrl,
            type: "POST",
            contentType: false,
            processData: false,
            data: test,
            success: function (result) {
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }

    ApplyCoponCode(cCode, disc, duration) {

        if ($("#MemberShip").val() == 0) {
            this.showToast('danger', 'Select Membership Plan');
            //alert("Select Membership Plan");
        }
        else {
            var categoryId, subCategoryId, planId, priceValues, zipCode;

            var teamlist = [];
            var zipcodelist = [];
            var PriceValues = [];
            var CatIdValue = [];
            this.listpropertiesService
                .SelectAllPurchasedCartData()
                .subscribe(
                    async data => {
                        debugger;

                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("Table1");

                            $.each(docs, function (i, docs) {
                                teamlist.push($(docs).find("subCategoryID").text());
                                zipcodelist.push($(docs).find("Zipcode").text());
                                PriceValues.push($(docs).find("Price").text());
                                CatIdValue.push($(docs).find("CategoryID").text());
                            });

                            const results: any = await Promise.apply(this.purchaseZipCodeService.InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode))
                                .ajaxSuccess(
                                    async subData1 => {
                                        if (subData1.d == "1") {
                                            if (this.catPriceValue == 0) {
                                                this.showToast('success', "Zip code successfully Purchased!");
                                                this.showToast('success', "Your Credit Card has been successfully charged.");
                                                this.AssociateAlreadyCategories();
                                            }
                                            else {
                                                var monthValue = 1;// MemberShip.value;
                                                var totalAmount = $("#lblprice").text();

                                                const results: any = await Promise.apply(this.purchaseZipCodeService.MakeTransaction(monthValue, totalAmount)).ajaxSuccess(subData => {

                                                    if (subData.d == "1") {
                                                        this.showToast('success', "Zip code successfully Purchased!");
                                                        this.showToast('success', "Your Credit Card has been successfully charged.");
                                                        //this.divShowTableSelectedSearch = false;

                                                        this.AssociateAlreadyCategories();
                                                        this.RemoveCardSessions();
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

                                    });



                        }
                    });
        }

    }


    AssociateAlreadyCategories() {
        debugger;
        this.listpropertiesService
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
                            //this.InitializedDataTableCurrentPurchasedZipCodes(undefined);
                        }
                        //this.divShowCurrentPurchasedZipCodes = true;

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
        debugger;
        console.log(asyncData);

        let dTable: any = $('#ViewAllCategoriesPurchased');
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

        $('#ViewAllCategoriesPurchased').on('click', 'a.purchase', function (e) {
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


    SelectedChoicesForPurchase() {
        this.listpropertiesService
            .SelectedChoicesForPurchase()
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

                        if (dataJson.ViewAdvertisment != null) {
                            if (!Array.isArray(dataJson.Table1)) {
                                resultJson.push(dataJson.Table1);
                                dataJson.Table1 = resultJson;
                            }
                            this.InitializedDataTableSelectedChoices(dataJson.Table1);
                        }
                        else {
                            this.InitializedDataTableSelectedChoices(undefined);
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
    } //BindData  //GetAllRecords

    InitializedDataTableSelectedChoices(asyncData) {
        console.log(asyncData);

        let dTable: any = $('#ViewRcd');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'advertisementID': '',
                'advMainImage': '',
                'categoryname': '',
                'name': "",
                'title': "",
                'cost': "",
                'Amount': ""

            };
        }
        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'id'
                },
                {
                    data: 'CategoryName'
                },
                {
                    data: 'SubCategoryName'
                },
                {
                    data: "Price",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="purchase">Purchase</a>'
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="cancel">Cancel</a>'
                },
                {
                    data: "Zipcode",
                },
                {
                    data: "subCategoryID",
                },
                {
                    data: "CategoryID",
                }
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            columnDefs: [
                {
                    targets: [6],
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
            buttons: [
                'excel', 'pdf'
            ],
            order: [[1, 'asc']]
        });

        $('#ViewRcd').on('click', 'a.purchase', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            var row = dTable.fnGetPosition($(this).closest('tr')[0]);
            var rowData = dTable.fnGetData(row);
            var rowColumns = rowData[rowData.length - 1];

            var id = rowColumns[0];
            var CategoryName = rowColumns[1];
            var SubCategoryName = rowColumns[2];
            var Price = rowColumns[3];
            var Zipcode = rowColumns[6];
            var subCategoryID = rowColumns[7];
            var CategoryID = rowColumns[8];


            this.PurchaseRcd(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id);
        });
        $('#ViewRcd').on('click', 'a.Cancel', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());


            var row = dTable.fnGetPosition($(this).closest('tr')[0]);
            var rowData = dTable.fnGetData(row);
            var rowColumns = rowData[rowData.length - 1];

            var id = rowColumns[0];
            var CategoryName = rowColumns[1];
            var SubCategoryName = rowColumns[2];
            var Price = rowColumns[3];
            var Zipcode = rowColumns[6];
            var subCategoryID = rowColumns[7];
            var CategoryID = rowColumns[8];
            this.CancelRecord(subCategoryID, SubCategoryName, id);
        });
    }

    PurchaseRcd(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id) {

        this.listpropertiesService
            .PurchasedItems(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id)
            .subscribe(
                data => {
                    $("#divSelectedChce").css("display", "none");
                    $("#aSubCategory option:selected").remove();
                    $("#btncheckout").css("visibility", "visible");
                    $("#btnreset1").css("visibility", "visible");
                    $("#btnCancel1").css("visibility", "visible");
                    this.RemoveFromPurchase(id);
                    this.GetPurchasedAllRecords();
                    var a = 0;
                    var b = 0;
                    var c = 0;
                    this.ApplyCoponCode(a, b, c);
                }
            );
    }

    RemoveFromPurchase(id) {

        this.listpropertiesService
            .RemoveItem(id)
            .subscribe(
                data => {
                    this.SelectedChoicesForPurchase();
                }
            );
    }

    GetPurchasedAllRecords() {
        this.listpropertiesService
            .SelectAllPurchasedCartData()
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
                'ZipCode': '',
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
                    defaultContent: '<a href="" class="editor_remove cancel">Cancel</a>'
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

        $('#viewAllPurchasedZipCodes').on('click', 'a.cancel', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);

            this.RemoveRcd1($(this).closest('tr').children('td:first').text());
        });
    }

    RemoveRcd1(rrr) {

        this.listpropertiesService
            .RemoveItem1(rrr)
            .subscribe(
                data => {
                    this.GetPurchasedAllRecords();
                }
            );
    }

    ViewAllSalesAdvertisement() { //BindData  
        this.listpropertiesService
            .SelectAdvertisement()
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {

                        var chk = 1;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");

                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson: any = [];
                        var dataJson = JSON.parse(json);

                        if (dataJson.ViewAdvertisment != null) {
                            if (!Array.isArray(dataJson.ViewAdvertisment)) {
                                resultJson.push(dataJson.ViewAdvertisment);
                                dataJson.ViewAdvertisment = resultJson;
                            }
                            this.InitializedDataTableSalesAdvertisement(dataJson.ViewAdvertisment);
                        }
                        else {
                            this.InitializedDataTableSalesAdvertisement(undefined);
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

    InitializedDataTableSalesAdvertisement(asyncData) {
        console.log(asyncData);

        let dTable: any = $('#salesAdvertisement');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'advertisementID': '',
                'advMainImage': '',
                'categoryname': '',
                'name': "",
                'title': "",
                'cost': "",
                'Amount': ""

            };
        }
        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'advertisementID'
                },
                {
                    data: 'advMainImage'
                },
                {
                    data: "categoryname",
                },
                {
                    data: "name",
                },
                {
                    data: "title",
                },
                {
                    data: "cost",
                },
                {
                    data: "Amount",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="edit">Edit</a>'
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="remove">Delete</a>'
                },
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            order: [[1, 'asc']]
        });

        $('#salesAdvertisement').on('click', 'a.edit', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            //dTable.api().row($(this).parents('tr')).remove().draw(false);

            this.EditRecords($(this).closest('tr').children('td:first').text());
        });

        $('#salesAdvertisement').on('click', 'a.delete', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);

            this.DeleteRecords($(this).closest('tr').children('td:first').text());

        });
    }

    DeleteRecords(advId) {
        if (confirm("Are you sure?")) {
            var msg = [];

            this.listpropertiesService
                .DeleteDataFromAdvertisement(advId)
                .subscribe(
                    data => {

                        if (data.d == "-1") {
                            this.showToast('danger', "Failure, Already Exist!!!");
                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                        }
                        else if (data.d = "1") {
                            this.showToast('success', "Success, Deleted Succesfully.");

                            this.isPostAdvertisementFormVisible = false;
                        }
                    });
        }
    }

    EditRecords(advId) {

        $("#insertOrEdit").text("1");
        $("#divAdvertisements").css("display", "block");
        $("#addForm").css("display", "block");
        $('#divDetail').css("visibility", "visible");
        $("#btnAddNew").attr("disabled", "disabled");
        $('#divDetail1').css("visibility", "visible");
        $('#divImage').css("display", "none");
        $('#divsave').css("display", "block");
        $('#btnSubmit').css("display", "none");
        $('#btnUpdate').css("display", "inline-block");
        $('#divImgbutton').css("display", "block");
        $('#ViewAllImages').css("visibility", "visible");
        $('#divtabs').css("display", "block");

        this.listpropertiesService
            .GetAdvertisementDetails(advId)
            .subscribe(
                data => {

                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("FullDetailsAdvertisments");
                        var thisStatus = this;
                        $.each(docs, function (i, docs) {

                            $("label[for='lblRowId']").text($(docs).find("advertisementID").text());
                            var catValue = $(docs).find("subcategoryID").text();
                            if (catValue == '1') {

                                $("#subCatTownHome").removeClass("active");
                                $("#subCatHome").addClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                $("#subCatLand").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(1).html("Home"));
                                $('#SubCategory').append(_select.html());
                            }
                            else if (catValue == '2') {

                                $("#subCatTownHome").addClass("active");
                                $("#subCatHome").removeClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                $("#subCatLand").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(2).html("TownHome"));
                                $('#SubCategory').append(_select.html());
                            }
                            else if (catValue == '3') {
                                $("#subCatMultiFamily").addClass("active");
                                $("#subCatTownHome").removeClass("active");
                                $("#subCatHome").removeClass("active");
                                $("#subCatLand").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(3).html("Multi-Family"));
                                $('#SubCategory').append(_select.html());
                            }
                            else if (catValue == '4') {
                                $("#subCatLand").addClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                $("#subCatTownHome").removeClass("active");
                                $("#subCatHome").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(4).html("Land"));
                                $('#SubCategory').append(_select.html());
                            }

                            $("#SubCategory").val($(docs).find("subcategoryID").text());
                            thisStatus.PostAdvertisement.get('titlePA').setValue($(docs).find("title").text());
                            thisStatus.PostAdvertisement.get('stAddressPA').setValue($(docs).find("address").text());
                            thisStatus.PostAdvertisement.get('contactNoPA').setValue($(docs).find("contactNo").text());
                            thisStatus.PostAdvertisement.get('descPA').setValue($(docs).find("description").text());
                            thisStatus.PostAdvertisement.get('pricePA').setValue($(docs).find("cost").text());
                            thisStatus.PostAdvertisement.get('countryPA').setValue($(docs).find("CountryID").text());
                            thisStatus.PostAdvertisement.get('cityPA').setValue($(docs).find("CityID").text());

                            //CKEDITOR.instances.txtFeatures.setData($(docs).find("features").text());
                            var sd = [];
                            sd.push("<img class='thumb-image' width='75px' height='75px' src='../../../../../Associate/Adv_img/" + $(docs).find("advMainImage").text() + "'/>");
                            $("#image-holder").html(sd.join(''));

                            thisStatus.BindStatePA($(docs).find("StateID").text());

                            var sd1 = [];

                            sd1.push("<img class='thumb-image' width='75px' height='75px' src='../../../../../Associate/Adv_img/" + $(docs).find("advImage1").text() + "'/> ");
                            $("#image-holder2").html(sd1.join(''));
                            var sd2 = [];
                            sd2.push("<img class='thumb-image' width='75px' height='75px' src='../../../../../Associate/Adv_img/" + $(docs).find("advImage2").text() + "'/> ");
                            $("#image-holder3").html(sd2.join(''));
                            var sd3 = [];
                            sd3.push("<img class='thumb-image' width='75px' height='75px' src='../../../../../Associate/Adv_img/" + $(docs).find("advImage3").text() + "'/> ");
                            $("#image-holder4").html(sd3.join(''));

                            thisStatus.BindStateWiseZipCodeForSearch(null, null, $(docs).find("ZipCode").text());

                        });

                    }
                });
    }

    PostAds() {
        this.listpropertiesService
            .AssociateCardExists()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CheckAssoCard");
                        if (parseInt($(docs).find("id").text()) >= 1) {
                            this.InsertPostAdvsData();
                        }
                        else {
                            this.open('');
                            //$('#completeConsumerProfile').modal('show');
                        }
                    }
                });
    }

    InsertPostAdvsData() {
        // var check = this.Valid1();
        // if (check == '0') {

        this.listpropertiesService
            .CountAssociateAdvertisements()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc1 = $.parseXML(data.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("AssociateAdvertisements");
                        var thisStatus = this;
                        $.each(docs1, function (i, docs1) {
                            if (parseInt($(docs1).find("totalAdts").text()) < 15) {
                                thisStatus.PayAmount();
                            }
                            else {
                                thisStatus.showToast('danger', 'Maximum Limit is expired.');
                                thisStatus.showToast('danger', 'You have reached maximum allowed number of sales advertisement.');

                                return false;
                            }
                        });
                    }
                });
        // }
        // else
        // {
        //    var strArray:any = check.split(',');
        //    for (var i = 0; i < strArray.length; i++)
        //    {
        //        //alert(strarray[i])
        //        if (parseInt(strArray[i]) == 1) {
        //            $('#defaultOpen').css("background-color", "red");
        //        }
        //        if (parseInt(strArray[i]) == 2)
        //        {
        //            $('#defaultOpen1').css("background-color", "red");
        //        }
        //        if (parseInt(strArray[i]) == 3)
        //        {
        //            $('#defaultOpen2').css("background-color", "red");
        //        }
        //        else if (strArray[i] == "zipcode Required!")
        //        {
        //            alert("Select Zipcode");
        //        }
        //    }
        //}
    }

    async PayAmount() {


        var msg = [];
        var totalAmount = this.PostAdvertisement.get('lblzipCodeprice').value// $("#lblzipCodeprice").text();
        var amountPaidForAdvertisement: string = await this.PaidAmountForPurchaseAdvertisement(totalAmount, this.PostAdvertisement.get('title').value, this.PostAdvertisement.get('subCat').value);
        if (amountPaidForAdvertisement == '1') {
            var CategoryId = 1;
            var subCategoryId = $("#SubCategory").val();
            //this.PostAdvertisement.get('');
            var title = this.PostAdvertisement.get('titlePA').value;
            var featurs = '';//CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
            var address = this.PostAdvertisement.get('stADdressPA').value;
            var contactNo = this.PostAdvertisement.get('contactNoPA').value;
            var description = this.PostAdvertisement.get('descPA').value;
            var countryID = this.PostAdvertisement.get('countryPA').value;
            var stateID = this.PostAdvertisement.get('statePa').value.value;
            var cityId = this.PostAdvertisement.get('cityPA').value;
            var price = this.PostAdvertisement.get('pricePA').value;
            var zipcod = this.PostAdvertisement.get('zipCodePA').value.value;
            var isFeatured = 0;
            var jobtype = 1;
            var amount = 0;
            var adsPrice = this.PostAdvertisement.get('lblzipCodeprice').value;
            if (price == "") {
                amount = 0;
            }
            else {
                amount = parseInt(price);
            }

            var SaveRecordPostAdvts = await this.SavePostAdvertisementsData(CategoryId, subCategoryId, title, featurs, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice);
            if (SaveRecordPostAdvts >= '1') {
                this.PurchasedCategorybyAssociate(1, subCategoryId, 1, 0, 0, 0, 0, 0);
                this.PostAdvertisement.get('titlePA').setValue('');
                //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                this.PostAdvertisement.get('stADdressPA').setValue('');
                this.PostAdvertisement.get('contactNoPA').setValue('');
                this.PostAdvertisement.get('descPA').setValue('');
                this.PostAdvertisement.get('cityPA').setValue('');
                this.PostAdvertisement.get('pricePA').setValue('0');

                this.AdvertisementImages(SaveRecordPostAdvts);
            }
            else {
                this.showToast('danger', "We can not complete this sales Advertisement Purchase at this time!!");
                this.showToast('danger', "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at <b>866.456.7331.</b>");


            }
        }
        else {
            if (this._Counter == 0) {
                this.isDisabledPABtn = true;
                this.open('');
                this._Counter++;
                //$("#btnupdateCard").css("display", "inline-block");
                //$("#btnAddCard").css("display", "none");
                //$("#btnCancelCard").css("display", "inline-block");
            }
            else {
                this._Counter++;
                this.showToast('danger', "We can not complete this sales Advertisement Purchase at this time!!");
                this.showToast('danger', "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at <b>866.456.7331.</b>");
            }
        }
    }

    PurchasedCategorybyAssociate(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration) {

        this.listpropertiesService
            .InsertCatgoryPostAds(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration)
            .subscribe(
                data => {
                    return data.d;
                }
            );
    }

    PaidAmountForPurchaseAdvertisement(totalAmount, title, subcategory): any {

        this.listpropertiesService
            .InsertAmount(totalAmount, title, subcategory)
            .subscribe(
                data => {
                    return data.d;
                }
            );
    }

    SavePostAdvertisementsData(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice): any {

        this.listpropertiesService
            .InsertSale(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice)
            .subscribe(
                data => {
                    return data.d;
                }
            );
    }

    async AdvertisementImages(rowID) {
        var fileUpload: any = $("#FileUpload1").get(0);
        var files = fileUpload.files;
        var test = new FormData();
        var secondupload: any = $("#FileUpload2").get(0);
        var files2 = secondupload.files;
        var thirdupload: any = $("#FileUpload3").get(0);
        var files3 = thirdupload.files;
        var fourthupload: any = $("#FileUpload4").get(0);
        var files4 = fourthupload.files;
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i], rowID);
            if ($("#FileUpload2").val() == '') {
            }
            else {
                test.append(files2[i].name, files2[i], rowID);
            }
            if ($("#FileUpload3").val() == '') {
            }
            else {
                test.append(files3[i].name, files3[i], rowID);
            }
            if ($("#FileUpload4").val() == '') {
            }
            else {
                test.append(files4[i].name, files4[i], rowID);
            }
        }

        $.ajax({
            url: "UploadHandler.ashx",
            type: "POST",
            contentType: false,
            processData: false,
            data: test,
            success: function (result) {
                $("#FileUpload1").val("");
                $("#FileUpload2").val("");
                $("#FileUpload3").val("");
                $("#FileUpload4").val("");
                $("#image-holder").empty();
                $("#image-holder2").empty();
                $("#image-holder3").empty();
                $("#image-holder4").empty();

                $("#Allimage-holder").empty();
                $("#Allimage-holder1").empty();
                $("#Allimage-holder2").empty();
                $("#Allimage-holder3").empty();
                $("#btnAddNew").removeAttr('disabled');
                this.ClearText();
                this.ViewAllSalesAdvertisement();

                this.showToast('success', "Successfully Sales Advertisment Purchased!");
                this.showToast('success', "Your credit card has been Successfully charged!!!");

            },
            error: function (err) {
                alert(err.statusText);
            }
        });

    }

    ClearText() {
        this.PostAdvertisement.get('titlePA').setValue('');
        //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
        this.PostAdvertisement.get('stADdressPA').setValue('');
        this.PostAdvertisement.get('contactNoPA').setValue('');
        this.PostAdvertisement.get('descPA').setValue('');
        this.PostAdvertisement.get('cityPA').setValue('');
        this.PostAdvertisement.get('pricePA').setValue('');
        this.isPostAdvertisementFormVisible = false;

        //$("#txtName").val('');
        //$("#txtFeatures").val('');
        //$("#txtAddress").val('');
        //$("#txtContact").val('');
        //$("#txtdescription").val('');
        //$("#txtAddress").val('');
        //$("#txtPrice").val('0');
        //$('#divImgbutton').css("display", "none");
        //$('#divImage').css("display", "none");
        //$('#divMoreImages').css("visibility", "hidden");
        //$('#divsave').css("visibility", "hidden");

    }



    Updated() {
        var teamlist = [];
        $("#divFeatures input[id*='chk']:checked").each(function () {
            teamlist.push($(this).val());
        });
        var rowID = $("label[for='lblRowId']").text();
        var msg = [];

        var CategoryId = 1;
        var SubCategoryId = $("#SubCategory").val();
        //this.PostAdvertisement.get('');
        var title = this.PostAdvertisement.get('titlePA').value;
        var Features = '';//CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
        var address = this.PostAdvertisement.get('stADdressPA').value;
        var contactNo = this.PostAdvertisement.get('contactNoPA').value;
        var description = this.PostAdvertisement.get('descPA').value;
        var countryID = this.PostAdvertisement.get('countryPA').value;
        var StateID = this.PostAdvertisement.get('statePa').value.value;
        var cityID = this.PostAdvertisement.get('cityPA').value;
        var price = this.PostAdvertisement.get('pricePA').value;
        var zipcode = this.PostAdvertisement.get('zipCodePA').value.value;
        var isFeatured = 0;
        var jobtype = 1;
        var amount = 0;
        var adsPrice = this.PostAdvertisement.get('lblzipCodeprice').value;

        this.listpropertiesService
            .UpdateSale(CategoryId, SubCategoryId, title, Features, address, contactNo, description, countryID, StateID, cityID, zipcode, amount, rowID)
            .subscribe(
                data => {
                    if (data.d == "-1") {
                        this.showToast('danger', "This Record is Already Exists");
                    }
                    if (data.d == "3") {
                        this.showToast('danger', "Unsucessfull, Try again!!!");
                    }
                    else if (data.d >= "1") {
                        this.showToast('success', "Updated Successfully.");
                        this.isPostAdvertisementFormVisible = false;
                        //$('#divsave').css("visibility", "hidden");
                        //$('#divImage').css("display", "none");
                        //$('#btnUpdate').css("visibility", "hidden");
                        //$("#btnAddNew").attr("disabled", true);
                        this.ViewAllSalesAdvertisement();

                    }
                    this.ClearText();
                }
            );
    }

    async PurchaseSalesCategory() {
        var SubCategoryPrice;

        await this.listpropertiesService
            .AssociateCategoryExistsOrNot()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc1 = $.parseXML(data.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("CatExists");
                        var thisStatus = this;
                        $.each(docs1, function (i, docs1) {
                            if (parseInt($(docs1).find("cnt").text()) > 0) {
                                SubCategoryPrice = 0;
                            }
                            else {
                                SubCategoryPrice = 20;
                            }
                        });
                        var CategoryID = this.categorySearchForm.get('categorySearch').value != null ? this.categorySearchForm.get('categorySearch').value.value : null;
                        var subCategoryID = this.categorySearchForm.get('subCategorySearch').value != null ? this.categorySearchForm.get('subCategorySearch').value.value : null;
                        var CategoryName = this.categorySearchForm.get('categorySearch').value != null ? this.categorySearchForm.get('categorySearch').value.label : null;
                        var SubCategoryName = this.categorySearchForm.get('subCategorySearch').value != null ? this.categorySearchForm.get('subCategorySearch').value.label : null;

                        this.listpropertiesService
                            .InsertDNew(CategoryID, subCategoryID, CategoryName, SubCategoryName, SubCategoryPrice)
                            .subscribe(
                                data => {
                                    if (data.d == "1") {
                                        this.SelectedChoicesForPurchase();
                                    }
                                    if (data.d == "0") {
                                        this.showToast('danger', 'Failure, Already Exists.!!!');
                                    }
                                    if (data.d == "3") {
                                        this.showToast('danger', 'Error, Try Again!!!');
                                    }
                                });
                    }
                });
    }

    onclickNewPurchase() {
        this.isNewFormPostAdvertisement = true;
        if (this.sts1 == 0) {
            $('html, body').animate({
                'scrollTop': $("#select-yourdesired").position().top
            });

            $(".button-block1").addClass("disable");
            this.iSConsumerSegmentAdvertisement = true;
            this.sts1 = 1;
            this.isPostAdvertisementFormVisible = true;
        }
        else if (this.sts1 == 1) {
            this.iSConsumerSegmentAdvertisement = false;
            this.isPostAdvertisementFormVisible = false;
            // window.location.href = "PostAdvertisement.aspx";

            this.sts1 = 0;
            $("#SubCategory").html("");

            $("#subCatHome").removeClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatLand").removeClass("active");
            $("#subCatHome").removeClass("diable-sidelink");
            $("#subCatTownHome").removeClass("diable-sidelink");
            $("#subCatMultiFamily").removeClass("diable-sidelink");
            $("#subCatLand").removeClass("diable-sidelink");
        }
    }

    BindCityWiseStatesPA(city) {

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

                        this.stateDataPA = arrState;

                        //if (this.state != "" && this.state !== undefined) {
                        //    this.startValueZip = [this.state];//{ value: "1", label: "January" };
                        //}
                        //else {
                        //    this.startValueZip = { 'value': val, 'label': label };
                        //}
                    }
                });

    }

    BindStateWiseZipCodeForSearch(state, city, startZipCode = null) {

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
                            if (startZipCode != null) {
                                $.each(docs, function (i, docs) {
                                    
                                    if (startZipCode == $(docs).find("zipcode").text() ) {
                                        val = $(docs).find("zipcode").text();
                                        label = $(docs).find("zipcode").text();
                                        thisStatus.startValueZipCodePA = { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                    }

                                    arrState.push({ "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() });
                                });
                            }
                            else {
                                $.each(docs, function (i, docs) {

                                    if (i == 0) {
                                        val = $(docs).find("zipcode").text();
                                        label = $(docs).find("zipcode").text();
                                        thisStatus.startValueZipCodePA = { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                                    }

                                    arrState.push({ "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() });
                                });
                            }
                            
                            if (arrState.length == 0) {
                                this.formErrorMessagePA = "City/State Combination is not valid. Try Again";
                                //this.switchNgBTab('cityStateTabId');

                                //$('#cityStateTabId').tab('show');
                            }
                            else {
                                this.zipCodeDataPA = arrState;
                                //this.switchNgBTab('zipCodeTabId');

                                //$('#zipCodeTabId').tab('show');
                            }


                        }
                    }
                )
        }

    }

    BindAllCategory() {
        this.listpropertiesService
            .BindAllCategories()
            .subscribe(
                data => {

                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");
                        var cartd = [];

                        var thisStatus = this;
                        var val = "";
                        var label = "";
                        $.each(docs, function (i, docs) {
                            if (i == 0) {
                                val = $(docs).find("ID").text();
                                label = $(docs).find("categoryName").text();
                                //thisStatus.startValueZip= { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                            }
                            cartd.push({ "value": $(docs).find("ID").text(), "label": $(docs).find("categoryName").text().substr(4) });
                        });
                        this.categorySearchData = cartd;
                    }
                });
    }

    BindCategory(jobCat) {

        this.listpropertiesService
            .AssociatePurchasedCategory(jobCat)
            .subscribe(
                data => {

                    debugger;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssociateCategories");
                        var arrCat = [];

                        //var thisStatus = this;
                        //var val = "";
                        //var label = "";
                        //$.each(docs, function (i, docs) {
                        //    //if ( $(docs).find("zipcode").text() == thisStatus.searchForm.get('zipCode').value ) {
                        //    if (i == 0) {
                        //        val = $(docs).find("zipcode").text();
                        //        label = $(docs).find("zipcode").text();
                        //        thisStatus.startValueCategory = { "value": $(docs).find("zipcode").text(), "label": $(docs).find("zipcode").text() };
                        //    }

                        //    arrCat.push({ "value": $(docs).find("ID").text(), "label": $(docs).find("CategoryName").text() });
                        //});
                        //this.CategoryData = arrCat;

                    }
                });

    }

    BindassociateSubCategory() {

        debugger;
        let value = this.categorySearchForm.get('categorySearch').value != null ? this.categorySearchForm.get('categorySearch').value.value : null;
        if (value != null) {
            this.listpropertiesService
                .BindAssociateCategory(value)
                .subscribe(
                    data => {
                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("associateCategories");
                            var cartd = [];

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
                            this.subCategorySearchData = cartd;

                        }
                    });
        }

    }

    CountAssociateCategory() {
        this.listpropertiesService
            .CountPurchasedCategories()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAds");
                        let thisStatus = this;
                        $.each(docs, function (i, docs) {
                            thisStatus.TotalCountOfItemsPurchased = parseInt($(docs).find("Total").text());

                            // $("#lblPurchaseCategories").text($(docs).find("Total").text());
                        });
                    }
                });
    }

    submitPostForm() {
        this.isSubmittingPA = true;
        if (this.PostAdvertisement.valid) {
            $("#pageloader").css("display", "block");
            this.PostAds();
        }
        else {
            this.formErrorMessagePA = "Please make sure, you entered correct data.";
            this.logValidationErrors(this.cardForm);
            this.isSubmitting = false;
        }
    }

    updatePostForm() {
        this.Updated();
    }

    resetPostForm() {
        this.ClearText();
    }

    changeCityPA() {
        this.BindCityWiseStatesPA(this.PostAdvertisement.get('city').value);
    }

    changeStatePA() {

        var state = this.PostAdvertisement.get('statePA').value != null ? this.PostAdvertisement.get('statePA').value.value : null;
        var city = this.PostAdvertisement.get('cityPA').value;
        this.BindStateWiseZipCodeForSearch(state, city);
    }

    changeZipCodePA() {

        var zipCodeVal = this.PostAdvertisement.get('zipCodePA').value ? this.PostAdvertisement.get('zipCodePA').value.value : null;
        var subCategory = this.PostAdvertisement.get('subCat').value ? this.PostAdvertisement.get('subCat').value.value : null;


        if (zipCodeVal == null) {
            $("#lblsegmentsMessage").css("display", "block");
            $("#lblsegmentsMessage").text("SELECT YOUR DESIRED CONSUMER SEGMENT(S)");
        }
        else {
            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");

            this.listpropertiesService
                .GetPostAdvertisementPrice(zipCodeVal, subCategory)
                .subscribe(
                    data => {
                        if (data.d.length > 0) {
                            var xmlDoc = $.parseXML(data.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("GetPricePostAdvts");
                            var thisStatus = this;
                            $.each(docs, function (i, docs) {

                                thisStatus.PostAdvertisement.get('lblzipCodeprice').setValue($(docs).find("price").text());

                                //$('#btnSubmit').css("background-color", "rgb(33, 150, 243)");
                                //this.IsP
                                //$('#btnSubmit').prop('disabled', false);
                            });
                        }
                    });
        }
    }


    changeCategorySearch() {

        this.BindassociateSubCategory();
    }

    changeSubCategorySearch() {

        var catID = this.categorySearchForm.get('categorySearch').value != null ? this.categorySearchForm.get('categorySearch').value.value : null;
        if (catID != null) {
            $("#divSelectedChce").css("display", "block");
            this.PurchaseSalesCategory();
            $("#ViewAllPurchasedRcd").css("visibility", "visible");
            $("#Shop").show();
            this.BindMembership();
            $('#MemberShip').val('1');
        }

    }

    changeConsumerSegmentType(type) {
        var flg = 0;
        if (type == 'Home') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");

            $("#subCatHome").addClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatLand").removeClass("active");
            this.PostAdvertisement.get('subCat').setValue('Home');

            $('#SubCategory option').each(function () {
                if ($(this).val() == 1) {
                    flg = 1;
                    return false;
                }
                else {
                    flg = 0;
                }
            });

            if (flg == 0) {
                this.arrayCategories.push(1);
                var _select = $('<select>');
                _select.append($('<option></option>').val(1).html("Home"));
                $('#SubCategory').append(_select.html());
            }
        }
        else if (type == 'Town') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");

            $("#subCatTownHome").addClass("active");
            $("#subCatHome").removeClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatLand").removeClass("active");
            this.PostAdvertisement.get('subCat').setValue('TownHome');

            var flg = 0;
            $('#SubCategory option').each(function () {
                if ($(this).val() == 2) {
                    flg = -1;
                    return false;
                }
                else {
                    flg = 0;
                }


            });
            if (flg == 0) {
                this.arrayCategories.push(2);
                var _select = $('<select>');
                _select.append($('<option></option>').val(2).html("TownHome"));
                $('#SubCategory').append(_select.html());
            }
        }
        else if (type == 'Family') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");
            $("#subCatMultiFamily").addClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatHome").removeClass("active");
            $("#subCatLand").removeClass("active");

            this.PostAdvertisement.get('subCat').setValue('MultiFamily');

            var flg = 0;
            $('#SubCategory option').each(function () {
                if ($(this).val() == 3) {
                    flg = 1;
                    return false;
                }
                else {
                    flg = 0;
                }
            });
            if (flg == 0) {
                this.arrayCategories.push(3);
                var _select = $('<select>');
                _select.append($('<option></option>').val(3).html("MultiFamily"));
                $('#SubCategory').append(_select.html());
            }
        }
        else if (type == 'Land') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");
            $("#subCatLand").addClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatHome").removeClass("active");

            this.PostAdvertisement.get('subCat').setValue('Land');

            var flg = 0;
            $('#SubCategory option').each(function () {
                if ($(this).val() == 4) {
                    flg = 1;
                    return false;
                }
                else {
                    flg = 0;
                }
            });
            if (flg == 0) {
                this.arrayCategories.push(4);
                var _select = $('<select>');
                _select.append($('<option></option>').val(4).html("Land"));
                $('#SubCategory').append(_select.html());
            }
        }
    }

    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
        });
    }

    Valid1() {
        var returnValue = '';
        if (this.PostAdvertisement.get("countryPA").value == '0') {
            returnValue += "," + 1 + ",";
        }
        if (this.PostAdvertisement.get("StatePA").value.value == '0') {
            returnValue += "," + 2 + ",";
        }
        if (this.PostAdvertisement.get("cityPA").value == '0') {
            returnValue += "," + 3 + ",";
        }
        if (this.PostAdvertisement.get("titlePA").value == "") {
            returnValue += "," + 4 + ",";
        }
        if (this.PostAdvertisement.get("contactNoPA").value == "") {
            returnValue += "," + 6 + ",";
        }
        if (this.PostAdvertisement.get("stAddressPA").value == "") {
            returnValue += "," + 7 + ",";
        }
        if (this.PostAdvertisement.get("zipCodePA").value.value == '0') {
            returnValue += "," + 8 + ",";
        }
        if (this.PostAdvertisement.get("pricePA").value == "") {
            returnValue += "," + 9 + ",";
        }
        if ($("#SubCategory").val() == null) {
            returnValue += "," + 10 + ",";
        }
        if (this.PostAdvertisement.get("#pricePA").value <= '0') {
            returnValue += "," + 11 + ",";
        }
        return returnValue;
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

    /**************************************************************
    * ********************* Credit Card Code ********************
    * ************************************************************/

    initializeEventAndControls() {

        this.startValueZip = '';
        this.selectedZip = '';

        this.startValueState = '';
        this.selectedState = '';


        this.startValueZipCodePA = '';
        this.selectedZipCodePA = '';

        this.startValueStatePA = '';
        this.selectedStatePA = '';

    }

    handleChange(event): void {
        console.log('changed value is ' + event.data[0].id);
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

    editForm() {
        this.isCreditCardFormVisible = true;
    }

    cancelForm() {
        debugger;
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

const data = [
    {
        srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
        srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
        srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    },
    {
        srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    }
];

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

/**
    * Use custom gallery config with the lightbox
    */
    //withCustomGalleryConfig() {

    //    // 2. Get a lightbox gallery ref
    //    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    //    // (Optional) Set custom gallery config to this lightbox
    //    lightboxGalleryRef.setConfig({
    //        imageSize: ImageSize.Cover,
    //        thumbPosition: ThumbnailsPosition.Top
    //    });

    //    // 3. Load the items into the lightbox
    //    lightboxGalleryRef.load(this.items);
    //}