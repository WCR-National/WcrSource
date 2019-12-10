<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="ViewPostedAdvertisement.aspx.cs" Inherits="WcrAssociate.Associate.ViewPostedAdvertisement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            BindData(1);
            $("#divSuccess").hide();
            $("#divShow").hide();
            $("#divEdit").hide();
            $("#btnFeaturedSet").hide();
            $("#MemberShip").hide();
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

            $("#btnFeaturedSet").click(function () {
                var msg = [];
                var teamlist = [];
                var Amount = 0;
                $("#divShow input[id*='isFeaturedChecked']:checked").each(function () {
                    teamlist.push($(this).val());
                    Amount += 5;
                });
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/InsertFeaturedAdv",
                    data: "{'AdvertisementID':'" + teamlist + "','PlanID':'" + MemberShip.value + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            // write a webservice which will send amount
                            $.ajax({
                                type: "POST",
                                url: "ws/CategoryPurchase.asmx/InsertAmount",
                                data: "{'amount':'" + Amount + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                async: false,
                                cache: false,
                                success: function (r) {
                                    if (r.d == "1") {
                                        msg.push("<strong></strong>These advertisements are now set Featured advertisement and Payment for these advertisement are successfully done.");
                                        $("#divSuccess").html(msg.join(''));
                                        $("#divSuccess").show();
                                        setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                                        var jobtypeID = ddlOption.value;
                                        BindData(jobtypeID);
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
                        cartd.push("<table class='table table-condensed'>");
                        cartd.push("<tr><th class='uk-width-2-10'>S.No</th><th class='uk-width-2-10'>Title</th><th class='uk-width-2-10'>Address</th><th class='uk-width-1-10 uk-text-center'>Contactno</th> <th class='uk-width-1-10 uk-text-center'>Description</th> <th class='uk-width-1-10 uk-text-center'>View</th><th class='uk-width-1-10 uk-text-center'>IsFeatured</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("address").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("contactNo").text() + " </td>"));
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

                            if (($(docs).find("isFeatured").text()) == "1") {
                                cartd.push("<td class='uk-width-1-10 uk-text-center'><button type='button' onclick=RemovedFeatured('" + ($(docs).find("advertisementID").text()) + "')   id='" + ($(docs).find("advertisementID").text()) + "'> UnFeatured </button> </td>");
                                cartd.push("<td> <input type='checkbox' checked='' disabled='disabled'  id='isFeaturedChecked' value='" + $(docs).find("advertisementID").text() + "' name='IsFeatured' /></td>");
                            }
                            else {
                                cartd.push("<td class='uk-width-1-10 uk-text-center'><button type='button' onclick=ShowPopUp('" + ($(docs).find("advertisementID").text()) + "," + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subcategoryID").text()) + "," + newstrTitle + "," + newstrfeatures + "," + newstraddress + "," + stremail + "," + contact + "," + newstrdescription + "," + newimage + "," + newcost + "," + newzipcode + "," + newisFeatured + "," + ($(docs).find("CountryID").text()) + "," + ($(docs).find("StateID").text()) + "," + ($(docs).find("CityID").text()) + "')   id='" + ($(docs).find("advertisementID").text()) + "'> Edit </button> </td>");
                                cartd.push("<td> <input type='checkbox' id='isFeaturedChecked' value='" + $(docs).find("advertisementID").text() + "' name='IsFeatured' /></td>");
                            }
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
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("City").text() + "</option>");
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
                type: "POST", url: "ws/Category.asmx/AssociateCategory", data: "{'jobtype':'" + jobTypeId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
                    $("#btnFeaturedSet").show();
                    $("#MemberShip").show();
                    BindMembership();
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
            //if ($("#chkfeatured").prop('checked') == true) {
            //    Isfeatured = 1;
            //}
            //else {
            //    Isfeatured = 0;
            //}
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
                        msg.push("<strong>Well done ! </strong>Updated Successfully");
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



        function RemovedFeatured(dynar) {
            var msg = [];
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/UnFeaturedAdv",
                data: "{'AdvertisementID':'" + dynar + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (r) {
                    if (r.d == "1") {
                        alert("UnFeatured Successfully.");
                        var jobtypeID = ddlOption.value;
                        BindData(jobtypeID);
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


    </script>

    <div class="content-wrapper">
        <section class="content">
            <%--    <div id="page_content">
        <div class="md-card-content">--%>
            <%-- <div id="page_content_inner">--%>

            <div class="md-card uk-margin-medium-bottom">

                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="md-card uk-margin-medium-bottom" id="d">
                            <div class="md-card-content">
                                <select id="ddlOption">
                                    <option value="-1">Select JobType</option>
                                    <option value="1">Sales</option>
                                    <option value="2">Service</option>
                                </select>
                                <%-- <div class="uk-overflow-container" id="divShow">
                            </div>--%>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">Details of Advertisments </h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body ">
                                <div class="uk-overflow-container" id="divShow">
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        Membership Plan:-
                                            <select name="select" id="MemberShip"></select>


                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input id="btnFeaturedSet" type="button" value="Save" />
                                    </div>
                                </div>


                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                    <!-- ./col -->
                </div>
                <%--  <div id="divEdit1" style="display: none; width: 500px;">--%>
                <div class="box-body  form-horizontal" id="divEdit">
                    <div class="box-header">
                        <h3 class="box-title">Edit Advertisement </h3>
                    </div>
                    <div class="form-group">

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <label style="visibility: hidden" for="lblRowId"></label>
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
                            <input type="text" class="form-control" id="txtzipcode" placeholder="Zipcode" />
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
                            <label class="control-label col-lg-3  col-sm-3  col-md-3  col-xs-12">Main Image </label>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                <input type="file" class="form-control" id="FileUpload1" /><div id="showimg"></div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <input id="txtPrice" value="0" placeholder="Price" type="text" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <%-- <input type="checkbox" id="chkfeatured" name="IsFeatured" />IsFeatured<br />
                            (You have to pay 5$ additional if advertisment is featured)  --%>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                        </div>
                    </div>
                </div>

                <%-- </div>--%>

                <div role="alert" id="divSuccess" class="alert alert-success">
                </div>
            </div>
            <%--</div>--%>
            <%--</div>
    </div>--%>
        </section>
    </div>
</asp:Content>
