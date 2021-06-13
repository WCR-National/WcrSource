import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

import * as $ from 'jquery';

import { SearchService, MessageService } from '../../services/search';
import { debug } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

declare const gridLayoutSwitcher: any;


@Component({
    selector: 'service-profile',
    templateUrl: './service-profile.component.html'
})

export class ServiceProfileComponent implements OnInit {
    isloadingIconVisible: boolean = true;
    public data: string;
    public category: string;
    public id: string;
    public zipcode: string;
    public name: string;
    public jtype: string;
    public catName: string;
    public isLoggedInValue: string;
    public count: number = 0;
    public isDataNotFound = true;
    public isDataNotFoundForMortgage = false;
    public isDataNotFoundForInsurance = false;
    public isDataNotFoundForRealtors = false;
    public dataServicesList;

    public isTabMortgageStart: boolean = true;
    public isTabInsuranceStart: boolean = true;
    public isMultiFamilyStartCS: boolean = true;
    public isTabRealtorsStart: boolean = true;
    @ViewChild('ctdTabset') ctdTabset;

    constructor(private fb: FormBuilder, private renderer: Renderer2, private searchService: SearchService, @Inject(PLATFORM_ID) private platformId: Object,
        private _messageService: MessageService, private router: Router, private salesAdvertisements: SalesAdvertisementsService, private xmlToJson: XMLToJSON,
        private route: ActivatedRoute, private modalService: NgbModal, private toaster: Toaster) {

    }

    ngOnInit() {
        this.checkUserIsLogin();

        //this.show_check = true;
        //$('html, body').animate({ scrollTop: $('#header-container').offset().top }, 'slow');

        this.route.url.subscribe(data => {
            debugger;
        });

        this.route.queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                //this.page = +params['page'] || 0;

                this.category = params['ca'];
                this.catName = params['catName'];
                this.id = params['id'];
                this.zipcode = params['zipcode'];
                this.name = params['name'];
                this.jtype = params['jtype'];
                var thisStatus = this;

                setTimeout(function () {
                    if (thisStatus.id == '2') {
                        thisStatus.isTabMortgageStart = true;
                        thisStatus.isTabInsuranceStart = false;
                        thisStatus.isTabRealtorsStart = false;
                        thisStatus.switchTabs('mortgageTabId');

                    }
                    else if (thisStatus.id == '3') {
                        thisStatus.isTabMortgageStart = false;
                        thisStatus.isTabInsuranceStart = true;
                        thisStatus.isTabRealtorsStart = false;
                        thisStatus.switchTabs('insuranceTabId');

                    }
                    else if (thisStatus.id == '5') {
                        thisStatus.isTabMortgageStart = false;
                        thisStatus.isTabInsuranceStart = false;








                        thisStatus.isTabRealtorsStart = true;
                        thisStatus.switchTabs('realtorsTabId');

                    }
                    thisStatus.GetSalesAdvListings(thisStatus.id, thisStatus.zipcode, thisStatus.name, thisStatus.jtype, thisStatus.catName);

                }, 500);
            });
    }

    ngOnDestroy() {
        this._messageService.messageHidden.value = this.zipcode;
        this._messageService.messageHidden.type = "zipcode";
    }

    checkUserIsLogin() {
        this.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(
                (data) => {

                    if (data.d == 0) {
                        this.isLoggedInValue = "0";
                    }
                    else {
                        this.isLoggedInValue = "1";
                    }
                }
            );
    }

    GetSalesAdvListings(id, zipcode, name, jtype, catName) {
        debugger;
        this.salesAdvertisements.SelectServicesListData(zipcode, id).subscribe(
            (data) => {
                debugger;
                if (data.d.length > 0) {
                    debugger;
                    //var cnt = 1;
                    //var xmlDoc1 = $.parseXML(data.d);
                    //var xml1 = $(xmlDoc1);
                    //var docs = xml1.find("GetServicesList");
                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);
                    if (dataJson.NewDataSet != undefined && dataJson.NewDataSet != null && dataJson.NewDataSet != '') {
                        this.dataServicesList = [];
                        if (dataJson.NewDataSet.GetServicesList != undefined && dataJson.NewDataSet.GetServicesList != null && dataJson.NewDataSet.GetServicesList != '') {
                            if (!$.isArray(dataJson.NewDataSet.GetServicesList)) { // Returns: "object"

                                this.dataServicesList.push(dataJson.NewDataSet.GetServicesList);
                                this.AddListOfServices(this.dataServicesList, id);

                            }
                            else {
                                debugger;
                                var thisStatus = this;
                                $.each(dataJson.NewDataSet.GetServicesList, function (index, item) {
                                    thisStatus.dataServicesList.push(item);
                                });
                                this.AddListOfServices(this.dataServicesList, id);
                            }
                        }

                        this.isDataNotFoundForMortgage = false;
                        this.isDataNotFoundForInsurance = false;
                        this.isDataNotFoundForRealtors = false;

                    }
                    else {

                        this.isDataNotFoundForMortgage = true;
                        this.isDataNotFoundForInsurance = true;
                        this.isDataNotFoundForRealtors = true;
                        this.isTabMortgageStart = false;
                        this.isTabInsuranceStart = false;
                        this.isTabRealtorsStart = false;
                    }

                    setTimeout(function () {
                        this.isloadingIconVisible = false;
                    }, 1000);
                }
                else {

                }
            });
    }

    GetSalesAdvFromTabs(id) {
        debugger;
        if (id == '2') {
            this.isTabMortgageStart = true;
            this.isTabInsuranceStart = false;
            this.isTabRealtorsStart = false;
            this.switchTabs('mortgageTabId');
        }
        else if (id == '3') {
            this.isTabMortgageStart = false;
            this.isTabInsuranceStart = true;
            this.isTabRealtorsStart = false;
            this.switchTabs('insuranceTabId');
        }
        else if (id == '5') {
            this.isTabMortgageStart = false;
            this.isTabInsuranceStart = false;
            this.isTabRealtorsStart = true;
            this.switchTabs('realtorsTabId');
        }
        var html = '';
        $('#innerHtmlListMortgageId').html(html);
        $('#innerHtmlListInsuranceId').html(html);
        $('#innerHtmlListRealtorsId').html(html);
        this.isDataNotFoundForMortgage = false;
        this.isDataNotFoundForInsurance = false;
        this.isDataNotFoundForRealtors = false;
        this.GetSalesAdvListings(id, this.zipcode, this.name, this.jtype, this.catName);
    }



    AddListOfServices(dataServicesLst, id) {

        $('#innerHtmlListServicesId').html('');
        let count = 0;
        var html = '';
        $('#innerHtmlListMortgageId').html(html);
        $('#innerHtmlListInsuranceId').html(html);
        $('#innerHtmlListRealtorsId').html(html);
        this.isDataNotFoundForMortgage = true;
        this.isDataNotFoundForInsurance = true;
        this.isDataNotFoundForRealtors = true;
        var thisStatus = this;
        $.each(dataServicesLst, function (index, item) {
            html += '<div class="listing-item"  >';
            html += '<a href="javascript:void(0)" class="listing-img-container" style="height: 271px;">';
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
            if (item.photo != undefined && item.photo != null && item.photo != "") {
                let itemImage = "../../../../AssociatePhoto/" + item.photo;
                html += '<div><img class="imageServices" src="' + itemImage + '" alt=""></div>';
            }
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
            html += item.cityID + ". " + item.StateID + ", " + item.zipcode
            html += '</a>';

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
                html += '<a href="javascript:void(0)" class="btn button border contactAssociateClass" data-id="' + strParamContactAssociate + '" id="contactAssociateId" > Contact Associates </a>';
            }

            if (thisStatus.isLoggedInValue == "0") {

                var id = thisStatus.id;// + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
                html += '<a class="btn button border showInterestBookMarkClass showInterestBookMarkId mg-l-15-f" data-id="' + id + '"  data-zipcode="' + thisStatus.zipcode + '" > Bookmark </a>';
            }
            else {
                if (item.ConsumerID != null) {
                    html += '<a class="btn button border bookMarked SaveBookmarkId   mg-l-15-f" data-id="' + thisStatus.id + '" data-zipcode="' + item.zipcode + '" > Bookmark </a>';
                }
                else {
                    html += '<a class="btn button border SaveBookmarkId  mg-l-15-f" data-id="' + thisStatus.id + '" data-zipcode="' + thisStatus.zipcode + '" > Bookmark </a>';
                }
            }

            //html += '<span> Zip Code: ' + item.zipcode + '</span>';
            html += '</div>';
            html += '</div>';
            //{ { count + 1 } }

            html += '</div>';
            count++;
        });

        if (id == 2) {
            $('#innerHtmlListMortgageId').html(html);
            this.isTabMortgageStart = false;
        }
        else if (id == 3) {
            $('#innerHtmlListInsuranceId').html(html);
            this.isTabInsuranceStart = false;
        }
        else if (id == 5) {
            $('#innerHtmlListRealtorsId').html(html);
            this.isTabRealtorsStart = false;
        }
        //$('#innerHtmlListServicesId').html(html);
        this.InitializeEventsDynamicHtml();
        //gridLayoutSwitcher();
    }

    InitializeEventsDynamicHtml() {

        var thisStatus = this;
        $('.SaveBookmarkId').click(function () {

            var advId = $(this).attr('data-id');
            var zipcode = $(this).attr('data-zipcode');

            debugger;
            thisStatus.salesAdvertisements
                .UpdateSavedBookmarksService(advId, zipcode)
                .subscribe(
                    data => {

                        if (data.d == "0") {
                            $(this).addClass('bookMarked');

                            thisStatus.showToast('Warning', "You have already saved this advertisement.");
                        }
                        else {
                            $(this).addClass('bookMarked');
                            thisStatus.showToast('success', "Advertisement bookmarked successfully.");
                        }
                    },
                    err => {
                    }
                );

            //thisStatus.salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {
            //            debugger;

            //            if (data.d > 0) {

            //            }
            //            else {
            //                thisStatus.showToast("Warning", "You need to sign in");
            //                thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
            //            }
            //        });
        });

        $('.showInterestBookMarkId').click(function () {
            var advId = $(this).attr('data-id');
            var zipcode = $(this).attr('data-zipcode');
            thisStatus.onOpenModalClickSaveBookMark(advId, zipcode);
        });

        $('.contactAssociateClass').click(function () {

            //$('#contactAssociateId').addClass('bookMarked');
            var advIdAndAssociateId = $(this).attr('data-id');
            thisStatus.salesAdvertisements
                .CheckEmailAndPhNo()
                .subscribe(
                    (data1) => {
                        debugger;

                        if (thisStatus.isLoggedInValue == "0") {

                        }
                        else if (thisStatus.isLoggedInValue == "1") {
                            thisStatus.ContactAssociates(advIdAndAssociateId);
                        }
                        else {
                            thisStatus.showToast("Warning", "You cannot contact this Associate at this time.");
                            thisStatus.showToast("Warning", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                        }
                    },
                    err => {
                        return false;
                    }
                );
            //thisStatus
            //    .salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {
            //            debugger;

            //            if (data.d > 0) {


            //            }
            //            else {
            //                thisStatus.showToast("Warning", "You need to sign in");
            //                thisStatus.onOpenModalClickAssociate(advIdAndAssociateId);
            //            }
            //        });
        });

        $('.contactAssociateInterestClass').click(function () {

            var param = $(this).attr('data-id');
            thisStatus.onOpenModalClickAssociate(param);

        });
    }



    onOpenModalClickSaveBookMark(advId, zipcode): void {

        const modal: NgbModalRef = this.modalService.open(AuthModalComponent, { size: 'sm', backdrop: "static" });
        (modal.componentInstance as AuthModalComponent).isBookmark = true;

        const modalComponent: AuthModalComponent = modal.componentInstance;

        modal.componentInstance.dismissParentCall.subscribe((data) => {
            console.log(data);
                if (data == "update") {
                    this.isLoggedInValue = "1";
                    this.SaveBookmark(advId, zipcode);
                }
                else {
                    this.isLoggedInValue = "0";
                    //this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;
            if (data == "update") {
                this.showToast('success', 'Saving Bookmark is in process');
                this._messageService.filter("updateHeader");

                this.isLoggedInValue = "1";
                this.SaveBookmark(advId, zipcode);
            }
            else {
                this.isLoggedInValue = "0";
                this.showToast('danger', "Something went wrong. Please try again. Refresh page");
            }
        });

    }

    SaveBookmark(advId, zipcode) {

        let thisStatus = this;
        thisStatus.salesAdvertisements
            .UpdateSavedBookmarksService(advId, zipcode)
            .subscribe(
                data => {
                    debugger;
                    if (data.d == "0") {
                        $('.showInterestBookMarkClass').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass("bookMarked");
                            }
                        });
                        thisStatus.showToast('warning', "You have already saved this advertisement.");
                    }
                    else {
                        $('.showInterestBookMarkClass').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass("bookMarked");
                            }
                        });
                        thisStatus.showToast('success', "Advertisement bookmarked successfully.");
                    }
                },
                err => {
                }
            );
    }


    onOpenModalClickAssociate(advIdnAndAssociateId): void {
        const modal: NgbModalRef = this.modalService.open(AuthModalComponent, { size: 'sm', backdrop: "static" });
        (modal.componentInstance as AuthModalComponent).isContactAssociate = true;
        const modalComponent: AuthModalComponent = modal.componentInstance;

        modal.componentInstance.dismissParentCall.subscribe((data) => {
            console.log(data);
            if (data == "update") {
                //book
                this.isLoggedInValue = "1";
                this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                this.isLoggedInValue = "0";
                //this.showToast('danger', "Something went wrong. Please try again.");
            }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;
            if (data == "update") {
                //book
                this.showToast('success', 'Request to Associate is in process');
                this._messageService.filter("updateHeader");

                this.isLoggedInValue = "1";
                this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                this.isLoggedInValue = "0";
                this.showToast('danger', "Something went wrong. Please try again.");
            }
        });
    }

    ContactAssociate(advIdnAndAssociateId) {
        var thisStatus = this;
        //var advIdnAndAssociateId = $(this).attr('data-id');
        thisStatus.salesAdvertisements
            .CheckEmailAndPhNo()
            .subscribe(
                (data1) => {
                    debugger;

                    if (thisStatus.isLoggedInValue == "0") {

                    }
                    else if (thisStatus.isLoggedInValue == "1") {
                        thisStatus.ContactAssociates(advIdnAndAssociateId);
                    }
                    else {
                        thisStatus.showToast("Warning", "You cannot contact this Associate at this time.");
                        thisStatus.showToast("Warning", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                    }
                },
                err => {
                    return false;
                }
            );
    }

    ContactAssociates(advIdAndAssociateId) {

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
            .subscribe(
                data => {

                    this.salesAdvertisements
                        .SendConsumerDetail(associateID, adverID, jobtypeID, zipcode)
                        .subscribe(
                            (data1) => {
                                if (data.d == "1") {
                                    //$("#msg" + pnlID).css("display", "block");
                                    //setTimeout(function () {
                                    //    //window.location.reload();
                                    //    //$('#msg' + pnlID).fadeOut('fast');
                                    //}, 2000);
                                    this.showToast("success", "Agent has been notified. For Additional Questions, please contact support at 866.456.7331.")
                                }
                                else if (data.d == "0") {
                                    this.showToast("Warning", "Already exist")
                                }
                                else if (data.d == "3") {
                                    this.showToast("Warning", "OOPS Error ! Please try again.")
                                }
                            }
                        );

                },
                err => {
                }
            );
    }


    contactAssocistesAndAdvertisement(advIdAndAssociateId) {
        let l_type = '';

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
            .subscribe(
                data => {

                    this.salesAdvertisements
                        .SendConsumerDetail(associateID, adverID, jobtypeID, zipcode)
                        .subscribe(
                            (data1) => {
                                if (data.d == "1") {
                                    //$("#msg" + pnlID).css("display", "block");
                                    //setTimeout(function () {
                                    //    //window.location.reload();
                                    //    //$('#msg' + pnlID).fadeOut('fast');
                                    //}, 2000);
                                    this.showToast("success", "Agent has been notified. For Additional Questions, please contact support at 866.456.7331.")
                                }
                                else if (data.d == "0") {
                                    this.showToast("Warning", "Already exist")
                                }
                                else if (data.d == "3") {
                                    this.showToast("Warning", "OOPS Error ! Please try again.")
                                }
                            }
                        );
                },
                err => {
                }
            );

    }

    insertionBookmarksinContactAssociates(advId, zipcode) {
        debugger;
        let thisStatus = this;
        thisStatus.salesAdvertisements
            .ConsumerIsLogin()
            .subscribe(
                (data) => {
                    debugger;

                    if (data.d == 0) {
                        thisStatus.salesAdvertisements
                            .UpdateSavedBookmarksService(advId, zipcode)
                            .subscribe(
                                data => {

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
                                        }); thisStatus.showToast('success', "Advertisement bookmarked successfully.");
                                    }
                                },
                                err => {
                                }
                            );
                    }
                    else {
                        thisStatus.showToast("Warning", "You need to sign in");
                        thisStatus.onOpenModalClickSaveBookMark( advId, zipcode);
                    }
                });
    }

    switchTabs(id) {
        this.ctdTabset.select(id);
    }

    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type ,
            type: type,
            duration: 8000
        });
    }

}