import * as tslib_1 from "tslib";
import { Component, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { SearchService, MessageService } from '../../services/search';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
var ServiceProfileComponent = /** @class */ (function () {
    function ServiceProfileComponent(fb, renderer, searchService, platformId, _messageService, router, salesAdvertisements, xmlToJson, route, modalService, toaster) {
        this.fb = fb;
        this.renderer = renderer;
        this.searchService = searchService;
        this.platformId = platformId;
        this._messageService = _messageService;
        this.router = router;
        this.salesAdvertisements = salesAdvertisements;
        this.xmlToJson = xmlToJson;
        this.route = route;
        this.modalService = modalService;
        this.toaster = toaster;
        this.isloadingIconVisible = true;
        this.count = 0;
        this.IsDataFound = true;
    }
    ServiceProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkUserIsLogin();
        //this.show_check = true;
        //$('html, body').animate({ scrollTop: $('#header-container').offset().top }, 'slow');
        this.route.url.subscribe(function (data) {
            debugger;
        });
        this.route.queryParams
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            //this.page = +params['page'] || 0;
            _this.category = params['ca'];
            _this.catName = params['catName'];
            _this.id = params['id'];
            _this.zipcode = params['zipcode'];
            _this.name = params['name'];
            _this.jtype = params['jtype'];
            _this.GetSalesAdvListings(_this.id, _this.zipcode, _this.name, _this.jtype, _this.catName);
        });
    };
    ServiceProfileComponent.prototype.checkUserIsLogin = function () {
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
    ServiceProfileComponent.prototype.GetSalesAdvListings = function (id, zipcode, name, jtype, catName) {
        var _this = this;
        debugger;
        this.salesAdvertisements.SelectServicesListData(zipcode, id).subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                debugger;
                //var cnt = 1;
                //var xmlDoc1 = $.parseXML(data.d);
                //var xml1 = $(xmlDoc1);
                //var docs = xml1.find("GetServicesList");
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                if (dataJson.NewDataSet != undefined && dataJson.NewDataSet != null && dataJson.NewDataSet != '') {
                    _this.dataServicesList = [];
                    if (dataJson.NewDataSet.GetServicesList != undefined && dataJson.NewDataSet.GetServicesList != null && dataJson.NewDataSet.GetServicesList != '') {
                        if (typeof (dataJson.NewDataSet.GetServicesList) == "object") { // Returns: "object"
                            _this.dataServicesList.push(dataJson.NewDataSet.GetServicesList);
                            _this.AddListOfServices(_this.dataServicesList);
                        }
                        else {
                            $.each(dataJson.NewDataSet.GetServicesList, function (index, item) {
                                this.dataServicesList.push(item);
                            });
                            _this.AddListOfServices(_this.dataServicesList);
                        }
                    }
                    _this.IsDataFound = true;
                }
                else {
                    _this.IsDataFound = false;
                }
                setTimeout(function () {
                    this.isloadingIconVisible = false;
                }, 1000);
            }
            else {
            }
        });
    };
    ServiceProfileComponent.prototype.AddListOfServices = function (dataServicesLst) {
        $('#innerHtmlListServicesId').html('');
        var count = 0;
        var html = '';
        var thisStatus = this;
        $.each(dataServicesLst, function (index, item) {
            html += '<div class="listing-item"  >';
            html += '<a href="javascript:void(0)" class="listing-img-container">';
            //<!--< div class="listing-badges" >
            //    <span>For Rent < /span>
            //        < /div>-->
            html += '<div class="listing-img-content" >';
            //html += '<span class="listing-price" > $ ' + item.cost + ' <i></i></span >';
            //<!--< span class="like-icon with-tip" data - tip - content="Add to Bookmarks" > </span>
            //    < span class="compare-button with-tip" data - tip - content="Add to Compare" > </span>-->
            html += '</div>';
            html += '<div class="listing-carousel" >';
            debugger;
            if (item.photo != undefined && item.photo != null && item.photo != "")
                html += '<div><img class="imageServices" src="../../../../Associate/Adv_img/"' + item.photo + ' alt=""></div>';
            //if (item.advImage1 == undefined && item.advImage1 != null && item.advImage1 != "")
            //    html += '<div><img src="../../../../Associate/Adv_img/"' + item.advMainImage + ' alt=""></div>';
            //if (item.advImage2 == undefined && item.advImage2 != null && item.advImage2 != "")
            //    html += '<div><img src="../../../../Associate/Adv_img/"' + item.advImage2 + ' alt=""></div>';
            //if (item.advImage3 == undefined && item.advImage3 != null && item.advImage3 != "")
            //    html += '<div><img src="../../../../Associate/Adv_img/"' + item.advImage3 + ' alt=""></div>';
            html += '</div>';
            html += '</a>';
            html += '<div class="listing-content">';
            html += '<div class="listing-title" >';
            html += '<h4><a href="javascript:void(0)" > ' + item.Name;
            html += '</a></h4>';
            //https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom
            html += '<a href="javascript:void(0);" class="listing-address popup-gmaps" >';
            html += '<i class="fa fa-map-marker" > </i>';
            html += item.cityID + ". " + item.StateID + ", " + item.zipcode;
            html += '</a>';
            if (thisStatus.isLoggedInValue == "0") {
                var params = thisStatus.id + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
                html += '<a class="details button border showInterestBookMarkId" data-id="' + params + '" (click)="showInterestBookMark(\'' + params + '\')" > Bookmark </a>';
            }
            else {
                if (item.consumerID != null) {
                    html += '<a class="details button border bookMarked SaveBookmarkId" data-id="' + thisStatus.id + '"  > Bookmark </a>';
                }
                else {
                    html += '<a class="details button border SaveBookmarkId" data-id="' + thisStatus.id + '"  > Bookmark </a>';
                }
            }
            //if (item.description.length > 150)
            //    html += '<div> ' + item.description.substring(0, 150) + "..." + '</div>';
            //else if (item.description.length < 150)
            //    html += '<div>' + item.description + '</div>';
            html += '</div>';
            html += '<ul class="listing-details" >';
            html += '<li><b>License #</b>: ' + item.LicenseId + '</li>';
            html += '<li><b> Associate ID </b>:' + item.associateid + '</li>';
            html += '<li><b> Category Name </b>: ' + thisStatus.catName + ' </li>';
            //if (item.subcategoryID == '1')
            //    html += '<li> Category Name: Home </li>';
            //if (item.subcategoryID == '2')
            //    html += '<li> Category Name: Town Home </li>';
            //if (item.subcategoryID == '3')
            //    html += '<li> Category Name: Multi Family </li>';
            //if (item.subcategoryID == '4')
            //    html += '<li> Category Name: Land </li>';
            html += '</ul>';
            html += '<div class="listing-footer" >';
            //{{  }}
            var strParamContactAssociateShowInterest = thisStatus.id + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
            var strParamContactAssociate = thisStatus.id + "," + item.associateid + ",2," + item.zipcode + "," + count;
            if (thisStatus.isLoggedInValue == "0") {
                html += '<a href="javascript:void(0)" class="btn button border contactAssociateInterestClass"  data-id="' + strParamContactAssociateShowInterest + '"> Contact Associates </a>';
            }
            else {
                html += '<a href="javascript:void(0)" class="btn button border bookMarked contactAssociateClass" data-id="' + strParamContactAssociate + '" > Contact Associates </a>';
            }
            html += '<span> Zip Code: ' + item.zipcode + '</span>';
            html += '</div>';
            html += '</div>';
            //{ { count + 1 } }
            html += '</div>';
            count++;
        });
        $('#innerHtmlListServicesId').html(html);
        this.InitializeEventsDynamicHtml();
        //gridLayoutSwitcher();
    };
    ServiceProfileComponent.prototype.InitializeEventsDynamicHtml = function () {
        var thisStatus = this;
        $('.SaveBookmarkId').click(function () {
            var _this = this;
            var advId = $(this).attr('data-id');
            debugger;
            thisStatus.salesAdvertisements
                .UpdateSavedBookmarks(advId)
                .subscribe(function (data) {
                if (data.d == "0") {
                    $(_this).addClass('bookMarked');
                    thisStatus.showToast('warning', "You have already saved this advertisement.");
                }
                else {
                    $(_this).addClass('bookMarked');
                    thisStatus.showToast('success', "Advertisement bookmarked successfully.");
                }
            }, function (err) {
            });
            //thisStatus.salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {
            //            debugger;
            //            if (data.d > 0) {
            //            }
            //            else {
            //                thisStatus.showToast("danger", "You need to sign in");
            //                thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
            //            }
            //        });
        });
        $('.showInterestBookMarkId').click(function () {
            var advId = $(this).attr('data-id');
            thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
        });
        $('.contactAssociateClass').click(function () {
            var advIdAndAssociateId = $(this).attr('data-id');
            thisStatus.salesAdvertisements
                .CheckEmailAndPhNo()
                .subscribe(function (data1) {
                debugger;
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
            //thisStatus
            //    .salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {
            //            debugger;
            //            if (data.d > 0) {
            //            }
            //            else {
            //                thisStatus.showToast("danger", "You need to sign in");
            //                thisStatus.onOpenModalClickAssociate(advIdAndAssociateId);
            //            }
            //        });
        });
        $('.contactAssociateInterestClass').click(function () {
            var param = $(this).attr('data-id');
            thisStatus.onOpenModalClickAssociate(param);
        });
    };
    ServiceProfileComponent.prototype.SaveBookmark = function (advId) {
        var thisStatus = this;
        thisStatus.salesAdvertisements
            .UpdateSavedBookmarks(advId)
            .subscribe(function (data) {
            if (data.d == "0") {
                $('.SaveBookmarkId').each(function () {
                    if (advId == $(this).attr('data-id')) {
                        $(this).addClass("bookMarked");
                    }
                });
                thisStatus.showToast('warning', "You have already saved this advertisement.");
            }
            else {
                $('.SaveBookmarkId').each(function () {
                    if (advId == $(this).attr('data-id')) {
                        $(this).addClass("bookMarked");
                    }
                });
                thisStatus.showToast('success', "Advertisement bookmarked successfully.");
            }
        }, function (err) {
        });
        //thisStatus.salesAdvertisements
        //    .ConsumerIsLogin()
        //    .subscribe(
        //        (data) => {
        //            debugger;
        //            if (data.d == 0) {
        //            }
        //            else {
        //                thisStatus.showToast("danger", "You need to sign in");
        //                thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
        //            }
        //        });
    };
    ServiceProfileComponent.prototype.onOpenModalClickSaveBookMark = function (isSaveBookMarksOrContactAssociate, advId) {
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
            _this.showToast('success', 'Purchasing is in process');
        });
    };
    ServiceProfileComponent.prototype.ContactAssociates = function (advIdAndAssociateId) {
        var _this = this;
        debugger;
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
                    //    //window.location.reload();
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
    ServiceProfileComponent.prototype.ContactAssociate = function (advIdnAndAssociateId) {
        var thisStatus = this;
        //var advIdnAndAssociateId = $(this).attr('data-id');
        thisStatus.salesAdvertisements
            .CheckEmailAndPhNo()
            .subscribe(function (data1) {
            debugger;
            if (thisStatus.isLoggedInValue == "0") {
            }
            else if (thisStatus.isLoggedInValue == "1") {
                thisStatus.ContactAssociates(advIdnAndAssociateId);
            }
            else {
                thisStatus.showToast("danger", "You cannot contact this Associate at this time.");
                thisStatus.showToast("danger", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
            }
        }, function (err) {
            return false;
        });
        //thisStatus
        //    .salesAdvertisements
        //    .ConsumerIsLogin()
        //    .subscribe(
        //        (data) => {
        //            debugger;
        //            if (data.d > 0) {
        //            }
        //            else {
        //                thisStatus.showToast("danger", "You need to sign in");
        //                thisStatus.onOpenModalClickAssociate(advIdAndAssociateId);
        //            }
        //        });
    };
    ServiceProfileComponent.prototype.onOpenModalClickAssociate = function (advIdnAndAssociateId) {
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
            _this.showToast('success', 'Purchasing is in process');
        });
    };
    ServiceProfileComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    };
    ServiceProfileComponent.prototype.contactAssocistesAndAdvertisement = function (advIdAndAssociateId) {
        var _this = this;
        var l_type = '';
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
                    //    //window.location.reload();
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
    ServiceProfileComponent.prototype.insertionBookmarksinContactAssociates = function (advId) {
        var thisStatus = this;
        thisStatus.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(function (data) {
            debugger;
            if (data.d == 0) {
                thisStatus.salesAdvertisements
                    .UpdateSavedBookmarks(advId)
                    .subscribe(function (data) {
                    if (data.d == "0") {
                        $('.SaveBookmarkId').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass("bookMarked");
                            }
                        });
                        thisStatus.showToast('warning', "You have already saved this advertisement.");
                    }
                    else {
                        $('.SaveBookmarkId').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass("bookMarked");
                            }
                        });
                        thisStatus.showToast('success', "Advertisement bookmarked successfully.");
                    }
                }, function (err) {
                });
            }
            else {
                thisStatus.showToast("danger", "You need to sign in");
                thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
            }
        });
    };
    ServiceProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'service-profile',
            templateUrl: './service-profile.component.html'
        }),
        tslib_1.__param(3, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, Renderer2, SearchService, Object,
            MessageService, Router, SalesAdvertisementsService, XMLToJSON,
            ActivatedRoute, NgbModal, Toaster])
    ], ServiceProfileComponent);
    return ServiceProfileComponent;
}());
export { ServiceProfileComponent };
//# sourceMappingURL=service-profile.component.js.map