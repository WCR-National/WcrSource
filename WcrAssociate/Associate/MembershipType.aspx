<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="MembershipType.aspx.cs" Inherits="WcrAssociate.Associate.MembershipType" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                    <div class="form-group">
                        <%-- <div class="col-lg-3 col-sm-3 col-md-3 col-xs-12 ">
                        </div>--%>
                        <div class="col-lg-9 col-sm-9 col-md-9 col-xs-12 ">
                            <div style="text-align: left">
                                <label for="lbltpTitle" style="font-size: 24px; font-weight: bold;">WCR Membership </label>
                                <br />
                                WCR offers the following options for your membership type.<br />
                                Monthly	- Advertisment (Sales and/or Services) charges will be applied to you on a   monthly basis.<br />
                                Quarterly	-Not yet available<br />
                                Yearly		-Not yet available<br />

                            </div>
                            <div style="visibility: hidden" id="divmembership">
                                Your Current Membership type:
                                <label id="lblMembershipType" style="text-transform: uppercase"></label>
                            </div>
                            <label for="lblpTitle">WCR Membership Options</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <select name="select" class="form-control" id="MemberShip"></select>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 " id="allbtn">
                            <br />
                            <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 ">
                                <input type="button" class="btn btn-primary" id="btnreset" value="Reset" />
                                <input type="button" class="btn btn-primary" id="btnCancel" value="Cancel" />

                            </div>
                            <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 ">
                                <input type="button" class="btn btn-primary" id="btnsave" value="Submit" />
                            </div>
                        </div>

                    </div>
                    <div class="box-header" id="divAdvtDetail" style="visibility: hidden; max-height: 200px;">
                    </div>
                </div>
            </div>

            <div role="alert" id="divSuccess" class="alert alert-success" style="visibility: hidden">
            </div>
            <!-- ./col -->
       
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $.ajax({
                type: "POST", url: "ws/AssociateSubscription.asmx/GetSubscriptionDetail", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("AssSubscription");
                        $.each(docs, function (i, docs) {
                            $("#divmembership").css("visibility", "visible");
                            $("#lblMembershipType").text($(docs).find("PlanName").text());
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
            BindMembership();
            $("#MemberShip").change(function () {
                $("#allbtn").css("visibility", "visible");
            });
            $("#btnCancel").click(function () {
                window.location.href = "Index.aspx";
            });
            $("#btnsave").click(function () {
                if (MemberShip.value == 0) {
                    alert("Select a Membership from DropDownlist!");
                    return false;
                }
                else {
                    var subscriptionID = MemberShip.value;
                    var msg = [];
                    $.ajax({
                        type: "POST", url: "ws/AssociateSubscription.asmx/InsertSubscription", data: "{'SubscriptionID':'" + subscriptionID + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (r) {
                            if (r.d == "-1") {
                                msg.push("<strong></strong>You have Already Purchased Membership!");
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
                                msg.push("<strong>Well done ! </strong>Submitted Successfully");
                                $("#divSuccess").html(msg.join(''));
                                $('#divSuccess').css("visibility", "visible");
                                setTimeout(function () {
                                    $('#divSuccess').fadeOut('fast');
                                }, 2000);
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

            $("#btnreset").click(function () {
                $.ajax({
                    type: "POST", url: "ws/AssociateSubscription.asmx/GetSubscriptionDetail", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                    success: function (r) {
                        if (r.d.length > 0) {
                            var xmlDoc = $.parseXML(r.d);
                            var xml = $(xmlDoc);
                            var docs = xml.find("AssSubscription");
                            $.each(docs, function (i, docs) {
                                MemberShip.value = $(docs).find("SubscriptionID").text();
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
        });
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

    </script>
</asp:Content>
