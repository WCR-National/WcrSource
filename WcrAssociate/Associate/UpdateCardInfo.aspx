<%@ Page Title="" Language="C#" MasterPageFile="~/Associate/associate.Master" AutoEventWireup="true" CodeBehind="UpdateCardInfo.aspx.cs" Inherits="WcrAssociate.Associate.UpdateCardInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div class="panel-body">
        <table style="margin-left:50px; margin-top:30px;" cellspacing="50px" cellpadding="50px">
        <tr>
            <td>
                <label for="cardNumber">OLD CARD NUMBER</label>
                <input type="tel" class="form-control" id="txtOldCreditCard" readonly="true" name="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required autofocus />
               </td>
              <td><label for="cardNumber">NEW CARD NUMBER</label>
                <input type="tel" class="form-control" id="txtCreditCard" name="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required autofocus /></td>
        </tr>
        <tr>
           
            <td colspan="2">
                <label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>
                <select style="width: 100px" id="ddlMonth1">
                    <option value="0">Month</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <select style="width: 100px" id="ddlYear1">
                    <option value="0">Year</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select></td>
        </tr>
        <tr>
            <td>
                <label for="cardCVC">CV CODE</label>
                <input type="tel" id="txtCvv"
                    class="form-control"
                    name="cardCVC"
                    placeholder="CVV"
                    autocomplete="cc-csc"
                    required />
            </td>
            <td>
                <label for="cardFname">FIRST NAME</label>
                <input type="text" class="form-control" name="FIRST NAME" id="cardFname" /></td>
        </tr>
        <tr>
            <td>
                <label for="LastName">LAST NAME</label>
                <input type="text" class="form-control" name="LAST NAME" id="cardLastname" />
            </td>
            <td>
                <label for="LastName">ADDRESS</label>
                <input type="text" class="form-control" name="LAST NAME" id="Cardaddress" /></td>
        </tr>
        <tr>
            <td> <label for="cardCountry">COUNTRY</label>
                    <select id="cardCountry">
                        <option value="1">US</option>
                    </select></td>
            <td> <label for="cardState">STATE</label>
                    <select id="cardState">
                        <option value="1">US</option>
                    </select></td>
        </tr>
        <tr>
            <td><label for="cardCity">CITY</label>
                    <select id="cardCity">
                        <option value="1">US</option>
                    </select></td>
            <td>  <label for="zipcode">ZIPCODE</label>
                    <input type="text" class="form-control" maxlength="5" name="zipcode" id="cardzipcode" /></td>
        </tr>         
        <tr>           
            <td colspan="2">

                <input id="btnupdate" type="button" class="btn btn-danger" value="Update" />
            </td>
        </tr>
    </table>
    </div>

</asp:Content>
