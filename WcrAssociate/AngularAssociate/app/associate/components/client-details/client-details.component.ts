import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';



import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ClientDetailsService } from 'AngularAssociate/app/services/associate/client-details.service';


import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
import 'datatables.net';

@Component({
    selector: 'associate-client-details-page',
    templateUrl: './client-details.component.html'
})
export class ClientDetailsComponent implements OnInit {

    salesCount: string = '';
    servicesCount: string = '';
    TotalCount: string = '';
    showSuccessMessage: string = '';
    constructor(private route: ActivatedRoute, private router: Router, private dashboardService: ClientDetailsService, private xmlToJson: XMLToJSON) {

    }

    ngOnInit() {
        this.getServicesCount();

        this.getSalesCount();

        this.getTotalSalesAndServicesCount();


        this.getClientDetailsSalesData();

        this.getClientDetailsServicesData();

        //this.deleteCustomerRecords();
    }

    getServicesCount() {

    }

    getSalesCount() {
        this.dashboardService
            .getSalesCount()
            .subscribe(
                data => {
                    let countInterestedCutomers: string = '0';
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumers");
                        var cartd = [];
                        $.each(docs, function (i, docs) {

                            countInterestedCutomers = $(docs).find("TotalCount").text();
                        });
                        //$("#interestedConsumer").html(cartd.join(''));
                        this.salesCount = countInterestedCutomers;

                    } else {
                        this.salesCount = countInterestedCutomers;
                    }
                });
    }

    getTotalSalesAndServicesCount() {
        this.dashboardService
            .getServicesCount()
            .subscribe(
                data => {
                    let countTotalCutomers: string = '0';
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumers");
                        var cartd = [];
                        debugger;
                        $.each(docs, function (i, docs) {

                            countTotalCutomers = $(docs).find("TotalCount").text();
                        });
                        //$("#interestedConsumer").html(cartd.join(''));
                        this.TotalCount = countTotalCutomers;

                    } else {
                        this.TotalCount = countTotalCutomers;
                    }
                });
    }


    getClientDetailsSalesData() {
        //sales
        //getClientDetailsSalesData
        this.dashboardService
            .getClientDetailsSalesData()
            .subscribe(
                data => {
                    let countInterestedCutomers: string = '0';
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet != null) {
                            this.initializedDataTableSales(dataJson.NewDataSet.InterestedConsumer);

                        }
                        else {
                            this.initializedDataTableSales(undefined);

                        }

                        //this.initializedDataTableSales(dataJson.NewDataSet.InterestedConsumer);
                    }
                });
    }

    initializedDataTableSales(asyncData) {
        let dTable: any = $('#sales');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'name': '',
                'Mob': "",
                'EmailID': "",
                'title': "",
                'categoryName': "",
                'SubCategory': "",
            };
        }
        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'id'
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
                },
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

        $('#sales').on('click', 'a.editor_remove', function (e) {
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

    getClientDetailsServicesData() {
        //services
        this.dashboardService
            .getClientDetailsServicesData()
            .subscribe(
                data => {
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJson = JSON.parse(json);

                        if (dataJson.NewDataSet != null) {
                            this.initializedDataTableServices(dataJson.NewDataSet.InterestedConsumerser);

                        }
                        else {
                            this.initializedDataTableServices(undefined);

                        }

                        //this.initializedDataTableServices(dataJson.NewDataSet.InterestedConsumerser);
                    }
                });
    }

    initializedDataTableServices(asyncData) {
        let dTable: any = $('#services');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'name': '',
                'Mob': "",
                'EmailID': "",
                'title': "",
                'categoryName': "",

            };
        }
        dTable.dataTable({
            data: asyncData,
            columns: [
                {
                    data: 'id'
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

        $('#services').on('click', 'a.editor_remove', function (e) {
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


    deleteCustomerRecords(id) {
        //services
        this.dashboardService
            .deleteCustomerRecords(id)
            .subscribe(
                data => {
                    this.showSuccessMessage = "Data Deleted Succesfully.";
                    this.getClientDetailsServicesData();
                    setInterval(function () {
                        this.showSuccessMessage = "";
                    }, 2000)
                });
    }
}