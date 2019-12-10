using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
    public class BllSubAdmin
    {
        public string RecordInsert(PropSubAdmin objProperty, string UserName)
        {
            DllSubAdmin objDal = new DllSubAdmin();
            try
            {
                return objDal.InsertSubadmin(objProperty ,UserName);
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


        public string RecordUpdate(PropSubAdmin objProperty, string UserName)
        {
            DllSubAdmin objDal = new DllSubAdmin();
            try
            {
                return objDal.UpdateSubadmin(objProperty ,UserName);
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

        public string RecordDelete(PropSubAdmin objProperty, string UserName)
        {
            DllSubAdmin objDal = new DllSubAdmin();
            try
            {
                return objDal.DeleteSubadmin(objProperty ,UserName);
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

        public string RecordSelect(PropSubAdmin objProperty, string UserName)
        {
            DllSubAdmin objDal = new DllSubAdmin();
            try
            {
                return objDal.SelectSubadmin(objProperty,UserName);
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
