using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;

namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for ConsumerRegistration
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ConsumerRegistration : System.Web.Services.WebService
    {

        //[WebMethod]
        //public string InsertAssociate(string FullName, string Address, string EmailID, string Password, string MobileNo, string ZipCode, string Photo)
        //{
        //    string str = string.Empty;
        //    PropConsumerRegistration proConsumerRegistration = new PropConsumerRegistration();
        //    proConsumerRegistration.Name = FullName;
        //    proConsumerRegistration.Address = Address;
        //    proConsumerRegistration.EmailID = EmailID;
        //    proConsumerRegistration.Password = Password;
        //    proConsumerRegistration.MobileNo = MobileNo;
        //    proConsumerRegistration.ZipCode = ZipCode;
        //    proConsumerRegistration.Photo = Photo;
        //    BllConsumerRegistration objConsumer = new BllConsumerRegistration();
        //    str = objConsumer.RecordInsert(proConsumerRegistration);
        //    if (str != "0" || str != "-1")
        //    {
        //        Session["associate"] = str.ToString();
        //    }
        //    else
        //    { }

        //    return str;

        //}

        [WebMethod(EnableSession = true)]
        public string UpdateConsumer(string FirstName, string Address, string userName, string MobileNo, string password, string emailID, string ZipCode, string lastName, string Unit_Apt, string city, string stateID)
        {
            string str = string.Empty;
            PropConsumerRegistration proConsumerRegistration = new PropConsumerRegistration();
            proConsumerRegistration.Name = FirstName;
            proConsumerRegistration.Address = Address;
            proConsumerRegistration.UserName = userName;
            proConsumerRegistration.MobileNo = MobileNo;
            proConsumerRegistration.Password = password;
            proConsumerRegistration.EmailID = emailID;
            proConsumerRegistration.ZipCode = ZipCode;
            proConsumerRegistration.LastName = lastName;
            proConsumerRegistration.Unit_Apt = Unit_Apt;
            proConsumerRegistration.City = city;
            proConsumerRegistration.StateID = stateID;
            proConsumerRegistration.ID = Convert.ToInt16(Session["consumer"].ToString());
            BllConsumerRegistration objConsumer = new BllConsumerRegistration();
            str = objConsumer.RecordUpdate(proConsumerRegistration);
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string ConsumerDetail()
        {

            string str = string.Empty;
            if (Session["consumer"].ToString() != "")
            {
                BllAssociateLogin objAssociate = new BllAssociateLogin();
                str = objAssociate.GetConsumerDetail(Convert.ToInt16(Session["consumer"].ToString()));

            }
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string ConsumerIsLogin()
        {
            string str = string.Empty;
            if (Session["consumer"].ToString() != "")
            {
                str = Session["consumer"].ToString();
            }
            //else if (Session["associate"].ToString() != "")
            //{
            //    str = Session["associate"].ToString();
            //}
            else
            {
                str = "0";
            }

            return str;
        }
        [WebMethod(EnableSession = true)]
        public string SelectConsumerDetail()
        {
            string str = string.Empty;
            BllConsumerRegistration Objconsumer = new BllConsumerRegistration();
            str = Objconsumer.RecordSelect(Convert.ToInt16(Session["consumer"]), Session["userName"].ToString());
            return str;

        }

        [WebMethod(EnableSession = true)]
        public string DeleteConsumer()
        {
            string str = string.Empty;
            PropConsumerRegistration objProperty = new PropConsumerRegistration();
            objProperty.ID=Convert.ToInt16(Session["consumer"]);
            BllConsumerRegistration Objconsumer = new BllConsumerRegistration();
            str = Objconsumer.DeleteConsumer(objProperty);
            Session.Abandon();
            return str;

        }
        
        [WebMethod(EnableSession = true)]
        public string UpdateCompulsoryData(string Name)
        {
            string str = string.Empty;
            BllConsumerRegistration objConsumer = new BllConsumerRegistration();
            str = objConsumer.UpdateCompulsaryData(Name, Convert.ToInt16(Session["consumer"].ToString()), Session["userName"].ToString());
            return str;

        }

        [WebMethod(EnableSession = true)]
        public string CheckConsumerMobANDEmailExists()
        {
            string str = string.Empty;
            BllConsumerRegistration objConsumer = new BllConsumerRegistration();
            str = objConsumer.CheckConsumerMobANDEmailExists(Convert.ToInt16(Session["consumer"].ToString()));
            return str;

        }
         [WebMethod(EnableSession = true)]
        public string ConsumerSupport(string Messg)
        {
            string str = string.Empty;
            if (Session["consumer"].ToString() != "" || Session["consumer"].ToString() != null)
            {

                BllConsumerRegistration objConsumerSupport = new BllConsumerRegistration();
                str = objConsumerSupport.ConsumerSupport(Convert.ToInt16(Session["consumer"].ToString()), Messg, Session["userName"].ToString());
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
            str = objAssociate.SelectConsumerActivationCode(username);
            return str;
        }

        [WebMethod]
        public string VerifiedAccount(string username)
        {
            string str = string.Empty;
            BllAssociateLogin objAssociate = new BllAssociateLogin();
            str = objAssociate.VerifiedConsumerAccount(username);
            return str;
        }

        [WebMethod]
        public string ConsumerStatus(string username)
        {
            string str = string.Empty;
            BllAssociateLogin objAssociate = new BllAssociateLogin();
            str = objAssociate.ChkConsumerStatus(username);
            return str;
        }



    }
}
