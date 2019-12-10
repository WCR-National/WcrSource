using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
  public  class BllMemberShip
    {
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropMemberShipPlan objProperty, string UserName)
        {
            DllMemberShipPlan objDal = new DllMemberShipPlan();
            try
            {
                return objDal.InsertMemberShip(objProperty, UserName);
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
        /// <param name="objCategory">JobType,Category Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>    
        public string RecordUpdate(PropMemberShipPlan objProperty, string UserName)
        {
            DllMemberShipPlan objDal = new DllMemberShipPlan();
            try
            {
                return objDal.UpdateMemberShip(objProperty, UserName);
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

        public string RecordDelete(PropMemberShipPlan objProperty, string UserName)
        {
            DllMemberShipPlan objDal = new DllMemberShipPlan();
            try
            {
                return objDal.DeleteMemberShip(objProperty, UserName);
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
        public string RecordSelect(PropMemberShipPlan objProperty)
        {
            DllMemberShipPlan objDal = new DllMemberShipPlan();
            try
            {
                return objDal.SelectMemberShip(objProperty);
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
