import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import * as $ from 'jquery';
import 'datatables.net';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(route, router, dashboardService, xmlToJson) {
        this.route = route;
        this.router = router;
        this.dashboardService = dashboardService;
        this.xmlToJson = xmlToJson;
        this.interestedCustomers = '';
        this.selectedCategories = '';
        this.myPropertyListings = '';
        this.myZipCodes = '';
    }
    DashboardComponent.prototype.ngOnInit = function () {
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
    };
    DashboardComponent.prototype.attemptToCountInterestedCustomers = function () {
        var _this = this;
        this.dashboardService
            .attemptToCountInterestedCustomers()
            .subscribe(function (data) {
            var countInterestedCutomers = '0';
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("TotalInterestedConsumer");
                var cartd = [];
                $.each(docs, function (i, docs) {
                    countInterestedCutomers = $(docs).find("TotalCount").text();
                });
                //$("#interestedConsumer").html(cartd.join(''));
                _this.interestedCustomers = countInterestedCutomers;
            }
            else {
                _this.interestedCustomers = countInterestedCutomers;
            }
        });
    };
    DashboardComponent.prototype.attemptToCountAssociateCategories = function () {
        var _this = this;
        this.dashboardService
            .attemptToCountAssociateCategories()
            .subscribe(function (data) {
            var countSelectedCategories = '0';
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("AssocateCategories");
                var cartd = [];
                $.each(docs, function (i, docs) {
                    countSelectedCategories = $(docs).find("Total").text();
                });
                //$("#divAssociateCategory").html(cartd.join(''));
                _this.selectedCategories = countSelectedCategories;
            }
            else {
                _this.selectedCategories = countSelectedCategories;
            }
        });
    };
    DashboardComponent.prototype.attemptToCountPurchasedCategories = function (jobtype) {
        var _this = this;
        this.dashboardService
            .attemptToCountPurchasedCategories()
            .subscribe(function (data) {
            var CountPurchasedCategories = "0";
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
                _this.myPropertyListings = CountPurchasedCategories;
                //$("#" + divID).html(cartd.join(''));
            }
            else {
                _this.myPropertyListings = CountPurchasedCategories;
            }
        });
    };
    DashboardComponent.prototype.attemptToCountPurchaseZipCode = function () {
        var _this = this;
        this.dashboardService
            .attemptToCountPurchaseZipCode()
            .subscribe(function (data) {
            var CountPurchasedZipcodes = "0";
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("TotalZipCode");
                var cartd = [];
                $.each(docs, function (i, docs) {
                    CountPurchasedZipcodes = ($(docs).find("Total").text());
                });
                _this.myZipCodes = CountPurchasedZipcodes;
                //$("#divServicesCount").html(cartd.join(''));
            }
            else {
                _this.myZipCodes = CountPurchasedZipcodes;
            }
        });
    };
    DashboardComponent.prototype.attemptToCountAllPurchasedCategories = function () {
        this.dashboardService
            .attemptToCountAllPurchasedCategories()
            .subscribe(function (data) {
            var CountPurchasedZipcodes = "0";
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
    };
    DashboardComponent.prototype.attemptToInterestedCustomerData = function () {
        var _this = this;
        this.dashboardService
            .attemptToInterestedCustomerData()
            .then(function (data) {
            if (data.d.length > 0) {
                var added_1 = false;
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                _this.dashboardService
                    .attemptToInterestedCustomerServicesData()
                    .then(function (data) {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var json = _this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJsonServices = JSON.parse(json);
                        $.each(dataJsonServices.InterestedConsumerser, function (i) {
                            dataJson.push(dataJsonServices[i]);
                        });
                        _this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                        added_1 = true;
                    }
                    else {
                        _this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                    }
                });
            }
        });
    };
    DashboardComponent.prototype.initialiseInterestedCustomerDataTable = function (asyncData) {
        var dataTable = $('#interestedCustomers');
        if (asyncData === undefined) {
            asyncData = {
                'name': '',
                'Mob': "",
                'EmailID': "",
                'title': "",
                'categoryName': "",
                'SubCategory': ''
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
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            buttons: [
                'excel', 'pdf'
            ],
            order: [[1, 'asc']]
        });
    };
    DashboardComponent.prototype.attemptToCategoriesData = function () {
        var _this = this;
        this.dashboardService
            .attemptToCategoriesData()
            .then(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                _this.initialiseCategoriesDataTable(dataJson.AllPurCategories);
            }
        });
    };
    DashboardComponent.prototype.initialiseCategoriesDataTable = function (asyncData) {
        var dataTable = $('#selectedCategories');
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
                    "mRender": function (data, type, row) {
                        return row['categoryname'] + '/' + row['Name'];
                    }
                }
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
    };
    DashboardComponent.prototype.attemptToMyPropertyListingsData = function () {
        var _this = this;
        this.dashboardService
            .attemptToMyPropertyListingsData()
            .then(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                _this.initialiseMyPropertyListingsTable(dataJson.ViewAdvertisment);
            }
        });
    };
    DashboardComponent.prototype.initialiseMyPropertyListingsTable = function (asyncData) {
        var dataTable = $('#myPropertyListings');
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
                    data: "Amount",
                },
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var index = iDisplayIndex + 1;
                $('td:eq(0)', nRow).html(index);
                return nRow;
            },
            buttons: [
                'excel', 'pdf'
            ],
            "autoWidth": true,
            searching: false,
            paging: false,
            info: false,
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;
                // converting to interger to find total
                var intVal = function (i) {
                    return typeof i === 'string' ? Number(i) : typeof i === 'number' ? i : 0;
                };
                // computing column Total of the complete result 
                var amountTotal = api
                    .column(5)
                    .data()
                    .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
                // Update footer by showing the total with the reference of the column index 
                $(api.column(0).footer()).html('Total');
                $(api.column(1).footer()).html('');
                $(api.column(2).footer()).html('');
                $(api.column(3).footer()).html('');
                $(api.column(4).footer()).html(amountTotal);
            }
        });
        //dataTable.on('order.dt search.dt', function () {
        //    dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        //        cell.innerHTML = i + 1;
        //    });
        //}).draw();
    };
    DashboardComponent.prototype.attemptToZipcodeData = function () {
        var _this = this;
        this.dashboardService
            .attemptToZipcodeData()
            .then(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                _this.initialiseTable(dataJson.PurCategories);
            }
        });
    };
    DashboardComponent.prototype.initialiseTable = function (asyncData) {
        var dataTable = $('#myZipCode');
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
                    data: "zipcode",
                },
                {
                    data: "categoryname",
                },
                {
                    data: "amount",
                }
            ],
            buttons: [
                'excel', 'pdf'
            ],
            searching: false,
            paging: false,
            info: false,
            "aoColumnDefs": [
                { "sWidth": "33.67%", "aTargets": [-1] }
            ]
        });
        //dataTable.on('order.dt search.dt', function () {
        //    dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        //        cell.innerHTML = i + 1;
        //    });
        //}).draw();
    };
    DashboardComponent.prototype.attemptToAllAdvertisement = function () {
    };
    DashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-dashboard-page',
            templateUrl: './dashboard.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, DashboardService, XMLToJSON])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map