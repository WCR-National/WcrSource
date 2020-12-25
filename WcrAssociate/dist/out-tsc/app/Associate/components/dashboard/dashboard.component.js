import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import * as $ from 'jquery';
import 'datatables.net';
import { MessageService } from 'AngularAssociate/app/services/search';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
import { ClientDetailsService } from 'AngularAssociate/app/services/associate/client-details.service';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(route, router, dashboardService, clientDetailsService, xmlToJson, profileService, _messageService) {
        this.route = route;
        this.router = router;
        this.dashboardService = dashboardService;
        this.clientDetailsService = clientDetailsService;
        this.xmlToJson = xmlToJson;
        this.profileService = profileService;
        this._messageService = _messageService;
        this.interestedCustomers = '';
        this.selectedCategories = '';
        this.myPropertyListings = '';
        this.myZipCodes = '';
        this.showInformation = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        $.fn.dataTable.ext.errMode = 'none';
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
        //this._messageService.listen().subscribe((m: any) => {
        //    if (m == 'hide-info-dashboard') {
        //        this.showInformation = false;
        //    }
        //    else if (m == 'show-info-dashboard') {
        //        this.showInformation = true;
        //    }
        //})
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
        this.clientDetailsService
            .getClientDetailsSalesData()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                debugger;
                var added_1 = false;
                var xmlDoc = $.parseXML(data.d);
                var json = _this.xmlToJson.xml2json(xmlDoc, "");
                var dataJson = JSON.parse(json);
                console.log(dataJson);
                var interesterConsumersDataArr = [];
                if (dataJson.NewDataSet != null) {
                    if (!Array.isArray(dataJson.NewDataSet.InterestedConsumer)) {
                        interesterConsumersDataArr.push(dataJson.NewDataSet.InterestedConsumer);
                    }
                    else {
                        $.each(dataJson.NewDataSet.InterestedConsumer, function (i) {
                            interesterConsumersDataArr.push(dataJson.NewDataSet.InterestedConsumer[i]);
                        });
                    }
                }
                _this.clientDetailsService
                    .getClientDetailsServicesData()
                    .subscribe(function (data) {
                    debugger;
                    if (data.d.length > 0) {
                        debugger;
                        var xmlDoc = $.parseXML(data.d);
                        var json = _this.xmlToJson.xml2json(xmlDoc, "");
                        var dataJsonServices = JSON.parse(json);
                        console.log(dataJsonServices);
                        if (dataJsonServices.NewDataSet != null) {
                            if (!Array.isArray(dataJsonServices.NewDataSet.InterestedConsumerser)) {
                                interesterConsumersDataArr.push(dataJsonServices.NewDataSet.InterestedConsumerser);
                            }
                            else {
                                $.each(dataJsonServices.NewDataSet.InterestedConsumerser, function (i) {
                                    interesterConsumersDataArr.push(dataJsonServices.NewDataSet.InterestedConsumerser[i]);
                                });
                            }
                            _this.initialiseInterestedCustomerDataTable(interesterConsumersDataArr);
                        }
                        else {
                            if (interesterConsumersDataArr == null) {
                                _this.initialiseInterestedCustomerDataTable(undefined);
                            }
                            else {
                                _this.initialiseInterestedCustomerDataTable(interesterConsumersDataArr);
                            }
                        }
                        added_1 = true;
                    }
                    else {
                        if (interesterConsumersDataArr == null || interesterConsumersDataArr.length == 0) {
                            _this.initialiseInterestedCustomerDataTable(undefined);
                        }
                        else {
                            _this.initialiseInterestedCustomerDataTable(interesterConsumersDataArr);
                        }
                    }
                });
            }
        });
    };
    DashboardComponent.prototype.initialiseInterestedCustomerDataTable = function (asyncData) {
        var dTable = $('#interestedCustomers');
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
        //dTable.api().column(0).visible(false);;
        var thisStatus = this;
        // Delete a record
        $('#interestedCustomers').on('click', 'a.editor_remove', function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());
            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);
            dTable.api().row($(this).parents('tr')).remove().draw(false);
            thisStatus.clientDetailsService
                .deleteCustomerRecords($(this).closest('tr').children('td:first').text())
                .subscribe(function (data) { });
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
                console.log(dataJson);
                if (dataJson != null && dataJson.NewDataSet != null) {
                    if (Array.isArray(dataJson.NewDataSet.AllPurCategories)) {
                        _this.initialiseCategoriesDataTable(dataJson.NewDataSet.AllPurCategories);
                    }
                    else {
                        var jsonArray = [];
                        jsonArray.push(dataJson.NewDataSet.AllPurCategories);
                        _this.initialiseCategoriesDataTable(jsonArray);
                    }
                }
                else {
                    _this.initialiseCategoriesDataTable(undefined);
                }
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
        dataTable.dataTable({
            data: asyncData,
            columns: [
                {
                    "data": null,
                    "render": function (data, type, full) {
                        return full['categoryname'] + '/' + full['Name'];
                    }
                },
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
                console.log(dataJson);
                if (dataJson != null && dataJson.NewDataSet != null) {
                    if (Array.isArray(dataJson.NewDataSet.ViewAdvertisment)) {
                        _this.initialiseMyPropertyListingsTable(dataJson.NewDataSet.ViewAdvertisment);
                    }
                    else {
                        var jsonArray = [];
                        jsonArray.push(dataJson.NewDataSet.ViewAdvertisment);
                        _this.initialiseMyPropertyListingsTable(jsonArray);
                    }
                }
                else {
                    _this.initialiseMyPropertyListingsTable(undefined);
                }
            }
        });
    };
    DashboardComponent.prototype.initialiseMyPropertyListingsTable = function (asyncData) {
        $("#myPropertyListings").append('<tfoot><th></th><th></th><th></th><th></th><th></th></tfoot>');
        var dataTable = $('#myPropertyListings');
        if (asyncData === undefined) {
            asyncData = {
                'advertisementID': '',
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
                    data: "advertisementID",
                },
                {
                    data: "title",
                },
                {
                    data: "name",
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
            ],
            //"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //    var index = iDisplayIndex + 1;
            //    $('td:eq(0)', nRow).html(index);
            //    return nRow; 
            //},
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
                    return typeof i === 'string' ? parseInt(i) : typeof i === 'number' ? i : 0;
                };
                // computing column Total of the complete result 
                var amountTotal = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
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
                console.log(dataJson);
                if (dataJson != null && dataJson.NewDataSet != null) {
                    if (Array.isArray(dataJson.NewDataSet.PurCategories)) {
                        _this.initialiseTable(dataJson.NewDataSet.PurCategories);
                    }
                    else {
                        var jsonArray = [];
                        jsonArray.push(dataJson.NewDataSet.PurCategories);
                        _this.initialiseTable(jsonArray);
                    }
                }
                else {
                    _this.initialiseTable(undefined);
                }
            }
        });
    };
    DashboardComponent.prototype.initialiseTable = function (asyncData) {
        $("#myZipCode").append('<tfoot><th></th><th></th><th></th></tfoot>');
        var dataTable = $('#myZipCode');
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
                var intVal = function (i) {
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
    };
    DashboardComponent.prototype.attemptToAllAdvertisement = function () {
    };
    DashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-dashboard-page',
            templateUrl: './dashboard.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, DashboardService, ClientDetailsService, XMLToJSON, ProfileService, MessageService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map