using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
    public class BllAssociateSubscription
    {
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropAssociateMembership objProperty, string UserName)
        {
            DllAssociateSubscription objDal = new DllAssociateSubscription();
            try
            {
                return objDal.Insertsubscription(objProperty, UserName);
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
        public string RecordUpdate(PropAssociateMembership objProperty, string UserName)
        {
            DllAssociateSubscription objDal = new DllAssociateSubscription();
            try
            {
                return objDal.Updatesubscription(objProperty, UserName);
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

        public string RecordDelete(PropAssociateMembership objProperty, string UserName)
        {
            DllAssociateSubscription objDal = new DllAssociateSubscription();
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
        public string RecordSelect(string UserName)
        {
            DllAssociateSubscription objDal = new DllAssociateSubscription();
            try
            {
                return objDal.SelectMemberShip(UserName);
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
