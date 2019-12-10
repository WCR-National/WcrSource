<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserAccountActivation.aspx.cs" Inherits="WcrAssociate.UserAccountActivation" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="icon" href="images/favicon.ico" />
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?ver=5.2.2' type='text/css' media='all' />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/loader.css" type="text/css" rel="stylesheet" />
    <link href="css/layout.css" type="text/css" rel="stylesheet" />
    <style type="text/css">
        .auto-style1 {
            font-family: Arial;
            color: #FF0000;
        }
    </style>
</head>
<body>
    <header class="main-header header-bdr">
        <nav class="navbar navbar-static-top" role="navigation">
            <a href="/index.html" class="logo">
                <h2 class="logo-lg">WCR National  <span>Associate Portal </span></h2>
            </a>
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"><span class="sr-only">Toggle navigation</span> </a>
        </nav>
    </header>
    <div class="container">
        <div class="row d-flex align-item-center custom-section">
            <div class="col-sm-7">
                <h3>Account Activation </h3>
                <div class="heightlight-section text-left">
                    <p>
                        <strong>Activation code was sent to the Email address that was supplied for this account </strong>
                    </p>
                    <form runat="server" id="form1">
                        <div class="row form-horizontal text-left">
                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <div class="form-group">
                                    <div class="col-sm-9">
                                        <label class="weight-normal">Enter Activation Code:- </label>
                                        <asp:TextBox CssClass="form-control" ID="txtEmailVerification" runat="server"></asp:TextBox>
                                        <%--<input type="text" class="form-control" id="txtEmailVerification">--%>
                                        <label id="lblSuccess1" style="color: red">
                                        </label>
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtEmailVerification" ErrorMessage="****" ValidationGroup="vf"></asp:RequiredFieldValidator>
                                    </div>
                                    <div class="col-lg-3 pt-5">
                                        <asp:Button ID="btnVerification" runat="server" Text="Verify" class="btn btn-primary" ValidationGroup="vf" OnClick="btnVerification_Click" />
                                        <%--<input type="button" id="btnVerification" value="Verify" class="btn btn-primary"/>--%>&nbsp;&nbsp;                                 
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-12">
                                        Resend New Activation Code: <a href="JavaScript:void(0);" class="t-underline" id="btnresend"><strong>Resend </strong></a>


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
                        </div>
                        <p class="bottom-text">
                            <span class="auto-style1">
                                <asp:Literal ID="Literal1" runat="server"></asp:Literal>
                            </span>
                        </p>
                    </form>
                    <p class="bottom-text">
                        If you experience problems activating your account,<br />
                        please forward your activation code email to <a href="mailto:support@wcrnational.com"><strong>support@wcrnational.com </strong></a>
                        <br />
                        Our support team will complete your account activation within 24-48 hours.
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
<script src="js/jquery-2.1.1.min.js"></script>
<script>
    $(document).ready(function () {
        function GetParameterValues(param) {
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < url.length; i++) {
                var urlparam = url[i].split('=');
                if (urlparam[0] == param) {
                    return urlparam[1];
                }
            }
        }
        $('#btnresend').click(function () {
            $("#pageloader").css("display", "block");
            setTimeout(function () {              
                resendVerificationCode();
            }, 500);
        });
        function resendVerificationCode() {
            var emailID = GetParameterValues('email');
            $.ajax({
                type: "POST", url: "ws/AssociateRegistration.asmx/ResendActivationCode",
                data: "{'EmailID':'" + emailID + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d > 0) {
                        //if (ca >= "1") {s
                        if (r.d >= "1") {
                            $("#lblSuccess1").text("Activation code has been send to your registered Email.");
                        }
                        else {
                        }
                    }
                    else {
                    }
                }
            });
            $("#pageloader").css("display", "none");
        }
    });

</script>
