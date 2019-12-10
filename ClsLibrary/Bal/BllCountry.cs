using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using ClsLibrary.PropertyLayer.Associate.Service;
namespace ClsLibrary.Bal
{
    public class BllCountry
    {

        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objcountry">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropCountry objCountry, string UserName)
        {
            PropService p = new PropService();
           
            Dllcountry objDal = new Dllcountry();
            try
            {
                return objDal.Insertcountry(objCountry, UserName);
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
        /// This Method is used to Update data 
        /// </summary>
        /// <param name="objCountry">Country Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>    
        public string RecordUpdate(PropCountry objCountry, string UserName)
        {
            Dllcountry objDal = new Dllcountry();
            try
            {
                return objDal.UpdateCountry(objCountry, UserName);
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
        /// <param name="objCountry">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string RecordDelete(PropCountry objCountry, string UserName)
        {
            Dllcountry objDal = new Dllcountry();
            try
            {
                return objDal.Deletecountry(objCountry, UserName);
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
        /// <param name="objCountry">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordSelect(PropCountry objCountry)
        {
            Dllcountry objDal = new Dllcountry();
            try
            {
                return objDal.Selectcountry(objCountry);
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
