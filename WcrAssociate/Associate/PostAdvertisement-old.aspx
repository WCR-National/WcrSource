<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="PostAdvertisement-old.aspx.cs" Inherits="WcrAssociate.Associate.PostAdvertisement_old" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-2.1.1.min.js">
    </script> 
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#postadtsclick").addClass("active");
        });
    </script>
    <div class="row">
        <div class="col-sm-12 dashboard-block">
            <h1>Post a Sales Advertisement </h1>
            <p>
                Billing information is current up to the next upcoming billing cycle. 
                Billing cycles start on the 1st of every month. Charges for your current purchases will be applied on the first of every month. 
                For questions or concerns please contact customer support.
            </p>
            <h3 class="page-subtitle">SALES CATEGORY DETAILS  </h3>
            <div class="row sumary-detail-colume space-5">
                <div class="col-sm-6">
                    <div class="full-row list-detail-block ">
                        <h4>Your Current Sales Category Purchases </h4>
                        <ul class="detail-listing">
                            <li>Total count of items Purchased <span class="badge">
                                <label id="lblPurchaseCategories"></label>
                            </span></li>
                            <li>Total amount due at the start of the next billing Cycle: <span class="badge">
                                <label id="lblTotalamount"></label>
                            </span></li>
                            <li>Next Billing Cycle Starts : <span class="badge">
                                <label id="lblBillingDate"></label>
                            </span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="full-row button-block ">
                        <button type="button" id="btnpurchasenew">
                            <i class="fa fa-plus"></i><span class="cancel">Cancel Your Selections </span><span class="add">Purchase New Sales Category </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="full-row custome-block">
                <h3 class='page-subtitle text-uppercase'>Your Purchased Categories  </h3>
                <div class="table-responsive grid-block data-table">
                    <div class="uk-overflow-container" style="visibility: hidden" id="ViewAllPurchasedRcd"></div>
                </div>
            </div>
            <hr />
            <div id="divpurchaseCategories" style="display: none">
                <div class="full-row your-search-result form-horizontal" style="background-color: #E4F1FA">
                    <h4>Select Your Sales Category / Subcategory For Purchase  </h4>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">Select a Category  </label>
                            <div class="col-sm-7">
                                <select class="form-control" id="aCategory"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">Subcategory </label>
                            <div class="col-sm-7">
                                <select class="form-control" id="aSubCategory"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="full-row your-search-result form-horizontal " id="divSelectedChce" style="background-color: #E4F1FA; display: none;">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <%--<h4>Your Selected Choices:  </h4>--%>
                            <div class="full-row your-selected-choice nobg-pd ">
                                <h4>Your Selected Choices For Purchase </h4>
                                <div id="ViewRcd"></div>
                            </div>
                        </div>
                        <div class="form-group" id="purchasebutton" style="display: none;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="ViewPurchasedRcd">
                            </div>
                            <div class="col-sm-9  text-right" style="margin-bottom: 15px">
                                <span class="pull-left">
                                    <input type="button" class="btn btn-primary" id="btnreset1" value="Reset" style="visibility: hidden;" />
                                    <input type="button" class="btn btn-primary" id="btnCancel1" value="Cancel" style="visibility: hidden;" />
                                </span>
                                <input type="button" class="btn btn-primary" id="btncheckout" value="Submit" style="visibility: hidden;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="alert alert-success">
                <i class="fa fa-exclamation-triangle"></i><span>Once a sales category has been selected and purchased, you can now post your sales advertisement.
                <br />
                    <strong>A monthly fee is applied per up to 15 advertisements. </strong></span>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <h3 class="page-subtitle">SALES ADVERTISEMENT DETAILS</h3>
            <div class="row sumary-detail-colume space-5">
                <div class="col-sm-6">
                    <div class="full-row list-detail-block ">
                        <h4>Your Current Sales Advertisement </h4>
                        <ul class="detail-listing">
                            <li>Total count of Post Advertisement  <span class="badge">
                                <label id="lblPurchaseCategories1"> </label>
                            </span></li>
                            <li>Total amount due at the start of the next billing Cycle: <span class="badge">
                                <label id="lblTotalamount2"></label>
                            </span></li>
                            <li>Next Billing Cycle Starts :  <span class="badge">
                                <label id="lblPurchaseCategoriesdd"></label>
                            </span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="full-row button-block1">
                        <button type="button" id="btnNewadd">
                            <i class="fa fa-plus"></i>
                            <span class="add">Post A New  Advertisement 
                            </span>
                            <span class="cancel">Cancel Your Selection </span>
                        </button>
                    </div>
                    <%-- <div class="full-row button-block ">
                        <button type="button" id="btnpurchasenew"><i class="fa fa-plus"></i><span class="cancel">Cancel Your Selection </span><span class="add">Purchase New Zip Code </span></button>
                    </div>--%>
                </div>
            </div>
            <div class="full-row sumary-detail-colume data-table">
                <div class="table-responsive grid-block">
                    <div class="uk-overflow-container" id="divAdvtDetail">
                    </div>
                </div>
            </div>
            <div class="full-row your-search-result form-horizontal post-advertiment-tab" id="addForm" style="display: none; background: #E4F1FA; padding: 20px 25px 10px 25px;">
                <div class="form-group">
                    <div class="col-sm-12">
                        <label class="hightlight-text" for="lblpTitle"></label>
                    </div>
                </div>
                <div class=" full-row form-horizontal ">
                    <div class="form-group">
                        <label class="col-sm-12" style="font-weight: normal">Select which consumer segment your wish to advertise in  </label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-4">
                            <select class="form-control" id="Category"></select>
                        </div>
                        <div class="col-sm-4">
                            <select class="form-control" id="SubCategory"></select>
                        </div>
                    </div>
                    <hr />
                    <ul class="nav nav-tabs " role="tablist">
                        <li role="presentation" class="active"><a href="#primaryImage" aria-controls="home" role="tab" data-toggle="tab">Primary Image</a></li>
                        <li role="presentation"><a href="#overview" id="defaultOpen" aria-controls="profile" role="tab" data-toggle="tab">Overview</a></li>
                        <li role="presentation"><a href="#feature" id="defaultOpen1" aria-controls="messages" role="tab" data-toggle="tab">Feature</a></li>
                        <li role="presentation"><a href="#location" id="defaultOpen2" aria-controls="settings" role="tab" data-toggle="tab">Location</a></li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="primaryImage">
                            <div class="form-group">
                                <div class="col-sm-6">
                                    <div id="divImage">
                                        <div class="row">
                                            <div class="col-sm-7">
                                                <label>
                                                    <b>Primary Image</b>
                                                </label>
                                                <input type="file" class="form-control" id="FileUpload1" />
                                                <div id="image-holder"></div>
                                            </div>
                                            <div class=" col-sm-5">
                                                <input id="AddMore" type="button" style="display: none;" class="btn btn-default btn-block align-with-uplabel" value="Add" />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="divsImage" style="display: none">
                                        <div class="row">
                                            <div class="col-sm-7" style="float: left">
                                                <label>Additional Image</label>
                                                <input type="file" class="form-control" id="FileUpload2" />
                                                <div id="image-holder2"></div>
                                            </div>
                                            <div class="col-sm-5">
                                                <input id="AddMore2" style="display: none;" type="button" class="btn btn-default btn-block align-with-uplabel" value="Add" />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="divthrdImage" style="display: none">
                                        <div class="col-sm-7" style="float: left">
                                            <label>Additional Image</label>
                                            <input type="file" class="form-control" id="FileUpload3" />
                                            <div id="image-holder3"></div>
                                        </div>
                                        <div class="col-sm-5">
                                            <input id="AddMore3" style="display: none;" type="button" class="btn btn-default btn-block align-with-uplabel" value="Add" />
                                        </div>
                                    </div>
                                    <div id="divfourthImage" style="display: none">
                                        <div class="col-sm-7" style="float: left">
                                            <label>Additional Image</label>
                                            <input type="file" class="form-control" id="FileUpload4" />
                                            <div id="image-holder4"></div>
                                        </div>
                                        <div class="col-sm-5">
                                            <input id="AddMore4" style="display: none;" type="button" class="btn btn-default btn-block align-with-uplabel" value="Add" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class=" col-sm-5 pull-right">
                                            <input id="Imgbutton" style="display: none" type="button" class="btn btn-default btn-block " value="Add More Image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div id="divImgbutton" style="display: block">
                                        <div id="ViewAllImages" style="visibility: visible;">
                                            <div id="Allimage-holder" class="upload_img-thumbnail"></div>
                                            <div id="Allimage-holder1" class="upload_img-thumbnail"></div>
                                            <div id="Allimage-holder2" class="upload_img-thumbnail"></div>
                                            <div id="Allimage-holder3" class="upload_img-thumbnail"></div>
                                            <%-- </div>--%>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="overview">
                            <label>Overview </label>
                            <div class="form-group">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <input type="text" id="txtName" class="form-control" placeholder=" Title" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <input id="txtPrice" class="form-control" placeholder="Price (Whole dollar amount)" type="text" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" />
                                            <span id="error" style="color: Red; display: none">* Input digits (0 - 9)</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <textarea class="form-control" id="txtdescription" cols="" rows="4" placeholder="Description"></textarea>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="feature">
                            <label>Feature </label>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <div id="divFeatures"></div>
                                    <label style="display: none" for="lblRowId"></label>
                                    <%-- <label style="display: none" for="lblCatPrice"></label>--%>
                                    <textarea class="form-control" id="txtFeatures" cols="" rows="8" placeholder="Additional Features"></textarea>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="location">
                            <label>Location </label>
                            <div class="form-group">
                                <div class="col-sm-6">
                                    <input type="text" id="txtContact" class="form-control" placeholder="Contact No" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" />
                                    <span id="error1" style="color: Red; display: none">* Input digits (0 - 9)</span>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" id="txtAddress" placeholder="address" class="form-control" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-6">
                                    <input type="text" id="city" class="form-control" placeholder="City" />
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control" id="State">
                                        <option>Select State</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-6">
                                    <%--<select class="form-control" id="Country">
                                        <option>Select Country</option>
                                    </select>--%>
                                     <input type="text" id="Country" class="form-control"  value="US" />
                                 
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control" id="zipcode">
                                        <option>Select ZipCode</option>
                                    </select>
                                </div>
                                <%--<h3 class="box-title">
                        <input id="btnAddNew" type="button" class="btn btn-primary" value="Add New Advertisement" /></h3>--%>
                                <!-- /.box-header -->
                                <%--<div class="box-body  form-horizontal" id="divDetail" style="visibility: hidden">
                    <div class="form-group">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <select class="form-control" id="Category"></select> 
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                           <select class="form-control" id="SubCategory"></select>
                        </div>
                    </div>
                </div>--%>
                                <hr />
                                <div class="clearfix"></div>
                                <div id="divDetail1" style="visibility: hidden">
                                    <div id="divsave" style="display: none">
                                        <div class="full-row m-t-15">
                                            <div class="col-sm-12">
                                                <input id="btnReset" type="button" class="btn btn-primary" value="RESET" />
                                                <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                                            </div>
                                        </div>
                                    </div>
                                    <div role="alert" id="divSuccess" class="alert alert-success" style="display: none">
                                    </div>
                                </div>
                                <!-- /.box-body -->
                            </div>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: 15px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input id="btnSubmit" type="button" class="btn btn-default" value="SUBMIT" />
                            <input id="btnUpdate" type="button" class="btn btn-default pull-right" value="UPDATE" style="display: none" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 dashboard-block">
            <div class=" customebox full-row">
                <div class="form-group">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div id="Shop">
                            <table class="table table-condensed">
                                <tr>
                                    <td colspan="2" style="display: none"><%--Membership Plan:---%>
                                        <select name="select" id="MemberShip" style="visibility: hidden"></select>
                                        <br />
                                        <label style="visibility: hidden" for="lblCatPrice"></label>
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
    </div>
    <div class="clearfix"></div>
    <script>
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
            var sts = 0;
            $("#btnpurchasenew").click(function () {
                if (sts == 0) {
                    $(".button-block ").addClass("disable");
                    $("#divpurchaseCategories").css("display", "block");
                    //$("#divSelectedChce").css("display", "none");
                    //$("#ViewPurchasedRcd").css("display", "none");
                    RemoveCardSessions();
                    sts = 1;
                }
                else if (sts == 1) {

                    $("#divpurchaseCategories").css("display", "none");
                    $("#divSelectedChce").css("display", "none");
                    $("#ViewPurchasedRcd").css("display", "none");
                    $("#purchasebutton").css("display", "none");
                    $(".button-block ").removeClass("disable");
                    sts = 0;
                    BindAllCategory();
                }
            });
            //$("#btnNewadd").click(function () {
            //    $("#addForm").css("display", "block");
            //    $(".button-block.btnNewadd ").addClass("disable");
            //});
            var sts1 = 0;
            $("#btnNewadd").click(function () {
                if (sts1 == 0) {
                    $(".button-block1").addClass("disable");
                    $("#addForm").css("display", "block");
                    sts1 = 1;
                }
                else if (sts1 == 1) {
                    $("#addForm").css("display", "none");
                    $(".button-block1").removeClass("disable");
                    sts1 = 0;
                }
            });
            //$("#btnpurchasenew").click(function () {
            //    $("#divpurchaseCategories").css("display", "block");
            //    $(".button-block.btnpurchasenew ").addClass("disable");
            //    RemoveCardSessions();
            //});

            var now = new Date();
            var current;
            if (now.getMonth() == 11) {
                current = new Date(now.getFullYear() + 1, 0, 1).format('yyyy-MM-dd');
            } else {
                current = new Date(now.getFullYear(), now.getMonth() + 1, 1).format('yyyy-MM-dd');
            }
            $("#lblBillingDate").text(current);
            $("#lblPurchaseCategoriesdd").text(current);
            function RemoveCardSessions() {
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/RemoveCardSessions",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json", async: true,
                    success: function (r) {
                    },
                    failure: function (response) {
                        alert(response.d + "Fail");
                    },
                    error: function (response) {
                        alert(response.d + "Error...");
                    }
                });
            }
            var countimg = 0;
            $("#AddMore").click(function () {
                countimg = 1;
                $('#divImage').css("display", "none");
                //$("#Imgbutton").attr("disabled", "true");
                $("#Imgbutton").attr("disabled", false);
                if (typeof (FileReader) != "undefined") {
                    var image_holderAll = $("#Allimage-holder");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //   $("<b>Primary Image</b><span style='margin-left:150px;'></span>").appendTo(image_holderAll);
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holderAll);
                        //$("<input id='RemoveImg123' type='button'  class='btn btn-primary' value='Remove Image' />").appendTo(image_holderAll);
                    }
                    image_holderAll.show();
                    reader.readAsDataURL($("#FileUpload1")[0].files[0]);
                    $("#Imgbutton").css("display", "block");
                } else {
                    alert("This browser does not support FileReader.");
                }
            });
            function RemoveImg1(rrr) {
                if (rrr == 1) {
                    $("#FileUpload1").val("");
                    $("#image-holder").empty();
                    $('#divImage').css("display", "block");
                    $("#Imgbutton").attr("disabled", false);
                }
            }
            $("#AddMore2").click(function () {
                countimg = 2;
                $('#divsImage').css("display", "none");
                $("#Imgbutton").attr("disabled", false);
                if (typeof (FileReader) != "undefined") {
                    var image_holderAll = $("#Allimage-holder1");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        // $("<b>Additional Image</b><span style='margin-left:150px;'></span>").appendTo(image_holderAll);
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holderAll);
                    }
                    image_holderAll.show();
                    reader.readAsDataURL($("#FileUpload2")[0].files[0]);
                    $("#Imgbutton").css("display", "block");

                } else {
                    alert("This browser does not support FileReader.");
                }
            });

            $("#AddMore3").click(function () {
                countimg = 3;
                $("#divthrdImage").css("display", "none");
                $("#Imgbutton").attr("disabled", false);
                if (typeof (FileReader) != "undefined") {
                    var image_holderAll = $("#Allimage-holder2");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //$("<b>Additional Image</b><span style='margin-left:150px;'></span>").appendTo(image_holderAll);
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holderAll);
                    }
                    image_holderAll.show();
                    reader.readAsDataURL($("#FileUpload3")[0].files[0]);
                    $("#Imgbutton").css("display", "block");

                } else {
                    alert("This browser does not support FileReader.");
                }
            });

            $("#AddMore4").click(function () {
                countimg = 4;
                $("#divfourthImage").css("display", "none");
                $("#Imgbutton").attr("disabled", true);
                if (typeof (FileReader) != "undefined") {
                    var image_holderAll = $("#Allimage-holder3");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //$("<b>Additional Image</b><span style='margin-left:150px;'></span>").appendTo(image_holderAll);
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image", "width": "75px", "height": "75px"
                        }).appendTo(image_holderAll);
                        //$("<a href='#'> Remove </a>").appendTo(image_holderAll);
                    }
                    image_holderAll.show();
                    reader.readAsDataURL($("#FileUpload4")[0].files[0]);
                    $("#Imgbutton").css("display", "block");

                } else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#RemoveImg1").click(function () {
                $("#FileUpload1").val("");
                $("#Allimage-holder").empty();
                $('#divImage').css("display", "block");
                $("#Imgbutton").attr("disabled", false);
            });

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
                    $('#divsave').css("display", "block");
                    $('#AddMore').css("display", "block");

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
                    $('#AddMore2').css("display", "block");
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
                    $('#AddMore3').css("display", "block");
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
                    $('#AddMore4').css("display", "block");
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
                $("label[for='lblpTitle']").text("Post A New Advertisement");
                BindCategory(1);
            }
            else {
                $("label[for='lblpTitle']").text("Services Advertisements");
                BindCategory(2);
            }
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
                    $("#Imgbutton").css("display", "none");
                    $('#divDetail1').css("visibility", "visible");
                    $('#divImgbutton').css("display", "block");

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
            //$(function () {
            //    $("#Country").change(function () {
            //        BindState();
            //    });
            //});
            $(function () {
                $("#State").change(function () {
                    BindStateWiseZipcode();
                });
            });
            $(function () {
                $("#city").change(function () {
                    BindStateWiseZipcode();
                });
            });
            //$(function () {
            //    $("#zipcode").change(function () {
            //        $('#divImgbutton').css("visibility", "visible");
            //    });
            //});

            $("#Imgbutton").click(function () {
                if (countimg == 0) {
                    $('#Imgbutton').css("display", "none");
                    $('#divImage').css("display", "block");
                    $('#divsImage').css("display", "none");
                    $('#divthrdImage').css("display", "none");
                    $('#divfourthImage').css("display", "none");
                }
                else if (countimg == 1) {
                    $('#Imgbutton').css("display", "none");
                    $('#divImage').css("display", "none");
                    $('#divsImage').css("display", "block");
                    $('#divthrdImage').css("display", "none");
                    $('#divfourthImage').css("display", "none");
                }
                else if (countimg == 2) {
                    $('#Imgbutton').css("display", "none");
                    $('#divImage').css("display", "none");
                    $('#divsImage').css("display", "none");
                    $('#divthrdImage').css("display", "block");
                    $('#divfourthImage').css("display", "none");
                }
                else if (countimg == 3) {
                    $('#Imgbutton').css("display", "none");
                    $('#divImage').css("display", "none");
                    $('#divsImage').css("display", "none");
                    $('#divthrdImage').css("display", "none");
                    $('#divfourthImage').css("display", "block");

                }
                else { }
                $("#Imgbutton").attr("disabled", "disabled");
                $('#Imgbutton').css("display", "none");

            });
            $("#btnSubmit").click(function () {
                $('#defaultOpen').css("background-color", "#1776c9");
                $('#defaultOpen1').css("background-color", "#1776c9");
                $('#defaultOpen2').css("background-color", "#1776c9");
                var check = Valid1();
                if (check == 0) {
                    $.ajax({
                        type: "POST",
                        url: "ws/Sale.asmx/CountAssociateAdvertisements",
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (r1) {
                            if (r1.d.length > 0) {
                                var xmlDoc1 = $.parseXML(r1.d);
                                var xml1 = $(xmlDoc1);
                                var docs1 = xml1.find("AssociateAdvertisements");
                                $.each(docs1, function (i, docs1) {
                                    if ($(docs1).find("totalAdts").text() < 15) {
                                        InsertD();
                                    }
                                    else {
                                        alert("YOU'VE REACHED THE MAXIMUM ALLOWED NUMBER OF SALES ADVERTISEMENT POSTS");
                                        return false;
                                    }
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
                var _price = 0;
                if (txtPrice.value == "") {
                    _price = 0;
                }
                else {
                    _price = txtPrice.value;
                }
                //var email = txtEmail.value;
                //var teamlist = [];
                //$("#divFeatures input[id*='chk']:checked").each(function () {
                //    teamlist.push($(this).val());
                //});
                var msg = [];
                $.ajax({
                    //type: "POST", url: "ws/Sale.asmx/InsertSale", data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + txtAddress.value.trim() + "','zipcode':'" + $("#zipcode option:selected").text() + "','isFeatured':'" + Isfeatured + "','FeatureID':'" + teamlist + "','jobtype':'" + pageID + "','amount':'" + txtPrice.value + "'}",
                    type: "POST", url: "ws/Sale.asmx/InsertSale",
                    data: "{'CategoryId':'" + CategoryId + "','SubCategoryId':'" + subCategoryId + "','title':'" + txtName.value + "','Features':'" + txtFeatures.value.trim() + "','address':'" + address.trim() + "','contactNo':'" + txtContact.value + "','description':'" + txtdescription.value.trim() + "','countryID':'" + countryID + "','StateID':'" + StateID + "','cityID':'" + cityID + "','address':'" + txtAddress.value.trim() + "','zipcode':'" + $("#zipcode option:selected").text() + "','isFeatured':'" + Isfeatured + "','jobtype':'" + pageID + "','amount':'" + _price + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.d == "-1") {
                            msg.push("<strong></strong>This Record is Already Exists");
                            $('#divSuccess').css("display", "block");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $('#divSuccess').css("display", "block");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        else if (r.d >= "1") {
                            //$.ajax({
                            //    type: "POST",
                            //    url: "ws/CategoryPurchase.asmx/InsertAmount",
                            //    data: "{'amount':20}",
                            //    contentType: "application/json; charset=utf-8",
                            //    dataType: "json",
                            //    async: false,
                            //    cache: false,
                            //    success: function (r1) {
                            //        if (r1.d == "1") {
                            //$.ajax({
                            //    type: "POST", url: "ws/Sale.asmx/UpdatePostAdvertisementsCost",
                            //    data: "{'advtID':'" + r.d + "','amount':20}",
                            //    contentType: "application/json; charset=utf-8",
                            //    dataType: "json",
                            //    async: false,
                            //    success: function (r2) {
                            //        if (r2.d == "1") {


                            //Code is for main Image
                            var fileUpload = $("#FileUpload1").get(0);
                            var files = fileUpload.files;
                            var test = new FormData();

                            //Code is for Second Image
                            var secondupload = $("#FileUpload2").get(0);
                            var files2 = secondupload.files;
                            //var test2 = new FormData();

                            //Code is for Third Image
                            var thirdupload = $("#FileUpload3").get(0);
                            var files3 = thirdupload.files;
                            //var test3 = new FormData();

                            //Code is for Fourth Image
                            var fourthupload = $("#FileUpload4").get(0);
                            var files4 = fourthupload.files;
                            //var test4 = new FormData();
                            for (var i = 0; i < files.length; i++) {
                                test.append(files[i].name, files[i], r.d);

                                if ($("#FileUpload2").val() == '') {
                                }
                                else {
                                    test.append(files2[i].name, files2[i], r.d);
                                }
                                if ($("#FileUpload3").val() == '') {
                                }
                                else {
                                    test.append(files3[i].name, files3[i], r.d);
                                }
                                if ($("#FileUpload4").val() == '') {
                                }
                                else {
                                    test.append(files4[i].name, files4[i], r.d);
                                }
                            }

                            $.ajax({
                                url: "UploadHandler.ashx",
                                type: "POST",
                                contentType: false,
                                processData: false,
                                data: test,
                                success: function (result) {
                                    alert("Submitted Successfully");
                                    $("#FileUpload1").val("");
                                    $("#FileUpload2").val("");
                                    $("#FileUpload3").val("");
                                    $("#FileUpload4").val("");

                                    $("#image-holder").empty();
                                    $("#image-holder2").empty();
                                    $("#image-holder3").empty();
                                    $("#image-holder4").empty();

                                    $("#Allimage-holder").empty();
                                    $("#Allimage-holder1").empty();
                                    $("#Allimage-holder2").empty();
                                    $("#Allimage-holder3").empty();


                                    $("#btnAddNew").removeAttr('disabled');
                                    BindData();
                                    window.location.href = 'PostAdvertisement.aspx?pid=1';

                                },
                                error: function (err) {
                                    alert(err.statusText);
                                }
                            });
                        }
                        //    }
                        //});

                        //        }
                        //        if (r.d == "0") {
                        //            alert("OOPS Error ! Please try again.");
                        //        }
                        //        if (r.d == "3") {
                        //            alert("OOPS Error ! Please try again.");
                        //        }
                        //    },
                        //    failure: function (response) {
                        //        alert(response.d + "Fail");
                        //    },
                        //    error: function (response) {
                        //        alert(response.d + "Error...");
                        //    }
                        //});



                        //}
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
                            $('#divSuccess').css("display", "block");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $('#divSuccess').css("display", "block");
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
                                if ($("#FileUpload1").val() == '') {
                                }
                                else {
                                    test.append(files[i].name, files[i], r.d);
                                }
                                if ($("#FileUpload2").val() == '') {
                                }
                                else {
                                    test.append(files2[i].name, files2[i], r.d);
                                }
                                if ($("#FileUpload3").val() == '') {
                                }
                                else {
                                    test.append(files3[i].name, files3[i], r.d);
                                }
                                if ($("#FileUpload4").val() == '') {
                                }
                                else {
                                    test.append(files4[i].name, files4[i], r.d);
                                }
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
                                    $('#divSuccess').css("display", "block");
                                    setTimeout(function () {
                                        $('#divSuccess').fadeOut('fast');
                                    }, 2000);

                                    $("#image-holder").empty();
                                    $("#image-holder2").empty();
                                    $("#image-holder3").empty();
                                    $("#image-holder4").empty();

                                    $("#Allimage-holder").empty();
                                    $("#Allimage-holder1").empty();
                                    $("#Allimage-holder2").empty();
                                    $("#Allimage-holder3").empty();

                                    $("#Imgbutton").attr("disabled", true);
                                    $('#divDetail').css("visibility", "hidden");
                                    $('#divDetail1').css("visibility", "hidden");

                                    $('#divImgbutton').css("display", "none");
                                    $('#divMoreImages').css("visibility", "hidden");
                                    $('#divsave').css("visibility", "hidden");
                                    $('#divImage').css("display", "none");
                                    $('#btnUpdate').css("visibility", "hidden");
                                    $("#btnAddNew").attr("disabled", true);
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

            function ClearText() {
                txtName.value = "";
                txtFeatures.value = "";
                txtAddress.value = "";
                txtContact.value = "";
                txtdescription.value = "";
                txtAddress.value = "";
                txtPrice.value = "0";
                $('#divImgbutton').css("display", "none");
                $('#divImage').css("display", "none");
                $('#divMoreImages').css("visibility", "hidden");
                $('#divsave').css("visibility", "hidden");

            }
            $("#btnReset").click(function () {
                ClearText();
            });
            $("#btnCancel").click(function () {
                ClearText();
                window.location.href = "Dashboard.aspx";
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

                                ApplycoponCode(a, b, c);

                            }

                            else {
                                if (confirm("Are you sure you want to add Credit Card?")) {
                                    var totalAmount = $("label[for='lblToalAmount1']").text();
                                    window.location.href = 'CreditCard.aspx?amt=' + totalAmount;
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
                    type: "POST", url: "ws/CategoryPurchase.asmx/SelectAllPurchasedCartData",
                    data: "{}",
                    contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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

                            var pvalue = $("label[for='lblCatPrice']").text();
                            if (pvalue == 0) {
                                $("#purchasebutton").css("display", "none");
                                $("#divSuccess").css({ "diplay": "block" });
                                msg.push("<strong>Well done ! </strong>Purchased Successfully");
                                setTimeout(function () {
                                    $('#divSuccess').fadeOut('fast');
                                }, 2000);
                                AssociatealreadyCategories();
                            }
                            else {
                                // This Web Services is used to send amount to be transaction, right now it is not in use because card data stuff is moved from db
                                var MonthValue = MemberShip.value;
                                var totalAmount = $("label[for='lblCatPrice']").text();
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
                                            $("#purchasebutton").css({ "diplay": "none" });
                                            $("#divSelectedChce").css({ "diplay": "none" });
                                            AssociatealreadyCategories();
                                            alert("Purchased Successfully.");
                                            RemoveCardSessions();

                                        }
                                        else if (r.d == "0") {
                                            alert("Already Exists");
                                        }
                                        else if (r.d == "3") {
                                            alert("OOPS Error ! Please try again.");
                                        }
                                        else { }
                                    },
                                    failure: function (response) {
                                        alert(response.d + "Fail");
                                    },
                                    error: function (response) {
                                        alert(response.d + "Error...");
                                    }
                                });
                                //end here
                            }


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
                        cartd.push("<tr><th>Primary Image</th><th>Category</th> <th>Sub-Category</th>   <th>Advertisement Title</th><th>Price</th> <th> Action </th> </tr>");
                        var count = 0;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td><img  width='80px' height='80px'   src='Adv_img/" + ($(docs).find("advMainImage").text()) + "' alt='' class='img-responsive'> </td>");
                            cartd.push("<td class='hightlight-label'>" + $(docs).find("categoryname").text() + " </td>");
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
                            cartd.push("<td class='hightlight-label'><i class='fa fa-edit' onclick=EditRecords('" + ($(docs).find("advertisementID").text()) + "') > </i>   <i class='fa fa-trash' onclick=DeleteRecords('" + ($(docs).find("advertisementID").text()) + "') id='" + ($(docs).find("advertisementID").text()) + "'> </i></td>");
                            //  cartd.push("<td> <input type='button'  class='btn btn-primary' id='btnEdit' value='Edit'  onclick=ShowPopUp('" + ($(docs).find("advertisementID").text()) + "," + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subcategoryID").text()) + "," + newstrTitle + "," + newstrfeatures + "," + newstraddress + "," + contact + "," + newstrdescription + "," + newimage + "," + newcost + "," + newisFeatured + "," + ($(docs).find("CountryID").text()) + "," + ($(docs).find("StateID").text()) + "," + ($(docs).find("CityID").text()) + "," + newzipcode + "," + newimage1 + "," + newimage2 + "," + newimage3 + "')   id='" + ($(docs).find("advertisementID").text()) + "'     />  <input type='button' class='btn btn-primary' onclick=DeleteRecords('" + ($(docs).find("advertisementID").text()) + "') id='" + ($(docs).find("advertisementID").text()) + "' value='Delete'/><input type='button' class='btn btn-primary' onclick=EditRecords('" + ($(docs).find("advertisementID").text()) + "')  value='NEdit'/></td>");
                            cartd.push("</tr>");
                            var a = $(docs).find("Amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                            count++;
                        });
                        $("#lblPurchaseCategories1").text(count);
                        $("#lblTotalamount2").text(Totalamount);


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
                            $('#divSuccess').css("display", "block");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () {
                                $('#divSuccess').fadeOut('fast');
                            }, 2000);
                        }
                        if (r.d == "3") {
                            msg.push("<strong></strong>OOPS Error ! Please try again.");
                            $('#divSuccess').css("display", "block");
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

                            $('#divImgbutton').css("display", "none");
                            $('#divMoreImages').css("visibility", "hidden");
                            $('#divsave').css("visibility", "hidden");
                            $('#divImage').css("display", "none");
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
            $("#addForm").css("display", "block");
            $('#divDetail').css("visibility", "visible");
            $("#btnAddNew").attr("disabled", "disabled");
            $('#divDetail1').css("visibility", "visible");
            $('#divImage').css("display", "none");

            $('#divsave').css("display", "block");
            $('#btnSubmit').css("display", "none");
            $('#btnUpdate').css("display", "block");

            $('#divImgbutton').css("display", "block");
            $('#ViewAllImages').css("visibility", "visible");

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
                            sd.push("<span style='margin-left:120px;'></span><img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advMainImage").text() + "'/><span style='margin-left:250px;'></span><input id='RemoveImg123' onclick=RemoveOneImg(1) type='button'  class='btn btn-primary' value='Remove' /> ");
                            $("#Allimage-holder").html(sd.join(''));
                            txtPrice.value = $(docs).find("cost").text();
                            Country.value = $(docs).find("CountryID").text();
                            BindState();
                            State.value = $(docs).find("StateID").text();
                            //BindCity();
                            city.value = $(docs).find("CityID").text();
                            var sd1 = [];
                            sd1.push("<span style='margin-left:100px;'></span><img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage1").text() + "'/><span style='margin-left:250px;'></span><input id='RemoveImg123' onclick=RemoveOneImg(2) type='button'  class='btn btn-primary' value='Remove' /> ");
                            $("#Allimage-holder1").html(sd1.join(''));
                            var sd2 = [];
                            sd2.push("<span style='margin-left:100px;'></span><img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage2").text() + "'/><span style='margin-left:250px;'></span><input id='RemoveImg123' onclick=RemoveOneImg(3) type='button'  class='btn btn-primary' value='Remove' /> ");
                            $("#Allimage-holder2").html(sd2.join(''));

                            var sd3 = [];
                            sd3.push("<span style='margin-left:100px;'></span><img class='thumb-image' width='75px' height='75px' src='../Associate/Adv_img/" + $(docs).find("advImage3").text() + "'/><span style='margin-left:250px;'></span><input id='RemoveImg123' onclick=RemoveOneImg(4) type='button'  class='btn btn-primary' value='Remove' /> ");
                            $("#Allimage-holder3").html(sd3.join(''));
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
            });
        }

        function RemoveOneImg(d) {
            if (d == 1) {
                $("#Allimage-holder").empty();
                $("#divImage").css("display", "block");
                $("#divsImage").css("display", "none");
                $("#divfourthImage").css("display", "none");
                $("#divthrdImage").css("display", "none");
            }
            else if (d == 2) {
                $("#divImage").css("display", "none");
                $("#Allimage-holder1").empty();
                $("#divsImage").css("display", "block");
                $("#divfourthImage").css("display", "none");
                $("#divthrdImage").css("display", "none");
            }
            else if (d == 3) {
                $("#divImage").css("display", "none");
                $("#Allimage-holder2").empty();
                $("#divsImage").css("display", "none");
                $("#divfourthImage").css("display", "none");
                $("#divthrdImage").css("display", "block");

            }
            else if (d == 4) {
                $("#divImage").css("display", "none");
                $("#Allimage-holder3").empty();
                $("#divsImage").css("display", "none");
                $("#divthrdImage").css("display", "none");
                $("#divfourthImage").css("display", "block");

            }
            else { }
        }


        function ShowPopUp(dynar) {
            $('#divDetail').css("visibility", "visible");
            $("#btnAddNew").attr("disabled", "disabled");
            $('#divDetail1').css("visibility", "visible");
            $('#divImage').css("display", "block");
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
                type: "POST", url: "ws/Category.asmx/AssociatePurchasedCategory", data: "{'jobtype':'" + jobcate + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssociateCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select Category</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("ID").text() + "'>" + $(docs).find("CategoryName").text() + "</option>");
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
    <script>
        $(document).ready(function () {
            BindState();
            AssociatealreadyCategories();
            //CountAssociateCategory();
            BindAllCategory();
            function BindassociateSubCategory() {
                var CategoryId = aCategory.value;
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
                            $("#aSubCategory").html(cartd.join(''));
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
                $("#aCategory").change(function () {
                    BindassociateSubCategory();
                });
                $("#aSubCategory").change(function () {
                    $("#divSelectedChce").css("display", "block");
                    PurchaseSalesCategory();
                    $("#ViewAllPurchasedRcd").css("visibility", "visible");
                    //$("#aSubCategory option:selected").remove();
                    $("#Shop").show();
                    BindMembership();
                    $('#MemberShip').val('1');
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
                        cartd.push("<table class='table table-condensed selected-table' style='width:100%'>");
                        //  cartd.push("<tr><th colspan=7> <h4> Your Selected Choices </h4> </th></tr>");
                        cartd.push("<tr>");
                        //cartd.push("<td><strong>S.N</strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td style='visibility:hidden' class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong> Price </strong> </td>");
                        cartd.push("<td  style='visibility:hidden' class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("<td > <strong> Action </strong> </td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            //cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("SubCategoryName").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>$ " + ($(docs).find("Price").text()) + ".00 </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-width-2-10;' ><input class='btn btn-info' type='button' onclick=PurchaseRcd('" + ($(docs).find("CategoryID").text()) + "," + ($(docs).find("subCategoryID").text()) + "," + ($(docs).find("CategoryName").text()) + "," + ($(docs).find("SubCategoryName").text()) + "," + ($(docs).find("Price").text()) + "," + ($(docs).find("Zipcode").text()) + "," + cc + "')  id='btnPurchase' value='Purchase'/> &nbsp;&nbsp;<input class='btn btn-info'  type='button' onclick=RemoveRcd('" + cc + "," + ($(docs).find("subCategoryID").text()) + "," + ($(docs).find("SubCategoryName").text()) + "')  id='btncancel2' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            //var a = $(docs).find("Price").text();
                            //Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        //cartd.push("<tr>   <td colspan='7' style='width:85%; margin-left:200px'><b> Total Amount:-" + Totalamount + "</b></td><td></td></tr>");
                        //$("label[for='lblCatPrice']").text(Totalamount);
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

            $('#aSubCategory').append($('<option>', {
                value: subid,
                text: subName
            }));


        }
        function PurchaseRcd(dynar) {
            $(this).prop('disabled', false);
            var catID = 0, subCatID = 0, catName = 0, subCatName = 0, price = 0, zipCode = 0, rowID;
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
                        $("label[for='lblCatPrice']").text(price);

                    }
                }
                else if (i == 5) {
                    if (array[i] == '') {
                    }
                    else {
                        zipCode = array[i];
                    }
                }
                else if (i == 6) {
                    if (array[i] == '') {
                    }
                    else {
                        rowID = array[i];
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
                    $("#divSelectedChce").css("display", "none");
                    $("#aSubCategory option:selected").remove();
                    $("#btncheckout").css("visibility", "visible");
                    $("#btnreset1").css("visibility", "visible");
                    $("#btnCancel1").css("visibility", "visible");
                    RemoveFromPurchaseList(rowID);
                    GetPurchasedAllRecords();
                    var a = 0;
                    var b = 0;
                    var c = 0;
                    ApplycoponCode(a, b, c);

                }
            });

        }

        function RemoveFromPurchaseList(id) {
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
                        cartd.push("<table class='table table-condensed selected-table' style='width:70%'>");
                        cartd.push("<tr><th colspan='7'> <h4> Your Selected Choices For Purchase </h4> </th></tr>");
                        cartd.push("<tr>");
                        //cartd.push("<td><strong>S.N</strong></td>");
                        cartd.push("<td class='uk-width-2-10 uk-text-center'><strong>Category</strong></td>");
                        cartd.push("<td class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'>  </td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'> Price </td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center'><strong></strong></td>");
                        cartd.push("<td  class='uk-width-2-10 uk-text-center' style='margin-left:150px'> Action </td>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            //cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("CategoryName").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("SubCategoryName").text()) + " </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("Price").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' ><input  type='button' class='btn btn-info' onclick=RemoveRcd1(" + cc + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("Price").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>  <td colspan='4' class='text-right'> <b class='pull-right'> Total Amount:- </b> </td>  <td colspan='3' align='left'  ><b>" + Totalamount + "</b></td></tr>");
                        $("label[for='lblCatPrice']").text(Totalamount);
                        cartd.push("</table>");
                        $("#purchasebutton").css("display", "none");
                        $("#ViewPurchasedRcd").css("display", "none");
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
        function PurchaseSalesCategory() {
            var SubCategoryPrice;
            $.ajax({
                type: "POST",
                url: "ws/SubCategory.asmx/AssociateCategoryExistsOrNot",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r1) {
                    if (r1.d.length > 0) {
                        var xmlDoc1 = $.parseXML(r1.d);
                        var xml1 = $(xmlDoc1);
                        var docs1 = xml1.find("CatExists");
                        $.each(docs1, function (i, docs1) {
                            if ($(docs1).find("cnt").text() > 0) {
                                SubCategoryPrice = 0;
                            }
                            else {
                                SubCategoryPrice = 20;
                            }

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


            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/InsertDNew",
                data: "{'CatID':'" + aCategory.value + "','catName':'" + $("#aCategory option:selected").text() + "','subCatName':'" + $("#aSubCategory option:selected").text() + "','zipcode':'0','subCatID':'" + aSubCategory.value + "','price':" + SubCategoryPrice + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (r) {
                    if (r.d == "1") {
                        //AssociatealreadyCategories();
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



        }
        //Old function when Price was charged for each categories
        //function PurchaseSalesCategory() {
        //    var SubCategoryID = aSubCategory.value;
        //    $.ajax({
        //        type: "POST",
        //        url: "ws/SubCategory.asmx/SubCategoryWisePrice",
        //        data: "{'id':'" + SubCategoryID + "'}",
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        async: false,
        //        success: function (r1) {
        //            if (r1.d.length > 0) {                        
        //                var xmlDoc1 = $.parseXML(r1.d);
        //                var xml1 = $(xmlDoc1);
        //                var docs1 = xml1.find("SubCategoryPrice");
        //                $.each(docs1, function (i, docs1) {
        //                    $.ajax({
        //                        type: "POST",
        //                        url: "ws/CategoryPurchase.asmx/InsertDNew",
        //                        data: "{'CatID':'" + aCategory.value + "','catName':'" + $("#aCategory option:selected").text() + "','subCatName':'" + $("#aSubCategory option:selected").text() + "','zipcode':'0','subCatID':'" + aSubCategory.value + "','price':'" + $(docs1).find("price").text() + "'}",
        //                        contentType: "application/json; charset=utf-8",
        //                        dataType: "json",
        //                        async: false,
        //                        cache: false,
        //                        success: function (r) {
        //                            if (r.d == "1") {
        //                                //AssociatealreadyCategories();
        //                                GetAllRecords();
        //                            }
        //                            if (r.d == "0") {
        //                                alert("Already Exists");
        //                            }
        //                            if (r.d == "3") {
        //                                alert("OOPS Error ! Please try again.");
        //                            }
        //                        },
        //                        failure: function (response) {
        //                            alert(response.d + "Fail");
        //                        },
        //                        error: function (response) {
        //                            alert(response.d + "Error...");
        //                        }
        //                    });
        //                });
        //            }
        //        },
        //        failure: function (response) {
        //            alert(response.d + "Fail");
        //        },
        //        error: function (response) {
        //            alert(response.d + "Error...");
        //        }
        //    });



        //}
        function BindAllCategory() {
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
                        $("#aCategory").html(cartd.join(''));
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
        function CountAssociateCategory() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/CountAssociateCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssocateCategories");
                        $.each(docs, function (i, docs) {
                            $("#lblPurchaseCategories").text($(docs).find("Total").text());

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
                        cartd.push("<table class='table table-condensed selected-table' style='width:100%'>");
                        //cartd.push("<tr><td colspan='7'> <h4>  </h4> </td></tr>");
                        // cartd.push("<tr><td colspan=7>Categories you have purchased</td><td style='visibility:hidden'></td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<th  ><strong>S.N</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong>Category</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'><strong>SubCategory</strong></th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center'> Cost </th>");
                        cartd.push("<th  class='uk-width-2-10 uk-text-center' style='margin-left:150px'> Cancel </th>");
                        cartd.push("<th visibility:hidden' class='uk-width-2-10 uk-text-center'>  </th>");
                        cartd.push("<th  visibility:hidden' class='uk-width-2-10 uk-text-center'><strong></strong></th>");
                        cartd.push("</tr>");
                        var cc = 0;
                        var count = 1;
                        var Totalamount = 0;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + count + "</td>");
                            cartd.push("<td class='uk-text-center hightlight-label'> " + ($(docs).find("categoryname").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'> " + ($(docs).find("Name").text()) + " </td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("amount").text()) + "$ </td>");
                            cartd.push("<td class='uk-text-center'> <input class='btn btn-info'  type='button' onclick=PermananetlyRemoveCategory(" + ($(docs).find("id").text()) + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>   <td colspan='3' >  <b class='pull-right'> Total Amount:- </b> </td> <td colspan='3' align='left'>" + Totalamount + "</b></td><td></td></tr>");
                        $("label[for='lblCatPrice']").text(Totalamount);
                        cartd.push("</table>");
                        $("#ViewAllPurchasedRcd").css("visibility", "visible");
                        $("#ViewAllPurchasedRcd").html(cartd.join(''));
                        $("#lblTotalamount").text(Totalamount);
                        $("#lblPurchaseCategories").text(cc);
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
