<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="Service.aspx.cs" Inherits="WcrWebApplication.Associate.Service" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $("#divEntry").hide();
            $("#divSuccess").hide();
            $("#divEdit").hide();
            $("#divSuccessEdit").hide();
            $("#images").hide();
            BindData();
            BindCountry();
            BindCategory();
            BindPurchasedZipCode();
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
                else if (txtzipcode.value == 0) {
                    returnValue = "Zipcode required";
                  
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
                var zipcode = txtzipcode.value;
                var Isfeatured = 0;
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
                    type: "POST", url: "ws/Sale.asmx/InsertSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value + "','address':'" + txtAddress.value + "','email':'" + txtAddress.value + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','zipcode':'" + zipcode + "','isFeatured':'" + Isfeatured + "','FeatureID':'" + teamlist + "','jobtype':'2','amount':'" + txtPrice.value + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
                            var fileUpload = $("#FileUpload1").get(0);
                            var files = fileUpload.files;
                            var test = new FormData();
                            for (var i = 0; i < files.length; i++) {
                                test.append(files[i].name, files[i], r.d);
                            }
                            $.ajax({
                                url: "UploadHandler.ashx",
                                type: "POST",
                                contentType: false,
                                processData: false,
                                data: test,
                                success: function (result) {
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
                            cartd.push("<option value=0>Select</option>")
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
                            cartd.push("<option value=0>Select</option>")
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

            function BindPurchasedZipCode() {
                $.ajax({
                    type: "POST", url: "ws/MyCategories.asmx/MyZipcodes", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("Myzipcodes");
                            var cartd = [];
                            cartd.push("<option value=0>Select</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("zipcode").text() + "'>" + $(docs).find("zipcode").text() + "</option>");
                            });
                            $("#txtzipcode").html(cartd.join(''));
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
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'2'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='uk-table uk-table-nowrap'>");
                        cartd.push("<tr><th class='uk-width-2-10'>S.No</th><th class='uk-width-2-10'>Title</th><th class='uk-width-2-10'>Address</th><th class='uk-width-1-10 uk-text-center'>Contactno</th> <th class='uk-width-1-10 uk-text-center'>Description</th>  </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("address").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("contactno").text() + " </td>"));
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
                        cartd.push("<option value=0>Select</option>")
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
                        cartd.push("<option value=0>Select</option>")
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
                        cartd.push("<option value=0>Select</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("Name").text() + "</option>");
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

        function CategorywiseZipcode() {
            debugger;
            var CategoryId = Category.value;
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/CategoryWiseZipcodes", data: "{'categoryId':'" + CategoryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("Myzipcodes");
                        var cartd = [];
                        cartd.push("<option value=0>Select</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("zipcode").text() + "'>" + $(docs).find("zipcode").text() + "</option>");
                        });
                        $("#txtzipcode").html(cartd.join(''));
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
                CategorywiseZipcode();

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
    <div id="page_content">
        <div class="md-card-content">
            <div id="page_content_inner">
                <a href="Dashboard.aspx">Dashboard </a>-->  <a href="Service.aspx">Service</a>
                <div class="md-card uk-margin-medium-bottom">
                    <div id="modal_overflow" class="uk-modal">
                        <div class="uk-modal-dialog">
                            <button type="button" class="uk-modal-close uk-close"></button>
                            <h2 class="heading_a"></h2>
                        </div>
                    </div>
                    <div class="md-card uk-margin-medium-bottom" id="d">
                        <div class="uk-float-right">
                            <button type="button" id="Button1" class="md-btn md-btn-primary" data-uk-modal="{target:'#modal_default'}">Add New</button>
                        </div>
                        <div class="md-card-content">
                            <select id="ddlOption">
                                <option value="-1">Select</option>
                                <option value="1">Active</option>
                                <option value="0">De-Active</option>
                            </select>
                            <input type='hidden' id='current_page' />
                            <input type='hidden' id='show_per_page' />
                            <div class="uk-overflow-container" id="divShow">
                            </div>
                            <div id='page_navigation'></div>
                        </div>
                    </div>
                    <div class="uk-overflow-container" id="divEntry">
                        <div style="float: right;">
                            <div class="uk-modal" id="modal_default">
                                <div class="uk-modal-dialog">
                                    <button type="button" class="uk-modal-close uk-close"></button>
                                    <table class="uk-table uk-table-nowrap">
                                        <thead>
                                            <tr>
                                                <td colspan="2"><b><u>Post Advertisement </u></b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Category<br />
                                                    <select id="Category"></select>
                                                </td>
                                                <td>SubCategory<br />
                                                    <select id="SubCategory"></select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Title<br />
                                                    <input id="txtName" placeholder="Title" type="text" />
                                                </td>
                                                <td>Address<br />
                                                    <textarea id="txtAddress" style="width: 200px">
                                                    </textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Description<br />
                                                    <textarea id="txtdescription" style="width: 350px">
                                                    </textarea>
                                                </td>
                                                <td>Contact<br />
                                                    <input id="txtContact" placeholder="Contact" type="text" />

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select id="Country"></select>
                                                </td>
                                                <td>
                                                    <select id="State"></select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select id="city"></select>
                                                </td>
                                                <td>
                                                     <select id="txtzipcode"></select>
                                                   <%-- <input id="txtzipcode" placeholder="Zipcode" type="text" />--%>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">

                                                    <div id="divFeatures"></div>
                                                </td>
                                            </tr>
                                           <tr>
                                                <td>Additional  Features<br />
                                                    <textarea id="txtFeatures" placeholder="Features" style="width: 350px">
                                                    </textarea>
                                                </td>
                                                <td>
                                                    <input id="txtEmail" placeholder="Email" type="text" />
                                                </td>
                                            </tr>


                                            <tr>
                                                <td>Main Image<br />
                                                    <input type="file" id="FileUpload1" />
                                                </td>
                                                <td>
                                                    <input id="txtPrice" value="0" placeholder="Price" type="text" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="chkfeatured" name="IsFeatured" />IsFeatured
                                                </td>
                                                <td>
                                                    <input id="btnSubmit" type="button" value="Save" />
                                                </td>
                                            </tr>
                                            <%-- <tr>
                                                <td colspan="2">
                                                    <div id="images">
                                                        Main Image:-  
                                                        <asp:FileUpload ID="fluploadMain" runat="server" /><br />
                                                        First Image:-  
                                                        <asp:FileUpload ID="FileUpload1" runat="server" /><br />
                                                        <asp:Button ID="btnImgUpload" runat="server" Text="Upload" OnClick="btnImgUpload_Click" />
                                                    </div>
                                                </td>
                                            </tr>--%>
                                        </thead>
                                    </table>
                                    <div role="alert" id="divSuccess" class="alert alert-success">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id="divEdit" style="display: none">
                        <%--<table style="width: 100%">
                            <tr>
                                <td class="t">
                                    <label style="visibility: hidden" for="lblRowId"></label>
                                    Job Type:-
                        <label for="lblName"></label>
                                </td>
                            </tr>
                            <tr>
                                <td class="t">Category:-
                        <input id="txtCategory" placeholder="Category" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td class="t">
                                    <input id="btnUpdate" type="button" value="Update" />
                                </td>
                            </tr>
                        </table>--%>
                    </div>
                    <div role="alert" id="divSuccessEdit" class="alert alert-success">
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
