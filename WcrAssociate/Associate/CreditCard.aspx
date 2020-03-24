<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="CreditCard.aspx.cs" Inherits="WcrAssociate.Associate.CreditCard" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#crdclick").addClass("active");
        });
    </script>
    <div>
        <div class="modal fade small-model" id="success-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body form-horizontal">
                        <div class="alert alert-danger no-radius alert-dismissible no-margin " role="alert">
                            <button type="button" class="close align-with-two-line" id="btnsuccessClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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

    <div>
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 dashboard-block form-horizontal">
                <div class="customebox pos-rel m-t-20" id="divViewCardInfo" runat="server">
                    <h1 class="box-title ">Credit Card Information
                        <span class="btn-right">
                            <%--<input id="btnedit" type="button" class="btn btn-primary" value="Edit" />--%>
                            <asp:Button ID="btnedit" runat="server" class="btn btn-primary" Text="EDIT" OnClick="btnedit_Click" />
                        </span>
                    </h1>
                    Credit card information entered/displayed here will be the default card for all billing associated with this account.  Any changes made will result in your previous card information not being saved.<br />
                    <br />
                    <div class="row">
                        <div class="loader-wrap" id="LoadingImageLogin" style="display: none;">
                            <div class="loader"><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span><span class="loader-item"></span></div>
                        </div>
                        <div class="col-sm-6">
                            <h3 class="title-w-border">Card Account Information </h3>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Card Type: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">

                                            <asp:CheckBox ID="crdVisa" disabled="disabled" runat="server" />VISA  &nbsp;&nbsp;&nbsp;&nbsp;
                                             <asp:CheckBox ID="chkMasterCard" disabled="disabled" runat="server" />MasterCard &nbsp;&nbsp;&nbsp;&nbsp;
                                             <asp:CheckBox ID="chkAmex" disabled="disabled" runat="server" />AMEX &nbsp;&nbsp;&nbsp;&nbsp;
                                             <asp:CheckBox ID="chkDiscoverry" disabled="disabled" runat="server" />Discover &nbsp;&nbsp;&nbsp;&nbsp;                                               
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Card Number: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblCardNumber" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Exp Month: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblExpMonth" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Exp Year: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblExpYear" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">CVV Code: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblCvvCode" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h3 class="title-w-border">Cardholder Billing Information </h3>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">First Name: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblFstName" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Last Name: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblLastName" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Street Address: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblStreetAddress" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">City: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblCity" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">State: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblState" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Country: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblCountry" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">ZipCode: </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblZipCode" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="customebox pos-rel m-t-20" id="divCardEntry" runat="server">
                    <h1 class="box-title ">Credit Card Information Add/Edit
                       <%-- <span class="btn-right">                           
                            <asp:Panel ID="pnlupdate" runat="server" Visible="false">
                                <input id="btnupdate" type="button" class="btn btn-primary" value="UPDATE" />
                            </asp:Panel>
                            <asp:Button ID="Button1" Visible="false" class="btn btn-primary" Text="RESET" runat="server" OnClick="btnreset_Click" />                            
                            <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                            <asp:Panel ID="pnlAdd" runat="server" Visible="false">
                                <input id="btnAddNew" type="button" class="btn btn-primary" value="SUBMIT" />
                            </asp:Panel>
                        </span>--%>
                    </h1>
                    <p>
                        Credit card information entered/displayed here will be the default card for all billing associated with this account.  Any changes made will result in your previous card information not being saved.
                        <br />
                        <br />
                    </p>
                    <div class="row">
                        <div class="col-sm-6">
                            <h3 class="title-w-border">Card Account Information </h3>

                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Card Number </label>
                                    <div class="col-sm-9  ">
                                        <asp:HiddenField ID="CardID" runat="server" />
                                        <%--<asp:TextBox ID="hidCardID"  class="form-control"  runat="server"></asp:TextBox>--%>
                                        <asp:TextBox ID="txtCreditCard" MaxLength="19" class="form-control" placeholder="NEW CARD NUMBER" onkeypress="return IsNumeric(event);" onpaste="return false;" ondrop="return false;" runat="server"></asp:TextBox>
                                        <span id="error" style="color: Red; display: none">* Input digits (0 - 9)</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Card Type </label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:CheckBox ID="CheckBox1" Style="pointer-events: none;" runat="server" />VISA  &nbsp;&nbsp;&nbsp;&nbsp;
                                             <asp:CheckBox ID="CheckBox2" Style="pointer-events: none;" runat="server" />MasterCard &nbsp;&nbsp;&nbsp;&nbsp;
                                             <asp:CheckBox ID="CheckBox3" Style="pointer-events: none;" runat="server" />AMEX &nbsp;&nbsp;&nbsp;&nbsp;
                                             <asp:CheckBox ID="CheckBox4" Style="pointer-events: none;" runat="server" />Discover   &nbsp;&nbsp;&nbsp;&nbsp;                                             
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Exp Month </label>
                                    <div class="col-sm-9  ">
                                        <asp:DropDownList class="form-control" runat="server" ID="ddlMonth">
                                            <asp:ListItem Value="0"> Month    </asp:ListItem>
                                            <asp:ListItem Value="1"> January  </asp:ListItem>
                                            <asp:ListItem Value="2"> February </asp:ListItem>
                                            <asp:ListItem Value="3"> March    </asp:ListItem>
                                            <asp:ListItem Value="4"> April    </asp:ListItem>
                                            <asp:ListItem Value="5"> May      </asp:ListItem>
                                            <asp:ListItem Value="6"> June     </asp:ListItem>
                                            <asp:ListItem Value="7"> July     </asp:ListItem>
                                            <asp:ListItem Value="8"> August   </asp:ListItem>
                                            <asp:ListItem Value="9"> September </asp:ListItem>
                                            <asp:ListItem Value="10">October   </asp:ListItem>
                                            <asp:ListItem Value="11">November  </asp:ListItem>
                                            <asp:ListItem Value="12">December  </asp:ListItem>
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
                                <div class="col-sm-12">
                                    <label class="col-sm-3 control-label">Last Name </label>
                                    <div class="col-sm-9">
                                        <asp:TextBox ID="cardLastname" class="form-control" placeholder="LAST NAME" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <label class="col-sm-3 control-label">Street Address </label>
                                    <div class="col-sm-9  ">
                                        <asp:TextBox ID="Cardaddress" class="form-control" placeholder="STREET ADDRESS" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" style="display: none;">
                                <div class="col-sm-12">
                                    <label class="col-sm-3 control-label">Email Address </label>
                                    <div class="col-sm-9">
                                        <asp:TextBox ID="emailAddress" Visible="false" class="form-control" placeholder="Email Address" runat="server"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <label class="col-sm-3 control-label ">City </label>
                                    <div class="col-sm-9">
                                        <asp:TextBox ID="txtcity" class="form-control" placeholder="CITY" runat="server"></asp:TextBox>
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

                            <div class="form-group">
                                <div class="col-sm-12  ">

                                    <span class="btn-right">
                                        <asp:Panel ID="pnlupdate" runat="server" Visible="false">
                                            <input id="btnupdate" type="button" class="btn btn-primary" value="UPDATE" />
                                        </asp:Panel>
                                        <asp:Button ID="Button1" Visible="false" class="btn btn-primary" Text="RESET" runat="server" OnClick="btnreset_Click" />
                                        <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                                        <asp:Panel ID="pnlAdd" runat="server" Visible="false">
                                            <input id="btnAddNew" type="button" class="btn btn-primary" value="SUBMIT" />
                                        </asp:Panel>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- /.box-body -->
                </div>
            </div>
        </div>
    </div>
    <div role="alert" id="divSuccess" style="visibility: hidden;" class="alert alert-success">
    </div>
    <script src="js/jQuery-2.1.4.min.js"></script>
    <script>
        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        function IsNumeric(e) {
            var keyCode = e.which ? e.which : e.keyCode
            var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
            document.getElementById("error").style.display = ret ? "none" : "inline";
            return ret;
        }
    </script>
    <script type="text/javascript">
        $(document).ready(function () {
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

            $("#btnsuccessClose").click(function () {
                window.location.href = "CreditCard.aspx";
            });

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

            $("#divSuccess").hide();

            $("#btnCancel").click(function () {
                window.location.href = 'CreditCard.aspx';
            });

            function showLoaderLogin() {
                $("#LoadingImageLogin").css("display", "block");
            }

            function hideLoaderLogin() {
                setTimeout(function () {
                    $("#LoadingImageLogin").css("display", "none");
                }, 1000);
            }

            function BindCountry() {
                $.ajax({
                    type: "POST", url: "ws/Country.asmx/SelectCountry",
                    data: "{'flag':'1'}",
                    contentType: "application/json; charset=utf-8", dataType: "json", async: false,
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
                            $("#ContentPlaceHolder1_cardCountry").html(cartd.join(''));
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

            $("#btnAddNew").click(function () {
                var check = Valid();
                if (check == 0) {
                    $(document).on({
                        ajaxStart: function () {
                            showLoaderLogin();
                        },
                        ajaxStop: function () {
                            hideLoaderLogin();
                        }
                    });
                    var CardNumber = $("#ContentPlaceHolder1_txtCreditCard").val();
                    var Cardholder_FirstName = $("#ContentPlaceHolder1_cardFname").val();
                    var Cardholder_LastName = $("#ContentPlaceHolder1_cardLastname").val();
                    var Cardholder_Address = $("#ContentPlaceHolder1_Cardaddress").val();
                    var Cardholder_City = $("#ContentPlaceHolder1_txtcity").val();
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
                                $("#lblFailureTitle").text("Unsuccess.");
                                $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
                                $('#fail_message').modal('show');
                            }
                            else if (response == "0") {
                                $("#ContentPlaceHolder1_txtCreditCard").val('');
                                $("#ContentPlaceHolder1_cardFname").val('');
                                $("#ContentPlaceHolder1_cardLastname").val('');
                                $("#ContentPlaceHolder1_Cardaddress").val('');
                                $("#ContentPlaceHolder1_cardzipcode").val('');
                                $("#ContentPlaceHolder1_txtCvv").val('');
                                //emailAddress.value = "";
                                $("#ContentPlaceHolder1_txtcity").val('');
                                $("#lblSuccess").text("Successful!!!")
                                $("#lbldetail").text("Your credit card info has been Inserted Successfully.")
                                $('#success-message').modal('show');
                                window.location.href = "CreditCard.aspx";
                                //$("#lblSuccess").text("Inserted succesfully.");
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

            $("#btnupdate").click(function () {
                var check = Valid();
                if (check == 0) {
                    var CardNumber = $("#ContentPlaceHolder1_txtCreditCard").val();
                    var Cardholder_FirstName = $("#ContentPlaceHolder1_cardFname").val();
                    var Cardholder_LastName = $("#ContentPlaceHolder1_cardLastname").val();
                    var Cardholder_Address = $("#ContentPlaceHolder1_Cardaddress").val();
                    var Cardholder_City = $("#ContentPlaceHolder1_txtcity").val();
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
                    $(document).on({
                        ajaxStart: function () {
                            showLoaderLogin();
                        },
                        ajaxStop: function () {
                            hideLoaderLogin();
                        }
                    });
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
                                $("#lblSuccess").text("Successful!!!")
                                $("#lbldetail").text("Your credit card info has been Updated Successfully.")
                                $('#success-message').modal('show');
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

        });

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
            else if ($("#ContentPlaceHolder1_txtcity").val() == "") {
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
                BindStateWiseZipcode();
            });
            $("#ContentPlaceHolder1_txtcity").change(function () {
                BindStateWiseZipcode();
            });
        });

        function BindStateWiseZipcode() {
            debugger;
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#ContentPlaceHolder1_cardState option:selected").text() + "', 'CityID':'" + $("#ContentPlaceHolder1_txtcity").val() + "'}",
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

        function BindState() {
            var CountryId = $("#ContentPlaceHolder1_cardCountry").val();
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

                    //$('input[type="checkbox"]').on('change', function () {
            //    $(this).siblings('input[type="checkbox"]').prop('checked', false);
            //});
            //$("#ContentPlaceHolder1_txtCreditCard").change(function () {
            //    var fid = $("#ContentPlaceHolder1_txtCreditCard").val();
            //    var itemId = fid.charAt(0);
            //    if (($('#ContentPlaceHolder1_CheckBox1').is(':checked')) && itemId != 4) {
            //        alert("VISA should be start from 4.");
            //        $("#ContentPlaceHolder1_txtCreditCard").val('');
            //        return false;
            //    }
            //    else if (($('#ContentPlaceHolder1_CheckBox2').is(':checked')) && itemId != 5) {
            //        alert("Master Card should be start from 5.");
            //        $("#ContentPlaceHolder1_txtCreditCard").val('');
            //        return false;
            //    }
            //    else if (($('#ContentPlaceHolder1_CheckBox4').is(':checked')) && itemId != 6) {
            //        alert("Discover should be start from 6.");
            //        $("#ContentPlaceHolder1_txtCreditCard").val('');
            //        return false;
            //    }
            //    else if (($('#ContentPlaceHolder1_CheckBox3').is(':checked')) && itemId != 3) {
            //        alert("AMEX should be start from 3.");
            //        $("#ContentPlaceHolder1_txtCreditCard").val('');
            //        return false;
            //    }
            //    else { }
            //});
    </script>
</asp:Content>
