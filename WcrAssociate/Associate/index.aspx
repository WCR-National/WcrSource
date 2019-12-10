<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="WcrAssociate.Associate.index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <!-- Small boxes (Stat box) -->
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 nopadd colume5">


            <!-- ./col -->
            <%--<div class="col-lg-2 col-sm-2 col-md-2 col-xs-6">
                       
                        <div class="small-box bg-red">
                            <div class="inner" id="divAllAdts">
                            </div>
                            <div class="icon"><i class="ion ion-pie-graph"></i></div>
                            <a href="#" name="allads" class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>--%>


            <%-- <div class="col-lg-2 col-sm-2 col-md-2 col-xs-6" style="visibility: hidden">
                        
                        <div class="small-box bg-yellow">
                            <div class="inner">
                                <h3>0 </h3>
                                <p>Messages    </p>
                            </div>
                            <div class="icon"><i class="ion ion-person-add"></i></div>
                            <a href="#" name="amsg" class="small-box-footer">View Snapshot<i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>--%>
        </div>
        <!-- ./col -->
    </div>


    <div class="row">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12 dashboard-block">
            <h1>Dashboard </h1>

            <div class=" ">
                <div class="box-body no-padding">
                    <div class="row">
                        <div class="col-sm-12">

                            <div class="small-box bg-red">
                                <div class="inner" id="interestedConsumer">
                                </div>
                                <%--<div class="icon"><i class="ion ion-bag"></i></div>
                            <a href="#" name="ainterestConsumer" class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive">
                                <div class="uk-overflow-container" id="divShowConsumerInterest">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row space30">
                        <div class="col-sm-3">
                            <div class="small-box bg-aqua">

                                <div class="inner" id="divAssociateCategory">
                                </div>
                                <%--<div class="icon"><i class="ion ion-bag"></i></div>
                            <a href="#" name="aassociatecate" class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive grid-block">
                                <div class="uk-overflow-container" id="divShowPurchasedCategories">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="small-box bg-green">
                                <div class="inner" id="divSalesCount">
                                </div>
                                <%-- <div class="icon"><i class="ion ion-person-add"></i></div>
                            <a href="#" name='aid' class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive grid-block">
                                <div class="uk-overflow-container" id="divShowPostedAdvertisementsSales">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="small-box bg-yellow">
                                <div class="inner" id="divServicesCount">
                                </div>
                                <%-- <div class="icon"><i class="ion ion-person-add"></i></div>
                            <a href="#" name='sid' class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive grid-block">
                                <div class="uk-overflow-container" id="divShowPostedAdvertisementsServices">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /. box -->
        </div>
    </div>
    <script src="js/jQuery-2.1.4.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            CountSalesCategory(1, "divSalesCount");
            CountSalesCategory(2, "divServicesCount");
            ////CountAllCategory();
            CountInterestedConsumer();
            CountAssociateCategory();
            //BindAllAdvts();
            BindIntrestedConsumer();
            PurchasedCategories();
            BindData(1);
            BindData(2);
        });
        //$(document).on("click", "a[name='aid']", function (e) {
        //    BindData(1);
        //});
        //$(document).on("click", "a[name='sid']", function (e) {
        //    BindData(2);
        //});
        ////////////$(document).on("click", "a[name='allads']", function (e) {
        ////////////    BindAllAdvts();
        ////////////});
        //$(document).on("click", "a[name='ainterestConsumer']", function (e) {
        //    BindIntrestedConsumer();
        //});
        //$(document).on("click", "a[name='aassociatecate']", function (e) {
        //    BindMyAccount();
        //});

        $(document).on("click", "a[name='amsg']", function (e) {
            alert("No Data Available");
        });
        function PurchasedCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/AllPurchasedCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AllPurCategories");
                        var cartd = [];
                        cartd.push("<a href='PurchaseCategory.aspx'>Purchased Categories </a>");
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>S.No</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Job Type</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Category Name</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>SubCategory</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Zipcode </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>From</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>To</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Amount</td>");
                        cartd.push("</tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("JobName").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("categoryname").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("Name").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("zipCode").text() + " </td>"));

                            var date = $(docs).find("fromDate").text();
                            var split = date.split('T').shift();   // 2016-01-06
                            var parts = split.split('-');          // [2016, 01, 06]
                            var parsed1 = parts.reverse().join('-'); // 06-01-2016                        


                            cartd.push("<td class='uk-text-center'>" + parsed1 + " </td>");

                            var date1 = $(docs).find("toDate").text();
                            var split1 = date1.split('T').shift();   // 2016-01-06
                            var parts1 = split1.split('-');          // [2016, 01, 06]
                            var parsed11 = parts1.reverse().join('-'); // 06-01-2016
                            cartd.push("<td class='uk-text-center'>" + parsed11 + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("amount").text() + "$ </td>"));
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divShowPurchasedCategories").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindIntrestedConsumer() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/GetVisitorsInfo", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("InterestedConsumer");
                        var cartd = [];
                        cartd.push("<a href='VisitorsInfo.aspx'> Consumer Interest </a> <label id='divTotalIntertes'></label>");
                        //:<span style='margin-left:50px'> <a href='VisitorsInfo.aspx'>View Full Details</a></span>
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>S.No</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Name</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Mobile</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Email</th> <th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Property Title</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Date</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("name").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("Mob").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("EmailID").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            var date = $(docs).find("AddedOn").text();
                            var split = date.split('T').shift();   // 2016-01-06
                            var parts = split.split('-');          // [2016, 01, 06]
                            var parsed1 = parts.reverse().join('-'); // 06-01-2016
                            cartd.push("<td>" + parsed1 + " </td>");

                            //cartd.push("<td>" + ($(docs).find("advertisementID").text() + " </td>"));
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divShowConsumerInterest").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindAllAdvts() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAllAdvertisement", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAllAdvertisement");
                        var cartd = [];
                        cartd.push("Posted Advertisements - All:<span style='margin-left:50px'> <a href='ViewPostedAdvertisement.aspx'>View Full Details</a></span>");
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>S.No</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Title</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Address</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Contactno</th> <th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Description</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("address").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("contactNo").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("description").text() + " </td>"));
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divShow").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function BindData(jobtype) {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        if (jobtype == 1) {
                            cartd.push("<a href='PostAdvertisement.aspx?pid=1'>Posted Advertisements - Sales</a>");
                        }
                        else {
                            cartd.push("<a href='PostAdvertisement.aspx?pid=2'>Posted Advertisements - Services</a>");
                        }
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>S.No</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Title</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Address</th><th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Contactno</th> <th style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Description</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("address").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("contactNo").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("description").text() + " </td>"));
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        if (jobtype == 1) {
                            $("#divShowPostedAdvertisementsSales").html(cartd.join(''));
                        }
                        else {
                            $("#divShowPostedAdvertisementsServices").html(cartd.join(''));

                        }
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function CountSalesCategory(jobtype, divID) {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/CountPurchasedCategories", data: "{'jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAds");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            cartd.push("<h3>" + ($(docs).find("Total").text()) + " </h3>");
                            if (jobtype == "1") {
                                cartd.push("<p>Posted Advertisements - Sales   </p>");
                            }
                            else {
                                cartd.push("<p>Posted Advertisements - Services   </p>");
                            }
                        });
                        $("#" + divID).html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function CountAllCategory() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/CountAllPurchasedCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAllAds");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            cartd.push("<h3>" + ($(docs).find("Total").text()) + " </h3>");
                            cartd.push("<p>View advertisement   </p>");
                        });
                        $("#divAllAdts").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function CountInterestedConsumer() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/CountTotalVisitors", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumer");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            cartd.push("<h3>" + ($(docs).find("TotalCount").text()) + " </h3>");
                            $("#divTotalIntertes").text($(docs).find("TotalCount").text());
                            cartd.push("<p>Consumer Interest   </p>");
                        });
                        $("#interestedConsumer").html(cartd.join(''));


                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
        function CountAssociateCategory() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/CountAssociateCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssocateCategories");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            cartd.push("<h3>" + ($(docs).find("Total").text()) + " </h3>");
                            cartd.push("<p>Purchased Categories    </p>");
                        });
                        $("#divAssociateCategory").html(cartd.join(''));
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });
        }
    </script>



</asp:Content>
