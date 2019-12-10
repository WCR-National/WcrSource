<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="UpdateCard.aspx.cs" Inherits="WcrAssociate.Associate.UpdateCard" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
            <!-- Small boxes (Stat box) -->
            <div id="divEntry">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">
                                    <label id="lblTitle"></label>
                                </h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  form-horizontal">
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:TextBox ID="txtCreditCard" class="form-control" placeholder="NEW CARD NUMBER" runat="server"></asp:TextBox>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <%--<div class='row'>--%>
                                <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 share'>
                                    <div class="form-group">
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 ">
                                            Exp Month
                                        <asp:DropDownList class="form-control" runat="server" ID="ddlMonth">
                                            <asp:ListItem Value="0">Month</asp:ListItem>
                                            <asp:ListItem Value="1">1</asp:ListItem>
                                            <asp:ListItem Value="2">2</asp:ListItem>
                                            <asp:ListItem Value="3">3</asp:ListItem>
                                            <asp:ListItem Value="4">4</asp:ListItem>
                                            <asp:ListItem Value="5">5</asp:ListItem>
                                            <asp:ListItem Value="6">6</asp:ListItem>
                                            <asp:ListItem Value="7">7</asp:ListItem>
                                            <asp:ListItem Value="8">8</asp:ListItem>
                                            <asp:ListItem Value="9">9</asp:ListItem>
                                            <asp:ListItem Value="10">10</asp:ListItem>
                                            <asp:ListItem Value="11">11</asp:ListItem>
                                            <asp:ListItem Value="12">12</asp:ListItem>
                                        </asp:DropDownList>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 ">
                                            Exp Year
                                        <asp:DropDownList class="form-control" runat="server" ID="ddlYear">
                                            <asp:ListItem Value="0">Year</asp:ListItem>
                                            <asp:ListItem Value="2016">2016</asp:ListItem>
                                            <asp:ListItem Value="2017">2017</asp:ListItem>
                                            <asp:ListItem Value="2018">2018</asp:ListItem>
                                            <asp:ListItem Value="2019">2019</asp:ListItem>
                                            <asp:ListItem Value="2020">2020</asp:ListItem>
                                            <asp:ListItem Value="2021">2021</asp:ListItem>
                                            <asp:ListItem Value="2022">2022</asp:ListItem>
                                        </asp:DropDownList>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 ">
                                            CVV Code
                                                <asp:TextBox ID="txtCvv" class="form-control" Style="width: 100px" placeholder="CV CODE" runat="server"></asp:TextBox>
                                        </div>

                                    </div>

                                </div>
                                <%-- </div>--%>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:TextBox ID="cardFname" class="form-control" placeholder="FIRST NAME" runat="server"></asp:TextBox>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:TextBox ID="cardLastname" class="form-control" placeholder="LAST NAME" runat="server"></asp:TextBox><br />
                                        <asp:TextBox ID="Cardaddress" class="form-control" placeholder="STREET ADDRESS" runat="server"></asp:TextBox>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:TextBox ID="emailAddress" Visible="false" class="form-control" placeholder="Email Address" runat="server"></asp:TextBox>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:TextBox ID="txtcity" class="form-control" placeholder="CITY" runat="server"></asp:TextBox>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:DropDownList runat="server" class="form-control" ID="cardState">
                                        </asp:DropDownList>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <asp:DropDownList runat="server" class="form-control" ID="cardCountry">
                                        </asp:DropDownList>

                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <%-- <asp:TextBox ID="cardzipcode" class="form-control" placeholder="Zipcode" runat="server"></asp:TextBox>--%>
                                        <asp:DropDownList runat="server" class="form-control" ID="cardzipcode">
                                        </asp:DropDownList>
                                        <%-- <select class="form-control" id="">
                                            <option>Select ZipCode</option>
                                        </select>--%>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                                        <asp:Button ID="btnreset" class="btn btn-primary" Text="RESET" runat="server" OnClick="btnreset_Click" />
                                        <%--<input id="btnreset" type="button" class="btn btn-primary" value="RESET" />--%>
                                        &nbsp;&nbsp;
                                         <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                                        &nbsp;&nbsp;                                       
                                       
                                        
                                    </div>
                                   <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-left:170px;">
                                        <asp:HiddenField ID="hidCardID" runat="server" />
                                        <input id="btnupdate" type="button" class="btn btn-primary" style="visibility:hidden;" value="UPDATE" />
                                        <input id="btnAddNew" type="button" class="btn btn-primary" style="visibility:hidden;" value="SUBMIT" />
                                    </div>
                                     <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                         </div>
                                </div>
                            </div>
                        </div>
                        <div role="alert" id="divSuccess" style="visibility:hidden;" class="alert alert-success">
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
            </div>
            <!-- ./col -->
       
    <script src="js/jQuery-2.1.4.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/AssociateCardExists", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("CheckAssoCard");
                        if ($(docs).find("id").text() >= 1) {
                            $("#lblTitle").text("Card Update");
                            $("#btnupdate").css("visibility", "visible");
                            $("#btnAddNew").css("visibility", "hidden");
                        }
                        else {
                            $("#btnupdate").css("visibility", "hidden");
                            $("#btnAddNew").css("visibility", "visible");
                            $("#lblTitle").text("Add New Card");
                        }
                    }
                }
            });
            BindCountry();
            $('#ContentPlaceHolder1_cardCountry').val('US');
            BindState();
            //$('#ContentPlaceHolder1_cardState').val('AA');
            BindStateWiseZipcode();
            $("#divSuccess").hide();
            ////$("#ContentPlaceHolder1_btnreset").click(function () {
            ////    ContentPlaceHolder1_txtCreditCard.value = "";
            ////    ContentPlaceHolder1_cardFname.value = "";
            ////    ContentPlaceHolder1_cardLastname.value = "";
            ////    ContentPlaceHolder1_Cardaddress.value = "";
            ////    ContentPlaceHolder1_txtCvv.value = "";
            ////    ContentPlaceHolder1_cardzipcode.value = "";
            ////    ContentPlaceHolder1_txtcity.value = "";
            ////    $('#ContentPlaceHolder1_cardState').val('Select State');
            ////    $('#ContentPlaceHolder1_ddlMonth').val('Month');
            ////    $('#ContentPlaceHolder1_ddlYear').val('Year');
            ////});
            $("#btnCancel").click(function () {
                ContentPlaceHolder1_txtCreditCard.value = "";
                ContentPlaceHolder1_cardFname.value = "";
                ContentPlaceHolder1_txtCvv.value = "";
                ContentPlaceHolder1_cardLastname.value = "";
                ContentPlaceHolder1_Cardaddress.value = "";
                ContentPlaceHolder1_cardzipcode.value = "";
                window.location.href = 'Index.aspx';
            });
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
                    var CardNumber = ContentPlaceHolder1_txtCreditCard.value;
                    var Cardholder_FirstName = ContentPlaceHolder1_cardFname.value;
                    var Cardholder_LastName = ContentPlaceHolder1_cardLastname.value;
                    var Cardholder_Address = ContentPlaceHolder1_Cardaddress.value;
                    var Cardholder_City = ContentPlaceHolder1_txtcity.value;
                    var Cardholder_State = $('#ContentPlaceHolder1_cardState :selected').text();
                    var Cardholder_Country = $('#ContentPlaceHolder1_cardCountry :selected').text();
                    var Cardholder_Zip = $('#ContentPlaceHolder1_cardzipcode :selected').text();
                    var cvv = ContentPlaceHolder1_txtCvv.value;
                    var ExpMonth = ContentPlaceHolder1_ddlMonth.value;
                    var ExpYear = ContentPlaceHolder1_ddlYear.value;
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
                                alert("This Email Id or User name or Mobile No Already Exists! Please Try another one.");
                            }
                            if (response == "0") {
                                msg.push("<strong>Well done ! </strong>Submitted Successfully");
                                $("#divSuccess").html(msg.join(''));
                                $("#divSuccess").css("visibility", "visible");
                                setTimeout(function () {
                                    $('#divSuccess').fadeOut('fast');
                                }, 2000);
                                txtCreditCard.value = "";
                                cardFname.value = "";
                                cardLastname.value = "";
                                Cardaddress.value = "";
                                cardzipcode.value = "";
                                txtCvv.value = "";
                                emailAddress.value = "";
                                txtcity.value = "";
                            }
                            if (response == "-1") {
                                alert("Some Error is Occured, Please Contact to System Admin..");
                            }
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
                    var CardNumber = ContentPlaceHolder1_txtCreditCard.value;
                    var Cardholder_FirstName = ContentPlaceHolder1_cardFname.value;
                    var Cardholder_LastName = ContentPlaceHolder1_cardLastname.value;
                    var Cardholder_Address = ContentPlaceHolder1_Cardaddress.value;
                    var Cardholder_City = ContentPlaceHolder1_txtcity.value;
                    var Cardholder_State = $('#ContentPlaceHolder1_cardState :selected').text();
                    var Cardholder_Country = $('#ContentPlaceHolder1_cardCountry :selected').text();
                    var Cardholder_Zip = ContentPlaceHolder1_cardzipcode.value;
                    var cvv = ContentPlaceHolder1_txtCvv.value;
                    var ExpMonth = ContentPlaceHolder1_ddlMonth.value;
                    var ExpYear = ContentPlaceHolder1_ddlYear.value;
                    var CardType = "Credit";
                    var TotalAmount = "0";// lblToalAmountV.value;
                    var cardid = ContentPlaceHolder1_hidCardID.value;
                    var msg = [];
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
                                alert("This Email Id or User name or Mobile No Already Exists! Please Try another one.");
                            }
                            if (response == "0") {
                                msg.push("<strong>Well done ! </strong>Submitted Successfully");
                                $("#divSuccess").html(msg.join(''));
                                $("#divSuccess").css("visibility", "visible");
                                setTimeout(function () {
                                    $('#divSuccess').fadeOut('fast');
                                }, 2000);
                                txtCreditCard.value = "";
                                cardFname.value = "";
                                cardLastname.value = "";
                                Cardaddress.value = "";
                                cardzipcode.value = "";
                                txtCvv.value = "";
                                emailAddress.value = "";
                                txtcity.value = "";
                            }
                            if (response == "-1") {
                                alert("Some Error is Occured, Please Contact to System Admin..");
                            }
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
            if (ContentPlaceHolder1_txtCreditCard.value == "") {
                returnValue = "Card Number is  required";
                $("#ContentPlaceHolder1_txtCreditCard.value").focus();
            }
            else if (ContentPlaceHolder1_ddlMonth.value == 0) {
                returnValue = "Select Month";
            }
            else if (ContentPlaceHolder1_ddlYear.value == 0) {
                returnValue = "Select Year";
            }
            else if (ContentPlaceHolder1_txtCvv.value == "") {
                returnValue = "CVV code is  required";
                $("#ContentPlaceHolder1_txtCvv.value").focus();
            }
            else if (ContentPlaceHolder1_cardFname.value == "") {
                returnValue = "First Name required";
            }
            else if (ContentPlaceHolder1_cardLastname.value == "") {
                returnValue = "Last Name  required";
            }
            else if (ContentPlaceHolder1_Cardaddress.value == "") {
                returnValue = "Address required";
            }
            else if (ContentPlaceHolder1_txtcity.value == "") {
                returnValue = "City required";
            }
            else if (ContentPlaceHolder1_cardState.value == 0) {
                returnValue = "Select State";
            }
            else if (ContentPlaceHolder1_cardCountry.value == 0) {
                returnValue = "Select Country";
            }
            else if (ContentPlaceHolder1_cardzipcode.value == 0) {
                returnValue = "Select Zipcode";
            }
            else {
                returnValue = "0";
            }
            return returnValue;
        }
        $(function () {
            $("#ContentPlaceHolder1_cardCountry").change(function () {
                BindState();
            });
            $("#ContentPlaceHolder1_txtcity").change(function () {
                BindStateWiseZipcode();
            });
        });
        function BindStateWiseZipcode() {
            $.ajax({
                type: "POST", url: "ws/CategoryPurchase.asmx/StateWiseZipCode",
                data: "{'StateID':'" + $("#ContentPlaceHolder1_cardState option:selected").text() + "', 'CityID':'" + ContentPlaceHolder1_txtcity.value + "'}",
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
            var CountryId = ContentPlaceHolder1_cardCountry.value;
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
    </script>
</asp:Content>
