using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;
using System.Web;
using System.IO;
namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for InsertPromoCode
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class InsertPromoCode : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertPromo(int categoryID, int SubcategoryID, DateTime _fromDate, DateTime _toDate, float Discount, string PromoCode)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropPromoCode propPromo = new PropPromoCode();
                propPromo.CategoryID = categoryID;
                propPromo.SubCategoryID = SubcategoryID;
                propPromo.FromDate = _fromDate;
                propPromo.ToDate = _toDate;
                propPromo.Discount = Discount;
                propPromo.PromoCode = PromoCode;
                propPromo.AssociateID = Convert.ToInt16(Session["associate"]);
                BllPromoCode objPromoCode = new BllPromoCode();
                str = objPromoCode.RecordInsert(propPromo);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string SelectPromoCode()
        {
            string str = string.Empty;
            BllPromoCode ObjjobType = new BllPromoCode();
            str = ObjjobType.RecordSelect(Convert.ToInt16(Session["associate"]).ToString());
            return str;
        }

    }
}
