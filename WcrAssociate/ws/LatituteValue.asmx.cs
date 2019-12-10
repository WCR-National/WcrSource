using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for LatituteValue
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class LatituteValue : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string GetLatandLongValues(string zipcode)
        {
            string str = string.Empty;
            PropzipCode objProperty = new PropzipCode();
            objProperty.ZipCode = zipcode;
            BllZipCodeRegistration objzipCode = new BllZipCodeRegistration();
            str = objzipCode.SelectLatitute(objProperty);
            return str;
        }
    }
}
