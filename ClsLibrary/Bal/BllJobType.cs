using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Web;
namespace ClsLibrary.Bal
{
    public class BllJobType
    {
        public string RecordInsert(string n)
        {
            DllJobType objDal = new DllJobType();
            try
            {
                return objDal.InsertJobType(n);
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

        public int RecordUpdate(PropJobType objProperty)
        {
            DllJobType objDal = new DllJobType();
            try
            {
                return objDal.UpdateJobType(objProperty);
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

        public int RecordDelete(PropJobType objProperty)
        {
            DllJobType objDal = new DllJobType();
            try
            {
                return objDal.DeleteJobType(objProperty);
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

        public string RecordSelect(int flag)
        {
            DllJobType objDal = new DllJobType();
            try
            {
                return objDal.SelectJobType(flag);
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
