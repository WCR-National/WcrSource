using System.Web.Services;
using ClsLibrary.Bal.Associate;
using ClsLibrary.PropertyLayer;
using System;
using System.Data;
namespace WcrWebApplication.Associate.ws
{
    /// <summary>
    /// Summary description for PurchaseCategory
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PurchaseCategory : System.Web.Services.WebService
    {

        /// <summary>
        /// This method is used to bind category according to job type
        /// </summary>
        /// <param name="flag">1</param>
        /// <param name="jobtype"></param>
        /// <returns></returns>


        [WebMethod(EnableSession = true)]
        public string InsertCategory1(object EmpId, string TeamID)
        {
            string str = string.Empty;
            //if (Session["associate"] != "" || Session["associate"].ToString() != null)
            //{
            //    if (Session["cartT"] != null)
            //    { 
            //    }
            //    return "k";
            //PropSubcategory objPurchase = new PropSubcategory();
            //objPurchase.ID = SubCategory;
            //objPurchase.flag = status;
            //BllPurchaseCategory objPurchaseCategory = new BllPurchaseCategory();
            //str = objPurchaseCategory.InsertRecord(objPurchase, fromDate, toDate, paymentStatus, paymentPlan, Session["associate"].ToString());

            //PropSales proSale = new PropSales();
            //proSale.Subcategory = SubCategoryId;
            //proSale.Name = Name;
            //proSale.Features = Features;
            //proSale.Address = address;
            //proSale.Description = description;
            //proSale.CountryID = countryID;
            //proSale.StateID = StateID;
            //proSale.CityID = cityID;
            //proSale.IsfeaturedID = isFeatured;
            //proSale.Zipcode = zipcode;
            //proSale.AssociateID = Convert.ToInt32(Session["associate"].ToString());
            //BllSale objSale = new BllSale();
            //str = objSale.RecordInsert(proSale, Session["associate"].ToString());
            return str;
            //}
            //else
            //{
            //    return "Error in Authentication";
            //}
        }


        //public string GetD()
        //{
        //    DataTable cart = new DataTable();
        //    cart.Columns.Add("ProductID");
        //    cart.Columns.Add("Price");
        //    Session["cartT"] = cart;

        //}object ite

        [WebMethod(EnableSession = true)]
        public string InsertCategory()
        {

            if (Session["cartT"] != null)
            {

                //DataTable dt = new DataTable();
                //string[] totalEmp = ite.ToString().Split(',');
                //for (int i = 0; i < totalEmp.Length; i++)
                //{
                //    DataRow dr = dt.NewRow();
                //    dr["CategoryID"] = totalEmp[i];
                //    dr["Price"] = 5;

                //    dt.Rows.Add(dr);
                //}
                //Session["cartT"] = dt;
            }
            else
            {

                //DataTable cart = new DataTable();
                //cart.Columns.Add("ProductID");
                //cart.Columns.Add("Price");
                //Session["cartT"] = cart;
                //DataTable dt = new DataTable();
                //string[] totalEmp = ite.ToString().Split(',');
                //for (int i = 0; i < totalEmp.Length; i++)
                //{
                //    DataRow dr = dt.NewRow();
                //    dr["CategoryID"] = totalEmp[i];
                //    dr["Price"] = 5;

                //    dt.Rows.Add(dr);
                //}
                //Session["cartT"] = dt;
            }
            return "Ok";
        }
    }
}
