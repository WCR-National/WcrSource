using System;
using System.Data;
using System.Xml;
using ClsLibrary.Bal;
using WcrClassLibrary;
namespace WcrAssociate.Associate
{
    public partial class ViewProfile : System.Web.UI.Page
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
                //    txtfName.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["FullName"]);
                //    txtLName.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["LastName"]);
                //    // txtUserName.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["UserName"]));
                //    txtPassword.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["Pass"]);
                //    txtEmailAddress.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["Email"]);
                //    txtContactNumber.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["MobileNo"]);
                //    txtZipcode.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["ZipCode"]);
                //    txtLicenceState.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseState"]);
                //    txtLicenceID.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseId"]);
                //    lblFirstName.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["FullName"]);
                //    lblLastName.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["LastName"]);
                //    // lblUserName.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["UserName"]));
                //    lblPassword.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["Pass"]);
                //    lblEmail.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["Email"]);
                //    lblContact.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["MobileNo"]);
                //    lblZipcode.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["ZipCode"]);
                //    lblLicense.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseState"]);
                //    lblLicenseState.Text = Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseId"]);
                //    if (!string.IsNullOrEmpty(dsresult.Tables[0].Rows[0]["Photo"].ToString()))
                //    {
                //        imgAssociatePhoto.ImageUrl = "~/AssociatePhoto/" + dsresult.Tables[0].Rows[0]["Photo"].ToString();
                //    }
                //}
            }
        }

        protected void btnreset_Click(object sender, EventArgs e)
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
            //    txtfName.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["FullName"]));
            //    txtLName.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["LastName"]));
            //    // txtUserName.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["UserName"]));
            //    txtPassword.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["Pass"]));
            //    txtEmailAddress.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["EmailId"]));
            //    txtContactNumber.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["MobileNo"]));
            //    txtZipcode.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["ZipCode"]));
            //    txtLicenceState.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseState"]));
            //    txtLicenceID.Text = crypt.WcrSimpleDecrypt(Convert.ToString(dsresult.Tables[0].Rows[0]["LicenseId"]));
            //}

        }
    }
}