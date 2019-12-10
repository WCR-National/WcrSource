using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;
using System.Web;
using System.IO;

namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for BillingHistoryRef
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class BillingHistoryRef : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public string GetBillingHistoryRef()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllBillingHistoryReferences objCategory = new BllBillingHistoryReferences();
                str = objCategory.GetBillingHist(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        
        [WebMethod(EnableSession = true)]
        public string GetBillingHistoryRefForCategory(int ReferenceID)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllBillingHistoryReferences objCategory = new BllBillingHistoryReferences();
                str = objCategory.GetBillingHistForCateogry(ReferenceID);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string GetBillingHistoryRefForPostedAdvertisements(int ReferenceID)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllBillingHistoryReferences objCategory = new BllBillingHistoryReferences();
                str = objCategory.GetBillingHistPostedAdvertisements(ReferenceID);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string GetBillingHistoryRefForPurchaseZipcodes(int ReferenceID)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllBillingHistoryReferences objCategory = new BllBillingHistoryReferences();
                str = objCategory.GetBillingHistPurchaseZipCodes(ReferenceID);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
   
    
    
    }
}
