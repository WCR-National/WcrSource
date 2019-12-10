<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="PromoCode.aspx.cs" Inherits="WcrAssociate.Associate.PromoCode" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $("#divSuccess").hide();
            BindJobType();
            BindData(); 

            $("#btnSubmit").click(function () {
                var check = Valid();
                if (check == "1") {
                    InsertD();
                }
                else {
                    alert(check);
                }

            });
            function Valid() {
                var returnValue;
                if (Category.value == 0) {
                    returnValue = "Select Category";
                }
                else if (SubCategory.value == 0) {
                    returnValue = "Select SubCategory";
                }
              
                else if (txtPromocode.value == "") {
                    returnValue = "PromoCode required";
                    $("#txtPromocode.value").focus();
                }
                else if (txtfrom.value == "") {
                    returnValue = "From Date required";
                    $("#txtfrom.value").focus();
                }
                else if (txtto.value == "") {
                    returnValue = "To Date required";
                    $("#txtto.value").focus();
                }
                else {
                    returnValue = "1";
                }
                return returnValue;
            }
            function InsertD() {
                var CategoryId = Category.value;
                var subCategoryId = SubCategory.value;           
                var fromP = txtfrom.value;
                var toP = txtto.value;
                var discount = txtDiscount.value;
                var promo = txtPromocode.value;
                if ($("#chkfeatured").prop('checked') == true) {
                    Isfeatured = 1;
                }
                else {
                    Isfeatured = 0;
                }
                var teamlist = [];
                $("#divFeatures input[id*='chk']:checked").each(function () {
                    teamlist.push($(this).val());
                });
                var msg = [];
                $.ajax({
                    type: "POST", url: "ws/InsertPromoCode.asmx/InsertPromo", data: "{'categoryID':'" + CategoryId + "','SubcategoryID':'" + subCategoryId + "','_fromDate':'" + fromP + "','_toDate':'" + toP + "','Discount':'" + discount + "','PromoCode':'" + promo + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            msg.push("<strong></strong>This Record is Already Exists");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                        }
                        else if (r.d == "1") {
                            msg.push("<strong></strong>Added Successfully.");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                            ClearText();
                        }
                       
                        BindData();
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                })
            }
            function ClearText() {
                txtfrom.value = "";
                txtto.value = "";
                txtDiscount.value = "";
                txtPromocode.value = "";
            }
          

            function BindJobType() {
                $.ajax({
                    type: "POST", url: "ws/jobType.asmx/SelectJtype", data: "{'flag':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("JobType");
                            var cartd = [];
                            cartd.push("<option value=0>Select Category</option>")
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
        });
        function BindData() {
            $.ajax({
                type: "POST", url: "ws/InsertPromoCode.asmx/SelectPromoCode", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("PromoCode");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th>Sr.N</th><th>Category</th><th>Sub-Category</th><th>FromDate</th> <th>ToDate</th><th>Discount</th><th>PromoCode</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("Category").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("SubCategory").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("FromDate").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("ToDate").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("Discount").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("PromoCode").text() + " </td>"));
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
        $(function () {
            $("#JobType").change(function () {
                BindCategory();
            });
        });
        function BindCategory() {
            var jobtypeV = JobType.value;
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AssociateCategory", data: "{'jobtype':'" + jobtypeV + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssociateCategories");
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
        function BindSubCategory() {
            var CategoryId = Category.value;
            $.ajax({
                type: "POST", url: "ws/subCategory.asmx/SelectCatSubCategory", data: "{'flag':'1','Categoryid':'" + CategoryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CatSubCategories");
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

    </script>

            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div id="divEntry">

                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">Promo-Code</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  form-horizontal">
                                <div class="form-group">

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="JobType"></select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="Category"></select>
                                    </div>
                                </div>
                                <div class="form-group">

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="SubCategory"></select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" id="txtPromocode" class="form-control" placeholder=" PromoCode" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        From Date
                                        <input type="date" id="txtfrom" class="form-control" name="bday" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        To Date
                                         <input type="date" id="txtto" class="form-control" name="bday" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" id="txtDiscount" class="form-control" placeholder="Discount" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input id="btnSubmit" class="btn btn-primary" type="button" value="Save" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- /.box-body -->
                    </div>
                </div>
            </div>
            <div class="row">
                <div role="alert" id="divSuccess" class="alert alert-success">
                </div>
            </div>
            <!-- ./col -->
            <div class="row">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                    <div class="box customebox">

                        <div class="box-body ">

                            <div class="uk-overflow-container" id="divShow">
                            </div>

                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
                <!-- ./col -->
            </div>





       
</asp:Content>
