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
        debugger;
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
                        this.myZipCodes = CountPurchasedZipcodes;
                        //$("#divServicesCount").html(cartd.join(''));
                    }
                    else {
                        this.myZipCodes = CountPurchasedZipcodes;
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
                    debugger;
                    let added: Boolean = false;
                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);

                    this.dashboardService
                        .attemptToInterestedCustomerServicesData()
                        .then((data: any) => {
                            if (data.d.length > 0) {
                                debugger;
                                var xmlDoc = $.parseXML(data.d);
                                var json = this.xmlToJson.xml2json(xmlDoc, "");

                                var dataJsonServices = JSON.parse(json);
                                $.each(dataJsonServices.InterestedConsumerser, function (i) {
                                    dataJson.push(dataJsonServices[i]);
                                });
                                this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                                added = true;
                            }
                            else {
                                this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                            }
                        });
                }
            });
    }

    initialiseInterestedCustomerDataTable(asyncData) {
        debugger;
        let dataTable: any = $('#interestedCustomers');
        if (asyncData === undefined) {
            asyncData = {
                'name': '',
                'Mob': "",
                'EmailID': "",
                'title': "",
                'categoryName': "",
                'SubCategory':''
            };
        }
        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    data: "name",
                },
                {
                    data: "Mob",
                },
                {
                    data: "EmailID",
                },
                {
                    data: "title",
                },
                {
                    data: "categoryName",
                },
                {
                    data: "SubCategory",
                },
            ],
            searching: false,
            paging: false,
            info: false,
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
        if (asyncData === undefined) {
            asyncData = {
                'categoryname': '',
                'Name': "",
            };
        }
        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    data: "categoryname/Name",
                    "defaultContent": ""
                }
            ],
            
            searching: false,
            paging: false,
            info: false,
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
        if (asyncData === undefined) {
            asyncData = {
                'S.N' : '',
                'title': "",
                'categoryname': "",
                'ZipCode': "",
                'Amount':''
            };
        }
        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    title: 'S.N',
                    data: "",
                    "defaultContent": ""
                },
                {
                    title: 'title',
                    data: "title",
                    "defaultContent": ""
                },
                {
                    title: 'Category Name',
                    data: "categoryname",
                    "defaultContent": ""
                },
                {
                    title: 'Zip Code',
                    data: "ZipCode",
                    "defaultContent": ""
                },
                {
                    title: 'Category Name',
                    data: "categoryName",
                    "defaultContent": ""
                },
                {
                    title: 'Amount',
                    data: "Amount",
                    "defaultContent": ""
                },
            ],
            
            searching: false,
            paging: false,
            info: false,
            order: [[1, 'asc']]
        });
        //dataTable.on('order.dt search.dt', function () {
        //    dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        //        cell.innerHTML = i + 1;
        //    });
        //}).draw();

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

    }

    initialiseTable(asyncData) {
        let dataTable: any = $('#myZipCode');
        if (asyncData === undefined) {
            asyncData = {
                'zipcode': '',
                'categoryname': "",
                'amount': ""
            };
        }
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
                    "defaultContent": ""
                },
                {
                    title: 'Category Name',
                    data: "categoryname",
                    "defaultContent": ""
                },
                {
                    title: 'Cost',
                    data: "amount",
                    "defaultContent": ""
                }
            ],
            searching: false,
            paging: false,
            info: false,
            order: [[1, 'asc']]
        });

        //dataTable.on('order.dt search.dt', function () {
        //    dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        //        cell.innerHTML = i + 1;
        //    });
        //}).draw();

    }


    attemptToAllAdvertisement() {


    }


}
