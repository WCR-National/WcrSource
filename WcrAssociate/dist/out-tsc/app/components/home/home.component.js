import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { SearchService } from '../../services/search';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(fb, renderer, searchService, platformId) {
        this.fb = fb;
        this.renderer = renderer;
        this.searchService = searchService;
        this.platformId = platformId;
        this.isSearchingStart = false;
        this.resultContent = false;
        this.errorMessage = "";
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
    }
    HomeComponent.prototype.ngOnInit = function () {
        $('#divLandingPage').focus();
        this.parallaxBG();
        this.GetSalesAdts();
        this.initializeFormsAndEvents();
    };
    HomeComponent.prototype.initializeFormsAndEvents = function () {
        var _this = this;
        this.searchForm = this.fb.group({
            txtSearch: ['', [Validators.required, validateSearchZipCode]],
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
                if (State.length == 2) {
                    salesHtml = this.bindSalesCategoryCityWise(State, City);
                    servicesHtml = this.bindServiesCategoryCityWise(State, City);
                    //this.innerHtmlSales = salesHtml;
                    //this.innerHtmlServices = servicesHtml;
                    //console.log(this.innerHtmlSales);
                    //console.log(this.innerHtmlServices);
                }
                else if (State.length >= 2) {
                    $('html, body').animate({ scrollTop: $('#divLandingPage').offset().top }, 'slow');
                    this.errorMessage = "Please enter 2 Characters for State.";
                    this.isSearchingStart = false;
                }
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
    HomeComponent.prototype.sleep = function (delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay)
            ;
    };
    //managed both in these both functions: By IPAddrss zipCode and user entered zipCode in search
    HomeComponent.prototype.bindSalesCategory = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlSales, thisHomePage;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                $('#innerHtmlSales').html("");
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
                                        debugger;
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results_1 = _a.sent();
                                console.log(results_1);
                                $.each(docs_1, function (i, doc) {
                                    //for (const doc in docs) {
                                    $.each(results_1, function (i, data) {
                                        if (data.d.length > 0) {
                                            var flag = 0;
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfo1");
                                            console.log('executed');
                                            if ($(doc).find("id").text() == $(docs1[0]).find("Subcategoryid").text()) {
                                                innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                                                innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30' >";
                                                $.each(docs1, function (i, doc1) {
                                                    debugger;
                                                    console.log($(doc).find("id").text() + ',' + $(doc1).find("Subcategoryid").text());
                                                    if ($(doc).find("id").text() == $(doc1).find("Subcategoryid").text()) {
                                                        if (searchByIpOrtxtSearch == "ip") {
                                                            innerHtmlSales = "<p>" + ($(doc).find("name").text()) + "  </p>";
                                                            var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                                            //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                                            innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
                                                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                                        }
                                                        else {
                                                            var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                                            //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                                            innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(doc1).find("advMainImage").text()) + "'  alt=''/></i></span></a>";
                                                            innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
                                                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                                        }
                                                        flag = 1;
                                                    }
                                                });
                                            }
                                        }
                                        else {
                                            innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                                            innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30' >";
                                            if (flag == 1) { }
                                            else {
                                                if (searchByIpOrtxtSearch == "ip") {
                                                    innerHtmlSales = "<p>" + ($(doc).find("name").text()) + "  </p>";
                                                    var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                                    innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
                                                    innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                                    innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                                }
                                                else {
                                                    innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(doc).find("id").text()) + "'  alt=''/></i></span></a>";
                                                    innerHtmlSales += "<h3 class='theme-text-color text-center'>" + ($(doc).find("name").text()) + "</h3>";
                                                    innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(doc).find("detail").text()) + "  </p>";
                                                    innerHtmlSales += "<a class='waves-effect waves-light btn' href='SalesAdvertisementList.html?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate'>View More</a></div></div>";
                                                }
                                            }
                                        }
                                    });
                                });
                                $('#innerHtmlSales').html(innerHtmlSales);
                                //thisHomePage.innerHtmlSales = innerHtmlSales;
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
                $('#innerHtmlServices').html("");
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
                                        debugger;
                                        console.log("download : " + success);
                                    }))];
                            case 1:
                                results_2 = _a.sent();
                                console.log(results_2);
                                $.each(docs, function (i, docs) {
                                    var flag = 0;
                                    innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                                    innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                                    innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                    var categoryId = $(docs).find("ID").text();
                                    //thisHomePage.searchService
                                    //    .getViewAdvanceSearchForServices(categoryId, zipc)
                                    //    .then(
                                    //        (data: any) => {
                                    $.each(results_2, function (i, data) {
                                        if (data.d.length > 0) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfoservices");
                                            if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                $.each(docs1, function (i, docs1) {
                                                    if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                        if (searchByIpOrtxtSearch == "ip") {
                                                            console.log('entered in ' + searchByIpOrtxtSearch);
                                                            innerHtmlServices = "<p>" + ($(docs).find("categoryName").text()) + "</p>";
                                                            var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                                            //innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                                            innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "</p>";
                                                            innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                                        }
                                                        else {
                                                            console.log('entered in ' + searchByIpOrtxtSearch);
                                                            var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                                            //innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                                            innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span>";
                                                            innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                                                            innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                                        }
                                                        flag = 1;
                                                    }
                                                    else { }
                                                });
                                            }
                                            else { }
                                        }
                                        else {
                                            innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                                            innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                                            innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                            if (flag == 1) { }
                                            else {
                                                if (searchByIpOrtxtSearch == "ip") {
                                                    innerHtmlServices = "<p>" + ($(docs).find("categoryName").text()) + "  </p>";
                                                    //innerHtmlServices = "<p>" + ($(docs).find("Detail").text()) + "  </p>";
                                                    var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                                    //innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                                    innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                                                    innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                                }
                                                else {
                                                    var urlToServiceProfileList = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";
                                                    innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'  alt=''/></i></span>";
                                                    innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "</p>";
                                                    innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";
                                                }
                                            }
                                        }
                                    });
                                    $('#innerHtmlServices').html(innerHtmlServices);
                                    //thisHomePage. = innerHtmlServices;
                                    thisHomePage.resultContent = true;
                                });
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
            return tslib_1.__generator(this, function (_a) {
                innerHtmlSales = "";
                thisHomePage = this;
                thisHomePage.searchService
                    .getSalesCategoryCityWise(state, city)
                    .subscribe(function (data) {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("subCategories");
                        $.each(docs, function (i, docs) {
                            var subCategoryId = $(docs).find("id").text();
                            thisHomePage.searchService
                                .getAdvanceSearchCityStateWise(state, city, subCategoryId)
                                .then(function (data) {
                                var flag = 0;
                                innerHtmlSales += " <div class='col-sm-3 text-center block '>";
                                innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                                if (data.d.length > 0) {
                                    var xmlDoc1 = $.parseXML(data.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("GetCategoriesinfoCity");
                                    $.each(docs1, function (i, docs1) {
                                        if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                            var urlToSalesAdvertisement = 'SalesAdvertisementList.html?ca=0&id="' + ($(docs).find("id").text()) + '"&zipcode="' + $(docs1).find("Zipcode").text() + '"&name="' + ($(docs).find("name").text()) + '"&jtype=Sales&catName=RealEstate';
                                            //innerHtmlSales += "<a href='" + urlToSalesAdvertisement + "'>";
                                            innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span>";
                                            innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";
                                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p></div></div>";
                                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                            flag = 1;
                                        }
                                        else { }
                                    });
                                }
                                else { }
                                if (flag == 1) { }
                                else {
                                    var urlToSalesAdvertisement = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                    //innerHtmlSales += "<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>";
                                    innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span>";
                                    innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";
                                    innerHtmlSales += "</a><p class='grey-text elipsis-text' style = 'text-align:left;' > " + ($(docs).find("detail").text()) + " </p>";
                                    innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                }
                            }, function (err) {
                                thisHomePage.isSearchingStart = false;
                            });
                        });
                        $('#innerHtmlSales').html(innerHtmlSales);
                        thisHomePage.innerHtmlSales = innerHtmlSales;
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                }, function (err) {
                    thisHomePage.isSearchingStart = false;
                });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.bindServiesCategoryCityWise = function (state, city) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var innerHtmlServices, thisHomePage;
            return tslib_1.__generator(this, function (_a) {
                innerHtmlServices = "";
                thisHomePage = this;
                thisHomePage.searchService
                    .getServicesCategoryCityWise(state, city)
                    .subscribe(function (data) {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");
                        $.each(docs, function (i, docs) {
                            var subCategoryId = $(docs).find("ID").text();
                            thisHomePage.searchService
                                .getAdvanceSearchServicesCityStateWise(state, city, subCategoryId)
                                .then(function (data) {
                                var flag = 0;
                                innerHtmlServices += " <div class=' col-sm-3 text-center block '>";
                                innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                                if (data.d.length > 0) {
                                    var xmlDoc1 = $.parseXML(data.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("GetsubCategoriesinfoservices");
                                    $.each(docs1, function (i, docs1) {
                                        if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                            var urlToSalesAdvertisement = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                            innerHtmlServices += "<a href='" + urlToSalesAdvertisement + "'>";
                                            innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a>";
                                            innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                            innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                            innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                            flag = 1;
                                        }
                                        else { }
                                    });
                                    if (flag == 1) { }
                                    else {
                                        var urlToSalesAdvertisement = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=0&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";
                                        //innerHtmlSales += "<a href=''>";
                                        innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'/></i></span>";
                                        //innerHtmlServices += "</a>";
                                        innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                                        innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                        innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                    }
                                }
                                else { }
                            }, function (err) {
                                thisHomePage.isSearchingStart = false;
                            });
                        });
                        $('#innerHtmlServices').html(innerHtmlServices);
                        //thisHomePage.innerHtmlServices = innerHtmlServices;
                        thisHomePage.resultContent = true;
                    }
                    else { }
                    thisHomePage.isSearchingStart = false;
                }, function (err) { thisHomePage.isSearchingStart = false; });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.GetSalesAdts = function () {
        var _this = this;
        this.searchService
            .attemptGetSalesAdts()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var salesn = _this.bindSalesCategory(data.d, "ip");
                var servicesn = _this.bindServiesCategory(data.d, "ip");
            }
            else {
                return null;
            }
            _this.isSearchingStart = false;
            _this.resultContent = true;
        }, function (err) {
            _this.isSearchingStart = false;
            return null;
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
        tslib_1.__metadata("design:paramtypes", [FormBuilder, Renderer2, SearchService, Object])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
function validateSearchZipCode(control) {
    var value = control.value;
    var regFirstDigits = new RegExp('^[0-9]{2}$');
    var regFirstLetters = new RegExp('^[a-zA-Z]{2}$');
    var regLetters = new RegExp('^[a-zA-Z]$');
    if (/^[0-9]{2}/.test(value)) {
        var reg = /\b\d\b/g;
        var regFiveDig = /\b\d{5}\b/g;
        if (/^[0-9]/.test(value)) {
            if (value.match(regFiveDig) && value.length <= 5) {
                return null;
            }
            else {
                return { 'zipCode': true };
            }
        }
        else {
            return { 'invalidZipCode': true };
        }
    }
    else if (/^[a-zA-Z]{2}/.test(value) || /^[a-zA-Z]/.test(value)) {
        if (/^[a-zA-Z]+\,+\s[a-zA-Z\s]+$/.test(value)) {
            if (/\s/.test(value)) {
                // It has any kind of whitespace
                var listOfValues = value.split(' ');
                if (listOfValues.length > 2) {
                    return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                }
                else {
                    if (listOfValues[1] !== undefined) {
                        if (listOfValues[1].length != 2) {
                            return { 'statePattern': true };
                        }
                    }
                    else {
                        if (value.length >= 5) {
                            return { 'cityStatePattern': true }; //Please follow the pattern: City, State (Dallas, TX)
                        }
                    }
                }
            }
        }
        else {
            if (!(/^[a-zA-Z]*$/.test(value))) {
                return { 'cityStatePattern': true };
            }
            if (value.length >= 5) {
                return { 'cityStatePattern': true };
            }
        }
    }
    else {
        if (value.match(regFirstDigits)) {
            return { 'invalidZipCode': true };
        }
        else {
            //return { 'invalidData': true };
        }
    }
}
//    var subCategoryId = $(doc).find("id").text();
//    console.log(subCategoryId);
//    await thisHomePage.searchService
//        .viewAdvanceSearchByZipcode(zipc, subCategoryId)
//        .then(
//            (data: any) => {
//                if (data.d.length > 0) {
//                    var flag = 0;
//                    innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
//                    innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30' >";
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