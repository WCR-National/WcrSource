<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ZipCodePurchaseOld.aspx.cs" Inherits="WcrAssociate.Associate.ZipCodePurchaseOld" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
      <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-2.1.1.min.js">
    </script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
     <!-- Small boxes (Stat box) -->
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 dashboard-block">
            <div class="">

                <h1>Purchase Zip Codes</h1>
                <h3 class="page-subtitle">Your Current Zipcode Purchase </h3>
                <div class="full-row sumary-detail-colume">
                    <div class="col-sm-6">

                        <ul>
                            <li class="discription-colume">Total count of items purchsed   </li>
                            <li class="detail-colume">11  </li>

                            <li class="discription-colume">Total ammount due at the start of next billing cycle  </li>
                            <li class="detail-colume">$ 6.00  </li>
                        </ul>
                    </div>
                    <div class="col-sm-6">
                        <ul>
                            <li class="discription-colume">Next billing cycle starts  </li>
                            <li class="detail-colume">11  </li>
                        </ul>
                    </div>
                </div>
                <div class="full-row custome-block ">
                    <div class="table-responsive grid-block content-left-extra-space ">
                        <div class="uk-overflow-container">
                            <div style="visibility: hidden" id="ViewAllPurchasedRcd">
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-subtitle">Make a purchase </h3>
                <!-- /.box-header -->
                <div class="box-body  form-horizontal content-left-extra-space" id="divlocation">
                    <div class="form-group">
                        <div class="col-sm-3">
                            <input type="text" id="txtCity" class="form-control" placeholder="City" />
                        </div>
                        <div class="col-sm-3">
                            <div class="input-group">
                                <select class="form-control" id="ddlState"></select>
                                <span class="input-group-addon no-bdr">OR </span>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <input type="text" id="txtZipcode" class="form-control" placeholder="Zipcode" />
                        </div>
                        <div class="col-sm-3">
                            <input id="btnSearch" type="button" class="btn btn-light btn-block" value="SEARCH" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9 ">
                            <div class="form-group" id="divZipcode" style="display: none;">
                                <div class="col-sm-8 ">
                                    <p class="form-control-static"><strong>Your Search Criteria returned the following Zip code (s) </strong></p>

                                </div>
                                <div class="col-sm-4 ">
                                    <select class="form-control" id="ddlZipcode"></select>
                                </div>
                            </div>
                            <div class="form-group" id="divCategory" style="display: none;">
                                <div class="col-sm-6">
                                    <label>Select a Category  </label>
                                    <select class="form-control" id="ddlCategory"></select>
                                </div>
                                <div class="col-sm-6">
                                    <label>Select a sub Category </label>
                                    <select class="form-control" id="ddlsubcategory"></select>
                                </div>
                            </div>
                            <div class="form-group" id="divzipcodeDetail" style="display: none;">
                                <div class="col-sm-12">
                                    <h3 class="page-subtitle">Your Selected Choices:  </h3>
                                    <table class="table table-condensed table-with-normaldata">
                                        <tr>
                                            <th>Zip </th>
                                            <th>Category </th>
                                            <th>Subcategory </th>
                                            <th>Cost </th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label id="lblzipcode"></label>
                                            </td>
                                            <td>
                                                <label id="lblcategory"></label>
                                            </td>
                                            <td>
                                                <label id="lblSubCategory"></label>
                                            </td>
                                            <td>$<label id="lblprice"></label>
                                            </td>
                                            <td class="text-right">
                                                <input id="btnPurchase" type="button" class="btn btn-light" value="PURCHASE" />
                                                <input id="btnPurchaseCancel" type="button" class="btn btn-light" value="CANCEL" />
                                            </td>
                                        </tr>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="visibility: hidden" id="ViewRcd">
                        </div>


                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="visibility: hidden" id="ViewPurchasedRcd">
                        </div>

                        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">

                            <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 ">
                                <input type="button" class="btn btn-primary" id="btnreset" value="Reset" style="visibility: hidden;" />
                                <input type="button" class="btn btn-primary" id="btnCancel" value="Cancel" style="visibility: hidden;" />

                            </div>
                            <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 ">
                                <input type="button" class="btn btn-primary" id="btncheckout" value="Submit" style="visibility: hidden;" />
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div id="Shop">
                                <table class="table table-condensed">
                                    <tr>
                                        <td colspan="2" style="visibility: visible"><%--Membership Plan:---%>


                                            <br />
                                            <label style="visibility: hidden" for="lblRowId"></label>
                                            <br />
                                            <label for="lblToalAmount"></label>
                                            <br />
                                            <input type="text" id="CouponCode" placeholder="Do you have Coupon Code" style="display: none; width: 200px;" />&nbsp;&nbsp;&nbsp;&nbsp;<%--<a id="coponApply" style="text-decoration: none;">Apply</a>--%><br />

                                            <label style="visibility: hidden;" for="lblcode"></label>
                                            <br />
                                            <label style="visibility: hidden" for="lblprice1"></label>
                                            <br />
                                            <label style="visibility: hidden" for="lbldur"></label>
                                            <br />

                                            <br />
                                            <label for="lblToalAmount1" style="visibility: hidden"></label>
                                            <br />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div role="alert" id="divSuccess" class="alert alert-success" style="visibility: hidden">
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        </div>

    </div>
    <!-- ./col -->

    <script>
        $(document).ready(function () {
            AssociatealreadyCategories();
            CouponCode.value = '1';
            BindState();
            $("#btnSearch").click(function () {
                if (txtZipcode.value == "") {
                    if (ddlState.value == 0) {
                        alert("State Can't be blank!");
                        return false;
                    }
                    else if (txtCity.value == "") {
                        alert("City Can not Blank");
                        return false;
                    }
                    else {
                        $("#divCategory").css("display", "none");
                        $("#divZipcode").css("display", "block");
                        BindStateWiseZipcode();
                    }
                }
                else {
                    $.ajax({
                        type: "POST", url: "ws/CategoryPurchase.asmx/ZipCodeExists", data: "{'Zipcode':'" + txtZipcode.value + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("ZipcodeExists");
                                if ($(docs).find("ID").text() >= 1) {
                                    $("#divZipcode").css("display", "none");
                                    $("#divCategory").css("display", "block");
                                    BindCategoryZip();
                                }
                                else {

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
            });
            $("#btnPurchase").click(function () {


                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/PurchasedItemsServices",
                    data: "{'CatID':'" + ddlCategory.value + "','catName':'" + $("#ddlCategory option:selected").text() + "','subCatName':'" + $("#ddlsubcategory option:selected").text() + "','subCatID':'" + ddlsubcategory.value + "','zipcode':'" + $("#lblzipcode").text() + "','price':'" + $("#lblprice").text() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            GetPurchasedAllRecords();
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


            });
            $("#btncheckout").click(function () {
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/AssociateCardExists",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("CheckAssoCard");
                            if ($(docs).find("id").text() >= 1) {
                                //if (CouponCode.value == 1) {
                                var a = 0;
                                var b = 0;
                                var c = 0;
                                //$.ajax({
                                //    type: "POST",
                                //    url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                                //    data: "{}",
                                //    contentType: "application/json; charset=utf-8",
                                //    dataType: "json",
                                //    async: false,
                                //    success: function (r1) {
                                //        if (r1.d.length > 0) {
                                //            var xmlDoc1 = $.parseXML(r1.d);
                                //            var xml1 = $(xmlDoc1);
                                //            var docs1 = xml1.find("ViewAssociateBasicDetail");
                                //            $.each(docs1, function (i, docs1) {
                                //                a = $(docs1).find("CouponCode").text();
                                //                b = $(docs1).find("Discount").text();
                                //                c = $(docs1).find("ForMonths").text();
                                //            });
                                //        }
                                //    }
                                //});
                                ApplycoponCode(a, b, c);
                                //}
                                //else if ($("label[for='lblcode']").text() == CouponCode.value) {
                                //    ApplycoponCode($("label[for='lblcode']").text(), $("label[for='lblprice']").text(), $("label[for='lbldur']").text());
                                //}
                                //else if (confirm("Coupon code does not match.Are you sure to submit without Coupon code?")) {
                                //    ApplycoponCode(a, b, c);
                                //}
                                //else {
                                //}
                            }

                            else {
                                if (confirm("Are you sure you want to add Credit Card?")) {
                                    var totalAmount = $("label[for='lblToalAmount1']").text();
                                    window.location.href = 'UpdateCard.aspx?amt=' + totalAmount;
                                }
                                else {
                                    return false;
                                }
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
            });
            $("#btnPurchaseCancel").click(function () {
                $("#divzipcodeDetail").css("display", "none")
            });

        });

        function AssociatealreadyCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{'JobType':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        chk = 1;
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'>");
                        // cartd.push("<tr><td colspan=7>Categories you have purchased</td><td style='visibility:hidden'></td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<th ><strong>S.N</strong></th>");
                        cartd.push("<th class='uk-width-2-10 uk-text-center'><strong>Zip Code</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong>Category</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong> Cost</strong> </th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center' style='margin-left:150px'><strong> Cancel </strong></th>");
                        cartd.push("<th class='uk-width-2-10 uk-text-center'>  </th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong></strong></th>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("categoryname").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("Name").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("amount").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center' style='margin-left:150px'><input style='background-color:skyblue; color:white;' type='button' onclick=PermananetlyRemoveCategory(" + ($(docs).find("id").text()) + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>   <td colspan='7' style='width:85%; margin-left:200px'><b> Total Amount:-" + Totalamount + "</b></td><td></td></tr>");
                        $("label[for='lblRowId']").text(Totalamount);
                        cartd.push("</table>");
                        $("#ViewAllPurchasedRcd").css("visibility", "visible");
                        $("#ViewAllPurchasedRcd").html(cartd.join(''));
                        //$("label[for='lblprice']").text(Totalamount);
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
        function PermananetlyRemoveCategory(rrr) {
            if (confirm("Are you sure? you want to Permanent Delete Record.")) {
                $.ajax({
                    type: "POST",
                    url: "ws/MyCategories.asmx/DeletePurchasedCategories",
                    data: "{'id':" + rrr + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        alert("Deleted Succesfully.");
                        AssociatealreadyCategories();
                    }
                });
            }
        }
        function ApplycoponCode(ccode, disc, duration) {
            var teamlist = [];
            var zipcodelist = [];
            var PriceValues = [];
            var CatIdValue = [];
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartDataServices", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Table1");
                        $.each(docs, function (i, docs) {
                            teamlist.push($(docs).find("subCategoryID").text());
                            zipcodelist.push($(docs).find("Zipcode").text());
                            PriceValues.push($(docs).find("Price").text());
                            CatIdValue.push($(docs).find("CategoryID").text());
                        });
                    }
                }
            });
            var msg = [];
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/InsertCategory",
                data: "{'categoryID':'" + CatIdValue + "','SubcategoryID':'" + teamlist + "','PlanID':'1','pricevalues':'" + PriceValues + "','zipcodeID':'" + zipcodelist + "','Couponcode':'" + ccode + "','Discount':'" + disc + "','Duration':'" + duration + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (r) {
                    if (r.d == "1") {
                        //This Web Services is used to send amount to be transaction, right now it is not in use because card data stuff is moved from db
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

                        $("#btncheckout").css({ "visibility": "visible" });
                        msg.push("<strong></strong>Categories Purchased Succesfully!");
                        $('#divSuccess').css("visibility", "visible");
                        $("#divSuccess").html(msg.join(''));
                        $("#divSuccess").show();
                        setTimeout(function () {
                            $('#divSuccess').fadeOut('fast');
                        }, 2000);

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


        function BindCategoryZip() {
            var zpcode = txtZipcode.value;
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AvailableCategoryzipCode", data: "{'jobtype':'2','zip':'" + zpcode + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select Category</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("categoryname").text() + "</option>");
                        });
                        $("#ddlCategory").html(cartd.join(''));
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
        function BindState() {
            $.ajax({
                type: "POST", url: "ws/State.asmx/CountryWiseState", data: "{'Status':'1','CountryID':'US'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("States1");
                        var cartd = [];
                        cartd.push("<option value=0>Select State</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("stateid").text() + "'>" + $(docs).find("stateid").text() + "</option>");
                        });
                        $("#ddlState").html(cartd.join(''));
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
        function BindStateWiseZipcode() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#ddlState option:selected").text() + "', 'CityID':'" + txtCity.value + "'}",
                contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CityWiseZip");
                        var cartd = [];
                        cartd.push("<option value=0>Select ZipCode</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("zipcode").text() + "'>" + $(docs).find("zipcode").text() + "</option>");
                        });
                        $("#ddlZipcode").html(cartd.join(''));
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
        function BindSubCategoryZip() {
            var zpcode = txtZipcode.value;
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AvailableSubCategoryzipCode", data: "{'jobtype':'2','zip':'" + zpcode + "','categoryID':'" + ddlCategory.value + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailSubCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select Sub Category</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("name").text() + "</option>");
                        });
                        $("#ddlsubcategory").html(cartd.join(''));
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
        $(function () {
            $("#ddlCategory").change(function () {
                $("#divzipcodeDetail").css("display", "none");
                BindSubCategoryZip();
            });
            $("#ddlsubcategory").change(function () {
                $("#divzipcodeDetail").css("display", "block");
                $("#lblzipcode").text(txtZipcode.value);
                $("#lblcategory").text($("#ddlCategory option:selected").text());
                $("#lblSubCategory").text($("#ddlsubcategory option:selected").text());
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/GetSubCategoryPrice", data: "{'zipCode':'" + txtZipcode.value + "','subCategoryID':'" + ddlsubcategory.value + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("GetPrice");
                            $.each(docs, function (i, docs) {
                                $("#lblprice").text($(docs).find("price").text());
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

            });

            $("#ddlZipcode").change(function () {
                txtZipcode.value = ddlZipcode.value;
                //$("#divZipcode").css("display", "none");
                $("#divCategory").css("display", "block");
                BindCategoryZip();
            });
        });

        function GetPurchasedAllRecords() {
            $("#ViewPurchasedRcd").css("visibility", "visible");
            $("#divzipcodeDetail").css("display", "none");
            $("#btncheckout").css("visibility", "visible");
            $("#btnreset").css("visibility", "visible");
            $("#btnCancel").css("visibility", "visible");
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartDataServices", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Table1");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed' style='width:85%'>");
                        cartd.push("<tr><td colspan=7>Categories you currently have purchased</td><td style='visibility:hidden'></td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' ><strong>S.N</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Zip Code</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue;visibility:visible' class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                        cartd.push("<td style='color: white; background-color: skyblue; visibility:visible' class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center' style='margin-left:150px'> Action </td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("SubCategoryName").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' style='margin-left:150px'><input style='background-color:skyblue; color:white;' type='button' onclick=RemoveRcd1(" + cc + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("Price").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>   <td colspan='7' style='width:85%; margin-left:200px'><b> Total Amount:-" + Totalamount + "</b></td><td></td></tr>");
                        $("label[for='lblRowId']").text(Totalamount);
                        cartd.push("</table>");
                        $("#ViewPurchasedRcd").html(cartd.join(''));

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
    </form>
</body>
</html>
