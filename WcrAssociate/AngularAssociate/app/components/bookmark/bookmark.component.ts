import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, encrypt_decrypt, ProfilesService } from '../../services/auth';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { MessageService } from 'AngularAssociate/app/services/search';
import { Toaster } from 'ngx-toast-notifications';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import * as $ from 'jquery';

@Component({
    selector: 'consumer-bookmark',
    templateUrl: './bookmark.component.html'
})

export class BookmarkComponent implements OnInit {

    public isDataNotFoundForSalesBookmarks = false;
    public isTabSalesBookmarkStart: boolean = true;
    public isDataNotFoundForServicesBookmarks = false;
    public isTabServicesBookmarkStart: boolean = true;


    public isLoggedInValue: string;
    public dataBookmarksServicesList = [];
    public dataBookmarksSalesList = [];

    @ViewChild('ctdTabset') ctdTabset;

    constructor(private _messageService: MessageService, private router: Router, private profileService: ProfilesService, private xmlToJson: XMLToJSON,
        private salesAdvertisements: SalesAdvertisementsService, private route: ActivatedRoute, private modalService: NgbModal, private toaster: Toaster) {

    }

    ngOnInit() {
        this.checkUserIsLogin();
        this.GetSalesAdvListings('1');

    }

    ngOnDestroy() {
        this._messageService.messageHidden.value = "";
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

    GetSalesAdvListings(id) {
        debugger;
        var thisStatus = this;
        setTimeout(function () {
            if (id == '1') {
                thisStatus.isTabSalesBookmarkStart = true;
                thisStatus.isTabServicesBookmarkStart = false;
                thisStatus.switchTabs('bookmarkSalesTabId');
            }
            else if (id == '2') {
                thisStatus.isTabSalesBookmarkStart = false;
                thisStatus.isTabServicesBookmarkStart = true;
                thisStatus.switchTabs('bookmarkServicesTabId');
            }
            thisStatus.ViewWCRBookmarks(id);
        }, 500);

    }

    GetSalesAdvFromTabs(id) {

        if (id == '1') {
            this.isTabSalesBookmarkStart = true;
            this.isTabServicesBookmarkStart = false;
            this.switchTabs('bookmarkSalesTabId');
        }
        else if (id == '2') {
            this.isTabSalesBookmarkStart = false;
            this.isTabServicesBookmarkStart = true;
            this.switchTabs('bookmarkServicesTabId');
        }
        $('#innerHtmlListHomeSalesBookmarksId').html('');
        $('#innerHtmlListHomeServicesBookmarksId').html('');
        this.isDataNotFoundForSalesBookmarks = false;
        this.isDataNotFoundForServicesBookmarks = false;

        this.ViewWCRBookmarks(id);
    }


    ViewWCRBookmarks(id) {

        if (id == '1') {
            this.GetSavedAdvertisementsBookmarks();
        }
        else {
            this.GetSavedServicesBookmarks();
        }
    }



    GetSavedAdvertisementsBookmarks() {
        $('#innerHtmlListHomeSalesBookmarksId').html('');

        this.profileService
            .getBookmarkSalesList()
            .subscribe(
                (data) => {
                    debugger;
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet != undefined && dataJson.NewDataSet != null && dataJson.NewDataSet != '') {
                            this.dataBookmarksSalesList = [];
                            if (dataJson.NewDataSet.ConsumerAdvertisments != undefined && dataJson.NewDataSet.ConsumerAdvertisments != null
                                && dataJson.NewDataSet.ConsumerAdvertisments != '') {
                                if (!$.isArray(dataJson.NewDataSet.ConsumerAdvertisments)) { // Returns: "object"
                                    this.dataBookmarksSalesList.push(dataJson.NewDataSet.ConsumerAdvertisments);
                                    this.AddSalesBookmarksDynamicHtmlList(this.dataBookmarksSalesList);
                                }
                                else {
                                    var thisStatus = this;
                                    $.each(dataJson.NewDataSet.ConsumerAdvertisments, function (index, item) {
                                        thisStatus.dataBookmarksSalesList.push(item);
                                    });
                                    this.AddSalesBookmarksDynamicHtmlList(this.dataBookmarksSalesList);
                                }
                            }
                            else {

                            }
                            this.isDataNotFoundForSalesBookmarks = false;
                            this.isDataNotFoundForServicesBookmarks = false;
                        }
                        else {
                            this.isDataNotFoundForSalesBookmarks = true;
                            this.isDataNotFoundForServicesBookmarks = true;
                            this.isTabSalesBookmarkStart = false;
                            this.isTabServicesBookmarkStart = false;
                        }

                        setTimeout(function () {
                            this.isloadingIconVisible = false;
                        }, 1000);
                    }
                    else {
                        this.isTabSalesBookmarkStart = false;
                        this.isTabServicesBookmarkStart = false;
                    }
                });
    }

    GetSavedServicesBookmarks() {
        $('#innerHtmlListHomeServicesBookmarksId').html('');

        this.profileService
            .getBookmarkServicesList()
            .subscribe(
                (data) => {
                    debugger;
                    if (data.d.length > 0) {


                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet != undefined && dataJson.NewDataSet != null && dataJson.NewDataSet != '') {
                            this.dataBookmarksServicesList = [];
                            if (dataJson.NewDataSet.ConsumerBookAdvertisments != undefined && dataJson.NewDataSet.ConsumerBookAdvertisments != null
                                && dataJson.NewDataSet.ConsumerBookAdvertisments != '') {
                                if (!$.isArray(dataJson.NewDataSet.ConsumerBookAdvertisments)) { // Returns: "object"
                                    this.dataBookmarksServicesList.push(dataJson.NewDataSet.ConsumerBookAdvertisments);
                                    this.AddServicesBookmarksDynamicHtmlList(this.dataBookmarksServicesList);
                                }
                                else {
                                    var thisStatus = this;
                                    $.each(dataJson.NewDataSet.ConsumerBookAdvertisments, function (index, item) {
                                        thisStatus.dataBookmarksServicesList.push(item);
                                    });
                                    this.AddServicesBookmarksDynamicHtmlList(this.dataBookmarksServicesList);
                                }
                            }
                            else {

                            }
                            this.isDataNotFoundForSalesBookmarks = false;
                            this.isDataNotFoundForServicesBookmarks = false;
                        }
                        else {
                            this.isDataNotFoundForSalesBookmarks = true;
                            this.isDataNotFoundForServicesBookmarks = true;
                            this.isTabSalesBookmarkStart = false;
                            this.isTabServicesBookmarkStart = false;
                        }


                        setTimeout(function () {
                            this.isloadingIconVisible = false;
                        }, 1000);
                    }
                    else {
                        this.isTabSalesBookmarkStart = false;
                        this.isTabServicesBookmarkStart = false;
                    }
                });
    }



    AddSalesBookmarksDynamicHtmlList(dataSalesList) {
        debugger;
        let count = 0;
        var html = '';
        var thisStatus = this;
        $.each(dataSalesList, function (index, item) {


            html += '<div class="listing-item">';
            html += "<a href='javascript:void(0)' class='listing-img-container salesLink' data-link='property-sale-advertisement'  data-qparam ='" + JSON.stringify({ "id": item.advertisementID }) + "'>";
            //<!--< div class="listing-badges" >
            //    <span>For Rent < /span>
            //        < /div>-->

            html += '<div class="listing-img-content" >';
            html += '<span class="listing-price" > $ ' + item.cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' <i></i></span >';
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

            html += '<a href = "javascript:void(0)" class="btn button border mg-l-15-f red deleteBookmarkSalesId" data-id="' + item.id + '" >Delete Bookmark </a>';

            
            html += '<span> Zip Code: ' + item.ZipCode + '</span>';
            html += '</div>';
            html += '</div>';
            //{ { count + 1 } }

            html += '</div>';
            count++;
        });

        $('#innerHtmlListHomeSalesBookmarksId').html(html);
        this.isTabSalesBookmarkStart = false;

        this.InitializeEvents();
        this.InitializeEventsClick();
    }

    AddServicesBookmarksDynamicHtmlList(dataServicesList) {
        debugger;

        let count = 0;
        var html = '';

        var thisStatus = this;
        $.each(dataServicesList, function (index, item) {
            html += '<div class="listing-item">';
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
            var _lstName = "";
            if (item.LName == "0") {
                _lstName = "";
            }
            else {
                _lstName = item.LName;
            }

            html += '<h4><a href="javascript:void(0)" > ' + item.Name + " " + _lstName;
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
            html += '<li><b> Category Name </b>: ' + item.categoryName + ' </li>';
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
            var strParamContactAssociateShowInterest = item.CategoryID + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
            var strParamContactAssociate = item.CategoryID + "," + item.associateid + ",2," + item.zipcode + "," + count;

            if (thisStatus.isLoggedInValue == "0") {
                html += '<a href="javascript:void(0)" class="btn button border contactAssociateInterestClass"  data-id="' + strParamContactAssociateShowInterest + '"> Contact Associates </a>';
            }
            else {
                html += '<a href="javascript:void(0)" class="btn button border contactAssociateClass" data-id="' + strParamContactAssociate + '" id="contactAssociateId" > Contact Associates </a>';
            }

            if (thisStatus.isLoggedInValue == "0") {

                var id = item.CategoryID;// + "," + item.associateid + ",2," + item.zipcode + "," + count + ",1";
                html += '<a class="btn button border showInterestBookMarkId mg-l-15-f" data-id="' + id + '"  data-zipcode="' + item.zipcode + '" > Bookmark </a>';
            }
            else {
                debugger;
                if (item.ConsumerID != null) {
                    html += '<a class="btn button border bookMarked SaveBookmarkId  mg-l-15-f" data-id="' + item.CategoryID + '" data-zipcode="' + item.zipcode + '" > Bookmark </a>';
                }
                else {
                    html += '<a class="btn button border SaveBookmarkId  mg-l-15-f" data-id="' + item.CategoryID + '" data-zipcode="' + item.zipcode + '" > Bookmark </a>';
                }
            }

            html += '<a class="btn button border mg-l-15-f red deleteBookmarkServicesId" data-id="' + item.id + '" > Delete Bookmark </a>';



            //html += '<span> Zip Code: ' + item.zipcode + '</span>';
            html += '</div>';
            html += '</div>';
            //{ { count + 1 } }

            html += '</div>';
            count++;
        });

        $('#innerHtmlListHomeServicesBookmarksId').html(html);
        this.isTabServicesBookmarkStart = false;

        this.InitializeEvents();
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
                            thisStatus.ContactAssociatesFunc(advIdAndAssociateId);
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

            //thisStatus.salesAdvertisements
            //    .ConsumerIsLogin()
            //    .subscribe(
            //        (data) => {

            //            if (data.d > 0) {


            //            }
            //            else {
            //                thisStatus.showToast("Warning", "You need to sign in");
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
                    });
        });

        $('.deleteBookmarkSalesId').click(function () {

            var bookmarkId = $(this).attr('data-id');
            thisStatus.deleteBookmarkSales(bookmarkId);

        });

        $('.deleteBookmarkServicesId').click(function () {

            var bookmarkId =  $(this).attr('data-id');
            thisStatus.deleteBookmarkServices(bookmarkId);

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
                    //this.showToast('danger', "Something went wrong. Please try again. Refresh page");
                }
            }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;
            this.showToast('success', 'Bookmark to property is in process');

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
    }


    deleteBookmarkSales(bookmarkId)
    {
        this.deleteBookMark(bookmarkId, "1");

    }

    deleteBookmarkServices(bookmarkId) {

        this.deleteBookMark(bookmarkId, "2");

    }

    deleteBookMark(bookmarkId, type)
    {
        this.profileService
            .deleteBookmark(bookmarkId)
            .subscribe(
                data => {
                    debugger;
                    this.showToast('success', "Deleted successfully.");
                    if (type == "1") {
                        this.GetSalesAdvListings("1");
                    }
                    else {
                        this.GetSalesAdvListings("2");
                    }

                },
                err => {
                }
            );
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
                this.onClickContactAssociate(advIdnAndAssociateId);
            }
            else {
                this.isLoggedInValue = "0";
                //this.showToast('danger', "Something went wrong. Please try again.");
            }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;
            this.showToast('success', 'Request to Associate is in process');
            if (data == "update") {
                //book
                this.isLoggedInValue = "1";
                this.onClickContactAssociate(advIdnAndAssociateId);
            }
            else {
                this.isLoggedInValue = "0";
                this.showToast('danger', "Something went wrong. Please try again.");
            }
        });

    }

    onClickContactAssociate(advIdAndAssociateId, pnlID = 0) {

        this.salesAdvertisements
            .CheckEmailAndPhNo()
            .subscribe(
                data => {
                    if (this.isLoggedInValue == "0") {

                    }
                    else if (this.isLoggedInValue == "1") {
                        this.ContactAssociatesFunc(advIdAndAssociateId);
                    }
                    else {
                        this.showToast("Warning", "You cannot contact this Associate at this time.");
                        this.showToast("Warning", "Your phone number and email address are required to contact an Associate.Please update your profile and enter your phone number.");
                    }
                },
                err => {
                    return false;
                });
    }

    ContactAssociatesFunc(advIdAndAssociateId) {
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

    

    showToast(toastrType, text) {
        const type = toastrType;
        this.toaster.open({
            text: text,
            caption: type ,
            type: type,
            duration: 8000
        });
    }

    switchTabs(id) {
        this.ctdTabset.select(id);
    }


}