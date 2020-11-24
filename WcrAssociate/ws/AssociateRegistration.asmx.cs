using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;
using WcrClassLibrary;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Configuration;
namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for AssociateRegistration
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AssociateRegistration : System.Web.Services.WebService
    {
        [WebMethod]
        public string InsertAssociate(string FullName, string EmailID, string Password, string MobileNo, string ZipCode, string UserName, string Photo, string LicenceState, string LicenceID, int ReferralID)
        {
            string str = string.Empty;
            PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
            proAssociateRegistration.FullName = FullName;
            proAssociateRegistration.EmailID = EmailID;
            proAssociateRegistration.Password = Password;
            proAssociateRegistration.MobileNo = MobileNo;
            proAssociateRegistration.ZipCode = ZipCode;
            proAssociateRegistration.UserName = UserName;
            proAssociateRegistration.Photo = Photo;
            proAssociateRegistration.LicenseState = LicenceState;
            proAssociateRegistration.LicenseID = LicenceID;
            proAssociateRegistration.ReferralID = ReferralID;
            BllAssociateRegistration objAssociate = new BllAssociateRegistration();
            str = objAssociate.RecordInsert(proAssociateRegistration);
            if (str != "0" || str != "-1")
            {
                Session["associate"] = str.ToString();
            }
            else
            { }
            return str;

        }

        [WebMethod]
        public string AssociateLogin(string EmailID, string Password)
        {
            string str = "0";
            BllAssociateLogin Objassociate = new BllAssociateLogin();
            PropAssociateLogin Proassociate = new PropAssociateLogin();
            Proassociate.Mob = EmailID;
            Proassociate.Password = Password;
            str = Objassociate.RecordSelect(Proassociate);
            return str;
        }
        [WebMethod]
        public string AssociateAccountExists(string EmailID)
        {
            string str = "0";
            BllAssociateLogin Objassociate = new BllAssociateLogin();
            str = Objassociate.AssociateAccountExists(EmailID);
            return str;
        }

        [WebMethod]
        public string ConsumerAccountExists(string EmailID)
        {
            string str = "0";
            BllAssociateLogin Objassociate = new BllAssociateLogin();
            str = Objassociate.ConsumerAccountExists(EmailID);
            return str;
        }
        [WebMethod]
        public string ConsumerLogin(string EmailID, string Password)
        {
            string str = string.Empty;
            BllAssociateLogin Objassociate = new BllAssociateLogin();
            PropConsumerRegistration Proconsumer = new PropConsumerRegistration();
            Proconsumer.MobileNo = EmailID;
            Proconsumer.Password = Password;
            str = Objassociate.Selectconsumer(Proconsumer);
            return str;

        }
        /// <summary>
        /// This Method will get Record on the basis of advertisement ID
        /// </summary>
        /// <param name="adID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string ViewAssociateDetails(int adID)
        {
            string str = string.Empty;
            BllAssociateRegistration bllass = new BllAssociateRegistration();
            str = bllass.AssociateDetail(adID, Session["associate"].ToString());
            return str;
        }
        /// <summary>
        /// This Method will get Record on the basis of Associate ID
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string ViewAssociateBasicDetails()
        {
            string str = string.Empty;
            BllAssociateRegistration bllass = new BllAssociateRegistration();
            str = bllass.AssociateBasicDetail(Convert.ToInt16(Session["associate"].ToString()), Session["userName"].ToString());
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string UpdateAssociate(string FullName, string LastName, string Password, string EmailID, string MobileNo, string LicenceID, string LicenceState, string ZipCode)
        {
            WcrCryptography crypt = new WcrCryptography();
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                string str = string.Empty;
                PropAssociateRegistration proAssociateRegistration = new PropAssociateRegistration();
                proAssociateRegistration.FullName = FullName;
                proAssociateRegistration.LastName = LastName;
                // proAssociateRegistration.UserName = UserName;
                //proAssociateRegistration.EmailID = crypt.WcrSimpleEncrypt(EmailID);
                //proAssociateRegistration.Password = crypt.WcrSimpleEncrypt(Password); 
                proAssociateRegistration.EmailID = EmailID;
                proAssociateRegistration.Password = Password;
                proAssociateRegistration.MobileNo = MobileNo;
                proAssociateRegistration.ZipCode = ZipCode;
                proAssociateRegistration.LicenseID = LicenceID;
                proAssociateRegistration.LicenseState = LicenceState;

                //HttpFileCollection files = Request.Files;
                //for (int i = 0; i < files.Count; i++)
                //{
                //    HttpPostedFile file = files[i];
                //    string fname;
                //}
                //proAssociateRegistration.Photo = Photo;
                BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                str = objAssociate.UpdateAssociateProfile(proAssociateRegistration, Session["associate"].ToString());

                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod]
        public string GetActivationCode(string username)
        {
            string str = string.Empty;
            BllAssociateLogin objAssociate = new BllAssociateLogin();
            str = objAssociate.SelectActivationCode(username);
            return str;
        }

        [WebMethod]
        public string VerifiedAccount(string username)
        {
            string str = string.Empty;
            BllAssociateLogin objAssociate = new BllAssociateLogin();
            str = objAssociate.VerifiedAccount(username);
            return str;
        }

        [WebMethod]
        public string AssociateStatus(string username)
        {
            string str = string.Empty;
            BllAssociateLogin objAssociate = new BllAssociateLogin();
            str = objAssociate.ChkAssociateStatus(username);
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string AssociateLoginSessionActivate(string username, string assoID)
        {
            Session["associate"] = assoID;
            Session["userName"] = username;
            return "1";
        }

        [WebMethod(EnableSession = true)]
        public string ConsumerLoginSessionActivate(string username, string assoID)
        {
            Session["consumer"] = assoID;
            Session["userName"] = username;
            return "1";
        }
        [WebMethod(EnableSession = true)]
        public string ViewConsumerBasicDetails()
        {
            string str = string.Empty;
            BllAssociateRegistration bllass = new BllAssociateRegistration();
            str = Session["userName"]?.ToString();
            return str;
        }

        [WebMethod]
        public string ResendActivationCode(string EmailID)
        {
            string str = "0";
            BllAssociateRegistration Objassociate = new BllAssociateRegistration();
            str = Objassociate.ResendActivationCode(EmailID);
            return str;

        }

        [WebMethod]
        public  List<string> CitiesInfo(string prefixText)
        {
            List<string> records = new List<string>();

            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = "select ID, cityID +'  '+ StateID as 'States' from tbl_zipcode where " + "cityID like @SearchText + '%'";
                    cmd.Parameters.AddWithValue("@SearchText", prefixText);
                    cmd.Connection = conn;
                    conn.Open();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            records.Add(dr["States"].ToString());
                        }
                    }
                    conn.Close();
                }

            }
            return records;
        }

       [WebMethod(EnableSession = true)]
        public static List<PropzipCode> CitiesInfo1(string CityName)
        {
            List<PropzipCode> empObj = new List<PropzipCode>();
            string cs = ConfigurationManager.ConnectionStrings["con"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    using (SqlCommand com = new SqlCommand())
                    {
                        com.CommandText = string.Format("select ID, cityID +'  '+ StateID as 'States' from tbl_zipcode where cityID like '{0}%'", CityName);
                        com.Connection = con;
                        con.Open();
                        SqlDataReader sdr = com.ExecuteReader();
                        PropzipCode emp = null;
                        while (sdr.Read())
                        {
                            emp = new PropzipCode();
                            emp.ID = Convert.ToInt32(sdr["ID"]);
                            emp.Name = Convert.ToString(sdr["States"]);
                            empObj.Add(emp);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error {0}", ex.Message);
            }
            return empObj;
        }
    }
}

