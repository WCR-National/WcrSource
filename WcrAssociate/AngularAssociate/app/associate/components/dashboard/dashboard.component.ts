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


        this.attemptToInterestedCustomerData();

        this.attemptToCategoriesData();

        this.attemptToMyPropertyListingsData();

        this.attemptToZipcodeData();

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



    attemptToInterestedCustomerData() {
        this.dashboardService
            .attemptToInterestedCustomerData()
            .then((data: any) => {
                if (data.d.length > 0) {
                    let added: Boolean = false;
                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);

                    this.dashboardService
                        .attemptToInterestedCustomerServicesData()
                        .then((data: any) => {
                            if (data.d.length > 0) {

                                var xmlDoc = $.parseXML(data.d);
                                var json = this.xmlToJson.xml2json(xmlDoc, "");

                                var dataJsonServices = JSON.parse(json);
                                $.each(dataJsonServices.InterestedConsumerser, function (i) {
                                    dataJson.push(dataJsonServices[i]);
                                });
                                this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                                added = true;
                            }
                        });
                    if (!added) {
                        this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                    }
                }
            });
    }

    initialiseInterestedCustomerDataTable(asyncData) {
        let dataTable: any = $('#interestedCustomers');

        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    title: 'Name',
                    data: "name",
                },
                {
                    title: 'Mobile',
                    data: "Mob",
                },
                {
                    title: 'Email',
                    data: "EmailID",
                },
                {
                    title: 'Title',
                    data: "title",
                },
                {
                    title: 'Category Name',
                    data: "categoryName",
                },
                {
                    title: 'Sub Category',
                    data: "SubCategory",
                },
            ],
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
            order: [[1, 'asc']]
        });

    }


    attemptToCategoriesData() {
        this.dashboardService
            .attemptToCategoriesData()
            .then((data: any) => {
                if (data.d.length > 0) {

                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);

                    this.initialiseCategoriesDataTable(dataJson.AllPurCategories);
                }
            });
    }

    initialiseCategoriesDataTable(asyncData) {
        let dataTable: any = $('#selectedCategories');

        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    title: 'Category/SubCategory',
                    data: "categoryname/Name",
                }
            ],
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
            order: [[1, 'asc']]
        });
    }


    attemptToMyPropertyListingsData() {

        this.dashboardService
            .attemptToMyPropertyListingsData()
            .then((data: any) => {
                if (data.d.length > 0) {

                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);

                    this.initialiseMyPropertyListingsTable(dataJson.ViewAdvertisment);
                }
            });
    }

    initialiseMyPropertyListingsTable(asyncData) {

        let dataTable: any = $('#myPropertyListings');
        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    title: 'S.N',
                    data: "",
                },
                {
                    title: 'title',
                    data: "title",
                },
                {
                    title: 'Category Name',
                    data: "categoryname",
                },
                {
                    title: 'Zip Code',
                    data: "ZipCode",
                },
                {
                    title: 'Category Name',
                    data: "categoryName",
                },
                {
                    title: 'Amount',
                    data: "Amount",
                },
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


    attemptToZipcodeData() {
        this.dashboardService
            .attemptToZipcodeData()
            .then((data: any) => {
                if (data.d.length > 0) {

                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);

                    this.initialiseTable(dataJson.PurCategories);
                }
            });
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

    initialiseTable(asyncData) {
        let dataTable: any = $('#myZipCode');

        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    title: '',
                    data: "",
                },
                {
                    title: 'Zip Code',
                    data: "zipcode",
                },
                {
                    title: 'Category Name',
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


    attemptToAllAdvertisement() {


    }


}
