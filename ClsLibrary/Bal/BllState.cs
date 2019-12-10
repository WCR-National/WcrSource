using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
    public class BllState
    {
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objcountry">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropState objState, string UserName)
        {
            DllState objDal = new DllState();
            try
            {


                return objDal.InsertState(objState, UserName);
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
        public string RecordUpdate(PropState objState, string UserName)
        {
            DllState objDal = new DllState();
            try
            {
                return objDal.UpdateState(objState, UserName);
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

        public string RecordDelete(PropState objState, string UserName)
        {
            DllState objDal = new DllState();
            try
            {
                return objDal.DeleteState(objState, UserName);
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
        public string RecordSelect(PropState objState, string UserName)
        {
            DllState objDal = new DllState();
            try
            {
                return objDal.SelectState(objState, UserName);
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
        public string SelectStates(PropState objState)
        {
            DllState objDal = new DllState();
            try
            {
                return objDal.CountryWiseState(objState);
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
