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
import 'datatables.net';
import { MessageService } from 'AngularAssociate/app/services/search';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';



@Component({
    selector: 'associate-dashboard-page',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    
    interestedCustomers: string = '';
    selectedCategories: string = '';
    myPropertyListings: string = '';
    myZipCodes: string = '';
    showInformation = false;


    constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService, private xmlToJson: XMLToJSON, private profileService: ProfileService, private _messageService: MessageService) {

    }
    ngOnInit() {
        $.fn.dataTable.ext.errMode = 'none';

        this.attemptToCountInterestedCustomers();

        this.attemptToCountAssociateCategories();

        this.attemptToCountPurchasedCategories("1");

        this.attemptToCountPurchaseZipCode();

        this.attemptToCountAllPurchasedCategories();

        debugger;
        this.attemptToInterestedCustomerData();

        this.attemptToCategoriesData();

        this.attemptToMyPropertyListingsData();

        this.attemptToZipcodeData();

        this.attemptToAllAdvertisement();


        this._messageService.listen().subscribe((m: any) => {
            if (m == 'hide-info-dashboard') {
                this.showInformation = false;
            }
            else if (m == 'show-info-dashboard') {
                this.showInformation = true;
            }
        })
    }

    validateMenuitems() {
        let thisStatus: any = this;
        this.profileService
            .getUserDetails()
            .subscribe(
                data => {
                    var thisStatus: any = this;
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {

                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                                thisStatus.showInformation = true;
                                return;
                            }
                            else {
                                thisStatus.showInformation = false;
                                return;
                            }

                        });
                    }
                });
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
                    
                    let added: Boolean = false;
                    var xmlDoc = $.parseXML(data.d);
                    var json = this.xmlToJson.xml2json(xmlDoc, "");
                    var dataJson = JSON.parse(json);
                    console.log(dataJson);

                    this.dashboardService
                        .attemptToInterestedCustomerServicesData()
                        .then((data: any) => {
                            debugger;
                            if (data.d.length > 0) {
                                debugger;
                                var xmlDoc = $.parseXML(data.d);
                                var json = this.xmlToJson.xml2json(xmlDoc, "");
                                var dataJsonServices = JSON.parse(json);
                                console.log(dataJsonServices);

                                if (dataJsonServices.NewDataSet != null) {
                                    $.each(dataJsonServices.NewDataSet.InterestedConsumerser, function (i) {
                                        debugger;
                                        dataJson.NewDataSet.InterestedConsumer.push(dataJsonServices.NewDataSet.InterestedConsumerser[i]);
                                    });
                                    this.initialiseInterestedCustomerDataTable(dataJson.NewDataSet.InterestedConsumer);
                                }
                                else {
                                    if (dataJsonServices.NewDataSet == null) {
                                        this.initialiseInterestedCustomerDataTable(dataJson.NewDataSet);

                                    }
                                    else {
                                        this.initialiseInterestedCustomerDataTable(undefined);

                                    }
                                }
                                debugger;
                               
                                added = true;
                            }
                            else {
                                this.initialiseInterestedCustomerDataTable(dataJson.NewDataSet.InterestedConsumer);
                            }
                        });
                }
            });
    }

    initialiseInterestedCustomerDataTable(asyncData) {
        debugger;
        let dTable: any = $('#interestedCustomers');
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'name': '',
                'Mob': "",
                'EmailID': "",
                'title': "",
                'categoryName': "",
                'SubCategory': ''
            };
        }
        dTable.dataTable({
            data: asyncData,

            columns: [
                {
                    data: "id",
                },
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
                }
                ,
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove">Delete</a>'
                }
            ],
            "autoWidth": true,   
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            columnDefs: [
                {
                    targets: [0],
                    className: "hide_column"
                }
            ],
            order: [[1, 'asc']]
        });
        
        //dTable.api().column(0).visible(false);;

        var thisStatus = this;
        // Delete a record
        $('#interestedCustomers').on('click', 'a.editor_remove', function (e) {
            e.preventDefault();
            debugger;
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.dashboardService
                .deleteCustomerRecords($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => { });

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
                    console.log(dataJson);
                    if (dataJson != null && dataJson.NewDataSet != null) {
                        if (Array.isArray(dataJson.NewDataSet.AllPurCategories)) {
                            this.initialiseCategoriesDataTable(dataJson.NewDataSet.AllPurCategories);
                        }
                        else {
                            let jsonArray = [];
                            jsonArray.push(dataJson.NewDataSet.AllPurCategories);
                            this.initialiseCategoriesDataTable(jsonArray);
                        }
                    }
                    else {
                        this.initialiseCategoriesDataTable(undefined);
                    }
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
        dataTable.dataTable({
            data: asyncData,
            columns: [
                {
                    "data": null,
                    "render": function (data, type, full) {
                        return full['categoryname'] + '/' + full['Name'];
                    }
                },
                //{
                //    "data": 'Name',
                //    //"render": function (data, type, full) {
                //    //    return full['categoryname'] + ', ' + full['Name'];
                //    //}
                //}
                //{
                //    "mRender": function (data, type, row) {
                //        return row['categoryname'] + '/' + row['Name'];
                //    }
                //}
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            "aoColumnDefs": [
                { "sWidth": "100%", "aTargets": [-1] }
            ]
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
                    console.log(dataJson);

                    if (dataJson != null && dataJson.NewDataSet != null) {
                        if (Array.isArray(dataJson.NewDataSet.ViewAdvertisment)) {
                            this.initialiseMyPropertyListingsTable(dataJson.NewDataSet.ViewAdvertisment);
                        }
                        else {
                            let jsonArray = [];
                            jsonArray.push(dataJson.NewDataSet.ViewAdvertisment);
                            this.initialiseMyPropertyListingsTable(jsonArray);
                        }
                    }
                    else {
                        this.initialiseMyPropertyListingsTable(undefined);
                    }
                }
            });
    }

    initialiseMyPropertyListingsTable(asyncData) {

        $("#myPropertyListings").append('<tfoot><th></th><th></th><th></th><th></th><th></th></tfoot>');


        let dataTable: any = $('#myPropertyListings');
        if (asyncData === undefined) {
            asyncData = {
                'S.N': '',
                'title': "",
                'categoryname': "",
                'ZipCode': "",
                'Amount': ''
            };
        }
        dataTable.DataTable({
            data: asyncData,
            columns: [
                {
                    data: "",
                },
                {
                    data: "title",
                },
                {
                    data: "categoryname",
                },
                {
                    data: "ZipCode",
                },
                {
                    //data: "Amount",
                    "data": null,
                    "render": function (data, type, full) {
                        return '$' + full['Amount'];
                    }
                },
            ]
            ,
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var index = iDisplayIndex + 1;
                $('td:eq(0)', nRow).html(index);
                return nRow; 
            }
            ,
            buttons: [
                'excel', 'pdf'
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false
            ,
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;

                // converting to interger to find total
                var intVal = function (i: any) {
                    return typeof i === 'string' ? parseInt(i) : typeof i === 'number' ? i : 0;
                };

                // computing column Total of the complete result 
                var amountTotal = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
                        debugger;
                        return (a.toString().replace(/[\$,]/g, '') * 1) + (b.Amount * 1.0);
                    }, 0);

                // Update footer by showing the total with the reference of the column index 
                $(api.column(0).footer()).html('Total');
                $(api.column(1).footer()).html('');
                $(api.column(2).footer()).html('');
                $(api.column(3).footer()).html('');
                $(api.column(4).footer()).html('$' + amountTotal);
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
                    console.log(dataJson);

                    if (dataJson != null && dataJson.NewDataSet != null) {
                        if (Array.isArray(dataJson.NewDataSet.PurCategories)) {
                            this.initialiseTable(dataJson.NewDataSet.PurCategories);
                        }
                        else {
                            let jsonArray = [];
                            jsonArray.push(dataJson.NewDataSet.PurCategories);
                            this.initialiseTable(jsonArray);

                        }
                    }
                    else {
                        this.initialiseTable(undefined);
                    }
                }
            });

    }

    initialiseTable(asyncData) {
        $("#myZipCode").append('<tfoot><th></th><th></th><th></th></tfoot>');
        let dataTable: any = $('#myZipCode');
        if (asyncData === undefined) {
            asyncData = {
                'zipcode': '',
                'categoryname': "",
                'amount': ""
            };
        }

        dataTable.dataTable({
            data: asyncData,

            columns: [
                {
                    data: "zipcode",
                },
                {
                    data: "categoryname",
                },
                {
                    //data: "amount",
                    "data": null,
                    "render": function (data, type, full) {
                        return '$' + full['amount'];
                    }
                }
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;

                // converting to interger to find total
                var intVal = function (i: any) {
                    return typeof i === 'string' ? parseInt(i) : typeof i === 'number' ? i : 0;
                };

                // computing column Total of the complete result 
                var amountTotal = api
                    .column(2)
                    .data()
                    .reduce(function (a, b) {
                        return (a.toString().replace(/[\$,]/g, '') * 1) + (b.amount * 1.0);
                    }, 0);

                // Update footer by showing the total with the reference of the column index 
                $(api.column(0).footer()).html('Total');
                $(api.column(1).footer()).html('');
                $(api.column(2).footer()).html('$' + amountTotal);
            },
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
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


