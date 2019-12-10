<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="NewDashboard.aspx.cs" Inherits="WcrAssociate.Associate.NewDashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content-wrapper">

            <section class="content">
                <!-- Small boxes (Stat box) -->
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 nopadd colume5">
                        <div class="col-lg-3 col-sm-3 col-md-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-aqua">
                                <div class="inner">
                                    <h3> 2</h3>
                                    <p> Purchase Category  </p>
                                </div>
                                <div class="icon"> <i class="ion ion-bag"></i> </div>
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-sm-3 col-md-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-green">
                                <div class="inner">
                                    <h3> 5 </h3>
                                    <p>Post Advertisment for    Sales   </p>
                                </div>
                                <div class="icon"> <i class="ion ion-stats-bars"></i> </div>
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-sm-3 col-md-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-yellow">
                                <div class="inner">
                                    <h3> 100 </h3>
                                    <p>   Post Advertisement For Service  </p>
                                </div>
                                <div class="icon"> <i class="ion ion-person-add"></i> </div>
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-sm-3 col-md-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-red">
                                <div class="inner">
                                    <h3> 400</h3>
                                    <p> View advertisement   </p>
                                </div>
                                <div class="icon"> <i class="ion ion-pie-graph"></i> </div>
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-3 col-md-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-yellow">
                                <div class="inner">
                                    <h3> 100 </h3>
                                    <p>                                   Messages    </p>
                                </div>
                                <div class="icon"> <i class="ion ion-person-add"></i> </div>
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <!-- ./col -->
                </div>

                <div class="row" style="margin-top:15px;">
                    <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                        <div class="box box-primary">
                            <div class="box-body no-padding">
                                <!-- THE CALENDAR -->
                                <div id="calendar"></div>
                            </div><!-- /.box-body -->
                        </div><!-- /. box -->
                    </div>
                </div>

            </section>


        </div>


</asp:Content>
