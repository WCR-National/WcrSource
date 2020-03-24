using ClsLibrary.Bal;
using ClsLibrary.Bal.Associate;
using ClsLibrary.PropertyLayer;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Mail;
using System.Web;
using WcrClassLibrary;
namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for AssociateSignUp
    /// </summary>
    public class AssociateSignUp : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        WcrCryptography crypt = new WcrCryptography();
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            try
            {
                string qs = context.Request.QueryString["action"];
                if (qs == "AssociateData")
                {
                    string strr = "";
                    strr = InsertAssociateData(context);
                    context.Response.Write(strr);
                }
                else if (qs == "CardData")
                {
                    string strr = "";
                    strr = InsertCardData(context);
                    context.Response.Write(strr);
                }
                else if (qs == "Ucardata")
                {
                    string strr = "";
                    strr = UpdateCardData(context);
                    context.Response.Write(strr);
                }
                else if (qs == "GetCardData")
                {
                    string strr = "";
                    strr = GetCardData(context);
                    context.Response.Write(strr);
                }
                else if (qs == "Consumer")
                {
                    string strr = "";
                    strr = InsertConsumerData(context);
                    context.Response.Write(strr);
                }
                else if (qs == "AssociateLog")
                {
                    string strr = "";
                    strr = AssociateLogin(context);
                    context.Response.Write(strr);
                }
                else if (qs == "AssociateLogout")
                {
                    string strr = "";
                    strr = AssociateLogout(context);
                    context.Response.Write(strr);
                }
                else if (qs == "ConsumerLogout")
                {
                    string strr = "";
                    strr = ConsumerLogout(context);
                    context.Response.Write(strr);
                }
                else if (qs == "ConsumerLog")
                {
                    string strr = "";
                    strr = ConsumerLogin(context);
                    context.Response.Write(strr);
                }
                else if (qs == "RecordExists")
                {
                    string strr = "";
                    strr = RecordExistsorNot(context);
                    context.Response.Write(strr);
                }
                else if (qs == "RecordExistsForAssociate")
                {
                    string strr = "";
                    strr = RecordExistsorNotForAssociate(context);
                    context.Response.Write(strr);
                }
                else if (qs == "RecordExistsorNotForConsumer")
                {
                    string strr = "";
                    strr = RecordExistsorNotForConsumer(context);
                    context.Response.Write(strr);
                }
                else if (qs == "ResetAssociatePass")
                {
                    string strr = "";
                    strr = AssociateResetPassword(context);
                    context.Response.Write(strr);
                }
                else if (qs == "ResetAssociatePassNew")
                {
                    string strr = "";
                    strr = SendAssociatePassonEmail(context);
                    context.Response.Write(strr);
                }
                else if (qs == "ResetConsumerPassNew")
                {
                    string strr = "";
                    strr = SendConsumerPassonEmail(context);
                    context.Response.Write(strr);
                }
                else if (qs == "ResetConsumerPass")
                {
                    string strr = "";
                    strr = ConsumerResetPassword(context);
                    context.Response.Write(strr);
                }
            }
            catch (Exception)
            {
                context.Response.Write("0");
            }
        }
        private string InsertAssociateData(HttpContext context)
        {
            try
            {
                string str = "0";
                //if (con.State == ConnectionState.Closed)
                //{
                //    con.Open();
                //}
                // byte[] todecode_byte = Convert.FromBase64String(context.Request.QueryString["FullName"].Replace("", "+"));
                //  string FullName = cardEncrypt.WcrSimpleDecrypt(todecode_byte);
                string FullName = context.Request.QueryString["FullName"].Replace("'", "");
                string LastName = context.Request.QueryString["LastName"].Replace("'", "");
                string EmailID = context.Request.QueryString["EmailID"].Replace(",", "").ToLower();
                string Password = context.Request.QueryString["Password"].Replace("'", "");
                string ZipCode = context.Request.QueryString["ZipCode"].Replace("'", "");
                string Mobile = context.Request.QueryString["Mobile"].Replace("'", "");
                string LicenseState = context.Request.QueryString["LicenseState"].Replace("'", "");
                string LicenseID = context.Request.QueryString["LicenseID"].Replace("'", "");
                int ReferralID = Convert.ToInt32(context.Request.QueryString["ReferralID"].Replace("'", ""));
                //string ccode = Convert.ToString(context.Request.QueryString["Coupcd"]).Replace("'", "");
                //int dtion = Convert.ToInt32(context.Request.QueryString["dur"].ToString());
                //int dcount = Convert.ToInt32(context.Request.QueryString["ddt"]);
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                proAssociateRegistration.FullName = FullName;
                proAssociateRegistration.LastName = LastName;
                proAssociateRegistration.EmailID = EmailID;
                proAssociateRegistration.Password = Password;
                proAssociateRegistration.MobileNo = Mobile;
                proAssociateRegistration.ZipCode = ZipCode;
                proAssociateRegistration.LicenseState = LicenseState;
                proAssociateRegistration.LicenseID = LicenseID;
                proAssociateRegistration.ReferralID = ReferralID;
                /*proAssociateRegistration.CouponCode = ccode;
                proAssociateRegistration.Duration = dtion;
                proAssociateRegistration.Discount = dcount;*/
                str = objAssociate.RecordInsert(proAssociateRegistration);
                if (!string.IsNullOrEmpty(str))
                {
                    context.Session["upass"] = Password;
                    context.Session["userName"] = EmailID;
                    context.Session["associate"] = str;
                }
                else
                {
                    context.Session["upass"] = "";
                    context.Session["userName"] = "";
                    context.Session["associate"] = "";
                }
                #region This code is no longer in used because of Email Verification
                ////if (str != "0" || str != "-1")
                ////{
                ////    context.Session["associate"] = str.ToString();
                ////}
                ////else
                ////{ }
                #endregion
                return str;
            }
            catch
            {
                return "-1";
            }
        }
        private string InsertCardData(HttpContext context)
        {
            try
            {
                string str = string.Empty;
                string message = string.Empty;
                //string emailAddress = context.Request.QueryString["email"].Replace("'", "");
                string toalAmount = context.Request.QueryString["totalamount"].Replace("'", "");
                string CardNumber = context.Request.QueryString["CardNumber"].Replace("'", "");
                string Cardholder_FirstName = context.Request.QueryString["Cardholder_FirstName"].Replace("'", "");
                string Cardholder_LastName = context.Request.QueryString["Cardholder_LastName"].Replace("'", "");
                string Cardholder_Address = context.Request.QueryString["Cardholder_Address"].Replace("'", "");
                string Cardholder_City = context.Request.QueryString["Cardholder_City"].Replace("'", "");
                string Cardholder_State = context.Request.QueryString["Cardholder_State"].Replace("'", "");
                string Cardholder_Country = context.Request.QueryString["Cardholder_Country"].Replace("'", "");
                string Cardholder_Zip = context.Request.QueryString["Cardholder_Zip"].Replace("'", "");
                string cvv = context.Request.QueryString["cvv"].Replace("'", "");
                string ExpMonth = context.Request.QueryString["ExpMonth"].Replace("'", "");
                string ExpYear = context.Request.QueryString["ExpYear"].Replace("'", "");
                string a = CardNumber.Substring(0, 1);
                string CardType = context.Request.QueryString["CardType"].Replace("'", "");
                int associateid = Convert.ToInt32(context.Session["associate"]);

                #region This code is not in use

                ////CardPaymentObj ObjCardPayment = new CardPaymentObj();
                ////ObjCardPayment.Total = toalAmount;
                ////ObjCardPayment.SubTotal = toalAmount;
                ////ObjCardPayment.Email = emailAddress;
                ////ObjCardPayment.City = Cardholder_City;
                ////ObjCardPayment.Country = Cardholder_Country;
                ////ObjCardPayment.Address = Cardholder_Address;
                ////ObjCardPayment.ZipCode = Cardholder_Zip;
                ////ObjCardPayment.State = Cardholder_State;
                ////ObjCardPayment.CVV = cvv;
                ////ObjCardPayment.ExpMM = ExpMonth;
                ////ObjCardPayment.ExpYYYY = ExpYear;
                ////ObjCardPayment.FirstName = Cardholder_FirstName;
                ////ObjCardPayment.LastName = Cardholder_LastName;
                ////ObjCardPayment.CardNumber = CardNumber;
                ////if (a == "3")
                ////{
                ////    ObjCardPayment.CardType = "American Express";
                ////}
                ////else if (a == "6")
                ////{
                ////    ObjCardPayment.CardType = "Discover";
                ////}
                ////else if (a == "5")
                ////{
                ////    ObjCardPayment.CardType = "Mastercard";
                ////}
                ////else if (a == "4")
                ////{
                ////    ObjCardPayment.CardType = "Visa";
                ////}
                ////// ObjCardPayment.CardType = CardType;              
                ////CardTransactions dd = new CardTransactions();
                ////int s = dd.PaymentWithCreditCardTransaction(ObjCardPayment, out message);
                //////if (s == 0)
                //////{
                //////str = message;
                //////Need to use proc_LoadPaymentHistoryItem
                ////ObjCardPayment.PaymentID = message;
                //////BllAssociateRegistration objAssociateReg = new BllAssociateRegistration();
                //////string ss=objAssociateReg.
                ////BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                ////string msg = string.Empty;
                ////msg = objAssociate.LoadPaymentHistoryItem(ObjCardPayment, associateid, "pay", s);

                #endregion

                # region The purpose of the code is insert data into tbl_CardData
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                proAssociateRegistration.CardNumber = CardNumber;//startIndex cannot be larger than length of string
                proAssociateRegistration.Cardholder_FirstName = Cardholder_FirstName;
                proAssociateRegistration.Cardholder_LastName = Cardholder_LastName;
                proAssociateRegistration.Cardholder_Address = Cardholder_Address;
                proAssociateRegistration.Cardholder_City = Cardholder_City;
                proAssociateRegistration.Cardholder_State = Cardholder_State;
                proAssociateRegistration.Cardholder_Country = Cardholder_Country;
                proAssociateRegistration.Cardholder_Zip = Cardholder_Zip;
                proAssociateRegistration.CVV = cvv;
                proAssociateRegistration.ExpMonth = ExpMonth;
                proAssociateRegistration.ExpYear = ExpYear;
                if (a == "3")
                {
                    proAssociateRegistration.CardType = "American Express";
                }
                else if (a == "6")
                {
                    proAssociateRegistration.CardType = "Discover";
                }
                else if (a == "5")
                {
                    proAssociateRegistration.CardType = "Mastercard";
                }
                else if (a == "4")
                {
                    proAssociateRegistration.CardType = "Visa";
                }
                else
                {
                    proAssociateRegistration.CardType = "amex";
                }
                proAssociateRegistration.AssociateID = associateid;
                str = objAssociate.CardInsert(proAssociateRegistration);
                #region This code is comments right now when we will get emailer than I will activate the account
                // SendActivationEmail(associateid, Cardholder_FirstName, emailAddress);
                #endregion

                #endregion
                return "0";
            }
            catch
            {
                return "-1";
            }
        }
        private string RecordExistsorNot(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"].Replace("'", "");
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                proAssociateRegistration.EmailID = EmailID;
                str = objAssociate.RecordExists(proAssociateRegistration);
                return str;
            }
            catch
            {
                return "-1";
            }
        }

        private string RecordExistsorNotForAssociate(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"].Replace("'", "");
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                proAssociateRegistration.EmailID = EmailID;
                str = objAssociate.RecordExistsForAssociate(proAssociateRegistration);
                return str;
            }
            catch
            {
                return "-1";
            }
        }
        private string RecordExistsorNotForConsumer(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"].Replace("'", "");
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                proAssociateRegistration.EmailID = EmailID;
                str = objAssociate.RecordExistsForConsumer(proAssociateRegistration);
                return str;
            }
            catch
            {
                return "-1";
            }
        }


        private string UpdateCardData(HttpContext context)
        {
            try
            {
                string str = string.Empty;
                string message = string.Empty;
                string toalAmount = context.Request.QueryString["totalamount"].Replace("'", "");
                string CardNumber = context.Request.QueryString["CardNumber"].Replace("'", "");
                string Cardholder_FirstName = context.Request.QueryString["Cardholder_FirstName"].Replace("'", "");
                string Cardholder_LastName = context.Request.QueryString["Cardholder_LastName"].Replace("'", "");
                string Cardholder_Address = context.Request.QueryString["Cardholder_Address"].Replace("'", "");
                string Cardholder_City = context.Request.QueryString["Cardholder_City"].Replace("'", "");
                string Cardholder_State = context.Request.QueryString["Cardholder_State"].Replace("'", "");
                string Cardholder_Country = context.Request.QueryString["Cardholder_Country"].Replace("'", "");
                string Cardholder_Zip = context.Request.QueryString["Cardholder_Zip"].Replace("'", "");
                string cvv = context.Request.QueryString["cvv"].Replace("'", "");
                string ExpMonth = context.Request.QueryString["ExpMonth"].Replace("'", "");
                string ExpYear = context.Request.QueryString["ExpYear"].Replace("'", "");

                //string a = CardNumber.Substring(0, 1);
                string a = CardNumber.TrimStart('0').Substring(0, 1);
                string CardType = context.Request.QueryString["CardType"].Replace("'", "");
                int associateid = Convert.ToInt32(context.Session["associate"]);
                int cardid = Convert.ToInt32(context.Request.QueryString["cardDataID"]);

                # region The purpose of the code is insert data into tbl_CardData
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                proAssociateRegistration.CardNumber = CardNumber;//startIndex cannot be larger than length of string
                proAssociateRegistration.Cardholder_FirstName = Cardholder_FirstName;
                proAssociateRegistration.Cardholder_LastName = Cardholder_LastName;
                proAssociateRegistration.Cardholder_Address = Cardholder_Address;
                proAssociateRegistration.Cardholder_City = Cardholder_City;
                proAssociateRegistration.Cardholder_State = Cardholder_State;
                proAssociateRegistration.Cardholder_Country = Cardholder_Country;
                proAssociateRegistration.Cardholder_Zip = Cardholder_Zip;
                proAssociateRegistration.CVV = cvv;
                proAssociateRegistration.ExpMonth = ExpMonth;
                proAssociateRegistration.ExpYear = ExpYear;
                if (a == "3")
                {
                    proAssociateRegistration.CardType = "American Express";
                }
                else if (a == "6")
                {
                    proAssociateRegistration.CardType = "Discover";
                }
                else if (a == "5")
                {
                    proAssociateRegistration.CardType = "Mastercard";
                }
                else if (a == "4")
                {
                    proAssociateRegistration.CardType = "Visa";
                }
                else
                {
                    proAssociateRegistration.CardType = "amex";
                }
                proAssociateRegistration.AssociateID = associateid;
                str = objAssociate.CardUpdate(proAssociateRegistration, cardid);
                #region This code is comments right now when we will get emailer than I will activate the account
                // SendActivationEmail(associateid, Cardholder_FirstName, emailAddress);
                #endregion

                #endregion
                return "0";
            }
            catch
            {
                return "-1";
            }
        }

        private string GetCardData(HttpContext context)
        {
            BllPurchaseCategory objp = new BllPurchaseCategory();
            WcrCryptography cardEncrypt = new WcrCryptography();
            BllAssociateRegistration d = new BllAssociateRegistration();
            DataTable dt = new DataTable();
            dynamic objectCardData = new JObject();
            try
            {
                int s = objp.CardExistsOrNot1(context.Session["associate"].ToString());
                if (s >= 1)
                {
                    dt = d.retcardData(Convert.ToInt32(context.Session["associate"].ToString()), context.Session["userName"].ToString());
                    if (dt != null && dt.Rows.Count > 0)
                    {

                        objectCardData._crdID = dt.Rows[0]["CardDataId"].ToString();
                        objectCardData._crd = cardEncrypt.WcrDecryptCardNumber(dt.Rows[0]["CardNumber"].ToString());
                        objectCardData._fstName = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_FirstName"].ToString());
                        objectCardData._sndName = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_LastName"].ToString());
                        objectCardData._Address = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Address"].ToString());
                        objectCardData._city = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_City"].ToString());
                        objectCardData._state = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_State"].ToString());
                        objectCardData._zip = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Zip"].ToString());
                        objectCardData._country = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Country"].ToString());
                        objectCardData._cvv = cardEncrypt.WcrDecrypt(dt.Rows[0]["CVV"].ToString());
                        objectCardData._months = cardEncrypt.WcrDecrypt(dt.Rows[0]["ExpMonth"].ToString());
                        objectCardData._year = cardEncrypt.WcrDecrypt(dt.Rows[0]["ExpYear"].ToString());
                        objectCardData._crdType = cardEncrypt.WcrDecrypt(dt.Rows[0]["CardType"].ToString());

                        objectCardData.a = objectCardData._crd.TrimStart('0').Substring(0, 1);

                        return objectCardData.toString();
                        //hidCardID.Text = _crdID;
                        //string a = _crd.Substring(0, 1);
                        //if (a == "3")
                        //{
                        //    chkAmex.Checked = true;
                        //    chkAmex.Enabled = false;
                        //    chkDiscoverry.Enabled = false;
                        //    chkMasterCard.Enabled = false;
                        //    crdVisa.Enabled = false;
                        //}
                        //else if (a == "6")
                        //{
                        //    chkAmex.Enabled = false;
                        //    chkDiscoverry.Checked = true;
                        //    chkDiscoverry.Enabled = false;
                        //    chkMasterCard.Enabled = false;
                        //    crdVisa.Enabled = false;
                        //}
                        //else if (a == "5")
                        //{
                        //    chkAmex.Enabled = false;
                        //    chkDiscoverry.Enabled = false;
                        //    chkMasterCard.Checked = true;
                        //    chkMasterCard.Enabled = false;
                        //    crdVisa.Enabled = false;
                        //}
                        //else if (a == "4")
                        //{
                        //    chkAmex.Enabled = false;
                        //    chkDiscoverry.Enabled = false;
                        //    chkMasterCard.Enabled = false;
                        //    crdVisa.Checked = true;
                        //    crdVisa.Enabled = false;
                        //}
                        //else
                        //{
                        //    chkAmex.Checked = true;
                        //    chkAmex.Enabled = false;
                        //    chkDiscoverry.Enabled = false;
                        //    chkMasterCard.Enabled = false;
                        //    crdVisa.Enabled = false;
                        //}
                    }
                    else
                    {
                        return string.Empty;
                        //pnlAdd.Visible = true;
                        //Button1.Visible = false;
                        //divCardEntry.Visible = true;
                        //divViewCardInfo.Visible = false;
                    }
                }
                else
                {
                    return string.Empty;
                    //BindState();
                    //Button1.Visible = false;
                    //pnlAdd.Visible = true;
                    //divCardEntry.Visible = true;
                    //divViewCardInfo.Visible = false;
                }
            }
            catch
            {
                return "-1";
            }
        }


        private void SendActivationEmail(int userId, string name, string toMail)
        {
            string constr = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
            string activationCode = Guid.NewGuid().ToString();
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("Update  tbl_AssociateRegistration set activatecode=@ActivationCode WHERE associateid=@UserId"))
                {
                    using (SqlDataAdapter sda = new SqlDataAdapter())
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@ActivationCode", activationCode);
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                }
            }
            using (MailMessage mm = new MailMessage("mailID", toMail))
            {
                mm.Subject = "Account Activation";
                string body = "Hello " + name + ",";
                body += "<br /><br />Please click the following link to activate your account";
                // body += "<br /><a href = '" + HttpContext.Current.Request.Url.AbsoluteUri.Replace("CS.aspx", "CS_Activation.aspx?ActivationCode=" + activationCode) + "'>Click here to activate your account.</a>";
                body += "<br /><a href = 'http://localhost:10422/CS_Activation.aspx?ActivationCode='" + activationCode + "'>Click here to activate your account.</a>";
                body += "<br /><br />Thanks";
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential("mailID", "password");
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);
            }
        }
        private string InsertConsumerData(HttpContext context)
        {
            //try
            //{
            string str = "0";
            //if (con.State == ConnectionState.Closed)
            //{
            //    con.Open();
            //}
            //HttpFileCollection files = context.Request.Files;
            //for (int i = 0; i < files.Count; i++)
            //{
            //    HttpPostedFile file = files[i];
            //    string fname;
            //    string assId = string.Empty; ;
            //    if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
            //    {
            //        string[] testfiles = file.FileName.Split(new char[] { '\\' });
            //        fname = testfiles[testfiles.Length - 1];
            //    }
            //    else
            //    {
            //        fname = file.FileName;
            //        assId = fname;
            //    }
            //    fname = Path.Combine(context.Server.MapPath("~/ConsumerPhoto/"), fname + "img" + ".png");
            //    file.SaveAs(fname);
            string FullName = context.Request.QueryString["Name"];
            // string MobileNo = context.Request.QueryString["mob"];
            string EmailID = context.Request.QueryString["EmailID"].ToLower();
            string Address = context.Request.QueryString["address"];
            string Password = context.Request.QueryString["Password"];
            string ZipCode = context.Request.QueryString["ZipCode"];
            string mob = context.Request.QueryString["mobile"];

            //string Photo = assId + "img" + ".png";
            PropConsumerRegistration proConsumerRegistration = new PropConsumerRegistration();
            BllConsumerRegistration objConsumer = new BllConsumerRegistration();
            proConsumerRegistration.Name = FullName;
            proConsumerRegistration.EmailID = EmailID;
            proConsumerRegistration.Password = Password;
            proConsumerRegistration.ZipCode = ZipCode;
            //proConsumerRegistration.Photo = Photo;
            proConsumerRegistration.Address = Address;
            proConsumerRegistration.MobileNo = mob;
            str = objConsumer.RecordInsert(proConsumerRegistration);
            if (!string.IsNullOrEmpty(str))
            {
                context.Session["upass"] = Password;
                context.Session["userName"] = EmailID;
                context.Session["Consumer"] = str;
            }
            else
            {
                context.Session["upass"] = "";
                context.Session["userName"] = "";
                context.Session["Consumer"] = "";
            }


            //if (str != "0" || str != "-1")
            //{
            //    context.Session["Consumer"] = str.ToString();
            //}
            //else
            //{ }
            return str;
            //}
            //catch
            //{
            //    return "-1";
            //}
        }
        private string AssociateLogin(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"];
                string Password = context.Request.QueryString["Password"];
                BllAssociateLogin Objassociate = new BllAssociateLogin();
                PropAssociateLogin Proassociate = new PropAssociateLogin();
                Proassociate.Mob = EmailID;
                Proassociate.Password = Password;
                str = Objassociate.RecordSelect(Proassociate);
                return str;
                //if (str == "0")
                //{
                //    return "0";
                //}
                //else if (str == "-1")
                //{
                //    return "-1";
                //}
                //else if (str == "Invalid")
                //{
                //    return "Invalid";
                //}
                //else
                //{
                //    context.Session["associate"] = str.ToString();
                //    context.Session["userName"] = EmailID;
                //    return str;
                //}
            }
            catch
            {
                return "-1";
            }
        }

        private string AssociateResetPassword(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"];
                string Password = context.Request.QueryString["Password"];
                BllAssociateLogin Objassociate = new BllAssociateLogin();
                PropAssociateRegistration Proassociate = new PropAssociateRegistration();
                Proassociate.EmailID = EmailID;
                Proassociate.Password = Password;
                str = Objassociate.ResetAssociatePass(Proassociate);
                if (str == "1")
                {
                    str = "1";
                }
                else if (str == "-1")
                {
                    str = "-1";
                }
                return str;

            }
            catch
            {
                return "-1";
            }
        }


        private string SendAssociatePassonEmail(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"];
                BllAssociateLogin Objassociate = new BllAssociateLogin();
                PropAssociateRegistration Proassociate = new PropAssociateRegistration();
                Proassociate.EmailID = EmailID;
                str = Objassociate.ResetAssociatePassNew(Proassociate);
                if (str == "1")
                {
                    str = "1";
                }
                else if (str == "-1")
                {
                    str = "-1";
                }
                return str;

            }
            catch
            {
                return "-1";
            }
        }

        private string SendConsumerPassonEmail(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"];
                BllAssociateLogin Objassociate = new BllAssociateLogin();
                PropConsumerRegistration objConsumer = new PropConsumerRegistration();
                objConsumer.EmailID = EmailID;
                str = Objassociate.ResetConsumerPassNew(objConsumer);
                if (str == "1")
                {
                    str = "1";
                }
                else if (str == "-1")
                {
                    str = "-1";
                }
                return str;

            }
            catch
            {
                return "-1";
            }
        }




        private string ConsumerResetPassword(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"];
                string Password = context.Request.QueryString["Password"];
                BllAssociateLogin Objassociate = new BllAssociateLogin();
                PropConsumerRegistration ProConsumer = new PropConsumerRegistration();
                ProConsumer.EmailID = EmailID;
                ProConsumer.Password = Password;
                str = Objassociate.ResetConsumerPass(ProConsumer);
                if (str == "1")
                {
                    str = "1";
                }
                else if (str == "-1")
                {
                    str = "-1";
                }
                return str;

            }
            catch
            {
                return "-1";
            }
        }
        private string ConsumerLogin(HttpContext context)
        {
            try
            {
                string str = "0";
                string EmailID = context.Request.QueryString["EmailID"];
                string Password = context.Request.QueryString["Password"];
                BllAssociateLogin Objassociate = new BllAssociateLogin();
                PropConsumerRegistration ProConsumer = new PropConsumerRegistration();
                ProConsumer.MobileNo = EmailID;
                ProConsumer.Password = Password;
                //ProConsumer.MobileNo = crypt.EncryptUserName(EmailID);
                //ProConsumer.Password = crypt.EncryptPassword(Password);
                str = Objassociate.Selectconsumer(ProConsumer);
                if (str == "0")
                {
                    return "0";
                }
                else if (str == "-1")
                {
                    return "-1";
                }
                else if (str == "Invalid")
                {
                    return "Invalid";
                }
                else
                {
                    context.Session["consumer"] = str.ToString();
                    context.Session["userName"] = EmailID;
                    // return str;
                    return context.Session["consumer"].ToString();
                }
            }
            catch
            {
                return "-1";
            }
        }
        private string AssociateLogout(HttpContext context)
        {
            string str = "0";
            //context.Session.Clear();
            context.Session.Abandon();

            return str;

        }
        private string ConsumerLogout(HttpContext context)
        {
            string str = "0";
            context.Session.Abandon();

            return str;

        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}