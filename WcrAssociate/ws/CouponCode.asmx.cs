using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer.Associate;

namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for CouponCode
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CouponCode : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string ApplyCouponCode(string CouponCode)
        {
            PropCouponCode objProperty = new PropCouponCode();
            objProperty.CouponCode = CouponCode;
            string str = string.Empty;
            BllCouponCode objCouponCode = new BllCouponCode();
            str = objCouponCode.CheckCouponCode(objProperty);
            return str;
        }
    }
}
