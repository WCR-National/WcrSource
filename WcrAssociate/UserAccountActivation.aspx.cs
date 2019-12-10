using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WcrClassLibrary;
using ClsLibrary.Bal;
namespace WcrAssociate
{
    public partial class UserAccountActivation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnVerification_Click(object sender, EventArgs e)
        {
            try
            {
                string UserType = Request.QueryString["uType"].ToString();
                string Uemail = Request.QueryString["email"].ToString();
                string AssociateID = Request.QueryString["aid"].ToString();
                if (UserType == "1")  //1 is for associate
                {
                    #region Associate Email Verification Code
                    string str = string.Empty;
                    BllAssociateLogin objAssociate = new BllAssociateLogin();
                    str = objAssociate.SelectActivationCode(Uemail);
                    if (str == txtEmailVerification.Text)
                    {
                        string str1 = string.Empty;
                        str1 = objAssociate.VerifiedAccount(Uemail);
                        if (!string.IsNullOrEmpty(str1))
                        {
                            if (AssociateID == "0")
                            { }
                            else
                            {
                                Session["userName"] = Uemail;
                                Session["associate"] = AssociateID;
                            }
                            Response.Redirect("Associate/ViewProfile.aspx");

                            // Literal1.Text = "Verification code matched succesfully. Please <a href='index.html'> click here </a> to login.";
                        }
                        else
                        {
                            Literal1.Text = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                        }
                    }
                    else
                    {
                        Literal1.Text = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                    }
                    #endregion

                }
                else if (UserType == "2")   // 2 is for consumer
                {
                    #region Consumer Email Verification Code
                    string str = string.Empty;
                    BllAssociateLogin objAssociate = new BllAssociateLogin();
                    str = objAssociate.SelectConsumerActivationCode(Uemail);
                    if (str == txtEmailVerification.Text)
                    {
                        string str1 = string.Empty;
                        str1 = objAssociate.VerifiedConsumerAccount(Uemail);
                        if (!string.IsNullOrEmpty(str1))
                        {
                            if (AssociateID == "0")
                            { }
                            else
                            {
                                Session["userName"] = Uemail;
                                Session["associate"] = AssociateID;
                            }
                            Response.Redirect("index.html");
                            // Literal1.Text = "Verification code matched succesfully. Please <a href='index.html'> click here </a> to Relogin.";
                        }
                        else
                        {
                            Literal1.Text = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                        }
                    }
                    else
                    {
                        Literal1.Text = "Verification code does not match. Please Login your registered Email ID to see verification code.";
                    }
                    #endregion
                }
                else
                { }
            }
            catch
            { }
        }


    }
}