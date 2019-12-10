<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="PurchaseSalesCategory.aspx.cs" Inherits="WcrAssociate.Associate.PurchaseSalesCategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style type="text/css">
        #topRight {
            margin-left: 250px;
            right: 10px;
            border: solid 1px #e1e1e1;
            vertical-align: middle;
            background: #ffdab9;
            text-align: center;
            height: 30px;
            width: 150px;
        }
    </style>     
    <script>       
        $(document).ready(function () {
            
            $("#maindiv").hide();
            $("#divShow").show();
            $("#divError").hide();
            $("#divSuccess").hide();
            $("#Shop").hide();
            $("#btncheckout").hide();
            // BindSalesCategory();
            BindSalesCategory();
            $("#btncheckout").click(function () {
                PurchaseSalesCategory();
                $("#Shop").show();
                $("#divShow").hide();
                $("#divShow1").hide();
                $("#divError").hide();
                $("#divSuccess").hide();
                $("#btncheckout").hide();
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/SelectCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("Table1");
                            var cartd = [];
                            cartd.push("<table width='210' border='1' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                            cartd.push("<tr><td colspan=4>Your Selected Categories</td><td style='visibility:hidden'></td></tr>");
                            cartd.push("<tr>");
                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Sr.No.</strong></td>");
                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                            cartd.push("<td style='color: white; background-color: skyblue;visibility:hidden' class='uk-width-2-10 uk-text-center'> ZipCode </td>");
                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                            cartd.push("<td style='color: white; background-color: skyblue; visibility:hidden' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                            cartd.push("</tr>");
                            var count = 1;
                            var Totalamount = 0;
                            $.each(docs, function (i, docs) {
                                cartd.push("<tr>");
                                cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                                cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text() + " </td>"));
                                cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text() + " </td>"));
                                cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text() + "$ </td>"));
                                cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("CategoryID").text() + " </td>"));
                                cartd.push("</tr>");
                                var a = $(docs).find("Price").text();
                                Totalamount = parseInt(Totalamount) + parseInt(a);
                            });
                            cartd.push("<tr> <td colspan='3' class='uk-text-center'></td>   <td style='float:right;'><b> Total Amount:-" + Totalamount + "</b></td><td  class='uk-text-center'></td></tr>");
                            $("label[for='lblRowId']").text(Totalamount);

                            cartd.push("</table>");
                            $("#viewCart").html(cartd.join(''));
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
                BindMembership();
            });

            $(function () {
                $("#MemberShip").change(function () {
                    var MonthValue = MemberShip.value;
                    var totalAmount = $("label[for='lblRowId']").text();
                    $("label[for='lblToalAmount']").text("Total Amount:-" + MonthValue * totalAmount + "$");
                });
            });
            $("#save").click(function () {
                if (MemberShip.value == 0) {
                    alert("Select Membership Plan");
                }
                else {
                    var teamlist = [];
                    var zipcodelist = [];
                    $.ajax({
                        type: "POST", url: "ws/CategoryPurchase.asmx/SelectCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("Table1");
                                $.each(docs, function (i, docs) {
                                    teamlist.push($(docs).find("CategoryID").text());
                                    zipcodelist.push($(docs).find("Zipcode").text());
                                });
                            }
                        }
                    });
                    $.ajax({
                        type: "POST",
                        url: "ws/CategoryPurchase.asmx/InsertCategory",
                        data: "{'SubcategoryID':'" + teamlist + "','PlanID':'" + MemberShip.value + "','zipcodeID':'" + zipcodelist + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (r) {
                            if (r.d == "1") {
                                
                                $("#btncheckout").css({ "visibility": "visible" });
                                $("#divSuccess").show();
                                setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                            }
                            if (r.d == "0") {
                                alert("Already Exists");
                            }
                            if (r.d == "3") {
                                alert("OOPS Error ! Please try again.");
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
            });

        });

        function PurchaseSalesCategory() {
            var teamlist = [];
            var checkboxValue = [];
            var totalAmount = 0;
            $("#divShow input[id*='chk']:checked").each(function () {
                teamlist.push($(this).val());
                checkboxValue.push($(this).attr('name'));
            });
            if (teamlist == 0) {
                alert("Please Select at least one Category");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/InsertD",
                    data: "{'EmpId':'" + teamlist + "','TeamID':'1','catName':'" + checkboxValue + "','zipcode':'0'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            0
                            $("label[for='lblselected']").text(($("label[for='lblselected']").text()) + "," + teamlist);
                            $("#btncheckout").css({ "visibility": "visible" });
                            $("#divSuccess").show();
                            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                        }
                        if (r.d == "0") {
                            alert("Already Exists");
                        }
                        if (r.d == "3") {
                            alert("OOPS Error ! Please try again.");
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
        }
        function BindSalesCategory() {
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AvailableSalesCategory", data: "{'jobtype':'1','zip':'0'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailSalesCategories");
                        var cartd = [];
                        cartd.push("<table width='310' border='1' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                        cartd.push("<tr><td colspan=4><b>SALES</b></td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Sr.No.</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Name</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Tick here to Purchase the Categories </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Status</strong></td>");
                        cartd.push("</tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("CategoryName").text() + " </td>"));
                            if ($(docs).find("CategoryStatus").text() == "1") {
                                cartd.push("<td class='uk-text-center'><input type='checkbox' disabled='disabled'  value='" + $(docs).find("CateID").text() + "'  name=" + $(docs).find("CategoryName").text() + "    class='checkbox' id='chk' />($5)</td>");
                                cartd.push("<td class='uk-text-center'>Purchased</td>");
                            }
                            else {
                                cartd.push("<td class='uk-text-center'><input type='checkbox'  value='" + $(docs).find("CateID").text() + "'  name=" + $(docs).find("CategoryName").text() + "    class='checkbox' id='chk' />($5)</td>");
                                cartd.push("<td class='uk-text-center'>Available</td>");
                            }
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divShow").html(cartd.join(''));
                        $("#btncheckout").show();
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
        function BindMembership() {
            $.ajax({
                type: "POST", url: "ws/MemberShip.asmx/SelectMemberShip", data: "{'flag':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("MemberShipPlan");
                        var cartd = [];
                        cartd.push("<option value=0>Select</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("mDuration").text() + "'>" + $(docs).find("PlanName").text() + "</option>");
                        });
                        $("#MemberShip").html(cartd.join(''));
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
    <div class="md-card uk-margin-medium-bottom">
        <div class="md-card-content">
            <%--<div id="maindiv">
                Enter Zipcode:-<input type="text" id="txtZipcode" />&nbsp;&nbsp;<input type="submit" value="Search Category" id="btnSearch" /><br />
            </div>--%>
            <div class="uk-overflow-container" id="divShow">
            </div>
            <div class="uk-overflow-container" id="divShow1">
            </div>
            &nbsp;&nbsp;<input id="btncheckout" type="button" value="Save" />
            <div id="Shop">
                <table style="width: 100%">
                    <tr>
                        <td colspan="2">
                            <div id="viewCart"></div>
                            Membership Plan:-
                                            <select name="select" id="MemberShip"></select>
                            <br />
                            <label style="visibility: hidden" for="lblRowId"></label>
                            <br />
                            <label for="lblToalAmount"></label>
                            <br />
                          
                            <input type="submit" id="save" value="Checkout" />
       
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="alert" id="divSuccess" class="alert alert-success">
            <strong>Category Added to Cart Succesfully</strong>
        </div>
        <div role="alert" id="divError" class="alert alert-danger">
            <strong>Oh snap!</strong> Change a few things up and try submitting again.
        </div>
    </div>
</asp:Content>
