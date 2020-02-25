import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ClientDetailsService } from 'AngularAssociate/app/services/associate/client-details.service';
var ClientDetailsComponent = /** @class */ (function () {
    function ClientDetailsComponent(route, router, dashboardService, xmlToJson) {
        this.route = route;
        this.router = router;
        this.dashboardService = dashboardService;
        this.xmlToJson = xmlToJson;
        this.salesCount = '';
        this.servicesCount = '';
        this.TotalCount = '';
        this.showSuccessMessage = '';
    }
    ClientDetailsComponent.prototype.ngOnInit = function () {
        this.getServicesCount();
        this.getSalesCount();
        this.getTotalSalesAndServicesCount();
        this.getClientDetailsSalesData();
        this.getClientDetailsServicesData();
        //this.deleteCustomerRecords();
    };
    ClientDetailsComponent.prototype.getServicesCount = function () {
    };
    ClientDetailsComponent.prototype.getSalesCount = function () {
        var _this = this;
        this.dashboardService
            .getSalesCount()
            .subscribe(function (data) {
            var countInterestedCutomers = '0';
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("TotalInterestedConsumers");
                var cartd = [];
                $.each(docs, function (i, docs) {
                    countInterestedCutomers = $(docs).find("TotalCount").text();
                });
                //$("#interestedConsumer").html(cartd.join(''));
                _this.salesCount = countInterestedCutomers;
            }
            else {
                _this.salesCount = countInterestedCutomers;
            }
        });
    };
    ClientDetailsComponent.prototype.getTotalSalesAndServicesCount = function () {
        var _this = this;
        this.dashboardService
            .getServicesCount()
            .subscribe(function (data) {
            var countInterestedCutomers = '0';
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("TotalInterestedConsumers");
                var cartd = [];
                $.each(docs, function (i, docs) {
                    countInterestedCutomers = $(docs).find("TotalCount").text();
                });
                //$("#interestedConsumer").html(cartd.join(''));
                _this.servicesCount = countInterestedCutomers;
            }
            else {
                _this.servicesCount = countInterestedCutomers;
            }
        });
    };
    ClientDetailsComponent.prototype.getClientDetailsSalesData = function () {
        var _this = this;
        //sales
        //getClientDetailsSalesData
        this.dashboardService
            .getClientDetailsSalesData()
            .subscribe(function (data) {
            var countInterestedCutomers = '0';
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                _this.initializedDataTableSales(dataJson.InterestedConsumer);
            }
        });
    };
    ClientDetailsComponent.prototype.initializedDataTableSales = function (asyncData) {
        var dataTable = $('#sales');
        var thisStatus = this;
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
    };
    ClientDetailsComponent.prototype.getClientDetailsServicesData = function () {
        var _this = this;
        //services
        this.dashboardService
            .getClientDetailsServicesData()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                _this.initializedDataTableServices(dataJson.InterestedConsumerser);
            }
        });
    };
    ClientDetailsComponent.prototype.initializedDataTableServices = function (asyncData) {
        var dataTable = $('#sales');
        var thisStatus = this;
        //cartd.push("<td>" + ($(docs1).find("name").text() + " </td>"));
        //cartd.push("<td>" + ($(docs1).find("Mob").text() + " </td>"));
        //cartd.push("<td class=''>" + ($(docs1).find("EmailID").text() + " </td>"));
        //cartd.push("<td>" + ($(docs1).find("zipcode").text() + " </td>"));
        //cartd.push("<td class='text-heighlight'>" + $(docs1).find("categoryName").text() + " </td>");
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
    };
    ClientDetailsComponent.prototype.deleteCustomerRecords = function (id) {
        var _this = this;
        //services
        this.dashboardService
            .deleteCustomerRecords(id)
            .subscribe(function (data) {
            _this.showSuccessMessage = "Data Deleted Succesfully.";
            _this.getClientDetailsServicesData();
            setInterval(function () {
                this.showSuccessMessage = "";
            }, 2000);
        });
    };
    ClientDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-client-details-page',
            templateUrl: './client-details.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ClientDetailsService, XMLToJSON])
    ], ClientDetailsComponent);
    return ClientDetailsComponent;
}());
export { ClientDetailsComponent };
//# sourceMappingURL=client-details.component.js.map