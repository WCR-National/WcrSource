<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="WcrAssociate.Associate.Dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#dashclick").addClass("active");
        });
    </script>
    <div>
        <div class="modal fade small-model" id="success-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal no-padding">
                        <div class="alert alert-success no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" id="btnok" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
            <h1>Dashboard </h1>           
            <div style="display:none;" id="info1">               
                <h5>
               <strong> Your dashboard shows details of activity regarding your listings displayed below. </strong>
                </h5>
                <ul>
                    <li> Interested customers are displayed in the ‘My Clients’ section. </li>
                     <li>  Your current Property Listings are displayed in the ‘My Property Listings’ section. </li>
                    <li> The ‘My Zip Codes’ sections displays which zip codes you are offering your services in. </li>
                </ul>                
            </div>
            <div>
                <div class="box-body no-padding">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="small-box bg-red">
                                <div class="inner" id="interestedConsumer">
                                </div>
                                <%--<div class="icon"><i class="ion ion-bag"></i></div>
                            <a href="#" name="ainterestConsumer" class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive grid-block mCustomScrollbars" id="table-container">
                                <div class="uk-overflow-container" id="divShowConsumerInterest">
                                </div>
                                <div class="uk-overflow-container" id="divShowConsumerInterestser">
                                </div>
                                <div id="bottom_anchor"></div>
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
                            <div class="table-responsive grid-block mCustomScrollbars ">
                                <div class="uk-overflow-container" id="divShowPurchasedCategories">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="small-box bg-green">
                                <div class="inner" id="divSalesCount">
                                </div>
                                <%-- <div class="icon"><i class="ion ion-person-add"></i></div>
                            <a href="#" name='aid' class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive grid-block mCustomScrollbars">
                                <div class="uk-overflow-container" id="divShowPostedAdvertisementsSales">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="small-box bg-yellow">
                                <div class="inner" id="divServicesCount">
                                </div>
                                <%-- <div class="icon"><i class="ion ion-person-add"></i></div>
                            <a href="#" name='sid' class="small-box-footer">View Snapshot <i class="fa fa-arrow-circle-right"></i></a>--%>
                            </div>
                            <div class="table-responsive grid-block mCustomScrollbars">
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
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            CountSalesCategory(1, "divSalesCount");
            CountPurchasedZipCode();
            CountInterestedConsumer();
            CountAssociateCategory();
            BindIntrestedConsumer();
            PurchasedCategories();
            SalesCategories(1);
            ZipCodeData();
            $("#btnok").click(function () {
                window.location.reload();
            });
        });

        $(document).on("click", "a[name='amsg']", function (e) {
            jQuery.noConflict();
            $("#lblFailureTitle").text("Failure!!")
            $("#lblFailureDetail").text("No Data Available.")
            $('#fail_message').modal('show');
        });
        function ZipCodeData() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{'JobType':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        chk = 1;
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed data-table' style='width:100%'>");
                        cartd.push("<tr>");
                        // cartd.push("<td style='color: white; background-color: skyblue' ><strong>S.N</strong></td>");
                        cartd.push("<th  style='width:80px;' class='uk-width-2-10 uk-text-center'> Zip Code </th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'> Category/SubCategory </th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'> Cost </th>");
                        cartd.push("</tr>");
                        // var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            // cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("categoryname").text()) + "/" + ($(docs).find("Name").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>$" + ($(docs).find("amount").text()) + " </td>");
                            cartd.push("</tr>");
                            count++;
                            Totalamount += parseInt($(docs).find("amount").text());
                        });
                        cartd.push("<tr>");
                        cartd.push("<td class='uk-text-center total'> <strong> TOTAL </strong> </td>");
                        cartd.push("<td class='uk-text-center'>  </td>");
                        cartd.push("<td class='uk-text-center'><strong>  $" + Totalamount + " </strong> </td>");
                        cartd.push("</tr>");
                        cartd.push("</table>");
                        $("#divShowPostedAdvertisementsServices").html(cartd.join(''));
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
        function PurchasedCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/AllPurchasedCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AllPurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed data-table'>");
                        cartd.push("<tr>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'>Category/SubCategory</th>");
                        cartd.push("</tr>");
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("categoryname").text() + "/" + $(docs).find("Name").text() + " </td>"));
                            cartd.push("</tr>");
                            Totalamount += parseInt($(docs).find("amount").text());
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
            var cartd = [];
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/GetVisitorsInfo", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("InterestedConsumer");
                        cartd.push("<table class='table table-condensed data-table ' id='maintable'>");
                        cartd.push("<thead> <tr><th  class='uk-width-2-10 uk-text-center'>Name</th><th  class='uk-width-2-10 uk-text-center'>Contact#</th><th class='uk-width-2-10 uk-text-center'>Contact Email</th> <th  class='uk-width-2-10 uk-text-center'>Adv Title OR Service Zip Code</th> <th  class='uk-width-2-10 uk-text-center'>Category</th><th  class='uk-width-2-10 uk-text-center'>Subcategory</th> <th  class='uk-width-2-10 uk-text-center'>Delete</th>  </tr> </thead>");
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + ($(docs).find("name").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("Mob").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("EmailID").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + $(docs).find("categoryName").text() + " </td>");
                            cartd.push("<td>" + $(docs).find("SubCategory").text() + " </td>");
                            cartd.push("<td class='text-danger'><a href='#' onclick=PermananetlyRemove(" + ($(docs).find("id").text()) + ")><i class='fa fa-trash' aria-hidden='true'></i></a> </td>");
                            cartd.push("</tr>");
                        });
                        $.ajax({
                            type: "POST", url: "ws/Sale.asmx/GetVisitorsInfoServices", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                            success: function (r1) {
                                if (r1.d.length > 0) {
                                    var xmlDoc1 = $.parseXML(r1.d);
                                    var xml1 = $(xmlDoc1);
                                    var docs1 = xml1.find("InterestedConsumerser");
                                    $.each(docs1, function (i, docs1) {
                                        cartd.push("<tr>");
                                        cartd.push("<td>" + ($(docs1).find("name").text() + " </td>"));
                                        cartd.push("<td>" + ($(docs1).find("Mob").text() + " </td>"));
                                        cartd.push("<td>" + ($(docs1).find("EmailID").text() + " </td>"));
                                        cartd.push("<td>" + ($(docs1).find("zipcode").text() + " </td>"));
                                        cartd.push("<td> </td>");
                                        cartd.push("<td>" + $(docs1).find("categoryName").text() + " </td>");
                                        cartd.push("<td class='uk-width-2-10 uk-text-center text-danger'><a href='#' onclick=PermananetlyRemove(" + ($(docs1).find("id").text()) + ")><i class='fa fa-trash' aria-hidden='true'></i></a> </td>");
                                        cartd.push("</tr>");
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
        function PermananetlyRemove(rrr) {
            if (confirm("Are you sure want to delete?"))
            {
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
                        cartd.push("<table class='table table-condensed data-table'>");
                        cartd.push("<tr><th  class='uk-width-2-10 uk-text-center'>S.No</th><th  class='uk-width-2-10 uk-text-center'>Title</th><th  class='uk-width-2-10 uk-text-center'>Address</th><th  class='uk-width-2-10 uk-text-center'>Contactno</th> <th  class='uk-width-2-10 uk-text-center'>Description</th> </tr>");
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
        function SalesCategories(jobtype) {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed data-table'>");
                        cartd.push("<tr><th  class='uk-width-2-10 uk-text-center'>ID</th><th  class='uk-width-2-10 uk-text-center'>Advertisement Title</th><th  class='uk-width-2-10 uk-text-center'>Category/SubCategory</th><th  class='uk-width-2-10 uk-text-center'>Zipcode</th><th  class='uk-width-2-10 uk-text-center'>Cost</th> </tr>");
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("categoryname").text() + "/" + ($(docs).find("name").text()) + " </td>"));
                            cartd.push("<td>" + ($(docs).find("ZipCode").text() + " </td>"));
                            cartd.push("<td>$" + ($(docs).find("Amount").text() + " </td>"));
                            cartd.push("</tr>");
                            Totalamount += parseInt($(docs).find("Amount").text());
                        });
                        cartd.push("<tr class='fix-total'>");
                        cartd.push("<td class='uk-text-center total'><strong> TOTAL </strong> </td>");
                        cartd.push("<td class='uk-text-center'>  </td>");
                        cartd.push("<td class='uk-text-center'>  </td>");
                        cartd.push("<td class='uk-text-center'>  </td>");
                        cartd.push("<td class='uk-text-center'><strong> $" + Totalamount + " </strong></td>");
                        cartd.push("</tr>");
                        cartd.push("</table>");
                        if (jobtype == 1) {
                            $("#divShowPostedAdvertisementsSales").html(cartd.join(''));
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
        function CountPurchasedZipCode() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/CountPurchasedZipCode", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalZipCode");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            cartd.push("<h3>" + ($(docs).find("Total").text()) + " </h3>");
                            cartd.push("<p> <a style='color:white' href='ZipCodePurchase.aspx'>My Zip Codes</a> </p>");
                        });
                        $("#divServicesCount").html(cartd.join(''));
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
                                cartd.push("<a style='color:white' href='PostAdvertisement.aspx?pid=1'>My Property Listings</a>");
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
                            cartd.push("<p>   <a style='color:white;' href='ClientDetails.aspx'> My Clients </a>   </p>");
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
                            // cartd.push("<p><a style='color:white' href='PurchaseCategory.aspx'>Purchased Categories </a>   </p>");
                            cartd.push("<p><a style='color:white' href='PostAdvertisement.aspx?pid=1'>Selected Categories </a>   </p>");
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
                            $("#interestedConsumer").addClass("diable-sidelink");
                            $("#divAssociateCategory").addClass("diable-sidelink");
                            $("#divSalesCount").addClass("diable-sidelink");
                            $("#divServicesCount").addClass("diable-sidelink");
                            //$("#info").css("display", "block");
                            $("#info1").css("display", "none");
                           
                        }
                        else {
                           // $("#info").css("display", "none");
                            $("#info1").css("display", "block");
                           
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


    </script>




</asp:Content>
