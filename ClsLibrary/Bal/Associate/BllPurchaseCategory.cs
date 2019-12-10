using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal.Associate;
using System.Data;

namespace ClsLibrary.Bal.Associate
{
    public class BllPurchaseCategory
    {
        public string InsertRecord(object CategoryID, object subCategoryID, int PaymentPlan, int associateID, object Categoryamount, object zipcodeID, string Couponcode, int Discount, int Duration)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.InsertD(CategoryID, subCategoryID, PaymentPlan, associateID, Categoryamount, zipcodeID, Couponcode, Discount, Duration);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string InsertCatgoryPostAds(int CategoryID, int subCategoryID, int PaymentPlan, int associateID, int Categoryamount, int zipcodeID, string Couponcode, int Discount, int Duration)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.InsertCatgoryPostAds(CategoryID, subCategoryID, PaymentPlan, associateID, Categoryamount, zipcodeID, Couponcode, Discount, Duration);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string LoadCardData(int associateID, string amount, string inUserName, string Description)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.LoadCardData(associateID, amount, inUserName, Description);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string SetFeaturedAd(object AdvertisementID, int PaymentPlan, int AssociateID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.SetFeaturedAdvD(AdvertisementID, PaymentPlan, AssociateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string UnFeaturedAd(object AdvertisementID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.UnFeaturedFeaturedAdvD(AdvertisementID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string CardExistsOrNot(string associateID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.AssociateCardExists(associateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public int CardExistsOrNot1(string associateID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.AssociateCardExists1(associateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }

        /// <summary>
        /// This Method will get Price of SubCategory on the basis of zipCode population
        /// </summary>
        /// <param name="associateID"></param>
        /// <param name="zipCode"></param>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        public string SubCategoryPrice(string associateID, int zipCode, int subCategoryID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.SubCategoryPrice(associateID, zipCode, subCategoryID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }


        public string PostAdvertisementPrice(string associateID, int zipCode, int subCategoryID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.PostAdvertisementPrice(associateID, zipCode, subCategoryID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }


        public string CountAssociateAdvertisements(string associateID)
        {
            DllPurchaseCategory objDal = new DllPurchaseCategory();
            try
            {
                return objDal.CountAssociateAdvertisements(associateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
    }
}
