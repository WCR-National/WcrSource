import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, filter, retry } from 'rxjs/operators';

import { HomeLandingService } from '../../services/auth';
import { Category, CityStateZip, PurchaseEntry } from '../../entities/location';

import * as $ from 'jquery';
import { Local } from 'protractor/built/driverProviders';
import { debug } from 'util';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    isSearchingStart: boolean = false;
    searchForm: FormGroup;
    resultContent: boolean = false;
    errorMessage: string = "";
    @ViewChild('salesServicesFocus') divSalesServices: ElementRef;

    innerHtmlSales: string = '';
    innerHtmlServices: string = '';

    constructor(private fb: FormBuilder, private renderer: Renderer2, private homeLandingService: HomeLandingService, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        $('#divLandingPage').focus();
        this.parallaxBG();
        this.GetSalesAdts();
        this.searchForm = this.fb.group({
            txtSearch: [''],
        });


        this.searchForm.get('txtSearch').valueChanges.subscribe((data) => {
            this.errorMessage = "";
        });
    }

    onEnterSearch() {

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
    }

    onClickSearch() {
        this.searching();
    }

    searching() {

        this.resultContent = false;
        this.isSearchingStart = true;

        //if (isPlatformBrowser(this.platformId)) {
        //    this.divSalesServices.nativeElement.focus();

        //    //this.myInput.nativeElement.focus();
        //}
        $//('#salesServicesDivId').focusin();
        $('html, body').animate({ scrollTop: $('#salesServicesDivId').offset().top }, 'slow');


        //focus the div which will show the result
        //show the loading icon
        debugger;
        let searchValue: string = this.searchForm.get('txtSearch').value;
        if ($.isNumeric(searchValue)) {
            // HideDiv();
            //$("#DivSearchAds").css("display", "block");
            //$("#divShowAdvertisement").css("display", "none");
            //$("#sales").html(sales.join(''));
            //$("#Services").html(services1.join(''));
            let salesHtml;
            let servicesHtml;
            salesHtml = this.bindSalesCategory(searchValue);
            servicesHtml = this.bindServiesCategory(searchValue);
            this.innerHtmlSales = salesHtml;
            this.innerHtmlServices = servicesHtml;
            console.log(this.innerHtmlSales);
            console.log(this.innerHtmlServices);

        }
        else {
            if (searchValue.indexOf(',') != -1) {
                let State;
                let City;
                let salesHtml;
                let servicesHtml;
                let strSearchValue = searchValue.split(',');
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
                    this.errorMessage = "Please Enter 2 Characters for State.";
                    this.isSearchingStart = false;

                }
            }
            else {
                $("#lblfai").css("display", "block");
                this.errorMessage = "Invalid data entered.  Please enter City, State OR Zip Code.";
                this.isSearchingStart = false;

            }
        }
    }

    // Init
    parallaxBG() {

        $('.parallax').prepend('<div class="parallax-overlay"></div>');

        $(".parallax").each(function () {
            var attrImage = $(this).attr('data-background');
            var attrColor = $(this).attr('data-color');
            var attrOpacity = $(this).attr('data-color-opacity');
            debugger;
            if (attrImage !== undefined) {
                $(this).find(".parallax-overlay").css('background-image', 'url(' + attrImage + ')');
            }

            if (attrColor !== undefined) {
                $(this).find(".parallax-overlay").css('background-color', '' + attrColor + '');
            }


        });
    }

    //managed both in these both functions: By IPAddrss zipCode and user entered zipCode in search
    bindSalesCategory(zipc, searchByIpOrtxtSearch = "txtSearch") {
        var innerHtmlSales = "";
        let thisHomePage = this;

        thisHomePage.homeLandingService
            .attemptGetSalesCategoryByZip(zipc)
            .subscribe(
                data => {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("subCategories");

                        $.each(docs, function (i, docs) {
                            var flag = 0;
                            innerHtmlSales += " <div class='grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center'>";
                            innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30' >";
                            innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";

                            var subCategoryId = $(docs).find("id").text();

                            thisHomePage.homeLandingService
                                .attemptGetAdvanceSearchByZipc(zipc, subCategoryId)
                                .then(
                                    (data: any) => {
                                        if (data.d.length > 0) {

                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfo1");

                                            $.each(docs1, function (i, docs1) {
                                                if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {

                                                    if (searchByIpOrtxtSearch == "ip") {
                                                        innerHtmlSales = "<p>" + ($(docs).find("name").text()) + "  </p>";
                                                        let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                                                        //innerHtmlSales += "<a href='" + urlToSalesAdvertisementList + "'>";
                                                        innerHtmlSales += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("detail").text()) + "  </p>";
                                                        innerHtmlSales += "<a class='waves-effect waves-light btn' href='" + urlToSalesAdvertisementList + "'>View More</a></div></div>";

                                                    }
                                                    else {

                                                        let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + $(docs1).find("Zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
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
                                        thisHomePage.isSearchingStart = false;

                                    },
                                    err => {
                                        thisHomePage.isSearchingStart = false;
                                    }
                                );

                            if (flag == 1) { }
                            else {
                                if (searchByIpOrtxtSearch == "ip") {
                                    innerHtmlSales = "<p>" + ($(docs).find("name").text()) + "  </p>";
                                    let urlToSalesAdvertisementList: string = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
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

                },
                err => { thisHomePage.isSearchingStart = false; }
            );

    }

    bindServiesCategory(zipc, searchByIpOrtxtSearch = "txtSearch") {
        var innerHtmlServices = "";
        let thisHomePage = this;

        thisHomePage.homeLandingService
            .attemptGetJobtypeWiseCategory()
            .subscribe(
                data => {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");

                        $.each(docs, function (i, docs) {
                            var flag = 0;
                            innerHtmlServices += " <div class='col-sm-3 text-center block '>";
                            innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                            innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";

                            var categoryId = $(docs).find("ID").text();

                            thisHomePage.homeLandingService
                                .attemptGetViewAdvanceSearchForServices(categoryId, zipc)
                                .then(
                                    (data: any) => {
                                        if (data.d.length > 0) {

                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfoservices");

                                            $.each(docs1, function (i, docs1) {
                                                if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {


                                                    if (searchByIpOrtxtSearch == "ip") {
                                                        console.log('entered in ' + searchByIpOrtxtSearch);
                                                        innerHtmlServices = "<p>" + ($(docs).find("categoryName").text()) + "</p>";
                                                        let urlToServiceProfileList: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                                        //innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                                        innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "</p>";
                                                        innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";


                                                    }
                                                    else {
                                                        console.log('entered in ' + searchByIpOrtxtSearch);

                                                        let urlToServiceProfileList: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
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
                                    },
                                    err => {
                                        thisHomePage.isSearchingStart = false;
                                    }
                                );

                            if (flag == 1) { }
                            else {
                                if (searchByIpOrtxtSearch == "ip") {

                                    innerHtmlServices = "<p>" + ($(docs).find("categoryName").text()) + "  </p>";
                                    //innerHtmlServices = "<p>" + ($(docs).find("Detail").text()) + "  </p>";
                                    let urlToServiceProfileList: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
                                    //innerHtmlServices += "<a href='" + urlToServiceProfileList + "'>";
                                    innerHtmlServices += "<p class='grey-text elipsis-text' style='text-align:left;'>" + ($(docs).find("Detail").text()) + "  </p>";
                                    innerHtmlServices += "<a class='waves-effect waves-light btn' href='" + urlToServiceProfileList + "'>View More</a></div></div>";


                                }
                                else {
                                    let urlToServiceProfileList: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + zipc + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";
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

                },
                err => { thisHomePage.isSearchingStart = false; }
            );
    }


    bindSalesCategoryCityWise(state, city) {
        var innerHtmlSales = "";
        let thisHomePage = this;

        thisHomePage.homeLandingService
            .attemptGetSalesCategoryCityWise(state, city)
            .subscribe(
                data => {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("subCategories");


                        $.each(docs, function (i, docs) {
                            var flag = 0;
                            innerHtmlSales += " <div class='col-sm-3 text-center block '>";
                            innerHtmlSales += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                            innerHtmlSales += " <h3 class='theme-text-color'>" + ($(docs).find("name").text()) + " </h3>";

                            var subCategoryId = $(docs).find("id").text();
                            thisHomePage.homeLandingService
                                .attemptGetAdvanceSearchCityStateWise(state, city, subCategoryId)
                                .then(
                                    (data: any) => {
                                        if (data.d.length > 0) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfoCity");
                                            $.each(docs1, function (i, docs1) {
                                                if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                                    let urlToSalesAdvertisement: string = 'SalesAdvertisementList.html?ca=0&id="' + ($(docs).find("id").text()) + '"&zipcode="' + $(docs1).find("Zipcode").text() + '"&name="' + ($(docs).find("name").text()) + '"&jtype=Sales&catName=RealEstate';
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
                                    },
                                    err => {
                                        thisHomePage.isSearchingStart = false;
                                    }
                                );

                            if (flag == 1) { }
                            else {
                                let urlToSalesAdvertisement: string = "SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate";
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

                },
                err => {
                    thisHomePage.isSearchingStart = false;
                }
            );
    }

    bindServiesCategoryCityWise(state, city) {
        var innerHtmlServices = "";
        let thisHomePage = this;

        thisHomePage.homeLandingService
            .attemptGetServicesCategoryCityWise(state, city)
            .subscribe(
                data => {
                    if (data.d.length > 1) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");

                        $.each(docs, function (i, docs) {
                            var flag = 0;
                            innerHtmlServices += " <div class=' col-sm-3 text-center block '>";
                            innerHtmlServices += " <div class='fullrow innerblock card pd-20 mg-b-30'>";
                            innerHtmlServices += " <h3 class='theme-text-color'>" + ($(docs).find("categoryName").text()) + " </h3>";
                            var subCategoryId = $(docs).find("ID").text();


                            thisHomePage.homeLandingService
                                .attemptGetAdvanceSearchServicesCityStateWise(state, city, subCategoryId)
                                .then(
                                    (data: any) => {
                                        if (data.d.length > 0) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetsubCategoriesinfoservices");

                                            $.each(docs1, function (i, docs1) {
                                                if ($(docs).find("ID").text() == $(docs1).find("categoryid").text()) {
                                                    let urlToSalesAdvertisement: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=" + $(docs1).find("zipcode").text() + "&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=" + ($(docs).find("categoryName").text()) + "";
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
                                    },
                                    err => {
                                        thisHomePage.isSearchingStart = false;
                                    }
                                );

                            if (flag == 1) { }
                            else {
                                let urlToSalesAdvertisement: string = "ServiceProfileList.html?ca=0&id=" + ($(docs).find("ID").text()) + "&zipcode=0&name=" + ($(docs).find("name").text()) + "&jtype=Services&catName=RealEstate";

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
                },
                err => { thisHomePage.isSearchingStart = false; }
            );
    }


    GetSalesAdts() {

        this.homeLandingService
            .attemptGetSalesAdts()
            .subscribe(
                (data:any ) => {
                    if (data.d.length > 0) {
                        let salesn = this.bindSalesCategory(data.d, "ip");
                        let servicesn = this.bindServiesCategory(data.d, "ip");
                    }
                    else {
                        return null;
                    }
                    this.isSearchingStart = false;
                    this.resultContent = true;

                },
                err => {
                    this.isSearchingStart = false;

                    return null;
                }
            );
    }

    //bindSalesCategory1(zipc) {
    //    var innerHtmlSales = "";
    //    let thisHomePage = this;
    //    thisHomePage.homeLandingService
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

    //                        thisHomePage.homeLandingService
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

    //    thisHomePage.homeLandingService
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

    //                        thisHomePage.homeLandingService
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
    //    //        debugger;
    //    //        console.log('Error: %s', err);
    //    //    },
    //    //    function () {
    //    //        debugger;
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
    //    debugger;
    //    this.allPurchases = this.categoryService.getAllPurchase();
    //    this.globalAllPurchases = this.allPurchases;
    //}

    //onFormSubmit() {
    //    debugger;

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

}

