<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="ViewAdvertisement.aspx.cs" Inherits="WcrWebApplication.Associate.ViewAdvertisement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        $(document).ready(function () {
            $("#divSuccess").hide();
            $("#divShow").hide();
            $("#divEdit").hide();
            BindCountry();
            $("#btnSubmit").click(function () {

                if (document.getElementById("FileUpload1").files.length == 0) {

                }
                else {
                    var rowID = $("label[for='lblRowId']").text();
                    var fileUpload = $("#FileUpload1").get(0);
                    var files = fileUpload.files;
                    var test = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        test.append(files[i].name, files[i], rowID);
                    }
                    $.ajax({
                        url: "UploadHandler.ashx",
                        type: "POST",
                        contentType: false,
                        processData: false,
                        data: test,
                        success: function (result) {                           
                          
                        },
                        error: function (err) {
                            alert(err.statusText);
                        }
                    });

                }
                var check = Valid();
                if (check == "1") {
                    InsertD();
                }
                else {
                    alert(check);
                }
            });
        });
        function BindData(jobtype) {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'" + jobtype + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='uk-table uk-table-nowrap'>");
                        cartd.push("<tr><th class='uk-width-2-10'>S.No</th><th class='uk-width-2-10'>Title</th><th class='uk-width-2-10'>Address</th><th class='uk-width-1-10 uk-text-center'>Contactno</th> <th class='uk-width-1-10 uk-text-center'>Description</th> <th class='uk-width-1-10 uk-text-center'>View</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("address").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("contactno").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("description").text() + " </td>"));                           
                            //This below variable is used to store value of Title of the advertisement
                            var strTitle = ($(docs).find("title").text());
                            var newstrTitle = strTitle.split(' ').join('-');
                            //This below variable is used to store value of feature of the advertisement
                            var strfeatures = ($(docs).find("features").text());
                            var newstrfeatures = strfeatures.split(' ').join('-');
                            var straddress = ($(docs).find("address").text());
                            var newstraddress = straddress.split(' ').join('-');
                            var stremail = ($(docs).find("email").text());
                            //var newstremail = stremail.split(' ').join('-');
                            var contact = ($(docs).find("contactNo").text());
                            var strdescription = ($(docs).find("description").text());
                            var newstrdescription = strdescription.split(' ').join('-');
                            var newimage = ($(docs).find("advMainImage").text());
                            var newcost = ($(docs).find("cost").text());
                            var newzipcode = ($(docs).find("ZipCode").text());
                            var newisFeatured = ($(docs).find("isFeatured").text());
                            cartd.push("<td class='uk-width-1-10 uk-text-center'><button type='button' onclick=ShowPopUp('" + ($(docs).find("advertisementID").text()) + "," + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subcategoryID").text()) + "," + newstrTitle + "," + newstrfeatures + "," + newstraddress + "," + stremail + "," + contact + "," + newstrdescription + "," + newimage + "," + newcost + "," + newzipcode + "," + newisFeatured + "," + ($(docs).find("CountryID").text()) + "," + ($(docs).find("StateID").text()) + "," + ($(docs).find("CityID").text()) + "')   id='" + ($(docs).find("advertisementID").text()) + "'> Edit </button> </td>");
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
            $("#Category").change(function () {
                BindSubCategory();
            });
            $("#Country").change(function () {
                BindState();
            });
            $("#State").change(function () {
                BindCity();
            });
        });
        function ShowPopUp(dynar) {          
            $("#divEdit").show();
            var array = dynar.split(",");
            for (var i in array) {
                if (i == 0) {
                    if (array[i] == '') {
                        lblRowId.value = "";
                    }
                    else {
                        $("label[for='lblRowId']").text(array[i]);
                    }
                }
                else if (i == 1) {
                    if (array[i] == '') {

                    }
                    else {
                        Category.value = array[i];
                    }
                }
                else if (i == 2) {
                    if (array[i] == '') {

                    }
                    else {
                        BindSubCategory();
                        SubCategory.value = array[i];
                    }
                }
                else if (i == 3) {
                    if (array[i] == '') {
                        txtName.value = "";
                    }
                    else {
                        var nm = array[i].toString();
                        var gh = nm.replace('-', ' ');
                        txtName.value = gh;
                    }
                }
                else if (i == 4) {
                    if (array[i] == '') {
                        txtFeatures.value = "";
                    }
                    else {
                        var features = array[i].toString();
                        var features1 = features.replace('-', ' ');
                        txtFeatures.value = features1;
                    }
                }
                else if (i == 5) {
                    if (array[i] == '') {
                        txtAddress.value = "";
                    }
                    else {
                        var address = array[i].toString();
                        var address1 = address.replace('-', ' ');
                        txtAddress.value = address1;
                    }
                }
                else if (i == 6) {
                    if (array[i] == '') {
                        txtEmail.value = "";
                    }
                    else {
                        var email = array[i].toString();
                        var email1 = email.replace('-', ' ');
                        txtEmail.value = email1;
                    }
                }
                else if (i == 7) {
                    if (array[i] == '') {
                        txtContact.value = "";
                    }
                    else {
                        var contact = array[i].toString();
                        txtContact.value = contact;
                    }
                }

                else if (i == 8) {
                    if (array[i] == '') {
                        txtdescription.value = "";
                    }
                    else {
                        var description = array[i].toString();
                        txtdescription.value = description;
                    }
                }

                else if (i == 9) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img Width='100px' Height='100px' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#showimg").html(sd.join(''));

                    }
                }
                else if (i == 10) {
                    if (array[i] == '') {
                        txtPrice.value = "";
                    }
                    else {
                        var cost = array[i].toString();
                        txtPrice.value = cost;
                    }
                }
                else if (i == 11) {
                    if (array[i] == '') {
                        txtzipcode.value = "";
                    }
                    else {
                        var zipcode = array[i].toString();
                        txtzipcode.value = zipcode;
                    }
                }

                else if (i == 12) {
                    if (array[i] == '') {

                    }
                    else {
                        var isfeature = array[i].toString();
                        if (isfeature == 1) {
                            $('#chkfeatured').prop('checked', true);
                        }
                        else { $('#chkfeatured').prop('checked', false); }
                    }
                }
                else if (i == 13) {
                    if (array[i] == '') {

                    }
                    else {
                        Country.value = array[i];
                    }
                }
                else if (i == 14) {
                    if (array[i] == '') {

                    }
                    else {
                        BindState();
                        State.value = array[i];
                    }
                }
                else if (i == 15) {
                    if (array[i] == '') {

                    }
                    else {
                        BindCity();
                        city.value = array[i];
                    }
                }
            }
           
        }
        function BindCategory(jobTypeId) {           
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AssociateCategory", data: "{'jobtype':'"+jobTypeId+"'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
        $(function () {
            $("#ddlOption").change(function () {
                var jobtypeID = ddlOption.value;
                if (jobtypeID == -1) {
                    $("#divShow").hide();
                    $("#divEdit").hide();
                    alert("Please Select an option from Job type");
                }
                else {
                    $("#divShow").show();
                    $("#divEdit").hide();
                    var jobtypeID = ddlOption.value;
                    BindCategory(jobtypeID);
                    BindData(jobtypeID);
                }
            });
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
            else if (txtzipcode.value == "") {
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
            if ($("#chkfeatured").prop('checked') == true) {
                Isfeatured = 1;
            }
            else {
                Isfeatured = 0;
            }          
            var rowID = $("label[for='lblRowId']").text();
            var msg = [];
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/UpdateSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','email':'" + email + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','zipcode':'" + txtzipcode.value + "','isFeatured':'" + Isfeatured + "','amount':'" + txtPrice.value + "','id':'" + rowID + "'}",
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
                        msg.push("<strong>Well done ! </strong>Submitted Successfully");
                        $("#divSuccess").html(msg.join(''));
                        $("#divSuccess").show();
                        setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                        var jobtypeID = ddlOption.value;
                        BindData(jobtypeID);
                        $("#divEdit").hide();


                    }
                    ClearText();
                    BindData(jobtypeID);
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
    </script>
    <div id="page_content">
        <div class="md-card-content">
            <div id="page_content_inner">
                <a href="Dashboard.aspx">Dashboard </a>-->  <a href="ViewAdvertisement.aspx">View Advertisement</a>
                <div class="md-card uk-margin-medium-bottom">

                    <div id="modal_overflow" class="uk-modal">
                        <div class="uk-modal-dialog">
                            <button type="button" class="uk-modal-close uk-close"></button>
                            <h2 class="heading_a"></h2>
                        </div>
                    </div>
                    <div class="md-card uk-margin-medium-bottom" id="d">

                        <div class="md-card-content">
                            <select id="ddlOption">
                                <option value="-1">Select</option>
                                <option value="1">Sales</option>
                                <option value="2">Service</option>
                            </select>

                            <div class="uk-overflow-container" id="divShow">
                            </div>

                        </div>
                    </div>
                    <div id="divEdit" style="display: none; width: 500px;">
                        <table class="uk-table uk-table-nowrap">
                            <thead>
                                <tr>
                                    <td colspan="2"><b><u>Edit Advertisement </u></b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Category<br />
                                        <label style="visibility: hidden" for="lblRowId"></label>
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
                                        <input id="txtzipcode" placeholder="Zipcode" type="text" />
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
                                        <div id="showimg"></div>

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
                                        <input id="btnSubmit" type="button" value="Update" />
                                    </td>
                                </tr>

                            </thead>
                        </table>
                    </div>

                    <div role="alert" id="divSuccessEdit" class="alert alert-success">
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
