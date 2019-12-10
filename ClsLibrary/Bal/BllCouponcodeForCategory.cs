using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;

namespace ClsLibrary.Bal
{
  public  class BllCouponcodeForCategory
    {
         public string RecordSelect(string associateID)
        {
            DllCouponCodeForCategory objDal = new DllCouponCodeForCategory();
            try
            {
                string dd = objDal.SelectCouponCodeCategory(associateID);
                return dd;
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
