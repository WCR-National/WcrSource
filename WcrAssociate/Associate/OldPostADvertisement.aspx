<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="OldPostADvertisement.aspx.cs" Inherits="WcrAssociate.Associate.OldPostADvertisement" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-2.1.1.min.js">
    </script>
    <div class="content-wrapper">
        <section class="content">
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                    <div class="box customebox">
                        <div class="form-group">
                            <label for="lblpTitle"></label>
                        </div>
                        <div class="box-header" id="divAdvtDetail" style="visibility: hidden; max-height: 200px; overflow-y: scroll">
                        </div>
                        <div class="box-header">
                            <h3 class="box-title">
                                <input id="btnAddNew" type="button" class="btn btn-primary" value="Add New Advertisement" /></h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body  form-horizontal" id="divDetail" style="visibility: hidden">
                            <div class="form-group">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    <select class="form-control" id="Category"></select>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    <select class="form-control" id="SubCategory"></select>
                                </div>
                            </div>
                        </div>
                        <div class='row' id="divDetail1" style="visibility: hidden">
                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 add-details'>
                                <ul class='nav nav-tabs' role='tablist'>

                                    <li role='presentation' class='active'><a href='#overview' id="defaultOpen" aria-controls='home' role='tab' data-toggle='tab'>Overview </a></li>
                                    <li role='presentation'><a href='#Features' id="defaultOpen1" aria-controls='profile' role='tab' data-toggle='tab'>Features </a></li>
                                    <li role='presentation'><a href='#Location' id="defaultOpen2" aria-controls='messages' role='tab' data-toggle='tab'>Location</a></li>
                                </ul>
                            </div>
                            <div class='tab-content'>

                                <div role='tabpanel' class='tab-pane active' id='overview'>
                                    <div class='fullrow whitebg'>
                                        <div class='row'>
                                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 share' style="height:200px;">

                                                <div class="form-group">
                                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                        <input type="text" id="txtName" class="form-control" placeholder=" Title" /><br />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                     <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                        <textarea class="form-control" id="txtdescription" cols="" rows="4" placeholder="Discription"></textarea><br />
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                     <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                        <input id="txtPrice" value="0" placeholder="Price (Whole dollar amount)" type="text" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" />
                                                        <span id="error" style="color: Red; display: none">* Input digits (0 - 9)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div role='tabpanel' class='tab-pane' id='Features' style="visibility: visible">
                                    <div class='fullrow whitebg'>
                                        <div class='row'>
                                            <div class='col-lg-8 col-md-8 col-sm-8 col-xs-12 share'>
                                                <div class="form-group">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                        <label style="visibility: hidden" for="lblRowId"></label>
                                                        <div id="divFeatures"></div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                        <textarea class="form-control" id="txtFeatures" cols="" rows="" placeholder="Additional Features"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div role='tabpanel' class='tab-pane' id='Location' style="visibility: visible">
                                    <div class='fullrow whitebg'>
                                        <div class='row'>
                                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 share'>
                                                <div class="form-group">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                                        <input type="text" id="txtContact" class="form-control" placeholder="Contact No" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" />
                                                        <span id="error1" style="color: Red; display: none">* Input digits (0 - 9)</span>

                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                                        <textarea class="form-control" id="txtAddress" cols="" rows="2" placeholder="Address"></textarea><br />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                                                        <input type="text" id="city" class="form-control" placeholder="City"/>
                                                      
                                                        <%--<select class="form-control" id="city">
                                                            <option>Select City</option>
                                                        </select>--%>
                                                    </div>

                                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                                                        <select class="form-control" id="State">
                                                            <option>Select State</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                                                        <select class="form-control" id="Country">
                                                            <option>Select Country</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                                                        <select class="form-control" id="zipcode">
                                                            <option>Select ZipCode</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divImgbutton" style="visibility: hidden">
                            <div class="form-group">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    <input id="Imgbutton" type="button" class="btn btn-primary" value="Add Image" />
                                </div>
                            </div>

                        </div>

                        <div class="form-group">
                            <div id="divImage" style="visibility: hidden">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: left">
                                        Primary Image (Less Than 530Kb and widthXheight=1600X1200) 
                                           <input type="file" class="form-control" id="FileUpload1" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: right">
                                        <div id="image-holder"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="divMoreImages" style="visibility: hidden">
                            <div class="form-group">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: left">
                                        Secondary Image (Less Than 530Kb and widthXheight=1600X1200)  
                                  <input type="file" class="form-control" id="FileUpload2" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: right">
                                        <div id="image-holder2"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: left">
                                        Third Image (Less Than 530Kb and widthXheight=1600X1200)     
                                           <input type="file" class="form-control" id="FileUpload3" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: right">
                                        <div id="image-holder3"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: left">
                                        Fourth Image (Less Than 530Kb and widthXheight=1600X1200)   
                                           <input type="file" class="form-control" id="FileUpload4" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="float: right">
                                        <div id="image-holder4"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div id="divsave" style="visibility: hidden">
                            <div class="form-group">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                                    <input id="btnReset" type="button" class="btn btn-primary" value="RESET" />&nbsp;&nbsp;
                                    <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                                    <input id="btnSubmit" type="button" class="btn btn-primary" value="SUBMIT" />
                                    <input id="btnUpdate" type="button" class="btn btn-primary" value="UPDATE" style="visibility: hidden" />
                                </div>
                            </div>

                        </div>

                        <!-- /.box-body -->
                    </div>
                </div>
            </div>
            <div role="alert" id="divSuccess" class="alert alert-success" style="visibility: hidden">
            </div>
            <!-- ./col -->
        </section>
    </div>


    <script>
        //function opentb(evt, cityName) {
        //    var i, tabcontent, tablinks;
        //    tabcontent = document.getElementsByClassName("tabcontent");
        //    for (i = 0; i < tabcontent.length; i++) {
        //        tabcontent[i].style.display = "none";
        //    }
        //    tablinks = document.getElementsByClassName("tablinks");
        //    for (i = 0; i < tablinks.length; i++) {
        //        tablinks[i].className = tablinks[i].className.replace(" active", "");
        //    }
        //    document.getElementById(cityName).style.display = "block";
        //    evt.currentTarget.className += " active";
        //}

        //document.getElementById("defaultOpen").click();

        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        function IsNumeric(e) {
            var keyCode = e.which ? e.which : e.keyCode
            var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
            document.getElementById("error").style.display = ret ? "none" : "inline";
            document.getElementById("error1").style.display = ret ? "none" : "inline";
            return ret;
        }
    </script>
    <script>
        $(document).ready(function () {

            $("#FileUpload1").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holder);
                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                    $('#divMoreImages').css("visibility", "visible");
                    $('#divsave').css("visibility", "visible");

                } else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#FileUpload2").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder2");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holder);

                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                }
                else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#FileUpload3").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder3");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />",
                            {
                                "src": e.target.result,
                                "class": "thumb-image", "width": "75px", "height": "75px"
                            }).appendTo(image_holder);

                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#FileUpload4").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#image-holder4");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holder);
                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {
                    alert("This browser does not support FileReader.");
                }
            });

            var pageID = GetParameterValues('pid');
            function GetParameterValues(param) {
                var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < url.length; i++) {
                    var urlparam = url[i].split('=');
                    if (urlparam[0] == param) {
                        return urlparam[1];
                    }
                }
            }
            if (pageID == "1") {
                $("label[for='lblpTitle']").text("Sales Advertisements");
                BindCategory(1);
            }
            else {
                $("label[for='lblpTitle']").text("Services Advertisements");
                BindCategory(2);
            }


            //$("#divSuccess").hide();
            //$("#divDetail").show();
            //$("#divImage").hide();
            BindCountry();
            $('#Country').val('US');

            $("#btnAddNew").click(function () {
                $('#divDetail').css("visibility", "visible");
                $("#btnAddNew").attr("disabled", "disabled");
                $("#divDetail").show();
            });
            $(function () {
                $("#Category").change(function () {
                    BindSubCategory();
                });
            });
            $(function () {
                $("#SubCategory").change(function () {
                    //BindFeature();
                    $('#divDetail1').css("visibility", "visible");

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
                                cartd.push("<table width='100%' border='0' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                                cartd.push("<tr><td>Features</td></tr>");
                                var count = 1;
                                cartd.push("<tr>");
                                $.each(docs, function (i, docs) {
                                    cartd.push("<td><input type='checkbox' value='" + $(docs).find("ID").text() + "'  class='checkbox' id='chk' /> " + $(docs).find("Feature").text() + "</td>");
                                });
                                cartd.push("</tr>");
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
            $(function () {
                $("#Country").change(function () {
                    BindState();
                });
            });
            //$(function () {
            //    $("#State").change(function () {
            //        BindCity();
            //    });
            //});
            //$(function () {
            //    $("#city").change(function () {
            //        BindStateWiseZipcode();
            //    });
            //});
            $(function () {
                $("#zipcode").change(function () {
                    $('#divImgbutton').css("visibility", "visible");
                });
            });

            $("#Imgbutton").click(function () {
                $('#divImage').css("visibility", "visible");
                $("#Imgbutton").attr("disabled", "disabled");
            });
            $("#btnSubmit").click(function () {
                $('#defaultOpen').css("background-color", "#1776c9");
                $('#defaultOpen1').css("background-color", "#1776c9");
                $('#defaultOpen2').css("background-color", "#1776c9");
                var check = Valid1();
                if (check == 0) {
                    InsertD();
                }
                else {
                    var strarray = check.split(',');
                    for (var i = 0; i < strarray.length; i++) {
                        //alert(strarray[i])
                        if (strarray[i] == 1) {
                            $('#defaultOpen').css("background-color", "red");
                        }
                        if (strarray[i] == 2) {
                            $('#defaultOpen1').css("background-color", "red");
                        }
                        if (strarray[i] == 3) {
                            $('#defaultOpen2').css("background-color", "red");
                        }
                        else if (strarray[i] == "zipcode Required!") {
                            alert("Select Zipcode");
                        }
                    }
                }
            });

            $("#btnUpdate").click(function () {
                $('#defaultOpen').css("background-color", "#367fa9");
                $('#defaultOpen1').css("background-color", "#367fa9");
                $('#defaultOpen2').css("background-color", "#367fa9");
                var check = Valid1();
                if (check == 0) {
                    UpdateD();
                }
                else {
                    var strarray = check.split(',');
                    for (var i = 0; i < strarray.length; i++) {
                        //alert(strarray[i])
                        if (strarray[i] == 1) {
                            $('#defaultOpen').css("background-color", "red");
                        }
                        if (strarray[i] == 2) {
                            $('#defaultOpen1').css("background-color", "red");
                        }
                        if (strarray[i] == 3) {
                            $('#defaultOpen2').css("background-color", "red");
                        }
                    }
                }
            });
            function Valid1() {
                var returnValue = 0;
                if (Country.value == 0) {
                    returnValue += "," + 3 + ",";
                }
                if (State.value == 0) {
                    returnValue += "," + 3 + ",";
                }
                if (city.value == 0) {
                    returnValue += "," + 3 + ",";
                }
                if (txtName.value == "") {
                    returnValue += "," + 1 + ",";

                }
                if (txtFeatures.value == "") {
                    returnValue += "," + 2 + ",";
                }
                if (txtContact.value == "") {
                    returnValue += "," + 3 + ",";
                }
                if (txtAddress.value == "") {
                    returnValue += "," + 3 + ",";
                }
                if (zipcode.value == 0) {
                    returnValue += "," + 3 + ",";
                }
                return returnValue;
            }
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
                else if (zipcode.value == "") {
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
                var Isfeatured = 0;
                var address = txtAddress.value;
                //var email = txtEmail.value;
                //var teamlist = [];
                //$("#divFeatures input[id*='chk']:checked").each(function () {
                //    teamlist.push($(this).val());
                //});
                var msg = [];
                $.ajax({
                    //type: "POST", url: "ws/Sale.asmx/InsertSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + txtAddress.value.trim() + "','zipcode':'" + $("#zipcode option:selected").text() + "','isFeatured':'" + Isfeatured + "','FeatureID':'" + teamlist + "','jobtype':'" + pageID + "','amount':'" + txtPrice.value + "'}",
                    type: "POST", url: "ws/Sale.asmx/InsertSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + txtAddress.value.trim() + "','zipcode':'" + $("#zipcode option:selected").text() + "','isFeatured':'" + Isfeatured + "','jobtype':'" + pageID + "','amount':'" + txtPrice.value + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            msg.push("<strong></strong>This Record is Already Exists");
                            $('#divSuccess').css("visibility", "visible");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $('#divSuccess').css("visibility", "visible");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
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
                                    msg.push("<strong>Well done ! </strong>Submitted Successfully");
                                    $("#divSuccess").html(msg.join(''));
                                    $('#divSuccess').css("visibility", "visible");
                                    setTimeout(function () {
                                        $('#divSuccess').fadeOut('fast');
                                    }, 2000);

                                    $("#FileUpload1").val("");
                                    $("#FileUpload2").val("");
                                    $("#FileUpload3").val("");
                                    $("#FileUpload4").val("");
                                    $("#image-holder").empty();
                                    $("#image-holder2").empty();
                                    $("#image-holder3").empty();
                                    $("#image-holder4").empty();


                                    $('#divDetail1').css("visibility", "visible");
                                    $('#divImgbutton').css("visibility", "hidden");
                                    $('#divMoreImages').css("visibility", "hidden");
                                    $('#divsave').css("visibility", "hidden");
                                    $('#divImage').css("visibility", "hidden");

                                    BindData();


                                },
                                error: function (err) {
                                    alert(err.statusText);
                                }
                            });
                        }
                        ClearText();
                        //BindData();
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            function UpdateD() {
                var CategoryId = Category.value;
                var subCategoryId = SubCategory.value;
                var countryID = Country.value;
                var StateID = State.value;
                var cityID = city.value;
                var address = txtAddress.value;
                var teamlist = [];
                $("#divFeatures input[id*='chk']:checked").each(function () {
                    teamlist.push($(this).val());
                });
                var rowID = $("label[for='lblRowId']").text();
                var msg = [];
                $.ajax({
                    type: "POST", url: "ws/Sale.asmx/UpdateSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + txtAddress.value.trim() + "','zipcode':'" + $("#zipcode option:selected").text() + "','FeatureID':'" + teamlist + "','amount':'" + txtPrice.value + "','id':'" + rowID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            msg.push("<strong></strong>This Record is Already Exists");
                            $('#divSuccess').css("visibility", "visible");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $('#divSuccess').css("visibility", "visible");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        else if (r.d >= "1") {
                            //msg.push("<strong>Well done ! </strong>Updated Successfully");
                            //$("#divSuccess").html(msg.join(''));
                            //$('#divSuccess').css("visibility", "visible");
                            //setTimeout(function () {
                            //    $('#divSuccess').fadeOut('fast');
                            //}, 2000);

                            //$("#image-holder").empty();
                            //$("#image-holder2").empty();
                            //$("#image-holder3").empty();
                            //$("#image-holder4").empty();

                            ////BindData();

                            //$('#divDetail1').css("visibility", "visible");
                            //$('#divImgbutton').css("visibility", "hidden");
                            //$('#divMoreImages').css("visibility", "hidden");
                            //$('#divsave').css("visibility", "hidden");
                            //$('#divImage').css("visibility", "hidden");
                            //$('#btnUpdate').css("visibility", "hidden");
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
                                url: "UpdateAdvtImages.ashx",
                                type: "POST",
                                contentType: false,
                                processData: false,
                                data: test,
                                success: function (result) {
                                    msg.push("<strong>Well done ! </strong>Updated Successfully");
                                    $("#divSuccess").html(msg.join(''));
                                    $('#divSuccess').css("visibility", "visible");
                                    setTimeout(function () {
                                        $('#divSuccess').fadeOut('fast');
                                    }, 2000);

                                    $("#image-holder").empty();
                                    $("#image-holder2").empty();
                                    $("#image-holder3").empty();
                                    $("#image-holder4").empty();

                                    //

                                    $('#divDetail1').css("visibility", "visible");
                                    $('#divImgbutton').css("visibility", "hidden");
                                    $('#divMoreImages').css("visibility", "hidden");
                                    $('#divsave').css("visibility", "hidden");
                                    $('#divImage').css("visibility", "hidden");
                                    $('#btnUpdate').css("visibility", "hidden");

                                    BindData();


                                    ////$("#FileUpload1").val("");
                                    ////$("#FileUpload2").val("");
                                    ////$("#FileUpload3").val("");
                                    ////$("#FileUpload4").val("");
                                    ////$("#image-holder").empty();
                                    ////$("#image-holder2").empty();
                                    ////$("#image-holder3").empty();
                                    ////$("#image-holder4").empty();

                                    //////BindData();

                                    ////$('#divDetail1').css("visibility", "visible");
                                    ////$('#divImgbutton').css("visibility", "hidden");
                                    ////$('#divMoreImages').css("visibility", "hidden");
                                    ////$('#divsave').css("visibility", "hidden");
                                    ////$('#divImage').css("visibility", "hidden");

                                },
                                error: function (err) {
                                    alert(err.statusText);
                                }
                            });
                        }
                        ClearText();
                        //BindData();
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }

            function ClearText() {
                txtName.value = "";
                txtFeatures.value = "";
                txtAddress.value = "";
                txtContact.value = "";
                txtdescription.value = "";
                txtAddress.value = "";
                txtPrice.value = "0";
                $('#divImgbutton').css("visibility", "hidden");
                $('#divImage').css("visibility", "hidden");
                $('#divMoreImages').css("visibility", "hidden");
                $('#divsave').css("visibility", "hidden");

            }
            $("#btnReset").click(function () {
                ClearText();
            });
            $("#btnCancel").click(function () {
                ClearText();
                window.location.href = "Index.aspx";
            });
            BindState();
            //$('#State').val('5');
            //BindCity();
            //$('#city').val('5');
            //BindStateWiseZipcode();
            //$('#zipcode').val('33554');
            BindData();

            $("#city").change(function () {
                BindStateWiseZipcode();
            });


        });
        function BindData() {
            var pageID = GetParameterValues('pid');
            function GetParameterValues(param) {
                var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < url.length; i++) {
                    var urlparam = url[i].split('=');
                    if (urlparam[0] == param) {
                        return urlparam[1];
                    }
                }
            }

            $('#divAdvtDetail').css("visibility", "visible");
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/SelectAdvertisement", data: "{'Jobtype':'" + pageID + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAdvertisment");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th>Category</th> <th>Sub-Category</th>   <th>Advertisement Title</th><th>Price</th><th>Primary Image</th> <th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + $(docs).find("categoryname").text() + " </td>");
                            cartd.push("<td>" + $(docs).find("name").text() + " </td>");
                            cartd.push("<td>" + $(docs).find("title").text() + " </td>");
                            cartd.push("<td>" + $(docs).find("cost").text() + " </td>");
                            var strTitle = ($(docs).find("title").text());
                            var newstrTitle = strTitle.split(' ').join('-');
                            //This below variable is used to store value of feature of the advertisement
                            var strfeatures = ($(docs).find("features").text());
                            var newstrfeatures = strfeatures.split(' ').join('-');
                            var straddress = ($(docs).find("address").text());
                            var newstraddress = straddress.split(' ').join('-');
                            ////var stremail = ($(docs).find("email").text());
                            //var newstremail = stremail.split(' ').join('-');
                            var contact = ($(docs).find("contactNo").text());
                            var strdescription = ($(docs).find("description").text());
                            var newstrdescription = strdescription.split(' ').join('-');
                            var newimage = ($(docs).find("advMainImage").text());
                            var newcost = ($(docs).find("cost").text());
                            var newzipcode = ($(docs).find("ZipCode").text());
                            var newisFeatured = ($(docs).find("isFeatured").text());
                            var newimage1 = ($(docs).find("advImage1").text());
                            var newimage2 = ($(docs).find("advImage2").text());
                            var newimage3 = ($(docs).find("advImage2").text());

                            cartd.push("<td><img  width='100px' height='100px'   src='Adv_img/" + ($(docs).find("advMainImage").text()) + "' alt='' class='img-responsive'> </td>");
                            cartd.push("<td><input type='button' class='btn btn-primary' onclick=EditRecords('" + ($(docs).find("advertisementID").text()) + "')  value='Edit'/>   <input type='button' class='btn btn-primary' onclick=DeleteRecords('" + ($(docs).find("advertisementID").text()) + "') id='" + ($(docs).find("advertisementID").text()) + "' value='Delete'/></td>");
                            //  cartd.push("<td> <input type='button'  class='btn btn-primary' id='btnEdit' value='Edit'  onclick=ShowPopUp('" + ($(docs).find("advertisementID").text()) + "," + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subcategoryID").text()) + "," + newstrTitle + "," + newstrfeatures + "," + newstraddress + "," + contact + "," + newstrdescription + "," + newimage + "," + newcost + "," + newisFeatured + "," + ($(docs).find("CountryID").text()) + "," + ($(docs).find("StateID").text()) + "," + ($(docs).find("CityID").text()) + "," + newzipcode + "," + newimage1 + "," + newimage2 + "," + newimage3 + "')   id='" + ($(docs).find("advertisementID").text()) + "'     />  <input type='button' class='btn btn-primary' onclick=DeleteRecords('" + ($(docs).find("advertisementID").text()) + "') id='" + ($(docs).find("advertisementID").text()) + "' value='Delete'/><input type='button' class='btn btn-primary' onclick=EditRecords('" + ($(docs).find("advertisementID").text()) + "')  value='NEdit'/></td>");
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divAdvtDetail").html(cartd.join(''));
                    }
                    else {
                        $('#divAdvtDetail').css("visibility", "hidden");
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
        function DeleteRecords(dynar) {
            if (confirm("Are you sure?")) {
                var msg = [];
                $.ajax({
                    type: "POST", url: "ws/Sale.asmx/DeleteDataFromadvertisement", data: "{'advtID':'" + dynar + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            msg.push("<strong></strong>This Record is Already Exists");
                            $('#divSuccess').css("visibility", "visible");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $('#divSuccess').css("visibility", "visible");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        else if (r.d = "1") {

                            alert("Delete Successfully");
                            BindData();
                            //msg.push("<strong>Well done ! </strong>Delete Successfully");
                            //$("#divSuccess").html(msg.join(''));
                            //$('#divSuccess').css("visibility", "visible");
                            //setTimeout(function () {
                            //    $('#divSuccess').fadeOut('fast');
                            //}, 2000);

                            $('#divDetail1').css("visibility", "hidden");
                            $('#divImgbutton').css("visibility", "hidden");
                            $('#divMoreImages').css("visibility", "hidden");
                            $('#divsave').css("visibility", "hidden");
                            $('#divImage').css("visibility", "hidden");
                            $('#btnUpdate').css("visibility", "hidden");


                        }


                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                })
            }
        }

        function EditRecords(dynar) {
            $('#divDetail').css("visibility", "visible");
            $("#btnAddNew").attr("disabled", "disabled");
            $('#divDetail1').css("visibility", "visible");
            $('#divImage').css("visibility", "visible");
            $('#divMoreImages').css("visibility", "visible");
            $('#divsave').css("visibility", "visible");
            $('#btnSubmit').css("visibility", "hidden");
            $('#btnUpdate').css("visibility", "visible");
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/ViewAdvertisementDetails", data: "{'adID':'" + dynar + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("FullDetailsAdvertisments");
                        $.each(docs, function (i, docs) {
                            $("label[for='lblRowId']").text($(docs).find("advertisementID").text());
                            Category.value = $(docs).find("CategoryID").text();
                            BindSubCategory();
                            SubCategory.value = $(docs).find("subcategoryID").text();
                            txtName.value = $(docs).find("title").text();
                            txtFeatures.value = $(docs).find("features").text();
                            txtAddress.value = $(docs).find("address").text();
                            txtContact.value = $(docs).find("contactNo").text();
                            txtdescription.value = $(docs).find("description").text();
                            var sd = [];
                            sd.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advMainImage").text() + "'/> ");
                            $("#image-holder").html(sd.join(''));
                            txtPrice.value = $(docs).find("cost").text();
                            Country.value = $(docs).find("CountryID").text();
                            BindState();
                            State.value = $(docs).find("StateID").text();
                            //BindCity();
                            city.value = $(docs).find("CityID").text();


                            var sd1 = [];
                            sd1.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage1").text() + "'/> ");
                            $("#image-holder2").html(sd1.join(''));

                            var sd2 = [];
                            sd2.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage2").text() + "'/> ");
                            $("#image-holder3").html(sd2.join(''));

                            var sd3 = [];
                            sd3.push("<img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage3").text() + "'/> ");
                            $("#image-holder4").html(sd3.join(''));


                            BindStateWiseZipcode();
                            zipcode.value = $(docs).find("ZipCode").text();

                        });

                    }


                },
                failure: function (response) {
                    alert(response.d + "Fail");
                },
                error: function (response) {
                    alert(response.d + "Error...");
                }
            })
        }




        function ShowPopUp(dynar) {
            $('#divDetail').css("visibility", "visible");
            $("#btnAddNew").attr("disabled", "disabled");
            $('#divDetail1').css("visibility", "visible");
            $('#divImage').css("visibility", "visible");
            $('#divMoreImages').css("visibility", "visible");
            $('#divsave').css("visibility", "visible");
            $('#btnSubmit').css("visibility", "hidden");
            $('#btnUpdate').css("visibility", "visible");
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
                    //else if (i == 6) {
                    //    if (array[i] == '') {
                    //        txtEmail.value = "";
                    //    }
                    //    else {
                    //        var email = array[i].toString();
                    //        var email1 = email.replace('-', ' ');
                    //        txtEmail.value = email1;
                    //    }
                    //}
                else if (i == 6) {
                    if (array[i] == '') {
                        txtContact.value = "";
                    }
                    else {
                        var contact = array[i].toString();
                        txtContact.value = contact;
                    }
                }

                else if (i == 7) {
                    if (array[i] == '') {
                        txtdescription.value = "";
                    }
                    else {
                        var description = array[i].toString();
                        txtdescription.value = description;
                    }
                }

                else if (i == 8) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder").html(sd.join(''));

                    }
                }
                else if (i == 9) {
                    if (array[i] == '') {
                        txtPrice.value = "";
                    }
                    else {
                        var cost = array[i].toString();
                        txtPrice.value = cost;
                    }
                }


                else if (i == 10) {
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
                else if (i == 11) {
                    if (array[i] == '') {

                    }
                    else {
                        Country.value = array[i];
                    }
                }
                else if (i == 12) {
                    if (array[i] == '') {

                    }
                    else {
                        //BindState();
                        State.value = array[i];
                    }
                }
                else if (i == 13) {
                    if (array[i] == '') {

                    }
                    else {
                        //BindCity();
                        city.value = array[i];
                    }
                }
                else if (i == 14) {
                    if (array[i] == '') {
                        zipcode.value = "";
                    }
                    else {
                        //BindStateWiseZipcode();
                        var zipcode = array[i].toString();
                        zipcode.value = zipcode;
                    }
                }
                else if (i == 15) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder2").html(sd.join(''));


                    }
                }
                else if (i == 16) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder3").html(sd.join(''));

                    }
                }
                else if (i == 17) {
                    if (array[i] == '') {

                    }
                    else {
                        var sd = [];
                        sd.push("<img class='thumb-image' src='../Associate/Adv_img/" + array[i].toString() + "'/> ");
                        $("#image-holder4").html(sd.join(''));

                    }
                }


            }

        }


        function BindStateWiseZipcode() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#State option:selected").text() + "', 'CityID':'" + city.value + "'}",
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
                        $("#zipcode").html(cartd.join(''));
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
                        cartd.push("<option value=0>Select Country</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("countryid").text() + "'>" + $(docs).find("countryid").text() + "</option>");
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

        function BindCategory(jobcate) {
            $.ajax({
                type: "POST", url: "ws/Category.asmx/JobtypeWiseCategory", data: "{'flag':'1','jobtype':'" + jobcate + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
        function BindState() {
            //$("#city").empty();
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
                            cartd.push(" <option value='" + $(docs).find("stateid").text() + "'>" + $(docs).find("stateid").text() + "</option>");
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
        function BindSubCategory() {
            var CategoryId = Category.value;
            $.ajax({
                type: "POST", url: "ws/subCategory.asmx/CategoryWiseSubCategoryOfAssociate", data: "{'Categoryid':'" + CategoryId + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("associatesubCategories");
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
    </script>
</asp:Content>
