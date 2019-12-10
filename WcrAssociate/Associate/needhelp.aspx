<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="needhelp.aspx.cs" Inherits="WcrAssociate.Associate.needhelp" %>

<%--<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>--%>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-2.1.1.min.js">
    </script>
   


            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 add-details'>
                <ul class='nav nav-tabs' role='tablist'>

                    <li role='presentation' class='active'><a href='#overview' id="defaultOpen" aria-controls='home' role='tab' data-toggle='tab'>Add New </a></li>
                    <li role='presentation'><a href='#Features' id="defaultOpen1" aria-controls='profile' role='tab' data-toggle='tab'>View Status </a></li>
                </ul>
            </div>
            <div class='tab-content'>
                <div role='tabpanel' class='tab-pane active' id='overview'>
                    <div class="box-body  form-horizontal">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <div class="form-group">
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                    Subject
                                                         <input type="text" id="txtSubject" class="form-control" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                    Detail                                                       
                                                       <textarea id="txtDetail" class="form-control" cols="80" rows="8"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <input id="btnSave" type="button" class="btn btn-primary" value="Post Ticket" />
                                </div>
                            </div>
                            <div role="alert" id="div1" runat="server" visible="False" class="alert alert-success">
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>

                <div role='tabpanel' class='tab-pane' id='Features'>
                    <table>
                        <tr>
                            <td>Enter Token No:-<input type="text" id="txtTokenNo" class="form-control" />
                                <input id="btnView" type="button" class="btn btn-primary" value="Click" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="ViewRecord"></div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div role="alert" id="divSuccess" class="alert alert-success" style="visibility: hidden;">
            </div>


       
    <script type="text/javascript">
        $(document).ready(function () {
            $("#btnSave").click(function () {
                if (txtSubject.value == '') {
                    $("#txtSubject").focus();
                    alert("Subject Field Can Not blank..");
                    return false;
                }
                else if (txtDetail.value == '') {
                    $("#txtDetail").focus();
                    alert("Detail Field Can Not blank..");
                    return false;
                }
                else {
                    var msg = [];
                    $.ajax({
                        type: "POST",
                        url: "ws/SendMessage.asmx/SendMessages",
                        data: "{'subject':'" + txtSubject.value + "','bodytext':'" + txtDetail.value + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (r) {
                            if (r.d >= "1") {
                                msg.push("<strong>Well done ! </strong>Your Query has been submitted Successfully. Your Token No is " + r.d + " we Will revert you shortly");
                                $("#divSuccess").html(msg.join(''));
                                $("#divSuccess").css("visibility", "visible");
                                setTimeout(function () { $('#divSuccess').fadeOut('fast'); }, 3000);
                                txtSubject.value = "Your Token No is " + r.d;
                                txtDetail.value = "";
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
                }

            });

        });
    </script>
</asp:Content>
