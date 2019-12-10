<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="VerifyMobileNo.aspx.cs" Inherits="WcrAssociate.Associate.VerifyMobileNo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <script src="js/jQuery-2.1.4.min.js"></script>

   
            <!-- Small boxes (Stat box) -->
            <div id="divEntry">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title">Verify Mobile Number</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  form-horizontal">

                                <div class="form-group">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        Enter Code you received in your mobile
                                        <input type="tel" class="form-control" id="txcode" />

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        
                                    </div>
                                </div>
                               
                                <div class="form-group">

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                                        <input id="btnVerify" type="button" class="btn btn-primary" value="Verify Mobile" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="alert" id="divSuccess" class="alert alert-success" style="display:none">
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
            </div>

            <!-- ./col -->






     
</asp:Content>
