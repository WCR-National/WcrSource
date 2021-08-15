import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ClientDetailsService } from '../../associate-service/client-details.service';
import * as $ from 'jquery';
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
    constructor(private route: ActivatedRoute, private router: Router, private clientDetailsService: ClientDetailsService, private xmlToJson: XMLToJSON) {

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
        this.clientDetailsService
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

    getSalesCount() {
        this.clientDetailsService
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
        this.clientDetailsService
            .getTotalSalesAndServicesCount()
            .subscribe(
                data => {
                    let countTotalCutomers: string = '0';
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumer");
                        var cartd = [];
                        
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
        this.clientDetailsService
            .getClientDetailsSalesData()
            .subscribe(
                data => {
                    let countInterestedCutomers: string = '0';
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson :any = [];
                        var dataJson = JSON.parse(json);


                        if (dataJson.NewDataSet != null) {

                            if (!Array.isArray(dataJson.NewDataSet.InterestedConsumer)) {
                                resultJson.push(dataJson.NewDataSet.InterestedConsumer);
                                dataJson.NewDataSet.InterestedConsumer = resultJson;
                            }
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
        console.log(asyncData);
        let dTable: any = $('#sales');
        let thisStatus: any = this;
        if (asyncData === undefined)
        {
            asyncData =
            {
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
                    defaultContent: '<a href="" class="editor_remove"><i class="fas fa-fw fa-trash-alt tx-20 tx-red" aria-hidden="true"></i></a>'
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
            
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.clientDetailsService
                .deleteCustomerRecords($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        thisStatus.getClientDetailsSalesData();
                        thisStatus.getSalesCount();
                        thisStatus.getTotalSalesAndServicesCount();
                    });
        });
    }

    getClientDetailsServicesData() {
        //services
        this.clientDetailsService
            .getClientDetailsServicesData()
            .subscribe(
                data => {
                    if (data.d.length > 0) {

                        var xmlDoc = $.parseXML(data.d);
                        var json = this.xmlToJson.xml2json(xmlDoc, "");
                        var resultJson : any = [];
                        var dataJson  = JSON.parse(json);
                     
                        if (dataJson.NewDataSet != null) {
                            if (!Array.isArray(dataJson.NewDataSet.InterestedConsumerser))
                            {
                                resultJson.push(dataJson.NewDataSet.InterestedConsumerser);
                                dataJson.NewDataSet.InterestedConsumerser = resultJson;
                            }
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
        console.log(asyncData);

        let dTable: any = $('#services');
        let thisStatus: any = this;
        if (asyncData === undefined) {
            asyncData = {
                'id': '',
                'name': '',
                'Mob': "",
                'EmailID': "",
                'zipcode': "",
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
                    data: "zipcode",
                },
                {
                    data: "categoryName",
                },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<a href="" class="editor_remove"><i class="fas fa-fw fa-trash-alt tx-20 tx-red" aria-hidden="true"></i></a>'
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
            
            var tr = $(this).closest('tr');
            console.log($(this).closest('tr').children('td:first').text());

            ////get the real row index, even if the table is sorted 
            //var index = dTable.fnGetPosition(tr[0]);
            ////alert the content of the hidden first column 
            //console.log(dTable.fnGetData(index)[0]);

            dTable.api().row($(this).parents('tr')).remove().draw(false);


            thisStatus.clientDetailsService
                .deleteCustomerRecords($(this).closest('tr').children('td:first').text())
                .subscribe(
                    data => {
                        thisStatus.getClientDetailsServicesData();
                        thisStatus.getServicesCount();
                        thisStatus.getTotalSalesAndServicesCount();
                    });
        });
    }


    deleteCustomerRecords(id) {
        //services
        this.clientDetailsService
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