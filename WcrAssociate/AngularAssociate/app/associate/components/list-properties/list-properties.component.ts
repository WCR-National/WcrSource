import { Component, OnInit, ViewChild, Input, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { LightboxModule, LightboxEvent, Lightbox, IAlbum } from 'ngx-lightbox';

import { ValidationErrors, AbstractControl, ValidatorFn, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ListPropertiesService } from 'AngularAssociate/app/services/associate/list-properties.service';
import { PurchaseZipCodeService } from 'AngularAssociate/app/services/associate/purchase-zipcode.service';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // add this 1 of 4
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { debounce } from 'rxjs/operators';


@Component({
    selector: 'list-properties',
    templateUrl: './list-properties.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPropertiesComponent implements OnInit {

    PostAdvertisement: FormGroup;
    categorySearchForm: FormGroup;
    editor = ClassicEditor;
    private _albums: Array<IAlbum> = [];


    isSubmitting: boolean = false;
    isCreditCardFormVisible: boolean = false;

    salesCount: string = '';
    servicesCount: string = '';
    TotalCount: string = '';
    showSuccessMessage: string = '';
    isAddButtonPA: boolean = true;
    isPostButtonGreen: boolean = true;
    config = {
        height: 188,
        removeButtons: 'Image',

    }
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
        },
        'image': {
            'required': 'Images are required'
        },
        'subCat': {
            'required': 'Desired Segment selection is required'
        },
    }

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
        'zipCodePA': '',
        'image': '',
        'subCat': ''
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

    public isDesiredConsumerSegmentVisible: boolean = false;
    public isConsumerSegmentAdvertisementVisible: boolean = false;
    public isUploadImageVisible: boolean = false;
    public isOverviewAndAdditionalVisible: boolean = false;
    public isLocationAndAddressVisible: boolean = false;
    public sts1 = 0;
    public g_i = 0;


    public isSubmittingPA: boolean = false;
    public isResetButtonVisible: boolean = false;


    public totalCountOfPostAdvertisement = null;
    public uploadedAdvertisementImages = '';
    public showLoadingIconOnEditClick: boolean = false;
    public isEditForm: boolean = false;


    public monthlyBllingDate: string = "";
    public totalCountOfItemsPurchased = 0;
    public totalAmount = 0;

    public labelPrice = 0.0;
    public labelCategoryPrice = 0.0;


    public nextBillingCycleStartSA = null;
    public totalCountOfPostAdvertisementSA = 0;
    public totalAmountSA = 0;

    public dTableSA: any = null;
    public dTableAPZC: any = null;

    public isCollapsedOpenImages = true;
    public isCollapsedOverviewAndAdditionalFeatures = true;
    public isCollapsedLocation = true;
    public isFirstTimePageBind = true;
    public isFirstTimePageBindEdit = true;
    public isTableCurrentPurchasedZipCodesLoadedFirstTime = true;
    public isTableSelectedChoicesFirstTime = true;
    public isTablePurchasedZipCodesLoaded = true;
    public isTableSalesAdvertisementLoadedFirstTime = true;

    @ViewChild('FileUpload1') fileUpload1: ElementRef;
    @ViewChild('FileUpload2') fileUpload2: ElementRef;
    @ViewChild('FileUpload3') fileUpload3: ElementRef;
    @ViewChild('FileUpload4') fileUpload4: ElementRef;


    public data = "";

    constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private paymentService: PaymentService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, private listpropertiesService: ListPropertiesService, private purchaseZipCodeService: PurchaseZipCodeService, private modalService: NgbModal,
        private ngZone: NgZone, private _lightboxEvent: Lightbox, private toaster: Toaster) {

    }

    ngOnInit() {



        this.setValidationOnForm();

        this.BindStatePA();

        this.AssociateAlreadyCategories();

        this.BindAllCategory();

        this.CountAssociateCategory();

        if ((new Date()).getMonth() == 11) {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear() + 1, 0, 1)).format('yyyy-MM-DD');
        }
        else {
            this.monthlyBllingDate = moment(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 1)).format('yyyy-MM-DD');
        }

        this.nextBillingCycleStartSA = this.monthlyBllingDate;

        this.PostAdvertisement.get('countryPA').setValue('US');

        this.GetMobileNo();

        this.InitializrEventsAndControlsPA();

        this.ViewAllSalesAdvertisement();


        


    }

    InitializrEventsAndControlsPA() {
        var thisStatus = this;
        $('#SubCategory').change(function () {

            thisStatus.isUploadImageVisible = true;
            //thisStatus.isOverviewAndAdditionalVisible = false;
            //thisStatus.isLocationAndAddressVisible = false;
        });


    }

    setValidationOnForm() {

        this.PostAdvertisement = this.fb.group({
            consumerSegmentType: [''],
            titlePA: ['', [Validators.required, patternValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            pricePA: ['', [Validators.required, patternValidator(/^\d+$/, { Numeric: true })]],
            descPA: ['', [Validators.required, patternValidator(/^[a-zA-Z0-9\-\s]+$/, { letterOnly: true })]],
            additionalFeature: ['', [Validators.required]],
            contactNoPA: ['', [Validators.required, phoneValidator(/\d{11}/, { elevenDigits: true })]],
            stAddressPA: ['', [Validators.required, StateValidator(/^[a-zA-Z0-9\-\s]+$/, { alphaNumericWithSpace: true })]],
            cityPA: ['', [Validators.required, StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            statePA: ['', [Validators.required]],
            countryPA: ['', [Validators.required, StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            subCat: ['', [Validators.required]],
            zipCodePA: ['', [Validators.required]],
            advId: [''],
            lblzipCodeprice: [''],
            image: ['', [Validators.required]]
        });

        this.categorySearchForm = this.fb.group({
            categorySearch: [''],
            subCategorySearch: ['']
        });

        this.PostAdvertisement.valueChanges.subscribe((data) => {
            var status = false;
            for (var i = 0; i < this.arrayOfImages.length; i++)
            {
                if (this.arrayOfImages[i].previewUrl != '')
                {
                    status = true;
                }
            }
            if (status) {
                this.PostAdvertisement.get('image').patchValue(this.arrayOfImages.toString(), { emitEvent: false });
            }
            else {
                this.PostAdvertisement.get('image').patchValue('', { emitEvent: false });
            }
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

            var mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.showToast("Warning", "Only images are supported.");
                return;
            }
            var imageExist = false;

            for (var i = 0; i < this.arrayOfImages.length; i++) {
                if (this.arrayOfImages[i] !== undefined && this.arrayOfImages[i].imageIndex == imageIndex) {
                    this.g_i = i;

                    var reader1 = new FileReader();
                    reader1.readAsDataURL(event.target.files[0]); // read file as data url
                    reader1.onload = (e: any) => { // called once readAsDataURL is completed
                        this.resetImages(e, imageIndex);
                    }
                    imageExist = true;
                    debugger;
                }
            }

            if (!imageExist) {
                var reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]); // read file as data url

                reader.onload = (e1: any) => { // called once readAsDataURL is completed
                    this.resetImageFirstTime(e1, imageIndex);
                }
                debugger;
            }


        }
    }

    resetImageFirstTime(e1, imageIndex) {
        debugger;
        var l_imageUrlFT = e1.target.result;
        let imageObject = { 'srcUrl': l_imageUrlFT, 'previewUrl': l_imageUrlFT, 'imageIndex': imageIndex , 'isDeleted' : '' };
        for (var ii = 0; ii < (parseInt(imageIndex) + 1); ii++)
        {

            if (ii == imageIndex) {
                if (this.arrayOfImages[ii] !== undefined && this.arrayOfImages[ii].imageIndex == imageIndex) {
                    this.arrayOfImages[this.g_i].srcUrl = l_imageUrlFT;
                    this.arrayOfImages[this.g_i].previewUrl = l_imageUrlFT;
                }
                else {
                    this.arrayOfImages.push(imageObject);
                }
            }
            else {
                if (this.arrayOfImages[ii] === undefined)
                {
                    this.arrayOfImages.push({ 'srcUrl': '', 'previewUrl': '', 'imageIndex': ii });
                }
            }
        }
        

        $('#previewImages').html('');
        var images = '';
        for (let i = 0; i < this.arrayOfImages.length; i++) {



            //images += "<div class='col-12 col-xs-12 col-sm-3'><img class='img-responsive ht-150' src='" + this.arrayOfImages[i].srcUrl + "' openImage('" + this.arrayOfImages[i].imageIndex + "') ></div>";
            images += "<div class='col-12 col-xs-12 col-sm-3'>";
            images += "<div id='wrapperImage" + i + "Id' class='wrapper_image'>"
            if (this.arrayOfImages[i].previewUrl != '') {
                
                images += "<img class='img-responsive ht-150' src='" + this.arrayOfImages[i].srcUrl + "' openImage('" + this.arrayOfImages[i].imageIndex + "') >";
                images += "<span id='image" + i + "Id' class='close_image'></span>";
               
            }
            images += "</div>";
            images += "</div>";


        }
        $('#previewImages').html(images);

        this.PostAdvertisement.get('image').setValue(this.arrayOfImages.toString());
        //if (this.isFirstTimePageBind) {

        this.closeImageClick();
        this.isFirstTimePageBind = false;
        //}
        //this.fileUpload1.nativeElement.value = "";
        this.cdr.detectChanges();
    }

    resetImages(e, imageIndex) {
        debugger;
        var l_imageUrl = e.target.result;
        this.arrayOfImages[this.g_i].srcUrl = '';
        this.arrayOfImages[this.g_i].previewUrl = '';
        this.arrayOfImages[this.g_i].srcUrl = l_imageUrl;
        this.arrayOfImages[this.g_i].previewUrl = l_imageUrl;
        this.arrayOfImages[this.g_i].isDeleted = '';

        

        $('#previewImages').html('');
        var images = '';
        for (let i = 0; i < this.arrayOfImages.length; i++) {

            images += "<div class='col-12 col-xs-12 col-sm-3'>";
            images += "<div id='wrapperImage" + i + "Id' class='wrapper_image'>"
            if (this.arrayOfImages[i].previewUrl != '') {
                
                images += "<img class='img-responsive ht-150' src='" + this.arrayOfImages[i].previewUrl + "' openImage('" + this.arrayOfImages[i].imageIndex + "') >";
                images += "<span id='image" + i + "Id' class='close_image'></span>";
                
            }
            images += "</div>";
            images += "</div>";

        }
        $('#previewImages').html(images);

        this.PostAdvertisement.get('image').setValue(this.arrayOfImages.toString());
        //if (this.isFirstTimePageBind) {

        this.closeImageClick();
        this.isFirstTimePageBind = false;
        //}
        //this.fileUpload1.nativeElement.value = "";

        this.cdr.detectChanges();
    }

    closeImageClick() {
        var thisStatus = this;
        $('.close_image').click(function () {

            var id = $(this).attr('id');
            if (id == "image0Id") {
                thisStatus.arrayOfImages[0].imageUrl = '';
                thisStatus.arrayOfImages[0].previewUrl = '';
                thisStatus.arrayOfImages[0].isDeleted = 'Deleted';

                
                $('#wrapperImage0Id').empty();
            }
            else if (id == "image1Id") {
                thisStatus.arrayOfImages[1].imageUrl = '';
                thisStatus.arrayOfImages[1].previewUrl = '';
                thisStatus.arrayOfImages[1].isDeleted = 'Deleted';

                $('#wrapperImage1Id').empty();
            }
            else if (id == "image2Id") {
                thisStatus.arrayOfImages[2].imageUrl = '';
                thisStatus.arrayOfImages[2].previewUrl = '';
                thisStatus.arrayOfImages[2].isDeleted = 'Deleted';

                $('#wrapperImage2Id').empty();
            }
            else if (id == "image3Id") {
                thisStatus.arrayOfImages[3].imageUrl = '';
                thisStatus.arrayOfImages[3].previewUrl = '';
                thisStatus.arrayOfImages[3].isDeleted = 'Deleted';

                $('#wrapperImage3Id').empty();
            }
        });
        this.cdr.detectChanges();
    }

    reset(fileUploadId) {
        debugger;
        if (fileUploadId == '1') {
            console.log(this.fileUpload1.nativeElement.files);
            this.fileUpload1.nativeElement.value = "";
            console.log(this.fileUpload1.nativeElement.files);
        }
    }

    showImagesUsingFAncyBox(p_arrayOImages) {
        debugger;
        //$('#previewImages').fadeOut('');


        //const src = p_arrayOImages[i].srcUrl;
        //const caption = p_arrayOImages[i].srcUrl;
        //const thumb = p_arrayOImages[i].previewUrl
        //const album = {
        //    src: src,
        //    caption: caption,
        //    thumb: thumb
        //};
        //this._albums.push(album);
        //openImage(imageIndex)
        //{

        //    openImage
        //}

        // 1. Create gallery items
        //this.items = data.map(item =>
        //    new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
        //);

        //// Load items into the lightbox
        //this.gallery.ref().load(this.items);
        //this._albums.push({
        //    src: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        //    thumb: 'https://preview.ibb.co/mwsA6R/img7.jpg'
        //});


    }

    open(index: number): void {
        // open lightbox
        this._lightboxEvent.open(this._albums, index);
    }

    close(): void {
        // close lightbox programmatically
        this._lightboxEvent.close();
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
        debugger;
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
                debugger;
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
                                                        this.isSubmittingPA = false;

                                                        //$('#fail_message').modal('show');
                                                    }
                                                    if (subData.d == "3") {
                                                        this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                                                        this.isSubmittingPA = false;
                                                    }

                                                });

                                                if (data.d == "0") {
                                                    this.showToast('danger', "Failure, Already. Try Again!!!");
                                                    this.isSubmittingPA = false;

                                                }
                                                if (data.d == "3") {
                                                    this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                                                    this.isSubmittingPA = false;

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
                        var docs = xml.find("MyCategories");

                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson: any = [];
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet != null) {
                            if (!Array.isArray(dataJson.NewDataSet.MyCategories)) {
                                resultJson.push(dataJson.NewDataSet.MyCategories);
                                dataJson.NewDataSet.MyCategories = resultJson;
                            }
                            this.InitializedDataTableCurrentPurchasedZipCodes(dataJson.NewDataSet.MyCategories);
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
        $('#ViewAllCategoriesPurchased').DataTable().clear().destroy();

        let dTable: any = $('#ViewAllCategoriesPurchased');
        let thisStatus: any = this;

        if (asyncData === undefined) {
            asyncData = {
                'id': '',
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
                    defaultContent: '<a href="" class="editor_remove cancel tx-danger tx-700">Cancel</a>'
                },
                {
                    data: 'zipcode',
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
        if (this.isTableCurrentPurchasedZipCodesLoadedFirstTime) {
            $('#ViewAllCategoriesPurchased').on('click', 'a.cancel', function (e) {
                e.preventDefault();
                debugger;
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());
                dTable.api().row($(this).parents('tr')).remove().draw(false);


                thisStatus
                    .purchaseZipCodeService
                    .PermananetlyRemoveCategory($(this).closest('tr').children('td:first').text())
                    .subscribe(
                        data => {
                            //thisStatus.getClientDetailsServicesData();
                            //thisStatus.getServicesCount();
                            //thisStatus.getTotalSalesAndServicesCount();
                        });
            });
            this.isTableCurrentPurchasedZipCodesLoadedFirstTime = false;
        }
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

                        if (dataJson.NewDataSet.Table1 != null) {
                            if (!Array.isArray(dataJson.NewDataSet.Table1)) {
                                resultJson.push(dataJson.NewDataSet.Table1);
                                dataJson.NewDataSet.Table1 = resultJson;
                            }
                            this.InitializedDataTableSelectedChoices(dataJson.NewDataSet.Table1);
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
                        this.totalAmountSA = totalAmount1;
                        this.totalAmount = totalAmount1;
                        this.cdr.detectChanges();
                    }
                }
            );
    } //BindData  //GetAllRecords

    InitializedDataTableSelectedChoices(asyncData) {
        console.log(asyncData);
        $('#ViewRcd').DataTable().clear().destroy();

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

        if (this.isTableSelectedChoicesFirstTime) {

            $('#ViewRcd').on('click', 'a.purchase', function (e) {
                e.preventDefault();
                debugger;
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());

                var row = dTable.fnGetPosition($(this).closest('tr')[0]);
                var rowData = dTable.fnGetData(row);
                //var rowColumns = rowData[rowData.length - 1];

                var id = rowData['id'];
                var CategoryName = rowData['CategoryName'];
                var SubCategoryName = rowData['SubCategoryName'];
                var Price = rowData['Price'];
                var Zipcode = rowData['Zipcode'];
                var subCategoryID = rowData['subCategoryID'];
                var CategoryID = rowData['CategoryID'];

                thisStatus.ngZone.run(() => {
                    thisStatus.PurchaseRcd(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id);
                });
            });
            $('#ViewRcd').on('click', 'a.cancel', function (e) {
                e.preventDefault();
                debugger;
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());


                var row = dTable.fnGetPosition($(this).closest('tr')[0]);
                var rowData = dTable.fnGetData(row);
                //var rowColumns = rowData[rowData.length - 1];

                var id = rowData['id'];
                var SubCategoryName = rowData['SubCategoryName'];
                var subCategoryID = rowData['subCategoryID'];
                thisStatus.ngZone.run(() => {
                    thisStatus.CancelRecord(subCategoryID, SubCategoryName, id);
                });
            });
            this.isTableSelectedChoicesFirstTime = false;
        }
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

                        if (dataJson.NewDataSet.Table1 != null) {
                            if (!Array.isArray(dataJson.NewDataSet.Table1)) {
                                resultJson.push(dataJson.NewDataSet.Table1);
                                dataJson.NewDataSet.Table1 = resultJson;
                            }
                            this.InitializedDataTablePurchasedZipCodes(dataJson.NewDataSet.Table1);
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
        $('#viewAllPurchasedZipCodes').DataTable().clear().destroy();

        this.dTableAPZC = $('#viewAllPurchasedZipCodes');
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
                    defaultContent: '<a href="" class="editor_remove cancel tx-danger tx-700">Cancel</a>'
                },
                {
                    data: 'zipcode',
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
        if (this.isTablePurchasedZipCodesLoaded) {
            $('#viewAllPurchasedZipCodes').on('click', 'a.cancel', function (e) {
                e.preventDefault();
                debugger;
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());

                ////get the real row index, even if the table is sorted 
                //var index = dTable.fnGetPosition(tr[0]);
                ////alert the content of the hidden first column 
                //console.log(dTable.fnGetData(index)[0]);

                thisStatus.dTableAPZC.api().row($(this).parents('tr')).remove().draw(false);

                thisStatus.RemoveRcd1($(this).closest('tr').children('td:first').text());
            });
            this.isTablePurchasedZipCodesLoaded = false;
        }
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

    RemoveTablePZC() {
        if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {

            this.dTableAPZC.DataTable().clear().destroy();
            this.dTableAPZC.off('click');
        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    }


    ViewAllSalesAdvertisement() { //BindData  

        debugger;
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
                        if (dataJson.NewDataSet != null) {
                            if (dataJson.NewDataSet.ViewAdvertisment != null) {
                                if (!Array.isArray(dataJson.NewDataSet.ViewAdvertisment)) {
                                    resultJson.push(dataJson.NewDataSet.ViewAdvertisment);
                                    dataJson.NewDataSet.ViewAdvertisment = resultJson;
                                }
                                this.InitializedDataTableSalesAdvertisement(dataJson.NewDataSet.ViewAdvertisment);
                            }
                            else {
                                this.InitializedDataTableSalesAdvertisement(undefined);
                            }

                            var cc = 0;
                            var count = 0;
                            var totalAmount1 = 0;
                            $.each(docs, function (i, docs) {
                                var a = $(docs).find("amount").text();
                                totalAmount1 = totalAmount1 + parseInt(a);
                                count++;
                            });
                            this.totalCountOfPostAdvertisementSA = count;
                            var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalAmount1 + "</b></td><td></td></tr>";
                        }
                        else {
                            this.InitializedDataTableSalesAdvertisement(undefined);
                        }
                        this.cdr.detectChanges();
                    }
                }
            );
    }

    InitializedDataTableSalesAdvertisement(asyncData) {
        console.log(asyncData);
        $('#salesAdvertisement').DataTable().clear().destroy();
        this.dTableSA = $('#salesAdvertisement');
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
        this.dTableSA.dataTable({
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
                    data: "ZipCode",
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
                    defaultContent: '<a href="javascript:void(0)" class="edit tx-info tx-700" style="color:#090bfc;">Edit</a>'
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="javascript:void(0)" class="remove tx-danger tx-700">Delete</a>'
                },
            ],
            columnDefs: [
                {
                    targets: [1],
                    render: function (data) {
                        debugger;
                        return '<img class="ht-100" src="../../../../Associate/Adv_img/' + data + '">'
                    }
                },
                {
                    targets: [6],
                    className: "hide_column"
                }
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
            thisStatus.ngZone.run(() => {
                thisStatus.EditRecords($(this).closest('tr').children('td:first').text());
            });
        });

        $('#salesAdvertisement').on('click', 'a.remove', function (e) {
            e.preventDefault();
            debugger;
            if (confirm("Are you sure?")) {
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());

                thisStatus.dTableSA.api().row($(this).parents('tr')).remove().draw(false);
                thisStatus.ngZone.run(() => {

                    thisStatus.DeleteRecords($(this).closest('tr').children('td:first').text());
                });
            }
        });

        if (this.isTableSalesAdvertisementLoadedFirstTime)
        {
            

            this.isTableSalesAdvertisementLoadedFirstTime = false;

        }

    }

    RemoveTableSalesAdvertisement() {
        if (this.dTableSA !== undefined && this.dTableSA != null) {

            this.dTableSA.DataTable().clear().destroy();
            this.dTableSA.off('click');
        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    }

    DeleteRecords(advId) {
       
            var msg = [];

            this.listpropertiesService
                .DeleteDataFromAdvertisement(parseInt(advId))
                .subscribe(
                    data => {

                        if (data.d == "-1") {
                            this.showToast('danger', "Failure, Already Exist!!!");
                            this.isSubmittingPA = false;

                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                            this.isSubmittingPA = false;

                        }
                        else if (data.d = "1") {
                            this.showToast('success', "Success, Deleted Succesfully.");

                            this.isPostAdvertisementFormVisible = false;
                        }
                    });
        //}
    }

    EditRecords(advId) {

        debugger;
        this.isEditForm = true;
        this.isResetButtonVisible = true;
        this.isDisabledPABtn = true;
        this.isAddButtonPA = false;
        this.showLoadingIconOnEditClick = true;
        this.isResetButtonVisible = false;
        this.onclickUpdatePurchase();


        this.listpropertiesService
            .GetAdvertisementDetails(parseInt(advId))
            .subscribe(
                data => {
                    debugger;
                    if (data.d.length > 0) {

                        $('html, body').animate({ scrollTop: $('#loadingIconId').offset().top }, 'slow');
                        $('#previewImages').html('');

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("FullDetailsAdvertisments");
                        var thisStatus = this;
                        $.each(docs, function (i, docs) {
                            thisStatus.PostAdvertisement.get('advId').setValue($(docs).find("advertisementID").text());

                            var catValue = $(docs).find("subcategoryID").text();
                            if (catValue == '1') {

                                $("#subCatTownHome").removeClass("active");
                                $("#subCatHome").addClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                $("#subCatLand").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(1).html("Home"));
                                $('#SubCategory').append(_select.html());
                                thisStatus.PostAdvertisement.get('subCat').setValue('Home');

                            }
                            else if (catValue == '2') {

                                $("#subCatTownHome").addClass("active");
                                $("#subCatHome").removeClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                $("#subCatLand").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(2).html("TownHome"));
                                $('#SubCategory').append(_select.html());
                                thisStatus.PostAdvertisement.get('subCat').setValue('TownHome');

                            }
                            else if (catValue == '3') {
                                $("#subCatMultiFamily").addClass("active");
                                $("#subCatTownHome").removeClass("active");
                                $("#subCatHome").removeClass("active");
                                $("#subCatLand").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(3).html("Multi-Family"));
                                $('#SubCategory').append(_select.html());
                                thisStatus.PostAdvertisement.get('subCat').setValue('Multi-Family');

                            }
                            else if (catValue == '4') {
                                $("#subCatLand").addClass("active");
                                $("#subCatMultiFamily").removeClass("active");
                                $("#subCatTownHome").removeClass("active");
                                $("#subCatHome").removeClass("active");

                                var _select = $('<select>');
                                _select.append($('<option></option>').val(4).html("Land"));
                                $('#SubCategory').append(_select.html());
                                thisStatus.PostAdvertisement.get('subCat').setValue('Land');

                            }
                            debugger;
                            //CKEDITOR.instances.txtFeatures.setData($(docs).find("additionalFeature").text());
                            var images = '';
                            thisStatus.arrayOfImages = [];
                            if (($(docs).find("advMainImage").text()) !== undefined && ($(docs).find("advMainImage").text()) != null && ($(docs).find("advMainImage").text()) != "") {

                                thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advMainImage").text();
                                let imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '0' , isDeleted : '' };
                                thisStatus.arrayOfImages.push(imageObject);

                                //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' + $(docs).find("advMainImage").text() + '/></div>';


                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage0Id' class='wrapper_image'>"
                                images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/" + $(docs).find("advMainImage").text() + "'>";
                                images += "<span id='image0Id' class='close_image'></span>";
                                images += "</div>";
                                images += "</div>";
                            }
                            else {
                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage0Id' class='wrapper_image'>"
                               
                                images += "</div>";
                                images += "</div>";
                                let imageObject = { 'srcUrl': '', 'previewUrl': '', 'imageIndex': '0', isDeleted: '' };
                                thisStatus.arrayOfImages.push(imageObject);
                            }
                            if (($(docs).find("advImage1").text()) !== undefined && ($(docs).find("advImage1").text()) != null && ($(docs).find("advImage1").text()) != "") {

                                thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advImage1").text();
                                let imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '1', isDeleted: '' };
                                thisStatus.arrayOfImages.push(imageObject);

                                //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' + $(docs).find("advImage1").text() + '/></div>';
                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage1Id' class='wrapper_image'>"
                                images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/" + $(docs).find("advImage1").text() + "'>";
                                images += "<span id='image1Id'  class='close_image'></span>";
                                images += "</div>";
                                images += "</div>";

                            }
                            else {
                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage1Id' class='wrapper_image'>"
                               
                                images += "</div>";
                                images += "</div>";
                                let imageObject = { 'srcUrl': '', 'previewUrl': '', 'imageIndex': '1', isDeleted: '' };
                                thisStatus.arrayOfImages.push(imageObject);
                            }
                            if (($(docs).find("advImage2").text()) !== undefined && ($(docs).find("advImage2").text()) != null && ($(docs).find("advImage2").text()) != "") {
                                thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advImage2").text();
                                let imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '2', isDeleted: '' };
                                thisStatus.arrayOfImages.push(imageObject);
                                //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' +  + '/></div>';
                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage2Id' class='wrapper_image'>"
                                images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/" + $(docs).find("advImage2").text() + "'>";
                                images += "<span id='image2Id' class='close_image'></span>";
                                images += "</div>";
                                images += "</div>";
                            }
                            else {
                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage2Id' class='wrapper_image'>"
                                images += "</div>";
                                images += "</div>";
                                let imageObject = { 'srcUrl': '', 'previewUrl': '', 'imageIndex': '2', isDeleted: ''};
                                thisStatus.arrayOfImages.push(imageObject);
                            }
                            if (($(docs).find("advImage3").text()) !== undefined && ($(docs).find("advImage3").text()) != null && ($(docs).find("advImage3").text()) != "") {
                                thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advImage3").text();
                                let imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '3', isDeleted: '' };
                                thisStatus.arrayOfImages.push(imageObject);
                                //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' + $(docs).find("advImage3").text() + '/></div>';

                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage3Id' class='wrapper_image'>"
                                images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/" + $(docs).find("advImage3").text() + "'>";
                                images += "<span id='image3Id' class='close_image'></span>";
                                images += "</div>";
                                images += "</div>";
                            }
                            else {
                                images += "<div class='col-12 col-xs-12 col-sm-3'>";
                                images += "<div id='wrapperImage3Id' class='wrapper_image'>"
                               
                                images += "</div>";
                                images += "</div>";
                                let imageObject = { 'srcUrl': '', 'previewUrl': '', 'imageIndex': '3', isDeleted: '' };
                                thisStatus.arrayOfImages.push(imageObject);
                            }
                            $('#previewImages').html(images);
                            //thisStatus.uploadedAdvertisementImages = images;


                            //$("#SubCategory").val($(docs).find("subcategoryID").text());
                            thisStatus.PostAdvertisement.get('titlePA').setValue($(docs).find("title").text());
                            thisStatus.PostAdvertisement.get('additionalFeature').setValue($(docs).find("features").text());

                            thisStatus.PostAdvertisement.get('stAddressPA').setValue($(docs).find("address").text());
                            thisStatus.PostAdvertisement.get('contactNoPA').setValue($(docs).find("contactNo").text());
                            thisStatus.PostAdvertisement.get('descPA').setValue($(docs).find("description").text());
                            thisStatus.PostAdvertisement.get('pricePA').setValue($(docs).find("cost").text());
                            thisStatus.PostAdvertisement.get('countryPA').setValue($(docs).find("CountryID").text());
                            thisStatus.PostAdvertisement.get('cityPA').setValue($(docs).find("CityID").text());
                            thisStatus.startValueStatePA = { "value": $(docs).find("StateID").text(), "label": $(docs).find("StateID").text() };
                            thisStatus.BindStateWiseZipCodeForSearch($(docs).find("StateID").text(), $(docs).find("CityID").text(), $(docs).find("ZipCode").text());
                            if (images !== undefined || images != '') {
                               // if (thisStatus.isFirstTimePageBindEdit) {
                                    $('.close_image').click(function () {
                                        debugger;
                                        var id = $(this).attr('id');
                                        if (id == "image0Id") {
                                            $('#wrapperImage0Id').empty();
                                            thisStatus.arrayOfImages[0].imageUrl = '';
                                            thisStatus.arrayOfImages[0].previewUrl = '';
                                            thisStatus.arrayOfImages[0].isDeleted = 'Deleted';

                                        }
                                        else if (id == "image1Id") {
                                            $('#wrapperImage1Id').empty();
                                            thisStatus.arrayOfImages[1].imageUrl = '';
                                            thisStatus.arrayOfImages[1].previewUrl = '';
                                            thisStatus.arrayOfImages[1].isDeleted = 'Deleted';

                                        }
                                        else if (id == "image2Id") {
                                            $('#wrapperImage2Id').empty();
                                            thisStatus.arrayOfImages[2].imageUrl = '';
                                            thisStatus.arrayOfImages[2].previewUrl = '';
                                            thisStatus.arrayOfImages[2].isDeleted = 'Deleted';

                                        }
                                        else if (id == "image3Id") {
                                            $('#wrapperImage3Id').empty();
                                            thisStatus.arrayOfImages[3].imageUrl = '';
                                            thisStatus.arrayOfImages[3].previewUrl = '';
                                            thisStatus.arrayOfImages[3].isDeleted = 'Deleted';
                                        }
                                    });
                                    thisStatus.isFirstTimePageBindEdit = false;
                                }
                            //}
                        });

                        thisStatus.showLoadingIconOnEditClick = false;
                        thisStatus.isPostAdvertisementFormVisible = true;
                        thisStatus.isDesiredConsumerSegmentVisible = true;
                        thisStatus.isConsumerSegmentAdvertisementVisible = true;
                    }

                    this.cdr.detectChanges();
                });

        this.cdr.detectChanges();
    }

    submitPostForm() {
        debugger;
        this.isSubmittingPA = true;
        if (this.arrayOfImages[0].previewUrl == '') {
            this.showToast('danger', "Please upload main image.");
        }
        else {
            if (this.PostAdvertisement.valid) {

                this.PostAds();
            }
            else {
                this.formErrorMessagePA = "Please make sure, you entered correct data.";
                this.logValidationErrorsPA(this.PostAdvertisement);
                this.isSubmittingPA = false;
            }
        }
        
    }

    updatePostForm() {

        debugger;
        if (this.arrayOfImages[0].previewUrl == '') {
            this.showToast('danger', "Please upload main image.");
        }
        else {
            this.isSubmittingPA = true;
            var teamlist = [];
            //$("#divFeatures input[id*='chk']:checked").each(function () {
            //    teamlist.push($(this).val());
            //});
            //var rowID = $("label[for='lblRowId']").text();


            var msg = [];

            var CategoryId = 1;
            var SubCategoryId = $("#SubCategory").val();
            var advertisementId = this.PostAdvertisement.get('advId').value;
            //this.PostAdvertisement.get('');
            var title = this.PostAdvertisement.get('titlePA').value;
            var Features = this.PostAdvertisement.get('additionalFeature').value;// CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
            var address = this.PostAdvertisement.get('stAddressPA').value;
            var contactNo = this.PostAdvertisement.get('contactNoPA').value;
            var description = this.PostAdvertisement.get('descPA').value;
            var countryID = this.PostAdvertisement.get('countryPA').value;
            var StateID = this.PostAdvertisement.get('statePA').value.value;
            var cityID = this.PostAdvertisement.get('cityPA').value;
            var price = this.PostAdvertisement.get('pricePA').value;
            var zipcode = this.PostAdvertisement.get('zipCodePA').value.value;
            //var amount = this.PostAdvertisement.get('c').value;
            //var zipcode = this.PostAdvertisement.get('subCat').value.value;

            var isFeatured = 0;
            var jobtype = 1;
            var amount = 0;
            var adsPrice = this.PostAdvertisement.get('lblzipCodeprice').value;

            this.listpropertiesService
                .UpdateSale(CategoryId, SubCategoryId, title, Features, address, contactNo, description, countryID, StateID, cityID, zipcode, price, advertisementId)
                .subscribe(
                    data => {
                        debugger;
                        if (data.d == "-1") {
                            this.showToast('danger', "This Record is Already Exists");
                            this.isSubmittingPA = false;

                        }
                        if (data.d == "3") {
                            this.showToast('danger', "Unsucessfull, Try again!!!");
                            this.isSubmittingPA = false;
                        }
                        else if (data.d >= "1") {

                            debugger;
                            this.AdvertisementImages(parseInt(advertisementId), "Yes");
                            

                            //this.RemoveTableSalesAdvertisement();
                            //this.ViewAllSalesAdvertisement();

                            //$('#divsave').css("visibility", "hidden");
                            //$('#divImage').css("display", "none");
                            //$('#btnUpdate').css("visibility", "hidden");
                            //$("#btnAddNew").attr("disabled", true);

                            //this.isPostAdvertisementFormVisible = false;
                            //this.isDesiredConsumerSegmentVisible = false;
                            //this.isConsumerSegmentAdvertisementVisible = false;

                            //this.ClearText();
                            this.cdr.detectChanges();
                        }
                    }
                );
        }

        
    }

    resetPostForm() {
        debugger;
        this.ClearText();
    }

    cancelPostForm() {
        this.isPostAdvertisementFormVisible = false;
        this.ClearText();

        if (this.isPostButtonGreen) {
            this.isPostButtonGreen = false;
        }
        else {
            this.isPostButtonGreen = true;
        }
    }

    ClearText() {
        debugger;
        $("#subCatHome").removeClass("active");
        $("#subCatTownHome").removeClass("active");
        $("#subCatMultiFamily").removeClass("active");
        $("#subCatLand").removeClass("active");

        this.PostAdvertisement.get('titlePA').setValue('');
        //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();

        this.PostAdvertisement.get('additionalFeature').setValue('');
        this.PostAdvertisement.get('stAddressPA').setValue('');
        //this.PostAdvertisement.get('contactNoPA').setValue('');
        this.PostAdvertisement.get('descPA').setValue('');
        //this.PostAdvertisement.get('countryPA').setValue('');

        //this.stateDataPA = null;
        //this.zipCodeDataPA = null;
        this.startValueZipCodePA = { "value": '', "label": '' };
        this.startValueStatePA = { 'value': '', 'label': '' };

        this.PostAdvertisement.get('cityPA').setValue('');
        this.PostAdvertisement.get('pricePA').setValue('');
        this.PostAdvertisement.get('subCat').setValue('');
        $("#SubCategory").html('');
        $('#previewImages').html('');

        $('#FileUpload1').val('');
        $('#FileUpload2').val('');
        $('#FileUpload3').val('');
        $('#FileUpload4').val('');

        this.arrayOfImages = [];
    }


    PostAds() {
        debugger;
        this.listpropertiesService
            .AssociateCardExists()
            .subscribe(
                data => {
                    debugger;
                    //this.InsertPostAdvsData();
                    //this line will be removed later
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CheckAssoCard");
                        if (parseInt($(docs).find("id").text()) >= 1) {
                            this.InsertPostAdvsData();
                        }
                        else {
                            this.onOpenModalClick();
                            //$('#completeConsumerProfile').modal('show');
                        }
                    }
                    else {

                        this.isSubmittingPA = false;
                        this.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!");
                    }
                });
    }

    InsertPostAdvsData() {
        debugger;
        // var check = this.Valid1();
        // if (check == '0') {

        this.listpropertiesService
            .CountAssociateAdvertisements()
            .subscribe(
                data => {
                    debugger;
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
                                thisStatus.isSubmittingPA = false;

                                return false;
                            }
                        });
                    }
                    else {

                        this.isSubmittingPA = false;
                        this.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!");
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

    PayAmount() {
        debugger;

        var msg = [];
        var totalAmount = this.PostAdvertisement.get('lblzipCodeprice').value;// $("#lblzipCodeprice").text();
        this.PaidAmountForPurchaseAdvertisement(totalAmount, this.PostAdvertisement.get('titlePA').value, this.PostAdvertisement.get('subCat').value);

    }

    PaidAmountForPurchaseAdvertisement(totalAmount, title, subcategory): any {
        debugger;
        this.listpropertiesService
            .InsertAmount(totalAmount, title, subcategory)
            .subscribe(
                data => {
                    debugger;
                    if (parseInt(data.d) == 1) {
                        var CategoryId = 1;
                        var subCategoryId = $("#SubCategory").val();
                        //this.PostAdvertisement.get('');

                        var title = this.PostAdvertisement.get('titlePA').value;
                        var featurs = this.PostAdvertisement.get('additionalFeature').value;;//CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                        var address = this.PostAdvertisement.get('stAddressPA').value;
                        var contactNo = this.PostAdvertisement.get('contactNoPA').value;
                        var description = this.PostAdvertisement.get('descPA').value;
                        var countryID = this.PostAdvertisement.get('countryPA').value;
                        var stateID = this.PostAdvertisement.get('statePA').value.value;
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

                        this.SavePostAdvertisementsData(CategoryId, subCategoryId, title, featurs, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice);


                        //this.isSubmittingPA = false;
                    } else {
                        if (this._Counter == 0) {
                            //this.AssociateAlreadyCategories();
                            this._Counter++;
                            this.onOpenModalClick();
                        }
                        else {
                            this.isSubmittingPA = false;
                            this.showToast('danger', "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.");
                            this.cdr.detectChanges();
                            this._Counter++;

                        }

                    }

                }
            );
    }

    SavePostAdvertisementsData(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice): any {
        debugger;
        this.listpropertiesService
            .InsertSale(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice)
            .subscribe(
                data => {
                    debugger;
                    if (parseInt(data.d) >= 1) {

                        this.PurchasedCategorybyAssociate(1, subCategoryId, 1, 0, 0, 0, 0, 0);

                        $("#subCatHome").removeClass("active");
                        $("#subCatTownHome").removeClass("active");
                        $("#subCatMultiFamily").removeClass("active");
                        $("#subCatLand").removeClass("active");

                        this.PostAdvertisement.get('titlePA').setValue('');
                        //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                        this.PostAdvertisement.get('stAddressPA').setValue('');
                        this.PostAdvertisement.get('contactNoPA').setValue('');
                        this.PostAdvertisement.get('descPA').setValue('');
                        this.PostAdvertisement.get('countryPA').setValue('');
                        this.stateDataPA = null;
                        this.zipCodeDataPA = null;

                        this.startValueStatePA = { 'value': '', 'label': '' };
                        this.startValueZipCodePA = { "value": '', "label": '' };

                        this.PostAdvertisement.get('cityPA').setValue('');
                        this.PostAdvertisement.get('pricePA').setValue('');
                        this.PostAdvertisement.get('subCat').setValue('');
                        $("#SubCategory").html('');

                        //this.PostAdvertisement.get('titlePA').setValue('');
                        ////CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                        //this.PostAdvertisement.get('stADdressPA').setValue('');
                        //this.PostAdvertisement.get('contactNoPA').setValue('');
                        //this.PostAdvertisement.get('descPA').setValue('');
                        //this.PostAdvertisement.get('cityPA').setValue('');
                        //this.PostAdvertisement.get('pricePA').setValue('0');
                        debugger;
                        this.AdvertisementImages(parseInt(data.d), "No");
                    }
                    else {
                        this.showToast('danger', "We can not complete this sales Advertisement Purchase at this time!!");
                        this.showToast('danger', "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at <b>866.456.7331.</b>");

                    }
                    this.isSubmittingPA = false;
                    this.cdr.detectChanges();

                },
                error => {
                    this.isSubmittingPA = false;
                    return 0;
                }
            );
    }

    AdvertisementImages(rowID, isUpdating) {

        //debugger;
        //var thisStatus = this;
        //var test = new FormData();

        //var deletePic1 = '';
        //var deletePic2 = '';
        //var deletePic3 = '';
        //var deletePic4 = '';


        //if(thisStatus.arrayOfImages[0].imageUrl != '')
        //{
        //    if ($("#FileUpload1").val() == '') { }
        //    else
        //    {
        //    var fileUpload: any = $("#FileUpload1").get(0);
        //    var files = fileUpload.files;
        //    test.append(files[0].name, files[0], rowID);
        //    }
        //}
        //else {
        //    deletePic1 = "Deleted";
        //}

        //if (thisStatus.arrayOfImages[1].imageUrl != '')
        //{
        //    if ($("#FileUpload2").val() == '') { }
        //    else {
        //        var fileUpload: any = $("#FileUpload2").get(0);
        //        var files = fileUpload.files;
        //        test.append(files[0].name, files[0], rowID);
        //    }
        //}
        //else {
        //    deletePic2 = "Deleted";
        //}


        //if (thisStatus.arrayOfImages[2].imageUrl != '')
        //{
        //    if ($("#FileUpload3").val() == '') { }
        //    else {
        //        var fileUpload: any = $("#FileUpload3").get(0);
        //        var files = fileUpload.files;
        //        test.append(files[0].name, files[0], rowID);
        //    }
        //}
        //else {
        //    deletePic3 = "Deleted";
        //}


        //if (thisStatus.arrayOfImages[3].imageUrl != '')
        //{
        //    if ($("#FileUpload4").val() == '') { }
        //    else {
        //    var fileUpload: any = $("#FileUpload4").get(0);
        //    var files = fileUpload.files;
        //    test.append(files[0].name, files[0], rowID);
        //    }
        //}
        //else
        //{
        //    deletePic4 = "Deleted";
        //}



        debugger;

        var deletePic1 = '';
        var deletePic2 = '';
        var deletePic3 = '';
        var deletePic4 = '';

        var thisStatus = this;
        var fileUpload: any = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        var test = new FormData();
        var secondupload: any = $("#FileUpload2").get(0);
        var files2 = secondupload.files;

        var thirdupload: any = $("#FileUpload3").get(0);
        var files3 = thirdupload.files;

        var fourthupload: any = $("#FileUpload4").get(0);
        var files4 = fourthupload.files;

        //for (var i = 0; i < files.length; i++)
        //{
        
            if ($("#FileUpload1").val() == '') {
            }
            else {
                test.append(files[0].name, files[0], "0,"+rowID);
            }

            if ($("#FileUpload2").val() == '') {
            }
            else {
                test.append(files2[0].name, files2[0], "1," +rowID);
            }

            if ($("#FileUpload3").val() == '') {
            }
            else {
                test.append(files3[0].name, files3[0], "2," +rowID);
            }

            if ($("#FileUpload4").val() == '') {
            }
            else {
                test.append(files4[0].name, files4[0], "3," +rowID);
            }
        //}

        if (thisStatus.arrayOfImages[0].isDeleted == 'Deleted')
        {
            deletePic1 = "Deleted";
        }
        if (thisStatus.arrayOfImages.length > 1) {
            if (thisStatus.arrayOfImages[1].isDeleted == 'Deleted') {
                deletePic2 = "Deleted";
            }
        }
        if (thisStatus.arrayOfImages.length > 2) {
            if (thisStatus.arrayOfImages[2].isDeleted == 'Deleted') {
                deletePic3 = "Deleted";
            }
        }
        if (thisStatus.arrayOfImages.length > 3)
        {
            if (thisStatus.arrayOfImages[3].isDeleted == 'Deleted') {
                deletePic4 = "Deleted";
            }
        }


        test.append("assId", rowID);
        test.append("deletePic1", deletePic1);
        test.append("deletePic2", deletePic2);
        test.append("deletePic3", deletePic3);
        test.append("deletePic4", deletePic4);

        $.ajax({
            url: "Associate/UploadHandler.ashx",
            type: "POST",
            contentType: false,
            processData: false,
            data: test,
            success: function (result) {
                debugger;
                $("#FileUpload1").val("");
                $("#FileUpload2").val("");
                $("#FileUpload3").val("");
                $("#FileUpload4").val("");
                //$("#image-holder").empty();
                //$("#image-holder2").empty();
                //$("#image-holder3").empty();
                //$("#image-holder4").empty();

                //$("#Allimage-holder").empty();
                //$("#Allimage-holder1").empty();
                //$("#Allimage-holder2").empty();
                //$("#Allimage-holder3").empty();
                $("#btnAddNew").removeAttr('disabled');
                thisStatus.ClearText();
                thisStatus.RemoveTableSalesAdvertisement();
                thisStatus.ViewAllSalesAdvertisement();
                

                thisStatus.isCollapsedOpenImages = true;
                thisStatus.isCollapsedOverviewAndAdditionalFeatures = true;
                thisStatus.isCollapsedLocation = true;
                if (thisStatus.isPostButtonGreen) {
                    thisStatus.isPostButtonGreen = false;
                }
                else {
                    thisStatus.isPostButtonGreen = true;
                }
                thisStatus.isPostAdvertisementFormVisible = false;
                if (isUpdating == "No") {
                    thisStatus.showToast('success', "Successfully Sales Advertisment Purchased!");
                    thisStatus.showToast('success', "Your credit card has been Successfully charged!!!");
                }
                else {
                    thisStatus.isPostAdvertisementFormVisible = false;
                    thisStatus.isDesiredConsumerSegmentVisible = false;
                    thisStatus.isConsumerSegmentAdvertisementVisible = false;
                    thisStatus.showToast('success', "Updated Successfully!!!");
                }
                thisStatus.isSubmittingPA = false;
                thisStatus.cdr.detectChanges();
            },
            error: function (err) {
                thisStatus.isSubmittingPA = false;
                thisStatus.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!!");
                thisStatus.cdr.detectChanges();

                alert(err.statusText);

            }
        });

    }

    PurchasedCategorybyAssociate(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration) {
        debugger;
        this.listpropertiesService
            .InsertCatgoryPostAds(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration)
            .subscribe(
                data => {
                    return data.d;
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
                                thisStatus.startValueStatePA = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                            }

                            arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                        });


                        if (arrState == null || arrState == undefined || arrState.length <= 0) {
                            this.formErrorMessagePA = "City is not valid. Please, Try Again!";
                            this.startValueStatePA = { 'value': '', 'label': '' };
                            this.stateDataPA = [];
                        }
                        else {
                            this.stateDataPA = arrState;
                        }
                    }
                });

    }

    BindStateWiseZipCodeForSearch(state, city, startZipCode = null) {

        debugger;
        if (city != "" && city !== undefined && state != null) {
            const countryId = "US";//this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(
                    data => {
                        debugger;

                        if (data.d.length > 0 && data.d != "Not Valid") {
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

                                    if (startZipCode == $(docs).find("zipcode").text()) {
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
                            debugger;
                            if (arrState.length == 0) {
                                this.formErrorMessagePA = "City/State Combination is not valid. Choose again!";
                                //this.switchNgBTab('cityStateTabId');

                                //$('#cityStateTabId').tab('show');
                            }
                            else {
                                this.zipCodeDataPA = arrState;
                                //this.switchNgBTab('zipCodeTabId');

                                //$('#zipCodeTabId').tab('show');
                            }
                        }
                        else {
                            this.zipCodeDataPA = [];
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
                            thisStatus.totalCountOfItemsPurchased = parseInt($(docs).find("Total").text());

                            // $("#lblPurchaseCategories").text($(docs).find("Total").text());
                        });
                        this.cdr.detectChanges();
                    }
                });
    }



    changeCityPA() {

        debugger;
        var state = this.PostAdvertisement.get('statePA').value != null ? this.PostAdvertisement.get('statePA').value.value : null;

        var city = this.PostAdvertisement.get('cityPA').value;

        if (state !== undefined && state != null) {
            this.BindStateWiseZipCodeForSearch(state, city);
        }
        else {
            this.BindCityWiseStatesPA(this.PostAdvertisement.get('cityPA').value);
            this.markAsDirty();
        }
    }

    changeStatePA() {
        debugger;
        this.markAsDirty();
        var state = this.PostAdvertisement.get('statePA').value != null ? this.PostAdvertisement.get('statePA').value.value : null;
        var city = this.PostAdvertisement.get('cityPA').value;
        this.BindStateWiseZipCodeForSearch(state, city);
    }

    changeZipCodePA() {
        debugger;

        var zipCodeVal = this.PostAdvertisement.get('zipCodePA').value != null ? this.PostAdvertisement.get('zipCodePA').value.value : null;
        var subCategory = this.PostAdvertisement.get('subCat').value != null ? this.PostAdvertisement.get('subCat').value : null;


        if (zipCodeVal == null || zipCodeVal == undefined || zipCodeVal == '') {
            //this.showToast('danger', 'Select your desired consumer segment');
        }
        else {
            this.markAsDirty();
            debugger;
            this.isDisabledPABtn = false;
            this.listpropertiesService
                .GetPostAdvertisementPrice(zipCodeVal, subCategory)
                .subscribe(
                    data => {
                        if (data.d != "Not Valid" && data.d.length > 0) {
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
                        else {
                            //this.showToast("Warning", "Please choose different zip code, Price are not available for this zip code.")
                        }
                    });
            //$("#lblsegmentsMessage").text("");
            //$("#lblsegmentsMessage").css("display", "none");
            //var featurs = '';//CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
            //var address = this.PostAdvertisement.get('stAddressPA').value;
            //var contactNo = this.PostAdvertisement.get('contactNoPA').value;
            //var description = this.PostAdvertisement.get('descPA').value;
            //var countryID = this.PostAdvertisement.get('countryPA').value;
            //var stateID = this.PostAdvertisement.get('statePa').value.value;
            //var cityId = this.PostAdvertisement.get('cityPA').value;
            //var price = this.PostAdvertisement.get('pricePA').value;
            //var zipcod = this.PostAdvertisement.get('zipCodePA').value.value;

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

    onclickNewPurchase() {

        if (this.isPostButtonGreen) {
            this.isPostButtonGreen = false;
        }
        else {
            this.isPostButtonGreen = true;
        }

        if (!this.isPostAdvertisementFormVisible) {
            this.isPostAdvertisementFormVisible = true;
        }
        else {
            this.isPostAdvertisementFormVisible = false;
            return;
        }

        this.isAddButtonPA = true;
        this.isDesiredConsumerSegmentVisible = true;

        $("#subCatHome").removeClass("active");
        $("#subCatTownHome").removeClass("active");
        $("#subCatMultiFamily").removeClass("active");
        $("#subCatLand").removeClass("active");

        //this.ClearText();

        //if (this.sts1 == 0) {
        //    //$('html, body').animate({
        //    //    'scrollTop': $("#select-yourdesired").position().top
        //    //});

        //    $(".button-block1").addClass("disable");
        //    //this.isConsumerSegmentAdvertisementVisible = true;
        //    this.sts1 = 1;
        //}
        //else if (this.sts1 == 1) {
        //    //this.isConsumerSegmentAdvertisementVisible = false;
        //    this.isPostAdvertisementFormVisible = false;
        //    // window.location.href = "PostAdvertisement.aspx";
        //    this.sts1 = 0;
        //    $("#SubCategory").html("");


        //$("#subCatHome").removeClass("diable-sidelink");
        //$("#subCatTownHome").removeClass("diable-sidelink");
        //$("#subCatMultiFamily").removeClass("diable-sidelink");
        //$("#subCatLand").removeClass("diable-sidelink");
        //}
    }

    onclickUpdatePurchase() {

        if (this.isPostButtonGreen) {
            this.isPostButtonGreen = false;
        }
        else {
            this.isPostButtonGreen = true;
        }

        if (!this.isPostAdvertisementFormVisible) {
            this.isPostAdvertisementFormVisible = true;
        }
        else {
            this.isPostAdvertisementFormVisible = false;
            return;
        }
        $("#subCatHome").removeClass("active");
        $("#subCatTownHome").removeClass("active");
        $("#subCatMultiFamily").removeClass("active");
        $("#subCatLand").removeClass("active");

        //this.ClearText();
        //if (this.sts1 == 0) {
        //    //$('html, body').animate({
        //    //    'scrollTop': $("#select-yourdesired").position().top
        //    //});

        //    $(".button-block1").addClass("disable");
        //    //this.isConsumerSegmentAdvertisementVisible = true;
        //    this.sts1 = 1;
        //}
        //else if (this.sts1 == 1) {
        //    //this.isConsumerSegmentAdvertisementVisible = false;
        //    this.isPostAdvertisementFormVisible = false;
        //    // window.location.href = "PostAdvertisement.aspx";

        //    this.sts1 = 0;
        //    $("#SubCategory").html("");


        //$("#subCatHome").removeClass("diable-sidelink");
        //$("#subCatTownHome").removeClass("diable-sidelink");
        //$("#subCatMultiFamily").removeClass("diable-sidelink");
        //$("#subCatLand").removeClass("diable-sidelink");
        //}
    }


    markAsDirty() {
        var subCat = this.PostAdvertisement.get('subCat').value;
        var imageText = this.PostAdvertisement.get('image').value;

        if (subCat == '' || subCat === undefined || subCat == null) {
            this.PostAdvertisement.get('subCat').markAsUntouched();
            this.PostAdvertisement.get('subCat').markAsDirty();

        }
        if (imageText == '' || imageText === undefined || imageText == null) {
            this.PostAdvertisement.get('image').markAsUntouched();
        }
    }

    changeConsumerSegmentType(type) {
        debugger;
        var flg = 0;
        if (type == 'Home') {

            $("#SubCategory").empty();

            //$("#lblsegmentsMessage").text("");
            //$("#lblsegmentsMessage").css("display", "none");

            $("#subCatHome").addClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatLand").removeClass("active");

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
            this.PostAdvertisement.get('subCat').setValue('1');

        }
        else if (type == 'Town') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");

            $("#subCatTownHome").addClass("active");
            $("#subCatHome").removeClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatLand").removeClass("active");

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
            this.PostAdvertisement.get('subCat').setValue('2');

        }
        else if (type == 'Family') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");
            $("#subCatMultiFamily").addClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatHome").removeClass("active");
            $("#subCatLand").removeClass("active");


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
            this.PostAdvertisement.get('subCat').setValue('3');

        }
        else if (type == 'Land') {
            $("#SubCategory").empty();

            $("#lblsegmentsMessage").text("");
            $("#lblsegmentsMessage").css("display", "none");
            $("#subCatLand").addClass("active");
            $("#subCatMultiFamily").removeClass("active");
            $("#subCatTownHome").removeClass("active");
            $("#subCatHome").removeClass("active");

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
            this.PostAdvertisement.get('subCat').setValue('4');

        }
        this.isConsumerSegmentAdvertisementVisible = true;
    }

    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type,
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

    onOpenModalClick(): void {

        debugger;
        const modal: NgbModalRef = this.modalService.open(PaymentModalComponent, { size: 'lg', backdrop: "static" });
        const modalComponent: PaymentModalComponent = modal.componentInstance;
        let thisStatus = this;
        modal.componentInstance.dismissParentCall.subscribe((data) => {
            debugger;
            console.log(data);
            this.isSubmittingPA = false;
            thisStatus.isSubmittingPA = false;
            this.cdr.detectChanges();
            thisStatus.cdr.detectChanges();
            //this.overlayLoadingOnPurchase = false;
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {

            debugger;
            this.showToast('info', 'Please be patient, we are processing.')
            this.PostAds();

        },
        () => { });
    }

}

const data = [
    {
        src: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        thumb: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
        src: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        thumb: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
        src: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        thumb: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    },
    {
        src: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        thumb: 'https://preview.ibb.co/kZGsLm/img8.jpg'
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

/** * Use custom gallery config with the lightbox
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