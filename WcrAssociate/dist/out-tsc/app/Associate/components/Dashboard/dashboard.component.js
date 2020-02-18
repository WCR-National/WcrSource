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
                _this.myPropertyListings = CountPurchasedZipcodes;
                //$("#divServicesCount").html(cartd.join(''));
            }
            else {
                _this.myPropertyListings = CountPurchasedZipcodes;
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
                });
                if (!added_1) {
                    _this.initialiseInterestedCustomerDataTable(dataJson.InterestedConsumer);
                }
            }
        });
    };
    DashboardComponent.prototype.initialiseInterestedCustomerDataTable = function (asyncData) {
        var dataTable = $('#interestedCustomers');
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
    };
    DashboardComponent.prototype.initialiseTable = function (asyncData) {
        var dataTable = $('#myZipCode');
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