<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="associateLeftSidebar.ascx.cs" Inherits="WcrAssociate.Associate.UControls.associateLeftSidebar" %>
<aside id="sidebar_main">
    <div class="sidebar_main_header">
        <div class="sidebar_logo">
            <a href="#" class="sSidebar_hide"><span style="font-size: 20px;">WCR National</span></a>
            <%--<a href="#" class="sSidebar_show">
                <img src="../../assets/img/logo_main_small.png" alt="" height="32" width="32" /></a>--%>
        </div>
    </div>
    <div class="menu_section">
        <ul>
            <li class="current_section" title="Dashboard">
                <a href="Dashboard.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE871;</i></span>
                    <span class="menu_title">Dashboard</span>
                </a>
            </li>
            <li title="ZipCode">
                <a href="purchaseZipcode.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">Buy ZipCode</span>
                </a>
            </li>

            <li title="Sales">
                <a href="PurchaseSalesCategory.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">Buy Sales Category</span>
                </a>
            </li>
            <li title="My Account">
                <a href="myAccount.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">My Account</span>
                </a>
            </li>
            <%--             <li title="Sales">
                <a href="buyCategory.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">Buy Category</span>
                </a>
            </li>--%>
            <li title="Post Advertisement on Sales">
                <a href="sale.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">Post Sale</span>
                </a>
            </li>
            <li title="Post Advertisement on Service">

                <a href="Service.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">Post Service</span>
                </a>
            </li>
            <li title="Sales">
                <a href="ViewAdvertisement.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">View Advertisement</span>

                </a>
            </li>

             <li title="Sales">
                <a href="UpdateCardInfo.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE158;</i></span>
                    <span class="menu_title">Update Card Info</span>

                </a>
            </li>

            <%--<li title="Share">

                <a href="share.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE53E;</i></span>
                    <span class="menu_title">Share</span>
                </a>
            </li>--%>
            <%--    <li title="Territory">
                <a href="territory.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE0B9;</i></span>
                    <span class="menu_title">Territory</span>
                </a>
            </li>--%>

            <li title="Message">
                <a href="message.aspx">
                    <span class="menu_icon"><i class="material-icons">&#xE0B9;</i></span>
                    <span class="menu_title">Message</span>
                </a>
            </li>



        </ul>
    </div>
</aside>
