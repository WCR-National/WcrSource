<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="PostAdverrtisementService.aspx.cs" Inherits="WcrAssociate.Associate.PostAdverrtisementService" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $("#divSuccess").hide();
            $("#divEdit").hide();
            $("#divSuccessEdit").hide();
            $("#images").hide();
            BindData();
            BindCountry();
            BindCategory();
            PurchasedZipCode();
            $("#Button1").click(function () {
                $("#divEntry").show();
                $("#divSuccess").hide();
                $("#txtState").focus();
            });
            $("#btnUpdate").click(function () {
                $("#divEdit").hide();
            });
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
                else if (Country.value == 0) {
                    returnValue = "Select Country";
                }
                else if (State.value == 0) {
                    returnValue = "Select State";
                }
                else if (city.value == 0) {
                    returnValue = "Select city";
                }
                else if (txtName.value == "") {
                    returnValue = "Title required";
                    $("#txtName.value").focus();
                }
                else if (ddlZipCode.value == 0) {
                    returnValue = "Zipcode required";
                    $("#txtzipcode.value").focus();
                }
                else {
                    returnValue = "1";
                }
                return returnValue;
            }
            function InsertD() {
                var CategoryId = Category.value;
                var subCategoryId = SubCategory.value;
                var countryID = Country.value;
                var StateID = State.value;
                var cityID = city.value;
                var Isfeatured = 0;
                var address = txtAddress.value;
                var email = txtEmail.value;
                var ZipCode = ddlZipCode.value;
                //if ($("#chkfeatured").prop('checked') == true) {
                //    Isfeatured = 1;
                //}
                //else {
                //    Isfeatured = 0;
                //}
                var teamlist = [];
                $("#divFeatures input[id*='chk']:checked").each(function () {
                    teamlist.push($(this).val());
                });
                var msg = [];
                $.ajax({
                    type: "POST", url: "ws/Sale.asmx/InsertSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','email':'" + email + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + txtAddress.value.trim() + "','zipcode':'" + ZipCode + "','isFeatured':'" + Isfeatured + "','FeatureID':'" + teamlist + "','jobtype':'2','amount':'" + txtPrice.value + "'}",
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
                        else if (r.d >= "1") {
                            //Code is for main Image
                            var fileUpload = $("#FileUpload1").get(0);
                            var files = fileUpload.files;
                            var test = new FormData();


                            //Code is for Second Image
                            var secondupload = $("#FileUpload2").get(0);
                            var files2 = secondupload.files;
                            var test2 = new FormData();

                            //Code is for Third Image
                            var thirdupload = $("#FileUpload3").get(0);
                            var files3 = thirdupload.files;
                            var test3 = new FormData();

                            //Code is for Fourth Image
                            var fourthupload = $("#FileUpload4").get(0);
                            var files4 = fourthupload.files;
                            var test4 = new FormData();

                            for (var i = 0; i < files.length; i++) {
                                test.append(files[i].name, files[i], r.d);
                                test.append(files2[i].name, files2[i], r.d);
                                test.append(files3[i].name, files3[i], r.d);
                                test.append(files4[i].name, files4[i], r.d);
                            }
                            $.ajax({
                                url: "UploadHandler.ashx",
                                type: "POST",
                                contentType: false,
                                processData: false,
                                data: test,
                                success: function (result) {
                                    $("#FileUpload1").val("");
                                    $("#FileUpload2").val("");
                                    $("#FileUpload3").val("");
                                    $("#FileUpload4").val("");
                                    msg.push("<strong>Well done ! </strong>Submitted Successfully");
                                    $("#divSuccess").html(msg.join(''));
                                    $("#divSuccess").show();
                                    setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                                    BindData();
                                },
                                error: function (err) {
                                    alert(err.statusText);
                                }
                            });
                        }
                        ClearText();
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
                txtName.value = "";
                txtFeatures.value = "";
                txtAddress.value = "";
                txtContact.value = "";
                txtdescription.value = "";
                txtAddress.value = "";
                txtzipcode.value = "";
                txtPrice.value = "";
                txtEmail.value = "";

            }
            function BindCountry() {
                $.ajax({
                    type: "POST", url: "ws/Country.asmx/SelectCountry", data: "{'flag':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("Countries");
                            var cartd = [];
                            cartd.push("<option value=0>Select Country</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("Name").text() + "</option>");
                            });
                            $("#Country").html(cartd.join(''));
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
                $.ajax({
                    type: "POST", url: "ws/Category.asmx/AssociateCategory", data: "{'jobtype':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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

            function PurchasedZipCode() {
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/PurchaseZipCode", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("PurchaseZip");
                            var cartd = [];
                            cartd.push("<option value=0>Select ZipCode</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("zipcode").text() + "'>" + $(docs).find("zipcode").text() + "</option>");
                            });
                            $("#ddlZipCode").html(cartd.join(''));
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
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'1'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th>Sr.N</th><th>Title</th><th>Address</th><th>Contact</th> <th>Description</th> </tr>");
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
        $(function () {
            $("#ddlOption").change(function () {
                BindData();
            });
        });
        function BindState() {
            $("#city").empty();
            var CountryId = Country.value;
            $.ajax({
                type: "POST", url: "ws/State.asmx/CountryWiseState", data: "{'Status':'1','CountryID':'" + CountryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("States1");
                        var cartd = [];
                        cartd.push("<option value=0>Select State</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("Name").text() + "</option>");
                        });
                        $("#State").html(cartd.join(''));
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
        function BindCity() {
            var StateId = State.value;
            $.ajax({
                type: "POST", url: "ws/City.asmx/StateWisecity", data: "{'Status':'1','StateID':'" + StateId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("StateWiseCities");
                        var cartd = [];
                        cartd.push("<option value=0>Select City</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("ID").text() + "'>" + $(docs).find("City").text() + "</option>");
                        });
                        $("#city").html(cartd.join(''));
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
            $("#Country").change(function () {
                BindState();
            });
        });
        $(function () {
            $("#State").change(function () {
                BindCity();
            });
        });
        $(function () {
            $("#Category").change(function () {
                BindSubCategory();
            });
        });
        $(function () {
            $("#SubCategory").change(function () {
                BindFeature();
            });

            function BindFeature() {
                var SubCategoryID = SubCategory.value;
                $.ajax({
                    type: "POST", url: "ws/features.asmx/SelectCatFeatures", data: "{'flag':'1','SubCategoryid':'" + SubCategoryID + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("SubcategoryFeatures");
                            var cartd = [];
                            cartd.push("<table width='50' border='0' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                            cartd.push("<tr><td>Features</td></tr>");
                            var count = 1;
                            $.each(docs, function (i, docs) {
                                cartd.push("<tr>");
                                cartd.push("<td><input type='checkbox' value='" + $(docs).find("ID").text() + "'      class='checkbox' id='chk' /> " + $(docs).find("Feature").text() + "   </td>");

                                cartd.push("</tr>");
                            });
                            cartd.push("</table>");
                            $("#divFeatures").html(cartd.join(''));
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
    </script>

    <div class="content-wrapper">

        <section class="content">
            <!-- Small boxes (Stat box) -->
            <div id="divEntry">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">Add Post Advertisement</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  form-horizontal">

                                <div class="form-group">

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="Category"></select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="SubCategory"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" id="txtName" class="form-control" placeholder=" Title" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" id="txtContact" class="form-control" placeholder="Contact" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <textarea class="form-control" id="txtAddress" cols="" rows="" placeholder="Address"></textarea>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <textarea class="form-control" id="txtdescription" cols="" rows="" placeholder="Discription"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="Country">
                                            <option>Select Country</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="State">
                                            <option>Select State</option>
                                        </select>
                                        <%-- <input type="text" class="form-control" placeholder="Zipcode">--%>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="city">
                                            <option>Select City</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                       <%-- <input type="text" class="form-control" id="txtzipcode" placeholder="Zipcode" />--%>
                                        <select class="form-control" id="ddlZipCode">
                                            <option>Select Country</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <textarea class="form-control" id="txtFeatures" cols="" rows="" placeholder="Additional Features"></textarea>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" class="form-control" id="txtEmail" placeholder="Email" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div id="divFeatures"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <label class="control-label col-lg-3  col-sm-3  col-md-3  col-xs-12">Main Image </label>(Less Than 530Kb and widthXheight=1600X1200)
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                            <input type="file" class="form-control" id="FileUpload1" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 "> Price:- 
                                        <input id="txtPrice" value="0" placeholder="Price" type="text" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <label class="control-label col-lg-3  col-sm-3  col-md-3  col-xs-12">Second Image </label>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                            <input type="file" class="form-control" id="FileUpload2" />(Less Than 530Kb and widthXheight=1600X1200)
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <label class="control-label col-lg-3  col-sm-3  col-md-3  col-xs-12">Third Image </label>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                            <input type="file" class="form-control" id="FileUpload3" />(Less Than 530Kb and widthXheight=1600X1200)
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <label class="control-label col-lg-3  col-sm-3  col-md-3  col-xs-12">Fourth Image </label>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                            <input type="file" class="form-control" id="FileUpload4" />(Less Than 530Kb and widthXheight=1600X1200)
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                      <%--  <input type="checkbox" id="chkfeatured" style="visibility:hidden;" name="IsFeatured" />IsFeatured<br />--%>
                                       <%-- (You have to pay 5$ additional if advertisment is featured) --%>                                    
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input id="btnSubmit" type="button" value="Save" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="alert" id="divSuccess" class="alert alert-success">
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
            </div>

            <!-- ./col -->
            <div class="row">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                    <div class="box customebox">
                        <div class="box-header">
                            <div class="row">
                                <div class="col-lg-6 col-sm-6 col-md-12 col-xs-12 ">
                                    <h3 class="box-title">Purchase  </h3>
                                </div>
                                <div class="col-lg-6 col-sm-6 col-md-12 col-xs-12 ">
                                    <select class="form-control" id="ddlOption">
                                        <option value="-1">Select</option>
                                        <option value="1">Active</option>
                                        <option value="0">De-Active</option>
                                    </select>
                                </div>
                            </div>


                        </div>
                        <!-- /.box-header -->
                        <div class="box-body ">

                            <div class="uk-overflow-container" id="divShow">
                            </div>

                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
                <!-- ./col -->
            </div>





        </section>


    </div>
</asp:Content>
