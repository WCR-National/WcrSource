<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="ServiceCategory.aspx.cs" Inherits="WcrAssociate.Associate.ServiceCategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script src="js/jquery-2.1.1.min.js"></script>
    <script>
        $(document).ready(function () {
            //$("#coponApply").hide();
            txtZipcode.focus();
            $("#maindiv").show();
            $("#divShow").hide();
            $("#divShow1").hide();
            $("#divError").hide();
            $("#divSuccess").hide();
            $("#Shop").hide();
            $("#btncheckout").hide();
            $("#btnSearch").click(function () {
                $("#maindiv").show();
                $("#divShow").hide();
                $("#divShow1").hide();
                $("#divError").hide();
                $("#divSuccess").hide();
                $("#Shop").hide();
                $("#btncheckout").hide();
                var check = Valid();
                if (check == "1") {
                    $.ajax({
                        type: "POST", url: "ws/CategoryPurchase.asmx/ZipCodeExists", data: "{'Zipcode':'" + txtZipcode.value + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("ZipcodeExists");
                                if ($(docs).find("ID").text() >= 1) {
                                    $("#divShow").show();
                                    $("#divShow1").show();
                                    $("#divError").hide();
                                    $("#divSuccess").hide();
                                    $("#Shop").hide();
                                    $("#btncheckout").show();
                                    BindServiceCategory();
                                    BindMembership();
                                }
                                else {
                                    $("#maindiv").show();
                                    $("#divShow").hide();
                                    $("#divShow1").hide();
                                    $("#divError").hide();
                                    $("#divSuccess").hide();
                                    $("#Shop").hide();
                                    $("#btncheckout").hide();
                                    alert("This Zipcode is not available into the database");
                                    txtZipcode.focus();
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
                else {
                    $("#maindiv").show();
                    $("#divShow").hide();
                    $("#divShow1").hide();
                    $("#divError").hide();
                    $("#divSuccess").hide();
                    $("#Shop").hide();
                    $("#btncheckout").hide();
                    alert(check);
                }
            });
            $("#btncheckout").click(function () {
                var check = Valid();
                if (check == "1") {
                    PurchaseServicesCategory();
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
                                cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> ZipCode </td>");
                                cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                                cartd.push("<td style='color: white; background-color: skyblue; visibility:hidden' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                                cartd.push("</tr>");
                                var count = 1;
                                var Totalamount = 0;
                                $.each(docs, function (i, docs) {
                                    cartd.push("<tr>");
                                    cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                                    cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text() + " </td>"));
                                    cartd.push("<td class='uk-text-center'> " + ($(docs).find("Zipcode").text() + " </td>"));
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
                }
                else {
                    alert(check);
                }
            });
            $(function () {
                $("#MemberShip").change(function () {
                    alert("kj");
                    debugger;
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

                                    debugger;
                                    //$("#coponApply").show();
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
                //oldNotinuse(); This function is developed before coupon code implementation
                if ($("label[for='lblcode']").text() == CouponCode.value) {
                    ApplycoponCode($("label[for='lblcode']").text(), $("label[for='lblprice']").text(), $("label[for='lbldur']").text());
                }
                else if (confirm(" Coupon code does not match.Are you sure to submit without Coupon code?")) {
                    ApplycoponCode(0, 0, 0);
                }
                else { }
            });

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
                            //write a webservice which will send amount
                            var MonthValue = MemberShip.value;
                            var totalAmount = $("label[for='lblRowId']").text();
                            $.ajax({
                                type: "POST",
                                url: "ws/CategoryPurchase.asmx/InsertAmount",
                                data: "{'amount':'" + MonthValue * totalAmount + "'}",
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
        function oldNotinuse() {
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
        }
        function Valid() {
            var returnValue;
            if (txtZipcode.value == "") {
                returnValue = "Zipcode required";
                $("#txtZipcode").focus();
            }
            else {
                returnValue = "1";
            }
            return returnValue;
        }
        function PurchaseServicesCategory() {
            var teamlist = [];
            var checkboxValue = [];
            var totalAmount = 0;
            $("#divShow1 input[id*='chk']:checked").each(function () {
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
                    data: "{'EmpId':'" + teamlist + "','TeamID':'2','catName':'" + checkboxValue + "','zipcode':'" + txtZipcode.value + "'}",
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
        function BindServiceCategory() {
            var zpcode = txtZipcode.value;
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AvailableCategory", data: "{'jobtype':'2','zip':'" + zpcode + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailCategories");
                        var cartd = [];
                        cartd.push("<table width='310' border='1' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                        cartd.push("<tr><td colspan=4><b>SERVICE</b></td></tr>");
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
                                cartd.push("<td class='uk-text-center'>Sold Out</td>");
                            }
                            else {
                                cartd.push("<td class='uk-text-center'><input type='checkbox'  value='" + $(docs).find("CateID").text() + "'  name=" + $(docs).find("CategoryName").text() + "    class='checkbox' id='chk' />($5)</td>");
                                cartd.push("<td class='uk-text-center'>Available</td>");
                            }
                            cartd.push("</tr>");

                        });
                        cartd.push("</table>");
                        $("#divShow1").html(cartd.join(''));
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
                            <h3 class="box-title">Zip Code</h3>
                        </div>
                        <div class="box-body  form-horizontal">
                            <div class="form-group">
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                    <label class="col-lg-3 col-md-3 col-sm-3 col-xs-12 control-label">
                                        Enter Zip Code
                                    </label>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input id="txtZipcode" class="form-control" type="text" />
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                                        <%--    <input class="btn btn-primary" type="submit" value="Search Categories" id="btnSearch" />--%>
                                        <input type="submit" value="Search Categories" id="btnSearch" />
                                    </div>
                                </div>
                            </div>
                            <div class="box-header">
                                <h3 class="box-title">Service </h3>
                            </div>
                            <div>
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
                                                <input type="text" id="CouponCode" placeholder="Do you have Coupon Code" style="display: none; width: 200px;" />&nbsp;&nbsp;&nbsp;&nbsp;<%--<a id="coponApply" style="text-decoration: none;">Apply</a>--%><br />
                                                <label style="visibility: hidden;" for="lblcode"></label>
                                                <br />
                                                <label style="visibility: hidden" for="lblprice"></label>
                                                <br />
                                                <label style="visibility: hidden" for="lbldur"></label>
                                                <br />
                                                <input type="submit" id="save" value="Checkout" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
                <!-- ./col -->
            </div>
            <div class="row">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                    <div class="box customebox">

                        <div role="alert" id="divSuccess" class="alert alert-success">
                            <strong>Category Added to Cart Succesfully</strong>
                        </div>
                        <div role="alert" id="divError" class="alert alert-danger">
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</asp:Content>
