using System;
using System.Web.Services;
using System.Data;
using ClsLibrary.Bal.Associate;
using ClsLibrary.Bal;
using WcrClassLibrary;
namespace WcrWebApplication.Associate.ws
{
    /// <summary>
    /// Summary description for CategoryPurchase
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CategoryPurchase : System.Web.Services.WebService
    {  
        [WebMethod(EnableSession = true)]
        public string InsertD(object EmpId, int TeamID, object catName, string zipcode, object price, object Name)
        {
            if (Session["cartT"] != null)
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartT"];
                string[] totalEmp = EmpId.ToString().Split(',');
                string[] ParticularCate = catName.ToString().Split(',');
                string[] PriceValue = price.ToString().Split(',');
                string[] NamesValue = Name.ToString().Split(',');
                // string[] ZipIds = zipcode.ToString().Split(',');
                for (int i = 0; i < totalEmp.Length; i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["CategoryID"] = totalEmp[i];
                    dr["CategoryName"] = ParticularCate[i];
                    dr["Zipcode"] = zipcode;
                    dr["Price"] = PriceValue[i];
                    dr["Name"] = NamesValue[i];
                    dt.Rows.Add(dr);
                }
                Session["cartT"] = dt;
            }
            else
            {
                DataTable cart = new DataTable();
                cart.Columns.Add("CategoryID");
                cart.Columns.Add("CategoryName");
                cart.Columns.Add("Zipcode");
                cart.Columns.Add("Price");
                cart.Columns.Add("Name");
                Session["cartT"] = cart;

                string[] totalEmp = EmpId.ToString().Split(',');
                string[] ParticularCate = catName.ToString().Split(',');
                string[] PriceValue = price.ToString().Split(',');
                string[] NamesValue = Name.ToString().Split(',');
                //string[] ZipIds = zipcode.ToString().Split(',');

                for (int i = 0; i < totalEmp.Length; i++)
                {
                    DataRow dr = cart.NewRow();
                    dr["CategoryID"] = totalEmp[i];
                    dr["CategoryName"] = ParticularCate[i];
                    dr["Zipcode"] = zipcode;
                    dr["Price"] = PriceValue[i];
                    dr["Name"] = NamesValue[i];
                    cart.Rows.Add(dr);
                }
                Session["cartT"] = cart;
            }
            return "1";
        }
        [WebMethod(EnableSession = true)]
        public string RemoveCardSessions()
        {
            Session["cartT"] = null;
            Session["cartP"] = null;
            return "0";
        }

        [WebMethod(EnableSession = true)]
        public string InsertDNew(int CatID, string catName, string subCatName, int subCatID, string zipcode, int price)
        {
            if (Session["cartT"] != null)
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartT"];
                DataRow dr = dt.NewRow();
                dr["CategoryID"] = CatID;
                dr["CategoryName"] = catName;
                dr["SubCategoryName"] = subCatName;
                dr["subCategoryID"] = subCatID;
                dr["Zipcode"] = zipcode;
                dr["Price"] = price;
                dt.Rows.Add(dr);
                Session["cartT"] = dt;
            }
            else
            {
                DataTable cart = new DataTable();
                cart.Columns.Add("CategoryID");
                cart.Columns.Add("CategoryName");
                cart.Columns.Add("SubCategoryName");
                cart.Columns.Add("subCategoryID");
                cart.Columns.Add("Zipcode");
                cart.Columns.Add("Price");
                Session["cartT"] = cart;
                DataRow dr = cart.NewRow();
                dr["CategoryID"] = CatID;
                dr["CategoryName"] = catName;
                dr["SubCategoryName"] = subCatName;
                dr["subCategoryID"] = subCatID;
                dr["Zipcode"] = zipcode;
                dr["Price"] = price;
                cart.Rows.Add(dr);
                Session["cartT"] = cart;
            }
            return "1";
        }
        /// <summary>
        /// Purchase Category for sales
        /// </summary>
        /// <param name="CatID"></param>
        /// <param name="catName"></param>
        /// <param name="subCatName"></param>
        /// <param name="subCatID"></param>
        /// <param name="zipcode"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string PurchasedItems(int CatID, string catName, string subCatName, int subCatID, string zipcode, int price)
        {
            if (Session["cartP"] != null)
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartP"];
                DataRow dr = dt.NewRow();
                dr["CategoryID"] = CatID;
                dr["CategoryName"] = catName;
                dr["SubCategoryName"] = subCatName;
                dr["subCategoryID"] = subCatID;
                dr["Zipcode"] = zipcode;
                dr["Price"] = price;
                dt.Rows.Add(dr);
                Session["cartP"] = dt;
            }
            else
            {
                DataTable cart = new DataTable();
                cart.Columns.Add("CategoryID");
                cart.Columns.Add("CategoryName");
                cart.Columns.Add("SubCategoryName");
                cart.Columns.Add("subCategoryID");
                cart.Columns.Add("Zipcode");
                cart.Columns.Add("Price");
                Session["cartP"] = cart;
                DataRow dr = cart.NewRow();
                dr["CategoryID"] = CatID;
                dr["CategoryName"] = catName;
                dr["SubCategoryName"] = subCatName;
                dr["subCategoryID"] = subCatID;
                dr["Zipcode"] = zipcode;
                dr["Price"] = price;
                cart.Rows.Add(dr);
                Session["cartP"] = cart;
            }
            return "1";
        }

        /// <summary>
        /// Purchase Category for Services
        /// </summary>
        /// <param name="CatID"></param>
        /// <param name="catName"></param>
        /// <param name="subCatName"></param>
        /// <param name="subCatID"></param>
        /// <param name="zipcode"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string PurchasedItemsServices(int CatID, string catName, string subCatName, int subCatID, string zipcode, int price)
        {
            if (Session["cartservice"] != null)
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartservice"];
                DataRow dr = dt.NewRow();
                dr["CategoryID"] = CatID;
                dr["CategoryName"] = catName;
                dr["SubCategoryName"] = subCatName;
                dr["subCategoryID"] = subCatID;
                dr["Zipcode"] = zipcode;
                dr["Price"] = price;
                dt.Rows.Add(dr);
                Session["cartservice"] = dt;
            }
            else
            {
                DataTable cart = new DataTable();
                cart.Columns.Add("CategoryID");
                cart.Columns.Add("CategoryName");
                cart.Columns.Add("SubCategoryName");
                cart.Columns.Add("subCategoryID");
                cart.Columns.Add("Zipcode");
                cart.Columns.Add("Price");
                Session["cartservice"] = cart;
                DataRow dr = cart.NewRow();
                dr["CategoryID"] = CatID;
                dr["CategoryName"] = catName;
                dr["SubCategoryName"] = subCatName;
                dr["subCategoryID"] = subCatID;
                dr["Zipcode"] = zipcode;
                dr["Price"] = price;
                cart.Rows.Add(dr);
                Session["cartservice"] = cart;
            }
            return "1";
        }

        [WebMethod(EnableSession = true)]
        public string RemoveItem(int subCatID)
        {
            try
            {
                int index = subCatID;
                DataTable dt = Session["cartT"] as DataTable;
                dt.Rows[index].Delete();
                dt.AcceptChanges();
                return SelectCartData();

            }
            catch { return null; }
        }

        [WebMethod(EnableSession = true)]
        public string RemoveItem1(int subCatID)
        {
            try
            {

                int index = subCatID;
                DataTable dt = Session["cartP"] as DataTable;
                dt.Rows[index].Delete();
                dt.AcceptChanges();
                return SelectAllPurchasedCartData();
            }
            catch { return null; }
        }


        [WebMethod(EnableSession = true)]
        public string SelectCartData()
        {
            try
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartT"];
                DataSet ds = new DataSet();
                ds.Tables.Add(dt.Copy());
                return ds.GetXml();
            }
            catch { return null; }

        }
        /// <summary>
        /// Select All values from session of purchased category from sales 
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SelectAllPurchasedCartData()
        {
            try
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartP"];
                DataSet ds = new DataSet();
                ds.Tables.Add(dt.Copy());
                return ds.GetXml();
            }
            catch { return null; }

        }
        /// <summary>
        /// Select All values from session of purchased category from Services 
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SelectAllPurchasedCartDataServices()
        {
            try
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["cartservice"];
                DataSet ds = new DataSet();
                ds.Tables.Add(dt.Copy());
                return ds.GetXml();
            }
            catch { return null; }

        }


        [WebMethod(EnableSession = true)]
        public string InsertCategory(object categoryID, object SubcategoryID, int PlanID, object pricevalues, object zipcodeID, string Couponcode, int Discount, int Duration)
        {
            try
            {
                BllPurchaseCategory objPurchasecategory = new BllPurchaseCategory();
                string res = objPurchasecategory.InsertRecord(categoryID, SubcategoryID, PlanID, Convert.ToInt16(Session["associate"]), pricevalues, zipcodeID, Couponcode, Discount, Duration);
                if (res == "1")
                {
                    Session["cartT"] = null;
                    Session["cartP"] = null;
                    Session["cartservice"] = null;
                }
                return res;
            }
            catch
            {
                return "";
            }
        }
        [WebMethod(EnableSession = true)]
        public string InsertCatgoryPostAds(int categoryID, int SubcategoryID, int PlanID, int pricevalues, int zipcodeID, string Couponcode, int Discount, int Duration)
        {
            try
            {
                BllPurchaseCategory objPurchasecategory = new BllPurchaseCategory();
                string res = objPurchasecategory.InsertCatgoryPostAds(categoryID, SubcategoryID, PlanID, Convert.ToInt16(Session["associate"]), pricevalues, zipcodeID, Couponcode, Discount, Duration);

                return res;
            }
            catch
            {
                return "";
            }
        }


        [WebMethod(EnableSession = true)]
        public string ZipCodeExists(string Zipcode)
        {
            try
            {
                BllZipCodeRegistration ObjZipcode = new BllZipCodeRegistration();
                string res = ObjZipcode.ZipCodeExists(Zipcode, Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }
        [WebMethod(EnableSession = true)]
        public string AssociateCardExists()
        {
            try
            {
                BllPurchaseCategory objCategory = new BllPurchaseCategory();
                string res = objCategory.CardExistsOrNot(Convert.ToInt16(Session["associate"]).ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }
        //[WebMethod(EnableSession = true)]
        //public string LoadCardData()
        //{
        //    if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
        //    {
        //        BllPurchaseCategory objPurchasecategory = new BllPurchaseCategory();
        //        string res = objPurchasecategory.LoadCardData(Convert.ToInt16(Session["associate"]));
        //        return res;
        //    }
        //    else
        //    {
        //        return "Error in Authentication";
        //    }

        //}

        [WebMethod(EnableSession = true)]
        public string InsertAmount(string amount, string Description)
        {
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllPurchaseCategory objPurchasecategory = new BllPurchaseCategory();
                string res = objPurchasecategory.LoadCardData(Convert.ToInt16(Session["associate"]), amount, Session["userName"].ToString(),Description);
                return res;
            }
            else
            {
                return "Error in Authentication";
            }

        }

        [WebMethod(EnableSession = true)]
        public string InsertFeaturedAdv(object AdvertisementID, int PlanID)
        {
            try
            {
                if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
                {
                    BllPurchaseCategory objPurchasecategory = new BllPurchaseCategory();
                    string res = objPurchasecategory.SetFeaturedAd(AdvertisementID, PlanID, Convert.ToInt16(Session["associate"]));
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

        [WebMethod(EnableSession = true)]
        public string UnFeaturedAdv(object AdvertisementID)
        {
            try
            {
                BllPurchaseCategory objPurchasecategory = new BllPurchaseCategory();
                string res = objPurchasecategory.UnFeaturedAd(AdvertisementID);
                return res;
            }
            catch
            {
                return "";
            }
        }

        [WebMethod(EnableSession = true)]
        public string PurchaseZipCode()
        {
            try
            {
                BllZipCodeRegistration objPurchasecategory = new BllZipCodeRegistration();
                string res = objPurchasecategory.PurchaseZipCode(Session["associate"].ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }

        [WebMethod(EnableSession = true)]
        public string StateWiseZipCode(string StateID, string CityID)
        {
            try
            {
                BllZipCodeRegistration objPurchasecategory = new BllZipCodeRegistration();
                string res = objPurchasecategory.StateWiseZipCode(StateID, CityID, Session["associate"].ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }


        [WebMethod(EnableSession = true)]
        public string CityWiseStates(string CityID)
        {
            try
            {
                BllZipCodeRegistration objPurchasecategory = new BllZipCodeRegistration();
                string res = objPurchasecategory.CityWiseStates(CityID, Session["associate"].ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }



        [WebMethod(EnableSession = true)]
        public string GetCardRecord()
        {
            try
            {
                BllAssociateRegistration d = new BllAssociateRegistration();
                string res = d.GetCardRecord(Convert.ToInt16(Session["associate"].ToString()), Session["userName"].ToString());
                return res;
            }
            catch
            {
                return "";
            }
        }
       
        [WebMethod(EnableSession = true)]
        public string GetEncryptRcd(string _value)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                string res = cardEncrypt.WcrDecryptCardNumber(_value);
                return res;
            }
            catch
            {
                return "";
            }
        }


        /// <summary>
        /// This Method will get Price of SubCategory on the basis of zipCode population
        /// </summary>
        /// <param name="associateID"></param>
        /// <param name="zipCode"></param>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string GetSubCategoryPrice(int zipCode, int subCategoryID)
        {
            try
            {
                BllPurchaseCategory d = new BllPurchaseCategory();
                string res = d.SubCategoryPrice(Session["associate"].ToString(), zipCode, subCategoryID);
                return res;
            }
            catch
            {
                return "";
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetPostAdvertisementPrice(int zip, int subCategoryID)
        {
            try
            {
                BllPurchaseCategory d = new BllPurchaseCategory();
                string res = d.PostAdvertisementPrice(Session["associate"].ToString(), zip, subCategoryID);
                return res;
            }
            catch
            {
                return "";
            }
        }

        //[WebMethod(EnableSession = true)]
        //public string CategoriesInCarts(int CatID)
        //{
        //    if (Session["categories"] != null)
        //    {
        //        DataTable dt = new DataTable();
        //        dt = (DataTable)Session["categories"];
        //        DataRow dr = dt.NewRow();
        //        dr["CategoryID"] = CatID;
        //        dt.Rows.Add(dr);
        //        Session["categories"] = dt;
        //    }
        //    else
        //    {
        //        DataTable cart = new DataTable();
        //        cart.Columns.Add("CategoryID");
        //        Session["categories"] = cart;
        //        DataRow dr = cart.NewRow();
        //        dr["CategoryID"] = CatID;
        //        cart.Rows.Add(dr);
        //        Session["categories"] = cart;
        //    }
        //    return "1";
        //}


        //[WebMethod(EnableSession = true)]
        //public string SelectPurchasedCategories()
        //{
        //    try
        //    {
        //        DataTable dt = new DataTable();
        //        dt = (DataTable)Session["categories"];
        //        DataSet ds = new DataSet();
        //        ds.Tables.Add(dt.Copy());
        //        return ds.GetXml();
        //    }
        //    catch { return null; }

        //}




    }
}
