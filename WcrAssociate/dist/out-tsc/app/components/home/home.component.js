import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as $ from 'jquery';
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.initializeEventsAndControls();
        debugger;
        this.inlineCSS();
        this.parallaxBG();
        //this.fullscreenFix();
        ////$(window).resize(backgroundResize);
        ////$(window).focus(backgroundResize);
        //this.backgroundResize();
        ////if (!$("html").hasClass("touch")) {
        ////    //$(window).resize(parallaxPosition);
        ////    //$(window).focus(parallaxPosition);
        ////    //$(window).scroll(parallaxPosition);
        ////}
        ////this.parallaxPosition();
        //// Jumping background fix for IE
        //if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
        //    $('body').on("mousewheel", function () {
        //        event.preventDefault();
        //        //var wheelDelta = event.wheelDelta;
        //        var currentScrollPosition = window.pageYOffset;
        //        window.scrollTo(0, currentScrollPosition - wheelDelta);
        //    });
        //}
    };
    HomeComponent.prototype.initializeEventsAndControls = function () {
    };
    HomeComponent.prototype.searchBasedOnLocation = function () {
    };
    /*----------------------------------------------------*/
    /*  Inline CSS replacement for backgrounds etc.
    /*----------------------------------------------------*/
    HomeComponent.prototype.inlineCSS = function () {
        // Common Inline CSS
        $(".some-classes, section.fullwidth, .img-box-background, .flip-banner, .property-slider .item, .fullwidth-property-slider .item, .fullwidth-home-slider .item, .address-container").each(function () {
            debugger;
            var attrImageBG = $(this).attr('data-background-image');
            var attrColorBG = $(this).attr('data-background-color');
            if (attrImageBG !== undefined) {
                $(this).css('background-image', 'url(' + attrImageBG + ')');
            }
            if (attrColorBG !== undefined) {
                $(this).css('background', '' + attrColorBG + '');
            }
        });
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