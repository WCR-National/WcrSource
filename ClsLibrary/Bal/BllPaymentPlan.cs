using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System;
namespace ClsLibrary.Bal
{
    public class BllPaymentPlan
    {
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objProperty">PlanName,Cost,duration</param>
        /// <returns>1 for success and -1 for fail</returns>
        public int RecordInsert(PropPaymentPlan objProperty)
        {
            DllPaymentPlan objDal = new DllPaymentPlan();
            try
            {
                return objDal.InsertPaymentPlan(objProperty);
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
        /// <param name="objProperty">PlanName,Cost,duration,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>    
        public int RecordUpdate(PropPaymentPlan objProperty)
        {
            DllPaymentPlan objDal = new DllPaymentPlan();
            try
            {
                return objDal.UpdatePaymentPlan(objProperty);
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
        /// <param name="objProperty">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public int RecordDelete(PropPaymentPlan objProperty)
        {
            DllPaymentPlan objDal = new DllPaymentPlan();
            try
            {
                return objDal.DeletePaymentPlan(objProperty);
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
        /// <param name="objProperty">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public int RecordSelect(PropPaymentPlan objProperty)
        {
            DllPaymentPlan objDal = new DllPaymentPlan();
            try
            {
                return objDal.SelectRecord(objProperty);
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
