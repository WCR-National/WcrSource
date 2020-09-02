using System.Web.Services;
using ClsLibrary.Bal.Associate;
using ClsLibrary.PropertyLayer.Associate.Sale;
using System;
using ClsLibrary.Bal;
namespace WcrWebApplication.Associate.ws
{
    /// <summary>
    /// Summary description for Sale
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Sale : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        // public string InsertSale(int CategoryId, int SubCategoryId, string title,  string address,  string contactNo, string description, string Features, int countryID, int StateID, int cityID, int isFeatured, string zipcode, object FeatureID, int jobtype, float amount)
        public string InsertSale(int CategoryId, int SubCategoryId, string title, string address, string contactNo, string description, string Features, string countryID, string StateID, string cityID, int isFeatured, string zipcode, int jobtype, float amount , float advertisementPrice)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropSales proSale = new PropSales();
                proSale.AssociateID = Convert.ToInt16(Session["associate"]);
                proSale.CategoryID = CategoryId;
                proSale.Subcategory = SubCategoryId;
                proSale.Title = title;
                proSale.Features = Features;
                proSale.Address = address;
                //proSale.Email = email;
                proSale.ContactNo = contactNo;
                proSale.Description = description;
                proSale.CountryID = countryID;
                proSale.StateID = StateID;
                proSale.CityID = cityID;
                proSale.IsfeaturedID = isFeatured;
                proSale.Zipcode = zipcode;
                proSale.jobtype = jobtype;
                proSale.Amount = amount;
                proSale.AdvtPrice = advertisementPrice;
                BllSale objSale = new BllSale();
                // str = objSale.RecordInsert(proSale, Session["associate"].ToString(), FeatureID);
                str = objSale.RecordInsert(proSale, Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string SelectAdvertisement(int Jobtype)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {

                BllSale objSale = new BllSale();
                str = objSale.RecordSelect(Session["associate"].ToString(), Jobtype);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string SelectAllAdvertisement()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {

                BllSale objSale = new BllSale();
                str = objSale.SelectAllAdvertisements(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string UpdateSale(int CategoryId, int SubCategoryId, string title, string Features, string address, string contactNo, string description, string countryID, string StateID, string cityID, string zipcode, float amount, int id)
        {
            string str = string.Empty;
            if (!string.IsNullOrEmpty( Session["associate"]?.ToString() ) )
            {
                PropSales proSale = new PropSales();
                proSale.AssociateID = Convert.ToInt16(Session["associate"]);
                proSale.CategoryID = CategoryId;
                proSale.Subcategory = SubCategoryId;
                proSale.Title = title;
                proSale.Features = Features;
                proSale.Address = address;
                proSale.ContactNo = contactNo;
                proSale.Description = description;
                proSale.CountryID = countryID;
                proSale.StateID = StateID;
                proSale.CityID = cityID;
                //proSale.IsfeaturedID = isFeatured;
                proSale.Zipcode = zipcode;
                proSale.Amount = amount;
                proSale.ID = id;
                BllSale objSale = new BllSale();
                str = objSale.RecordupdateSale(proSale, Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetVisitorsInfo()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllSale objSale = new BllSale();
                str = objSale.GetInterestedConsumersInfo(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string GetVisitorsInfoServices()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllSale objSale = new BllSale();
                str = objSale.GetInterestedConsumersInfoServices(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string CountTotalVisitors()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllSale objSale = new BllSale();
                str = objSale.TotalInterestedConsumers(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string AdvertisementClick()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {

                BllSale objSale = new BllSale();
                str = objSale.GetAdvertisementClick(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string CountAssociateCategories()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllSale objSale = new BllSale();
                str = objSale.AssociateCategoriesCount(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string DeleteDataFromadvertisement(int advtID)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropSales objProperty = new PropSales();
                objProperty.ID = advtID;
                BllSale objSale = new BllSale();
                str = objSale.RecordDelete(objProperty, Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string ViewAdvertisementDetails(int adID)
        {
            string str = string.Empty;
            BllinnerPage objInnerpage = new BllinnerPage();
            str = objInnerpage.SelectFullDetail(adID);
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string CountTotalVisitorsSales(int jobtype)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllSale objSale = new BllSale();
                str = objSale.TotalInterestedConsumersSales(Session["associate"].ToString(), jobtype);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        
        [WebMethod(EnableSession = true)]
        public string UpdatePostAdvertisementsCost(int advtID, float amount)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropSales objProperty = new PropSales();
                objProperty.ID = advtID;
                BllSale objSale = new BllSale();
                str = objSale.UpdatePostAdvertisementsCost(Session["associate"].ToString(), advtID, amount);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        
        [WebMethod(EnableSession = true)]
        public string CountAssociateAdvertisements()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllPurchaseCategory obj = new BllPurchaseCategory();
                str = obj.CountAssociateAdvertisements(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }



        [WebMethod(EnableSession = true)]
        public string CountPurchasedZipcode()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                BllSale obj = new BllSale();
                str = obj.AssociateZipcodeCount(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string DeleteCustomerRecords(int ID)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                
                BllSale objSale = new BllSale();
                str = objSale.DeleteInterestedRecord(Session["associate"].ToString(), ID);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }






    }
}
