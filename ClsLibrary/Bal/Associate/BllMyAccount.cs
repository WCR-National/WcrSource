using System;
using ClsLibrary.PropertyLayer.Associate.Sale;
using ClsLibrary.Dal.Associate;
using System.Data;
namespace ClsLibrary.Bal.Associate
{
    public class BllMyAccount
    {
        /// <summary>
        /// This Method is used to get all purchased Category from Sales and Services
        /// </summary>
        /// <param name="associateID"></param>
        /// <returns></returns>
        public string RecordSelect(string associateID)
        {
            DllMyAccount objMyAccount = new DllMyAccount();
            try
            {
                return objMyAccount.SelectAdvertisement(associateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objMyAccount = null;
            }
        }
        /// <summary>
        /// This Method is used to get all purchased Category either from Sales or Services
        /// </summary>
        /// <param name="associateID"></param>
        /// <returns></returns>
        public string SelectPurchasedCategory(string associateID, int JobTypeID)
        {
            DllMyAccount objMyAccount = new DllMyAccount();
            try
            {
                return objMyAccount.SelectPurchasedCategory(associateID,JobTypeID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objMyAccount = null;
            }
        }

        /// <summary>
        /// This is overload method will get all the purchased categories from sales and services
        /// </summary>
        /// <param name="associateID"></param>
        /// <returns></returns>
        public string SelectPurchasedCategory(string associateID)
        {
            DllMyAccount objMyAccount = new DllMyAccount();
            try
            {
                return objMyAccount.SelectPurchasedCategory(associateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objMyAccount = null;
            }
        }


        public string SelectZipcode(string associateID)
        {
            DllMyAccount objMyAccount = new DllMyAccount();
            try
            {
                return objMyAccount.SelectPurchasedZipcode(associateID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objMyAccount = null;
            }
        }
        public string CategoryWiseZipcode(string associateID, int CategoryID)
        {
            DllMyAccount objMyAccount = new DllMyAccount();
            try
            {
                return objMyAccount.CategoryWiseZipcode(associateID,CategoryID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objMyAccount = null;
            }
        }


        public string RecordUpdate(int ID, string associateID, int activeV)
        {
            DllMyAccount objDal = new DllMyAccount();
            try
            {
                return objDal.UpdateAccount(ID,associateID, activeV);
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


        public string DeleteCategory( string associateID, int ID)
        {
            DllMyAccount objDal = new DllMyAccount();
            try
            {
                return objDal.DeleteCategory(associateID, ID);
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
