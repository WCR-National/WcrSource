using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ClsLibrary.Bal;


namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for CouponCodeCategory
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class CouponCodeCategory : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string CheckCouponCode()
        {
          
            string str = string.Empty;
            BllCouponcodeForCategory objCouponCode = new BllCouponcodeForCategory();
            str = objCouponCode.RecordSelect(Convert.ToInt16(Session["associate"]).ToString());
            return str;
        }
    }
}
