<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="myAccount.aspx.cs" Inherits="WcrAssociate.Associate.myAccount" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script>
        $(document).ready(function () {
            BindMyAccount();
        });
        function BindMyAccount() {
            $.ajax({
                // type: "POST", url: "ws/CategoryPurchase.asmx/MyAccountData", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                type: "POST", url: "ws/MyCategories.asmx/MuPurchaseCategories", data: "{}", contentType: "application/json; charset=utf-8", dataType: "json", async: false,
                success: function (r) {
                    if (r.d.length > 0) {
                        var xmlDoc = $.parseXML(r.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("MyCategories");
                        var cartd = [];
                        cartd.push("<table width='110' border='1' align='center' cellpadding='0' cellspacing='0' class= 'uk-table uk-table-nowrap'>");
                        cartd.push("<tr><td colspan=7><b>My Account</b></td></tr>");
                        cartd.push("<tr>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>S.No</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Job Type</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Category Name</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Zipcode </td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>From</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>To</td>");
                        cartd.push("<td style='color: white; background-color: skyblue' class='uk-width-2-10 uk-text-center'>Amount</td>");
                        cartd.push("</tr>");
                        var count = 1;
                        $.each(docs, function (i, docs) {
                            cartd.push("<tr>");
                            cartd.push("<td class='uk-text-center'>" + (count++) + "</td>");
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("JobName").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("categoryName").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("zipCode").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("fromDate").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("toDate").text() + " </td>"));
                            cartd.push("<td class='uk-text-center'>" + ($(docs).find("amount").text() + " </td>"));
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
    <div class="md-card uk-margin-medium-bottom">
        <div class="md-card-content">
            <div class="uk-overflow-container" id="divShow">
            </div>
        </div>
    </div>
</asp:Content>
