using System;
using ClsLibrary.PropertyLayer.Associate.Sale;
using ClsLibrary.Dal.Associate;
using System.Data;
namespace ClsLibrary.Bal.Associate
{
    public class BllSale
    {
        //public string RecordInsert(PropSales objProperty, string associateID, object FeatureID)
        public string RecordInsert(PropSales objProperty, string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.InsertSale(objProperty, associateID);
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
        public string RecordSelect(string associateID, int jobType)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.SelectAdvertisement(associateID, jobType);
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
        public string SelectAllAdvertisements(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.SelectAllAdvertisement(associateID);
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
        public string RecordupdateSale(PropSales objProperty, string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.UpdateSale(objProperty, associateID);
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
        public string RecordUpdate(string associateID, string ImgName, string Img1, string Img2, string Img3, int Associate)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.UpdateAdvertisementPics(associateID, ImgName, Img1, Img2, Img3, Associate);
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
        public string GetInterestedConsumersInfo(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.InterestedConsumers(associateID);
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
        public string GetInterestedConsumersInfoServices(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.InterestedConsumersServices(associateID);
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
        public string TotalInterestedConsumers(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.InterestedConsumersCount(associateID);
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
        public string GetAdvertisementClick(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.VisitorsClick(associateID);
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
        public string BlockedRecords(PropSales objProperty, string associateID, int activeV)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.BlockPostAdvertisements(objProperty, associateID, activeV);
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
        public string AssociateCategoriesCount(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.AssociateCategoriesCount(associateID);
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
        public string AssociateZipcodeCount(string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.PurchasedZipcodeCount(associateID);
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
        public string RecordDelete(PropSales objProperty, string associateID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.RemoveSaleRecord(objProperty, associateID);
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
        public string TotalInterestedConsumersSales(string associateID, int jobType)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.InterestedConsumersSalesCount(associateID, jobType);
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
        public string UpdatePostAdvertisementsCost(string associateID, int advtsID, float amount)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.UpdatePostAdvertisementsCost(associateID, advtsID, amount);
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
        public string DeleteInterestedRecord(string associateID, int advtsID)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.DeleteInterestedRecord(associateID, advtsID);
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

        public string UpdateSingleImage(string associateID, string ColName, string ImgName, int AdvertiseID, string actionName)
        {
            DllSale objDal = new DllSale();
            try
            {
                return objDal.UpdateAdvertisementPicsSingle(associateID, ColName, ImgName, AdvertiseID, actionName);
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
