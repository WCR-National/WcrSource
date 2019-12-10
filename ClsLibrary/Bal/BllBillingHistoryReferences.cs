using System;
using ClsLibrary.PropertyLayer.Associate.Sale;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
    public class BllBillingHistoryReferences
    {
        public string GetBillingHist(string associateID)
        {
            DllBillingHistory objDal = new DllBillingHistory();
            try
            {
                return objDal.GetBillingHistoryReferences(associateID);
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
        public string GetBillingHistForCateogry(int ReferenceID)
        {
            DllBillingHistory objDal = new DllBillingHistory();
            try
            {
                return objDal.GetBillingHistoryPurchaseCategory(ReferenceID);
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
        public string GetBillingHistPostedAdvertisements(int ReferenceID)
        {
            DllBillingHistory objDal = new DllBillingHistory();
            try
            {
                return objDal.GetBillingHistoryPostedSalesAdvertisements(ReferenceID);
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


        public string GetBillingHistPurchaseZipCodes(int ReferenceID)
        {
            DllBillingHistory objDal = new DllBillingHistory();
            try
            {
                return objDal.GetBillingHistoryPurchasedZipcodes(ReferenceID);
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
