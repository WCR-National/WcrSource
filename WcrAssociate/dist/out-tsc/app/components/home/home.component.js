import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { SearchService, MessageService } from '../../services/search';
import { Router } from '@angular/router';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(fb, renderer, searchService, platformId, _messageService, router) {
        var _this = this;
        this.fb = fb;
        this.renderer = renderer;
        this.searchService = searchService;
        this.platformId = platformId;
        this._messageService = _messageService;
        this.router = router;
        this.isSearchingStart = false;
        this.resultContent = false;
        this.errorMessage = "";
        this.show_check = false;
        this.innerHtmlSales = '';
        this.innerHtmlServices = '';
        this.errorExist = false;
        //'required': 'Please enter City, State OR Zip Code.',
        //'invalidData': 'Invalid data entered.  Please enter City, State OR Zip Code.',
        //'zipCode': 'Maximum length of zip code is 5 digit',
        //'invalidZipCode': 'Please enter valid zip code (digits Only for zip Code)',
        //'statePattern': 'Please enter 2 Characters for State like "TX".',
        //'cityStatePattern': 'Please enter valid city state like "Dallas, TX" OR "Dallas, Texas"'
        this.validationMessages = {
            'required': 'Please enter City, State OR Zip Code.',
            'invalidData': 'Invalid data entered.  Please enter city, state OR zip code.',
            'zipCode': 'Please enter 5 digit zip code',
            'invalidZipCode': 'Please enter valid zip code (digits only for zip code)',
            'statePattern': 'Please enter 2 characters for state like "TX".',
            'cityStatePattern': 'Please enter valid format like "Dallas, TX" OR "Dallas, Texas"'
        };
        this.formErrors = {
            'txtSearch': ''
        };
        this._messageService.listen().subscribe(function (m) {
            console.log(m);
            _this.GetSalesAdts();
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        //this.show_check = true;
        $('html, body').animate({ scrollTop: $('#header-container').offset().top }, 'slow');
        $('#divLandingPage').focus();
        this.parallaxBG();
        //this.GetSalesAdts();
        this.initializeFormsAndEvents();
    };
    HomeComponent.prototype.initializeFormsAndEvents = function () {
        var _this = this;
        this.searchForm = this.fb.group({
            txtSearch: ['', [Validators.required, validateSearchZipCode(this)]],
        });
        this.searchForm.get('txtSearch').valueChanges.subscribe(function (data) {
            _this.errorMessage = "";
        });
        this.searchForm.valueChanges.subscribe(function (data) {
            _this.logValidationErrors(_this.searchForm);
        });
    };
    HomeComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.searchForm; }
        this.errorExist = false;
        Object.keys(group.controls).forEach(function (key) {
            var abstractControl = group.get(key);
            _this.formErrors[key] = '';
            if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                _this.formErrors[key] = "";
                var messages = _this.validationMessages;
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                _this.formErrors[key] += messages[errorKey] + ' ';
                                _this.errorExist = true;
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
    HomeComponent.prototype.onPressEnterSearchData = function () {
        if (!this.errorExist) {
            this.searching();
        }
        //if (txtSearch.value == "") {
        //    $("#lblfai").css("display", "block");
        //    $("#lblfai").text("Please enter City, State OR Zip Code.");
        //}
        //else {
        //$("#pageloader").css("display", "block");
        //$("#homeicon").css("display", "inline-block");
        //setTimeout(function () {
        // }, 500);
        //}
    };
    HomeComponent.prototype.onClickSearch = function () {
        if (!this.errorExist) {
            this.searching();
        }
    };
    HomeComponent.prototype.searching = function () {
        this.resultContent = false;
        this.isSearchingStart = true;
        //if (isPlatformBrowser(this.platformId)) {
        //    this.divSalesServices.nativeElement.focus();
        //    //this.myInput.nativeElement.focus();
        //}
        $; //('#salesServicesDivId').focusin();
        $('html, body').animate({ scrollTop: $('#salesServicesDivId').offset().top }, 'slow');
        //focus the div which will show the result
        //show the loading icon
        var searchValue = this.searchForm.get('txtSearch').value;
        if ($.isNumeric(searchValue)) {
            var salesHtml = void 0;
            var servicesHtml = void 0;
            salesHtml = this.bindSalesCategory(searchValue);
            servicesHtml = this.bindServiesCategory(searchValue);
            //this.innerHtmlSales = salesHtml;
            //this.innerHtmlServices = servicesHtml;
        }
        else {
            if (searchValue.indexOf(',') != -1) {
                var State = void 0;
                var City = void 0;
                var salesHtml = void 0;
                var servicesHtml = void 0;
                var strSearchValue = searchValue.split(',');
                for (var i = 0; i < strSearchValue.length; i++) {
                    if (i == 0) {
                        City = strSearchValue[i];
                    }
                    else if (i == 1) {
                        State = $.trim(strSearchValue[i]);
                    }
                }
                //if (State.length == 2) {
                salesHtml = this.bindSalesCategoryCityWise(State, City);
                servicesHtml = this.bindServiesCategoryCityWise(State, City);
                //this.innerHtmlSales = salesHtml;
                //this.innerHtmlServices = servicesHtml;
                //console.log(this.innerHtmlSales);
                //console.log(this.innerHtmlServices);
                //}
                //else if (State.length >= 2) {
                //    $('html, body').animate({ scrollTop: $('#divLandingPage').offset().top }, 'slow');
                //    this.errorMessage = "Please enter 2 Characters for State.";
                //    this.isSearchingStart = false;
                //}
            }
            else {
                this.errorMessage = "Invalid data entered.  Please enter City, State OR Zip Code.";
                this.isSearchingStart = false;
            }
        }
    };
    // Init
    HomeComponent.prototype.parallaxBG = function () {
        $('.parallax').prepend('<div class="parallax-overlay"></div>');
        $(".parallax").each(function () {
            var attrImage = $(this).attr('data-background');
            var attrColor = $(this).attr('data-color');
            var attrOpacity = $(this).attr('data-color-opacity');
            if (attrImage !== undefined) {
                $(this).find(".parallax-overlay").css('background-image', 'url(' + attrImage + ')');
            }
            if (attrColor !== undefined) {
                $(this).find(".parallax-overlay").css('background-color', '' + attrColor + '');
            }
        });
    };
    //managed both in these both functions: By IPAddrss zipCode and user entered zipCode in search
    HomeComponent.prototype.bindSalesCategory = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlSales, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                $('#innerHtmlSales').html("");
                this.innerHtmlSales = "";
                innerHtmlSales = "";
                thisHomePage = this;
                console.log('executed');
                thisHomePage.searchService
                    .subCategoriesByZipcode(zipc)
                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var xmlDoc, xml, docs_1, results_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.d.length > 1)) return [3 /*break*/, 2];
                                xmlDoc = $.parseXML(data.d);
                                xml = $(xmlDoc);
                                docs_1 = xml.find("subCategories");
                                return [4 /*yield*/, Promise.all(docs_1.map(function (t) { return thisHomePage.searchService.viewAdvanceSearchByZipcode(zipc, $(docs_1[t]).find("id").text()); }).ajaxSuccess(function (success) {
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results_1 = _a.sent();
                                console.log(results_1);
                                $.each(docs_1, function (i, doc) {
                                    var flag = 0;
                                    //for (const doc in docs) {
                                    $.each(results_1, function (i, data) {
                                        if (data.d.length > 0 && data.d.includes('GetCategoriesinfo1')) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfo1");
                                            console.log('executed');
                                            if ($(doc).find("id").text() == $(docs1[0]).find("Subcategoryid").text()) {
                                                innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30'>";
                                                innerHtmlSales += "   <div class='card-main white darken-1' >";
                                                $.each(docs1, function (i, doc1) {
                                                    console.log($(doc).find("id").text() + ',' + $(doc1).find("Subcategoryid").text());
                                                    if ($(doc).find("id").text() == $(doc1).find("Subcategoryid").text()) {
                                                        var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                                        ////innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                                        //innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(doc1).find("advMainImage").text()) + "'  alt=''/></i></span></a>";
                                                        //innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
                                                        //innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                                        //innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                                        innerHtmlSales += "     <div class='card-main-content pd-0-force card-main-image-section card-main-image-section' >";
                                                        innerHtmlSales += "         <img class='card-main-image-size' src='../../../Associate/Adv_img/" + ($(doc1).find("advMainImage").text()) + "'  alt=''/>";
                                                        innerHtmlSales += "     </div>";
                                                        innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-force">';
                                                        innerHtmlSales += '         <span class="card-main-title">' + ($(doc).find("name").text()) + '</span>';
                                                        innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(doc).find("detail").text()) + "</p>";
                                                        innerHtmlSales += "     </div>";
                                                        innerHtmlSales += '       <div class="card-main-action text-center">';
                                                        innerHtmlSales += "           <a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a>";
                                                        innerHtmlSales += '      </div>';
                                                        flag = 1;
                                                    }
                                                });
                                                innerHtmlSales += '   </div>';
                                                innerHtmlSales += "</div>";
                                            }
                                        }
                                        else {
                                        }
                                    });
                                    if (!data.d.includes("GetCategoriesinfo1")) {
                                        if (flag == 1) { }
                                        else {
                                            innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30'>";
                                            innerHtmlSales += "   <div class='card-main white darken-1' >";
                                            innerHtmlSales += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                            innerHtmlSales += "         <img  class='image-size-icons-without-ip' src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(doc).find("id").text()) + "'  alt=''/>";
                                            innerHtmlSales += "     </div>";
                                            innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-force">';
                                            innerHtmlSales += '         <span class="card-main-title">' + ($(doc).find("name").text()) + '</span>';
                                            innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(doc).find('detail').text()) + "</p>";
                                            innerHtmlSales += "     </div>";
                                            innerHtmlSales += '       <div class="card-main-action text-center">';
                                            innerHtmlSales += "           <a class='waves-effect waves-light btn' href='SalesAdvertisementList.html ? ca = 0 & id=" + ($(doc).find("id").text()) + " & zipcode=" + zipc + " & name=" + ($(doc).find("name").text()) + " & jtype=Sales & catName=RealEstate'>View More</a>";
                                            innerHtmlSales += '      </div>';
                                            innerHtmlSales += '   </div>';
                                            innerHtmlSales += "</div>";
                                        }
                                    }
                                });
                                //$('#innerHtmlSales').html(innerHtmlSales);
                                //thisHomePage.innerHtmlSales = innerHtmlSales;
                                thisHomePage.innerHtmlSales = innerHtmlSales;
                                thisHomePage.resultContent = true;
                                return [3 /*break*/, 2];
                            case 2:
                                thisHomePage.isSearchingStart = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { thisHomePage.isSearchingStart = false; });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.bindServiesCategory = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlServices, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                //$('#innerHtmlServices').html("");
                this.innerHtmlServices = "";
                innerHtmlServices = "";
                thisHomePage = this;
                thisHomePage.searchService
                    .getJobtypeWiseCategoryByZipcode()
                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var xmlDoc, xml, docs, results_2;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.d.length > 1)) return [3 /*break*/, 2];
                                xmlDoc = $.parseXML(data.d);
                                xml = $(xmlDoc);
                                docs = xml.find("JobCategories");
                                return [4 /*yield*/, Promise.all(docs.map(function (t) { return thisHomePage.searchService.getViewAdvanceSearchForServices($(docs[t]).find("ID").text(), zipc); }).ajaxSuccess(function (success) {
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results_2 = _a.sent();
                                console.log(results_2);
                                $.each(docs, function (i, docs) {
                                    var flag = 0;
                                    var categoryId = $(docs).find("ID").text();
                                    $.each(results_2, function (i, data) {
                                        if (data.d.length > 0 && data.d.includes('GetCategoriesinfoservices')) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfoservices");
                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30'>";
                                                innerHtmlServices += "  <div class='card-main white darken-1' >";
                                                $.each(docs1, function (i, docs1) {
                                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                        console.log('entered in ' + searchByIpOrtxtSearch);
                                                        var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                                        ////innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                                        //innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span>";
                                                        //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                                        //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                                                        //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                                        innerHtmlServices += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                                        innerHtmlServices += "         <img class='card-main-image-size' src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/>";
                                                        innerHtmlServices += "     </div>";
                                                        innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-force">';
                                                        innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                                        innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                                        innerHtmlServices += "     </div>";
                                                        innerHtmlServices += '       <div class="card-main-action text-center">';
                                                        innerHtmlServices += "           <a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a>";
                                                        innerHtmlServices += '      </div>';
                                                        flag = 1;
                                                    }
                                                    else { }
                                                });
                                                innerHtmlServices += '   </div>';
                                                innerHtmlServices += "</div>";
                                            }
                                            else { }
                                        }
                                        else {
                                        }
                                    });
                                    if (!data.d.includes("GetCategoriesinfoservices")) {
                                        if (flag == 1) { }
                                        else {
                                            var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";
                                            //innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                                            //innerHtmlServices += " <div class='fullrow innerblock card-main pd-20 mg-b-30'>";
                                            //innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span>";
                                            //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                            //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "</p>";
                                            //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                            innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30'>";
                                            innerHtmlServices += "  <div class='card-main white darken-1' >";
                                            innerHtmlServices += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                            innerHtmlServices += "         <img class='image-size-icons-without-ip' src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/>";
                                            innerHtmlServices += "     </div>";
                                            innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-force">';
                                            innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                            innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                            innerHtmlServices += "     </div>";
                                            innerHtmlServices += '       <div class="card-main-action text-center">';
                                            innerHtmlServices += "           <a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a>";
                                            innerHtmlServices += '      </div>';
                                            innerHtmlServices += '   </div>';
                                            innerHtmlServices += "</div>";
                                        }
                                    }
                                });
                                thisHomePage.innerHtmlServices = innerHtmlServices;
                                //$('#innerHtmlServices').html(innerHtmlServices);
                                //thisHomePage. = innerHtmlServices;
                                thisHomePage.resultContent = true;
                                return [3 /*break*/, 2];
                            case 2:
                                thisHomePage.isSearchingStart = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { thisHomePage.isSearchingStart = false; });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.bindSalesCategoryCityWise = function (state, city) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlSales, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                innerHtmlSales = "";
                this.innerHtmlSales = "";
                thisHomePage = this;
                thisHomePage.searchService
                    .getSalesCategoryCityWise(state, city)
                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var xmlDoc, xml, docs, subCategoryId, results_3;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.d.length > 1)) return [3 /*break*/, 2];
                                xmlDoc = $.parseXML(data.d);
                                xml = $(xmlDoc);
                                docs = xml.find("subCategories");
                                subCategoryId = $(docs).find("id").text();
                                return [4 /*yield*/, Promise.all(docs.map(function (t) { return thisHomePage.searchService.getAdvanceSearchCityStateWise(state, city, $(docs[t]).find("id").text()); }).ajaxSuccess(function (success) {
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results_3 = _a.sent();
                                console.log(results_3);
                                $.each(docs, function (i, docs) {
                                    var flag = 0;
                                    var subCategoryId = $(docs).find("id").text();
                                    $.each(results_3, function (i, data) {
                                        //thisHomePage.searchService
                                        //    .getAdvanceSearchCityStateWise(state, city, subCategoryId)
                                        //    .then(
                                        //        (data: any) => {
                                        if (data.d.length > 0 && data.d.includes('GetCategoriesinfoCity')) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfoCity");
                                            if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                                innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30'>";
                                                innerHtmlSales += "  <div class='card-main white darken-1' >";
                                                $.each(docs1, function (i, docs1) {
                                                    if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                                        var urlToSalesAdvertisement = 'SalesAdvertisementList.html?ca=0&id="' + ($(docs).find("id").text()) + '"&zipcode="' + $(docs1).find("Zipcode").text() + '"&name="' + ($(docs).find("name").text()) + '"&jtype=Sales&catName=RealEstate';
                                                        //innerHtmlSales += "<a href='" + urlToSalesAdvertisement + "'>";
                                                        //innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span>";
                                                        //innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";
                                                        //innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                                        //innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                                        innerHtmlSales += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                                        innerHtmlSales += "         <img class='card-main-image-size' src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/>";
                                                        innerHtmlSales += "     </div>";
                                                        innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-force">';
                                                        innerHtmlSales += '         <span class="card-main-title">' + ($(docs).find("name").text()) + '</span>';
                                                        innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(docs).find("detail").text()) + "</p>";
                                                        innerHtmlSales += "     </div>";
                                                        innerHtmlSales += '       <div class="card-main-action text-center">';
                                                        innerHtmlSales += "           <a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a>";
                                                        innerHtmlSales += '      </div>';
                                                        flag = 1;
                                                    }
                                                    else { }
                                                });
                                                innerHtmlSales += '   </div>';
                                                innerHtmlSales += '   </div>';
                                            }
                                        }
                                        else {
                                        }
                                    }
                                    //,
                                    //err => {
                                    //    thisHomePage.isSearchingStart = false;
                                    //}
                                    );
                                    if (!data.d.includes('GetCategoriesinfoCity')) {
                                        if (flag == 1) { }
                                        else {
                                            //innerHtmlSales += " <div class='col-sm-3 text-center block '>";
                                            //innerHtmlSales += " <div class='fullrow innerblock card-main pd-20 mg-b-30'>";
                                            var urlToSalesAdvertisement = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                            //innerHtmlSales += "<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>";
                                            //innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span>";
                                            //innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";
                                            //innerHtmlSales += "</a><p class='grey-text elipsis-text' style = 'text-align:left;' > " + ($(docs).find("detail").text()) + " </p>";
                                            //innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                            innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center mg-t-30'>";
                                            innerHtmlSales += "  <div class='card-main white darken-1' >";
                                            innerHtmlSales += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                            innerHtmlSales += "         <img  class='image-size-icons-without-ip' src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'  alt=''/>";
                                            innerHtmlSales += "     </div>";
                                            innerHtmlSales += '      <div class="card-main-content black-text pd-b-0-force">';
                                            innerHtmlSales += '         <span class="card-main-title">' + ($(docs).find("name").text()) + '</span>';
                                            innerHtmlSales += "         <p class='grey-text elipsis-text'>" + ($(docs).find("detail").text()) + "</p>";
                                            innerHtmlSales += "     </div>";
                                            innerHtmlSales += '       <div class="card-main-action text-center">';
                                            innerHtmlSales += "           <a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a>";
                                            innerHtmlSales += '      </div>';
                                            innerHtmlSales += '   </div>';
                                            innerHtmlSales += "</div>";
                                        }
                                    }
                                });
                                //$('#innerHtmlSales').html(innerHtmlSales);
                                thisHomePage.innerHtmlSales = innerHtmlSales;
                                thisHomePage.resultContent = true;
                                return [3 /*break*/, 2];
                            case 2:
                                thisHomePage.isSearchingStart = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) {
                    thisHomePage.isSearchingStart = false;
                });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.bindServiesCategoryCityWise = function (state, city) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlServices, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                innerHtmlServices = "";
                this.innerHtmlServices = "";
                thisHomePage = this;
                thisHomePage.searchService
                    .getServicesCategoryCityWise(state, city)
                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var xmlDoc, xml, docs, results_4;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.d.length > 1)) return [3 /*break*/, 2];
                                xmlDoc = $.parseXML(data.d);
                                xml = $(xmlDoc);
                                docs = xml.find("JobCategories");
                                return [4 /*yield*/, Promise.all(docs.map(function (t) { return thisHomePage.searchService.getAdvanceSearchServicesCityStateWise(state, city, $(docs[t]).find("ID").text()); }).ajaxSuccess(function (success) {
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results_4 = _a.sent();
                                $.each(docs, function (i, docs) {
                                    var flag = 0;
                                    var subCategoryId = $(docs).find("ID").text();
                                    $.each(results_4, function (i, data) {
                                        //thisHomePage.searchService
                                        //    .getAdvanceSearchServicesCityStateWise(state, city, subCategoryId)
                                        //    .then(
                                        //        (data: any) => {
                                        if (data.d.length > 0 && data.d.includes('GetsubCategoriesinfoservices')) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetsubCategoriesinfoservices");
                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                                                innerHtmlServices += "  <div class='card-main white darken-1' >";
                                                $.each(docs1, function (i, docs1) {
                                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                        var urlToSalesAdvertisement = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                                        //innerHtmlServices += "<a href='" + urlToSalesAdvertisement + "'>";
                                                        //innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a>";
                                                        //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                                        //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                                        //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                                        innerHtmlServices += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                                        innerHtmlServices += "         <img class='card-main-image-size' src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/>";
                                                        innerHtmlServices += "     </div>";
                                                        innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-force">';
                                                        innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                                        innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                                        innerHtmlServices += "     </div>";
                                                        innerHtmlServices += '       <div class="card-main-action text-center">';
                                                        innerHtmlServices += "           <a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a>";
                                                        innerHtmlServices += '      </div>';
                                                        flag = 1;
                                                    }
                                                    else { }
                                                });
                                                innerHtmlServices += '   </div>';
                                                innerHtmlServices += "</div>";
                                            }
                                            else {
                                            }
                                        }
                                        else {
                                            if (flag == 1) { }
                                            else {
                                            }
                                        }
                                    }
                                    //,
                                    //    err => {
                                    //        thisHomePage.isSearchingStart = false;
                                    //    }
                                    );
                                    if (!data.d.includes('GetsubCategoriesinfoservices')) {
                                        if (flag == 1) { }
                                        else {
                                            innerHtmlServices += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                                            innerHtmlServices += "  <div class='card-main white darken-1' >";
                                            var urlToSalesAdvertisement = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=0&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";
                                            //innerHtmlSales += "<a href=''>";
                                            //innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'/></i></span>";
                                            ////innerHtmlServices += "</a>";
                                            //innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                            //innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                            //innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                            innerHtmlServices;
                                            innerHtmlServices += "     <div class='card-main-content pd-0-force card-main-image-section' >";
                                            innerHtmlServices += "         <img class='image-size-icons-without-ip' src='images/icons/" + ($(docs).find("catImages").text()) + "'/>";
                                            innerHtmlServices += "     </div>";
                                            innerHtmlServices += '      <div class="card-main-content black-text pd-b-0-force">';
                                            innerHtmlServices += '         <span class="card-main-title">' + ($(docs).find("categoryName").text()) + '</span>';
                                            innerHtmlServices += "         <p class='grey-text elipsis-text'>" + ($(docs).find("Detail").text()) + "</p>";
                                            innerHtmlServices += "     </div>";
                                            innerHtmlServices += '       <div class="card-main-action text-center">';
                                            innerHtmlServices += "           <a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a>";
                                            innerHtmlServices += '      </div>';
                                            innerHtmlServices;
                                            innerHtmlServices += '   </div>';
                                            innerHtmlServices += "</div>";
                                        }
                                    }
                                });
                                //$('#innerHtmlServices').html(innerHtmlServices);
                                thisHomePage.innerHtmlServices = innerHtmlServices;
                                thisHomePage.resultContent = true;
                                return [3 /*break*/, 2];
                            case 2:
                                thisHomePage.isSearchingStart = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { thisHomePage.isSearchingStart = false; });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.GetSalesAdts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var globalThis;
            return tslib_1.__generator(this, function (_a) {
                debugger;
                this.resultContent = false;
                this.isSearchingStart = true;
                if ($('#salesServicesDivId') == null) {
                    this.router.navigateByUrl('/');
                }
                $('html, body').animate({ scrollTop: $('#salesServicesDivId').offset().top }, 'slow');
                globalThis = this;
                $.getJSON("http://jsonip.com?callback=?", function (data) {
                    var _IPAddress = data.ip;
                    if (_IPAddress.length > 0) {
                        globalThis.searchService.
                            attemptGetZipCodeByIPAddress(_IPAddress)
                            .then(function (data) {
                            if (data.d.length > 0) {
                                globalThis.bindSalesCategoryByIP(data.d, "ip");
                                globalThis.bindServiesCategoryByIP(data.d, "ip");
                            }
                        });
                    }
                    else {
                        return null;
                    }
                    this.isSearchingStart = false;
                    this.resultContent = true;
                    console.log(_IPAddress);
                });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.bindSalesCategoryByIP = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlSales, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                $('#innerHtmlSales').html("");
                this.innerHtmlSales = "";
                innerHtmlSales = "";
                thisHomePage = this;
                console.log('executed');
                thisHomePage.searchService
                    .subCategoriesByZipcode(zipc)
                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var xmlDoc, xml, docs_2, results;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.d.length > 1)) return [3 /*break*/, 2];
                                xmlDoc = $.parseXML(data.d);
                                xml = $(xmlDoc);
                                docs_2 = xml.find("subCategories");
                                return [4 /*yield*/, Promise.all(docs_2.map(function (t) { return thisHomePage.searchService.viewAdvanceSearchByZipcode(zipc, $(docs_2[t]).find("id").text()); }).ajaxSuccess(function (success) {
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results = _a.sent();
                                console.log(results);
                                $.each(docs_2, function (i, doc) {
                                    innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                                    innerHtmlSales += " <div class='fullrow innerblock card-main pd-20 mg-b-30' >";
                                    //innerHtmlSales = "<p>" + ($(doc).find("name").text()) + "  </p>";
                                    var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                    innerHtmlSales += "<span><i><img class='image-size-icons' src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(doc).find("id").text()) + "'  alt=''/></i></span>";
                                    innerHtmlSales += "<h3 class='theme-text-color' style='float:right !important'>" + ($(doc).find("name").text()) + "</h3>";
                                    innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                    innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                });
                                //$('#innerHtmlSales').html(innerHtmlSales);
                                //thisHomePage.innerHtmlSales = innerHtmlSales;
                                thisHomePage.innerHtmlSales = innerHtmlSales;
                                thisHomePage.resultContent = true;
                                return [3 /*break*/, 2];
                            case 2:
                                thisHomePage.isSearchingStart = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { thisHomePage.isSearchingStart = false; });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.bindServiesCategoryByIP = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlServices, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                //$('#innerHtmlServices').html("");
                this.innerHtmlServices = "";
                innerHtmlServices = "";
                thisHomePage = this;
                thisHomePage.searchService
                    .getJobtypeWiseCategoryByZipcode()
                    .subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var xmlDoc, xml, docs, results;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.d.length > 1)) return [3 /*break*/, 2];
                                xmlDoc = $.parseXML(data.d);
                                xml = $(xmlDoc);
                                docs = xml.find("JobCategories");
                                return [4 /*yield*/, Promise.all(docs.map(function (t) { return thisHomePage.searchService.getViewAdvanceSearchForServices($(docs[t]).find("ID").text(), zipc); }).ajaxSuccess(function (success) {
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results = _a.sent();
                                console.log(results);
                                $.each(docs, function (i, docs) {
                                    var flag = 0;
                                    var categoryId = $(docs).find("ID").text();
                                    innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                                    innerHtmlServices += " <div class='fullrow innerblock card-main pd-20 mg-b-30 pd-t-35'>";
                                    var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                    innerHtmlServices += "<span><i><img class='image-size-icons' src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span>";
                                    innerHtmlServices += " <h3 class='theme-text-color' style='float:right !important'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                    innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                                    innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                });
                                thisHomePage.innerHtmlServices = innerHtmlServices;
                                //$('#innerHtmlServices').html(innerHtmlServices);
                                //thisHomePage. = innerHtmlServices;
                                thisHomePage.resultContent = true;
                                return [3 /*break*/, 2];
                            case 2:
                                thisHomePage.isSearchingStart = false;
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { thisHomePage.isSearchingStart = false; });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.xml2json = function (xml, tab) {
        var X = {
            toObj: function (xml) {
                var o = {};
                if (xml.nodeType == 1) { // element node ..
                    if (xml.attributes.length) // element with attributes  ..
                        for (var i = 0; i < xml.attributes.length; i++)
                            o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                    if (xml.firstChild) { // element has child nodes ..
                        var textChild = 0, cdataChild = 0, hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType == 1)
                                hasElementChild = true;
                            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/))
                                textChild++; // non-whitespace text
                            else if (n.nodeType == 4)
                                cdataChild++; // cdata section node
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                X.removeWhite(xml);
                                for (var n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType == 3) // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    else if (n.nodeType == 4) // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    else if (o[n.nodeName]) { // multiple occurence of element ..
                                        if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                    }
                                    else // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                }
                            }
                            else { // mixed content
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                        }
                        else if (textChild) { // pure text
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                        else if (cdataChild) { // cdata
                            if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                            else
                                for (var n = xml.firstChild; n; n = n.nextSibling)
                                    o["#cdata"] = X.escape(n.nodeValue);
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild)
                        o = null;
                }
                else if (xml.nodeType == 9) { // document.node
                    o = X.toObj(xml.documentElement);
                }
                else
                    alert("unhandled node type: " + xml.nodeType);
                return o;
            },
            toJson: function (o, name, ind) {
                var json = name ? ("\"" + name + "\"") : "";
                if (o instanceof Array) {
                    for (var i = 0, n = o.length; i < n; i++)
                        o[i] = X.toJson(o[i], "", ind + "\t");
                    json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                }
                else if (o == null)
                    json += (name && ":") + "null";
                else if (typeof (o) == "object") {
                    var arr = [];
                    for (var m in o)
                        arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                    json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                }
                else if (typeof (o) == "string")
                    json += (name && ":") + "\"" + o.toString() + "\"";
                else
                    json += (name && ":") + o.toString();
                return json;
            },
            innerXml: function (node) {
                var s = "";
                if ("innerHTML" in node)
                    s = node.innerHTML;
                else {
                    var asXml = function (n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                            if (n.firstChild) {
                                s += ">";
                                for (var c = n.firstChild; c; c = c.nextSibling)
                                    s += asXml(c);
                                s += "</" + n.nodeName + ">";
                            }
                            else
                                s += "/>";
                        }
                        else if (n.nodeType == 3)
                            s += n.nodeValue;
                        else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        return s;
                    };
                    for (var c = node.firstChild; c; c = c.nextSibling)
                        s += asXml(c);
                }
                return s;
            },
            escape: function (txt) {
                return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
            },
            removeWhite: function (e) {
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) { // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        }
                        else
                            n = n.nextSibling;
                    }
                    else if (n.nodeType == 1) { // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    }
                    else // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;
        var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
        return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
    };
    HomeComponent.prototype.sleep = function (delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay)
            ;
    };
    tslib_1.__decorate([
        ViewChild('salesServicesFocus'),
        tslib_1.__metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "divSalesServices", void 0);
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html'
        }),
        tslib_1.__param(3, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, Renderer2, SearchService, Object, MessageService, Router])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
function validateSearchZipCode(thisStatus) {
    return function (control) {
        var value = control.value;
        var regFirstDigits = new RegExp('^[0-9]{2}$');
        var regFirstLetters = new RegExp('^[a-zA-Z]{2}$');
        var regLetters = new RegExp('^[a-zA-Z]$');
        if (/^[0-9]{2}/.test(value)) {
            var reg = /\b\d\b/g;
            var regFiveDig = /\b\d{5}\b/g;
            if (/^[0-9]/.test(value)) {
                if (value.match(regFiveDig) && value.length <= 5) {
                    thisStatus.show_check = true;
                    return null;
                }
                else {
                    thisStatus.show_check = false;
                    return { 'zipCode': true };
                }
            }
            else {
                thisStatus.show_check = false;
                return { 'invalidZipCode': true };
            }
        }
        else if (/^[a-zA-Z]{2}/.test(value) || /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(value)) {
            if (/^([a-zA-Z]+\s)*[a-zA-Z]+\,+\s[a-zA-Z\s]+$/.test(value)) {
                if (/\s/.test(value)) {
                    // It has any kind of whitespace
                    var listOfValues = value.split(',');
                    if (listOfValues.length > 2) {
                        thisStatus.show_check = false;
                        return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                    }
                    else {
                        if (listOfValues[1] !== undefined) {
                            if (listOfValues[1][0] != " ") {
                                thisStatus.show_check = false;
                                return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                            }
                            if (listOfValues[1].length >= 2) {
                                thisStatus.show_check = true;
                                return null;
                            }
                            else {
                                thisStatus.show_check = true;
                            }
                        }
                        else {
                            if (value.length >= 5) {
                                thisStatus.show_check = false;
                                return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                            }
                        }
                    }
                }
            }
            else {
                if (!(/^[a-zA-Z]*$/.test(value))) {
                    thisStatus.show_check = false;
                    return { 'cityStatePattern': true };
                }
                if (value.length >= 5) {
                    thisStatus.show_check = false;
                    return { 'cityStatePattern': true };
                }
            }
        }
        else {
            if (value.match(regFirstDigits)) {
                thisStatus.show_check = false;
                return { 'invalidZipCode': true };
            }
            else {
                thisStatus.show_check = false;
                //return { 'invalidData': true };
            }
        }
    };
}
//bindSalesCategory1(zipc) {
//    var innerHtmlSales = "";
//    let thisHomePage = this;
//    thisHomePage.searchService
//        .attemptGetSalesCategoryByZip(zipc)
//        .subscribe(
//            data => {
//                if (data.d.length > 0) {
//                    var xmlDoc = $.parseXML(data.d);
//                    var xml = $(xmlDoc);
//                    var docs = xml.find("subCategories");
//                    $.each(docs, function (i, docs) {
//                        var flag = 0;
//                        innerHtmlSales += " <div class='col-sm-3 text-center block'>";
//                        innerHtmlSales += " <div class='fullrow innerblock'>";
//                        innerHtmlSales += " <h3>" + ($(docs).find("name").text()) + " </h3>";
//                        var subCategoryId = $(docs).find("id").text();
//                        thisHomePage.searchService
//                            .attemptGetAdvanceSearchByZipc(zipc, subCategoryId)
//                            .subscribe(
//                                data => {
//                                    if (data.d.length > 0) {
//                                        var xmlDoc1 = $.parseXML(data.d);
//                                        var xml1 = $(xmlDoc1);
//                                        var docs1 = xml1.find("GetCategoriesinfo1");
//                                        $.each(docs1, function (i, docs1) {
//                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
//                                                let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
//                                                innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
//                                                innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a></div></div>";
//                                                flag = 1;
//                                            }
//                                            else { }
//                                        });
//                                    }
//                                    else { }
//                                },
//                                err => {
//                                    thisHomePage.isSearchingStart = false;
//                                }
//                            );
//                        if (flag == 1) { }
//                        else {
//                            innerHtmlSales += "<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>";
//                            innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'  alt=''/></i></span></a></div></div>";
//                        }
//                    });
//                }
//                else { }
//            },
//            err => { thisHomePage.isSearchingStart = false; }
//    );
//    return innerHtmlSales;
//}
//bindServiesCategory1(zipc) {
//    var innerHtmlSales = "";
//    let thisHomePage = this;
//    thisHomePage.searchService
//        .attemptGetJobtypeWiseCategory()
//        .subscribe(
//            data => {
//                if (data.d.length > 1) {
//                    var xmlDoc = $.parseXML(data.d);
//                    var xml = $(xmlDoc);
//                    var docs = xml.find("JobCategories");
//                    $.each(docs, function (i, docs) {
//                        var flag = 0;
//                        innerHtmlSales += " <div class='col-sm-3 text-center block'>";
//                        innerHtmlSales += " <div class='fullrow innerblock'>";
//                        innerHtmlSales += " <h3>" + ($(docs).find("categoryName").text()) + " </h3>";
//                        var jobTypeId = $(docs).find("ID").text();
//                        thisHomePage.searchService
//                            .attemptGetViewAdvanceSearchForServices(jobTypeId, zipc)
//                            .subscribe(
//                                data => {
//                                    if (data.d.length > 0) {
//                                        var xmlDoc1 = $.parseXML(data.d);
//                                        var xml1 = $(xmlDoc1);
//                                        var docs1 = xml1.find("GetCategoriesinfoservices");
//                                        $.each(docs1, function (i, docs1) {
//                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
//                                                let urlToServiceProfileList: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
//                                                innerHtmlSales += "<a href='" + urlToServiceProfileList + "'>";
//                                                innerHtmlSales += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a></div></div>";
//                                                flag = 1;
//                                            }
//                                            else { }
//                                        });
//                                    }
//                                    else { }
//                                },
//                                err => {
//                                    thisHomePage.isSearchingStart = false;
//                                }
//                            );
//                        if (flag == 1) { }
//                        else {
//                            innerHtmlSales += "<a href='ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate'>";
//                            innerHtmlSales += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span></a></div></div>";
//                        }
//                    });
//                }
//                else { }
//            },
//            err => { thisHomePage.isSearchingStart = false; }
//    );
//    return innerHtmlSales;
//}
/*----------------------------------------------------*/
/*  Parallax
/*----------------------------------------------------*/
/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
//fullscreenFix() {
//    var h = $('body').height();
//    // set .fullscreen height
//    $(".content-b").each(function (i) {
//        if ($(this).innerHeight() > h) {
//            $(this).closest(".fullscreen").addClass("overflow");
//        }
//    });
//}
///* resize background images */
//backgroundResize() {
//    var windowH = $(window).height();
//    $(".parallax").each(function (i) {
//        let path = $(this);
//        // variables
//        let contW = path.width();
//        let contH = path.height();
//        Number imgW = path.attr("data-img-width");
//        Number imgH = path.attr("data-img-height");
//        let ratio = imgW / imgH;
//        // overflowing difference
//        let diff = 100;
//        diff = diff ? diff : 0;
//        // remaining height to have fullscreen image only on parallax
//        let remainingH = 0;
//        if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
//            //var maxH = contH > windowH ? contH : windowH;
//            remainingH = windowH - contH;
//        }
//        // set img values depending on cont
//        imgH = contH + remainingH + diff;
//        imgW = imgH * ratio;
//        // fix when too large
//        if (contW > imgW) {
//            imgW = contW;
//            imgH = imgW / ratio;
//        }
//        //
//        path.data("resized-imgW", imgW);
//        path.data("resized-imgH", imgH);
//        path.css("background-size", imgW + "px " + imgH + "px");
//    });
//}
///* set parallax background-position */
//parallaxPosition(e) {
//    var heightWindow = $(window).height();
//    var topWindow = $(window).scrollTop();
//    var bottomWindow = topWindow + heightWindow;
//    var currentWindow = (topWindow + bottomWindow) / 2;
//    $(".parallax").each(function (i) {
//        var path = $(this);
//        var height = path.height();
//        var top = path.offset().top;
//        var bottom = top + height;
//        // only when in range
//        if (bottomWindow > top && topWindow < bottom) {
//            //var imgW = path.data("resized-imgW");
//            var imgH = path.data("resized-imgH");
//            // min when image touch top of window
//            var min = 0;
//            // max when image touch bottom of window
//            var max = - imgH + heightWindow;
//            // overflow changes parallax
//            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
//            top = top - overflowH;
//            bottom = bottom + overflowH;
//            // value with linear interpolation
//            // var value = min + (max - min) * (currentWindow - top) / (bottom - top);
//            var value = 0;
//            if ($('.parallax').is(".titlebar")) {
//                value = min + (max - min) * (currentWindow - top) / (bottom - top) * 2;
//            } else {
//                value = min + (max - min) * (currentWindow - top) / (bottom - top);
//            }
//            // set background-position
//            var orizontalPosition = path.attr("data-oriz-pos");
//            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
//            $(this).css("background-position", orizontalPosition + " " + value + "px");
//        }
//    });
//}
//dataSaved = false;
//purchaseForm: FormGroup;
//allCategoriesObservable: Observable<Category[]>;
//categorieArray: Category[];
//purchaseArray: PurchaseEntry[];
//allCityStateZipCodeData: Observable<CityStateZip[]>;
//allPurchases: Observable<PurchaseEntry[]>;
//globalAllPurchases: Observable<PurchaseEntry[]>;
//purchaseEntry: PurchaseEntry;
//massage = null;
//categoryid = null;
//constructor(private formbulider: FormBuilder, private categoryService: CategoryService) { }
//ngOnInit() {
//    this.purchaseForm = new FormGroup({
//        CategoryID: new FormControl(),
//        CategoryName: new FormControl(),
//        Location: new FormControl(),
//        ZipCode: new FormControl()
//    });
//    this.loadAllCategories();
//    this.loadAllCityStateZip();
//    this.loadAllPurchase();
//}
//loadAllCategories() {
//    let filtered = [];
//    let letsContinue = false;
//    this.allCategoriesObservable = this.categoryService.getAllCategories();
//    //this.allCategoriesObservable = this.allCategoriesObservable.pipe(
//    //    map(result => result.
//    //        filter(cat => cat.CategoryName != "Mortgage")
//    //    )
//    //);
//    //this.categoryService.getAllPurchase().subscribe(
//    //    function (x) {
//    //        this.purchaseArray = x;
//    //    },
//    //    function (err) {
//    //        
//    //        console.log('Error: %s', err);
//    //    },
//    //    function () {
//    //        
//    //        for (var j = 0; j < this.purchaseArray.length; j++)
//    //        {
//    //            this.allCategoriesObservable = this.allCategoriesObservable.pipe(
//    //                map(result => result.
//    //                    filter(cat => cat.CategoryName != this.purchaseArray.CategoryName)
//    //                )
//    //            );
//    //        }
//    //    }
//    //);
//}
//loadAllCityStateZip() {
//    this.allCityStateZipCodeData = this.categoryService.getAllCityStateZipCodeData();
//    let filtered = [];
//    let letsContinue = false;
//    this.allCategoriesObservable = this.categoryService.getAllCategories();
//}
//loadAllPurchase() {
//    
//    this.allPurchases = this.categoryService.getAllPurchase();
//    this.globalAllPurchases = this.allPurchases;
//}
//onFormSubmit() {
//    
//    console.log(this.purchaseForm.value);
//    if (this.purchaseForm !== undefined) {
//        var notFound = true;
//        var localthis = this;
//        var localPurchaseForm = this.purchaseForm;
//        this.categoryService.getAllPurchase().subscribe(
//            function (x) {
//                this.purchaseArray = x;
//            },
//            function (err) {
//                console.log('Error: %s', err);
//            },
//            function () {
//                this.purchaseArray.forEach(function (purchase) {
//                    if (purchase.CategoryID.toString() == localPurchaseForm.value.CategoryID.split(',')[0] &&
//                        (purchase.City == localPurchaseForm.value.Location.split(',')[0] || purchase.State == localPurchaseForm.value.Location.split(',')[1] ) && (purchase.ZipCode == localPurchaseForm.value.ZipCode)) {
//                        localthis.dataSaved = true;
//                        localthis.massage = 'This combination is already purchased. No more available.';
//                        localthis.purchaseForm.reset();
//                        notFound = false;
//                    }
//                });
//                if (notFound) {
//                    this.purchaseEntry = new PurchaseEntry();
//                    this.purchaseEntry.CategoryID = localPurchaseForm.value.CategoryID.split(',')[0];
//                    this.purchaseEntry.CategoryName = localPurchaseForm.value.CategoryID.split(',')[1];
//                    this.purchaseEntry.ChargeAmount = localPurchaseForm.value.CategoryID.split(',')[2];
//                    this.purchaseEntry.City = localPurchaseForm.value.Location.split(',')[0];
//                    this.purchaseEntry.State = localPurchaseForm.value.Location.split(',')[1];
//                    this.purchaseEntry.ZipCode = localPurchaseForm.value.ZipCode;
//                    localthis.dataSaved = false;
//                    localthis.CreatePurchase(this.purchaseEntry);
//                    localPurchaseForm.reset();
//                }
//            }
//        );
//    }
//}
//CreatePurchase(purchase: PurchaseEntry) {
//    this.categoryService.createPurchase(purchase).subscribe(
//        () => {
//            this.dataSaved = true;
//            this.massage = 'Record saved Successfully';
//            this.loadAllPurchase();
//            this.purchaseForm.reset();
//        }
//    );
//}
//resetForm() {
//    this.purchaseForm.reset();
//    this.massage = null;
//    this.dataSaved = false;
//}
//    var subCategoryId = $(doc).find("id").text();
//    console.log(subCategoryId);
//    await thisHomePage.searchService
//        .viewAdvanceSearchByZipcode(zipc, subCategoryId)
//        .then(
//            (data: any) => {
//                if (data.d.length > 0) {
//                    var flag = 0;
//                    innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
//                    innerHtmlSales += " <div class='fullrow innerblock card-main pd-20 mg-b-30' >";
//                    var xmlDoc1 = $.parseXML(data.d);
//                    var xml1 = $(xmlDoc1);
//                    var docs1 = xml1.find("GetCategoriesinfo1");
//                    console.log('executed');
//                    $.each(docs1, function (i, doc1)
//                    //for (const doc1 in docs1)
//                    {
//                        console.log($(doc).find("id").text() + "=" + $(doc1).find("Subcategoryid").text());
//                        console.log();
//                        if ($(doc).find("id").text() == $(doc1).find("Subcategoryid").text()) {
//                            if (searchByIpOrtxtSearch == "ip") {
//                                innerHtmlSales = "<p>" + ($(doc).find("name").text()) + "  </p>";
//                                let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
//                                //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
//                                innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
//                                innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
//                                innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
//                            }
//                            else {
//                                let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
//                                //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
//                                innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(doc1).find("advMainImage").text()) + "'  alt=''/></i></span></a>";
//                                innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
//                                innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
//                                innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
//                            }
//                            flag = 1;
//                        }
//                        else { }
//                    });
//                    if (flag == 1) { }
//                    else {
//                        if (searchByIpOrtxtSearch == "ip") {
//                            innerHtmlSales = "<p>" + ($(doc).find("name").text()) + "  </p>";
//                            let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
//                            innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
//                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
//                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
//                        }
//                        else {
//                            innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(doc).find("id").text()) + "'  alt=''/></i></span></a>";
//                            innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
//                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
//                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate'>View More</a></div></div>";
//                        }
//                    }
//                }
//                else { }
//                thisHomePage.isSearchingStart = false;
//                console.log(innerHtmlSales);
//                $('#innerHtmlSales').html(innerHtmlSales);
//            },
//            err => {
//                thisHomePage.isSearchingStart = false;
//            }
//        )
//});
//# sourceMappingURL=home.component.js.map