using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClsLibrary.Dal;
using ClsLibrary.PropertyLayer.Associate;
namespace ClsLibrary.Bal
{
    public class BllinnerPage
    {

        /// <summary>
        /// This Method is used to Select data 
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordSelect(string zipcode, int subCategoryID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.SelectAdvertisement(zipcode, subCategoryID);
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
        /// This Method get Advertisments on the basis of Subcategory
        /// </summary>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        public string SelectHomeP(int subCategoryID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.SelectHomePageAdvertisement(subCategoryID);
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
        /// This Method is used to Select data 
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string CountAdvertisements(string zipcode, int subCategoryID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.TotalAdvertisement(zipcode, subCategoryID);
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
        /// Get Count total advertisement 
        /// </summary>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        public string CountAdvertisementsH(int subCategoryID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.TotalAdvertisementHome(subCategoryID);
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
        /// Get count total advertisement saved by consumer
        /// </summary>
        /// <param name="consumerID"></param>
        /// <returns></returns>

        public string CountAdvertisementsConsumer(int consumerID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.TotalAdvertisementConsumerSaved(consumerID);
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
        /// This method will display complete detail of an advertisment
        /// </summary>
        /// <param name="adID"></param>
        /// <returns></returns>

        public string SelectFullDetail(int adID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.AdvertisementDetail(adID);
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
        public string SelectFeaturedAdv(int adID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.ShowFeaturesAdvertisment(adID);
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

        public string RecordInsert(PropSaveAdvertisements objProperty ,int zipCode, int jtype)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.InsertSaveAdvertisement(objProperty, zipCode, jtype);
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
        /// This Method will get all the saved advertisemets of consumer from db
        /// </summary>
        /// <param name="ConsumerID"></param>
        /// <returns></returns>
        public string ConsemersSavedAdvts(int ConsumerID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.ConsumerSavedAdvertisements(ConsumerID);
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
        /// Bind BookMark Avdvertisements
        /// </summary>
        /// <param name="zipcode"></param>
        /// <param name="catID"></param>
        /// <returns></returns>

        public string ConsumerSavedBookAdvertisementsForServices(int ConsumerID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.ConsumerSavedBookAdvertisementsForServices(ConsumerID);
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
        /// This Method will get data of associate and advertisements for whome consumer contated before
        /// </summary>
        /// <param name="consumerID"></param>
        /// <returns></returns>
        public string ViewAssociateContactedDetail(int consumerID)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.ViewAssociateContactedDetail(consumerID);
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

        public string SelectHomePWithParam(int subCategoryID, string param)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.SelectHomePageAdvertisementWithSearching(subCategoryID, param);
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

        public string DeleteRecord(PropSaveAdvertisements objProperty)
        {
            DllinnerPage objDal = new DllinnerPage();
            try
            {
                return objDal.DeleteSavedAdvertisement(objProperty);
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
