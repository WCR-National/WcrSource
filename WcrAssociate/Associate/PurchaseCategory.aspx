<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="PurchaseCategory.aspx.cs" Inherits="WcrAssociate.Associate.PurchaseCategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
            <!-- Small boxes (Stat box) -->
            <div id="divEntry">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">Category Purchases</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  form-horizontal">
                                <div class="form-group">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <select class="form-control" id="Category"></select>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <select class="form-control" id="SubCategory"></select>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="ViewRcd">
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="visibility: hidden" id="ViewAllPurchasedRcd">
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="ViewPurchasedRcd">
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
                                <div role="alert" id="divSuccess" style="visibility: hidden" class="alert alert-success">
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div id="Shop">
                                            <table class="table table-condensed">
                                                <tr>
                                                    <td colspan="2" style="visibility: visible"><%--Membership Plan:---%>
                                                        <select name="select" id="MemberShip" style="visibility: hidden"></select>

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

                                                        <br />
                                                        <label for="lblToalAmount1" style="visibility: hidden"></label>
                                                        <br />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- /.box-body -->
                    </div>
                </div>
            </div>
            <!-- ./col -->
       <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            AssociatealreadyCategories();
            CouponCode.value = '1';
            $("#divSuccess").hide();
            $("#Shop").hide();
            BindCategory();
            function BindCategory() {
                $.ajax({
                    type: "POST",
                    url: "ws/Category.asmx/JobtypeWiseCategory",
                    data: "{'flag':'1','jobtype':'1'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("JobCategories");
                            var cartd = [];
                            cartd.push("<option value=0>Select Category</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("ID").text() + "'>" + $(docs).find("categoryName").text() + "</option>");
                            });
                            $("#Category").html(cartd.join(''));
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
            $("#coponApply").click(function () {
                var CouponCode1 = CouponCode.value;
                if ($("label[for='lblcode']").text() == CouponCode1) {
                }
                else {
                    alert("InCorrect code");
                    CouponCode.value = '';
                }
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
                                if (CouponCode.value == 1) {
                                    var a = 0;
                                    var b = 0;
                                    var c = 0;
                                    $.ajax({
                                        type: "POST",
                                        url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                                        data: "{}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        async: false,
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
                                else if (confirm("Coupon code does not match.Are you sure to submit without Coupon code?")) {
                                    ApplycoponCode(a, b, c);
                                }
                                else {
                                }
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
        });

        var chk = 0;
        function AssociatealreadyCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{'JobType':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        chk = 1;
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PurCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed' style='width:85%'>");
                        cartd.push("<tr><td colspan=7>Categories you have purchased</td><td style='visibility:hidden'></td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' ><strong>S.N</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center' style='margin-left:150px'> Action </td>");
                        cartd.push("<td style='color: white; background-color: skyblue;visibility:hidden' class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td style='color: white; background-color: skyblue; visibility:hidden' class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + count + "</td>");
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
        function AssociateCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        alert(chk);
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("MyCategories");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed' style='width:85%'>");
                        if (chk == 1) {
                        }
                        else {
                            cartd.push("<tr><td colspan=7>Categories you currently have purchased</td><td style='visibility:hidden'></td></tr>");
                            cartd.push("<tr>");
                        }
                        cartd.push("<td style='color: white; background-color: skyblue' ><strong>S.N</strong></td>");
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
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("Name").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("amount").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' style='margin-left:150px'><input style='background-color:skyblue; color:white;' type='button' onclick=RemoveRcd1(" + cc + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>   <td colspan='7' style='width:85%; margin-left:200px'><b> Total Amount:-" + Totalamount + "</b></td><td></td></tr>");
                        $("label[for='lblRowId']").text(Totalamount);
                        cartd.push("</table>");
                        $("#ViewPurchasedRcd").html(cartd.join(''));
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
        function ApplycoponCode(ccode, disc, duration) {
            if (MemberShip.value == 0) {
                alert("Select Membership Plan");
            }
            else {
                var teamlist = [];
                var zipcodelist = [];
                var PriceValues = [];
                var CatIdValue = [];
                $.ajax({
                    //type: "POST", url: "ws/CategoryPurchase.asmx/SelectCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
                    data: "{'categoryID':'" + CatIdValue + "','SubcategoryID':'" + teamlist + "','PlanID':'" + MemberShip.value + "','pricevalues':'" + PriceValues + "','zipcodeID':'" + zipcodelist + "','Couponcode':'" + ccode + "','Discount':'" + disc + "','Duration':'" + duration + "'}",
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
                            //$("#divSuccess").show();
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

        }
        function BindSubCategory() {
            var CategoryId = Category.value;
            $.ajax({
                type: "POST", url: "ws/subCategory.asmx/AssociateSubCategory", data: "{'Categoryid':'" + CategoryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("associateCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select SubCategory</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("name").text() + "</option>");
                        });
                        $("#SubCategory").html(cartd.join(''));
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
            $("#Category").change(function () {
                BindSubCategory();
            });
        });
        $(function () {
            $("#SubCategory").change(function () {
                PurchaseSalesCategory();
                $("#ViewAllPurchasedRcd").css("visibility", "visible");
                $("#SubCategory option:selected").remove();
                $("#Shop").show();
                BindMembership();
                $('#MemberShip').val('1');
            });
            function BindRecords() {
                var SubCategoryID = SubCategory.value;
                $.ajax({
                    type: "POST", url: "ws/SubCategory.asmx/SubCategoryWisePrice", data: "{'id':'" + SubCategoryID + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("SubCategoryPrice");
                            var cartd = [];
                            cartd.push("<table width='100%' border='0' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                            cartd.push("<tr><td>Category</td><td>SubCategory</td><td>Price</td><td>Action</td></tr>");
                            var count = 1;
                            cartd.push("<tr>");
                            $.each(docs, function (i, docs) {
                                flg = 1;
                                cartd.push(" <td>" + $("#Category option:selected").text() + "</td><td>" + $("#SubCategory option:selected").text() + "</td><td>" + $(docs).find("price").text() + "</td> <td><input type='checkbox' value='" + $(docs).find("ID").text() + "'  class='checkbox' id='chk' /> </td>");
                            });
                            cartd.push("</tr>");
                            cartd.push("</table>");
                            $("#ViewRcd").html(cartd.join(''));
                        }
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });

                //$("#btncheckout").hide();
            }
        });
        $(function () {
            $("#MemberShip").change(function () {
                $("#btncheckout").show();
                var MonthValue = MemberShip.value;
                var totalAmount = $("label[for='lblRowId']").text();
                $("label[for='lblToalAmount']").text("Total Amount:-" + MonthValue * totalAmount + "$");
                $("label[for='lblToalAmount1']").text(MonthValue * totalAmount);
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
        function GetAllRecords() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/SelectCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Table1");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed' style='width:70%'>");
                        cartd.push("<tr><td colspan=7>Selected Choices</td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue'><strong>S.N</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue'; style='visibility:hidden' class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                        cartd.push("<td style='color: white; background-color: skyblue'; style='visibility:hidden' class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue;' style='margin-left:150px'> Action </td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("SubCategoryName").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-width-2-10;' style='margin-left:150px'><input style='background-color:skyblue; color:white;' type='button' onclick=PurchaseRcd('" + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subCategoryID").text()) + "," + ($(docs).find("CategoryName").text()) + "," + ($(docs).find("SubCategoryName").text()) + "," + ($(docs).find("Price").text()) + "," + ($(docs).find("Zipcode").text()) + "')  id='btnPurchase' value='Purchase'/> &nbsp;&nbsp;<input style='background-color:skyblue; color:white;' type='button' onclick=RemoveRcd('" + cc + "," + ($(docs).find("subCategoryID").text()) + "," + ($(docs).find("SubCategoryName").text()) + "')  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            //var a = $(docs).find("Price").text();
                            //Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        //cartd.push("<tr>   <td colspan='7' style='width:85%; margin-left:200px'><b> Total Amount:-" + Totalamount + "</b></td><td></td></tr>");
                        //$("label[for='lblRowId']").text(Totalamount);
                        cartd.push("</table>");
                        $("#ViewRcd").html(cartd.join(''));
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
        function GetPurchasedAllRecords() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
        function PurchaseSalesCategory() {
            var SubCategoryID = SubCategory.value;
            $.ajax({
                type: "POST",
                url: "ws/SubCategory.asmx/SubCategoryWisePrice",
                data: "{'id':'" + SubCategoryID + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r1) {
                    if (r1.d.length > 0) {
                        var xmlDoc1 = $.parseXML(r1.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("SubCategoryPrice");
                        $.each(docs1, function (i, docs1) {
                            $.ajax({
                                type: "POST",
                                url: "ws/CategoryPurchase.asmx/InsertDNew",
                                data: "{'CatID':'" + Category.value + "','catName':'" + $("#Category option:selected").text() + "','subCatName':'" + $("#SubCategory option:selected").text() + "','zipcode':'0','subCatID':'" + SubCategory.value + "','price':'" + $(docs1).find("price").text() + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                async: false,
                                cache: false,
                                success: function (r) {
                                    if (r.d == "1") {
                                        GetAllRecords();
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
        function PurchaseRcd(dynar) {
            $(this).prop('disabled', false);
            var catID = 0, subCatID = 0, catName = 0, subCatName = 0, price = 0, zipCode = 0;
            var array = dynar.split(",");
            for (var i in array) {

                if (i == 0) {
                    if (array[i] == '') {
                    }
                    else {
                        catID = array[i];
                    }
                }
                else if (i == 1) {
                    if (array[i] == '') {
                    }
                    else {
                        subCatID = array[i];
                    }
                }
                else if (i == 2) {
                    if (array[i] == '') {
                    }
                    else {
                        catName = array[i];
                    }
                }
                else if (i == 3) {
                    if (array[i] == '') {
                    }
                    else {
                        subCatName = array[i];
                    }
                }
                else if (i == 4) {
                    if (array[i] == '') {
                    }
                    else {
                        price = array[i];
                    }
                }
                else if (i == 5) {
                    if (array[i] == '') {
                    }
                    else {
                        zipCode = array[i];
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/PurchasedItems",
                data: "{'CatID':'" + catID + "','catName':'" + catName + "','subCatName':'" + subCatName + "','subCatID':'" + subCatID + "','zipcode':'" + zipCode + "','price':'" + price + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    $("#btncheckout").css("visibility", "visible");
                    $("#btnreset").css("visibility", "visible");
                    $("#btnCancel").css("visibility", "visible");
                    GetPurchasedAllRecords();
                }
            });

        }
        function RemoveRcd(rrr) {
            var array = rrr.split(",");
            var id, subid, subName;
            for (var i in array) {
                if (i == 0) {
                    if (array[i] == '') {
                    }
                    else {
                        id = array[i];
                    }
                }
                else if (i == 1) {
                    if (array[i] == '') {

                    }
                    else {
                        subid = array[i];
                    }
                }
                else if (i == 2) {
                    if (array[i] == '') {

                    }
                    else {
                        subName = array[i];
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/RemoveItem",
                data: "{'subCatID':" + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    GetAllRecords();
                }
            });

            $('#SubCategory').append($('<option>', {
                value: subid,
                text: subName
            }));


        }
        function RemoveRcd1(rrr) {
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/RemoveItem1",
                data: "{'subCatID':" + rrr + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    GetPurchasedAllRecords();
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
   
</asp:Content>
