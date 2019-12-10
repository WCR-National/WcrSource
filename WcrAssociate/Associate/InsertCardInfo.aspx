<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="InsertCardInfo.aspx.cs" Inherits="WcrAssociate.Associate.InsertCardInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content-wrapper">
        <section class="content">
            <!-- Small boxes (Stat box) -->
            <div id="divEntry">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">Add New Card</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  form-horizontal">
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="tel" class="form-control" id="txtCreditCard" name="cardNumber" maxlength="19" placeholder="NEW CARD NUMBER" autocomplete="cc-number" required autofocus />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" class="form-control" id="emailAddress" placeholder="Enter Email Address" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <%-- <textarea class="form-control" id="txtAddress" cols="" rows="" placeholder="Address"></textarea>--%>
                                        <label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <select style="width: 100px" id="ddlMonth">
                                            <option value="0">Month</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                        <select style="width: 100px" id="ddlYear">
                                            <option value="0">Year</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                        </select>
                                        <%-- <textarea class="form-control" id="txtdescription" cols="" rows="" placeholder="Discription"></textarea>--%>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="tel" id="txtCvv" class="form-control" name="cardCVC" placeholder="CV CODE" autocomplete="cc-csc" required />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" class="form-control" placeholder="FIRST NAME" name="FIRST NAME" id="cardFname" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" class="form-control" placeholder="LAST NAME" name="LAST NAME" id="cardLastname" />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" class="form-control" placeholder="ADDRESS" name="ADDRESS" id="Cardaddress" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="cardCountry">
                                            <option>Select Country</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="cardState">
                                            <option>Select State</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <select class="form-control" id="cardCity">
                                            <option>Select City</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input type="text" class="form-control" placeholder="Zipcode" name="Zipcode" id="cardzipcode" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input id="btnupdate" type="button" class="btn btn-primary" value="Save" /> &nbsp;&nbsp;<input id="btnReset" type="button" class="btn btn-primary" value="Reset" />
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
        </section>
    </div>

    <script type="text/javascript">
        $(document).ready(function () {
            $("#divSuccess").hide();
            $.ajax({
                type: "POST", url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        var cartd = [];
                        $.each(docs, function (i, docs) {
                            cardFname.value = ($(docs).find("FullName").text());
                            if ($(docs).find("LastName").text() == "0") {
                                //cardLastname.value=" ";
                            }
                            else {
                                cardLastname.value = ($(docs).find("LastName").text());
                            }
                            cardzipcode.value = ($(docs).find("ZipCode").text());
                            emailAddress.value = ($(docs).find("EmailID").text());
                        });
                    }
                }
            });
            BindCountry();
            $("#btnupdate").click(function () {
                var CardNumber = txtCreditCard.value;
                var Cardholder_FirstName = cardFname.value;
                var Cardholder_LastName = cardLastname.value;
                var Cardholder_Address = Cardaddress.value;
                var Cardholder_City = $('#cardCity :selected').text();
                var Cardholder_State = $('#cardState :selected').text();
                var Cardholder_Country = $('#cardCountry :selected').text();
                var Cardholder_Zip = cardzipcode.value;
                var cvv = txtCvv.value;
                var ExpMonth = ddlMonth.value;
                var ExpYear = ddlYear.value;
                var CardType = "Credit";
                var EmailId = emailAddress.value;
                var TotalAmount = "0";// lblToalAmountV.value;
                var msg = [];
                $.ajax({
                    url: "../ws/AssociateSignUp.ashx?action=CardData&CardNumber=" + CardNumber + "&Cardholder_FirstName=" + Cardholder_FirstName + "&Cardholder_LastName=" + Cardholder_LastName + "&Cardholder_Address=" + Cardholder_Address + "&Cardholder_City=" + Cardholder_City + "&Cardholder_State=" + Cardholder_State + "&Cardholder_Country=" + Cardholder_Country + "&Cardholder_Zip=" + Cardholder_Zip + "&cvv=" + cvv + "&ExpMonth=" + ExpMonth + "&ExpYear=" + ExpYear + "&CardType=" + CardType + "&email=" + EmailId + "&totalamount=" + TotalAmount + "",
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
                            $("#divSuccess").show();
                            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                            txtCreditCard.value = "";
                            cardFname.value = "";
                            cardLastname.value = "";
                            Cardaddress.value = "";
                            cardzipcode.value = "";
                            txtCvv.value = "";
                            emailAddress.value = "";                            
                            window.location.href = 'SalesCategory.aspx';
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
            });

            $("#btnReset").click(function () {
                txtCreditCard.value = "";
                emailAddress.value = "";
                txtCvv.value = "";
                cardFname.value = "";
                cardLastname.value = "";
                Cardaddress.value = "";
                cardzipcode.value = "";

            });



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
                            cartd.push(" <option value='" + $(docs).find("id").text() + "'>" + $(docs).find("Name").text() + "</option>");
                        });
                        $("#cardCountry").html(cartd.join(''));
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
            $("#cardCity").empty();
            var CountryId = cardCountry.value;
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
                        $("#cardState").html(cartd.join(''));
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
            var StateId = cardState.value;
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
                        $("#cardCity").html(cartd.join(''));
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
            $("#cardCountry").change(function () {
                BindState();
            });
        });
        function BindCity() {
            var StateId = cardState.value;
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
                        $("#cardCity").html(cartd.join(''));
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
            $("#cardState").change(function () {
                BindCity();
            });
        });
    </script>
</asp:Content>
