using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;

namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for AssociateSupport
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class AssociateSupport : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string AssociateSupportQuery(string Messg)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {

                BllConsumerRegistration objConsumerSupport = new BllConsumerRegistration();
                str = objConsumerSupport.AssociateSupport(Convert.ToInt16(Session["associate"].ToString()), Messg, Session["userName"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

    }
}
