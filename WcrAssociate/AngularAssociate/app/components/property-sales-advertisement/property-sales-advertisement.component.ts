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
declare const InitializeFullWidthSlider: any;


@Component({
    selector: 'property-sales-advertisement',
    templateUrl: './property-sales-advertisement.component.html'
})

export class PropertySalesAdvertisementsComponent implements OnInit {

    isloadingIconVisible: boolean = true;
    count: number = 0;
    public consumerID: string;
    public data: string;
    public isLoggedInValue: string;
    public category: string;
    public id: string;
    public zipcode: string;
    public name: string;
    public jtype: string;
    public catName: string;
    public IsDataFound: boolean;
    public dataServicesList;

    public advMainImage: string;
    public image1: string;
    public image2: string;
    public image3: string;

    public contactNo: string;
    public title: string;
    public advertisementID: string;

    public associateid: string;
    public LicenseId: string;
    public description: string;

    public features: string;
    public cost: string;
    public categoryName: string;

    public address: string;
    public CityID: string;
    public StateID: string;
    public ZipCode: string;

    public advId: string;
    public location: string;


    constructor(private _messageService: MessageService, private router: Router, private salesAdvertisements: SalesAdvertisementsService, private xmlToJson: XMLToJSON,
        private route: ActivatedRoute, private modalService: NgbModal, private toaster: Toaster) {

    }

    ngOnInit() {

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

        this.route.url.subscribe(data => {
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
            .subscribe(params => {

                this.advId = params['id'];
                this.GetSalesAdvertisementData(this.advId);

            });
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

    GetSalesAdvertisementData(advId) {
        this.salesAdvertisements
            .GetPropertySalesAdevertisementData(advId)
            .subscribe(
                (data) => {

                    if (data.d.length > 0) {
                        var thisStatus = this;
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("FullDetailsAdvertisments");
                        $.each(docs, function (i, docs) {
                            debugger;
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
                }
            );
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
            let advId = $(this).attr('data-id');
            let zipcode = 0;
            thisStatus.salesAdvertisements
                .UpdateSavedBookmarksSales(advId, zipcode)
                .subscribe(
                    data => {

                        if (data.d == "0") {
                            $('.saveBookmarkClass').addClass('bookMarked');
                            thisStatus.showToast('warning', "You have already saved this advertisement.");
                        }
                        else {
                            $('.saveBookmarkClass').addClass('bookMarked');
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
    }

    //Linked with on click event
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

    SaveBookmark(advId) {
        let zipcode = 0;
        this.salesAdvertisements
            .UpdateSavedBookmarksSales(advId, zipcode)
            .subscribe(
                data => {

                    if (data.d == "0") {

                        $('.saveBookmarkClass').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass('bookMarked');
                            }
                        });
                        this.showToast('warning', "You have already saved this advertisement.");
                    }
                    else {

                        $('.saveBookmarkClass').each(function () {
                            if (advId == $(this).attr('data-id')) {
                                $(this).addClass('bookMarked');
                            }
                        }); this.showToast('success', "Advertisement bookmarked successfully.");
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

    onOpenModalClickSaveBookMark(isSaveBookMarksOrContactAssociate, advId): void {

        const modal: NgbModalRef = this.modalService.open(AuthModalComponent, { size: 'lg', backdrop: "static" });
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
            this.showToast('success', 'Property bookmark is in process');
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

    onOpenModalClickAssociate(advIdnAndAssociateId): void {

        const modal: NgbModalRef = this.modalService.open(AuthModalComponent, { size: 'lg', backdrop: "static" });
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
                this.showToast('danger', "Something went wrong. Please try again.");
            }
        });

        modal.componentInstance.updateParentCall.subscribe((data) => {
            debugger;
            this.showToast('success', 'Request to Associate is in process');
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

}