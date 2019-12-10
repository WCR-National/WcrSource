using System;
using ClsLibrary.PropertyLayer.Associate;
using ClsLibrary.Dal;

namespace ClsLibrary.Bal
{
    public class BllCouponCode
    {
        public string CheckCouponCode(PropCouponCode objCouponCode)
        {
            DllCouponCode objDal = new DllCouponCode();
            try
            {
                string dd = objDal.SearchCouponcode(objCouponCode);
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
