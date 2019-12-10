<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="CustomerSupport.aspx.cs" Inherits="WcrAssociate.Associate.CustomerSupport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link href="../css/layout.css" rel="stylesheet" />
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-2.1.1.min.js">
    </script>
    <script>
        $(function () {
            $(".sidebar-menu li ").removeClass("active");
            $("#customerclick").addClass("active");
        });
    </script>
      <div>
        <div class="modal fade small-model" id="success-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <div class="btn btn-success btn-block" style="margin-top: 20px;">
                            <label id="lblSuccess"></label>
                        </div>
                    </div>
                    <div class="modal-body form-horizontal">
                        <div class="col-lg-12 text-center">
                            <p>
                                <label id="lbldetail"></label>
                            </p>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade small-model" id="fail_message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <button type="button" id="btnclose" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <div class="btn btn-red btn-block" style="margin-top: 20px;">
                            <label id="lblFailureTitle"></label>
                        </div>
                    </div>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="col-lg-12 text-center">
                        <p>
                            <label id="lblFailureDetail"></label>
                        </p>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 dashboard-block">
            <h1>Customer Support </h1>
         <div class="detail-form pt-0" > 
            
            <div class="box-body  form-horizontal">
                <div class="form-group">
                    <div class="col-sm-8">
                        <h3 class="page-subtitle">How Can We Assist You ? </h3>
                        <textarea id="txtDetail" class="form-control" cols="50" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12">
                        <input id="btnSave" type="button" class="btn btn-primary" value="SUBMIT" />
                    </div>
                </div>
                  </div>
                <div class="form-group">
                    <div class="col-sm-12">
                        <div role="alert" id="divSuccess" class="alert alert-success" style="display: none;">
                        </div>
                    </div>
                </div>
            </div>
           
            <h3 class="page-subtitle">CONTACT US  </h3>

            <div class="box-body  form-horizontal content-left-extra-space" style="margin-bottom: 120px;">
                <p class="p-number">USA : <span>866.456.7331 </span></p>
                <p></p>

            </div>

        </div>
    </div>



    <%--      <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 add-details'>
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
                              
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="ViewRecord"></div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>--%>



    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnSave').css("background-color", "#808080");
            $('#btnSave').prop('disabled', true);

            $('#txtDetail').keyup(function () {
                if ($(this).val() != '') {
                    $('#btnSave').css("background-color", "rgb(33, 150, 243)");
                    $('#btnSave').removeAttr('disabled');
                }
                else {
                    $('#btnSave').attr('disabled', 'disabled');
                }
            });

         
            $("#btnSave").click(function () {
                if (txtDetail.value == '') {
                    $("#txtDetail").focus();
                    alert("Detail Field Can Not blank!!");
                    return false;
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "ws/AssociateSupport.asmx/AssociateSupportQuery",
                        data: "{'Messg':'" + txtDetail.value + "'}",
                        contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                        success: function (r) {
                            if (r.d.length > 0) {
                                txtDetail.value = "";
                                $("#lblSuccess").text("Success.");
                                $("#lbldetail").text("Your support issue has been succesfully sent!!!. A support representative will contact you within 24-48 business hours.");
                                $('#success-message').modal('show');
                                // window.location.href = "CustomerSupport.aspx";
                            }
                            else {
                                $("#lblFailureTitle").text("Unsuccess.");
                                $("#lblFailureDetail").text("Something goes wrong. Please Try again.");
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
            });

        });
    </script>
</asp:Content>
