<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="ZipCodePurchase.aspx.cs" Inherits="WcrAssociate.Associate.ZipCodePurchase" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="css/loader.css" rel="stylesheet" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-2.1.1.min.js">
    </script>
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#zipcodeclick").addClass("active");
        });
    </script> 
    <div>  
        <div class="modal fade small-model" id="success-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal">
                        <div class="alert alert-danger no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>
                                <label id="lblSuccess"></label>
                            </strong>
                            <br />
                            <label id="lbldetail" class="running-text"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade small-model" id="fail_message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal no-padding">
                        <div class="alert alert-danger no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>
                                <label id="lblFailureTitle"></label>
                            </strong>
                            <br />
                            <label id="lblFailureDetail" class="running-text"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="pageloader" class="pageloader" style="display: none">
        <div class="pageloader-inner">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 dashboard-block sumary-detail-colume ">
            <h1 class="mb-0">Purchase Zip Codes</h1>
            <div class="row">
                <div class="col-sm-12">
                    <div class="full-row section-with-blue-border current-zipcode">
                        <h4>
                           <strong> Use this page to purchase specific zip codes in which to advertise your services to potential clients and customers.</strong>
                        </h4>
                        <p>
                            Purchasing a zip code is done in 3 easy steps. 
                        </p>
                        <ol>
                            <li><strong> Choose a zip code to advertise </strong> <br />
                                Enter the City and State where you would like to advertise your services and then click the ‘SEARCH’ button.  The system will display what zip codes are available in that City/State.  (You can also search by a specific zip code if you have already decided on a specific zip code) <br /> </li>
                         <li><strong> Select a Category </strong> <br />
Categories that are available for purchase in your selected zip code will be displayed.
Once you select a category, our price rate will also be displayed.<br /> </li>
<li>Click the <strong> ‘PURCHASE’ </strong> button to complete your purchase. </li>

                        </ol>
                        <p> And that’s it.</p>
                        </div>
                             </div>  </div>
                        <div class="row m0 d-flex align-item-center">

                            <div class="col-sm-6 bdr-right">
                                <h4>Your Current Zipcode Purchase </h4>
                                <ul class="detail-listing">
                                    <li>Total count of items purchased <span class="badge">
                                        <label id="lblPurchasedZipCodes"></label>
                                    </span></li>
                                    <li>Total amount due at the start of next billing cycle <span class="badge">$
                                <label id="lblTotalamount"></label>
                                    </span></li>

                                </ul>
                            </div>

                            <div class="col-sm-6">
                                <ul class="detail-listing">

                                    <li class="next-billing">Next billing cycle starts <span class="badge">
                                        <label id="lblBillingDate"></label>
                                    </span></li>
                                </ul>
                            </div>

                        </div>
                    </div>
          

            </div>
            <div class="row">
                <div class="col-lg-8">
                    <div class="purchase-new-zipcode" id="catForm">
                        <h4><i class="fa fa-plus"></i> PURCHASE NEW ZIP CODE</h4>

                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#" id="tabcitystate" aria-controls="bycity" role="tab" data-toggle="tab">By City & States</a></li>
                            <li role="presentation"><a href="#byzipcode" id="tabzipcode" aria-controls="byzipcode" role="tab" data-toggle="tab">By Zip Code</a></li>

                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">

                            <div role="tabpanel" class="tab-pane active" id="bycity">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <input type="text" id="txtCity" class="form-control" placeholder="City" />
                                        <label id="lblInvalidCombination" style="color: red; display: none"></label>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="form-control" id="ddlState"></select>
                                        <label id="lblSuccess2" style="color: red; display: none"></label>
                                    </div>
                                    <div class="col-sm-4">
                                        <input id="btnSearch" type="button" class="btn btn-light btn-block" value="SEARCH" />
                                    </div>
                                </div>
                            </div>


                            <div role="tabpanel" class="tab-pane" style="display: none;" id="byzipcode">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <input type="text" id="txtZipcode" class="form-control" placeholder="Zipcode" />
                                        <label id="lblSuccess1" style="color: red; display: none"></label>
                                    </div>
                                    <div class="col-sm-4">
                                        <input id="btnSearch1" type="button" class="btn btn-light btn-block" value="SEARCH" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-7" id="divZipcode" style="display: none;">
                                    <div>
                                        <p class="form-control-static">Your Search Criteria returned the following Zip code (s)</p>
                                        <select class="form-control" id="ddlZipcode"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-5">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <label id="zipcodemsg" style="color: red; display: none"></label>
                                        <div id="divCategory" style="display: none;">
                                            <p class="form-control-static">Select A Service Zip Code Category</p>
                                            <select class="form-control" id="ddlCategory"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="alert alert-custom-warning">
                        <i class="fa fa-exclamation-triangle"></i><span>A maximum limit of 10 Zip Code/Service Category purchases is allowed 
                <br />
                            <strong>Zip code rates vary depending on population. </strong></span>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <div id="LoadingImage" class="loader" style="display: none;">
                <div class="bg-overlay"></div>
                <div class="loading-inner">
                    <img src="img/ajax-loading.gif" style="width: 100px;" />
                </div>
            </div>
            <div class="full-row your-search-result form-horizontal pos-rel" style="display: none;" id="divlocation">
                <div class="row">
                    <div class="col-sm-12">
                        <div id="divzipcodeDetail" style="display: none;">

                            <div class="full-row your-selected-choice pos-rel ">
                                <h4 class="selected-title">Your Selected Choices:  </h4>
                                <div class="row">
                                    <div class="col-lg-8">

                                        <table class="table table-condensed table-with-normaldata selected-table-choice">
                                            <tr>
                                                <th>Zip </th>
                                                <th>Category </th>
                                                <th>Subcategory </th>
                                                <th>Cost </th>
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

                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-lg-4 button-right-pos">
                                        <input id="btnPurchase" type="button" class="btn btn-light" value="PURCHASE" />
                                        <input id="btnPurchaseCancel" type="button" class="btn btn-light" value="CANCEL" />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="full-row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="display: none;" id="ViewRcd">
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="display: none;" id="ViewPurchasedRcd">
                    </div>
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 ">
                            <input type="button" class="btn btn-primary" id="btnreset" value="Reset" style="display: none;" />
                            <input type="button" class="btn btn-primary" id="btnCancel" value="Cancel" style="display: none;" />
                        </div>
                        <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 ">
                            <input type="button" class="btn btn-primary" id="btncheckout" value="Submit" style="display: none;" />
                        </div>
                    </div>
                </div>

            </div>


            <div class="full-row custome-block ">
                <div class="table-responsive grid-block data-table  ">
                    <div class="uk-overflow-container">
                        <h4><b>YOUR CURRENT ZIPCODE PURCHASES</b> </h4>
                        <div style="visibility: hidden" id="ViewAllPurchasedRcd">
                        </div>
                    </div>
                </div>
            </div>

            <div class="full-row">
                <div role="alert" id="divSuccess" class="alert alert-success" style="display: none;">
                </div>
            </div>
            <div class="modal fade" id="completeConsumerProfile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h3 class="modal-title" id="myModalLabel"><strong>Please Verify/Update Your Credit Card Information </strong></h3>

                            <div class="btn btn-red btn-block cursor-default" style="margin-top: 20px;">
                                <label>There was an error processing this transaction. Please verify or update your card information to complete this transaction. </label>
                            </div>

                        </div>
                        <div class="modal-body form-horizontal">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h3 class="title-w-border">Card Account Information </h3>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Card Number </label>
                                            <div class="col-sm-9  ">
                                                <asp:HiddenField ID="CardID" runat="server" />
                                                <asp:TextBox ID="txtCreditCard" MaxLength="19" class="form-control" placeholder="NEW CARD NUMBER" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Card Type </label>
                                            <div class="col-sm-9 ">
                                                <asp:CheckBox ID="CheckBox1" Style="pointer-events: none;" runat="server" />
                                                VISA                                                 
                                                <asp:CheckBox ID="CheckBox2" Style="pointer-events: none;" runat="server" />MasterCard                                               
                                                <asp:CheckBox ID="CheckBox3" Style="pointer-events: none;" runat="server" />
                                                AMEX                                                
                                                <asp:CheckBox ID="CheckBox4" Style="pointer-events: none;" runat="server" />
                                                Discover                                               
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Exp Month </label>
                                            <div class="col-sm-9  ">
                                                <asp:DropDownList class="form-control" runat="server" ID="ddlMonth">
                                                    <asp:ListItem Value="0">Month</asp:ListItem>
                                                    <asp:ListItem Value="1">January</asp:ListItem>
                                                    <asp:ListItem Value="2">February</asp:ListItem>
                                                    <asp:ListItem Value="3">March</asp:ListItem>
                                                    <asp:ListItem Value="4">April</asp:ListItem>
                                                    <asp:ListItem Value="5">May</asp:ListItem>
                                                    <asp:ListItem Value="6">June</asp:ListItem>
                                                    <asp:ListItem Value="7">July</asp:ListItem>
                                                    <asp:ListItem Value="8">August</asp:ListItem>
                                                    <asp:ListItem Value="9">September</asp:ListItem>
                                                    <asp:ListItem Value="10">October</asp:ListItem>
                                                    <asp:ListItem Value="11">November</asp:ListItem>
                                                    <asp:ListItem Value="12">December</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Exp Year </label>
                                            <div class="col-sm-9  ">
                                                <asp:DropDownList class="form-control" runat="server" ID="ddlYear">
                                                    <asp:ListItem Value="0">Year</asp:ListItem>
                                                    <asp:ListItem Value="2018">2018</asp:ListItem>
                                                    <asp:ListItem Value="2019">2019</asp:ListItem>
                                                    <asp:ListItem Value="2020">2020</asp:ListItem>
                                                    <asp:ListItem Value="2021">2021</asp:ListItem>
                                                    <asp:ListItem Value="2022">2022</asp:ListItem>
                                                    <asp:ListItem Value="2023">2023</asp:ListItem>
                                                    <asp:ListItem Value="2024">2024</asp:ListItem>
                                                    <asp:ListItem Value="2025">2025</asp:ListItem>
                                                    <asp:ListItem Value="2026">2026</asp:ListItem>
                                                    <asp:ListItem Value="2027">2027</asp:ListItem>
                                                    <asp:ListItem Value="2028">2028</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">CVV Code </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox ID="txtCvv" class="form-control" placeholder="CV CODE" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <h3 class="title-w-border">Cardholder Billing Information </h3>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">First Name </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox ID="cardFname" class="form-control" placeholder="FIRST NAME" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Last Name </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox ID="cardLastname" class="form-control" placeholder="LAST NAME" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Street Address </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox ID="Cardaddress" class="form-control" placeholder="STREET ADDRESS" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group" style="display: none;">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Email Address </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox ID="emailAddress" Visible="false" class="form-control" placeholder="Email Address" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">City </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox ID="cardCity" class="form-control" placeholder="CITY" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">State </label>
                                            <div class="col-sm-9  ">
                                                <asp:DropDownList runat="server" class="form-control" ID="cardState">
                                                </asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Country </label>
                                            <div class="col-sm-9  ">
                                                <asp:TextBox runat="server" class="form-control" ReadOnly="true" Value="US" ID="cardCountry">
                                                </asp:TextBox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12  ">
                                            <label class="col-sm-3 control-label ">Zip </label>
                                            <div class="col-sm-9  ">
                                                <asp:DropDownList runat="server" class="form-control" ID="cardzipcode">
                                                </asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group">
                                <div class="col-sm-12 text-center  ">
                                    <input id="btnupdateCard" type="button" style="display: none;" class="btn btn-primary" value="UPDATE" />
                                    <input id="btnCancelCard" type="button" class="btn btn-primary" value="CLEAR" />
                                    <input id="btnAddNew" type="button" class="btn btn-primary" value="SUBMIT" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="hidzipAvail" />
       
    <div class="clearfix"></div>
    <script>
        $(document).ready(function () {
            $("#bycity").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
            $.ajax({
                type: "POST", url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {
                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                                window.location.href = "Dashboard.aspx";
                            }
                            else {
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
            $("#tabcitystate").click(function () {
                $("#txtZipcode").val('');
                $("#bycity").css("display", "block");
                $("#byzipcode").css("display", "none");
                $("#divZipcode").css("display", "none");
                $("#divCategory").css("display", "none");
                $("#divzipcodeDetail").css("display", "none");
                $("#bycity").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
            });
            $("#tabzipcode").click(function () {
                $("#txtZipcode").val('');
                $("#byzipcode").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
                $("#bycity").css("display", "none");
                $("#divZipcode").css("display", "none");
                $("#divCategory").css("display", "none");
                $("#divzipcodeDetail").css("display", "none");

            });



            $("#bbbclose").click(function () {
                if (_Counter > 2) {
                    window.location.href = 'ZipCodePurchase.aspx';
                }
            });
            var _Counter = 0;
            var now = new Date();
            var current;
            if (now.getMonth() == 11) {
                current = new Date(now.getFullYear() + 1, 0, 1).format('yyyy-MM-dd');
            } else {
                current = new Date(now.getFullYear(), now.getMonth() + 1, 1).format('yyyy-MM-dd');
            }
            $("#txtCity").keypress(function () {
                //$("#txtZipcode").attr("disabled", "true");
                $('#txtZipcode').removeAttr('placeholder');
                $("#txtZipcode").val('');

            });
            $("#ddlState").change(function () {
                $("#lblSuccess2").css("display", "none");
            })
            $("#txtZipcode").keypress(function () {
                $('#txtCity').removeAttr('placeholder');
                $("#txtCity").val('');
                $("#ddlState").val("0");
            });
            function showLoader() {
                $("#pageloader").css("display", "block");
            }
            function hideLoader() {
                setTimeout(function () {
                    $("#pageloader").css("display", "none");
                }, 700);
            }
            $("#lblBillingDate").text(current);
            AssociatealreadyCategories();
            //CouponCode.value = '1';
            var sts = 0;
            BindState();
            $("#btnpurchasenew").click(function () {
                $("#txtZipcode").removeAttr("disabled", "true");
                $("#txtCity").removeAttr("disabled", "true");
                $("#ddlState").removeAttr("disabled", "true");
                if (sts == 0) {
                    $("#catForm").css("display", "block");
                    $(".button-block ").addClass("disable");
                    sts = 1;
                }
                else if (sts == 1) {
                    $("#catForm").css("display", "none");
                    $(".button-block ").removeClass("disable");
                    $("#divZipcode").css("display", "none");
                    $("#divCategory").css("display", "none");
                    $("#divzipcodeDetail").css("display", "none");
                    sts = 0;
                }
            });
            $("#btnSearch").click(function () {
                if ($("#txtZipcode").val() == "") {
                    if ($("#ddlState").val() == 0) {
                        $("#lblSuccess2").css("display", "block");
                        $("#lblSuccess2").text("State must be selected.");
                        //alert("State Can't be blank!");
                        return false;
                    }
                    else if ($("#txtCity").val() == "") {
                        alert("City Can not Blank");
                        return false;
                    }
                    else {
                        $("#divCategory").css("display", "none");
                        $("#divZipcode").css("display", "block");
                        $("#bycity").css({ "display": "block", "border": "0px solid #00c0ef", "padding": "15px" });
                        //$("#divZipcode").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });                        
                        BindStateWiseZipcode();
                        if (hidzipAvail.value == 1) {
                            $("#divZipcode").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
                            $("#lblInvalidCombination").css("display", "none");

                        }
                        else {
                            $("#divZipcode").css({ "display": "none", "border": "1px solid #00c0ef", "padding": "15px" });
                            $("#lblInvalidCombination").css("display", "block");
                            $("#lblInvalidCombination").text("Invalid City/State combination.");
                        }
                    }
                }
                else {
                    $(document).on({
                        ajaxStart: function () {
                            showLoader();
                        },
                        ajaxStop: function () {
                            hideLoader();
                        }
                    });
                    $.ajax({
                        type: "POST", url: "ws/CategoryPurchase.asmx/ZipCodeExists", data: "{'Zipcode':'" + $("#txtZipcode").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("ZipcodeExists");
                                if ($(docs).find("ID").text() >= 1) {

                                    $("#lblSuccess2").css("display", "none");
                                    $("#divZipcode").css("display", "none");
                                    $("#divlocation").css("display", "block");
                                    $("#divCategory").css("display", "block");
                                    BindCategoryZip();
                                }
                                else {
                                    //$("#lblSuccess2").text("Incorrect City/State combination.");
                                    //jQuery.noConflict();
                                    //$("#lblFailureTitle").text("Failure!");
                                    //$("#lblFailureDetail").text("This Zipcode is not available into the database.");
                                    //$('#fail_message').modal('show');
                                    //$("#txtZipcode").focus();
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
            $("#btnSearch1").click(function () {
                if ($("#txtZipcode").val() == "") {
                    if ($("#ddlState").val() == 0) {
                        alert("State Can't be blank!");
                        return false;
                    }
                    else if ($("#txtCity").val() == "") {
                        alert("City Can not Blank");
                        return false;
                    }
                    else {
                        $("#divCategory").css("display", "block");
                        $("#divZipcode").css("display", "block");
                        BindStateWiseZipcode();
                    }
                }
                else {
                    $(document).on({
                        ajaxStart: function () {
                            showLoader();
                        },
                        ajaxStop: function () {
                            hideLoader();
                        }
                    });
                    $.ajax({
                        type: "POST", url: "ws/CategoryPurchase.asmx/ZipCodeExists", data: "{'Zipcode':'" + $("#txtZipcode").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        success: function (r) {
                            if (r.d.length > 0) {
                                var xmlDoc = $.parseXML(r.d);
                                var xml = $(xmlDoc);
                                var docs = xml.find("ZipcodeExists");
                                if ($(docs).find("ID").text() >= 1) {
                                    $("#lblSuccess1").text("");
                                    $("#divZipcode").css("display", "none");
                                    $("#divlocation").css("display", "block");
                                    //$("#divCategory").css("display", "block");

                                    $("#byzipcode").css({ "display": "block", "border": "0px solid #00c0ef", "padding": "15px" });
                                    $("#divCategory").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
                                    BindCategoryZip();
                                }
                                else {
                                    hideLoader();
                                    $("#lblSuccess1").css("display", "block");
                                    $("#lblSuccess1").text("Incorrect Zip Code.");

                                    $("#byzipcode").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
                                    $("#divCategory").css({ "display": "none", "border": "0px solid #00c0ef", "padding": "15px" });
                                    $("#divzipcodeDetail").css("display", "none");

                                    //jQuery.noConflict();
                                    //$("#lblFailureTitle").text("Failure!");
                                    //$("#lblFailureDetail").text("This Zipcode is not available into the database.");
                                    //$('#fail_message').modal('show');
                                    //$("#txtZipcode").focus();
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
                $('#btnPurchase').prop('disabled', true);
                $('#btnPurchaseCancel').prop('disabled', true);
                checkoutClick();
            });
            $("#btnAddNew").click(function () {
                var check = Valid();
                if (check == 0) {
                    var CardNumber = $("#ContentPlaceHolder1_txtCreditCard").val();
                    var Cardholder_FirstName = $("#ContentPlaceHolder1_cardFname").val();
                    var Cardholder_LastName = $("#ContentPlaceHolder1_cardLastname").val();
                    var Cardholder_Address = $("#ContentPlaceHolder1_Cardaddress").val();
                    var Cardholder_City = $("#ContentPlaceHolder1_cardCity").val();
                    var Cardholder_State = $('#ContentPlaceHolder1_cardState :selected').text();
                    var Cardholder_Country = $("#ContentPlaceHolder1_cardCountry").val();// $('#ContentPlaceHolder1_cardCountry :selected').text();
                    var Cardholder_Zip = $('#ContentPlaceHolder1_cardzipcode :selected').text();
                    var cvv = $("#ContentPlaceHolder1_txtCvv").val();
                    var ExpMonth = $("#ContentPlaceHolder1_ddlMonth").val();
                    var ExpYear = $("#ContentPlaceHolder1_ddlYear").val();
                    var CardType = "Credit";
                    var TotalAmount = "0";// lblToalAmountV.value;
                    var msg = [];
                    $.ajax({
                        url: "../ws/AssociateSignUp.ashx?action=CardData&CardNumber=" + CardNumber + "&Cardholder_FirstName=" + Cardholder_FirstName + "&Cardholder_LastName=" + Cardholder_LastName + "&Cardholder_Address=" + Cardholder_Address + "&Cardholder_City=" + Cardholder_City + "&Cardholder_State=" + Cardholder_State + "&Cardholder_Country=" + Cardholder_Country + "&Cardholder_Zip=" + Cardholder_Zip + "&cvv=" + cvv + "&ExpMonth=" + ExpMonth + "&ExpYear=" + ExpYear + "&CardType=" + CardType + "&totalamount=" + TotalAmount + "",
                        data: {},
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        async: false,
                        type: "POST",
                        cache: false,
                        success: function (response) {
                            if (response == "1") {
                                jQuery.noConflict();
                                $("#lblFailureTitle").text("Failure!");
                                $("#lblFailureDetail").text("Something Goes Wrong Please Try again.");
                                $('#fail_message').modal('show');

                            }
                            else if (response == "0") {
                                //ContentPlaceHolder1_txtCreditCard.value = "";
                                //ContentPlaceHolder1_cardFname.value = "";
                                //ContentPlaceHolder1_cardLastname.value = "";
                                //ContentPlaceHolder1_Cardaddress.value = "";
                                //ContentPlaceHolder1_cardzipcode.value = "";
                                //ContentPlaceHolder1_txtCvv.value = "";
                                //ContentPlaceHolder1_cardCity.value = "";
                                $('#completeConsumerProfile').modal('hide');
                                _Counter++;
                                checkoutClick();

                            }
                            else if (response == "-1") {
                                jQuery.noConflict();
                                $("#lblFailureTitle").text("Failure!");
                                $("#lblFailureDetail").text("Something Goes Wrong Please Try again.");
                                $('#fail_message').modal('show');
                            }
                            else { }
                        },
                        failure: function (response) {
                            alert(response + "Fail");
                        },
                        error: function (response) {
                            alert(response + "Error...");
                        }
                    });
                }
                else {
                    alert(check);
                }
            });
            function PurchaseZipCode() {
                var catValue = $("#ddlCategory").val();
                var _subCatValue;
                if (catValue == 2) {
                    _subCatValue = 5;
                }
                else if (catValue == 5) {
                    _subCatValue = 13;
                }
                else if (catValue == 3) {
                    _subCatValue = 8;
                }
                else {

                }
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/PurchasedItemsServices",
                    data: "{'CatID':'" + $("#ddlCategory").val() + "','catName':'" + $("#ddlCategory option:selected").text() + "','subCatName':'" + $("#ddlCategory option:selected").text() + "','subCatID':'" + _subCatValue + "','zipcode':'" + $("#lblzipcode").text() + "','price':'" + $("#lblprice").text() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            //GetPurchasedAllRecords();
                        }
                        if (r.d == "0") {
                            jQuery.noConflict();
                            $("#lblFailureTitle").text("Failure!");
                            $("#lblFailureDetail").text("Already Exists.");
                            $('#fail_message').modal('show');
                        }
                        if (r.d == "3") {
                            jQuery.noConflict();
                            $("#lblFailureTitle").text("Failure!");
                            $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                            $('#fail_message').modal('show');
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
            function checkoutClick() {
                setTimeout(function () {
                    $("#pageloader").css("display", "block");
                }, 50);
                $.ajax({
                    type: "POST",
                    url: "ws/Sale.asmx/CountPurchasedZipcode",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    success: function (r1) {
                        if (r1.d.length > 0) {
                            var xmlDoc1 = $.parseXML(r1.d);
                            var xml1 = $(xmlDoc1);
                            var docs1 = xml1.find("ZipcodePurchased");
                            $.each(docs1, function (i, docs1) {
                                if ($(docs1).find("Total").text() < 10) {
                                    zipcodePurchaseCode();
                                }
                                else {
                                    $("#lblFailureTitle").text("Maximum Limit is expired.");
                                    $("#lblFailureDetail").text("YOU'VE REACHED THE MAXIMUM ALLOWED NUMBER OF SALES ADVERTISEMENT POSTS.");
                                    $('#fail_message').modal('show');
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
                hideLoader();
            }
            function zipcodePurchaseCode() {
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
                                var a = 0;
                                var b = 0;
                                var c = 0;
                                // ApplycoponCode(a, b, c);
                                ApplycoponCodeNew(a, b, c);
                            }
                            else {
                                $('#completeConsumerProfile').modal('show');
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
            $("#btnPurchaseCancel").click(function () {
                $("#divzipcodeDetail").css("display", "none");
                $("#catForm").css("display", "block");
                $("#divCategory").css("display", "none");
                $("#divZipcode").css("display", "none");
                sts = 0;
                $(".button-block ").removeClass("disable");
                $("#txtZipcode").val('');

            });
            //$('input[type="checkbox"]').on('change', function () {
            //    $(this).siblings('input[type="checkbox"]').prop('checked', false);
            //});

            $("#ContentPlaceHolder1_txtCreditCard").change(function () {
                var fid = $("#ContentPlaceHolder1_txtCreditCard").val();
                var itemId = fid.charAt(0);
                if (itemId == 4) {
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', false);
                }
                else if (itemId == 5) {
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', false);
                }
                else if (itemId == 6) {
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', false);
                }
                else if (itemId == 3) {
                    $('#ContentPlaceHolder1_CheckBox3').prop('checked', true);
                    $('#ContentPlaceHolder1_CheckBox2').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox4').prop('checked', false);
                    $('#ContentPlaceHolder1_CheckBox1').prop('checked', false);
                }
                else {

                }

            });



            $("#btnupdateCard").click(function () {
                var check = Valid();
                if (check == 0) {
                    debugger;
                    var CardNumber = $("#ContentPlaceHolder1_txtCreditCard").val();
                    var Cardholder_FirstName = $("#ContentPlaceHolder1_cardFname").val();
                    var Cardholder_LastName = $("#ContentPlaceHolder1_cardLastname").val();
                    var Cardholder_Address = $("#ContentPlaceHolder1_Cardaddress").val();
                    var Cardholder_City = $("#ContentPlaceHolder1_cardCity").val();
                    var Cardholder_State = $('#ContentPlaceHolder1_cardState :selected').text();
                    var Cardholder_Country = $("#ContentPlaceHolder1_cardCountry").val();
                    // var Cardholder_Country = $('#ContentPlaceHolder1_cardCountry :selected').text();
                    var Cardholder_Zip = $("#ContentPlaceHolder1_cardzipcode").val();
                    var cvv = $("#ContentPlaceHolder1_txtCvv").val();
                    var ExpMonth = $("#ContentPlaceHolder1_ddlMonth").val();
                    var ExpYear = $("#ContentPlaceHolder1_ddlYear").val();
                    var CardType = "Credit";
                    var TotalAmount = "0";// lblToalAmountV.value;
                    //var cardid = ContentPlaceHolder1_hidCardID.value;
                    var cardid = $("#ContentPlaceHolder1_CardID").val();
                    //alert(cardid1);
                    $.ajax({
                        url: "../ws/AssociateSignUp.ashx?action=Ucardata&CardNumber=" + CardNumber + "&Cardholder_FirstName=" + Cardholder_FirstName + "&Cardholder_LastName=" + Cardholder_LastName + "&Cardholder_Address=" + Cardholder_Address + "&Cardholder_City=" + Cardholder_City + "&Cardholder_State=" + Cardholder_State + "&Cardholder_Country=" + Cardholder_Country + "&Cardholder_Zip=" + Cardholder_Zip + "&cvv=" + cvv + "&ExpMonth=" + ExpMonth + "&ExpYear=" + ExpYear + "&CardType=" + CardType + "&totalamount=" + TotalAmount + "&cardDataID=" + cardid + "",
                        data: {},
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        async: false,
                        type: "POST",
                        cache: false,
                        success: function (response) {
                            if (response == 1) {
                                $("#lblFailureTitle").text("Unsuccess.");
                                $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                                $('#fail_message').modal('show');
                            }
                            else if (response == "0") {
                                $('#completeConsumerProfile').modal('hide');
                                checkoutClick();
                                //$("#lblSuccess").text("Successful!!!")
                                //$("#lbldetail").text("Your credit card info has been Updated Successfully.")
                                //$('#success-message').modal('show');
                            }
                            else if (response == "-1") {
                                $("#lblFailureTitle").text("Unsuccess.");
                                $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                                $('#fail_message').modal('show');
                            }
                            else { }
                        },
                        failure: function (response) {
                            alert(response + "Fail");
                        },
                        error: function (response) {
                            alert(response + "Error...");
                        }
                    });
                }
                else {
                    alert(check);
                }
            });
            function ApplycoponCodeNew(ccode, disc, duration) {
                var catValue = $("#ddlCategory").val();
                var _subCatValue;
                if (catValue == 2) {
                    _subCatValue = 5;
                }
                else if (catValue == 5) {
                    _subCatValue = 13;
                }
                else if (catValue == 3) {
                    _subCatValue = 8;
                }
                else {
                }
                //$("#LoadingImage").css("display", "block");
                var msg = [];
                //This Web Services is used to send amount to be transaction, right now it is not in use because card data stuff is moved from db
                var MonthValue = 1;// MemberShip.value;                        
                var totalAmount = $("#lblprice").text();
                $.ajax({
                    type: "POST",
                    url: "ws/CategoryPurchase.asmx/InsertAmount",
                    // data: "{'amount':'" + MonthValue * totalAmount + "','Description':'Zip code " + $("#lblzipcode").text() + " purchase for category " + $("#ddlCategory option:selected").text() + "}",
                    data: "{'amount':'" + MonthValue * totalAmount + "','Description':'Zip code " + $("#lblzipcode").text() + " has been purchased for  " + $("#ddlCategory option:selected").text() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            $.ajax({
                                type: "POST",
                                url: "ws/CategoryPurchase.asmx/InsertCategory",
                                data: "{'categoryID':'" + $("#ddlCategory").val() + "','SubcategoryID':'" + _subCatValue + "','PlanID':'1','pricevalues':'" + $("#lblprice").text() + "','zipcodeID':'" + $("#lblzipcode").text() + "','Couponcode':'" + ccode + "','Discount':'" + disc + "','Duration':'" + duration + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                async: false,
                                cache: false,
                                success: function (r) {
                                    if (r.d == "1") {
                                        $("#lblSuccess").text("Successful Zip Code Purchase!");
                                        $("#lbldetail").text("Your Credit Card has been successfully charged.");
                                        $('#success-message').modal('show');
                                        $("#divzipcodeDetail").css("display", "none");
                                        AssociatealreadyCategories();
                                    }
                                    if (r.d == "0") {
                                        $('#btnPurchase').prop('disabled', false);
                                        $('#btnPurchaseCancel').prop('disabled', false);
                                        $("#lblFailureTitle").text("Already Exists.");
                                        $("#lblFailureDetail").text("Already Exists.");
                                        $('#fail_message').modal('show');
                                    }
                                    if (r.d == "3") {
                                        $('#btnPurchase').prop('disabled', false);
                                        $('#btnPurchaseCancel').prop('disabled', false);
                                        $("#lblFailureTitle").text("OOPS Error ! Please try again.");
                                        $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                                        $('#fail_message').modal('show');
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
                            if (_Counter == 0) {
                                $('#completeConsumerProfile').modal('show');
                                _Counter++;
                                $("#btnupdateCard").css("display", "block");
                                $("#btnAddNew").css("display", "none");
                                $("#btnCancelCard").css("display", "none");
                            }
                            else {
                                _Counter++;
                                $("#lblFailureTitle").text("We can not complete this Zip Code Purchase at this time!!")
                                $("#lblFailureDetail").text("Please validate the card information that we have on file.  If you still require additional assistance, please contact customer support at 866.456.7331.")
                                $('#fail_message').modal('show');
                            }
                        }
                    },
                    failure: function (response) {
                        jQuery.noConflict();
                        $("#lblFailureTitle").text("Failure!");
                        $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                        $('#fail_message').modal('show');
                    },
                    error: function (response) {
                        jQuery.noConflict();
                        $("#lblFailureTitle").text("Failure!");
                        $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                        $('#fail_message').modal('show');
                    }
                });
                //end here
            }
        });

        function AssociatealreadyCategories() {
            $.ajax({
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{'JobType':'2'}",
                contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
                        cartd.push("<th ></th>");
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
                            cartd.push("<td class='uk-text-center'>$" + ($(docs).find("amount").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' '><input type='button' class='btn btn-light' onclick=PermananetlyRemoveCategory(" + ($(docs).find("id").text()) + ")  id='btncancel' value='Cancel'/> </td>");
                            cartd.push("<td style='visibility:hidden' class='uk-text-center'> " + ($(docs).find("Zipcode").text()) + " </td>");
                            cartd.push("<td class='uk-text-center' style='visibility:hidden'> " + ($(docs).find("subCategoryID").text()) + " </td>");
                            cartd.push("</tr>");
                            count++;
                            cc++;
                            var a = $(docs).find("amount").text();
                            Totalamount = parseInt(Totalamount) + parseInt(a);
                        });
                        cartd.push("<tr>   <td colspan='7' ><b> Total Amount:- $" + Totalamount + "</b></td><td></td></tr>");
                        $("label[for='lblRowId']").text(Totalamount);
                        $("#lblPurchasedZipCodes").text(cc);
                        $("#lblTotalamount").text(Totalamount);
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
                debugger;
                $.ajax({
                    type: "POST",
                    url: "ws/MyCategories.asmx/DeletePurchasedCategories",
                    data: "{'id':" + rrr + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        ////jQuery.noConflict();
                        ////$("#lblSuccess").text("Success!!")
                        ////$("#lbldetail").text("Deleted Succesfully.")
                        ////$('#success-message').modal('show');
                        window.location.reload();
                        // AssociatealreadyCategories();
                    }
                });
            }
        }


        function ApplycoponCode(ccode, disc, duration) {
            var catValue = $("#ddlCategory").val();
            var _subCatValue;
            if (catValue == 2) {
                _subCatValue = 5;
            }
            else if (catValue == 5) {
                _subCatValue = 13;
            }
            else if (catValue == 3) {
                _subCatValue = 8;
            }
            else {
            }
            //$("#LoadingImage").css("display", "block");
            var msg = [];
            $.ajax({
                type: "POST",
                url: "ws/CategoryPurchase.asmx/InsertCategory",
                data: "{'categoryID':'" + $("#ddlCategory").val() + "','SubcategoryID':'" + _subCatValue + "','PlanID':'1','pricevalues':'" + $("#lblprice").text() + "','zipcodeID':'" + $("#lblzipcode").text() + "','Couponcode':'" + ccode + "','Discount':'" + disc + "','Duration':'" + duration + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (r) {
                    if (r.d == "1") {
                        //This Web Services is used to send amount to be transaction, right now it is not in use because card data stuff is moved from db
                        var MonthValue = 1;// MemberShip.value;                        
                        var totalAmount = $("#lblprice").text();
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
                                    //$("#LoadingImage").css("display", "none");
                                    $("#lblSuccess").text("Successful Zip Code Purchase!")
                                    $("#lbldetail").text("Your Credit Card has been successfully charged.")
                                    $('#success-message').modal('show');
                                    $("#divzipcodeDetail").css("display", "none");
                                    AssociatealreadyCategories();
                                }
                                if (r.d == "0") {
                                    jQuery.noConflict();
                                    $("#lblFailureTitle").text("Failure!");
                                    $("#lblFailureDetail").text("Already Exists.");
                                    $('#fail_message').modal('show');
                                }
                                if (r.d == "3") {
                                    jQuery.noConflict();
                                    $("#lblFailureTitle").text("Failure!");
                                    $("#lblFailureDetail").text("OOPS Error ! Please try again.");
                                    $('#fail_message').modal('show');
                                }
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
                    if (r.d == "0") {
                        $("#lblFailureTitle").text("Already Exists.")
                        $("#lblFailureDetail").text("Already Exists.")
                        $('#fail_message').modal('show');
                    }
                    if (r.d == "3") {
                        $("#lblFailureTitle").text("OOPS Error ! Please try again.")
                        $("#lblFailureDetail").text("OOPS Error ! Please try again.")
                        $('#fail_message').modal('show');
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
            var zpcode = $("#txtZipcode").val();
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AvailableZipCodesForServices", data: "{'jobtype':'2','zip':'" + zpcode + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailZipCodes");
                        var cartd = [];
                        if (($(docs).find("id").text() == '')) {
                            $("#divCategory").css("display", "none");
                            $("#zipcodemsg").css("display", "block");
                            $("#zipcodemsg").text("Service Categories are no longer available in your selected zip code.Please choose another zip code");
                        }
                        else {
                            $("#zipcodemsg").css("display", "none");
                            $("#divCategory").css("display", "block");
                            cartd.push("<option value=0>Select Category</option>")
                            $.each(docs, function (i, docs) {
                                cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("categoryname").text() + " Services</option>");
                            });
                            $("#ddlCategory").html(cartd.join(''));
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
                        // $("#ContentPlaceHolder1_cardState").html(cartd.join(''));
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
            hidzipAvail.value = 0;
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#ddlState option:selected").text() + "', 'CityID':'" + $("#txtCity").val() + "'}",
                contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CityWiseZip");
                        var cartd = [];
                        cartd.push("<option value=0>Select ZipCode</option>")
                        $.each(docs, function (i, docs) {
                            hidzipAvail.value = 1;
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
            var zpcode = $("#txtZipcode").val();
            $.ajax({
                type: "POST", url: "ws/Category.asmx/AvailableSubCategoryzipCode", data: "{'jobtype':'2','zip':'" + zpcode + "','categoryID':'" + $("#ddlCategory").val() + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AvailSubCategories");
                        var cartd = [];
                        cartd.push("<option value=0>Select Sub Category</option>")
                        $.each(docs, function (i, docs) {
                            var ss = $(docs).find("name").text().substr(4);
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + ss + "</option>");
                        });
                        $("#ddlsubcategory").html(cartd.join(''));
                        $("#lblSuccess2").text("");
                    }
                    else {
                        $("#lblSuccess2").css("display", "block");
                        $("#lblSuccess2").text("Incorrect City/State combination.");
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
                var catValue = $("#ddlCategory").val();
                var _subCatValue;
                if (catValue == 2) {
                    _subCatValue = 5;
                }
                else if (catValue == 5) {
                    _subCatValue = 13;
                }
                else if (catValue == 3) {
                    _subCatValue = 8;
                }
                else {
                }
                $("#divzipcodeDetail").css("display", "none");
                //BindSubCategoryZip();
                $("#divzipcodeDetail").css("display", "block");
                $("#lblzipcode").text($("#txtZipcode").val());
                $("#lblcategory").text($("#ddlCategory option:selected").text());
                $("#lblSubCategory").text($("#ddlCategory option:selected").text());
                $("#divCategory").css({ "display": "block", "border": "0px solid #00c0ef", "padding": "15px" });
                $.ajax({
                    type: "POST", url: "ws/CategoryPurchase.asmx/GetSubCategoryPrice", data: "{'zipCode':'" + $("#txtZipcode").val() + "','subCategoryID':'" + _subCatValue + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
                $("#txtZipcode").val($("#ddlZipcode").val());
                $("#divlocation").css("display", "block");
                $("#divCategory").css({ "display": "block", "border": "1px solid #00c0ef", "padding": "15px" });
                $("#divZipcode").css({ "display": "block", "border": "0px solid #00c0ef", "padding": "15px" });
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

        function Valid() {
            var returnValue;
            if ($("#ContentPlaceHolder1_txtCreditCard").val() == "") {
                returnValue = "Card Number is  required";
                $("#ContentPlaceHolder1_txtCreditCard").focus();
            }
            else if ($("#ContentPlaceHolder1_ddlMonth").val() == 0) {
                returnValue = "Select Month";
            }
            else if ($("#ContentPlaceHolder1_ddlYear").val() == 0) {
                returnValue = "Select Year";
            }
            else if ($("#ContentPlaceHolder1_txtCvv").val() == "") {
                returnValue = "CVV code is  required";
                $("#ContentPlaceHolder1_txtCvv").focus();
            }
            else if ($("#ContentPlaceHolder1_cardFname").val() == "") {
                returnValue = "First Name required";
            }
            else if ($("#ContentPlaceHolder1_cardLastname").val() == "") {
                returnValue = "Last Name  required";
            }
            else if ($("#ContentPlaceHolder1_Cardaddress").val() == "") {
                returnValue = "Address required";
            }
            else if ($("#ContentPlaceHolder1_cardCity").val() == "") {
                returnValue = "City required";
            }
            else if ($("#ContentPlaceHolder1_cardState").val() == 0) {
                returnValue = "Select State";
            }
            else if ($("#ContentPlaceHolder1_cardCountry").val() == 0) {
                returnValue = "Select Country";
            }
            else if ($("#ContentPlaceHolder1_cardzipcode").val() == 0) {
                returnValue = "Select Zipcode";
            }
            else {
                returnValue = "0";
            }
            return returnValue;
        }
        $(function () {
            $("#ContentPlaceHolder1_cardState").change(function () {
                BindStateWiseZipcodeForCreditCard();
            });
            $("#ContentPlaceHolder1_cardCity").change(function () {
                BindCityWiseStates();
            });
        });
        function BindCityWiseStates() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/CityWiseStates",
                data: "{'CityID':'" + ContentPlaceHolder1_cardCity.value + "'}",
                contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CityWiseStates");
                        var cartd = [];
                        cartd.push("<option value=0>Select State</option>")
                        $.each(docs, function (i, docs) {
                            cartd.push(" <option value='" + $(docs).find("stateid").text() + "'>" + $(docs).find("stateid").text() + "</option>");
                        });
                        $("#ContentPlaceHolder1_cardState").html(cartd.join(''));
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
        function BindStateWiseZipcodeForCreditCard() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#ContentPlaceHolder1_cardState option:selected").text() + "', 'CityID':'" + ContentPlaceHolder1_cardCity.value + "'}",
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
                        $("#ContentPlaceHolder1_cardzipcode").html(cartd.join(''));
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
        $("#btnCancelCard").click(function () {
            ContentPlaceHolder1_txtCreditCard.value = "";
            ContentPlaceHolder1_cardFname.value = "";
            ContentPlaceHolder1_cardLastname.value = "";
            ContentPlaceHolder1_Cardaddress.value = "";
            ContentPlaceHolder1_cardzipcode.value = "";
            ContentPlaceHolder1_txtCvv.value = "";
            ContentPlaceHolder1_txtcity.value = "";
        });
    </script>
</asp:Content>
