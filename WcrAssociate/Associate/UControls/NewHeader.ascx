<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NewHeader.ascx.cs" Inherits="WcrAssociate.Associate.UControls.NewHeader" %>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="plugins/fullcalendar/fullcalendar.min.css">
<link rel="stylesheet" href="plugins/fullcalendar/fullcalendar.print.css" media="print">
<link rel="stylesheet" href="dist/css/AdminLTE.min.css">
<link rel="stylesheet" href="css/layout.css">
<header class="main-header">
    <%--<a href="../../salesnew.html?ca=1&zip=" target="_blank" class="logo">--%>
    <a href="#" class="logo">
        <h2 class="logo-mini">WCR National</h2>
        <h2 class="logo-lg">WCR National  <span>Associate Portal </span></h2>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"><span class="sr-only">Toggle navigation</span> </a>

        <div class="row user-panel">
            <div class="user-info" id="uprofile">
                <span class="image-edit"> <a href="ViewProfile.aspx"> <i class="fa fa-pencil"></i> </a> </span>

                <div id="profilePic" class="user-img"></div>

                <%--<asp:Image class='img-circle user-img' alt='User Image' runat="server" ID="imgAssociatePhoto" />--%>

                <h2 style="text-transform: uppercase">
                    <span> WCR ID : 
                         <label id="lblAssociateID"></label> </span>
                    <label id="lblName"></label> <label id="lbllastName"></label>
                    <%--<asp:Label ID="lblName" runat="server"></asp:Label>--%>
                </h2>
                <ul>
                    <li><strong> License </strong>
                           <label id="lblLicenceID"></label>
                        <%--<asp:Label ID="" runat="server"></asp:Label>--%>
                    </li>
                    <li><strong> Contact </strong>
                         <label id="lblContact"></label>
                        <%--<asp:Label ID="lblLicenceState" runat="server"></asp:Label>--%>
                    </li>
                    <li><strong>Email </strong>
                        <label id="lblEmailid"></label>

                    </li>
                    <li>
                       <%-- <asp:Label ID="lblAssociateID" runat="server"></asp:Label>--%>
                    </li>
                </ul>
            </div>





        </div>

    </nav>
    <script src="js/jQuery-2.1.4.min.js"></script>

    <script>
        $(document).ready(function () {
            $.ajax({
                type: "POST", url: "../../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails",
                data: "{}", contentType: "application/json; charset=utf-8", dataType: "json",
                async: false,
                success: function (r) {
                    if (r.d.length > 0) {                        
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        var cartd = [];
                        var sd = [];
                        $.each(docs, function (i, docs) {
                            $("#lblName").text($(docs).find("FullName").text());
                            $("#lbllastName").text($(docs).find("LastName").text());                            
                            $("#lblLicenceID").text($(docs).find("LicenseId").text());
                            $("#lblContact").text($(docs).find("MobileNo").text());
                            $("#lblEmailid").text($(docs).find("Email").text());
                            $("#lblAssociateID").text($(docs).find("AssociateId").text());
                            //$('#ContentPlaceHolder1_lblName').value = $(docs).find("FullName").text();
                            //$('#ContentPlaceHolder1_lblLicenceState').value = $(docs).find("LicenseState").text();
                            //$('#ContentPlaceHolder1_lblLicenceID').value = $(docs).find("LicenseId").text();                           
                            ////NewHeader_lblName.value = $(docs).find("Email").text();
                           
                            //$('#ContentPlaceHolder1_lblAssociateID').value = $(docs).find("AssociateId").text();

                            if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                                //cartd.push("<img class='img-circle user-img' alt='User Image' src='../AssociatePhoto/" + $(docs).find("Photo").text() + "'/>");
                                sd.push("<img  alt='User Image' src='../AssociatePhoto/" + $(docs).find("Photo").text() + "'/> ");
                            }
                            else {
                                sd.push("<img  alt='User Image' src='../AssociatePhoto/0.png'/>");

                            }
                        });

                        $("#profilePic").html(sd.join(''));


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

    </script>

    <%--<script type="text/javascript">
        $(document).ready(function () {
            setTimeout(function () {
                //   $('#msg' + pnlID).fadeOut('fast');
                var contentRight = $(".content-wrapper").height();
                $('.main-sidebar').css('height', contentRight);
                $('.content').css('height', contentRight);
            }, 9000);

        });
        $(window).resize(function () {
          //  var contentRight = $(".content-wrapper").height();
          //  $('.main-sidebar').css('height', contentRight - 155);
          //  $('.content').css('height', contentRight);
        });
    </script>--%>
</header>


