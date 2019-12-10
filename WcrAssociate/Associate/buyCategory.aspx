<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="buyCategory.aspx.cs" Inherits="WcrWebApplication.Associate.buyCategory" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style type="text/css">
        /*.visibleDiv, #topRight {
            position: fixed;
            width: 150px;
            border: solid 1px #e1e1e1;
            vertical-align: middle;
            background: #ffdab9;
            text-align: center;
        }*/
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
        $().ready(function () {
            var $scrollingDiv = $("#topRight");
            $(window).scroll(function () {
                $scrollingDiv
               .stop()
               .animate({ "marginTop": ($(window).scrollTop()) }, "slow");
            });
        });
    </script>
    <script>
        $(document).ready(function () {
            $("#btnSubmit").hide();
            $("#btnUpdate").hide();
            $("#divShow").show();
            $("#divSuccess").hide();
            $("#divError").hide();
            $("#Shop").hide();
            BindJobtype();
            BindMembership();
        });
        function BindJobtype() {
            $.ajax({
                type: "POST", url: "ws/JobType.asmx/SelectJtype", data: "{'flag':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobType");
                        var cartd = [];
                        cartd.push("<option value=0>Select</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("JobName").text() + "</option>");
                        });
                        $("#JobType").html(cartd.join(''));
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
        function BindCategory() {
            var jobtype = JobType.value;
            $.ajax({
                type: "POST", url: "ws/Category.asmx/JobtypeWiseCategory", data: "{'flag':'1','jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("JobCategories");
                        var cartd = [];
                        cartd.push("<table width='310' border='1' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                        cartd.push("<tr><td colspan=4>Sales Categories</td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Sr.No.</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Name</strong></td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Tick here to Purchase the Categories </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Status</strong></td>");
                        cartd.push("</tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            var d = ($("label[for='lblselected']").text());
                            var flag = 0;
                            var arrayele = d.split(",");
                            for (i = 0; i < arrayele.length; i++) {
                                if (arrayele[i] == $(docs).find("ID").text()) {
                                    flag = 1;
                                    break;
                                }
                                else { }
                            }
                            if (flag == 1) {
                                cartd.push("<tr>");
                                cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                                cartd.push("<td class='uk-text-center'>" + ($(docs).find("categoryName").text() + " </td>"));
                                cartd.push("<td class='uk-text-center'><input type='checkbox' value='" + $(docs).find("ID").text() + "'  name=" + $(docs).find("categoryName").text() + "    class='checkbox' id='chk' checked />($5)</td>");//.prop("disabled", true)
                                cartd.push("<td class='uk-text-center'></td>");
                                cartd.push("</tr>");
                            }
                            else {
                                cartd.push("<tr>");
                                cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                                cartd.push("<td class='uk-text-center'>" + ($(docs).find("categoryName").text() + " </td>"));
                                cartd.push("<td class='uk-text-center'><input type='checkbox' value='" + $(docs).find("ID").text() + "'  name=" + $(docs).find("categoryName").text() + "    class='checkbox' id='chk' />($5)</td>");
                                cartd.push("<td class='uk-text-center'></td>");
                                cartd.push("</tr>");
                            }
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

        $(function () {
            $("#JobType").change(function () {
                $("#btnSubmit").show();
                BindCategory();
            });
        });
    </script>

    <script>
        $(document).ready(function () {
            $("label[for='AmountPurchase']").text(0);
            $('.checkbox').change(function () {
                if ($(this).is(":checked")) {
                    var previousV = $("label[for='AmountPurchase']").text();
                    var fixAmount = 5;
                    var totalAmount = parseInt(previousV) + 5;
                    $("label[for='AmountPurchase']").text(totalAmount);
                }
            });
        });
    </script>
    <script>
        $(document).ready(function () {
            $("#btnSubmit").click(function () {
                $("#btnUpdate").show();
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
                        data: "{'EmpId':'" + teamlist + "','TeamID':'" + JobType.value + "','catName':'" + checkboxValue + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (r) {
                            if (r.d == "1") {
                                //This hidden field will be store the selected item value in client side So that user can't Select theses values again
                                //$('#demooutput').val($('#demooutput').val() + $(this).html());
                                //($("label[for='lblselected']").text(teamlist));
                                $("label[for='lblselected']").text(($("label[for='lblselected']").text()) + "," + teamlist);
                                $("#btncheckout").css({ "visibility": "visible" });

                                $("#divSuccess").show();

                                setTimeout(function ()
                                {
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
            });
            $("#btncheckout").click(function () {
                $("#Shop").show();
                $("#divShow").hide();
                $("#btnSubmit").hide();
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
                            cartd.push("<tr><td colspan=3>View Categories</td><td style='visibility:hidden'></td></tr>");
                            cartd.push("<tr>");
                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Sr.No.</strong></td>");
                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                            cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'> Price </td>");
                            cartd.push("<td style='color: white; background-color: skyblue; visibility:hidden' class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                            cartd.push("</tr>");
                            var count = 1;
                            var Totalamount = 0;
                            $.each(docs, function (i, docs) {
                                cartd.push("<tr>");
                                cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                                cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text() + " </td>"));
                                cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text() + "$ </td>"));
                                cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("CategoryID").text() + " </td>")); cartd.push("</tr>");
                                var a = $(docs).find("Price").text();
                                Totalamount = parseInt(Totalamount) + parseInt(a);
                            });
                            cartd.push("<tr><td class='uk-text-center'></td><td class='uk-text-center'></td><td class='uk-text-center' colspan='3' style='float:right'><b> Toal Amount:-" + Totalamount + "</b></td><td style='visibility:hidden'></td></tr>");
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
            });
            $("#save").click(function () {
                if (MemberShip.value == 0) {
                    alert("Select Membership Plan");
                }
                else {
                    var teamlist = [];
                    $.ajax({
                        type: "POST", url: "ws/CategoryPurchase.asmx/SelectCartData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("Table1");
                                $.each(docs, function (i, docs) {
                                    teamlist.push($(docs).find("CategoryID").text());
                                });
                            }
                        }
                    });
                    $.ajax({
                        type: "POST",
                        url: "ws/CategoryPurchase.asmx/InsertCategory",
                        data: "{'SubcategoryID':'" + teamlist + "','PlanID':'" + MemberShip.value + "'}",
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
            $(function () {
                $("#MemberShip").change(function () {
                    var MonthValue = MemberShip.value;
                    var totalAmount = $("label[for='lblRowId']").text();
                    $("label[for='lblToalAmount']").text("Total Amount:-" + MonthValue * totalAmount + "$");
                });
            });



            $("input:checkbox.country").click(function () {
                if (!$(this).is(":checked"))
                    alert('you are unchecked ' + $(this).val());
            });



            $("#btnUpdate").click(function () {
                $("label[for='lblselected']").text("");
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
                        data: "{'EmpId':'" + teamlist + "','TeamID':'" + JobType.value + "','catName':'" + checkboxValue + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (r) {
                            if (r.d == "1") {
                                //This hidden field will be store the selected item value in client side So that user can't Select theses values again
                                //$('#demooutput').val($('#demooutput').val() + $(this).html());
                                //($("label[for='lblselected']").text(teamlist));
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
            });

        });
    </script>

    <div id="topRight">
       <%-- Total Amount:---%>
        <label style="visibility: visible" id="AmountPurchase"></label>
    </div>
    <div class="md-card uk-margin-medium-bottom" id="maindiv">
        <div class="md-card-content">
            <div>
                Select Jobtype    
                <select name="select" id="JobType"></select>
            </div>


            <div class="uk-overflow-container" id="divShow">
            </div>
            <table class="uk-table uk-table-nowrap">
                <thead>
                    <tr>
                        <td>
                            <span style="margin-left: 50px">
                                <input id="btnSubmit" type="button" value="ADD TO CART" />
                                &nbsp;&nbsp;<input id="btncheckout" type="button" style="visibility: hidden" value="Checkout" />
                                <label style="visibility: hidden" for="lblselected"></label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input id="btnUpdate" type="button" value="UPDATE CART" />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                                            <input type="submit" id="save" value="Save" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
        <div role="alert" id="divSuccess" class="alert alert-success">
            <strong>Category Added to Cart Succesfully</strong>
        </div>
        <div role="alert" id="divError" class="alert alert-danger">
            <strong>Oh snap!</strong> Change a few things up and try submitting again.
        </div>
    </div>
</asp:Content>
