import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as $ from 'jquery';
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.isOnLogin = true;
        this.isOnRegister = true;
        this.displayBlock = 'block';
        this.displayNone = 'none';
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
    HomeComponent.prototype.ngOnInit = function () {
        this.initializeEventsAndControls();
        this.parallaxBG();
    };
    HomeComponent.prototype.initializeEventsAndControls = function () {
    };
    HomeComponent.prototype.searchBasedOnLocation = function () {
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
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map