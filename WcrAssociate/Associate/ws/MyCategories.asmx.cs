using System;
using System.Web.Services;
using System.Data;
using ClsLibrary.Bal.Associate;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer.Associate.Sale;
namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for MyCategories
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MyCategories : System.Web.Services.WebService
    {
        /// <summary>
        /// This Method is used to get all purchased Category from Sales and Services
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string MuPurchaseCategories()
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.RecordSelect(Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }

        [WebMethod(EnableSession = true)]
        public string SelectCurrentPurchasedZipCodes()
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.SelectCurrentPurchasedZipCodes(Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }

        

        /// <summary>
        /// This Method is used to get all purchased Category either from Sales or Services
        /// </summary>
        /// <param name="JobType"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string MuPurchaseCategories(int JobType)
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.SelectPurchasedCategory(Convert.ToInt16(Session["associate"]).ToString(), JobType);
                return res;
            }
            catch
            {
                return "";
            }
        }

        /// <summary>
        /// This  Method will get all the purchased categories from sales and services
        /// </summary>
        /// <param name="JobType"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string AllPurchasedCategories()
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.SelectPurchasedCategory(Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }







        [WebMethod(EnableSession = true)]
        public string MyZipcodes()
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.SelectZipcode(Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }

        /// <summary>
        /// This method is used to get category that associate have purchased wise zipcode
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CategoryWiseZipcodes(int categoryId)
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.CategoryWiseZipcode(Convert.ToInt16(Session["associate"]).ToString(), categoryId);
                return res;
            }
            catch
            {
                return "";
            }
        }
        [WebMethod(EnableSession = true)]
        public string UpdateMyAccount(int ID,int activeV)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllMyAccount ObjLeadStatus = new BllMyAccount();
                str = ObjLeadStatus.RecordUpdate(ID, Session["associate"].ToString(),activeV);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string Blockadvertisements(int ID, int activeV)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropSales objProperty = new PropSales();
                objProperty.Subcategory = ID;
                BllSale ObjLeadStatus = new BllSale();
                str = ObjLeadStatus.BlockedRecords(objProperty, Session["associate"].ToString(), activeV);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string CountPurchasedCategories(int jobtype)
        {
            try
            {
                BllAssociateRegistration ObjMyAccount = new BllAssociateRegistration();
                string res = ObjMyAccount.TotalAdvts(Convert.ToInt16(Session["associate"]), jobtype);
                return res;
            }
            catch
            {
                return "";
            }
        }



        [WebMethod(EnableSession = true)]
        public string CountPurchasedZipCode()
        {
            try
            {
                BllAssociateRegistration ObjMyAccount = new BllAssociateRegistration();
                string res = ObjMyAccount.CountTotalZipCodePurchased(Convert.ToInt16(Session["associate"]));
                return res;
            }
            catch
            {
                return "";
            }
        }














        [WebMethod(EnableSession = true)]
        public string CountAllPurchasedCategories()
        {
            try
            {
                BllAssociateRegistration ObjMyAccount = new BllAssociateRegistration();
                string res = ObjMyAccount.TotalAllAdvts(Convert.ToInt16(Session["associate"]));
                return res;
            }
            catch
            {
                return "";
            }
        }


        [WebMethod(EnableSession = true)]
        public string DeletePurchasedCategories(int id)
        {
            try
            {
                BllMyAccount ObjMyAccount = new BllMyAccount();
                string res = ObjMyAccount.DeleteCategory( Convert.ToInt16(Session["associate"]).ToString(),id);
                return res;
            }
            catch
            {
                return "";
            }
        }


    }
}
