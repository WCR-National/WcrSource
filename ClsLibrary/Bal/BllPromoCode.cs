using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
    public class BllPromoCode
    {
        public string RecordInsert(PropPromoCode objProperty)
        {
            DllPromoCode objDal = new DllPromoCode();
            try
            {
                return objDal.InsertPromoCode(objProperty);
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


        public int RecordUpdate(PropPromoCode objProperty)
        {
            DllPromoCode objDal = new DllPromoCode();
            try
            {
                return objDal.UpdatePromoCode(objProperty);
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

        public int RecordDelete(PropPromoCode objProperty)
        {
            DllPromoCode objDal = new DllPromoCode();
            try
            {
                return objDal.DeletePromoCode(objProperty);
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

        public string RecordSelect(string UserName)
        {
            DllPromoCode objDal = new DllPromoCode();
            try
            {
                return objDal.SelectPromoCode(UserName);
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
