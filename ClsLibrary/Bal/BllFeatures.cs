using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;

namespace ClsLibrary.Bal
{
  public  class BllFeatures
    {


        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropFeatures  objProperty, string UserName)
        {
            DllFeatures objDal = new DllFeatures();
            try
            {
                return objDal.InsertFeatures(objProperty, UserName);
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
        /// 
        /// This Method is used to Update data 
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>    
        public string RecordUpdate(PropFeatures objProperty, string UserName)
        {
            DllFeatures objDal = new DllFeatures();
            try

            {
                return objDal.UpdateFeatures(objProperty, UserName);
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
        /// This Method is used to Delete data 
        /// </summary>
        /// <param name="objCategory">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string RecordDelete(PropFeatures objProperty, string UserName)
        {
            DllFeatures objDal = new DllFeatures();
            try
            {
                return objDal.DeleteFeatures(objProperty, UserName);
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
        public string RecordSelect(PropFeatures objProperty, string UserName)
        {
            DllFeatures objDal = new DllFeatures();
            try
            {
                return objDal.SelectFeatures(objProperty, UserName);
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
        public string subCategoryWiseSelect(PropFeatures objProperty)
        {
            DllFeatures objDal = new DllFeatures();
            try
            {
                return objDal.SubCategorywiseFeatures(objProperty);
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
