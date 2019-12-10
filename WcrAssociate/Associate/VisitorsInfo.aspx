<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/Master1.Master" AutoEventWireup="true" CodeBehind="VisitorsInfo.aspx.cs" Inherits="WcrAssociate.Associate.VisitorsInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            BindData();
        });
        function BindData() {
            $.ajax({
                type: "POST", url: "ws/Sale.asmx/GetVisitorsInfo", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: true,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("InterestedConsumer");
                        var cartd = [];
                        cartd.push("<table class='table table-condensed'> <tbody>");
                        cartd.push("<tr><th>Sr.N</th><th>Name</th><th>Mobile</th><th>Email</th> <th>Property Title</th><th>Date</th> <th>Advertisement ID</th> </tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr id='dataall'>");
                            cartd.push("<td>" + (count++) + "</td>");
                            cartd.push("<td>" + ($(docs).find("name").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("Mob").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("EmailID").text() + " </td>"));
                            cartd.push("<td>" + ($(docs).find("title").text() + " </td>"));                           
                            var date = $(docs).find("AddedOn").text();
                            var split = date.split('T').shift();   // 2016-01-06
                            var parts = split.split('-');          // [2016, 01, 06]
                            var parsed1 = parts.reverse().join('-'); // 06-01-2016
                            cartd.push("<td>" + parsed1 + " </td>");
                            cartd.push("<td>" + ($(docs).find("advertisementID").text() + " </td>"));
                            cartd.push("</tr>");
                        });
                        cartd.push("</table>");
                        $("#divShow").html(cartd.join(''));
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
    <div class="content-wrapper">
        <section class="content">
          

            <div class="md-card uk-margin-medium-bottom">

                
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 ">
                        <div class="box customebox">
                            <div class="box-header">
                                <h3 class="box-title"><u><b> Detail of Consumer's </b></u>  </h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body ">
                                <div class="uk-overflow-container" id="divShow">
                                </div>
                                


                            </div>
                          
                        </div>
                    </div>
                  
                </div>
               

               
            </div>
           
        </section>
    </div>
</asp:Content>
