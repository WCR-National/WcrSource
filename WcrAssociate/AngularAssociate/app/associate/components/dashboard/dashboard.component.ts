import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';

import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
import 'datatables.net';


@Component({
    selector: 'associate-dashboard-page',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {


    interestedCustomers: string = '';
    selectedCategories: string = '';
    myPropertyListings: string = '';
    myZipCodes: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService, private xmlToJson: XMLToJSON) {

    }
    ngOnInit() {
        this.attemptToCountInterestedCustomers();

        this.attemptToCountAssociateCategories();

        this.attemptToCountPurchasedCategories("1");

        this.attemptToCountPurchaseZipCode();

        this.attemptToCountAllPurchasedCategories();



        this.attemptToZipcodeData();

        this.attemptToPropertyListingData();

        this.attemptToInterestedCustomerData();

        this.attemptToMyPropertyListingsData();

        this.attemptToAllAdvertisement();
    }

    attemptToCountInterestedCustomers() {
        this.dashboardService
            .attemptToCountInterestedCustomers()
            .subscribe(
                data => {
                    let countInterestedCutomers: string = '0';
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumer");
                        var cartd = [];
                        $.each(docs, function (i, docs) {

                            countInterestedCutomers = $(docs).find("TotalCount").text();
                        });
                        //$("#interestedConsumer").html(cartd.join(''));
                        this.interestedCustomers = countInterestedCutomers;

                    } else {
                        this.interestedCustomers = countInterestedCutomers;
                    }
                });
    }

    attemptToCountAssociateCategories() {
        this.dashboardService
            .attemptToCountAssociateCategories()
            .subscribe(
                data => {
                    let countSelectedCategories: string = '0';
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssocateCategories");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            countSelectedCategories = $(docs).find("Total").text();
                        });
                        //$("#divAssociateCategory").html(cartd.join(''));
                        this.selectedCategories = countSelectedCategories;
                    }
                    else {
                        this.selectedCategories = countSelectedCategories;
                    }
                });
    }

    attemptToCountPurchasedCategories(jobtype) {
        this.dashboardService
            .attemptToCountPurchasedCategories()
            .subscribe(
                data => {
                    let CountPurchasedCategories: string = "0";
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAds");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            CountPurchasedCategories = $(docs).find("Total").text();
                            if (jobtype == "1") {
                                $('#aPurchaseAdvertisement').attr('href', 'PostAdvertisement.aspx?pid=1');
                            }
                            else {
                                $('#pSubText').html('Posted Advertisements - Services');
                            }
                        });
                        this.myPropertyListings = CountPurchasedCategories;
                        //$("#" + divID).html(cartd.join(''));
                    }
                    else {
                        this.myPropertyListings = CountPurchasedCategories;
                    }
                });
    }

    attemptToCountPurchaseZipCode() {
        this.dashboardService
            .attemptToCountPurchaseZipCode()
            .subscribe(
                data => {
                    let CountPurchasedZipcodes: string = "0";
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalZipCode");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            CountPurchasedZipcodes = ($(docs).find("Total").text());
                        });
                        this.myPropertyListings = CountPurchasedZipcodes;
                        //$("#divServicesCount").html(cartd.join(''));
                    }
                    else {
                        this.myPropertyListings = CountPurchasedZipcodes;
                    }
                });
    }

    attemptToCountAllPurchasedCategories() {
        this.dashboardService
            .attemptToCountAllPurchasedCategories()
            .subscribe(
                data => {

                    let CountPurchasedZipcodes: string = "0";
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAllAds");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            CountPurchasedZipcodes = $(docs).find("Total").text();
                        });
                        //this.myPropertyListings = CountPurchasedZipcodes;
                        //$("#divServicesCount").html(cartd.join(''));
                    }
                    else {
                        //this.myPropertyListings = CountPurchasedZipcodes;
                    }
                });
    }



    attemptToZipcodeData() {
        this.dashboardService
            .attemptToZipcodeData()
            .then((data: any) => {
                if (data.d.length > 0) {

                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);

                    this.initialiseTable(dataJson);

                    //chk = 1;
                    //var xml = $(xmlDoc);
                    //var docs = xml.find("PurCategories");
                    //var cartd = [];
                    //cartd.push("<table class='table table-condensed data-table' style='width:100%'>");
                    //cartd.push("<tr>");
                    //// cartd.push("<td style='color: white; background-color: skyblue' ><strong>S.N</strong></td>");
                    //cartd.push("<th  style='width:80px;' class='uk-width-2-10 uk-text-center'> Zip Code </th>");
                    //cartd.push("<th  class='uk-width-2-10 uk-text-center'> Category/SubCategory </th>");
                    //cartd.push("<th  class='uk-width-2-10 uk-text-center'> Cost </th>");
                    //cartd.push("</tr>");
                    //// var cc = 0;
                    //var count = 1;
                    //var Totalamount = 0;
                    //$.each(dataJson.PurCategories, function (i, docs) {
                    //    cartd.push("<tr>");
                    //    // cartd.push("<td class='uk-text-center'>" + count + "</td>");
                    //    cartd.push("<td class='uk-text-center'> " + ($(docs).find("zipcode").text()) + " </td>");
                    //    cartd.push("<td class='uk-text-center'> " + ($(docs).find("categoryname").text()) + "/" + ($(docs).find("Name").text()) + " </td>");
                    //    cartd.push("<td class='uk-text-center'>$" + ($(docs).find("amount").text()) + " </td>");
                    //    cartd.push("</tr>");
                    //    count++;
                    //    Totalamount += parseInt($(docs).find("amount").text());
                    //});
                    //cartd.push("<tr>");
                    //cartd.push("<td class='uk-text-center total'> <strong> TOTAL </strong> </td>");
                    //cartd.push("<td class='uk-text-center'>  </td>");
                    //cartd.push("<td class='uk-text-center'><strong>  $" + Totalamount + " </strong> </td>");
                    //cartd.push("</tr>");
                    //cartd.push("</table>");
                    //$("#divShowPostedAdvertisementsServices").html(cartd.join(''));
                }
            });
    }

    initialiseTable(asyncData) {
        let dataTable: any = $('#interestedCustomers');

        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    title: '',
                    data: "count",
                },
                {
                    title: 'Zip Code',
                    data: "zipcode",
                },
                {
                    title:'Category/SubCategory',
                    data: "categoryname"
                },
                {
                    title: 'Cost',
                    data: "amount"
                }
            ],
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
            order: [[1, 'asc']]
        });

        dataTable.on('order.dt search.dt', function () {
            dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

    }

    attemptToPropertyListingData() {

    }

    attemptToInterestedCustomerData() {

    }

    attemptToMyPropertyListingsData() {

    }

    attemptToAllAdvertisement() {


    }
}
