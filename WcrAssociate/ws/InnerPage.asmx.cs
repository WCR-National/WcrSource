using System;
using System.Collections.Generic;
using System.Web.Services;
using ClsLibrary.Bal;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Data.SqlClient;
using System.Configuration;
using ClsLibrary.PropertyLayer.Associate.Sale;
using System.Data;
using ClsLibrary.PropertyLayer.Associate;
namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for InnerPage
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class InnerPage : System.Web.Services.WebService
    {
        /// <summary>
        /// This Method get Advertisments on the basis of Subcategory
        /// </summary>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string ViewHomeAdvertisements(int subCategoryID)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.SelectHomeP(subCategoryID);
            return str;
        } 
        /// <summary>
        /// This Method will get all the saved advertisemets of consumer from db
        /// </summary>
        /// <param name="ConsumerID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string ViewConsumerSavedAdvertisements()
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.ConsemersSavedAdvts(Convert.ToInt16(Session["consumer"].ToString()));
            return str;
        }


        [WebMethod(EnableSession = true)]
        public string ConsumerSavedBookAdvertisementsForServices()
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.ConsumerSavedBookAdvertisementsForServices(Convert.ToInt16(Session["consumer"].ToString()));
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string ViewAdvertisements(string zipcode, int subCategoryID)
        //public string ViewAdvertisements()
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.RecordSelect(zipcode, subCategoryID);
            //str = objInnerpage.RecordSelect("501", 1);
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string ViewAdvertisementDetails(int adID)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            int consumerId = 0;
            if (!string.IsNullOrEmpty(Session["consumer"].ToString()))
            {
                consumerId = Convert.ToInt16(Session["consumer"].ToString());
            }
            str = objInnerpage.SelectFullDetail(adID, consumerId);
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string ViewAdvertisementFeatured(int adID)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.SelectFeaturedAdv(adID);
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string CountAdvertisements(string zipcode, int subCategoryID)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.CountAdvertisements(zipcode, subCategoryID);
            return str;
        }
        /// <summary>
        /// Get Count total advertisments 
        /// </summary>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CountAdvertisementsH(int subCategoryID)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.CountAdvertisementsH(subCategoryID);
            return str;
        }
        /// <summary>
        /// Get total count advertisement saved by consumer
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CountAdvertisementsConsumerSaved()
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.CountAdvertisementsConsumer(Convert.ToInt16(Session["consumer"].ToString()));
            return str;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void ViewRecords()
        {

            List<PropSales> stq = new List<PropSales>();
            string cn = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cn))
            {
                SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "SubcategoryWise");
                cmd.Parameters.AddWithValue("@ZipCode", "501");
                cmd.Parameters.AddWithValue("@subCategoryID", 1);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    PropSales sq = new PropSales();
                    sq.ID = Convert.ToInt16(dr["advertisementID"]);
                    sq.Title = dr["title"].ToString();
                    sq.Address = dr["address"].ToString();
                    sq.Description = dr["description"].ToString();
                    sq.Amount = Convert.ToDouble(dr["cost"].ToString());
                    sq.IsfeaturedID = Convert.ToInt16(dr["isfeatured"].ToString());
                    sq.MainImg = dr["advMainImage"].ToString();
                    sq.CityName = dr["City"].ToString();
                    sq.Zipcode = dr["ZipCode"].ToString();
                    stq.Add(sq);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(stq));
        }

        [WebMethod(EnableSession = true)]
        public string InsertSavedAdts(int AdvertisementID, int zipCode, int jtype)
        {
            string str = string.Empty;

            PropSaveAdvertisements objSave = new PropSaveAdvertisements();
            objSave.ConsumerID = Convert.ToInt16(Session["consumer"].ToString());
            objSave.AdvertisementID = AdvertisementID;
            BllinnerPage objSaveads = new BllinnerPage();
            str = objSaveads.RecordInsert(objSave, zipCode, jtype);
            return str;

        }

        /// <summary>
        /// This Method will get data of associate and advertisements for whome consumer contated before
        /// </summary>
        /// <param name="consumerID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string ViewAssociateContactedDetail()
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.ViewAssociateContactedDetail(Convert.ToInt16(Session["consumer"].ToString()));
            return str;
        }



        [WebMethod(EnableSession = true)]
        public string ViewHomeAdvertisementsWithParam(int subCategoryID, string param)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.SelectHomePWithParam(subCategoryID, param);
            return str;
        }

        /// <summary>
        /// This Method will Delete Advertisement permanantely from consumer save table
        /// </summary>
        /// <param name="AdvertisementID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteSavedAdts(int ID)
        {
            string str = string.Empty;
            PropSaveAdvertisements objSave = new PropSaveAdvertisements();
            objSave.ConsumerID = Convert.ToInt16(Session["consumer"].ToString());
            objSave.ID = ID;
            BllinnerPage objSaveads = new BllinnerPage();
            str = objSaveads.DeleteRecord(objSave);
            return str;

        }


    }
}



