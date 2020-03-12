import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ClientDetailsService } from 'AngularAssociate/app/services/associate/client-details.service';


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
                        this.servicesCount = countInterestedCutomers;

                    } else {
                        this.servicesCount = countInterestedCutomers;
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

                        this.initializedDataTableSales(dataJson.InterestedConsumer);
                    }
                });
    }

    initializedDataTableSales(asyncData) {
        let dataTable: any = $('#sales');
        let thisStatus: any = this;

        dataTable.DataTable({
            data: asyncData,
            columns: [
                { data: 'id', "visible": false },
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
                    "mRender": function (data, type, row) {
                        return '<i"' + thisStatus.deleteCustomerRecords(row[0]) + '">edit</>';
                    }
                }
            ],
            searching: false,
            paging: false,
            info: false,
            order: [[1, 'asc']]
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

                        this.initializedDataTableServices(dataJson.InterestedConsumerser);
                    }
                });
    }

    initializedDataTableServices(asyncData) {
        let dataTable: any = $('#sales');
        let thisStatus: any = this;

        dataTable.DataTable({
            data: asyncData,
            columns: [
                { data: 'id', "visible": false },
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
                    data: "zipcode",
                },
                {
                    data: "categoryName",
                },
                {
                    "mRender": function (data, type, row) {
                        return '<i"' + thisStatus.deleteCustomerRecords(row[0]) + '">edit</>';
                    }
                }
            ],
            searching: false,
            paging: false,
            info: false,
            order: [[1, 'asc']]
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