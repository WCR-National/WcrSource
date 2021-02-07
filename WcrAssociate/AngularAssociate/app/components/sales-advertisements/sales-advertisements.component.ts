import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

import * as $ from 'jquery';

import { SearchService, MessageService } from '../../services/search';
import { debug } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { Toaster } from 'ngx-toast-notifications';

declare const gridLayoutSwitcher: any;


@Component({
    selector: 'sales-advertisement',
    templateUrl: './sales-advertisements.component.html'
})

export class SalesAdvertisementsComponent implements OnInit {
    isloadingIconVisible: boolean = true;
    count: number = 0;

    public data: string;
    public isLoggedInValue: string;
    public category: string;
    public id: string;
    public zipcode: string;
    public name: string;
    public jtype: string;
    public catName: string;
    public isDataNotFound: boolean;
    public isDataNotFoundForHome = false;
    public isDataNotFoundForTownHome = false;
    public isDataNotFoundForMultiFamily = false;
    public isDataNotFoundForLand = false;

    public dataServicesList = [];

    public isTabHomeStart: boolean = true;
    public isTabTownHomeStart: boolean = true;
    public isMultiFamilyStartCS: boolean = true;
    public isTabLandStart: boolean = true;
    @ViewChild('ctdTabset') ctdTabset;


    validationMessages = {
        'required': 'Please enter City, State OR Zip Code.',
        'invalidData': 'Invalid data entered.  Please enter city, state OR zip code.',
        'zipCode': 'Please enter 5 digit zip code',
        'invalidZipCode': 'Please enter valid zip code (digits only for zip code)',
        'statePattern': 'Please enter 2 characters for state like "TX".',
        'cityStatePattern': 'Please enter valid format like "Dallas, TX" OR "Dallas, Texas"'
    };

    formErrors = {
        'txtSearch': ''
    };

    constructor(private _messageService: MessageService, private router: Router, private salesAdvertisements: SalesAdvertisementsService, private xmlToJson: XMLToJSON,
        private route: ActivatedRoute, private modalService: NgbModal, private toaster: Toaster) {

    }

    ngOnInit()
    {
        this.checkUserIsLogin();
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
                this.GetSalesAdvListings(this.id, this.zipcode, this.name, this.jtype, this.catName);

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
        this.isloadingIconVisible = true;
        var thisStatus = this;
        setTimeout(function () {
            if (id == '1') {
                thisStatus.isTabHomeStart = true;
                thisStatus.isTabTownHomeStart = false;
                thisStatus.isMultiFamilyStartCS = false;
                thisStatus.isTabLandStart = false;
                thisStatus.switchTabs('homeTabId');

            }
            else if (id == '2') {
                thisStatus.isTabHomeStart = false;
                thisStatus.isTabTownHomeStart = true;
                thisStatus.isMultiFamilyStartCS = false;
                thisStatus.isTabLandStart = false;
                thisStatus.switchTabs('townHomeTabId');

            }
            else if (id == '3') {
                thisStatus.isTabHomeStart = false;
                thisStatus.isTabTownHomeStart = false;
                thisStatus.isMultiFamilyStartCS = true;
                thisStatus.isTabLandStart = false;
                thisStatus.switchTabs('multiFamilyTabId');

            }
            else if (id == '4') {
                thisStatus.isTabHomeStart = false;
                thisStatus.isTabTownHomeStart = false;
                thisStatus.isMultiFamilyStartCS = false;
                thisStatus.isTabLandStart = true;
                thisStatus.switchTabs('landTabId');
            }
            thisStatus.ViewAdvertisements(id, zipcode, name, jtype, catName);
        }, 500);
        
    }

    GetSalesAdvFromTabs(id) {

        this.isloadingIconVisible = true;
        if (id == '1') {
            this.isTabHomeStart = true;
            this.isTabTownHomeStart = false;
            this.isMultiFamilyStartCS = false;
            this.isTabLandStart = false;
            this.switchTabs('homeTabId');
        }
        else if (id == '2') {
            this.isTabHomeStart = false;
            this.isTabTownHomeStart = true;
            this.isMultiFamilyStartCS = false;
            this.isTabLandStart = false;
            this.switchTabs('townHomeTabId');
        }
        else if (id == '3') {
            this.isTabHomeStart = false;
            this.isTabTownHomeStart = false;
            this.isMultiFamilyStartCS = true;
            this.isTabLandStart = false;
            this.switchTabs('multiFamilyTabId');
        }
        else if (id == '4') {
            this.isTabHomeStart = false;
            this.isTabTownHomeStart = false;
            this.isMultiFamilyStartCS = false;
            this.isTabLandStart = true;
            this.switchTabs('landTabId');
        }
        var html = '';
        $('#innerHtmlListHomeSalesId').html(html);
        $('#innerHtmlListTownHomeSalesId').html(html);
        $('#innerHtmlListMultiFamilySalesId').html(html);
        $('#innerHtmlListLandSalesId').html(html);
        this.isDataNotFoundForHome = false;
        this.isDataNotFoundForTownHome = false;
        this.isDataNotFoundForMultiFamily = false;
        this.isDataNotFoundForLand = false;
        this.ViewAdvertisements(id, this.zipcode, this.name, this.jtype, this.catName);
    }


    ViewAdvertisements(id, zipcode, name, jtype, catName) {

        if (jtype == 'Services') {
            $.ajax({
                type: "POST", url: "Associate/ws/SubCategory.asmx/SelectCatSubCategory",
                data: "{'flag':1,'Categoryid':" + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CatSubCategories");
                        $.each(docs, function (i, docs) {
                            id = ($(docs).find("id").text());
                        });
                    }
                },
                error: function (response) {
                    //alert(response.d + "Error...");
                }
            });
        }

        this.salesAdvertisements
            .ViewHomeAdvertisementsWithParam(id, zipcode)
            .subscribe(
                (data) => {
                    debugger;
                    if (data.d.length > 0) {


                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet != undefined && dataJson.NewDataSet != null && dataJson.NewDataSet != '') {
                            this.dataServicesList = [];
                            if (dataJson.NewDataSet.HViewAdvertismentsWithParam != undefined && dataJson.NewDataSet.HViewAdvertismentsWithParam != null && dataJson.NewDataSet.HViewAdvertismentsWithParam != '') {
                                if (!$.isArray(dataJson.NewDataSet.HViewAdvertismentsWithParam)) { // Returns: "object"
                                    this.dataServicesList.push(dataJson.NewDataSet.HViewAdvertismentsWithParam);
                                    this.AddListOfSales(this.dataServicesList, id);
                                }
                                else {
                                    var thisStatus = this;
                                    $.each(dataJson.NewDataSet.HViewAdvertismentsWithParam, function (index, item) {
                                        thisStatus.dataServicesList.push(item);
                                    });
                                    this.AddListOfSales(this.dataServicesList, id);
                                }
                            }
                            else {

                            }
                            this.isDataNotFoundForHome = false;
                            this.isDataNotFoundForTownHome = false;
                            this.isDataNotFoundForMultiFamily = false;
                            this.isDataNotFoundForLand = false;
                        }
                        else {
                            this.isDataNotFoundForHome = true;
                            this.isDataNotFoundForTownHome = true;
                            this.isDataNotFoundForMultiFamily = true;
                            this.isDataNotFoundForLand = true;
                            this.isTabHomeStart = false;
                            this.isTabTownHomeStart = false;
                            this.isMultiFamilyStartCS = false;
                            this.isTabLandStart = false;
                        }

                        setTimeout(function () {
                            this.isloadingIconVisible = false;
                        }, 1000);
                    }
                    else {
                        this.isloadingIconVisible = false;
                    }
                });
    }

    AddListOfSales(dataSalesList, id) {
        let count = 0;
        var html = '';
        $('#innerHtmlListHomeSalesId').html(html);
        $('#innerHtmlListTownHomeSalesId').html(html);
        $('#innerHtmlListMultiFamilySalesId').html(html);
        $('#innerHtmlListLandSalesId').html(html);
        var thisStatus = this;
        $.each(dataSalesList, function (index, item) {
            debugger;
            html += '<div class="listing-item"  >';
            html += "<a href='javascript:void(0)' class='listing-img-container salesLink' data-link='property-sale-advertisement'  data-qparam ='" + JSON.stringify({ "id": item.advertisementID }) + "'>";
            //<!--< div class="listing-badges" >
            //    <span>For Rent < /span>
            //        < /div>-->

            html += '<div class="listing-img-content" >';
            html += '<span class="listing-price" > $ ' + item.cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' <i></i></span>';
            //<!--< span class="like-icon with-tip" data - tip - content="Add to Bookmarks" > </span>
            //    < span class="compare-button with-tip" data - tip - content="Add to Compare" > </span>-->
            html += '</div>';

            html += '<div class="listing-carousel" >';
            if (item.advMainImage != undefined && item.advMainImage != null && item.advMainImage != "") {
                let advMainImg = "../../../../Associate/Adv_img/" + item.advMainImage;
                html += '<div><img class="imageServices" src="' + advMainImg + '" alt=""></div>';
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
            html += '<h4><a href="javascript:void(0)" > ' + item.title;
            html += '</a></h4>';

            //https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom
            html += '<a href="javascript:void(0);" class="listing-address popup-gmaps" >';
            html += '<i class="fa fa-map-marker" > </i>';
            html += item.City + ". " + item.State + ", " + item.ZipCode
            html += '</a>';


            //if (item.description.length > 150)
            //    html += '<div> ' + item.description.substring(0, 150) + "..." + '</div>';
            //else if (item.description.length < 150)
            //    html += '<div>' + item.description + '</div>';

            html += '</div>';


            html += '<ul class="listing-details" >';
            html += '<li><b>License #</b>: ' + item.LicenseId + '</li>';
            html += '<li><b> Associate ID </b>:' + item.associateID + '</li>';
            //html += '<li><b> Category Name </b>: ' + thisStatus.catName + ' </li>';

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
            var strParamContactAssociateShowInterest = item.advertisementID + "," + item.associateID + ",1,0," + count + ",1";
            var strParamContactAssociate = item.advertisementID + "," + item.associateID + ",1,0" + "," + count;

            //if (thisStatus.isLoggedInValue == "0") {
            //    html += '<a href="javascript:void(0)" class="btn button border contactAssociateShowInterestClass" data-id="' + strParamContactAssociateShowInterest + '"> Contact Associates </a>';
            //}
            //else {
            //    html += '<a href="javascript:void(0)" class="btn button border contactAssociateClass" data-id="' + strParamContactAssociate + '"> Contact Associates </a>';
            //}

            if (thisStatus.isLoggedInValue == "0") {
                var params = item.advertisementID;// + "," + item.associateID + ",1,0" + count + ",2";
                //html += '<a href = "javascript:void(0)" class="details button border showInterestBookMarkClass" data-id="' + params + '"> Bookmark </a>';
                html += '<a href = "javascript:void(0)" class="btn button border showInterestBookMarkClass" data-id="' + params + '"> Bookmark </a>';
            }
            else {
                debugger;
                if (item.consumerID != 0) {
                    html += '<a href = "javascript:void(0)" class="btn button border  bookMarked saveBookmarkClass" data-id="' + item.advertisementID + '"> Bookmark </a>';
                }
                else {
                    html += '<a href = "javascript:void(0)" class="btn button border saveBookmarkClass" data-id="' + item.advertisementID + '" > Bookmark </a>';
                }
            }

            html += '<span> Zip Code: ' + item.ZipCode + '</span>';
            html += '</div>';
            html += '</div>';
            //{ { count + 1 } }

            html += '</div>';
            count++;
        });
        if (id == 1) {
            $('#innerHtmlListHomeSalesId').html(html);
            this.isTabHomeStart = false;
        }
        else if (id == 2) {
            $('#innerHtmlListTownHomeSalesId').html(html);
            this.isTabTownHomeStart = false;
        }
        else if (id == 3) {
            $('#innerHtmlListMultiFamilySalesId').html(html);
            this.isMultiFamilyStartCS = false;
        }
        else if (id == 4) {
            $('#innerHtmlListLandSalesId').html(html);
            this.isMultiFamilyStartCS = false;
        }

        this.InitializeEvents();
        this.InitializeEventsClick();
        //gridLayoutSwitcher();
    }

    InitializeEvents() {
        var thisStatus = this;

        $('.contactAssociateShowInterestClass').click(function () {
            var advIdnAndAssociateId = $(this).attr('data-id');
            thisStatus.onOpenModalClickAssociate(advIdnAndAssociateId);
        });

        $('.contactAssociateClass').click(function () {
            let advIdAndAssociateId = $(this).attr('data-id');

            thisStatus.salesAdvertisements
                .CheckEmailAndPhNo()
                .subscribe(
                    data => {
                        if (thisStatus.isLoggedInValue == "0") {

                        }
                        else if (thisStatus.isLoggedInValue == "1") {
                            thisStatus.ContactAssociates(advIdAndAssociateId);
                        }
                        else {
                            thisStatus.showToast("danger", "You cannot contact this Associate at this time.");
                            thisStatus.showToast("danger", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                        }
                    },
                    err => {
                        return false;
                    }
                );

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
            let zipcode = 0;
            let advId = $(this).attr('data-id');

            thisStatus.salesAdvertisements
                .UpdateSavedBookmarksSales(advId, zipcode)
                .subscribe(
                    data => {

                        if (data.d == "0") {
                            $('.saveBookmarkClass').each(function () {
                                if (advId == $(this).attr('data-id')) {
                                    $(this).addClass('bookMarked');
                                }
                            });
                            thisStatus.showToast('warning', "You have already saved this advertisement.");
                        }
                        else {
                            $('.saveBookmarkClass').each(function () {
                                if (advId == $(this).attr('data-id')) {
                                    $(this).addClass('bookMarked');
                                }
                            });

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

            //            if (data.d > 0) {

            //            }
            //            else {
            //                debugger;
            //                thisStatus.showToast("danger", "You need to sign in");
            //                thisStatus.onOpenModalClickSaveBookMark("saveBookmark", advId);
            //            }
            //        }
            //    );
        });
    }

    InitializeEventsClick() {
        debugger;
        var thisStatus = this;
        setTimeout(function () {
            $('.salesLink').click(function () {
                debugger;
                let link = $(this).attr('data-link');
                let params = JSON.parse($(this).attr('data-qparam'));
                thisStatus.router.navigate([link], {
                    queryParams: params
                });
            });
        }, 1500);
    }



    onOpenModalClickSaveBookMark(isSaveBookMarksOrContactAssociate, advId): void {

        const modal: NgbModalRef = this.modalService.open(AuthModalComponent, { size: 'sm', backdrop: "static" });
        (modal.componentInstance as AuthModalComponent).isBookmark = true;
        const modalComponent: AuthModalComponent = modal.componentInstance;

        modal.componentInstance.dismissParentCall.subscribe((data) => {
            console.log(data);
            if (isSaveBookMarksOrContactAssociate == "saveBookmark") {
                if (data == "update") {
                    this.isLoggedInValue = "1";
                    this.SaveBookmark(advId);
                }
                else {
                    this.isLoggedInValue = "0";
                    this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
            }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;

            if (isSaveBookMarksOrContactAssociate == "saveBookmark") {
                if (data == "update") {
                    this.showToast('success', 'Bookmark to property is in process');

                    this.isLoggedInValue = "1";
                    this.SaveBookmark(advId);
                }
                else {
                    this.isLoggedInValue = "0";
                    this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
            }

        });

    }

    SaveBookmark(advId) {

        this.salesAdvertisements
            .UpdateSavedBookmarksSales(advId, 0)
            .subscribe(
                data => {
                    debugger;
                    if (data.d == "0") {

                        $('.showInterestBookMarkClass').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass('bookMarked');
                            }
                        });
                        this.showToast('warning', "You have already saved this advertisement.");
                    }
                    else {
                        $('.showInterestBookMarkClass').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass('bookMarked');
                            }
                        });
                        this.showToast('success', "Advertisement bookmarked successfully.");
                    }
                },
                err => {
                }
            );

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
    }



    onOpenModalClickAssociate(advIdnAndAssociateId): void {

        const modal: NgbModalRef = this.modalService.open(AuthModalComponent, { size: 'sm', backdrop: "static" });
        const modalComponent: AuthModalComponent = modal.componentInstance;
        (modal.componentInstance as AuthModalComponent).isContactAssociate = true;

        modal.componentInstance.dismissParentCall.subscribe((data) => {
            console.log(data);

            if (data == "update") {
                //book
                this.isLoggedInValue = "1";
                this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                this.isLoggedInValue = "0";
                this.showToast('danger', "Something went wrong. Please try again.");
            }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;
            if (data == "update") {
                //book
                this.showToast('success', 'Request to Associate is in process');

                this.isLoggedInValue = "1";
                this.ContactAssociate(advIdnAndAssociateId);
            }
            else {
                this.isLoggedInValue = "0";
                this.showToast('danger', "Something went wrong. Please try again.");
            }
        });

    }

    ContactAssociate(advIdAndAssociateId, pnlID = 0) {

        this.salesAdvertisements
            .CheckEmailAndPhNo()
            .subscribe(
                data => {
                    if (this.isLoggedInValue == "0") {

                    }
                    else if (this.isLoggedInValue == "1") {
                        this.ContactAssociates(advIdAndAssociateId);
                    }
                    else {
                        this.showToast("danger", "You cannot contact this Associate at this time.");
                        this.showToast("danger", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                    }
                },
                err => {
                    return false;
                }
            );

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

    }

    //Linked with on click event as well
    ContactAssociates(advIdAndAssociateId) {
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
                                    //    window.location.reload();
                                    //    //$('#msg' + pnlID).fadeOut('fast');
                                    //}, 2000);

                                    this.showToast("success", "Agent has been notified. For Additional Questions, please contact support at 866.456.7331.")

                                }
                                else if (data.d == "0") {
                                    this.showToast("danger", "Already exist")
                                }
                                else if (data.d == "3") {
                                    this.showToast("danger", "OOPS Error ! Please try again.")
                                }
                            }
                        );

                },
                err => {
                }
            );
    }




    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    }

    switchTabs(id) {
        this.ctdTabset.select(id);
    }
}