using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;

namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for AssociateSubscription
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class AssociateSubscription : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertSubscription(int SubscriptionID)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropAssociateMembership proSubscription = new PropAssociateMembership();
                proSubscription.associateID = Convert.ToInt16(   Session["associate"].ToString());
                proSubscription.subscriptionID = SubscriptionID;
                BllAssociateSubscription objsubscription = new BllAssociateSubscription();
                str = objsubscription.RecordInsert(proSubscription, Session["associate"].ToString());

                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetSubscriptionDetail()
        {
            try
            { if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllAssociateSubscription objsubscription = new BllAssociateSubscription();
                string res = objsubscription.RecordSelect(Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            else
            {
                return "Error in Authentication";
            }
            }
            catch
            {
                return "";
            }
        }


    }
}
