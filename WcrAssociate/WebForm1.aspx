<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WcrAssociate.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Associate/js/jQuery-2.1.4.min.js"></script>
    <script>
        $('#save').click(function () {
            // add loading image to div
            $('#loading').html('<img src="http://preloaders.net/preloaders/287/Filling%20broken%20ring.gif"> loading...');

            // run ajax request
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "https://api.github.com/users/jveldboom",
                success: function (d) {
                    // replace div's content with returned data
                    // $('#loading').html('<img src="'+d.avatar_url+'"><br>'+d.login);
                    // setTimeout added to show loading
                    setTimeout(function () {
                        $('#loading').html('<img src="' + d.avatar_url + '"><br>' + d.login);
                    }, 2000);
                }
            });
        });
    </script>
    <link href="css/bootstrap.min.css" rel="stylesheet" />

    <title></title>
</head>
<body>
    <form id="form1" runat="server">

       <dl>
    <dt>Coffee</dt>
    <dd>- black hot drink</dd>
    <dt>Milk</dt>
    <dd>- white cold drink</dd>
  </dl> 


        <asp:Label ID="Label2" runat="server" Text="Label"></asp:Label>
        <input id="save" type="submit" value="save" />
        <br /><br />
       
<div id="loading"></div>
        <div>

            <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" />
            ZipCode 
            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
            <br />
            Category/SubcategoryID 
            <asp:TextBox ID="TextBox18" runat="server"></asp:TextBox>
            <br />
        </div>
        <asp:GridView ID="GridView1" runat="server">
        </asp:GridView>

        <asp:Button ID="Button2" runat="server" Text="Put Values To The Array" OnClick="Button2_Click" /><br />
        <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox><br />
        <asp:TextBox ID="TextBox6" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox7" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox8" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox9" runat="server"></asp:TextBox>
        <br />
        <asp:TextBox ID="TextBox10" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox11" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox12" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox13" runat="server"></asp:TextBox>
        <br />
        <asp:TextBox ID="TextBox14" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox15" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox16" runat="server"></asp:TextBox>
        <asp:TextBox ID="TextBox17" runat="server"></asp:TextBox>

        <br />

        <asp:Button ID="Button3" runat="server" Text="Get Values From Array" OnClick="Button3_Click" />




        <asp:CheckBoxList ID="CheckBoxList1" runat="server">
            <asp:ListItem>a</asp:ListItem>
            <asp:ListItem>b</asp:ListItem>
            <asp:ListItem>c</asp:ListItem>
            <asp:ListItem>d</asp:ListItem>
        </asp:CheckBoxList>
        <asp:Button ID="Button4" runat="server" OnClick="Button4_Click" Text="Click Here To See" />
        <br />
        <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>

        age:-     
        <asp:TextBox ID="TextBox20" runat="server">
        </asp:TextBox>
        <asp:RangeValidator ID="RangeValidator1" ControlToValidate="TextBox20" MaximumValue="25" MinimumValue="18" ValidationGroup="aa" runat="server" ErrorMessage="RangeValidator"></asp:RangeValidator>
        <asp:TextBox ID="txtPhone" runat="server">
        </asp:TextBox>
        <asp:TextBox ID="TextBox19" runat="server">
        </asp:TextBox>
        <asp:CompareValidator ID="CompareValidator1" ControlToValidate="TextBox19" ControlToCompare="txtPhone" ValidationGroup="aa" runat="server" ErrorMessage="CompareValidator"></asp:CompareValidator>
        <asp:RegularExpressionValidator ControlToValidate="txtPhone" ValidationGroup="aa" ID="RegularExpressionValidator1" runat="server" ErrorMessage="RegularExpressionValidator" ValidationExpression="[0-9]{10}"></asp:RegularExpressionValidator>
        <asp:Button ID="Button5" ValidationGroup="aa" runat="server" Text="Click Here To valid" />
        <asp:ValidationSummary ID="ValidationSummary1" ShowMessageBox="true" ShowSummary="true" DisplayMode="List" HeaderText="Following error occured." runat="server" />


        <asp:Button ID="btnSubmit" runat="Server" Text="Submit" />
        <asp:ValidationSummary ID="ValidationSummary" runat="Server" ShowMessageBox="true" ShowSummary="true" DisplayMode="List" HeaderText="Following error occured." />









        <input type="checkbox" id="scales" name="feature"
            value="scales" />
        <label for="scales">Scales</label>
        <input type="checkbox" id="horns" name="feature"
            value="horns" />
        <label for="horns">Horns</label>
        <input type="checkbox" id="claws" name="feature"
            value="claws" />
        <label for="claws">Claws</label>

























        <select id="ddls">
            <option value="d">d</option>
        </select>

        <input type="radio" id="rdomale" name="a" />M
        <input type="radio" id="rdofmale" name="a" />F
        <input type="submit" id="btnsave" value="Save" />
        <br />    <br />    <br />    <br />    <br />    <br />    <br />
            <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />
            <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />
            <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />
            <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />
            <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />    <br />
      
        <a href="javascript:void(0)" id="clk">click here!</a>




    </form>
</body>
</html>

<script>
    $(document).ready(function () {

        $("#btnsave").click(function () {
            if (rdomale.checked == true) {
                alert("male");
            }
            else {
                alert("Female");
            }
            alert(ddls.value);













            var yourArray = [];
            $("input:checkbox[name=feature]:checked").each(function () {
                yourArray.push($(this).val());
            });
            alert(yourArray);















        });




    });

</script>
