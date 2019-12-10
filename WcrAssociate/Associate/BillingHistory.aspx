<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="BillingHistory.aspx.cs" Inherits="WcrAssociate.Associate.BillingHistory" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
         <script>
             $(function () {
                 $(".sidebar-menu li ").removeClass("active");
                 $("#billingclick").addClass("active");
             }); 
    </script>    
     <div class="row">
        <div class="col-sm-12 dashboard-block">
            <h1>Billing History </h1>
            <p >Billing information is current up to the next upcoming billing cycle. Billing cycles start on the 1st of every month. Charges for your current purchases will be applied on the first of every month. For questions or concerns please contact customer support.  </p>
            <h3 class="page-subtitle  text-uppercase ">Your Current Purchases  </h3>           
                <div class="row"> 
                    <div class="col-sm-12">    
              <div class="full-row sumary-detail-colume m-b30">      
          
                <div class="full-row list-detail-block ">
                  <h4>Current Summary: </h4>
                    <div class="row ">
                        <div class="col-sm-6">                          
                            <ul class="detail-listing">
                                <li>Selected Categories : <span class="badge">
                                    <label id="lblPurchaseCategories"></label>
                                </span></li>
                                <li>Posted Sales  Advertisements: <span class="badge">
                                    <label id="lblPostedAdvertisement"></label>
                                </span></li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                            <ul class="detail-listing">
                                <li>Purchased Zip Codes: <span class="badge">
                                    <label id="lblPurchasedZipCode"></label>
                                </span></li>
                                <li>Next Billing Cycle Starts :  <span class="badge"> <label id="lblPurchaseCategoriesdd"> </label> </span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                        </div>

                </div>     
                  </div>     

            <div class=" sumary-detail-colume m-b30 no-border " >
                <h4 class="blue-subheading text-uppercase">Current Details:</h4>
                <div class="row">
                <div class="col-sm-6">
                    <div class="full-row heighlight-block">
                        <div class="heighlight-heading bg-aqua">
                            <a style="" href="#">Selected Categories :
                               <span class="badge">
                                   <label id="lblPurchaseCategories1"></label>
                               </span>
                            </a>
                        </div>
                        <div class="table-responsive grid-block ">
                            <div class="uk-overflow-container" id="divShowPurchasedCategories">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="full-row heighlight-block">
                        <div class="heighlight-heading bg-yellow">
                            <a style="" href="#">Purchased Zip Codes
                               <span class="badge">
                                   <label id="lblPurchasedZipCode1"></label>
                               </span>
                            </a>
                        </div>
                        <div class="table-responsive grid-block ">
                            <div class="uk-overflow-container" id="divPurchaseZipcodes">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="full-row sumary-detail-colume m-b30 ">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="full-row heighlight-block">
                            <div class="heighlight-heading bg-green">
                                <a style="" href="#">Posted Sales Advertisements
                               <span class="badge">
                                   <label id="lblPostedAdvertisement1"></label>
                               </span>
                                </a>
                            </div>
                            <div class="table-responsive grid-block ">
                                <div class="uk-overflow-container" id="divShowPostedAdvertisementsSales">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full-row sumary-detail-colume data-table">
                <h4 class="blue-subheading text-uppercase">Your Previous Purchases  </h4>              
                <p>Click on a specific billing history item to view more details  </p>
                <div class="row">
                    <div class="col-sm-12 ">                    
                            <div class="table-responsive grid-block ">
                                <div class="uk-overflow-container" id="divPreviousHistory">
                                </div>                         
                        </div> </div>                  
                </div>
            </div>
              <div id="divPrevDetail" style="display: none;">
            <div class=" sumary-detail-colume m-b30 ">
                <h4 class="blue-subheading text-uppercase">Your Previous Purchase Details 
                      <label id="lblPurchaseDetailDate"></label>
                </h4>
                <div class="row">
                <div class="col-sm-6">
                    <div class="full-row heighlight-block">
                        <div class="heighlight-heading bg-aqua">
                            <a style="" href="#">Purchased Categories
                               <span class="badge">
                                   <label id="lblPurchaseCategories2"></label>
                               </span>
                            </a>
                        </div>
                         <div class="table-responsive grid-block ">
                                <div class="uk-overflow-container" id="divbillinghistPreviousCategory">
                                </div>
                            </div>
                    </div>

                </div>


                <div class="col-sm-6">
                    <div class="full-row heighlight-block">
                        <div class="heighlight-heading bg-yellow">
                            <a style="" href="#">Purchased Zip Code: 
                               <span class="badge">
                                     <label id="lblPurchasedZipCode2"></label>
                               </span>
                            </a>
                        </div>
                    
                           <div class="table-responsive grid-block ">
                                <div class="uk-overflow-container" id="divPurchaseZipcodes2">
                                </div>
                            </div>
                    </div>

                </div>
                </div>

            </div>

                  <div class="full-row sumary-detail-colume m-b30 ">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="full-row heighlight-block">
                            <div class="heighlight-heading bg-green">
                                <a style="" href="#">Posted Sales Advertisements
                               <span class="badge">
                                    <label id="lblPostedAdvertisement2"></label>
                               </span>
                                </a>
                            </div>
                            <div class="table-responsive grid-block ">
                              <div class="uk-overflow-container" id="divPostedAdvertisementhistory">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          </div>   


        </div>
        <div role="alert" id="divSuccessEdit" class="alert alert-success" style="visibility: hidden">
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
                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
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
            var now = new Date();
            var current;
            if (now.getMonth() == 11) {
                current = new Date(now.getFullYear() + 1, 0, 1).format('yyyy-MM-dd');
            } else {
                current = new Date(now.getFullYear(), now.getMonth() + 1, 1).format('yyyy-MM-dd');
            }           
            $("#lblPurchaseCategoriesdd").text(current);

            CountAssociateCategory();
            CountSalesCategory(1);
            PurchasedCategories();
            SalesCategories(1);
            CountPurchasedZipCode();
            ZipCodeData();
            BindPreviousHistory();

            //BindMyAccount();
        });

        function CountAssociateCategory() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/CountAssociateCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssocateCategories");
                        $.each(docs, function (i, docs) {
                            $("#lblPurchaseCategories").text($(docs).find("Total").text());
                            $("#lblPurchaseCategories1").text($(docs).find("Total").text());

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
        function CountSalesCategory(jobtype) {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/CountPurchasedCategories", data: "{'jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("TotalAds");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            $("#lblPostedAdvertisement").text($(docs).find("Total").text());
                            $("#lblPostedAdvertisement1").text($(docs).find("Total").text());


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
        function PurchasedCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/AllPurchasedCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AllPurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'>Category/SubCategory</th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'>Cost</th>");
                        cartd.push("</tr>");
                        var count = 1;
                        var _amount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("categoryname").text() + "/" + $(docs).find("Name").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>$" + ($(docs).find("amount").text() + " </td>"));
                            cartd.push("</tr>");
                            _amount += parseInt($(docs).find("amount").text());
                        });

                        cartd.push("<tr>");
                        cartd.push("<td><b> TOTAL </b></td>");
                        cartd.push("<td class='uk-text-center'><b>$ " + _amount + "</b></td>");
                        cartd.push("</tr>");
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
        function SalesCategories(jobtype) {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr><th  class='uk-width-2-10 uk-text-center'>S.N</th><th  class='uk-width-2-10 uk-text-center'>Advertisement Title</th><th  class='uk-width-2-10 uk-text-center'>Category/SubCategory</th><th  class='uk-width-2-10 uk-text-center'>Cost</th> </tr>");
                        var count = 1;
                        var _amount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("categoryname").text() + "/" + ($(docs).find("name").text()) + " </td>"));
                            cartd.push("<td>$" + ($(docs).find("Amount").text() + " </td>"));
                            cartd.push("</tr>");
                            _amount += parseInt($(docs).find("Amount").text());
                        });
                        cartd.push("<tr>");
                        cartd.push("<td><b>TOTAL</b></td>");
                        cartd.push("<td> </td>");
                        cartd.push("<td> </td>");
                        cartd.push("<td><b>$" + _amount + "</b></td>");
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
                            $("#lblPurchasedZipCode").text($(docs).find("Total").text());
                            $("#lblPurchasedZipCode1").text($(docs).find("Total").text());
                           
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
                        cartd.push("<table class='table table-condensed' style='width:95%'>");
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
                            Totalamount += parseInt($(docs).find("amount").text());
                            count++;
                        });
                        cartd.push("<tr>");
                        cartd.push("<td><b>TOTAL</b></td>");                     
                        cartd.push("<td> </td>");
                        cartd.push("<td>$" + Totalamount + " </td>");
                        cartd.push("</tr>");
                        cartd.push("</table>");
                        $("#divPurchaseZipcodes").html(cartd.join(''));
                        
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
        function ShowPopUp(dynar) {
            var rowID;
            var SubCategory;
            var active;
            var array = dynar.split(",");
            for (var i in array) {
                if (i == 0) {
                    if (array[i] == '') {
                        lblRowId.value = "";
                    }
                    else {
                        rowID = array[i];
                    }
                }
                else if (i == 1) {
                    SubCategory = array[i];
                }
                else if (i == 2) {
                    active = array[i];
                }
            }
            var msg = [];
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/UpdateMyAccount", data: "{'ID':'" + rowID + "','activeV':'" + active + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d == "0") {
                        msg.push("<strong></strong>Not Blocked. Contact To System Admin.");
                        $("#divSuccessEdit").html(msg.join(''));
                        $("#divSuccessEdit").css("visibility", 'visible');
                        setTimeout(function () {
                            $('#divSuccessEdit').fadeOut('fast');
                        }, 2000);
                    }
                    else if (r.d == "3") {
                        msg.push("<strong></strong>OOPS Error ! Please try again.");
                        $("#divSuccessEdit").css("visibility", 'visible');
                        $("#divSuccessEdit").html(msg.join(''));
                        setTimeout(function () {
                            $('#divSuccessEdit').fadeOut('fast');
                        }, 2000);
                    }
                    else {

                        $.ajax({
                            type: "POST", url: "ws/MyCategories.asmx/Blockadvertisements", data: "{'ID':'" + SubCategory + "','activeV':'" + active + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                            success: function (r) {
                                if (r.d == "0") {
                                    msg.push("<strong></strong>Category Blocked Succesfully!");
                                    $("#divSuccessEdit").css("visibility", 'visible');
                                    $("#divSuccessEdit").html(msg.join(''));
                                    setTimeout(function () {
                                        $('#divSuccessEdit').fadeOut('fast');
                                    }, 2000);
                                }
                                else {
                                    msg.push("<strong>Well done ! </strong>Category Blocked Succesfully! and All the Posted Advertisements are Blocked for the category.");
                                    $("#divSuccessEdit").css("visibility", 'visible');
                                    $("#divSuccessEdit").html(msg.join(''));
                                    setTimeout(function () { $('#divSuccessEdit').fadeOut('fast'); }, 2000);

                                }
                                BindMyAccount();
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

        }
        function BindMyAccount() {
            $.ajax({
                // type: "POST", url: "ws/CategoryPurchase.asmx/MyAccountData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                type: "POST", url: "ws/MyCategories.asmx/AllPurchasedCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AllPurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>S.No</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Job Type</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Category Name</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Sub-Category</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Zipcode </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>From</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>To</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Amount</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Action</td>");
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
                            cartd.push("<td class='uk-text-center'>$" + ($(docs).find("amount").text() + " </td>"));
                            if ($(docs).find("status").text() == "1") {
                                cartd.push("<td class='uk-text-center'><button type='button' onclick=ShowPopUp('" + ($(docs).find("id").text()) + "," + ($(docs).find("subCategoryID").text()) + ",0')   id='" + ($(docs).find("id").text()) + "'>Want to Block </button> </td>");
                            }
                            else {
                                cartd.push("<td class='uk-text-center'><button type='button' onclick=ShowPopUp('" + ($(docs).find("id").text()) + "," + ($(docs).find("subCategoryID").text()) + ",1') style='background-color:red; color:white;' >Want To UnBlock </button> </td>");
                            }
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

        function BindPreviousHistory() {
            $.ajax({
                type: "POST",
                url: "ws/BillingHistoryRef.asmx/GetBillingHistoryRef",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Billinghist");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tbody>");
                        cartd.push("<tr>");
                        cartd.push("<th>Date </th>");
                        cartd.push("<th>Description of Cycle charges </th>");
                        cartd.push("<th>Card </th>");
                        cartd.push("<th>Amount </th>");
                        cartd.push("</tr>");
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            var date = $(docs).find("BillingDate").text();
                            var split = date.split('T').shift();   // 2016-01-06
                            var parts = split.split('-');          // [2016, 01, 06]
                            var parsed1 = parts.reverse().join('-'); // 06-01-2016
                            cartd.push("<td>" + parsed1 + " </td>");
                            cartd.push("<td class='hightlight-text'><input type='button'  onclick=ViewAllRecords('" + ($(docs).find("Id").text()) + "') value='" + parsed1 + "'/> </td>");
                            //cartd.push("<td class='hightlight-text'><a href='#' id='btnclk' onclick=ViewAllRecords('" + ($(docs).find("Id").text()) + "'>" + parsed1 + "</a> </td>");
                          
                            cartd.push("<td>" + ($(docs).find("Last4CardNbr").text() + " </td>"));
                            cartd.push("<td>$" + ($(docs).find("BillingAmount").text() + " </td>"));

                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divPreviousHistory").html(cartd.join(''));
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

        function ViewAllRecords(referenceID) {
            $("#divPrevDetail").css("display", "block");
            BindPreviousHistoryPurchaseCategory(referenceID);
            BindPreviousHistoryPostedAdvertisements(referenceID);
            BindPreviousHistoryPurchaseZipcodes(referenceID);

        }
        function BindPreviousHistoryPurchaseCategory(referenceID) {
            $.ajax({
                type: "POST",
                url: "ws/BillingHistoryRef.asmx/GetBillingHistoryRefForCategory",
                data: "{'ReferenceID':" + referenceID + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("BillingCategoryhistory");
                        var cartd = [];
                        var Count = 0;
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tbody>");
                        cartd.push("<tr>");
                        cartd.push("<th>Category/SubCategory </th>");
                        cartd.push("<th>Cost </th>");
                        cartd.push("</tr>");
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td>" + ($(docs).find("categoryName").text() + "/" + $(docs).find("Name").text() + "  </td>"));
                            cartd.push("<td>$" + ($(docs).find("ChargeAmount").text() + " </td>"));
                            cartd.push("</tr>");
                            Count++;
                        });
                        cartd.push("</table>");
                        $("#divbillinghistPreviousCategory").html(cartd.join(''));
                        $("#lblPurchaseCategories2").text(Count);

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
        function BindPreviousHistoryPostedAdvertisements(referenceID) {
            $.ajax({
                type: "POST",
                url: "ws/BillingHistoryRef.asmx/GetBillingHistoryRefForPostedAdvertisements",
                data: "{'ReferenceID':" + referenceID + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("BillinghistoryPostedAdts");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tbody>");
                        cartd.push("<tr>");
                        cartd.push("<th>S.N</th>");
                        cartd.push("<th>Advertisement Title</th>");
                        cartd.push("<th>Category/SubCategory</th>");
                        cartd.push("<th>Cost</th>");
                        cartd.push("</tr>");
                        var Count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td>" + Count + " </td>");
                            cartd.push("<td>" + ($(docs).find("title").text()) + " </td>");
                            cartd.push("<td>" + ($(docs).find("categoryName").text() + "/" + $(docs).find("Name").text() + "  </td>"));
                            cartd.push("<td>$" + ($(docs).find("ChargeAmount").text()) + " </td>");
                            cartd.push("</tr>");
                            Count++;
                        });
                        cartd.push("</table>");
                        $("#divPostedAdvertisementhistory").html(cartd.join(''));
                        $("#lblPostedAdvertisement2").text(Count - 1);
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

        function BindPreviousHistoryPurchaseZipcodes(referenceID) {
            $.ajax({
                type: "POST",
                url: "ws/BillingHistoryRef.asmx/GetBillingHistoryRefForPurchaseZipcodes",
                data: "{'ReferenceID':" + referenceID + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("BillinghistoryPurchasedZipCodes");
                        var cartd = [];
                        var Count = 0;
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tbody>");
                        cartd.push("<tr>");
                        cartd.push("<th>ZipCode</th>");
                        cartd.push("<th>Category/SubCategory</th>");
                        cartd.push("<th>Cost</th>");
                        cartd.push("</tr>");
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td>" + ($(docs).find("ZipCode").text()) + " </td>");                            
                            cartd.push("<td>" + ($(docs).find("categoryName").text() + "/" + $(docs).find("Name").text() + "  </td>"));
                            cartd.push("<td>$" + ($(docs).find("ChargeAmount").text() + " </td>"));
                            cartd.push("</tr>");
                            Count++;
                        });
                        cartd.push("</table>");
                        $("#divPurchaseZipcodes2").html(cartd.join(''));
                        $("#lblPurchasedZipCode2").text(Count);
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
