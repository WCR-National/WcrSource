<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="ViewProfile.aspx.cs" Inherits="WcrAssociate.Associate.ViewProfile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#profileclick").addClass("active");
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
    <div id="divEntry">
        <div class="row ">
            <div class=" col-sm-12 dashboard-block ">
                <h1>Your Profile 
                    <span class="btn-right" id="dEdit" style="display: block;">
                        <input id="btnedit" type="button" class="btn btn-primary" value="EDIT" />
                    </span>
                    <span class="btn-right" id="dUpdate" style="display: none;">
                        <asp:Button ID="Button1" CssClass="btn btn-primary" runat="server" Text="RESET" OnClick="btnreset_Click" />
                        <%--<input id="btnreset" type="button" class="btn btn-primary" value="RESET" />--%>
                        <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                        <input id="btnSubmit" type="button" class="btn btn-primary" value="UPDATE" />
                    </span>
                </h1>
                 <div style="display:none;" id="info">
                <p>
                    <b>Welcome to WCR National.
                    </b>
                </p>
                <p>
                    Please begin by filling out your profile information.
                </p>
                <p>
                    Once you’ve completed this step, the rest of the Primary Menu items will be fully available for your use.
                </p>
                <p>
                    If you have any issues or concerns, you can contact customer support by clicking the ‘Customer Support’ tab towards the bottom of the menu items list.
                </p>
                <p>
                    Thank you.
                </p>
            </div>
            </div>
        </div>
        <div class="row dashboard-block  ">
            <div class=" col-sm-5 ">
                <%--<img src="Adv_img/95second.png" class="img-responsive img-thumbnail" />--%>
                <%--  <div id="profilePic"></div>--%>
                <div class="thumbnail-user text-center" id="pprofilePic"></div>
                <%-- <asp:Image class='img-responsive img-thumbnail' alt='User Image' runat="server" ID="imgAssociatePhoto" />--%>
                <input type="file" style="margin-left: 0px; display: none;" class="form-control" id="FileUpload1" />
            </div>
            <div class="col-sm-7 m-t-20">
                <div class=" customebox static" id="divViewProfile" style="display: none;">
                    <div class="box-body  form-horizontal  actual-detail">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">First Name</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblFirstName"></label>
                                            <%-- <asp:Label ID="lblFirstName" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Last Name</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblLastName"></label>
                                            <%--<asp:Label ID="lblLastName" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <%-- <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">User Name</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <asp:Label ID="lblUserName" runat="server"></asp:Label>
                                        </p>
                                    </div>
                                </div>
                            </div>--%>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Email Address</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblEmail"></label>
                                            <%--<asp:Label ID="lblEmail" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Password</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblPassword"></label>
                                            <%--<asp:Label ID="lblPassword" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Mobile Number</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblContactNo"></label>
                                            <%--<asp:Label ID="lblContact" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <%-- <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">ZipCode</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblZipcode"></label>
                                           
                                        </p>
                                    </div>
                                </div>
                            </div>--%>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">License#</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static">
                                            <label id="lblLicense"></label>
                                            <%--<asp:Label ID="lblLicense" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Issuing State</label>
                                    <div class="col-sm-9  ">
                                        <p class="form-control-static" style="background-image: url()">
                                            <label id="lblLicenseState"></label>
                                            <%--<asp:Label ID="lblLicenseState" runat="server"></asp:Label>--%>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="alert" id="divSuccess" class="alert alert-success" style="display: none">
                </div>
                <div class=" customebox pos-rel" id="divEditProfile" style="display: none;">
                    <%-- <h1>Your Profile  <span class="btn-right">
                        <asp:Button ID="btnreset" CssClass="btn btn-primary" runat="server" Text="RESET" OnClick="btnreset_Click" />                       
                        <input id="btnCancel" type="button" class="btn btn-primary" value="CANCEL" />
                        <input id="btnSubmit" type="button" class="btn btn-primary" value="UPDATE" />
                    </span>
                    </h1>--%>
                    <!-- /.box-header -->
                    <div class="box-body  form-horizontal">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">First Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" id="txtfName" class="form-control" />
                                        <%--  <asp:TextBox ID="txtfName" runat="server" class="form-control" />--%>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Last Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" id="txtLName" class="form-control" />
                                        <%--  <asp:TextBox ID="txtLName" runat="server" class="form-control" />--%>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Email Address</label>
                                    <div class="col-sm-9  ">
                                        <input type="text" id="txtEmailAddress"  class="form-control" />
                                        <%--  <asp:TextBox ID="txtEmailAddress" runat="server" ReadOnly="true" class="form-control" />--%>
                                    </div>
                                </div>
                            </div>
                            <%-- <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">User Name</label>
                                    <div class="col-sm-9">
                                        <asp:TextBox ID="txtUserName" runat="server" class="form-control" />                                    
                                    </div>
                                </div>
                            </div>--%>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Password</label>
                                    <div class="col-sm-9 ">
                                        <input type="text" id="txtPassword" autocomplete="off" maxlength="20" title="Password must have a minimum of 8 characters and a maximum of 20 characters in length and must include at least 1 Upper case letter, 1 lower case letter, 1 number and 1 special character in ! @ # $ % ^ * _ " class="form-control" />
                                        <div id="message" class="alert alert-default" style="display: none;">
                                            <h5><strong>Password must contain the following: </strong></h5>
                                            <p id="letter" class="invalid">A lowercase letter</p>
                                            <div class="clearfix"></div>
                                            <p id="capital" class="invalid">A capital (uppercase) letter</p>
                                            <div class="clearfix"></div>
                                            <p id="number" class="invalid">A number</p>
                                            <div class="clearfix"></div>
                                            <p id="length" class="invalid">Minimum of 8 char & a max of 20 char in length</p>
                                            <div class="clearfix"></div>
                                            <p id="specialcharacter" class="invalid">1 special character in ! @ # $ % ^ * _ </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Mobile Number</label>
                                    <div class="col-sm-9  ">
                                        <input type="text" id="txtContactNumber" class="form-control" />
                                        <%--<asp:TextBox ID="txtContactNumber" runat="server" class="form-control" />--%>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Licence ID </label>
                                    <div class="col-sm-9  ">
                                        <input type="text" id="txtLicenceID" class="form-control" />
                                        <%--<asp:TextBox ID="txtLicenceID" runat="server" class="form-control" />--%>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">Licence State </label>
                                    <div class="col-sm-9  ">
                                        <input type="text" id="txtLicenceState" class="form-control" />
                                        <%--<asp:TextBox ID="txtLicenceState" runat="server" class="form-control" />--%>
                                    </div>
                                </div>
                            </div>
                            <%--<div class="form-group">
                                <div class="col-sm-12  ">
                                    <label class="col-sm-3 control-label ">ZipCode </label>
                                    <div class="col-sm-9  ">
                                        <input type="text" id="txtZipcode" class="form-control" />                                        
                                    </div>
                                </div>
                            </div>--%>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $("#txtEmailAddress").attr("disabled", true);
            $("#divViewProfile").css("display", "block");
            $("#divEditProfile").css("display", "none");
            BindData();
            $("#FileUpload1").on('change', function () {
                if (typeof (FileReader) != "undefined") {
                    var image_holder = $("#pprofilePic");
                    image_holder.empty();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "thumb-image"
                        }).appendTo(image_holder);
                    }
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[0]);

                } else {
                    alert("This browser does not support FileReader.");
                }
            });
            $("#btnSubmit").click(function () {
                var check = Valid();
                if (check == "1") {
                    $("#pageloader").css("display", "block");
                    setTimeout(function () {
                        UpdateInfo();
                    }, 500);
                }
                else {
                    $("#lblFailureTitle").text("Unsuccessfull!!!");
                    $("#lblFailureDetail").text(check);
                    $('#fail_message').modal('show');
                    //alert(check);
                }
            });
            function UpdateInfo()
            {
                var FullName = txtfName.value;
                var LName = txtLName.value;
                var emailID = txtEmailAddress.value;
                var password = txtPassword.value;
                var mobileNo = txtContactNumber.value;
                var licenseID = txtLicenceID.value;
                var licenseState = txtLicenceState.value;
                showLoader();
                var msg = [];
                $.ajax({
                    type: "POST",
                    url: "../ws/AssociateRegistration.asmx/UpdateAssociate",
                    data: "{'FullName':'" + FullName + "','LastName':'" + LName + "','Password':'" + password + "','EmailID':'" + emailID + "','MobileNo':'" + mobileNo + "','LicenceID':'" + licenseID + "','LicenceState':'" + licenseState + "','ZipCode':'0'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        hideLoader();
                        if (r.d == "1") {
                            if ($('#FileUpload1').get(0).files.length === 0) {
                                $("#lblSuccess").text("Successful!!!");
                                $("#lbldetail").text("Your profile has been updated Successfully.");
                                $('#success-message').modal('show');
                                $("#divViewProfile").css("display", "block");
                                $("#divEditProfile").css("display", "none");
                            }
                            else {
                                var fileUpload = $("#FileUpload1").get(0);
                                var files = fileUpload.files;
                                //image resize code here
                                var test = new FormData();
                                for (var i = 0; i < files.length; i++) {
                                    test.append(files[i].name, files[i]);
                                }
                                $.ajax({
                                    url: "ws/UpdatePic.ashx",
                                    type: "POST",
                                    contentType: false,
                                    processData: false,
                                    data: test,
                                    success: function (result) {
                                        $("#lblSuccess").text("Successful!!!");
                                        $("#lbldetail").text("Your profile has been updated Successfully.");
                                        $('#success-message').modal('show');
                                        $("#divViewProfile").css("display", "block");
                                        $("#divEditProfile").css("display", "none");
                                    },
                                    error: function (err) {
                                        alert(err.statusText);
                                    }
                                });
                            }
                            window.location.href = "ViewProfile.aspx";
                            //alert("Updated Succesfully.");
                        }
                        if (r.d == "0") {
                            $("#lblFailureTitle").text("Unsuccessfull!!!");
                            $("#lblFailureDetail").text("This Email Id or User name or Mobile No Already Exists! Please Try another one.");
                            $('#fail_message').modal('show');
                        }
                        if (r.d == "-1") {
                            $("#lblFailureTitle").text("Unsuccessfull!!!");
                            $("#lblFailureDetail").text("This Email Id or User name or Mobile No Already Exists! Please Try another one.");
                            $('#fail_message').modal('show');
                        }
                    },
                    failure: function (response) {
                        alert(response + "Fail");
                    },
                    error: function (response) {
                        alert(response + "Error...");
                    }
                });
                hideLoader();
            }
            function showLoader() {
                $("#pageloader").css("display", "block");
            }
            function hideLoader() {               
                    $("#pageloader").css("display", "none");               
            }
            $("#btnedit").click(function () {
                $("#divEditProfile").css("display", "block");
                $("#divViewProfile").css("display", "none");
                $("#FileUpload1").css("display", "block");
                $("#dUpdate").css("display", "block");
                $("#dEdit").css("display", "none");

            });
            //$("#btnreset").click(function () {
            //    BindData();
            //    $("#divEditProfile").css("display", "block");
            //    $("#FileUpload1").css("display", "block");
            //});
            $("#txtPassword").focusin(function () {
                $("#message").css("display", "block");
            });
            $("#txtPassword").blur(function () {
                $("#message").css("display", "none");
            });
            $("#btnCancel").click(function () {
                window.location.href = "ViewProfile.aspx";
            });
            $("#txtPassword").keyup(function () {
                $("#message").css("display", "block");
                var lowerCaseLetters = /[a-z]/g;
                var upperCaseLetters = /[A-Z]/g;
                var numbers = /[0-9]/g;
                if (lowerCaseLetters.test(this.value)) {
                    $("#letter").removeClass("invalid");
                    $("#letter").addClass("valid");
                }
                else {
                    $("#letter").removeClass("valid");
                    $("#letter").addClass("invalid");
                }
                if (upperCaseLetters.test(this.value)) {
                    $("#capital").removeClass("invalid");
                    $("#capital").addClass("valid");
                }
                else {
                    $("#capital").removeClass("valid");
                    $("#capital").addClass("invalid");
                }
                if (numbers.test(this.value)) {
                    $("#number").removeClass("invalid");
                    $("#number").addClass("valid");
                }
                else {
                    $("#number").removeClass("valid");
                    $("#number").addClass("invalid");
                }
                if ($("#txtPassword").val().length < 8) {
                    $("#length").removeClass("valid");
                    $("#length").addClass("invalid");
                }
                else {
                    $("#length").removeClass("invalid");
                    $("#length").addClass("valid");
                }
                var str = $('#txtPassword').val();
                var regex = /[^\w\s]/gi;
                if (regex.test(str) == true) {
                    $("#specialcharacter").removeClass("invalid");
                    $("#specialcharacter").addClass("valid");
                }
                else {
                    $("#specialcharacter").removeClass("valid");
                    $("#specialcharacter").addClass("invalid");
                }
            });


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
                                $("#interestedConsumer").addClass("diable-sidelink");
                                $("#divAssociateCategory").addClass("diable-sidelink");
                                $("#divSalesCount").addClass("diable-sidelink");
                                $("#divServicesCount").addClass("diable-sidelink");
                                $("#info").css("display", "block");
                                

                            }
                            else {
                                 $("#info").css("display", "none");
                                

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
        });
        function Valid() {
            var minLength = 8;
            var maxLength = 20;
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            var str = $('#txtPassword').val();
            var upper_text = new RegExp('[A-Z]');
            var lower_text = new RegExp('[a-z]');
            var number_check = new RegExp('[0-9]');
            var special_char = new RegExp('[!/\'^�$%&*()}{@#~?><>,|=_+�-\]');
            var Moblength = txtContactNumber.value;
            //var str = txtPassword.value;
            var returnValue;
            if (txtfName.value == "") {
                returnValue = "Name Required.";
                $("#txtfName").focus();
            }
            else if (txtEmailAddress.value == "") {
                returnValue = "Email Required.";
                $("#txtEmailAddress").focus();
            }
            else if (!filter.test($('#txtEmailAddress').val())) {
                returnValue = "Email is not Valid";
                $("#txtEmailAddress").focus();
            }
            else if (txtPassword.value == "") {
                returnValue = "Password Required.";
                $("#txtPassword").focus();
            }
            else if (str.length < minLength) {
                returnValue = "Password must have a minimum of 8 characters.";
            }
            else if (str.length > maxLength) {
                returnValue = "Password must have a maximum of 20 characters.";
            }
            else if (!str.match(upper_text)) {
                //$("#divPassmsg").css("display", "block");
                //$('#divPassmsg').html("One Upper Case Letter ");
                //$('#divPassmsg').css("color", "red"); 
                returnValue = "Must include at least 1 Upper case character.";
                $("#txtPassword").focus();
            }
            else if (!str.match(lower_text)) {
                returnValue = "Must include at least 1 Lower case character.";
                $("#txtPassword").focus();
            }
            else if (!str.match(number_check)) {
                returnValue = "Must include at least 1 Number.";
                $("#txtPassword").focus();
            }
            else if (!str.match(special_char)) {
                returnValue = "Must include at least 1 special character.";
                $("#txtPassword").focus();
            }
            else if (txtContactNumber.value == "") {
                returnValue = "Contact Number Required.";
                $("#txtContactNumber").focus();
            }
            else if (Moblength.length != 10) {
                returnValue = "Please enter correct value in Mobile box!";
                $("#txtContactNumber").focus();
            }            
            else if (!isNaN(txtContactNumber.value) == "") {
                returnValue = "Characters not allowed in Mobile Number!";
                $("#txtContactNumber").focus();
            }
            else if (txtLicenceID.value == "") {
                returnValue = "Licence ID Required.";
                $("#txtLicenceID").focus();
            }
            else if (txtLicenceState.value == "") {
                returnValue = "Licence State Required.";
                $("#txtLicenceState").focus();
            }
            else {
                returnValue = "1";
            }
            return returnValue;
        }
        function BindData() {
            $.ajax({
                type: "POST", url: "../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {
                            $("#lblFirstName").text($(docs).find("FullName").text());
                            $("#lblLastName").text($(docs).find("LastName").text());
                            $("#lblUserName").text($(docs).find("UserName").text());
                            $("#lblEmail").text($(docs).find("Email").text());
                            $("#lblPassword").text($(docs).find("Password").text());
                            $("#lblContactNo").text($(docs).find("MobileNo").text());
                            //$("#lblZipcode").text($(docs).find("ZipCode").text());
                            $("#lblLicense").text($(docs).find("LicenseId").text());
                            $("#lblLicenseState").text($(docs).find("LicenseState").text());
                            var sd = [];
                            if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                                sd.push("<img   alt='User Image' src='../AssociatePhoto/" + $(docs).find("Photo").text() + "'/> ");
                            }
                            else {
                                sd.push("<img  alt='User Image' src='../AssociatePhoto/0.png'/>");
                            }
                            $("#pprofilePic").html(sd.join(''));
                            $("#txtfName").val($(docs).find("FullName").text());
                            $("#txtLName").val($(docs).find("LastName").text());
                            $("#txtEmailAddress").val($(docs).find("Email").text());
                            $("#txtPassword").val($(docs).find("Password").text());
                            $("#txtContactNumber").val($(docs).find("MobileNo").text());
                            $("#txtLicenceState").val($(docs).find("LicenseState").text());
                            $("#txtLicenceID").val($(docs).find("LicenseId").text());
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
    </script>







</asp:Content>
