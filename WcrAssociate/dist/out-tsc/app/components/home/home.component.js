import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HomeLandingService } from '../../services/auth';
import * as $ from 'jquery';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(fb, renderer, homeLandingService, platformId) {
        this.fb = fb;
        this.renderer = renderer;
        this.homeLandingService = homeLandingService;
        this.platformId = platformId;
        this.isSearchingStart = false;
        this.resultContent = false;
        this.innerHtmlSales = '';
        this.innerHtmlServices = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.parallaxBG();
        this.GetSalesAdts();
        this.searchForm = this.fb.group({
            txtSearch: [''],
        });
    };
    HomeComponent.prototype.onEnterSearch = function () {
        this.searching();
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
        this.searching();
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
        debugger;
        var searchValue = this.searchForm.get('txtSearch').value;
        if ($.isNumeric(searchValue)) {
            // HideDiv();
            //$("#DivSearchAds").css("display", "block");
            //$("#divShowAdvertisement").css("display", "none");
            //$("#sales").html(sales.join(''));
            //$("#Services").html(services1.join(''));
            var salesHtml = void 0;
            var servicesHtml = void 0;
            salesHtml = this.bindSalesCategory(searchValue);
            servicesHtml = this.bindServiesCategory(searchValue);
            this.innerHtmlSales = salesHtml;
            this.innerHtmlServices = servicesHtml;
            console.log(this.innerHtmlSales);
            console.log(this.innerHtmlServices);
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
                    $("#DivSearchAds").css("display", "block");
                    $("#divShowAdvertisement").css("display", "none");
                    salesHtml = this.bindSalesCategoryCityWise(State, City);
                    servicesHtml = this.bindServiesCategoryCityWise(State, City);
                    //this.innerHtmlSales = salesHtml;
                    //this.innerHtmlServices = servicesHtml;
                    //console.log(this.innerHtmlSales);
                    //console.log(this.innerHtmlServices);
                }
                else if (State.length >= 2) {
                    $("#lblfai").css("display", "block");
                    $("#lblfai").text("Please Enter 2 Characters for State.");
                }
            }
            else {
                $("#lblfai").css("display", "block");
                $("#lblfai").text("Invalid data entered.  Please enter City, State OR Zip Code.");
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
                $(this).css('background-image', 'url(' + attrImage + ')');
            }
            if (attrColor !== undefined) {
                $(this).find(".parallax-overlay").css('background-color', '' + attrColor + '');
            }
            if (attrOpacity !== undefined) {
                $(this).find(".parallax-overlay").css('opacity', '' + attrOpacity + '');
            }
        });
    };
    //managed both in these both functions: By IPAddrss zipCode and user entered zipCode in search
    HomeComponent.prototype.bindSalesCategory = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        var innerHtmlSales = "";
        var thisHomePage = this;
        thisHomePage.homeLandingService
            .attemptGetSalesCategoryByZip(zipc)
            .subscribe(function (data) {
            if (data.d.length > 1) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("subCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                    innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                    innerHtmlSales += " <h3>" + ($(docs).find("name").text()) + " </h3>";
                    var subCategoryId = $(docs).find("id").text();
                    thisHomePage.homeLandingService
                        .attemptGetAdvanceSearchByZipc(zipc, subCategoryId)
                        .then(function (data) {
                        if (data.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("GetCategoriesinfo1");
                            $.each(docs1, function (i, docs1) {
                                if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                    if (searchByIpOrtxtSearch == "ip") {
                                        innerHtmlSales = "<p>" + ($(docs).find("name").text()) + "  </p>";
                                        var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                        //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                        innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "  </p>";
                                        innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                    }
                                    else {
                                        var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                        //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                        innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a>";
                                        innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "  </p>";
                                        innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                                    }
                                    flag = 1;
                                }
                                else { }
                            });
                        }
                        else { }
                    }, function (err) {
                        thisHomePage.isSearchingStart = false;
                    });
                    if (flag == 1) { }
                    else {
                        if (searchByIpOrtxtSearch == "ip") {
                            innerHtmlSales = "<p>" + ($(docs).find("name").text()) + "  </p>";
                            var urlToSalesAdvertisementList = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "  </p>";
                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";
                        }
                        else {
                            innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'  alt=''/></i></span></a>";
                            innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "  </p>";
                            innerHtmlSales += "<a class='waves-effect waves-light btn' href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>View More</a></div></div>";
                        }
                    }
                });
                thisHomePage.innerHtmlSales = innerHtmlSales;
                thisHomePage.resultContent = true;
            }
            else { }
            thisHomePage.isSearchingStart = false;
        }, function (err) { thisHomePage.isSearchingStart = false; });
    };
    HomeComponent.prototype.bindServiesCategory = function (zipc, searchByIpOrtxtSearch) {
        if (searchByIpOrtxtSearch === void 0) { searchByIpOrtxtSearch = "txtSearch"; }
        var innerHtmlServices = "";
        var thisHomePage = this;
        thisHomePage.homeLandingService
            .attemptGetJobtypeWiseCategory()
            .subscribe(function (data) {
            if (data.d.length > 1) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("JobCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                    innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                    innerHtmlServices += " <h3>" + ($(docs).find("categoryName").text()) + " </h3>";
                    var categoryId = $(docs).find("ID").text();
                    thisHomePage.homeLandingService
                        .attemptGetViewAdvanceSearchForServices(categoryId, zipc)
                        .then(function (data) {
                        if (data.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("GetCategoriesinfoservices");
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
                    }, function (err) {
                        thisHomePage.isSearchingStart = false;
                    });
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
                    thisHomePage.innerHtmlServices = innerHtmlServices;
                    thisHomePage.resultContent = true;
                });
            }
            else { }
            thisHomePage.isSearchingStart = false;
        }, function (err) { thisHomePage.isSearchingStart = false; });
    };
    HomeComponent.prototype.bindSalesCategoryCityWise = function (state, city) {
        var innerHtmlSales = "";
        var thisHomePage = this;
        thisHomePage.homeLandingService
            .attemptGetSalesCategoryCityWise(state, city)
            .subscribe(function (data) {
            if (data.d.length > 1) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("subCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    innerHtmlSales += " <div class='col-sm-3 text-center block '>";
                    innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                    innerHtmlSales += " <h3>" + ($(docs).find("name").text()) + " </h3>";
                    var subCategoryId = $(docs).find("id").text();
                    thisHomePage.homeLandingService
                        .attemptGetAdvanceSearchCityStateWise(state, city, subCategoryId)
                        .then(function (data) {
                        if (data.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("GetCategoriesinfoCity");
                            $.each(docs1, function (i, docs1) {
                                if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                    var urlToSalesAdvertisement = 'SalesAdvertisementList.html?ca=0&id="' + ($(docs).find("id").text()) + '"&zipcode="' + $(docs1).find("Zipcode").text() + '"&name="' + ($(docs).find("name").text()) + '"&jtype=Sales&catName=RealEstate';
                                    //innerHtmlSales += "<a href='" + urlToSalesAdvertisement + "'>";
                                    innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span>";
                                    innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p></div></div>";
                                    innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                    flag = 1;
                                }
                                else { }
                            });
                        }
                        else { }
                    }, function (err) {
                        thisHomePage.isSearchingStart = false;
                    });
                    if (flag == 1) { }
                    else {
                        var urlToSalesAdvertisement = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                        //innerHtmlSales += "<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>";
                        innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span>";
                        innerHtmlSales += "</a><p class='grey-text elipsis-text' style = 'text-align:left;' > " + ($(docs).find("detail").text()) + " </p>";
                        innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                    }
                });
                thisHomePage.innerHtmlSales = innerHtmlSales;
                thisHomePage.resultContent = true;
            }
            else { }
            thisHomePage.isSearchingStart = false;
        }, function (err) {
            thisHomePage.isSearchingStart = false;
        });
    };
    HomeComponent.prototype.bindServiesCategoryCityWise = function (state, city) {
        var innerHtmlServices = "";
        var thisHomePage = this;
        thisHomePage.homeLandingService
            .attemptGetServicesCategoryCityWise(state, city)
            .subscribe(function (data) {
            if (data.d.length > 1) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("JobCategories");
                $.each(docs, function (i, docs) {
                    var flag = 0;
                    innerHtmlServices += " <div class=' col-sm-3 text-center block '>";
                    innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                    innerHtmlServices += " <h3>" + ($(docs).find("categoryName").text()) + " </h3>";
                    var subCategoryId = $(docs).find("ID").text();
                    thisHomePage.homeLandingService
                        .attemptGetAdvanceSearchServicesCityStateWise(state, city, subCategoryId)
                        .then(function (data) {
                        if (data.d.length > 0) {
                            var xmlDoc1 = $.parseXML(data.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("GetsubCategoriesinfoservices");
                            $.each(docs1, function (i, docs1) {
                                if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                    var urlToSalesAdvertisement = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                    innerHtmlServices += "<a href='" + urlToSalesAdvertisement + "'>";
                                    innerHtmlServices += "<span><i><img src='../../../AssociatePhoto/" + ($(docs1).find("photo").text()) + "'  alt=''/></i></span></a>";
                                    innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                                    innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                                    flag = 1;
                                }
                                else { }
                            });
                        }
                        else { }
                    }, function (err) {
                        thisHomePage.isSearchingStart = false;
                    });
                    if (flag == 1) { }
                    else {
                        var urlToSalesAdvertisement = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=0&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";
                        //innerHtmlSales += "<a href=''>";
                        innerHtmlServices += "<span><i><img src='images/icons/" + ($(docs).find("catImages").text()) + "'/></i></span>";
                        innerHtmlServices += "</a>";
                        innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "</p>";
                        innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisement + "'>View More</a></div></div>";
                    }
                });
                thisHomePage.innerHtmlServices = innerHtmlServices;
                thisHomePage.resultContent = true;
            }
            else { }
            thisHomePage.isSearchingStart = false;
        }, function (err) { thisHomePage.isSearchingStart = false; });
    };
    HomeComponent.prototype.GetSalesAdts = function () {
        var _this = this;
        this.homeLandingService
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
        tslib_1.__metadata("design:paramtypes", [FormBuilder, Renderer2, HomeLandingService, Object])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map