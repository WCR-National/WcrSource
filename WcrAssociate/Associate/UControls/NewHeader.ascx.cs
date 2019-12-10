using System;
using System.Data;
using System.Xml;
using ClsLibrary.Bal;
using WcrClassLibrary;

namespace WcrAssociate.Associate.UControls
{
    public partial class NewHeader : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //WcrCryptography crypt = new WcrCryptography();
                //DataSet dsresult = new DataSet();
                //XmlDocument doc = new XmlDocument();
                //BllAssociateRegistration bllass = new BllAssociateRegistration();
                //doc.LoadXml(bllass.AssociateBasicDetail(Convert.ToInt16(Session["associate"].ToString())));
                //XmlElement exelement = doc.DocumentElement;
                //if (exelement.IsEmpty == false)
                //{

                //    XmlNodeReader nodereader = new XmlNodeReader(exelement);
                //    dsresult.ReadXml(nodereader, XmlReadMode.Auto);
                //    //lblName.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["FullName"]));
                //    lblName.Text = (Convert.ToString(dsresult.Tables[0].Rows[0]["FullName"]));

                //    if (!string.IsNullOrEmpty(dsresult.Tables[0].Rows[0]["Photo"].ToString()))
                //    {
                //        imgAssociatePhoto.ImageUrl = "~/AssociatePhoto/" + dsresult.Tables[0].Rows[0]["Photo"].ToString();
                //    }
                //    //imgAssociatePhoto.ImageUrl = "~/AssociatePhoto/" + dsresult.Tables[0].Rows[0]["Photo"].ToString();

                //    // <asp:Image ID="Image1"  runat="server" Height="179px" ImageUrl="~/AssociatePhoto/1.png" />
                //    lblAssociateID.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["AssociateId"]);
                //    lblEmailid.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["Email"]);

                //    lblLicenceID.Text = (Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseState"]));
                //    lblLicenceState.Text = (Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseId"]));
                //    //lblLicenceID.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseState"]));
                //    //lblLicenceState.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseId"]));



                //}
            }
        }
    }
}