<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="message.aspx.cs" Inherits="WcrWebApplication.Associate.message" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" type="text/css" href="demo.css" />   
    <script>
        $(document).ready(function () {
            $("#divSuccess").hide();
            $("#divShow").show();
            $("#divNewmail").hide();
            $("#divSendmessage").hide();
            $("#btnInbox").click(function () {
                $("#divSuccess").hide();
                $("#divShow").show();
                $("#divNewmail").hide();
                $("#divSendmessage").hide();
            });
            $("#btnSend").click(function () {
                $("#divSuccess").hide();
                $("#divShow").hide();
                $("#divNewmail").hide();
                $("#divSendmessage").show();
                BindData();
            });
            $("#btnCompose").click(function () {
                $("#divSuccess").hide();
                $("#divShow").hide();
                $("#divNewmail").show();
                $("#divSendmessage").hide();
            });
            $("#Button1").click(function () {
                var msg = [];
                $.ajax({
                    type: "POST",
                    url: "ws/SendMessage.asmx/SendMessages",
                    data: "{'subject':'" + txtTitle.value + "','bodytext':'" + txtbody.value + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.d == "1") {
                            msg.push("<strong></strong>Message Send Successfully");
                            $("#divSuccess").html(msg.join(''));
                            $("#divSuccess").show();
                            setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 2000);
                            txtTitle.value = "";
                            txtbody.value = "";
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
            });
        });
        function BindData() {
            $.ajax({
                type: "POST", url: "ws/SendMessage.asmx/SelectSentMessages", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewSentMessages");
                        var cartd = [];
                        cartd.push("<div class='accordion'>");
                        var count = 1;
                        $.each(docs, function (i, docs) {                            
                            cartd.push("<div class='accordion-section'>");
                            cartd.push("<a class='accordion-section-title' href='#accordion-" + count + "'>" + ($(docs).find("subject").text()) + "</a>");
                            cartd.push("<div id='accordion-" + count + "' class='accordion-section-content'>");
                            cartd.push("<p>" + ($(docs).find("bodytext").text() + " </p>"));
                            cartd.push("</div></div>");
                            count++;
                        });
                        cartd.push("</div>");
                        $("#divSendmessage").html(cartd.join(''));
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
    <div id="page_content">
        <div class="md-card-content">
            <div id="page_content_inner">
                <div class="md-card uk-margin-medium-bottom">
                    <input id="btnInbox" type="submit" value="Inbox" />&nbsp;&nbsp; 
                    <input id="btnCompose" type="submit" value="Compose" />&nbsp;&nbsp; 
                    <input id="btnSend" type="submit" value="Sent Message" />
                    <div id="modal_overflow" class="uk-modal">
                    </div>
                    <div class="md-card uk-margin-medium-bottom" id="d">
                        <div class="md-card-content">
                            <div class="uk-overflow-container" id="divShow">
                            </div>
                            <div class="uk-overflow-container" id="divNewmail">
                                <table style="width: 100%;">
                                    <tr>
                                        <td>To</td>
                                        <td>Admin</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>
                                            <input id="txtTitle" type="text" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Body</td>
                                        <td>
                                            <textarea id="txtbody" cols="50" rows="5"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input id="Button1" type="button" value="Send" />

                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div class="uk-overflow-container" id="divSendmessage">
                            </div>
                        </div>
                    </div>
                    <div role="alert" id="divSuccess14" class="alert alert-success">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="accordion.js"></script>

</asp:Content>
