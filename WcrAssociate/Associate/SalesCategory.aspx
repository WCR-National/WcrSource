<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="SalesCategory.aspx.cs" Inherits="WcrAssociate.Associate.SalesCategory" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%-- <script src="js/jQuery-2.1.4.min.js"></script>--%>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script>
        $(document).ready(function () {
            //$("#coponApply").hide();
            CouponCode.value = '1';
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/AssociateCardExists", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CheckAssoCard");
                        if ($(docs).find("id").text() >= 1)
                        {
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
                                // $("#divShow1").hide();
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
                                            cartd.push("<table class='table table-condensed'>");
                                            cartd.push("<tr><td colspan=4>Your Selected Categories</td><td style='visibility:hidden'></td></tr>");
                                            cartd.push("<tr>");
                                            cartd.push("<td style='color: white; background-color: skyblue' ><strong>S.N</strong></td>");
                                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                                            cartd.push("<td style='color: white; background-color: skyblue;visibility:hidden' class='uk-width-2-10 uk-text-center'> ZipCode </td>");
                                            cartd.push("<td style='color: white; background-color: skyblue; visibility:hidden' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                                            cartd.push("</tr>");
                                            var count = 1;
                                            var Totalamount = 0;
                                            $.each(docs, function (i, docs) {
                                                cartd.push("<tr>");
                                                cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                                                cartd.push("<td class='uk-text-center'> " + ($(docs).find("Name").text()) + " </td>");
                                                cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text() + "$ </td>"));
                                                cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text() + " </td>"));
                                                cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("CategoryID").text() + " </td>"));
                                                cartd.push("</tr>");
                                                var a = $(docs).find("Price").text();
                                                Totalamount = parseInt(Totalamount) + parseInt(a);
                                            });
                                            cartd.push("<tr>   <td style='float:right;'><b> Total Amount:-" + Totalamount + "</b></td><td  colspan='2' class='uk-text-center'></td></tr>");
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
                                    $.ajax({
                                        type: "POST", url: "ws/CouponCodeCategory.asmx/CheckCouponCode", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                                        success: function (r1) {
                                            if (r1.d.length > 0) {
                                                var xmlDoc1 = $.parseXML(r1.d);
                                                var xml1 = $(xmlDoc1);
                                                var docs1 = xml1.find("ViewCouponCodeCat");
                                                $.each(docs1, function (i, docs1) {
                                                    $("#coponApply").show();
                                                    $("label[for='lblcode']").text($(docs1).find("CouponCode").text());
                                                    $("label[for='lblprice']").text($(docs1).find("Discount").text());
                                                    $("label[for='lbldur']").text($(docs1).find("Duration").text());
                                                    $("#CouponCode").show();
                                                });
                                            }
                                        }
                                    });
                                });
                            });
                            $("#save").click(function () {
                                if (CouponCode.value == 1) {
                                    var a = 0;
                                    var b = 0;
                                    var c = 0;
                                    $.ajax({
                                        type: "POST", url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                                        success: function (r1) {
                                            if (r1.d.length > 0) {
                                                var xmlDoc1 = $.parseXML(r1.d);
                                                var xml1 = $(xmlDoc1);
                                                var docs1 = xml1.find("ViewAssociateBasicDetail");
                                                $.each(docs1, function (i, docs1) {
                                                    a = $(docs1).find("CouponCode").text();
                                                    b = $(docs1).find("Discount").text();
                                                    c = $(docs1).find("ForMonths").text();
                                                });
                                            }
                                        }
                                    });
                                    ApplycoponCode(a, b, c);
                                }
                                else if ($("label[for='lblcode']").text() == CouponCode.value) {
                                    ApplycoponCode($("label[for='lblcode']").text(), $("label[for='lblprice']").text(), $("label[for='lbldur']").text());
                                }
                                else if (confirm(" Coupon code does not match.Are you sure to submit without Coupon code?")) {
                                    ApplycoponCode(a, b, c);
                                }
                                else {
                                }
                            });
                        }
                        else {
                            window.location.href = 'UpdateCard.aspx';
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
            function ApplycoponCode(ccode, disc, duration) {
                if (MemberShip.value == 0) {
                    alert("Select Membership Plan");
                }
                else {
                    var teamlist = [];
                    var zipcodelist = [];
                    var PriceValues = [];
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
                                    PriceValues.push($(docs).find("Price").text());
                                });
                            }
                        }
                    });

                    $.ajax({
                        type: "POST",
                        url: "ws/CategoryPurchase.asmx/InsertCategory",
                        data: "{'SubcategoryID':'" + teamlist + "','PlanID':'" + MemberShip.value + "','pricevalues':'" + PriceValues + "','zipcodeID':'" + zipcodelist + "','Couponcode':'" + ccode + "','Discount':'" + disc + "','Duration':'" + duration + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (r) {
                            if (r.d == "1") {
                                //This Web Services is used to send amount to be transaction, right now it is comment because card data stuff is moved from db
                                ////var MonthValue = MemberShip.value;
                                ////var totalAmount = $("label[for='lblRowId']").text();
                                ////$.ajax({
                                ////    type: "POST",
                                ////    url: "ws/CategoryPurchase.asmx/InsertAmount",
                                ////    data: "{'amount':'" + MonthValue * totalAmount + "'}",
                                ////    contentType: "application/json; charset=utf-8",
                                ////    dataType: "json",
                                ////    async: false,
                                ////    cache: false,
                                ////    success: function (r) {
                                ////        if (r.d == "1") {
                                ////            $("#btncheckout").css({ "visibility": "visible" });
                                ////            $("#divSuccess").show();
                                ////            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                                ////        }
                                ////        if (r.d == "0") {
                                ////            alert("Already Exists");
                                ////        }
                                ////        if (r.d == "3") {
                                ////            alert("OOPS Error ! Please try again.");
                                ////        }
                                ////    },
                                ////    failure: function (response) {
                                ////        alert(response.d + "Fail");
                                ////    },
                                ////    error: function (response) {
                                ////        alert(response.d + "Error...");
                                ////    }
                                ////});
                                //end here

                                //$("#btncheckout").css({ "visibility": "visible" });
                                //$("#divSuccess").show();
                                //setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
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
            $("#coponApply").click(function () {
                var CouponCode1 = CouponCode.value;
                if ($("label[for='lblcode']").text() == CouponCode1) {
                    //alert("Correct code");
                    //alert($("label[for='lblcode']").text());
                    //alert($("label[for='lblprice']").text());
                    //alert($("label[for='lbldur']").text());
                }
                else {
                    alert("InCorrect code");
                    CouponCode.value = '';
                    //alert($("label[for='lblcode']").text('0'));
                    //alert($("label[for='lblprice']").text());
                    //alert($("label[for='lbldur']").text());
                    //alert("InCorrect code");
                }
            });
          });
        function PurchaseSalesCategory() {
            var CatNames = [];
            var teamlist = [];
            var checkboxValue = [];
            var priceCategory = [];
            var totalAmount = 0;
            $("#divShow input[id*='chk']:checked").each(function () {
                var aa = $(this).val();
                var bb = aa.split('(');
                //teamlist.push($(this).val());
                teamlist.push(bb[0]);
                checkboxValue.push($(this).attr('name'));
                CatNames.push(bb[1]);

            });
            if (teamlist == 0) {
                alert("Please Select at least one Category");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/InsertD",
                    data: "{'EmpId':'" + teamlist + "','TeamID':'1','catName':'" + checkboxValue + "','zipcode':'0','price':'" + checkboxValue + "','Name':'" + CatNames + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
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
                        cartd.push("<div class='box-body'>");
                        cartd.push("<table class='table table-condensed'>  <tbody><tr>");
                        cartd.push("<th style='width:100px'>Sr. N</th>");
                        cartd.push(" <th >Name</th>");
                        cartd.push("<th >Tick here to  purchase the categories</th>");
                        cartd.push(" <th>Status</th></tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr> <td>" + (count++) + "</td>");
                            cartd.push(" <td>" + ($(docs).find("CategoryName").text()) + " </td>");
                            // cartd.push("<td> <label class='checkbox-inline'><input type='checkbox' >($5) </label> </td>");
                            if ($(docs).find("CategoryStatus").text() == "1") {
                                // cartd.push("<td><label class='checkbox-inline'><input type='checkbox' disabled='disabled'  value='" + $(docs).find("CateID").text() + "'  name=" + $(docs).find("CategoryName").text() + "    class='checkbox' id='chk' />" + $(docs).find("price").text() + "</label><label style='visibility: visible' for='lblRowId1'>" + $(docs).find("price").text() + "</label></td>");
                                cartd.push("<td><label class='checkbox-inline'><input type='checkbox' disabled='disabled'  value='" + $(docs).find("CateID").text() + "'  name=" + $(docs).find("price").text() + "    class='checkbox' id='chk' />" + $(docs).find("price").text() + "</label></td>");
                                cartd.push("<td>Purchased</td>");
                            }
                            else {
                                cartd.push("<td ><label class='checkbox-inline'><input type='checkbox'  value='" + $(docs).find("CateID").text() + "(" + $(docs).find("CategoryName").text() + "'  name=" + $(docs).find("price").text() + "    class='checkbox' id='chk' />" + $(docs).find("price").text() + "</label></td>");
                                cartd.push("<td>Available</td>");

                            }
                        });
                        cartd.push("</tbody></table> </div>");
                        //cartd.push("</table>");
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
    <div class="content-wrapper">
        <section class="content">

            <div class="row">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                    <div class="box customebox">
                        <div class="box-header">
                            <h3 class="box-title">Purchase </h3>
                        </div>
                        <div class="row" id="divShow">
                        </div>
                        <div class="row" id="divShow1">
                        </div>
                        &nbsp;&nbsp;<input id="btncheckout" class="btn btn-primary" type="button" value="Save" />
                        <div id="Shop">
                            <table class="table table-condensed">
                                <tr>
                                    <td colspan="2">
                                        <div class="row" id="viewCart"></div>
                                        Membership Plan:-
                                            <select name="select" id="MemberShip"></select>
                                        <br />
                                        <label style="visibility: hidden" for="lblRowId"></label>
                                        <br />
                                        <label for="lblToalAmount"></label>
                                        <br />
                                        <input type="text" id="CouponCode" placeholder="Do you have Coupon Code" style="display: none; width: 200px;" />&nbsp;&nbsp;&nbsp;&nbsp;<%--<a id="coponApply" style="text-decoration: none;">Apply</a>--%><br />
                                        <label style="visibility: hidden;" for="lblcode"></label>
                                        <br />
                                        <label style="visibility: hidden" for="lblprice"></label>
                                        <br />
                                        <label style="visibility: hidden" for="lbldur"></label>
                                        <br />
                                        <input type="submit" class="btn btn-primary" id="save" value="Checkout" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div role="alert" id="divError" class="alert alert-danger">
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
                <!-- ./col -->
            </div>
            <div class="row">
                <div role="alert" id="divSuccess" class="alert alert-success">
                    <strong>Category Added to Cart Succesfully</strong>
                </div>
            </div>
        </section>
    </div>
</asp:Content>
