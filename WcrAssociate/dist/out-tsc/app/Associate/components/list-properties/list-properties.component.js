import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ListPropertiesService } from 'AngularAssociate/app/services/associate/list-properties.service';
import { PurchaseZipCodeService } from 'AngularAssociate/app/services/associate/purchase-zipcode.service';
import { Toaster } from "ngx-toast-notifications";
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'; // add this 1 of 4
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
var ListPropertiesComponent = /** @class */ (function () {
    function ListPropertiesComponent(cdr, route, router, paymentService, xmlToJson, fb, listpropertiesService, purchaseZipCodeService, modalService, ngZone, _lightboxEvent, toaster) {
        this.cdr = cdr;
        this.route = route;
        this.router = router;
        this.paymentService = paymentService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.listpropertiesService = listpropertiesService;
        this.purchaseZipCodeService = purchaseZipCodeService;
        this.modalService = modalService;
        this.ngZone = ngZone;
        this._lightboxEvent = _lightboxEvent;
        this.toaster = toaster;
        this.editor = ClassicEditor;
        this._albums = [];
        this.isSubmitting = false;
        this.isCreditCardFormVisible = false;
        this.salesCount = '';
        this.servicesCount = '';
        this.TotalCount = '';
        this.showSuccessMessage = '';
        this.isAddButtonPA = true;
        this.isPostButtonGreen = true;
        this.config = {
            height: 188
        };
        this.validationMessagesPA = {
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
        };
        this.formErrorsPA = {
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
        this.startValueZipCodePA = null;
        this.startValueStatePA = null;
        this.selectedZipCodePA = null;
        this.selectedStatePA = null;
        this.isVisaOrMCOrAmexOrDisc = null;
        this.formErrorMessage = "";
        this.formErrorMessagePA = "";
        this.imageUrl = "";
        this.arrayOfImages = [];
        this.startValueCountry = null;
        this.countryData = [];
        this.catPriceValue = 0.0;
        this.stateDataPA = [];
        this.arrayCategories = [];
        this._Counter = 0;
        this.isDisabledPABtn = false;
        this.zipCodeDataPA = null;
        this.categorySearchData = null;
        this.startValueCategorySearch = null;
        this.subCategorySearchData = null;
        this.startValueSubCategorySearch = null;
        this.isPurchaseNewCategoriesVisible = false;
        this.isPostAdvertismentClicked = false;
        this.isNewFormPostAdvertisement = false;
        this.isPostAdvertisementFormVisible = false;
        this.isDesiredConsumerSegmentVisible = false;
        this.isConsumerSegmentAdvertisementVisible = false;
        this.isUploadImageVisible = false;
        this.isOverviewAndAdditionalVisible = false;
        this.isLocationAndAddressVisible = false;
        this.sts1 = 0;
        this.g_i = 0;
        this.isSubmittingPA = false;
        this.isResetButtonVisible = false;
        this.totalCountOfPostAdvertisement = null;
        this.uploadedAdvertisementImages = '';
        this.showLoadingIconOnEditClick = false;
        this.isEditForm = false;
        this.monthlyBllingDate = "";
        this.totalCountOfItemsPurchased = 0;
        this.totalAmount = 0;
        this.labelPrice = 0.0;
        this.labelCategoryPrice = 0.0;
        this.nextBillingCycleStartSA = null;
        this.totalCountOfPostAdvertisementSA = 0;
        this.totalAmountSA = 0;
        this.dTableSA = null;
        this.dTableAPZC = null;
        this.isCollapsedOpenImages = true;
        this.isCollapsedOverviewAndAdditionalFeatures = true;
        this.isCollapsedLocation = true;
        this.isFirstTimePageBind = true;
        this.isTableCurrentPurchasedZipCodesLoadedFirstTime = true;
        this.isTableSelectedChoicesFirstTime = true;
        this.isTablePurchasedZipCodesLoaded = true;
        this.isTableSalesAdvertisementLoadedFirstTime = true;
        this.data = "";
    }
    ListPropertiesComponent.prototype.ngOnInit = function () {
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
    };
    ListPropertiesComponent.prototype.InitializrEventsAndControlsPA = function () {
        var thisStatus = this;
        $('#SubCategory').change(function () {
            thisStatus.isUploadImageVisible = true;
            //thisStatus.isOverviewAndAdditionalVisible = false;
            //thisStatus.isLocationAndAddressVisible = false;
        });
    };
    ListPropertiesComponent.prototype.setValidationOnForm = function () {
        this.PostAdvertisement = this.fb.group({
            consumerSegmentType: [''],
            titlePA: ['', [Validators.required, patternValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            pricePA: ['', [Validators.required, patternValidator(/^[+-]?\d+(\.\d+)?$/, { Numeric: true })]],
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
    };
    ListPropertiesComponent.prototype.RemoveCardSessions = function () {
        this.listpropertiesService
            .RemoveCardSessions()
            .subscribe(function (data) {
            debugger;
        });
    };
    ListPropertiesComponent.prototype.BindMembership = function () {
        this.listpropertiesService
            .BindMembership()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("MemberShipPlan");
                var cartd = [];
                cartd.push("<option value=0>Select</option>");
                $.each(docs, function (i, docs) {
                    cartd.push(" <option value='" + $(docs).find("mDuration").text() + "'>" + $(docs).find("PlanName").text() + "</option>");
                });
                $("#MemberShip").html(cartd.join(''));
            }
        });
    };
    ListPropertiesComponent.prototype.logValidationErrorsPA = function (group) {
        var _this = this;
        if (group === void 0) { group = this.PostAdvertisement; }
        this.formErrorMessagePA = "";
        Object.keys(group.controls).forEach(function (key) {
            var abstractControl = group.get(key);
            _this.formErrorsPA[key] = '';
            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                _this.formErrorsPA[key] = "";
                var messages = _this.validationMessagesPA[key];
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                _this.formErrorsPA[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }
            if (abstractControl instanceof FormGroup) {
                _this.logValidationErrorsPA(abstractControl);
            }
        });
    };
    ListPropertiesComponent.prototype.onSelectFile = function (event, imageIndex) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.showToast("danger", "Only images are supported.");
                return;
            }
            var imageExist = false;
            for (var i = 0; i < this.arrayOfImages.length; i++) {
                if (this.arrayOfImages[i] !== undefined && this.arrayOfImages[i].imageIndex == imageIndex) {
                    this.g_i = i;
                    var reader1 = new FileReader();
                    reader1.readAsDataURL(event.target.files[0]); // read file as data url
                    reader1.onload = function (e) {
                        _this.resetImages(e, imageIndex);
                    };
                    imageExist = true;
                    debugger;
                }
            }
            if (!imageExist) {
                var reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]); // read file as data url
                reader.onload = function (e1) {
                    _this.resetImageFirstTime(e1, imageIndex);
                };
                debugger;
            }
        }
    };
    ListPropertiesComponent.prototype.resetImageFirstTime = function (e1, imageIndex) {
        debugger;
        var l_imageUrlFT = e1.target.result;
        var imageObject = { 'srcUrl': l_imageUrlFT, 'previewUrl': l_imageUrlFT, 'imageIndex': imageIndex };
        this.arrayOfImages.push(imageObject);
        $('#previewImages').html('');
        var images = '';
        for (var i = 0; i < this.arrayOfImages.length; i++) {
            //images += "<div class='col-12 col-xs-12 col-sm-3'><img class='img-responsive ht-150' src='" + this.arrayOfImages[i].srcUrl + "' openImage('" + this.arrayOfImages[i].imageIndex + "') ></div>";
            images += "<div class='col-12 col-xs-12 col-sm-3'>";
            images += "<div id='wrapperImage" + i + "Id' class='wrapper_image'>";
            images += "<img class='img-responsive ht-150' src='" + this.arrayOfImages[i].srcUrl + "' openImage('" + this.arrayOfImages[i].imageIndex + "') >";
            images += "<span id='image" + i + "Id' class='close_image'></span>";
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
    };
    ListPropertiesComponent.prototype.resetImages = function (e, imageIndex) {
        debugger;
        var l_imageUrl = e.target.result;
        this.arrayOfImages[this.g_i].srcUrl = '';
        this.arrayOfImages[this.g_i].previewUrl = '';
        this.arrayOfImages[this.g_i].srcUrl = l_imageUrl;
        this.arrayOfImages[this.g_i].previewUrl = l_imageUrl;
        $('#previewImages').html('');
        var images = '';
        for (var i = 0; i < this.arrayOfImages.length; i++) {
            images += "<div class='col-12 col-xs-12 col-sm-3'>";
            images += "<div id='wrapperImage" + i + "Id' class='wrapper_image'>";
            images += "<img class='img-responsive ht-150' src='" + this.arrayOfImages[i].previewUrl + "' openImage('" + this.arrayOfImages[i].imageIndex + "') >";
            images += "<span id='image" + i + "Id' class='close_image'></span>";
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
    };
    ListPropertiesComponent.prototype.closeImageClick = function () {
        var thisStatus = this;
        $('.close_image').click(function () {
            var id = $(this).attr('id');
            if (id == "image0Id") {
                thisStatus.arrayOfImages[0].imageUrl = '';
                thisStatus.arrayOfImages[0].previewUrl = '';
                $('#wrapperImage0Id').empty();
            }
            else if (id == "image1Id") {
                thisStatus.arrayOfImages[1].imageUrl = '';
                thisStatus.arrayOfImages[1].previewUrl = '';
                $('#wrapperImage1Id').empty();
            }
            else if (id == "image2Id") {
                thisStatus.arrayOfImages[2].imageUrl = '';
                thisStatus.arrayOfImages[2].previewUrl = '';
                $('#wrapperImage2Id').empty();
            }
            else if (id == "image3Id") {
                thisStatus.arrayOfImages[3].imageUrl = '';
                thisStatus.arrayOfImages[3].previewUrl = '';
                $('#wrapperImage3Id').empty();
            }
        });
        this.cdr.detectChanges();
    };
    ListPropertiesComponent.prototype.reset = function (fileUploadId) {
        debugger;
        if (fileUploadId == '1') {
            console.log(this.fileUpload1.nativeElement.files);
            this.fileUpload1.nativeElement.value = "";
            console.log(this.fileUpload1.nativeElement.files);
        }
    };
    ListPropertiesComponent.prototype.showImagesUsingFAncyBox = function (p_arrayOImages) {
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
    };
    ListPropertiesComponent.prototype.open = function (index) {
        // open lightbox
        this._lightboxEvent.open(this._albums, index);
    };
    ListPropertiesComponent.prototype.close = function () {
        // close lightbox programmatically
        this._lightboxEvent.close();
    };
    ListPropertiesComponent.prototype.BindCountry = function () {
        var _this = this;
        var countryId = "US"; //this.cardForm.get('country').value;
        this.listpropertiesService
            .BindCountry()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("Countries");
                var arrCountry = [];
                //this.startValueState = '';
                var thisStatus = _this;
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
                _this.countryData = arrCountry;
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
        });
    };
    ListPropertiesComponent.prototype.GetMobileNo = function () {
        var _this = this;
        this.listpropertiesService
            .ViewAssociateBasicDetails()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("ViewAssociateBasicDetail");
                var cartd = [];
                var sd = [];
                var thisStatus_1 = _this;
                $.each(docs, function (i, docs) {
                    thisStatus_1.PostAdvertisement.get('contactNoPA').setValue($(docs).find("MobileNo").text());
                    $("#contactNoPA").attr("disabled", "disabled");
                });
            }
        });
    };
    ListPropertiesComponent.prototype.BindStatePA = function (startStateValue) {
        var _this = this;
        if (startStateValue === void 0) { startStateValue = null; }
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
                _this.stateDataPA = arrState;
            }
        });
    };
    ListPropertiesComponent.prototype.UpdateImages = function (fileuploaderID, AdID, handUrl) {
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
    };
    ListPropertiesComponent.prototype.ApplyCoponCode = function (cCode, disc, duration) {
        var _this = this;
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
                .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var xmlDoc, xml, docs, results;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            debugger;
                            if (!(data.d.length > 0)) return [3 /*break*/, 2];
                            xmlDoc = $.parseXML(data.d);
                            xml = $(xmlDoc);
                            docs = xml.find("Table1");
                            $.each(docs, function (i, docs) {
                                teamlist.push($(docs).find("subCategoryID").text());
                                zipcodelist.push($(docs).find("Zipcode").text());
                                PriceValues.push($(docs).find("Price").text());
                                CatIdValue.push($(docs).find("CategoryID").text());
                            });
                            return [4 /*yield*/, Promise.apply(this.purchaseZipCodeService.InsertCategory(cCode, disc, duration, categoryId, subCategoryId, planId, priceValues, zipCode))
                                    .ajaxSuccess(function (subData1) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var monthValue, totalAmount, results_1;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(subData1.d == "1")) return [3 /*break*/, 3];
                                                if (!(this.catPriceValue == 0)) return [3 /*break*/, 1];
                                                this.showToast('success', "Zip code successfully Purchased!");
                                                this.showToast('success', "Your Credit Card has been successfully charged.");
                                                this.AssociateAlreadyCategories();
                                                return [3 /*break*/, 3];
                                            case 1:
                                                monthValue = 1;
                                                totalAmount = $("#lblprice").text();
                                                return [4 /*yield*/, Promise.apply(this.purchaseZipCodeService.MakeTransaction(monthValue, totalAmount)).ajaxSuccess(function (subData) {
                                                        if (subData.d == "1") {
                                                            _this.showToast('success', "Zip code successfully Purchased!");
                                                            _this.showToast('success', "Your Credit Card has been successfully charged.");
                                                            //this.divShowTableSelectedSearch = false;
                                                            _this.AssociateAlreadyCategories();
                                                            _this.RemoveCardSessions();
                                                        }
                                                        if (subData.d == "0") {
                                                            _this.showToast('danger', "Failed, Already exist!!!");
                                                            //$('#fail_message').modal('show');
                                                        }
                                                        if (subData.d == "3") {
                                                            _this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                                                        }
                                                    })];
                                            case 2:
                                                results_1 = _a.sent();
                                                if (data.d == "0") {
                                                    this.showToast('danger', "Failure, Already. Try Again!!!");
                                                }
                                                if (data.d == "3") {
                                                    this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                                                }
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            results = _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    ListPropertiesComponent.prototype.AssociateAlreadyCategories = function () {
        var _this = this;
        debugger;
        this.listpropertiesService
            .MurchantPurchaseCategories()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
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
                    _this.InitializedDataTableCurrentPurchasedZipCodes(dataJson.NewDataSet.MyCategories);
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
        });
    };
    ListPropertiesComponent.prototype.InitializedDataTableCurrentPurchasedZipCodes = function (asyncData) {
        debugger;
        console.log(asyncData);
        $('#ViewAllCategoriesPurchased').DataTable().clear().destroy();
        var dTable = $('#ViewAllCategoriesPurchased');
        var thisStatus = this;
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
                    .subscribe(function (data) {
                    //thisStatus.getClientDetailsServicesData();
                    //thisStatus.getServicesCount();
                    //thisStatus.getTotalSalesAndServicesCount();
                });
            });
            this.isTableCurrentPurchasedZipCodesLoadedFirstTime = false;
        }
    };
    ListPropertiesComponent.prototype.SelectedChoicesForPurchase = function () {
        var _this = this;
        this.listpropertiesService
            .SelectedChoicesForPurchase()
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
                if (dataJson.NewDataSet.Table1 != null) {
                    if (!Array.isArray(dataJson.NewDataSet.Table1)) {
                        resultJson.push(dataJson.NewDataSet.Table1);
                        dataJson.NewDataSet.Table1 = resultJson;
                    }
                    _this.InitializedDataTableSelectedChoices(dataJson.NewDataSet.Table1);
                }
                else {
                    _this.InitializedDataTableSelectedChoices(undefined);
                }
                var cc = 0;
                var count = 1;
                var totalAmount1 = 0;
                $.each(docs, function (i, docs) {
                    var a = $(docs).find("amount").text();
                    totalAmount1 = totalAmount1 + parseInt(a);
                });
                var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalAmount1 + "</b></td><td></td></tr>";
                _this.totalAmountSA = totalAmount1;
                _this.totalAmount = totalAmount1;
                _this.cdr.detectChanges();
            }
        });
    }; //BindData  //GetAllRecords
    ListPropertiesComponent.prototype.InitializedDataTableSelectedChoices = function (asyncData) {
        console.log(asyncData);
        $('#ViewRcd').DataTable().clear().destroy();
        var dTable = $('#ViewRcd');
        var thisStatus = this;
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
                thisStatus.ngZone.run(function () {
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
                thisStatus.ngZone.run(function () {
                    thisStatus.CancelRecord(subCategoryID, SubCategoryName, id);
                });
            });
            this.isTableSelectedChoicesFirstTime = false;
        }
    };
    ListPropertiesComponent.prototype.PurchaseRcd = function (CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id) {
        var _this = this;
        this.listpropertiesService
            .PurchasedItems(CategoryID, subCategoryID, CategoryName, SubCategoryName, Price, Zipcode, id)
            .subscribe(function (data) {
            $("#divSelectedChce").css("display", "none");
            $("#aSubCategory option:selected").remove();
            $("#btncheckout").css("visibility", "visible");
            $("#btnreset1").css("visibility", "visible");
            $("#btnCancel1").css("visibility", "visible");
            _this.RemoveFromPurchase(id);
            _this.GetPurchasedAllRecords();
            var a = 0;
            var b = 0;
            var c = 0;
            _this.ApplyCoponCode(a, b, c);
        });
    };
    ListPropertiesComponent.prototype.RemoveFromPurchase = function (id) {
        var _this = this;
        this.listpropertiesService
            .RemoveItem(id)
            .subscribe(function (data) {
            _this.SelectedChoicesForPurchase();
        });
    };
    ListPropertiesComponent.prototype.GetPurchasedAllRecords = function () {
        var _this = this;
        this.listpropertiesService
            .SelectAllPurchasedCartData()
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
                if (dataJson.NewDataSet.Table1 != null) {
                    if (!Array.isArray(dataJson.NewDataSet.Table1)) {
                        resultJson.push(dataJson.NewDataSet.Table1);
                        dataJson.NewDataSet.Table1 = resultJson;
                    }
                    _this.InitializedDataTablePurchasedZipCodes(dataJson.NewDataSet.Table1);
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
    ListPropertiesComponent.prototype.InitializedDataTablePurchasedZipCodes = function (asyncData) {
        console.log(asyncData);
        $('#viewAllPurchasedZipCodes').DataTable().clear().destroy();
        this.dTableAPZC = $('#viewAllPurchasedZipCodes');
        var thisStatus = this;
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
    };
    ListPropertiesComponent.prototype.RemoveRcd1 = function (rrr) {
        var _this = this;
        this.listpropertiesService
            .RemoveItem1(rrr)
            .subscribe(function (data) {
            _this.GetPurchasedAllRecords();
        });
    };
    ListPropertiesComponent.prototype.RemoveTablePZC = function () {
        if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
            this.dTableAPZC.DataTable().clear().destroy();
            this.dTableAPZC.off('click');
        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    };
    ListPropertiesComponent.prototype.ViewAllSalesAdvertisement = function () {
        var _this = this;
        debugger;
        this.listpropertiesService
            .SelectAdvertisement()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var chk = 1;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("ViewAdvertisment");
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var resultJson = [];
                var dataJson = JSON.parse(json);
                if (dataJson.NewDataSet != null) {
                    if (dataJson.NewDataSet.ViewAdvertisment != null) {
                        if (!Array.isArray(dataJson.NewDataSet.ViewAdvertisment)) {
                            resultJson.push(dataJson.NewDataSet.ViewAdvertisment);
                            dataJson.NewDataSet.ViewAdvertisment = resultJson;
                        }
                        _this.InitializedDataTableSalesAdvertisement(dataJson.NewDataSet.ViewAdvertisment);
                    }
                    else {
                        _this.InitializedDataTableSalesAdvertisement(undefined);
                    }
                    var cc = 0;
                    var count = 0;
                    var totalAmount1 = 0;
                    $.each(docs, function (i, docs) {
                        var a = $(docs).find("amount").text();
                        totalAmount1 = totalAmount1 + parseInt(a);
                        count++;
                    });
                    _this.totalCountOfPostAdvertisementSA = count;
                    var row = "<tr>   <td colspan='7' ><b> Total Amount:- $" + totalAmount1 + "</b></td><td></td></tr>";
                }
                else {
                    _this.InitializedDataTableSalesAdvertisement(undefined);
                }
                _this.cdr.detectChanges();
            }
        });
    };
    ListPropertiesComponent.prototype.InitializedDataTableSalesAdvertisement = function (asyncData) {
        console.log(asyncData);
        $('#salesAdvertisement').DataTable().clear().destroy();
        this.dTableSA = $('#salesAdvertisement');
        var thisStatus = this;
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
            columnDefs: [
                {
                    targets: [1],
                    render: function (data) {
                        debugger;
                        return '<img class="ht-100" src="../../../../Associate/Adv_img/' + data + '">';
                    }
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
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            order: [[1, 'asc']]
        });
        if (this.isTableSalesAdvertisementLoadedFirstTime) {
            $('#salesAdvertisement').on('click', 'a.edit', function (e) {
                var _this = this;
                e.preventDefault();
                debugger;
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());
                thisStatus.ngZone.run(function () {
                    thisStatus.EditRecords($(_this).closest('tr').children('td:first').text());
                });
            });
            $('#salesAdvertisement').on('click', 'a.remove', function (e) {
                var _this = this;
                e.preventDefault();
                debugger;
                var tr = $(this).closest('tr');
                console.log($(this).closest('tr').children('td:first').text());
                thisStatus.dTableSA.api().row($(this).parents('tr')).remove().draw(false);
                thisStatus.ngZone.run(function () {
                    thisStatus.DeleteRecords($(_this).closest('tr').children('td:first').text());
                });
            });
            this.isTableSalesAdvertisementLoadedFirstTime = false;
        }
    };
    ListPropertiesComponent.prototype.RemoveTableSalesAdvertisement = function () {
        if (this.dTableSA !== undefined && this.dTableSA != null) {
            this.dTableSA.DataTable().clear().destroy();
            this.dTableSA.off('click');
        }
        //if (this.dTableAPZC !== undefined && this.dTableAPZC != null) {
        //    this.dTableAPZC.dataTable().fnClearTable();
        //}
    };
    ListPropertiesComponent.prototype.DeleteRecords = function (advId) {
        var _this = this;
        if (confirm("Are you sure?")) {
            var msg = [];
            this.listpropertiesService
                .DeleteDataFromAdvertisement(parseInt(advId))
                .subscribe(function (data) {
                if (data.d == "-1") {
                    _this.showToast('danger', "Failure, Already Exist!!!");
                }
                if (data.d == "3") {
                    _this.showToast('danger', "Error, Something went wrong. Try Again!!!");
                }
                else if (data.d = "1") {
                    _this.showToast('success', "Success, Deleted Succesfully.");
                    _this.isPostAdvertisementFormVisible = false;
                }
            });
        }
    };
    ListPropertiesComponent.prototype.EditRecords = function (advId) {
        var _this = this;
        debugger;
        this.isEditForm = true;
        this.isResetButtonVisible = true;
        this.isDisabledPABtn = true;
        this.isAddButtonPA = false;
        this.showLoadingIconOnEditClick = true;
        this.isResetButtonVisible = false;
        this.listpropertiesService
            .GetAdvertisementDetails(parseInt(advId))
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                $('html, body').animate({ scrollTop: $('#loadingIconId').offset().top }, 'slow');
                $('#previewImages').html('');
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("FullDetailsAdvertisments");
                var thisStatus = _this;
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
                    //CKEDITOR.instances.txtFeatures.setData($(docs).find("additionalFeature").text());
                    var images = '';
                    if (($(docs).find("advMainImage").text()) !== undefined && ($(docs).find("advMainImage").text()) != null) {
                        thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advMainImage").text();
                        var imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '1' };
                        thisStatus.arrayOfImages.push(imageObject);
                        //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' + $(docs).find("advMainImage").text() + '/></div>';
                        images += "<div class='col-12 col-xs-12 col-sm-3'>";
                        images += "<div class='wrapper_image'>";
                        images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/'" + $(docs).find("advMainImage").text() + "'>";
                        images += "<span id='image0Id' class='close_image'></span>";
                        images += "</div>";
                        images += "</div>";
                    }
                    if (($(docs).find("advImage1").text()) !== undefined && ($(docs).find("advImage1").text()) != null) {
                        thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advImage1").text();
                        var imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '2' };
                        thisStatus.arrayOfImages.push(imageObject);
                        //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' + $(docs).find("advImage1").text() + '/></div>';
                        images += "<div class='col-12 col-xs-12 col-sm-3'>";
                        images += "<div class='wrapper_image'>";
                        images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/'" + $(docs).find("advImage1").text() + "'>";
                        images += "<span id='image1Id'  class='close_image'></span>";
                        images += "</div>";
                        images += "</div>";
                    }
                    if (($(docs).find("advImage2").text()) !== undefined && ($(docs).find("advImage2").text()) != null) {
                        thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advImage2").text();
                        var imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '2' };
                        thisStatus.arrayOfImages.push(imageObject);
                        //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' +  + '/></div>';
                        images += "<div class='col-12 col-xs-12 col-sm-3'>";
                        images += "<div class='wrapper_image'>";
                        images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/'" + $(docs).find("advImage2").text() + "'>";
                        images += "<span id='image2Id' class='close_image'></span>";
                        images += "</div>";
                        images += "</div>";
                    }
                    if (($(docs).find("advImage3").text()) !== undefined && ($(docs).find("advImage3").text()) != null) {
                        thisStatus.imageUrl = '../../../../Associate/Adv_img/' + $(docs).find("advImage3").text();
                        var imageObject = { 'srcUrl': thisStatus.imageUrl, 'previewUrl': thisStatus.imageUrl, 'imageIndex': '2' };
                        thisStatus.arrayOfImages.push(imageObject);
                        //images += '<div class="col-12 col-xs-12 col-sm-3"><img class="thumb-image img-responsive ht-150" src="../../../../Associate/Adv_img/' + $(docs).find("advImage3").text() + '/></div>';
                        images += "<div class='col-12 col-xs-12 col-sm-3'>";
                        images += "<div class='wrapper_image'>";
                        images += "<img class='thumb-image img-responsive ht-150' src='../../../../Associate/Adv_img/'" + $(docs).find("advImage3").text() + "'>";
                        images += "<span id='image3Id' class='close_image'></span>";
                        images += "</div>";
                        images += "</div>";
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
                    thisStatus.startValueState = { "value": $(docs).find("StateID").text(), "label": $(docs).find("StateID").text() };
                    thisStatus.BindStateWiseZipCodeForSearch($(docs).find("StateID").text(), $(docs).find("CityID").text(), $(docs).find("ZipCode").text());
                    if (images !== undefined || images != '') {
                        if (thisStatus.isFirstTimePageBind) {
                            $('.close_image').click(function () {
                                debugger;
                                var id = $(this).attr('id');
                                if (id == "image0Id") {
                                    $('#wrapperImage0Id').empty();
                                }
                                else if (id == "image1Id") {
                                    $('#wrapperImage1Id').empty();
                                }
                                else if (id == "image2Id") {
                                    $('#wrapperImage2Id').empty();
                                }
                                else if (id == "image3Id") {
                                    $('#wrapperImage3Id').empty();
                                }
                            });
                            thisStatus.isFirstTimePageBind = true;
                        }
                    }
                });
                thisStatus.showLoadingIconOnEditClick = false;
                thisStatus.isPostAdvertisementFormVisible = true;
                thisStatus.isDesiredConsumerSegmentVisible = true;
                thisStatus.isConsumerSegmentAdvertisementVisible = true;
            }
            _this.cdr.detectChanges();
        });
        this.cdr.detectChanges();
    };
    ListPropertiesComponent.prototype.submitPostForm = function () {
        debugger;
        this.isSubmittingPA = true;
        if (this.PostAdvertisement.valid) {
            this.PostAds();
        }
        else {
            this.formErrorMessagePA = "Please make sure, you entered correct data.";
            this.logValidationErrorsPA(this.PostAdvertisement);
            this.isSubmittingPA = false;
        }
    };
    ListPropertiesComponent.prototype.updatePostForm = function () {
        var _this = this;
        debugger;
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
        var Features = ''; //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
        var address = this.PostAdvertisement.get('stAddressPA').value;
        var contactNo = this.PostAdvertisement.get('contactNoPA').value;
        var description = this.PostAdvertisement.get('descPA').value;
        var countryID = this.PostAdvertisement.get('countryPA').value;
        var StateID = this.PostAdvertisement.get('statePA').value.value;
        var cityID = this.PostAdvertisement.get('cityPA').value;
        var price = this.PostAdvertisement.get('pricePA').value;
        var zipcode = this.PostAdvertisement.get('zipCodePA').value.value;
        //var zipcode = this.PostAdvertisement.get('subCat').value.value;
        var isFeatured = 0;
        var jobtype = 1;
        var amount = 0;
        var adsPrice = this.PostAdvertisement.get('lblzipCodeprice').value;
        this.listpropertiesService
            .UpdateSale(CategoryId, SubCategoryId, title, Features, address, contactNo, description, countryID, StateID, cityID, zipcode, amount, advertisementId)
            .subscribe(function (data) {
            if (data.d == "-1") {
                _this.showToast('danger', "This Record is Already Exists");
                _this.isSubmittingPA = false;
            }
            if (data.d == "3") {
                _this.showToast('danger', "Unsucessfull, Try again!!!");
                _this.isSubmittingPA = false;
            }
            else if (data.d >= "1") {
                _this.showToast('success', "Updated Successfully.");
                _this.isPostAdvertisementFormVisible = false;
                _this.isDesiredConsumerSegmentVisible = false;
                _this.isConsumerSegmentAdvertisementVisible = false;
                _this.AdvertisementImages(parseInt(advertisementId));
                _this.ClearText();
                //this.RemoveTableSalesAdvertisement();
                //this.ViewAllSalesAdvertisement();
                //$('#divsave').css("visibility", "hidden");
                //$('#divImage').css("display", "none");
                //$('#btnUpdate').css("visibility", "hidden");
                //$("#btnAddNew").attr("disabled", true);
                _this.cdr.detectChanges();
            }
        });
    };
    ListPropertiesComponent.prototype.resetPostForm = function () {
        debugger;
        this.ClearText();
    };
    ListPropertiesComponent.prototype.cancelPostForm = function () {
        this.isPostAdvertisementFormVisible = false;
    };
    ListPropertiesComponent.prototype.ClearText = function () {
        $("#subCatHome").removeClass("active");
        $("#subCatTownHome").removeClass("active");
        $("#subCatMultiFamily").removeClass("active");
        $("#subCatLand").removeClass("active");
        this.PostAdvertisement.get('titlePA').setValue('');
        //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
        this.PostAdvertisement.get('stAddressPA').setValue('');
        //this.PostAdvertisement.get('contactNoPA').setValue('');
        this.PostAdvertisement.get('descPA').setValue('');
        this.PostAdvertisement.get('countryPA').setValue('');
        //this.stateDataPA = null;
        //this.zipCodeDataPA = null;
        this.PostAdvertisement.get('cityPA').setValue('');
        this.PostAdvertisement.get('pricePA').setValue('');
        this.PostAdvertisement.get('subCat').setValue('');
        $("#SubCategory").html('');
    };
    ListPropertiesComponent.prototype.PostAds = function () {
        var _this = this;
        debugger;
        this.listpropertiesService
            .AssociateCardExists()
            .subscribe(function (data) {
            debugger;
            //this.InsertPostAdvsData();
            //this line will be removed later
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("CheckAssoCard");
                if (parseInt($(docs).find("id").text()) >= 1) {
                    _this.InsertPostAdvsData();
                }
                else {
                    _this.onOpenModalClick();
                    //$('#completeConsumerProfile').modal('show');
                }
            }
            else {
                _this.isSubmittingPA = false;
                _this.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!");
            }
        });
    };
    ListPropertiesComponent.prototype.InsertPostAdvsData = function () {
        var _this = this;
        debugger;
        // var check = this.Valid1();
        // if (check == '0') {
        this.listpropertiesService
            .CountAssociateAdvertisements()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                var xmlDoc1 = $.parseXML(data.d);
                var xml1 = $(xmlDoc1);
                var docs1 = xml1.find("AssociateAdvertisements");
                var thisStatus = _this;
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
            else {
                _this.isSubmittingPA = false;
                _this.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!");
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
    };
    ListPropertiesComponent.prototype.PayAmount = function () {
        debugger;
        var msg = [];
        var totalAmount = this.PostAdvertisement.get('lblzipCodeprice').value; // $("#lblzipCodeprice").text();
        this.PaidAmountForPurchaseAdvertisement(totalAmount, this.PostAdvertisement.get('titlePA').value, this.PostAdvertisement.get('subCat').value);
    };
    ListPropertiesComponent.prototype.PaidAmountForPurchaseAdvertisement = function (totalAmount, title, subcategory) {
        var _this = this;
        debugger;
        this.listpropertiesService
            .InsertAmount(totalAmount, title, subcategory)
            .subscribe(function (data) {
            debugger;
            if (parseInt(data.d) == 1) {
                var CategoryId = 1;
                var subCategoryId = $("#SubCategory").val();
                //this.PostAdvertisement.get('');
                var title = _this.PostAdvertisement.get('titlePA').value;
                var featurs = _this.PostAdvertisement.get('additionalFeature').value;
                ; //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                var address = _this.PostAdvertisement.get('stAddressPA').value;
                var contactNo = _this.PostAdvertisement.get('contactNoPA').value;
                var description = _this.PostAdvertisement.get('descPA').value;
                var countryID = _this.PostAdvertisement.get('countryPA').value;
                var stateID = _this.PostAdvertisement.get('statePA').value.value;
                var cityId = _this.PostAdvertisement.get('cityPA').value;
                var price = _this.PostAdvertisement.get('pricePA').value;
                var zipcod = _this.PostAdvertisement.get('zipCodePA').value.value;
                var isFeatured = 0;
                var jobtype = 1;
                var amount = 0;
                var adsPrice = _this.PostAdvertisement.get('lblzipCodeprice').value;
                if (price == "") {
                    amount = 0;
                }
                else {
                    amount = parseInt(price);
                }
                _this.SavePostAdvertisementsData(CategoryId, subCategoryId, title, featurs, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice);
                _this.isSubmittingPA = false;
            }
            else {
                _this.isSubmittingPA = false;
                _this.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!");
            }
        });
    };
    ListPropertiesComponent.prototype.SavePostAdvertisementsData = function (CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice) {
        var _this = this;
        debugger;
        this.listpropertiesService
            .InsertSale(CategoryId, subCategoryId, title, features, address, contactNo, description, countryID, stateID, cityId, zipcod, isFeatured, jobtype, amount, adsPrice)
            .subscribe(function (data) {
            debugger;
            if (parseInt(data.d) >= 1) {
                _this.PurchasedCategorybyAssociate(1, subCategoryId, 1, 0, 0, 0, 0, 0);
                $("#subCatHome").removeClass("active");
                $("#subCatTownHome").removeClass("active");
                $("#subCatMultiFamily").removeClass("active");
                $("#subCatLand").removeClass("active");
                _this.PostAdvertisement.get('titlePA').setValue('');
                //CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                _this.PostAdvertisement.get('stAddressPA').setValue('');
                _this.PostAdvertisement.get('contactNoPA').setValue('');
                _this.PostAdvertisement.get('descPA').setValue('');
                _this.PostAdvertisement.get('countryPA').setValue('');
                _this.stateDataPA = null;
                _this.zipCodeDataPA = null;
                _this.PostAdvertisement.get('cityPA').setValue('');
                _this.PostAdvertisement.get('pricePA').setValue('');
                _this.PostAdvertisement.get('subCat').setValue('');
                $("#SubCategory").html('');
                //this.PostAdvertisement.get('titlePA').setValue('');
                ////CKEDITOR.instances.txtFeatures.getData();// $("#ContentPlaceHolder1_txtFeatures").val();
                //this.PostAdvertisement.get('stADdressPA').setValue('');
                //this.PostAdvertisement.get('contactNoPA').setValue('');
                //this.PostAdvertisement.get('descPA').setValue('');
                //this.PostAdvertisement.get('cityPA').setValue('');
                //this.PostAdvertisement.get('pricePA').setValue('0');
                debugger;
                _this.AdvertisementImages(parseInt(data.d));
            }
            else {
                _this.showToast('danger', "We can not complete this sales Advertisement Purchase at this time!!");
                _this.showToast('danger', "Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at <b>866.456.7331.</b>");
            }
            _this.isSubmittingPA = false;
            _this.cdr.detectChanges();
        }, function (error) {
            _this.isSubmittingPA = false;
            return 0;
        });
    };
    ListPropertiesComponent.prototype.AdvertisementImages = function (rowID) {
        debugger;
        var thisStatus = this;
        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;
        var test = new FormData();
        var secondupload = $("#FileUpload2").get(0);
        var files2 = secondupload.files;
        var thirdupload = $("#FileUpload3").get(0);
        var files3 = thirdupload.files;
        var fourthupload = $("#FileUpload4").get(0);
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
                $("#image-holder").empty();
                $("#image-holder2").empty();
                $("#image-holder3").empty();
                $("#image-holder4").empty();
                $("#Allimage-holder").empty();
                $("#Allimage-holder1").empty();
                $("#Allimage-holder2").empty();
                $("#Allimage-holder3").empty();
                $("#btnAddNew").removeAttr('disabled');
                thisStatus.ClearText();
                thisStatus.RemoveTableSalesAdvertisement();
                thisStatus.ViewAllSalesAdvertisement();
                thisStatus.isSubmittingPA = false;
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
                thisStatus.showToast('success', "Successfully Sales Advertisment Purchased!");
                thisStatus.showToast('success', "Your credit card has been Successfully charged!!!");
                thisStatus.cdr.detectChanges();
            },
            error: function (err) {
                alert(err.statusText);
                this.isSubmittingPA = false;
                this.showToast('danger', "Something went wrong, We can not complete this sales Advertisement Purchase at this time. Refresh Page!!");
            }
        });
    };
    ListPropertiesComponent.prototype.PurchasedCategorybyAssociate = function (CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration) {
        debugger;
        this.listpropertiesService
            .InsertCatgoryPostAds(CatID, SubCatID, PlanID, Price, Zipcode, CouponCode, Discount, Duration)
            .subscribe(function (data) {
            return data.d;
        });
    };
    ListPropertiesComponent.prototype.PurchaseSalesCategory = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var SubCategoryPrice;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listpropertiesService
                            .AssociateCategoryExistsOrNot()
                            .subscribe(function (data) {
                            if (data.d.length > 0) {
                                var xmlDoc1 = $.parseXML(data.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("CatExists");
                                var thisStatus = _this;
                                $.each(docs1, function (i, docs1) {
                                    if (parseInt($(docs1).find("cnt").text()) > 0) {
                                        SubCategoryPrice = 0;
                                    }
                                    else {
                                        SubCategoryPrice = 20;
                                    }
                                });
                                var CategoryID = _this.categorySearchForm.get('categorySearch').value != null ? _this.categorySearchForm.get('categorySearch').value.value : null;
                                var subCategoryID = _this.categorySearchForm.get('subCategorySearch').value != null ? _this.categorySearchForm.get('subCategorySearch').value.value : null;
                                var CategoryName = _this.categorySearchForm.get('categorySearch').value != null ? _this.categorySearchForm.get('categorySearch').value.label : null;
                                var SubCategoryName = _this.categorySearchForm.get('subCategorySearch').value != null ? _this.categorySearchForm.get('subCategorySearch').value.label : null;
                                _this.listpropertiesService
                                    .InsertDNew(CategoryID, subCategoryID, CategoryName, SubCategoryName, SubCategoryPrice)
                                    .subscribe(function (data) {
                                    if (data.d == "1") {
                                        _this.SelectedChoicesForPurchase();
                                    }
                                    if (data.d == "0") {
                                        _this.showToast('danger', 'Failure, Already Exists.!!!');
                                    }
                                    if (data.d == "3") {
                                        _this.showToast('danger', 'Error, Try Again!!!');
                                    }
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListPropertiesComponent.prototype.BindCityWiseStatesPA = function (city) {
        var _this = this;
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
                        thisStatus.startValueStatePA = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                    }
                    arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                });
                if (arrState == null || arrState == undefined || arrState.length <= 0) {
                    _this.formErrorMessagePA = "City is not valid. Please, Try Again!";
                    _this.startValueStatePA = { 'value': '', 'label': '' };
                    _this.stateDataPA = [];
                }
                else {
                    _this.stateDataPA = arrState;
                }
            }
        });
    };
    ListPropertiesComponent.prototype.BindStateWiseZipCodeForSearch = function (state, city, startZipCode) {
        var _this = this;
        if (startZipCode === void 0) { startZipCode = null; }
        debugger;
        if (city != "" && city !== undefined && state != null) {
            var countryId = "US"; //this.cardForm.get('country').value;
            this.paymentService
                .bindStateWiseZipCode(state, city)
                .subscribe(function (data) {
                debugger;
                if (data.d.length > 0 && data.d != "Not Valid") {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("CityWiseZip");
                    var arrState = [];
                    //arrState.push({ "value": "-1", "label": "Select Zip Code" });
                    //this.startValueZip = '';
                    var thisStatus = _this;
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
                        _this.formErrorMessagePA = "City/State Combination is not valid. Choose again!";
                        //this.switchNgBTab('cityStateTabId');
                        //$('#cityStateTabId').tab('show');
                    }
                    else {
                        _this.zipCodeDataPA = arrState;
                        //this.switchNgBTab('zipCodeTabId');
                        //$('#zipCodeTabId').tab('show');
                    }
                }
                else {
                    _this.zipCodeDataPA = [];
                }
            });
        }
    };
    ListPropertiesComponent.prototype.BindAllCategory = function () {
        var _this = this;
        this.listpropertiesService
            .BindAllCategories()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("JobCategories");
                var cartd = [];
                var thisStatus = _this;
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
                _this.categorySearchData = cartd;
            }
        });
    };
    ListPropertiesComponent.prototype.BindCategory = function (jobCat) {
        this.listpropertiesService
            .AssociatePurchasedCategory(jobCat)
            .subscribe(function (data) {
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
    };
    ListPropertiesComponent.prototype.BindassociateSubCategory = function () {
        var _this = this;
        debugger;
        var value = this.categorySearchForm.get('categorySearch').value != null ? this.categorySearchForm.get('categorySearch').value.value : null;
        if (value != null) {
            this.listpropertiesService
                .BindAssociateCategory(value)
                .subscribe(function (data) {
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("associateCategories");
                    var cartd = [];
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
                    _this.subCategorySearchData = cartd;
                }
            });
        }
    };
    ListPropertiesComponent.prototype.CountAssociateCategory = function () {
        var _this = this;
        this.listpropertiesService
            .CountPurchasedCategories()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("TotalAds");
                var thisStatus_2 = _this;
                $.each(docs, function (i, docs) {
                    thisStatus_2.totalCountOfItemsPurchased = parseInt($(docs).find("Total").text());
                    // $("#lblPurchaseCategories").text($(docs).find("Total").text());
                });
                _this.cdr.detectChanges();
            }
        });
    };
    ListPropertiesComponent.prototype.changeCityPA = function () {
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
    };
    ListPropertiesComponent.prototype.changeStatePA = function () {
        debugger;
        this.markAsDirty();
        var state = this.PostAdvertisement.get('statePA').value != null ? this.PostAdvertisement.get('statePA').value.value : null;
        var city = this.PostAdvertisement.get('cityPA').value;
        this.BindStateWiseZipCodeForSearch(state, city);
    };
    ListPropertiesComponent.prototype.changeZipCodePA = function () {
        var _this = this;
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
                .subscribe(function (data) {
                if (data.d.length > 0) {
                    var xmlDoc = $.parseXML(data.d);
                    var xml = $(xmlDoc);
                    var docs = xml.find("GetPricePostAdvts");
                    var thisStatus = _this;
                    $.each(docs, function (i, docs) {
                        thisStatus.PostAdvertisement.get('lblzipCodeprice').setValue($(docs).find("price").text());
                        //$('#btnSubmit').css("background-color", "rgb(33, 150, 243)");
                        //this.IsP
                        //$('#btnSubmit').prop('disabled', false);
                    });
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
    };
    ListPropertiesComponent.prototype.changeCategorySearch = function () {
        this.BindassociateSubCategory();
    };
    ListPropertiesComponent.prototype.changeSubCategorySearch = function () {
        var catID = this.categorySearchForm.get('categorySearch').value != null ? this.categorySearchForm.get('categorySearch').value.value : null;
        if (catID != null) {
            $("#divSelectedChce").css("display", "block");
            this.PurchaseSalesCategory();
            $("#ViewAllPurchasedRcd").css("visibility", "visible");
            $("#Shop").show();
            this.BindMembership();
            $('#MemberShip').val('1');
        }
    };
    ListPropertiesComponent.prototype.onclickNewPurchase = function () {
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
    };
    ListPropertiesComponent.prototype.markAsDirty = function () {
        var subCat = this.PostAdvertisement.get('subCat').value;
        var imageText = this.PostAdvertisement.get('image').value;
        if (subCat == '' || subCat === undefined || subCat == null) {
            this.PostAdvertisement.get('subCat').markAsUntouched();
            this.PostAdvertisement.get('subCat').markAsDirty();
        }
        if (imageText == '' || imageText === undefined || imageText == null) {
            this.PostAdvertisement.get('image').markAsUntouched();
        }
    };
    ListPropertiesComponent.prototype.changeConsumerSegmentType = function (type) {
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
    };
    ListPropertiesComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
        });
    };
    ListPropertiesComponent.prototype.Valid1 = function () {
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
    };
    ListPropertiesComponent.prototype.onOpenModalClick = function () {
        var _this = this;
        debugger;
        var modal = this.modalService.open(PaymentModalComponent, { size: 'lg', backdrop: "static" });
        var modalComponent = modal.componentInstance;
        modal.componentInstance.dismissParentCall.subscribe(function (data) {
            debugger;
            console.log(data);
            //this.overlayLoadingOnPurchase = false;
        });
        modal.componentInstance.updateParentCall.subscribe(function (data) {
            //modal.result.then(
            //    (result) => {
            debugger;
            _this.PostAds();
            //var row = this.dTableSearching.fnGetPosition($(this).closest('tr')[0]);
            //var rowData = this.dTableSearching.fnGetData(row);
            //// var rowColumns = rowData[rowData.length - 1];
            //var id = rowData['id'];
            //var zipCode = rowData['Zipcode'];
            //var categoryText = rowData['CategoryName'];
            //var subCategoryText = rowData['SubCategoryName'];
            //var priceValues = rowData['Price'];
            //var categoryId = rowData['CategoryId'];
            //var subCategoryId = rowData['SubCategoryId'];
            //this.CheckOutClick(categoryText, subCategoryText, categoryId, subCategoryId, '1', priceValues, zipCode);
            //this.updateBindings();
        }, function () { });
    };
    tslib_1.__decorate([
        ViewChild('FileUpload1'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ListPropertiesComponent.prototype, "fileUpload1", void 0);
    tslib_1.__decorate([
        ViewChild('FileUpload2'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ListPropertiesComponent.prototype, "fileUpload2", void 0);
    tslib_1.__decorate([
        ViewChild('FileUpload3'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ListPropertiesComponent.prototype, "fileUpload3", void 0);
    tslib_1.__decorate([
        ViewChild('FileUpload4'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ListPropertiesComponent.prototype, "fileUpload4", void 0);
    ListPropertiesComponent = tslib_1.__decorate([
        Component({
            selector: 'list-properties',
            templateUrl: './list-properties.component.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ActivatedRoute, Router, PaymentService, XMLToJSON,
            FormBuilder, ListPropertiesService, PurchaseZipCodeService, NgbModal,
            NgZone, Lightbox, Toaster])
    ], ListPropertiesComponent);
    return ListPropertiesComponent;
}());
export { ListPropertiesComponent };
var data = [
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
//# sourceMappingURL=list-properties.component.js.map