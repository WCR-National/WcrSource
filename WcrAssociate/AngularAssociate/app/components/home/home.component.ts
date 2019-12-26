import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { HomeLandingService } from '../../services/auth';
import { Category, CityStateZip, PurchaseEntry } from '../../entities/location';

import * as $ from 'jquery';
import { Local } from 'protractor/built/driverProviders';
import { debug } from 'util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    isSearchingStart: boolean = false;
    searchForm: FormGroup;
    homeLandingService: HomeLandingService;
    showSales: boolean = false;
    showServices: boolean = false;

    @ViewChild('divSalesServices') divSalesServices: ElementRef;
    @ViewChild('divSales') divSales: ElementRef;
    @ViewChild('divServices') divServices: ElementRef;

    innerHtmlSales: string = '';
    innerHtmlServices: string = '';


    constructor(private fb: FormBuilder, private renderer: Renderer2) { }

    ngOnInit() {
        this.initializeEventsAndControls();
        this.parallaxBG();

        this.searchForm = this.fb.group({
            search: [''],
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
        this.isSearchingStart = true;
        //focus the div which will show the result
        //show the loading icon
        this.divSalesServices.nativeElement.focusIn();
        let searchValue: string = this.searchForm.get('txtSearch').value;
        if ($.isNumeric(searchValue)) {

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
                    this.innerHtmlSales = salesHtml;

                    servicesHtml = this.bindServiesCategoryCityWise(State, City);
                    this.innerHtmlServices = servicesHtml;
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
    }

    initializeEventsAndControls() {

    }

    searchBasedOnLocation() {

    }

    // Init
    parallaxBG() {

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
                            innerHtmlSales += " <div class='col-sm-3 text-center block'>";
                            innerHtmlSales += " <div class='fullrow innerblock'>";
                            innerHtmlSales += " <h3>" + ($(docs).find("name").text()) + " </h3>";
                            var subCategoryId = $(docs).find("id").text();
                            thisHomePage.homeLandingService
                                .attemptGetAdvanceSearchCityStateWise(state, city, subCategoryId)
                                .subscribe(
                                    data => {
                                        if (data.d.length > 0) {
                                            var xmlDoc1 = $.parseXML(data.d);
                                            var xml1 = $(xmlDoc1);
                                            var docs1 = xml1.find("GetCategoriesinfoCity");
                                            $.each(docs1, function (i, docs1) {
                                                if ($(docs).find("id").text() == $(docs1).find("Subcategoryid").text()) {
                                                    let urlToSalesAdvertisement: string = 'SalesAdvertisementList.html?ca=0&id="' + ($(docs).find("id").text()) + '"&zipcode="' + $(docs1).find("Zipcode").text() + '"&name="' + ($(docs).find("name").text()) + '"&jtype=Sales&catName=RealEstate';
                                                    innerHtmlSales += "<a href='" + urlToSalesAdvertisement + "'>";
                                                    innerHtmlSales += "<span><i><img src='../../../Associate/Adv_img/" + ($(docs1).find("advMainImage").text()) + "'  alt=''/></i></span></a></div></div>";
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
                                innerHtmlSales += "<a href='SalesAdvertisementList.html?ca=0&id=" + ($(docs).find("id").text()) + "&name=" + ($(docs).find("name").text()) + "&jtype=Sales&catName=RealEstate'>";
                                innerHtmlSales += "<span><i><img src='ws/ShowSubcategoryIcon.ashx?ID=" + ($(docs).find("id").text()) + "'/></i></span>";
                                innerHtmlSales += "</a></div></div>";
                            }
                        });
                    }
                    else { }
                },
                err => { thisHomePage.isSearchingStart = false; }
            );
    }

    bindServiesCategoryCityWise(state, city) {
    }
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

