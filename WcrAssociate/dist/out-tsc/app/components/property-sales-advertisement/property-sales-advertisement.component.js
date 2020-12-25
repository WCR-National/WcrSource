import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { MessageService } from '../../services/search';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { Toaster } from 'ngx-toast-notifications';
var PropertySalesAdvertisementsComponent = /** @class */ (function () {
    function PropertySalesAdvertisementsComponent(_messageService, router, salesAdvertisements, xmlToJson, route, modalService, toaster) {
        this._messageService = _messageService;
        this.router = router;
        this.salesAdvertisements = salesAdvertisements;
        this.xmlToJson = xmlToJson;
        this.route = route;
        this.modalService = modalService;
        this.toaster = toaster;
        this.isloadingIconVisible = true;
        this.count = 0;
    }
    PropertySalesAdvertisementsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkUserIsLogin();
        /*----------------------------------------------------*/
        /*  Mortgage Calculator
        /*----------------------------------------------------*/
        // Gets property price
        var propertyPricing = parseFloat($('.property-price').text().replace(/[^0-9\.]+/g, ""));
        if (propertyPricing > 0) {
            $('.pick-price').on('click', function () {
                $('#amount').val(propertyPricing.toString());
            });
        }
        //// replacing comma with dot
        //$(document).on('change', function () {
        //    let val: any = $("#interest").val();
        //    $("#interest").val(val.replace(/,/g, '.'));
        //});
        //// Calculator
        //function mortgageCalc() {
        //    //var am: any = $("#amount").val();
        //    //var amount = parseFloat(am.replace(/[^0-9\.]+/g, ""));
        //    //var yr: any = $("#years").val();
        //    //var yr1 = yr.replace(/[^0-9\.]+/g, "");
        //    //var months = yr1 * 12;
        //    //var down = parseFloat($("#downpayment").val().replace(/[^0-9\.]+/g, ""));
        //    //var annInterest = parseFloat($("#interest").val().replace(/[^0-9\.]+/g, ""));
        //    //var monInt = annInterest / 1200;
        //    // var   calculation = ((monInt + monInt / (Math.pow(1 + monInt, months) - 1)) * (amount - (down || 0))).toFixed(2);
        //    //if (parseFloat(calculation) > 0)
        //    //{
        //    //    $(".calc-output-container").css({ 'opacity': '1', 'max-height': '200px' });
        //    //    $(".calc-output").hide().html(calculation + ' ' + $('.mortgageCalc').attr("data-calc-currency")).fadeIn(300);
        //    //}
        //}
        //// Calculate
        //$('.calc-button').on('click', function () {
        //    mortgageCalc();
        //});
        this.route.url.subscribe(function (data) {
            if (data.length <= 6) {
                // Get the last piece of the URL (it's either 'login' or 'register')
            }
            else {
                //page  not found
                // this.isSubmitting = false;
                return false;
            }
        });
        this.route.queryParams
            .subscribe(function (params) {
            _this.advId = params['id'];
            _this.GetSalesAdvertisementData(_this.advId);
        });
    };
    PropertySalesAdvertisementsComponent.prototype.checkUserIsLogin = function () {
        var _this = this;
        this.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(function (data) {
            if (data.d == 0) {
                _this.isLoggedInValue = "0";
            }
            else {
                _this.isLoggedInValue = "1";
            }
        });
    };
    PropertySalesAdvertisementsComponent.prototype.GetSalesAdvertisementData = function (advId) {
        var _this = this;
        this.salesAdvertisements
            .GetPropertySalesAdevertisementData(advId)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var thisStatus = _this;
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("FullDetailsAdvertisments");
                $.each(docs, function (i, docs) {
                    thisStatus.advMainImage = $(docs).find("advMainImage").text();
                    thisStatus.image1 = $(docs).find("advImage1").text();
                    thisStatus.image2 = $(docs).find("advImage2").text();
                    thisStatus.image3 = $(docs).find("advImage3").text();
                    thisStatus.contactNo = $(docs).find("contactNo").text();
                    thisStatus.title = $(docs).find("title").text();
                    thisStatus.advertisementID = $(docs).find("advertisementID").text();
                    thisStatus.associateid = $(docs).find("associateid").text();
                    thisStatus.LicenseId = $(docs).find("LicenseId").text();
                    thisStatus.description = $(docs).find("description").text();
                    thisStatus.features = $(docs).find("features").text();
                    thisStatus.cost = $(docs).find("cost").text();
                    thisStatus.categoryName = $(docs).find("categoryName").text();
                    thisStatus.address = $(docs).find("address").text();
                    thisStatus.CityID = $(docs).find("CityID").text();
                    thisStatus.StateID = $(docs).find("StateID").text();
                    thisStatus.ZipCode = $(docs).find("ZipCode").text();
                    thisStatus.consumerID = $(docs).find("consumerID").text();
                });
            }
            setTimeout(function () {
                InitializeFullWidthSlider();
            }, 3000);
        });
    };
    PropertySalesAdvertisementsComponent.prototype.InitializeEvents = function () {
        var thisStatus = this;
        $('.contactAssociateShowInterestClass').click(function () {
            var advIdnAndAssociateId = $(this).attr('data-id');
            thisStatus.onOpenModalClickAssociate(advIdnAndAssociateId);
        });
        $('.contactAssociateClass').click(function () {
            var advIdAndAssociateId = $(this).attr('data-id');
            thisStatus.salesAdvertisements
                .CheckEmailAndPhNo()
                .subscribe(function (data) {
                if (thisStatus.isLoggedInValue == "0") {
                }
                else if (thisStatus.isLoggedInValue == "1") {
                    thisStatus.ContactAssociates(advIdAndAssociateId);
                }
                else {
                    thisStatus.showToast("danger", "You cannot contact this Associate at this time.");
                    thisStatus.showToast("danger", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                }
            }, function (err) {
                return false;
            });
            //thisStatus.salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {
            //            if (data.d > 0) {
            //            }
            //            else {
            //                thisStatus.showToast("danger", "You need to sign in");
            //                thisStatus.onOpenModalClickAssociate(advIdAndAssociateId);
            //            }
            //        });
        });
        $('.showInterestBookMarkClass').click(function () {
            var advId = $(this).attr('data-id');
            thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
        });
        $('.saveBookmarkClass').click(function () {
            var advId = $(this).attr('data-id');
            thisStatus.salesAdvertisements
                .UpdateSavedBookmarks(advId)
                .subscribe(function (data) {
                if (data.d == "0") {
                    $('.saveBookmarkClass').addClass('bookMarked');
                    thisStatus.showToast('warning', "You have already saved this advertisement.");
                }
                else {
                    $('.saveBookmarkClass').addClass('bookMarked');
                    thisStatus.showToast('success', "Advertisement bookmarked successfully.");
                }
            }, function (err) {
            });
            //thisStatus.salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {
            //            if (data.d > 0)
            //            {
            //            }
            //            else {
            //                thisStatus.showToast("danger", "You need to sign in");
            //                thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
            //            }
            //        }
            //    );
        });
    };
    //Linked with on click event
    PropertySalesAdvertisementsComponent.prototype.ContactAssociates = function (advIdAndAssociateId) {
        var _this = this;
        var _returnValue;
        var adverID;
        var associateID;
        var jobtypeID;
        var zipcode;
        var array = advIdAndAssociateId.split(",");
        for (var i in array) {
            if (parseInt(i) == 0) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    adverID = array[parseInt(i)];
                }
            }
            else if (parseInt(i) == 1) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    associateID = array[parseInt(i)];
                }
            }
            else if (parseInt(i) == 2) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    jobtypeID = array[i];
                }
            }
            else if (parseInt(i) == 3) {
                if (array[parseInt(i)] == '') {
                }
                else {
                    zipcode = array[parseInt(i)];
                }
            }
        }
        this.salesAdvertisements
            .InsertConsumerInterest(adverID, associateID, jobtypeID, zipcode)
            .subscribe(function (data) {
            _this.salesAdvertisements
                .SendConsumerDetail(associateID, adverID, jobtypeID, zipcode)
                .subscribe(function (data1) {
                if (data.d == "1") {
                    //$("#msg" + pnlID).css("display", "block");
                    //setTimeout(function () {
                    //    window.location.reload();
                    //    //$('#msg' + pnlID).fadeOut('fast');
                    //}, 2000);
                    _this.showToast("success", "Agent has been notified. For Additional Questions, please contact support at 866.456.7331.");
                }
                else if (data.d == "0") {
                    _this.showToast("danger", "Already exist");
                }
                else if (data.d == "3") {
                    _this.showToast("danger", "OOPS Error ! Please try again.");
                }
            });
        }, function (err) {
        });
    };
    PropertySalesAdvertisementsComponent.prototype.SaveBookmark = function (advId) {
        var _this = this;
        this.salesAdvertisements
            .UpdateSavedBookmarks(advId)
            .subscribe(function (data) {
            if (data.d == "0") {
                $('.saveBookmarkClass').each(function () {
                    if (advId == $(this).attr('data-id')) {
                        $(this).addClass('bookMarked');
                    }
                });
                _this.showToast('warning', "You have already saved this advertisement.");
            }
            else {
                $('.saveBookmarkClass').each(function () {
                    if (advId == $(this).attr('data-id')) {
                        $(this).addClass('bookMarked');
                    }
                });
                _this.showToast('success', "Advertisement bookmarked successfully.");
            }
        }, function (err) {
        });
        //this.salesAdvertisements
        //    .ConsumerIsLogin()
        //    .subscribe(
        //        (data) => {
        //            if (data.d == 0) {
        //            }
        //            else {
        //                this.showToast("danger", "You need to sign in");
        //                this.onOpenModalClickSaveBookMark("saveBookmark", advId);
        //            }
        //        }
        //    );
    };
    PropertySalesAdvertisementsComponent.prototype.onOpenModalClickSaveBookMark = function (isSaveBookMarksOrContactAssociate, advId) {
        var _this = this;
        var modal = this.modalService.open(AuthModalComponent, { size: 'lg', backdrop: "static" });
        var modalComponent = modal.componentInstance;
        modal.componentInstance.dismissParentCall.subscribe(function (data) {
            console.log(data);
            if (isSaveBookMarksOrContactAssociate == "saveBookmark") {
                if (data == "update") {
                    _this.isLoggedInValue = "1";
                    _this.SaveBookmark(advId);
                }
                else {
                    _this.isLoggedInValue = "0";
                    _this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
            }
        });
        modal.componentInstance.updateParentCall.subscribe(function (data) {
            debugger;
            _this.showToast('success', 'Property bookmark is in process');
            if (isSaveBookMarksOrContactAssociate == "saveBookmark") {
                if (data == "update") {
                    _this.isLoggedInValue = "1";
                    _this.SaveBookmark(advId);
                }
                else {
                    _this.isLoggedInValue = "0";
                    _this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
            }
        });
    };
    PropertySalesAdvertisementsComponent.prototype.onOpenModalClickAssociate = function (advIdnAndAssociateId) {
        var _this = this;
        var modal = this.modalService.open(AuthModalComponent, { size: 'lg', backdrop: "static" });
        var modalComponent = modal.componentInstance;
        modal.componentInstance.dismissParentCall.subscribe(function (data) {
            console.log(data);
            if (data == "update") {
                //book
                _this.isLoggedInValue = "1";
                _this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                _this.isLoggedInValue = "0";
                _this.showToast('danger', "Something went wrong. Please try again.");
            }
        });
        modal.componentInstance.updateParentCall.subscribe(function (data) {
            debugger;
            _this.showToast('success', 'Request to Associate is in process');
            if (data == "update") {
                //book
                _this.isLoggedInValue = "1";
                _this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                _this.isLoggedInValue = "0";
                _this.showToast('danger', "Something went wrong. Please try again.");
            }
        });
    };
    PropertySalesAdvertisementsComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    };
    PropertySalesAdvertisementsComponent.prototype.ContactAssociate = function (advIdAndAssociateId, pnlID) {
        var _this = this;
        if (pnlID === void 0) { pnlID = 0; }
        this.salesAdvertisements
            .CheckEmailAndPhNo()
            .subscribe(function (data) {
            if (_this.isLoggedInValue == "0") {
            }
            else if (_this.isLoggedInValue == "1") {
                _this.ContactAssociates(advIdAndAssociateId);
            }
            else {
                _this.showToast("danger", "You cannot contact this Associate at this time.");
                _this.showToast("danger", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
            }
        }, function (err) {
            return false;
        });
        //this.salesAdvertisements
        //    .ConsumerIsLogin()
        //    .subscribe(
        //        (data) => {
        //            if (data.d > 0) {
        //            }
        //            else {
        //                this.showToast("danger", "You need to sign in");
        //                this.onOpenModalClickAssociate(advIdAndAssociateId);
        //            }
        //        });
    };
    PropertySalesAdvertisementsComponent = tslib_1.__decorate([
        Component({
            selector: 'property-sales-advertisement',
            templateUrl: './property-sales-advertisement.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [MessageService, Router, SalesAdvertisementsService, XMLToJSON,
            ActivatedRoute, NgbModal, Toaster])
    ], PropertySalesAdvertisementsComponent);
    return PropertySalesAdvertisementsComponent;
}());
export { PropertySalesAdvertisementsComponent };
//# sourceMappingURL=property-sales-advertisement.component.js.map