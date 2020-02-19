<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="ClientDetails.aspx.cs" Inherits="WcrAssociate.Associate.ClientDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#clientdetailclick").addClass("active");
        });
    </script>

    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
          <script src="js/bootstrap.min.js"></script>       
   
      <div>

        <div class="modal fade small-model" id="success-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal no-padding">
                        <div class="alert alert-success no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" data-dismiss="modal" id="btnok" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>
                                <label id="lblSuccess"></label>
                            </strong>
                            <br />
                            <label id="lbldetail" class="running-text"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade small-model" id="fail_message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal no-padding">
                        <div class="alert alert-danger no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>
                                <label id="lblFailureTitle"></label>
                            </strong>
                            <br />
                            <label id="lblFailureDetail" class="running-text"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

     </div>


    <div class="row">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12 dashboard-block">
            <h1>Client Details </h1>

            <div class="full-row sumary-detail-colume m-b30" style="width: 50%">

                <div class="full-row list-detail-block pb-0 ">

                    <h4>Current Summary: </h4>
                    <div class="row ">
                        <div class="col-sm-12">
                            <ul class="detail-listing " id="divSummary">
                                <li>Clients showing interest in your Sales Advertisements: <span class="badge">
                                    <label id="lblSalesCount"></label>
                                </span></li>
                                <li>Clients showing interest in your Services: <span class="badge">
                                    <label id="lblServicesCount"></label>
                                </span></li>

                                <li class="total text-right"><strong class="total-label">Total Client Interest: </strong><span class="badge">
                                    <label id="lblTotalCount"></label>
                                </span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="full-row custome-block">
                <h3 class="page-subtitle page-title-bg-primary text-uppercase">Sales  </h3>
                <div class="table-responsive grid-block data-table">
                    <div class="uk-overflow-container" id="divShow">
                    </div>
                </div>
            </div>

            <div class="full-row custome-block">
                <h3 class="page-subtitle text-uppercase page-title-bg-secondary">Services  </h3>
                <div class="table-responsive grid-block data-table">
                    <div class="uk-overflow-container" id="divShowServices">
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script>
        $(document).ready(function () {
            $.ajax({
                type: "POST", url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {
                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '')
                            {
                                window.location.href = "Dashboard.aspx";                               
                            }
                            else {
                            }
                        });
                    }
                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            });



            CountInterestedConsumerSales();
            CountInterestedConsumerServices();
            CountInterestedConsumer();
            BindData();
            BindDataServices();
            $("#btnok").click(function () {
                window.location.reload();
            });
        });

        function CountInterestedConsumerSales() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/CountTotalVisitorsSales", data: "{'jobtype':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumers");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            $("#lblSalesCount").text($(docs).find("TotalCount").text());
                        });
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

        function CountInterestedConsumerServices() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/CountTotalVisitorsSales", data: "{'jobtype':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalInterestedConsumers");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            $("#lblServicesCount").text($(docs).find("TotalCount").text());
                        });
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
                            $("#lblTotalCount").text($(docs).find("TotalCount").text());
                        });
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

        function BindData() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/GetVisitorsInfo", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("InterestedConsumer");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th>Name</th><th>Contact#</th><th>Contact Email</th> <th>Adv Title OR Service Zip Code</th><th>Category</th><th>Subcategory</th>  <th>Action</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            //var date = $(docs).find("AddedOn").text();
                            //var split = date.split('T').shift();   // 2016-01-06
                            //var parts = split.split('-');          // [2016, 01, 06]
                            //var parsed1 = parts.reverse().join('-'); // 06-01-2016
                            //cartd.push("<td class='text-heighlight'>" + parsed1 + " </td>");
                            cartd.push("<td>" + ($(docs).find("name").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("Mob").text() + " </td>"));
                            cartd.push("<td class=''>" + ($(docs).find("EmailID").text() + " </td>"));
                            cartd.push("<td class=''>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td class='text-heighlight'>" + $(docs).find("categoryName").text() + " </td>");
                            cartd.push("<td class=''>" + $(docs).find("SubCategory").text() + " </td>");
                           
                            cartd.push("<td class='text-center text-danger'> <a href='#' onclick=PermananetlyRemove(" + ($(docs).find("id").text()) + ")><i class='fa fa-trash' aria-hidden='true'></i></a>  </td>");
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

        function BindDataServices() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/GetVisitorsInfoServices", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r1) {
                    if (r1.d.length > 0) {
                        var xmlDoc1 = $.parseXML(r1.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("InterestedConsumerser");
                        var cartd = [];
                        var count = 1;
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr><th>Name</th><th>Contact#</th><th>Contact Email</th> <th>Service Zip Code</th><th>Category</th><th>Action</th>   </tr>");
                        $.each(docs1, function (i, docs1) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + ($(docs1).find("name").text() + " </td>"));
                            cartd.push("<td>" + ($(docs1).find("Mob").text() + " </td>"));
                            cartd.push("<td class=''>" + ($(docs1).find("EmailID").text() + " </td>"));
                            cartd.push("<td>" + ($(docs1).find("zipcode").text() + " </td>"));
                            cartd.push("<td class='text-heighlight'>" + $(docs1).find("categoryName").text() + " </td>");
                            cartd.push("<td class='text-center text-danger'> <a href='#' onclick=PermananetlyRemove(" + ($(docs1).find("id").text()) + ")><i class='fa fa-trash' aria-hidden='true'></i></a>  </td>");
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divShowServices").html(cartd.join(''));


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

        function PermananetlyRemove(rrr) {
            if (confirm("Are you sure? you want to Permanent Delete Record.")) {
            $.ajax({
                type: "POST",
                url: "ws/Sale.asmx/DeleteCustomerRecords",
                data: "{'ID':" + rrr + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    jQuery.noConflict();
                    $("#lblSuccess").text("Success!!")
                    $("#lbldetail").text("Deleted Succesfully.")
                    $('#success-message').modal('show');                   
                }
            });
            }
        }

    </script>
</asp:Content>
